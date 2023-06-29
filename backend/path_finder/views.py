from django.shortcuts import render
from dotenv import load_dotenv
import os
import openai
import json
from prompts import job_transfer_skill_transfer, job_transfer, skill_transfer, propmt_course_suggester_job_based, propmt_course_suggester_skill_based

# ========================================
# Ai function for similar jobs and skills


def handle_both_inputs( user_job_title, user_current_skills):
    # Load environment variables from .env file
    load_dotenv()
    # Access the OpenAI API key from environment variable
    openai.api_key = os.getenv("OPENAI_API_KEY")

    conversation = job_transfer_skill_transfer(user_job_title, user_current_skills)

    # Call the OpenAI API to generate the AI assistant's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    # Extract the AI assistant's reply from the response
    assistant_reply = response.choices[0].message["content"]
    response_json = json.loads(assistant_reply)

    # Create the response JSON object
    ai_response = {
        "original_job_title": user_job_title,
        "original_skills": user_current_skills,
        "similar_jobs": response_json["similar_jobs"],
        "similar_skills": response_json["similar_skills"],
    }

    print (ai_response)
    return ai_response


# ========================================
# Ai function for similar jobs only


def handle_job_title_only(user_job_title):
    # Load environment variables from .env file
    load_dotenv()
    # Access the OpenAI API key from environment variable
    openai.api_key = os.getenv("OPENAI_API_KEY")

    conversation = job_transfer(user_job_title)

    # Call the OpenAI API to generate the AI assistant's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    # Extract the AI assistant's reply from the response
    assistant_reply = response.choices[0].message["content"]
    response_json = json.loads(assistant_reply)

    # Create the response JSON object
    ai_response = {
        "original_job_title": user_job_title,
        "similar_jobs": response_json["similar_jobs"],
    }
    print (ai_response)
    return ai_response


# ========================================
# Ai function for similar skills only


def handle_current_skills_only(user_current_skills):
    # Load environment variables from .env file
    load_dotenv()
    # Access the OpenAI API key from environment variable
    openai.api_key = os.getenv("OPENAI_API_KEY")

    conversation = skill_transfer(user_current_skills)

    # Call the OpenAI API to generate the AI assistant's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    # Extract the AI assistant's reply from the response
    assistant_reply = response.choices[0].message["content"]
    response_json = json.loads(assistant_reply)

    # Create the response JSON object
    ai_response = {
        "original_skills": user_current_skills,
        "similar_skills": response_json["similar_skills"],
    }

    print (ai_response)
    return ai_response


# ===========================================================================
# function to be activated based on user input, either job or skills or both
# result would be either similar jobs or similar skills  or both


def job_skill_transfer():
    user_job_title = input("Enter your current or most recent job title: ")
    user_current_skills = input("Enter your skills: ")

    if user_job_title and user_current_skills:
        return handle_both_inputs(user_job_title, user_current_skills)

    elif user_job_title:
        return handle_job_title_only(user_job_title)

    elif user_current_skills:
        return handle_current_skills_only(user_current_skills)


# ====================================================
# function to suggest courses based on a job


def course_suggester_job_based():
    job_title = input("based on offered similar jobs, Enter your chosen job title: ")
    noc_code = input("and enter the related NOC code: ")

    # Load environment variables from .env file
    load_dotenv()
    # Access the OpenAI API key from environment variable
    openai.api_key = os.getenv("OPENAI_API_KEY")

    conversation = propmt_course_suggester_job_based(job_title, noc_code)

    # Call the OpenAI API to generate the AI assistant's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    # Extract the AI assistant's reply from the response
    assistant_reply = response.choices[0].message["content"]
    response_json = json.loads(assistant_reply)

    # Create the response JSON object
    response = {
        "selected_job": job_title,
        "education_requirements": response_json["education_requirements"],
    }
    print (response)
    return response


# ====================================================
# function to suggest courses based on a skill


def course_suggester_skill_based():
    selected_skill = input(
        "based on offered similar skills, Enter your selected_skill: "
    )

    # Load environment variables from .env file
    load_dotenv()
    # Access the OpenAI API key from environment variable
    openai.api_key = os.getenv("OPENAI_API_KEY")

    conversation = propmt_course_suggester_skill_based(selected_skill)

    # Call the OpenAI API to generate the AI assistant's response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=conversation
    )

    # Extract the AI assistant's reply from the response
    assistant_reply = response.choices[0].message["content"]
    response_json = json.loads(assistant_reply)

    # Create the response JSON object
    response = {
        "selected_skill": selected_skill,
        "education_requirements": response_json["education_requirements"],
    }
    print (response)
    return response


job_skill_transfer()
course_suggester_job_based()
course_suggester_skill_based()
