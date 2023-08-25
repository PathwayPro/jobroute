from django.http import JsonResponse
import json
from django.http import HttpResponse, JsonResponse
from .chatgpt import generate_response


def get_input(request):
    if request.method == "GET":
        role = request.GET.get('profession', '')
        region = request.GET.get('province', '')
        industry = request.GET.get('industry', '')

        return role, region, industry
    else:
        error_message = "Wrong request method"
        return JsonResponse({"error": error_message}, status=400)


def collect_result(prompt):
    try:
        result = generate_response(prompt)
        result_json = json.loads(result)
        print("[collect_result]Trying to json.loads(result): \n", result_json)

        response = JsonResponse(result_json)
    except json.JSONDecodeError as e:
        error_message = f"Error decoding JSON: {e}"
        response = JsonResponse({"error": error_message}, status=500)
    except Exception as e:
        error_message = f"An error occurred: {e}"
        response = JsonResponse({"error": error_message}, status=500)
    return response


def get_firstItem_from_collect_result(prompt):
    try:
        result = generate_response(prompt)
        result_json = json.loads(result)
        print("[collect_result]Trying to json.loads(result): \n", result_json)
        trimmed_json = result_json[0]
        print("[After Trimming] : \n", trimmed_json)
        response = JsonResponse(trimmed_json)
        return response
    except Exception as e:
        error_message = f"An error occurred: {e}"
        return {"error": error_message}


def role_summary(request):

    role, region, industry = get_input(request)

    # prompt = (
    #     f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."
    #     " Return the response in JSON with a node called [overview] containing a brief summary description."
    # )
    # response = collect_result(prompt)
    prompt = (
        f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."
        " Return the response in string containing only a brief summary description."
    )
    response = generate_response(prompt)
    response = HttpResponse(response)

    return response


def get_salary(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for {role} in {region} region, please provide me what is the average yearly Salary in canadian dollars, strictly follow this template and return reply as a JSON array of objects,' +   \
        '\nExample Template:    {\
    "title": "Salary", \
    "content": [\
    "$00.00 - $0000.00", \
    "will vary according to seniority"   ]\
    }  '

    response = collect_result(prompt)

    return response


def get_Education(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for {role} in the region{region}, provide me if any what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:\n{\ntitle: 'Education / Training',\
        \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

    response = collect_result(prompt)

    return response


def get_degree(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for {role} in the region{region}, please provide me if an educational degree is strictly required for the role or not. strictly follow this template and return reply only as a JSON array of objects,' +   \
        ''' example template: 
        {
        "title": "Degree",
        "content": [
            "Recommended"
        ]
        }
        '''

    response = get_firstItem_from_collect_result(prompt)

    return response


def get_hard_skills(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for the role of {role} in the region {region}, tell me what are the important hard skills required for the role.provide a maximum of 10 responses. strictly follow this template and return reply as a JSON array of objects,' +   \
        '''example template:
          {\n
        "title": "Core Hard Skills",
        "content": 
            [
            "Medical Knowledge",
            "Clinical Skills",
            "Patient Assessment",
            "Medication Administration",
            "Patient Education",
            "Electronic Health Records (EHR)",
            "Diagnostic Tests and Procedures",
            "Emergency Response",
            "Infection Control",
            "Technical Skills"
            ]
        }
        '''

    response = get_firstItem_from_collect_result(prompt)
    # response = collect_result_as_is(prompt)

    return response


def get_soft_skills(request):

    role, region, _ = get_input(request)
    prompt = f'as an AI assistant that provides Canadian education paths for the role {role} in the {region} region, tell me what are the important soft skills required for the role.provide a maximum of 10 responses. strictly follow this template and return reply as a JSON array of objects,' +   \
        '''
        \nExample Template: 
        {\n
        "title": "Soft Skills",
        "content": 
            [
            "Communication",
            "Compassion",
            "Critical Thinking",
            "Problem Solving",
            "Collaboration",
            "Time Management",
            "Flexibility",
            "Stress Management",
            "Cultural Sensitivity",
            "Leadership"
            ]
        }

        '''

    response = get_firstItem_from_collect_result(prompt)

    return response


def hardAndSoftSkills(request):
    soft_response = get_soft_skills(request)
    hard_response = get_hard_skills(request)

    soft_data = json.loads(soft_response.content.decode("utf-8"))
    hard_data = json.loads(hard_response.content.decode("utf-8"))

    combined_data = [hard_data, soft_data]

    return JsonResponse(combined_data, safe=False)


def get_workType_info(request):

    role, region, _ = get_input(request)
    prompt = f"as an AI assistant that provides Canadian education paths for the role '{role}' in the region '{region}', tell me what kind of work type is exists for the role,Like [In person] or [remote], and [full-time] or [part time] etc. strictly follow this template and return reply as a JSON array of objects," +   \
        '''\nExample Template: 
        {
        "title": "Work",
        "content": [
            "Remote | Hybrid | In Person",
            "Part-time | Full-time | Contract Freelance | Consulting"
            ]
        }
        '''

    result = get_firstItem_from_collect_result(prompt)
    return result


def credential_validation(request):
    role, region, _ = get_input(request)
    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me if credential validation is strictly required or not. strictly follow this template and return reply only as a JSON array of objects with it is required or not, ' +   \
        '''\nExample Template:    
        {
            "title": "Credential Validation",
            "content": [
                "Not required"
            ]
        }
        '''

    result = get_firstItem_from_collect_result(prompt)
    return result


def language_req(request):
    role, region, _ = get_input(request)
    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what is the level of language proficiency required for the role. strictly follow this template and return reply as a JSON array of objects,' +   \
        '''\nExample Template:   
        {
        "title": "Language Proficiency",
        "content": [
            "English - Advanced oral and writing"
            ]
        }
        '''
    result = get_firstItem_from_collect_result(prompt)
    return result


def get_info(request):

    salary = get_salary(request)
    degree = get_degree(request)
    work = get_workType_info(request)
    credentials = credential_validation(request)
    language = language_req(request)

    salary_data = json.loads(salary.content.decode("utf-8"))
    degree_data = json.loads(degree.content.decode("utf-8"))
    work_data = json.loads(work.content.decode("utf-8"))
    credential_data = json.loads(credentials.content.decode("utf-8"))
    lang_data = json.loads(language.content.decode("utf-8"))

    combined_data = [salary_data, degree_data,
                     work_data, credential_data, lang_data]

    return JsonResponse(combined_data, safe=False)


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

    prompt = f' As an expert Regulatory Affairs Specialist. for the profession of "{role}" regulated by the government. provide what certifications, or exams I have to pass to be allowed to work as a "{role}" strictly following this template return reply as JSON array of objects: '+\
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
    result = get_firstItem_from_collect_result(prompt)
    return result


def get_cards(request):
    education = get_Education(request)
    regulated = regulation_check(request)
    networking = get_networking(request)


    education_data = json.loads(education.content.decode("utf-8"))
    regulation_data = json.loads(regulated.content.decode("utf-8"))
    networking_data = json.loads(networking.content.decode("utf-8"))
   

    combined_data = [education_data, regulation_data, networking_data]

    return JsonResponse(combined_data, safe=False)

