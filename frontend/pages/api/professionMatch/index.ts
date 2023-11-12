import OpenAI from "openai";
import { NextApiHandler } from "next";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { province, profession }: any = req.query;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: `You are an expert in career path define that provides 
            Canadian education paths for ${profession} job in the Canadian ${province}`,
        },
        {
          role: "user",
          content: `Provide necessary information regarding related job roles with transferrable skills similar to the role of ${profession} for the region ${province}. Provide the information with job title, percentage similarity in 2 significant numbers and NOC. Provide a maximum of 5 other related jobs.Sort the result by percentage similarity. Please provide a response in JSON format in the following template:
        Example Template:
        {
          "title": "Related Jobs",
            "content": [
              {
                "title": "role title ",
                "percentage": "Percentage similarity ",
                "salary": "CAD min - CAD max', // give me the min and max salary range
                "NOC": "NOC"
              }
              // ... and so on for the rest of the steps
            ]
        }`,
        },
      ],
      temperature: 0,
      max_tokens: 712,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json(response.choices[0].message.content);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
