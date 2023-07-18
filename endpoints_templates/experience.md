# Experience section
This document show sthe sample prompts and the output for the prompt from chatGPT

### Prompt

'''
Based on the National Occupation Classification (NOC) by the Government of Canada, please provide information regarding the following job role.
For the role of “Nurse” in the region of “Canada”, Please provide a response including information regarding whether the role is classified as “Regulated” or “Non- regulated”. 
If the role is “Regulated”, Please provide necessary information regarding Licensing/ Certifications required to be successful in the role for the given region. Please provide the information in a step-by-step manner. Please provide a maximum of 10 steps.
If the role is “Non- regulated”, Please provide necessary information regarding Experience/Projects required to be successful in the role for the given region. Please provide the information in a step-by-step manner. Please provide a maximum of 10 steps.
Please provide a response in JSON format in the following template:
[First Step]: [20-word maximum description]
[Second Step]: [20-word maximum description]
.
.
.
[Final Step]: [20-word maximum description]
'''


### Result
``` jsonc
{
  "Role": "Nurse",
  "Region": "Canada",
  "Regulated": true,
  "Licensing/Certifications": [
    "Step 1: Complete a nursing education program approved by a provincial/territorial regulatory body.",
    "Step 2: Apply for registration with the regulatory body in the province/territory where you wish to practice.",
    "Step 3: Submit required documents, including proof of education, identity, and language proficiency.",
    "Step 4: Pass the Canadian Registered Nurse Examination (CRNE) or the National Council Licensure Examination (NCLEX-RN).",
    "Step 5: Complete a criminal record check and provide any additional requested documentation.",
    "Step 6: Pay the registration fee and any other applicable fees.",
    "Step 7: Receive your license to practice as a registered nurse in the province/territory.",
    "Step 8: Maintain your license by meeting continuing competency requirements, such as completing continuing education courses.",
    "Step 9: Renew your license annually or as required by the regulatory body.",
    "Step 10: Stay updated with any changes in regulations or requirements set by the regulatory body."
  ]
}

```
