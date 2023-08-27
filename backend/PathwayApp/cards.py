import json
from django.http import  JsonResponse
from .chatgpt import generate_response
from .views import get_input, collect_result


def regulation_check(request):
    role, region, _ = get_input(request)
    prompt = f"Is the role '{role}' regulated for the region '{region}'as per the NOC of Canada? Return a string 'Yes' or 'No' only."

    result = generate_response(prompt)
    print("[is_regulated] result from chatgpt: \n", result)

    if result == "Yes":
        output = get_License(request)
        return output
    else:
        output = get_Experience(request)
        return output


def get_networking(request):
    role, region, _ = get_input(request)
    prompt = f" Please provide necessary information regarding 'Job Search / Networking' required to be successful in the role of {role} for the region {region}." + \
        '''\nPlease provide the information in a step-by-step manner. Please provide a maximum of 6 steps.\
    Please provide a response in JSON format in the following template: \
    \nExample Template:
    {
        "title": "Job Search / Networking",
        "content": [
            {
                "First Step": "20-word maximum description"
            },
            {
                "Second Step": "20-word maximum description"
            },
            {
                "nth Step": "20-word maximum description"
            }
        ]
    }
    '''

    result = collect_result(prompt)

    return result


def get_Experience(request):
    role, region, _ = get_input(request)

    prompt = f"Please provide necessary information regarding Experience/Projects required to be successful in the role of {role} for the region{region}." + \
        '''Please provide the information in a step-by-step manner. Please provide a maximum of 6 steps. Please provide a response in JSON format in the following template:\
        \nExample Template:\n
        {
            "title": "Experience / Projects",
            "content": [
                {
                    "First Step": "20-word maximum description"
                },
                {
                    "Second Step": "20-word maximum description"
                },
                {
                    "nth Step": "20-word maximum description"
                }
            ]
        }
        '''
    result = collect_result(prompt)
    return result


def get_License(request):
    role, region, _ = get_input(request)

    prompt = f' As an expert Regulatory Affairs Specialist. for the profession of "{role}" in the region "{region}"regulated by the government. provide what certifications, or exams I have to pass to be allowed to work as a "{role}" strictly following this template return reply as JSON array of objects: ' +\
        '''
        {
            "regulated": true,
            "certifications": [
                {
                    "title": "short name 7 tokens maximum",
                    "desc": "description 25 tokens maximum"
                },
                {
                    "title": "...",
                    "desc": "..."
                },
                {
                    "title": "...",
                    "desc": "..."
                }
                // ... and so on for the rest of the certifications and exams
            ]
        }
    '''
    result = collect_result(prompt)
    return result


def get_Education(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for {role} in the region{region}, provide me if any what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:\n{\ntitle: 'Education / Training',\
        \ncontent: [\n        { title: 'Step 1', desc: '20 words maximum description' },\n        \
        { title: 'Step 2', desc: '20 words maximum description' },\n        \
        { title: 'Step 3', desc: '20 words maximum description' },\n      ]\n}"

    response = collect_result(prompt)

    return response


def get_cards(request):
    education = get_Education(request)
    regulated = regulation_check(request)
    networking = get_networking(request)

    education_data = json.loads(education.content.decode("utf-8"))
    regulation_data = json.loads(regulated.content.decode("utf-8"))
    networking_data = json.loads(networking.content.decode("utf-8"))

    combined_data = [education_data, regulation_data, networking_data]

    return JsonResponse(combined_data, safe=False)
