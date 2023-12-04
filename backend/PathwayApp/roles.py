from .errorhandling import is_json_invalid
from .chatgpt import collect_result

def get_top5_roles(term):
    # role, region, _ = get_input(request)
    print("****11***")
    prompt = f"As an AI model, Suggest 5 relevant professions that start with the letters {term} in Canada country as JSON . If none is found, return a JSON string 'No match found'" +\
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
    if is_json_invalid(result):
            print("error found in result")
            return result
    print("*******")
    print(result)
    return result