# websocketFunctions.py
import json
from .chatgpt import generate_response
import asyncio


# role = "Software Engineer"
role = "Nurse"
region = "Canada"

async def generate_NOC_result():
    print("[Running generate_NOC_Result]")
    await asyncio.sleep(3)
    print("[After Sleeping]")
    prompt = f'find NOC code for {role}. Return only NOC code.\nexample template:\n{{\n"NOC" : "0000"\n}}'
    result = await generate_response(prompt)
    # print("noc result type:", type(result))

    result = json.loads(result)
    print("noc result type:", type(result))

    return result

async def generate_summary():
    print("[Running generate_summary]")
    # await asyncio.sleep(3)

    prompt = f"Find the Overview for the role of {role} as per the NOC of Canada." + \
        " Return the response in JSON with a node called [Overview] containing a brief summary  description  \"\n"
    result = await generate_response(prompt)
    result = json.loads(result)
    # print("summary result type:", type(result))
    return result

async def generate_Education():
    print("[Running generate_Education]")
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:\n{\ntitle: 'Education / Training',\
        \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

    result = await generate_response(prompt)  # Make sure to use 'await' here
    result = json.loads(result)

    return result

async def generate_salary():
    print("[Running get_salary]")
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what is the average yearly Salary in canadian dollars, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {\
    'title: 'Salary', \
    content: [\
    '$00.00 - $0000.00', \
    'will vary according to seniority',   ]\
    }    "

    result = await generate_response(prompt)
    result = json.loads(result)

    return result


async def generate_degree():
    print("[Running get_degree]")
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me if an educational degree is strictly required for the role, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
    title: 'Degree',\
    content: [\
    'Recommended',\
        ],\
    }"

    result = await generate_response(prompt)
    result = json.loads(result)

    return result


async def generate_workType_info():
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what kind of work type is exists for the role,Like [In person] or [remote], and [full-time] or [part time] etc. strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
    title: 'Work',\
    content: [\
    'Remote | Hybrid | In Person',\
    'Part-time | Full-time | Contract Freelance | Consulting',\
    ],\
    }"

    result = await generate_response(prompt)
    result = json.loads(result)
    return result


async def generate_credential_validation():
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me if there is any credential validation required. strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
    title: 'Credential Validation',\
    content: [\
    'Not required',\
    ],\
    }"

    result = generate_response(prompt)
    result = json.loads(result)
    return result


async def generate_language_req():
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what is the level of language proficiency required for the role. strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
    title: 'Language Proficiency',\
      content: [\
        'English - Advanced oral and writting',\
      ],\
    }"

    result = generate_response(prompt)
    return result


async def generate_hard_skills():
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the important hard skills required for the role.provide a maximum of 10 responses. strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
        title: 'Core Hard Skills',\
    content: [\
        'Medical Knowledge',\
        'Clinical Skills',\
        'Patient Assessment',\
        'Medication Administration',\
        'Patient Education',\
        'Electronic Health Records (EHR)',\
        'Diagnostic Tests and Procedures',\
        'Emergency Response',\
        'Infection Control',\
        'Technical Skills',\
      ],\
        }"

    result = await generate_response(prompt)
    result = json.loads(result)
    return result


async def generate_soft_skills():
    # await asyncio.sleep(5)

    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the important soft skills required for the role.provide a maximum of 10 responses. strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:    {'\n \
    title: 'Soft Skills',\
      content: [\
        'Communication',\
        'Compassion',\
        'Critical Thinking',\
        'Problem Solving',\
        'Collaboration',\
        'Time Management',\
        'Flexibility',\
        'Stress Management',\
        'Cultural Sensitivity',\
        'Leadership',\
      ],\
            }"

    result = await generate_response(prompt)
    result = json.loads(result)
    return result