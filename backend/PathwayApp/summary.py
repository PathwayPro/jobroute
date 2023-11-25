import json
from django.http import HttpResponse, JsonResponse
from .chatgpt import generate_response
# from .views import get_input, collect_result
from .models import Jobroute
from .chatgpt import collect_result

# def role_summary(request):

#     role, region, _ = get_input(request)

#     # prompt = (
#     #     f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."
#     #     " Return the response in JSON with a node called [overview] containing a brief summary description."
#     # )
#     # response = collect_result(prompt)
#     prompt = (
#         f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."
#         " Return the response in string containing only a brief summary description."
#     )
#     response = generate_response(prompt)
#     response = HttpResponse(response)

#     return response

def role_summary1(role, region):
    '''
    Provides the overview for the job role
    '''
    # role, region, _ = get_input(request)
    result = ""
    occupation_data = Jobroute.objects.filter(title=role,province=region).first()

    if occupation_data and occupation_data.overview is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.overview
        result = JsonResponse(json.loads(response))

    else:
        print("GOTTEN FROM OPENAI")
        prompt = f"provide me the Overview for the role of {role} as per the NOC of Canada for the region {region}."+\
        ''' Return the response in string containing only a brief summary description following the following JSON template:\
        Example Template:
        {
            "content": "description 60 tokens min and 120 tokens max"
        }
        '''

        result = collect_result(prompt, 4)
        print(result)
        #check if data exists at all
        if occupation_data:
            occupation_data.overview=result.content.decode('utf-8')
            occupation_data.province = region
            occupation_data.title=role
            occupation_data.save()
        else:
            job_route = Jobroute(overview = result.content.decode('utf-8'),
                                 province=region,
                                 title=role)
            job_route.save()

    return result