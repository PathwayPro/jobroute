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
    match = re.search(r'\bNOC\s*(\d+)\b|\b(\d+)\b', noc)
    if match:
        noc_code = match.group(1)
        if noc_code is None:
            noc_code = match.group(2)
        return noc_code
    else:
        return None


#Removing text before string
def remove_strings(response):
    index = min(response.find('{'), response.find('['))
    if index == -1:
        return response
    result = remove_brackets(response[index:])
    return result

# Removing brackets to change arrays to object
def remove_brackets(response):
    if response.startswith("[[") and response.endswith("]]"):
        result = response[1:-1]
    elif response.startswith("[") and response.endswith("]"):
        result = response[1:-1]
    else:
        result = response
    return result
