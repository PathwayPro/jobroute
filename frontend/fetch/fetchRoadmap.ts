import { server } from "@/tools/routes";

const fetchRoadmap = async (
  endpoint: string,
  profession: string,
  province: string,
) => {
  const url = `${server}/prompts?endpoint=${endpoint}&profession=${profession}&province=${province}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchRoadmap:", error);
    throw error;
  }
};

export default fetchRoadmap;
