from .chatgpt import collect_result

def get_top5_roles(role, region, term):
    # role, region, _ = get_input(request)
    print("****11***")
    prompt = f"As an AI model, Suggest 5 relevant professions that start with the letters {term} in the Canadian {region} region as JSON . If none is found, return a JSON string 'No match found'" +\
            ''' Suggestions are allowed. Return the response strictly using JSON template:\
                Example Template:
                   {\n
                        \"professions\": [\n
                            \"Software Engineer\",\n
                            \"Software Developer\",\n
                            \"Software Architect\",\n
                            \"Software Tester\",\n
                            \"Software Project Manager\"\n
                            ]
                    \n}

            '''
    result = collect_result(prompt, 4)
    print("*******")
    print(result)
    return result