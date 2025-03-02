import json
import re
from django.http import JsonResponse
from .chatgpt import choose_model

from .summary import role_summary1
from .info import get_all_info1
from .combinedSkills import hardAndSoftSkills1
from .cards import get_Education1
from .networking import get_networking1
from .relatedRoles import get_related_roles
from .qualification import qualification_check
from .roles import get_top5_roles

from rest_framework.decorators import api_view

from .noc import get_noc

# Add this constant at the top of the file
VALID_PROVINCE_CODES = {
    'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 
    'NU', 'ON', 'PE', 'QC', 'SK', 'YT', 'CA'
}

def validate_province_code(province_code: str) -> bool:
    """Validates that a province code is 2 characters and in the valid set"""
    if not province_code:
        return False
    return len(province_code) == 2 and province_code.upper() in VALID_PROVINCE_CODES

def get_input(request):
    if request.method == "GET":
        role = request.GET.get('profession', '')
        region = request.GET.get('province', '')
        industry = request.GET.get('industry', '')

        return role, region, industry
    else:
        error_message = "Wrong request method"
        return JsonResponse({"error": error_message}, status=400)


def collect_result(prompt, model_no):
    try:
        # result = generate_response(prompt)
        result = choose_model(prompt, model_no)
        result_json = json.loads(result)
        response = JsonResponse(result_json)
    except json.JSONDecodeError as e:
        error_message = f"Error decoding JSON: {e}"
        response = JsonResponse({"error": error_message}, status=500)
    except Exception:
        trimmed_json = result_json[0]
        response = JsonResponse(trimmed_json)
    return response

def is_request_not_valid(role, region):
    print(f"Validating request - Role: '{role}', Region: '{region}'")
    
    # checking for empty parameter
    if not role.strip() or not region.strip():
        return True, "Empty parameters detected"

    # Allow letters, numbers, spaces, commas, and hyphens
    pattern = re.compile('[^a-zA-Z0-9 ,\-]')
    has_special_chars_role = bool(pattern.search(role))
    has_special_chars_region = bool(pattern.search(region))
    
    if has_special_chars_role or has_special_chars_region:
        special_chars_role = pattern.findall(role)
        special_chars_region = pattern.findall(region)
        return True, f"Special characters found - Role: {special_chars_role}, Region: {special_chars_region}"
    
    return False, ""


@api_view(['GET'])
def get_summary(request):
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    
    is_invalid, error_details = is_request_not_valid(role, region)
    if is_invalid:
        error_msg = f"Invalid request: {error_details}"
        return JsonResponse({"error": error_msg}, status=400)
    
    return role_summary1(role, region)

@api_view(['GET'])
def get_info1(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_not_valid(role, region)[0]:
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_all_info1(role, region)

@api_view(['GET'])
def get_combined_skills(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_not_valid(role, region)[0]:
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return hardAndSoftSkills1(role, region)

@api_view(['GET'])
def get_education(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_not_valid(role, region)[0]:
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_Education1(role, region)

@api_view(['GET'])
def get_networking(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_not_valid(role, region)[0]:
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_networking1(role, region)


@api_view(['GET'])
def get_related_jobs(request):
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    
    is_invalid, error_details = is_request_not_valid(role, region)
    if is_invalid:
        error_msg = f"Invalid request: {error_details}"
        return JsonResponse({"error": error_msg}, status=400)
    
    return get_related_roles(role, region)


@api_view(['GET'])
def get_qualification(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_not_valid(role, region)[0]:
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return qualification_check(role, region)


@api_view(['GET'])
def get_top_roles(request):
    term = request.GET.get('term', '')
    is_invalid, error_details = is_request_not_valid("Canada", term)
    if is_invalid:
        error_msg = f"Invalid request: {error_details}"
        return JsonResponse({"error": error_msg}, status=400)
    
    return get_top5_roles(term)