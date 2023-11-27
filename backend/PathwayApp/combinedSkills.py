import json
from django.http import  JsonResponse
from .models import Jobroute
# from .views import get_input, collect_result
from .chatgpt import collect_result



def get_hard_skills(role, region):
    # role, region, _ = get_input(request)

    prompt = f'as an AI assistant that provides Canadian education paths for the role of {role} in the region {region}, tell me what are the important hard skills required for the role.provide a maximum of 10 responses. strictly follow this template and return reply as a JSON array of objects,' +   \
        '''example template:
          {\n
        "title": "Hard Skills",
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

    response = collect_result(prompt, 3)

    return response


def get_soft_skills(role, region):

    # role, region, _ = get_input(role, region)
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

    response = collect_result(prompt, 3)

    return response


# def hardAndSoftSkills(request):
#     soft_response = get_soft_skills(request)
#     hard_response = get_hard_skills(request)

#     soft_data = json.loads(soft_response.content.decode("utf-8"))
#     hard_data = json.loads(hard_response.content.decode("utf-8"))

#     combined_data = [hard_data, soft_data]

#     return JsonResponse(combined_data, safe=False)


def hardAndSoftSkills1(role, region):
    # role, region, _ = get_input(request)
    result = ""
    occupation_data = Jobroute.objects.filter(title=role,province=region).first()

    if occupation_data and occupation_data.skills is not None:
        # if occupation_data.networking is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.skills
        print(response)
        response = response.replace("'",'"')
        result = json.loads(response)

    else:
        print("GOTTEN FROM OPENAI")
        # prompt = f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."+\
        # ''' Return the response in string containing only a brief summary description following the following JSON template:\
        # Example Template:
        # {
        #     "content": "description 60 tokens min and 120 tokens max"
        # }
        # '''
        soft_response = get_soft_skills(role, region)
        hard_response = get_hard_skills(role, region)

        soft_data = json.loads(soft_response.content.decode("utf-8"))
        hard_data = json.loads(hard_response.content.decode("utf-8"))
        # soft_data = soft_response.content.decode("utf-8")
        # hard_data = hard_response.content.decode("utf-8")
        result = [hard_data, soft_data]

        # result = collect_result(prompt, 4)
        print("***pritnig combined data***")
        print(result)
        #check if data exists at all
        if occupation_data:
            occupation_data.skills=result
            # occupation_data.overview=result.content.decode('utf-8')
            occupation_data.province = region
            occupation_data.title=role
            occupation_data.save()
        else:
            job_route = Jobroute(skills = result,
                                 province=region,
                                 title=role)
            job_route.save()

    return JsonResponse(result, safe=False)