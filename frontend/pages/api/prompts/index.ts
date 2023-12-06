import { NextApiHandler } from "next";
import { server } from "@/tools/routes";
import { capitalizeWords } from "@/utils/utils";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { endpoint, province, profession } = req.query as {
      endpoint: string;
      province: string;
      profession: string;
    };
    const url = `${server}/${endpoint}?profession=${capitalizeWords(
      profession,
    )}&province=${capitalizeWords(province)}`;

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
