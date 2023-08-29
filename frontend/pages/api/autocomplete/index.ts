
import OpenAI from "openai";
import { NextApiHandler } from 'next';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { province, term }: any = req.query;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      // model: "gpt-4",
      messages:[
    {
      role: 'system',
      content: `You are an expert career consultant and a pro in professions definitions in the Canadian ${province}`,
    },
    {
      role: 'user',
      content: `Return 5 most relevant professions started with "${term}" symbols in the Canadian ${province} as JSON array of strings`,
    },
  ],
      temperature: 0,
      max_tokens: 50,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json(response.choices[0].message.content);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler;

