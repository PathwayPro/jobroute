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
from .errorhandling import is_request_invalid

from .noc import get_noc


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
    #checking for empty parameter
    if not role.strip() or not region.strip():
        print("Request is blank")
        return True

    pattern = re.compile('[^a-zA-Z0-9 ]')
    if pattern.search(role) or pattern.search(region):
        print("Contains non-alphanumeric character")
        return True
    return False


@api_view(['GET'])
def get_summary(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    # if is_request_invalid(role, region):
    #     return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return role_summary1(role, region)

@api_view(['GET'])
def get_info1(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_all_info1(role, region)

@api_view(['GET'])
def get_combined_skills(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return hardAndSoftSkills1(role, region)

@api_view(['GET'])
def get_education(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_Education1(role, region)

@api_view(['GET'])
def get_networking(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_networking1(role, region)


@api_view(['GET'])
def get_related_jobs(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return get_related_roles(role, region)


@api_view(['GET'])
def get_qualification(request):
    # role, region, _ = get_input(request)
    role = request.GET.get('profession', '')
    region = request.GET.get('province', '')
    if is_request_invalid(role, region):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    industry = request.GET.get('industry', '')
    return qualification_check(role, region)


@api_view(['GET'])
def get_top_roles(request):
    term = request.GET.get('term', '')
    if is_request_invalid("Canada", term):
        return JsonResponse({"error":"Request is empty or contains non alphanumeric character"}, status= 400)
    return get_top5_roles(term)