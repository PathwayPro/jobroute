import { NextApiHandler } from 'next';
import {projects, education, networking, overview, info, skills} from '@/tools/mocks';

const handler: NextApiHandler = (req, res) => {
  res.status(200).json({ projects, education, networking, overview, info, skills });
}

export default handler;
