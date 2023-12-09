import { fetchMatches } from "@/fetch/fetchProfessionMatch";

interface Response {
  title: string;
  content: Matches[];
}

interface Matches {
  title: string;
  Percentage: string;
  NOC: string;
}

export async function getProfessionMatches(
  profession: string,
  province: string,
): Promise<Response> {
  try {
    const response = await fetchMatches(profession, province);
    return response;
  } catch (error) {
    console.log("Error fetching matches");
    return { title: "", content: [] };
  }
}
