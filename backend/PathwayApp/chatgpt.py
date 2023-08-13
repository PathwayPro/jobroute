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
    # print(response)
    generated_text = response.choices[0].message['content'].strip()
    print(generated_text)
    # print(type(generated_text))
    

    return generated_text




# def generate_response(prompt):
#     # response = openai.Completion.create(
#     #     engine=model,  # which model to use
#     #     prompt=prompt,
#     #     max_tokens=tokens,  # Tokens are chunks of text, which can be as short as one character or as long as one word. By setting max_tokens, you can control the length of the response.
#     #     temperature=temp,  # controls the randomness of the generated response. A higher value like 1.0 makes the output more diverse and creative, while a lower value like 0.2 makes it more focused and deterministic.
#     #     n=n_val,  # represents the number of completions to generate for a single prompt.
#     #     stop=None,  # If a stop string is provided, the model will stop generating text when it encounters that string in the output.
#     #     echo=False  # Setting echo=True instructs the API to include the original prompt in the response, making it easier to see the context of the conversation.
#     # )
#     return response.choices[0].text.strip()

