import os
from dotenv import load_dotenv
import requests
from django.http import JsonResponse

load_dotenv()

def verify_captcha(token):
    secret_key = os.environ.get('CAPTCHA_KEY')
    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={"secret": secret_key, "response": token},
    )
    return response.json()

def form_submission(request):
    if request.method == "POST":
        captcha_token = request.POST.get("g-recaptcha-response")
        captcha_response = verify_captcha(captcha_token)

        if captcha_response.get("success"):
            # CAPTCHA verified, process the form submission
            # ...
            return JsonResponse({"message": "Form submitted successfully"})
        else:
            return JsonResponse({"error": "CAPTCHA verification failed"})
