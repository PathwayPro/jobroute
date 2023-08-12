import openai
from dotenv import load_dotenv
import os
import openai

# Load environment variables from .env file
load_dotenv()

# Set the OpenAI API key from the environment variable
openai.api_key = os.getenv('API_KEY')


async def generate_response(prompt):
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
    # print(response)
    generated_text = response.choices[0].message['content'].strip()
    print(generated_text)
    # print("Chat gpt result data type : ",type(generated_text))
    

    return generated_text




# def use_old_chatgpt(prompt):
#     response = openai.ChatCompletion.create(
#   model="gpt-3.5-turbo",
#   messages=[
#     {
#       "role": "user",
#       "content": prompt
#     }
#   ],
#   temperature=0,
#   max_tokens=256,
#   top_p=1,
#   frequency_penalty=0,
#   presence_penalty=0
# )
#     return response.choices[0].text.strip()

