type Props = {
  profession: string;
  industry?: string;
  province: string;
};
export const education = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `I want you to provide me a list of any degrees, diplomas, certificates, or designations required by the ${profession} role specifically in ${province}, strictly follow this template and return reply as a JSON array of objects, not more then 6 points.
        {"title": "Education / Training",
        "content": [
          {
             "title": "short name (maximum 7 tokens)",
             "desc":  "description (maximum 20 tokens)"
          },
          ... //the rest of the certifications and exams
        },
`,
    },
  ];
};

export const qualification = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `Act as an expert Regulatory Affairs Specialist with a specialization in the ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: ` Check if ${profession} job regulated and licensed in Canadian ${province}.
       If regulated  provide what certifications or exams I have to pass to be allowed to work as a "${profession}" in Canadian ${province}
      If not regulated, provide necessary information regarding Experience / Projects required to be successful in the role of ${profession} job for the Canadian ${province}.
Strictly follow this template and return the reply as a JSON object of 6 objects in content property:
             {"title": "Licensing / Certification" if licensed, and "Experience / Projects" if not licensed,
              "content": [
                 {
                   "title": "short name (maximum 7 tokens)",
                   "desc":  "description (maximum 20 tokens)"
                 }
                 ... //the rest of the certifications and exams
               ]'
             }
`,
    },
  ];
};

export const networking = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `Describe what I have to do in my job search and networking required to be successful in the role of the ${profession} role specifically in Canadian ${province}, strictly follow this template and return reply as a JSON array of objects, not more then 6 points.
        {"title": "Job Search / Networking",
        "content": [
          {
             "title": "short name (maximum 7 tokens)",
             "desc":  "description (maximum 20 tokens)"
          },
          ... //the rest of the certifications and exams
        },
`,
    },
  ];
};

export const overview = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `Give me a detailed description and responsibilities, pros and cons of the ${profession} role specifically in Canadian ${province}, return your response as one line string following this JSON template:
      [ "description 60 tokens min and 120 tokens max" ]
      `,
    },
  ];
};

export const info = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `
        Provide me data according to this JSON template for the ${profession} job at the Canadian ${province}:
[
  {
    title: 'Salary',
    content: [
      'CAD min - CAD max', //give me the min and max salary range
      'will vary according to seniority',
    ]
  },
  {
    title: "Degree",
    content: [
      "return is it mandatory to have a degree 2 3 tokens max."
    ],
  },
  {
    title: 'Work',
    content: [ // operating next phrases show the relevant options fot the chosen ${profession} at Canadian ${province}
      "Remote | Hybrid | In Person",
      "Part-time | Full-time | Contract Freelance | Consulting",
    ],
  },
  {
    title: 'Credential Validation',
    content: [
      'Not required' or 'Requered'
    ],
  },
  {
    title: 'Language Proficiency',
    content: [
      'using 10 tokens tell about recommended language proficiency',
    ],
  },
];

      `,
    },
  ];
};

export const skills = ({ profession, province, industry }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `Return 10 crucial core hard skills, and 10 core soft skills for the ${profession} role specifically in Canadian ${province}, strictly follow this template and return reply as a JSON array of objects.
[
  {
    "title": "Core Hard Skills",
    "content": [ "only title max 3 tokens", ...etc ]
  },
  {
    "title": "Soft Skills",
    "content": [ "only title max 3 tokens", ...etc ]
  }
]
`,
    },
  ];
};
