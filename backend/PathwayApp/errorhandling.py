import json
import re

def is_json_invalid(response):
    if 'error' in json.loads(response.content):
        return True
    else:
        return False

def is_request_invalid(role, region):
    #checking for empty parameter
    if not role.strip() or not region.strip():
        print("Request is blank")
        return True

    pattern = re.compile('[^a-zA-Z0-9 ]')
    if pattern.search(role) or pattern.search(region):
        print("Contains non-alphanumeric character")
        return True

    #if input is only digits
    if role.isdigit() or region.isdigit():
        return True
    return False