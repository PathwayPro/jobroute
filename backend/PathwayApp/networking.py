import json
from django.http import JsonResponse

from .errorhandling import is_json_invalid
from .models import Jobroute
from.chatgpt import collect_result
from django.db import transaction

@transaction.atomic
def get_networking1(role, region):
    '''
    Card to retrieve the networking opportunities for a role
    '''
    result = ""
    occupation_data = Jobroute.objects.select_for_update().filter(title=role,province=region).first()

    #Check if info exists in DB
    if occupation_data and occupation_data.networking is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.networking
        result = JsonResponse(json.loads(response))

    else:
        print("GOTTEN FROM OPENAI")
        prompt = f"As an AI assistant, please provide a list of organizations that assist newcomers in Canada, specifically in {region}, with job searches. For each organization, return the information as a JSON array of objects following this template:\n" + \
                '''\n Provide a maximum of 5 organizations. Example Template:
                {
                    "title": "Job Search / Networking",
                    "content": [
                        {
                        "name": "Organization Name",
                        "services": ["Service 1", "Service 2", "Service 3"],
                        "website": "https://www.example.com"
                        // ... and so on for the rest of the steps
                        }
                    ]
                }
                '''

        result = collect_result(prompt, 4)
        if is_json_invalid(result):
            print("error found in result")
            return result
        else:
            if occupation_data:
                occupation_data.networking = result.content.decode('utf-8')
                occupation_data.province = region
                occupation_data.title = role
                occupation_data.save()
            else:
                job_route = Jobroute(
                    networking=result.content.decode('utf-8'),
                    province=region,
                    title=role
                )
                try:
                    job_route.save()
                except Exception as e:
                    print(f"An exception caught while storing to database: {e}")

    return result
