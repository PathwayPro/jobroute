import json
from django.http import JsonResponse
from .models import Jobroute
from.chatgpt import collect_result

def get_networking1(role, region):
    '''
    Card to retrieve the networking opportunities for a role
    '''
    # role, region, _ = get_input(request)
    result = ""
    occupation_data = Jobroute.objects.filter(title=role,province=region).first()

    #Check if info exists in DB
    if occupation_data and occupation_data.networking is not None:
        print("GOTTEN FROM DATABASE")
        response = occupation_data.networking
        result = JsonResponse(json.loads(response), safe=False)

    #otherwise use OpenAI
    else:
        print("GOTTEN FROM OPENAI")
        # prompt = f" Provide necessary information regarding 'Job Search / Networking' required to be successful in the role of {role} for the region {region}." + \
        #     '''provide the information in a step-by-step manner. Provide a maximum of 6 steps.
        # provide a response in JSON format in the following template: \
        # \nExample Template:
        # {
        #     "title": "Job Search / Networking",
        #     "content": [
        #         {\n'
        #         "title": "short name (maximum 7 tokens)",\n'
        #         "desc":  "description (maximum 25 tokens)"\n'
        #         }\n'
        #             // ... and so on for the rest of the steps
        #     ]
        # }
        # '''

        prompt  = f"As an AI assistant, please provide a list of organizations that assist newcomers in Canada, specifically in {region}, with job searches. For each organization, return the information as a JSON array of objects following this template:\n" + \
                '''\n Provide a maximum of 5 organizations. Example Template for Each Organization:
                {
                    "title": "Job Search / Networking",
                    "content": [
                        {\n'
                        "name": "Organization Name",
                        "services": ["Service 1", "Service 2", "Service 3"],
                        "website": "https://www.example.com"
                        }\n'
                        // ... and so on for the rest of the steps
                    ]
                }
                '''
        result = collect_result(prompt, 4)
        #check if entry exists and only specified field is missing
        if occupation_data:
            occupation_data.networking=result.content.decode('utf-8')
            occupation_data.province = region
            occupation_data.title=role
            occupation_data.save()
        #No entry nor field data
        else:
            job_route = Jobroute(networking = result.content.decode('utf-8'),
                                 province=region,
                                 title=role)
            job_route.save()


    return result
