from .chatgpt import collect_result

def get_related_roles(role, region):
    # role, region, _ = get_input(request)

    prompt = f' Provide necessary information regarding related job roles with transferrable skills similar to the role of {role} for the region{region}.' + \
        '''Suggest the information with job title, percentage similarity in 2 significant numbers and NOC. Provide a maximum of 5 related jobs. Please provide a response in JSON format in the following template:\
        Example Template:
        {
            "title": "Related Jobs",
            "content": [
                {
                  "title": "role title ",
                  "Persentage":  "Percentage similarity ",
                  "NOC":"NOC of the role"
                }
                // ... and so on for the rest of the steps
        ]
        }
        '''
    result = collect_result(prompt, 4)
    print("*******")
    print(result)
    return result
# def store_to_db_mono(json_raw,col):