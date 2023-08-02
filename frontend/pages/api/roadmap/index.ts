import { NextApiHandler } from 'next';
import {cards, overview, info, skills} from '@/tools/mocks';

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ cards, overview, info, skills });
}

export default handler;
