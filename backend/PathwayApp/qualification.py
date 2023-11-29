import json
from django.http import JsonResponse
from .models import Jobroute
from .chatgpt import collect_result, generate_response


def qualification_check(role, region):
    '''
    Card to check if role is regulated or not
    '''
    # role, region, _ = get_input(request)
    prompt = f"Is the role '{role}' regulated for the region '{region}'as per the NOC of Canada? Return a string 'Yes' or 'No' only."

    result = generate_response(prompt)
    print("[is_regulated] result from chatgpt: \n", result)

    if result == "Yes":
        output = get_License(role, region)
        return output
    else:
        output = get_Experience(role, region)
        return output


def get_Experience(role, region):
    # role, region, _ = get_input(request)
    result = ""
    occupation_data = Jobroute.objects.filter(title=role,province=region).first()

    if occupation_data and occupation_data.qualification is not None:
        # if occupation_data.networking is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.qualification
        result = JsonResponse(json.loads(response))

    else:
        print("GOTTEN FROM OPENAI")
        prompt = f"Provide necessary information regarding Experience/Projects required to be successful in the role of {role} for the region{region}." + \
        '''Provide the information in a step-by-step manner. Provide a maximum of 6 steps. Please provide a response in JSON format in the following template:\
        Example Template:
        {
            "regulated": false,
            "title": "Project / Experience",
            "content": [
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
                // ... and so on for the rest of the steps
            ]
        }
        '''

        result = collect_result(prompt, 4)
        #check if data exists at all
        if occupation_data:
            occupation_data.qualification=result.content.decode('utf-8')
            occupation_data.province = region
            occupation_data.title=role
            occupation_data.save()
        else:
            job_route = Jobroute(qualification = result.content.decode('utf-8'),
                                 province=region,
                                 title=role)
            job_route.save()

    return result


def get_License(role, region):
    # role, region, _ = get_input(request)
    result = ""
    occupation_data = Jobroute.objects.filter(title=role,province=region).first()

    if occupation_data and occupation_data.qualification is not None:
        # if occupation_data.networking is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.qualification
        result = JsonResponse(json.loads(response))

    else:
        print("GOTTEN FROM OPENAI")
        prompt = f' As an expert Regulatory Affairs Specialist. for the profession of "{role}" in the region "{region}"regulated by the government. provide what certifications, or exams I have to pass to be allowed to work as a "{role}" strictly following this template return reply as JSON array of objects: ' +\
        '''
        {
            "regulated": true,
            "title": "Certifications",
            "content": [
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

        result = collect_result(prompt, 4)
        #check if data exists at all
        if occupation_data:
            occupation_data.qualification=result.content.decode('utf-8')
            occupation_data.province = region
            occupation_data.title=role
            occupation_data.save()
        else:
            job_route = Jobroute(qualification = result.content.decode('utf-8'),
                                 province=region,
                                 title=role)
            job_route.save()

    return result
