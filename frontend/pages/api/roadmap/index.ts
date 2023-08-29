import { NextApiHandler } from 'next';
import {overview, info, skills} from '@/tools/mocks';

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ overview, info, skills });
}

export default handler;
