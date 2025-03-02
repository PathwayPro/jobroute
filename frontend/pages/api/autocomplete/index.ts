import { server } from "@/tools/routes";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { query, location } = req.query;
    
    // Validate required parameters
    if (!query || !location) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Validate input lengths
    if (typeof query === 'string' && query.length > 100 || 
        typeof location === 'string' && location.length > 100) {
      return res.status(400).json({ error: "Input too long" });
    }

    const url = `${server}/topRoles?term=${encodeURIComponent(query)}&province=${encodeURIComponent(location)}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error: any) {
      const errorMessage = error.name === 'AbortError' 
        ? 'Request timeout' 
        : 'Internal server error';
      return res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
