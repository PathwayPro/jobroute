import json
from django.http import JsonResponse
from .chatgpt import generate_response


def get_input(request):
    if request.method == "GET":
        role = request.GET.get('profession', '')
        region = request.GET.get('province', '')
        industry = request.GET.get('industry', '')

        return role, region, industry
    else:
        error_message = "Wrong request method"
        return JsonResponse({"error": error_message}, status=400)


def collect_result(prompt):
    try:
        result = generate_response(prompt)
        result_json = json.loads(result)
        response = JsonResponse(result_json)
    except json.JSONDecodeError as e:
        error_message = f"Error decoding JSON: {e}"
        response = JsonResponse({"error": error_message}, status=500)
    except Exception:
        trimmed_json = result_json[0]
        response = JsonResponse(trimmed_json)
    return response