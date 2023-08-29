import { server } from "@/tools/routes";

const fetchServerData = async (
  endpoint: string,
  profession: string,
  industry: string,
  province: string
) => {
  const url = `${server}/prompts?endpoint=${endpoint}&profession=${profession}&industry=${industry}&province=${province}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();

  } catch (error) {
    console.error('Error in fetchServerData:', error);
    throw error;
  }
}

export default fetchServerData;
