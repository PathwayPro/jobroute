#### PROMPT
##### text prompt:
 As an expert Regulatory Affairs Specialist. define the profession of "firefighter" regulated by the government.
If regulated provide what certifications, or exams I have to pass to be allowed to work as a "firefighter" strictly  following this template return reply as JSON array of objects:
{
  "regulated": true,
  "certifications": [
    {
      "title": "short name 7 tokens  maximum",
      "desc":  "description 25 tokens maximum"
    },
... the rest of the certifications, exams.
  ]
}

If not regulated return your reply strictly as a JSON object following this template:
{
"regulated": false,
"certifications": []
}

##### python code

``` python
def prompt_licensing(job_title):
    return [
        {
            'role': 'system',
            'content': f'As an expert Regulatory Affairs Specialist, define the profession of "{job_title}" regulated by the government.'
        },
        {
            'role': 'user',
            'content': f'If regulated, provide what certifications or exams I have to pass to be allowed to work as a "{job_title}" strictly following this template and return the reply as a JSON array of objects:\n'
                       '{\n'
                       '  "regulated": true,\n'
                       '  "certifications": [\n'
                       '    {\n'
                       '      "title": "short name (maximum 7 tokens)",\n'
                       '      "desc":  "description (maximum 25 tokens)"\n'
                       '    }\n'
                       '    ... the rest of the certifications and exams\n'
                       '  ]\n'
                       '}\n'
                       'If not regulated, return your reply strictly as a JSON object following this template:\n'
                       '{\n'
                       '  "regulated": false,\n'
                       '  "certifications": []\n'
                       '}'
        }
    ]
```
        
#### RESULT
if true (firefighter):
``` json
 {
  "regulated": true,
  "certifications": [
    {
      "title": "Firefighter I",
      "desc": "This certification is the basic level for firefighters and covers essential skills such as fire suppression, rescue operations, hazardous materials awareness, and emergency medical care."
    },
    {
      "title": "Firefighter II",
      "desc": "This certification builds upon Firefighter I and includes advanced skills in fire suppression, rescue techniques, hazardous materials operations, and incident command."
    },
    {
      "title": "Emergency Medical Technician (EMT)",
      "desc": "Many firefighters are required to hold an EMT certification to provide basic medical care at emergency scenes."
    },
    {
      "title": "Driver/Operator",
      "desc": "This certification is for firefighters who operate and maintain fire apparatus and equipment, ensuring their safe and effective use during emergency operations."
    },
    {
      "title": "Fire Officer",
      "desc": "Fire officers are responsible for managing and leading firefighting teams. This certification focuses on leadership, incident management, and administrative skills."
    }
  ]
}

```

if false:

``` json
 {
  "regulated": false,
  "certifications": []
}
```
