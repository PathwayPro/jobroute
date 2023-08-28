import openai
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Set the OpenAI API key from the environment variable
openai.api_key = os.getenv('API_KEY')


def generate_response(prompt):
    response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {
        "role": "assistant",
        "content": prompt
        }
    ],
    temperature=0,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    print("\n[CHAT GPT] Response : \n", response)
    generated_text =  response.choices[0].message['content'].strip()
       
    return generated_text

def generate_response_turbo(prompt):
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {

        "role": "assistant",
        "content": prompt
        }
    ],
    temperature=0,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
    )
    print("[CHAT GPT 3.5]Response :\n", response)
    generated_text =  response.choices[0].message['content'].strip()
    return generated_text

def choose_model(prompt, model_no):
    if model_no == '3':
        return generate_response_turbo(prompt)
    else:
        return generate_response(prompt)
