import { main } from "@/tools/mocks";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.status(200).json(main);
};

export default handler;
