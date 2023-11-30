import { server } from "@/tools/routes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { query, location } = req.query;
    const url = `${server}/topRoles?term=${query}&province=${location}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;