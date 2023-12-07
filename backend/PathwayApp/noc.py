from .chatgpt import generate_response
from .errorhandling import extract_numeric_noc1

def get_noc(role):
    prompt = f"As an AI assistant that provides Canadian Career Paths, get the NOC for the profession of '{role}'. Return a string of the NOC only."
    result = generate_response(prompt)
    print(f"printing raw NOC: {result}")
    clean_result = extract_numeric_noc1(result)
    print(f"printing cleaned NOC: {clean_result}")
    return clean_result



