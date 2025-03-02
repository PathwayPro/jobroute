import json
from django.http import JsonResponse
from openai import OpenAI, AzureOpenAI
from dotenv import load_dotenv
import os
from .errorhandling import remove_brackets, remove_strings

# Load environment variables from .env file
load_dotenv()

# Set up OpenAI or Azure OpenAI client based on environment
USE_AZURE = os.getenv('USE_AZURE', 'false').lower() == 'true'

if USE_AZURE:
    client = AzureOpenAI(
        azure_endpoint=os.getenv('ENDPOINT_URL'),
        api_key=os.getenv('AZURE_OPENAI_API_KEY'),
        api_version=os.getenv('AZURE_OPENAI_API_VERSION')
    )
    AZURE_DEPLOYMENT = os.getenv('DEPLOYMENT_NAME')
else:
    client = OpenAI(
        api_key=os.getenv('API_KEY')
    )

response = ""

def collect_result(prompt, model_no):
    # Add strict JSON formatting requirement to the initial prompt
    prompt = (
        "Return content strictly in JSON template given and remove any text before the JSON. "
        "Do not include markdown code blocks or any additional formatting.\n"
    ) + prompt

    for i in range(0,3):
        try:
            result = choose_model(prompt, str(model_no))
            print("Raw response:", result)  # Debug log
            
            # Clean the result before parsing
            result = result.strip()
            
            # Extract JSON from markdown code block if present
            if '```' in result:
                # Find the content between the first and last ```
                parts = result.split('```')
                if len(parts) >= 3:
                    # Take the middle part (between first and last ```)
                    result = parts[1]
                    # Remove "json" if it's at the start
                    if result.lstrip().startswith('json'):
                        result = result[4:].lstrip()
            
            result = result.strip()
            print("Cleaned result:", result)  # Debug log
            
            try:
                result_json = json.loads(result)
                return JsonResponse(result_json, safe=False)
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {str(e)}")
                print(f"Failed result: {result}")
                if i < 2:  # Only modify prompt if we have retries left
                    prompt = (
                        "Return only a pure JSON object with no additional text or formatting. "
                        "The response must be valid JSON that can be directly parsed.\n"
                    ) + prompt
                continue
                
        except Exception as e:
            print(f"API call error: {str(e)}")
            print(f"Full error details: ", e.__dict__)
            if i < 2:  # Only retry if we have attempts left
                continue
            break  # Exit the loop on the last attempt
            
    # If we get here, all attempts failed
    return JsonResponse({"error": "fetch failed"}, status=500)

def generate_response(prompt):
    messages = [{"role": "assistant", "content": prompt}]
    
    if USE_AZURE:
        response = client.chat.completions.create(
            model=AZURE_DEPLOYMENT,
            messages=messages,
            temperature=0,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
    else:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

    generated_text = response.choices[0].message.content.strip()
    print("\n[CHAT GPT] Response : \n", response)
    return generated_text

def generate_response_turbo(prompt):
    messages = [{"role": "assistant", "content": prompt}]
    
    if USE_AZURE:
        response = client.chat.completions.create(
            model=AZURE_DEPLOYMENT,
            messages=messages,
            temperature=0,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
    else:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0,
            max_tokens=1024,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

    generated_text = response.choices[0].message.content.strip()
    print("[CHAT GPT 3.5]Response :\n", response)
    return generated_text

def choose_model(prompt, model_no):
    if model_no == '3':
        return generate_response_turbo(prompt)
    else:
        return generate_response(prompt)
