# websocketFunctions.py
import json
from .chatgpt import generate_response


# role = "Software Engineer"
role = "Nurse"
region = "Canada"

async def generate_NOC_result():
    print("[Running generate_NOC_Result]")
    prompt = f'find NOC code for {role}. Return only NOC code.\nexample template:\n{{\n"NOC" : "0000"\n}}'
    result = await generate_response(prompt)
    # print("noc result type:", type(result))

    result = json.loads(result)
    print("noc result type:", type(result))

    return result

async def generate_summary():
    print("[Running generate_summary]")

    prompt = f"Find the Overview for the role of {role} as per the NOC of Canada." + \
        " Return the response in JSON with a node called [Overview] containing a brief summary  description  \"\n"
    result = await generate_response(prompt)
    result = json.loads(result)
    # print("summary result type:", type(result))
    return result

async def generate_Education():
    print("[Running generate_Education]")

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:\n{\ntitle: 'Education / Training',\
        \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

    result = await generate_response(prompt)  # Make sure to use 'await' here
    result = json.loads(result)

    return result
