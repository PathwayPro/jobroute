import OpenAI from "openai";
import { NextApiHandler } from 'next';
import * as prompts from '@/fetch/roadmapPrompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { endpoint, province, profession, industry }: any = req.query;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: (prompts as any)[endpoint as any]({ province, profession, industry }) as any,
      temperature: 0,
      max_tokens: 712,
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

