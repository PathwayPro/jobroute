from .chatgpt import generate_response

def get_noc(role):
    prompt = f"As an AI assistant that provides Canadian Career Paths, get the NOC for the profession of '{role}'. Return a string of the NOC only."
    result = generate_response(prompt)
    print(result)
    return result



