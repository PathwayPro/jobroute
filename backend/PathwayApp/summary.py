import json
from django.http import HttpResponse
from .chatgpt import generate_response
from .views import get_input, collect_result

def role_summary(request):

    role, region, _ = get_input(request)

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