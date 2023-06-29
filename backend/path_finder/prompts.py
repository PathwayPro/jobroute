# ===============================
# if both job and skills are entered
# ===============================

def job_transfer_skill_transfer(user_job_title,user_current_skills):
    return [
            {"role": "system", "content": "You are an AI assistant that provides job transfer and skills transfer recommendations based on the user's input."},
            {"role": "user", "content": f'Please provide a only a JSON format response output based on the NOC code resulting from the user\'s job title input and also based on the skills from user\'s inputs. The output should include the original job title, and a node called "similar_jobs" with sub-nodes containing "job_title", "noc_code", and "percent_similarity" for each of the 5 similar jobs. User job title: {user_job_title} and then a node for "current_user_skills", and a node called "similar_skills" with sub-nodes containing "skill_title", and "percent_similarity" for each of the 5 similar skills. User has input their current skills as: {user_current_skills}'}
        ]

# ===============================
# if job is entered
# ===============================

def job_transfer(user_job_title):
    return [
        {"role": "system", "content": "You are an AI assistant that provides job transfer recommendations based on the user's input."},
        {"role": "user", "content": f'Please provide a only a JSON format response output based on the NOC code resulting from the user\'s job title input. The output should include the original job title, and a node called "similar_jobs" with sub-nodes containing "job_title", "noc_code", and "percent_similarity" for each of the 5 similar jobs. User job title: {user_job_title}'}
    ]

# ===============================
# if skills are entered
# ===============================

def skill_transfer(user_current_skills):
    return [
        {"role": "system", "content": "You are an AI assistant that provides skill transfer recommendations based on the user's input."},
        {"role": "user", "content": f'Please provide a only a JSON format response output based on the skills from user\'s inputs. The output should include a node for "current_user_skills", and a node called "similar_skills" with sub-nodes containing "skill_title", and "percent_similarity" for each of the 5 similar skills. User has input their current skills as: {user_current_skills}'}
    ]

# ===============================
# in this part path suggestions start, based on the selection of user UI
# ===============================

def propmt_course_suggester_job_based(job_title, noc_code):
    return [
            {"role": "system", "content": "You are an AI assistant that provides education requirements for jobs based on the user's input."},
            {"role": "user", "content": f"I am looking for education requirements for the job {job_title} with NOC code {noc_code}, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job.\n\nPlease provide a response in JSON format only for the given NOC code. Include a node called 'education_requirements' with sub-nodes containing 'type' (degree, diploma, certificate, designation), 'institution' (name of the institution or establishment or whatever it is that is offering this programm), 'description' (please specify the exact course or program name if possible), 'length' (specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.), and 'link' (Please provide the link to the official homepage or index page of the institution, establishment, or program you are referring to. In case the page is not found (404 error), kindly provide the homepage address without any additional forward slashes, for instance i dont want https://www.utoronto.ca/computer-science i just need https://www.utoronto.ca/)"},
    ]
def propmt_course_suggester_skill_based(selected_skill):
    return [
            {"role": "system", "content": "You are an AI assistant that provides education requirements for jobs based on the user's input."},
            {"role": "user", "content": f"I am looking for education requirements for the specific skill {selected_skill}, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job.\n\nPlease provide a response in JSON format only for the given NOC code. Include a node called 'education_requirements' with sub-nodes containing 'type' (degree, diploma, certificate, designation), 'institution' (name of the institution or establishment or whatever it is that is offering this programm), 'description' (please specify the exact course or program name if possible), 'length' (specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.), and 'link' (Please provide the link to the official homepage or index page of the institution, establishment, or program you are referring to. In case the page is not found (404 error), kindly provide the homepage address without any additional forward slashes, for instance i dont want https://www.utoronto.ca/computer-science i just need https://www.utoronto.ca/)"},
    ]
