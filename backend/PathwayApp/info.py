from django.http import JsonResponse
import json
from .views import get_input, collect_result


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

    result = collect_result(prompt, 3)
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
    result = collect_result(prompt, 3)
    return result


def get_salary(request):
    role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for {role} in {region} region, please provide me what is the average yearly Salary in canadian dollars, strictly follow this template and return reply as a JSON array of objects,' +   \
        '\nExample Template:    {\
    "title": "Salary", \
    "content": [\
    "$00.00 - $0000.00", \
    "will vary according to seniority"   ]\
    }  '

    response = collect_result(prompt, 3)

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

    response = collect_result(prompt, 3)

    return response


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

    result = collect_result(prompt, 3)
    return result
