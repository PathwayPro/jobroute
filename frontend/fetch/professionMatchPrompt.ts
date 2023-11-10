type Props = {
  profession: string;
  province: string;
};
export const professionMatch = ({ profession, province }: Props) => {
  return [
    {
      role: 'system',
      content: `You are an expert in career path define that provides 
            Canadian education paths for ${profession} job in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `Provide necessary information regarding related job roles with transferrable skills similar to the role of ${profession} for the region ${province}. Provide the information with job title, percentage similarity in 2 significant numbers and NOC. Provide a maximum of 5 other related jobs.Sort the result by percentage similarity. Please provide a response in JSON format in the following template:
        Example Template:
        {
          "title": "Related Jobs",
            "content": [
              {
                "title": "role title ",
                "Percentage": "Percentage similarity ",
                "NOC": "NOC"
              }
              // ... and so on for the rest of the steps
            ]
        }`
      ,
    }
  ];
};

export default professionMatch;