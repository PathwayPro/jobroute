#### PROMPT
##### text prompt:
 as an AI assistant that provides Canadian education paths for welder, tell me what are the Canadia education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly  follow this template and return reply as a JSON array of objects,

 Include these nodes 'type' (degree, diploma, certificate, designation), 'institution name' (name of the institution or establishment or whatever it is that is offering this programm), 'description' (please provide a very short description of the exact course or program), 'length' (specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.), 'cost' (provide in Canadian dollars)


    {
      "type": "(degree, diploma, certificate, designation)",
      "institution name":  "(name of the institution or establishment or whatever it is that is offering this programm)",
      "description": "(please provide a very short description of the exact course or program)",
      "length": "(specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.)",
      "cost": "(provide in Canadian dollars)"
    }

##### python code

``` python
def prompt_licensing(job_title):
    return [
        {
            'role': 'system',
            'content': f'as an AI assistant that provides Canadian education paths for "{job_title}".'
        },
        {
            'role': 'user',
            'content': f'for "{job_title}" tell me what are the Canadian education requirements, I want you to provide a list of any degrees, diplomas, certificates, or designations required by the job, strictly follow this template and return reply as a JSON array of objects, Include these nodes "type" (degree, diploma, certificate, designation), "institution_name" (name of the institution or establishment or whatever it is that is offering this program), "description" (please provide a very short description of the exact course or program), "length" (specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.), "cost" (provide in Canadian dollars)\n\
            {{\n\
            "type": "(degree, diploma, certificate, designation)",\n\
            "institution_name":  "(name of the institution or establishment or whatever it is that is offering this program)",\n\
            "description": "(please provide a very short description of the exact course or program)",\n\
            "length": "(specify the length and the unit, e.g., 2 years, 4 years, 6 months, 2 weeks, etc.)",\n\
            "cost": "(provide in Canadian dollars)"\n\
            }}'
        }
    ]
```
        
#### RESULT

``` json
 [
  {
    "type": "Diploma",
    "institution name": "British Columbia Institute of Technology",
    "description": "Welder Foundation Program",
    "length": "6 months",
    "cost": "Approximately $5,000"
  },
  {
    "type": "Diploma",
    "institution name": "Northern Alberta Institute of Technology",
    "description": "Welding Engineering Technician Program",
    "length": "2 years",
    "cost": "Approximately $12,000"
  },
  {
    "type": "Certificate",
    "institution name": "Southern Alberta Institute of Technology",
    "description": "Welding Fundamentals Certificate",
    "length": "3 months",
    "cost": "Approximately $3,000"
  },
  {
    "type": "Diploma",
    "institution name": "Saskatchewan Polytechnic",
    "description": "Welding Certificate",
    "length": "1 year",
    "cost": "Approximately $8,000"
  }
]


```