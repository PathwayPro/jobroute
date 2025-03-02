import { NextApiHandler } from "next";
import { server } from "@/tools/routes";
import { validateProvinceCode } from "@/utils/utils";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { province, profession } = req.query;
    
    if (!validateProvinceCode(province as string)) {
      return res.status(400).json({ error: "Invalid province code" });
    }

    const url = `${server}/relatedRoles?profession=${profession}&province=${province}`;

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
