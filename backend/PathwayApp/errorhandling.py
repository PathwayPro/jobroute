import json
import re

#check is a Json is valid
def is_json_invalid(response):
    if 'error' in json.loads(response.content):
        return True
    else:
        return False

#checking the request parameters
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

#extract the number from NOC is string is present
def extract_numeric_noc(noc):
    numeric_noc = re.sub(r'[^0-9]', '', noc)
    return numeric_noc

def extract_numeric_noc1(noc):
    match = re.search(r'\bNOC\s+(\d+)\b', noc)
    if match:
        return match.group(1)
    else:
        return None