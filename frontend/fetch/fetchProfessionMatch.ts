import { server } from "@/tools/routes";

export const fetchMatches = async (profession: string, province: string) => {
  const url = `${server}/professionMatch?profession=${profession}&province=${province}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in fetchMatches:", error);
    throw error;
  }
};
