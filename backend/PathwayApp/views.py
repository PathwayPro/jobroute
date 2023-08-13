import asyncio
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import ExampleModel
from .chatgpt import generate_response

role = "Software Engineer"
region = "Canada"


def get_NOC(request):
    prompt = f'find NOC code for {role}.' + \
        'return only NOC code .\nexample template:\n{\n\"NOC\" : \"2173\"\n}"'
    result = generate_response(prompt)
    return result



def role_summary(request):
    prompt = f"Find the Overview for the role of {role} as per the NOC of Canada." + \
        " Return the response in JSON with a node called [Overview] containing a brief summary  description  \"\n"

    result = generate_response(prompt)

    # return HttpResponse(result)
    return result

def get_Education(request):
    prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
        "\nExample Template:\n{\ntitle: 'Education / Training',\
        \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
        { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

    result = generate_response(prompt)

    return result



def get_result(request):
    result1 = get_NOC(request)
    result2 = role_summary(request)
    result3 = get_Education(request)

    result1_data = json.loads(result1)
    result2_data = json.loads(result2)
    result3_data = json.loads(result3)

    combined_data = [result1_data, result2_data, result3_data]

    response_content_json_str = json.dumps(combined_data, indent=2)

    print("Data Type:", type(response_content_json_str))
    # print(response_content_json_str)

    response = HttpResponse(response_content_json_str, content_type='application/json')

    return response



##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################
##################################
##################################
# def example_view(request):
#     # data = ExampleModel.objects.all().values()
#     # return JsonResponse(list(data), safe=False)
#     return HttpResponse ("Hello World")


# def get_NOC(request):

#     # prompt = f"Find the NOC code of {role} . Return the response in JSON with a node called [NOC_code]"
#     prompt = f'find NOC code for {role}.'+'return only NOC code .\nexample template:\n{\n\"NOC\" : \"2173\"\n}"'
#     result = generate_response(prompt)
#     response = HttpResponse(result)
#     print(response)
#     return response
#     # return result


# def get_Education(request):
#     prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
#         "\nExample Template:\n{\ntitle: 'Education / Training',\
#         \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
#         { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
#         { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

#     result = generate_response(prompt)

#     return result

# def get_Education(request):

#     # prompt = f'''as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,
#     # Include these nodes 'type' (degree, diploma, certificate, designation), 'institution name' (name of the institution or establishment or whatever it is that is offering this programm), 'description' (please provide a very short description of the exact course or program), 'length' (specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.), 'cost' (provide in Canadian dollars)"
#     # '''
#     prompt = f'as an AI assistant that provides Canadian education paths for {role}, tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects,' +   \
#         "\nExample Template:\n{\ntitle: 'Education / Training',\
#         \ncontent: [\n        { title: 'Step 1', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
#         { title: 'Step 2', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n        \
#         { title: 'Step 3', desc: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.' },\n      ]\n}"

#     result = generate_response(prompt)
#     response = HttpResponse(result)
#     print(response)
#     return response
#     # return result

# def role_summary(request):
#     prompt = f"Find the Overview for the role of {role} as per the NOC of Canada." + \
#         " Return the response in JSON with a node called [Overview] containing a brief summary  description  \"\n"

#     result = generate_response(prompt)

#     # return HttpResponse(result)
#     return result


# def get_Experience(request):

#     prompt = f"Please provide necessary information regarding Experience/Projects required to be successful in the role of {role} for the region{region}." + \
#         " Please provide the information in a step-by-step manner. Please provide a maximum of 6 steps. Please provide a response in JSON format in the following template:\
#         \nExample Template:\n{\ntitle: 'Experience / Projects',\
#         \ncontent[\n{ 'First Step' : '20-word maximum description'}\n\
#         { 'Second Step' : '20-word maximum description'}\n . . .\n\
#         { 'nth Step' : '20-word maximum description'}\n]"

#     result = generate_response(prompt)
#     # return HttpResponse(result)
#     return result

# # def combined(request):
# #     NOC_result = get_NOC(request)
# #     edu_result = get_Education(request)

# #     return NOC_result, edu_result


# def networking(request):
#     prompt = f" Please provide necessary information regarding 'Job Search / Networking' required to be successful in the role of {role} for the region {region}." + \
#         "\nPlease provide the information in a step-by-step manner. Please provide a maximum of 6 steps.\
#     Please provide a response in JSON format in the following template: \
#     \nExample Template:\n{\ntitle: 'Job Search / Networking',\
#     \ncontent[\\n{ 'First Step' : '20-word maximum description'}\\n\\\n        { 'Second Step' : '20-word maximum description'}\\n . . .\\n\\\n        { 'nth Step' : '20-word maximum description'}\\n]\""

#     result = generate_response(prompt)

#     return result


# def is_regulated(request):
#     # prompt = f"Is the role '{role}' regulated as per the NOC of Canada? Return a JSON response with a node called 'regulated' that has a value either 'Yes' or 'No' only."
#     prompt = f"Is the role '{role}' regulated as per the NOC of Canada? Return a string 'Yes' or 'No' only."

#     # Assuming generate_response() returns a JSON-formatted string like '{"regulated": "Yes"}'
#     result = generate_response(prompt)

#     # # Convert the JSON string to a Python dictionary
#     # response_data = json.loads(result)
#     # print("result type:", type(response_data))

#     # regulated_value = response_data.get('regulated', 'No')

#     if result == "Yes":
#         return True
#     else:
#         return False

# # def is_regulated(request):
# #     prompt = f"Is the role '{role}' regulated as per the NOC of Canada? Return a JSON response with a node called 'regulated' that has a value either 'Yes' or 'No' only."
# #     result = generate_response(prompt)  # Assuming generate_response() returns a JSON-formatted string like '{"regulated": "Yes"}'

# #     # Convert the JSON string to a Python dictionary
# #     response_data = json.loads(result)

# #     # Extract the 'regulated' value from the response data
# #     regulated_value = response_data.get('regulated', 'No')

# #     # Create a new dictionary with the 'regulated' node containing the value 'Yes' or 'No'
# #     response_data = {'regulated': regulated_value}

# #     # Convert the dictionary to a JSON string
# #     response_json_str = json.dumps(response_data)

# #     # Create an HttpResponse with the JSON content
# #     response = HttpResponse(response_json_str, content_type='application/json')

# #     return response


# # def is_regulated(request):
# #     prompt = f"Is the role '{role}' regulated as per the NOC of Canada? Return a JSON response with a node called 'regulated' that has a value either 'Yes' or 'No' only."
# #     result = generate_response(prompt)  # Assuming generate_response() returns a JSON-formatted string like '{"regulated": "Yes"}'

# #     # Convert the JSON string to a Python dictionary
# #     response_data = json.loads(result)
# #     print("result type:", type(response_data))

# #     regulated_value = response_data.get('regulated', 'No')
# #     if regulated_value == "Yes":
# #         response_data = {'regulated': 'Yes'}
# #     else:
# #         response_data = {'regulated': 'No'}

# #     # Create an HttpResponse with the JSON content
# #     response = HttpResponse(json.dumps(response_data), content_type='application/json')

# #     return response

# def get_License(request):

#     prompt = f'''
#     As an expert Regulatory Affairs Specialist. for the profession of "{role}" regulated by the government. provide what certifications, or exams I have to pass to be allowed to work as a "{role}" strictly following this template return reply as JSON array of objects: [ "regulated": true, "certifications": [ [ "title": "short name 7 tokens maximum", "desc": "description 25 tokens maximum" ], ... the rest of the certifications, exams. ] ]
#     '''
#     result = generate_response(prompt)
#     # return HttpResponse(result)
#     return result


# # def get_result(request):
# #     result1 = get_NOC(request)
# #     result2 = role_summary(request)
# #     # result3 = get_Education(request)
# #     # result4 = get_Experience(request)
# #     # result5 = networking(request)

# #       # bool_reg = is_regulated(request)
# #     # if bool_reg:
# #     #     result4 = get_License(request)
# #     # else:
# #     #     result4 = get_Experience(request)

# #     result1_data = json.loads(result1)
# #     result2_data = json.loads(result2)
# #     # result3_data = json.loads(result3)
# #     # result4_data = json.loads(result4)
# #     # result5_data = json.loads(result5)


# #     # Combine the results into a list
# #     # combined_data = [result1_data, result2_data, result3_data, result4_data, result5_data]
# #     combined_data = [result1_data, result2_data]
# #     # roadmap = [result3_data, result4_data, result5_data]
# #     # combined_data = [result1_data, result2_data, result3_data]
# #     # combined_data = [result1_data, result3_data]
# #     # combined_data = [result1_data]

# #     # Convert the list to a JSON string
# #     # response_content_json_str = json.dumps(combined_data)
# #     # print(type(roadmap))
# #     # roadmap_json = "\n".join(json.dumps(data) for data in roadmap)
# #     # print("ROADMAP JSON : \n",roadmap_json)
# #     # print(type(roadmap_json))

# #     # print(response_content_json_str)
# #     response_content_json_str = "\n".join(json.dumps(data) for data in combined_data)
# #     print(response_content_json_str)


# #     # Create an HttpResponse with the concatenated content
# #     response = HttpResponse(response_content_json_str, content_type='application/json')


# #     return response

# # def get_result(request):
# #     result1 = get_NOC(request)
# #     result2 = role_summary(request)
# #     result3 = get_Education(request)
# #     print("Type of result1: ",type(result1))
# #     print("Type of result2: ",type(result2))


# #     # Convert HttpResponse objects to strings
# #     result1_str = result1.content.decode('utf-8')
# #     result2_str = result2.content.decode('utf-8')
# #     print("Type: ",type(result1_str))

# #     result1_data = json.loads(result1_str)
# #     result2_data = json.loads(result2_str)

# #     # Combine the results into a list
# #     combined_data = [result1_data, result2_data]

# #     # Convert the list to a JSON string
# #     response_content_json_str = json.dumps(combined_data)

# #     # Create an HttpResponse with the concatenated content
# #     response = HttpResponse(response_content_json_str, content_type='application/json')

# #     return response
