import json
from django.http import  JsonResponse
from .views import get_input, collect_result



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

    response = collect_result(prompt)
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

    response = collect_result(prompt)

    return response


def hardAndSoftSkills(request):
    soft_response = get_soft_skills(request)
    hard_response = get_hard_skills(request)

    soft_data = json.loads(soft_response.content.decode("utf-8"))
    hard_data = json.loads(hard_response.content.decode("utf-8"))

    combined_data = [hard_data, soft_data]

    return JsonResponse(combined_data, safe=False)
