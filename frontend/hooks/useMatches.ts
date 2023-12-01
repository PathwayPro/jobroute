import { fetchMatches } from "@/fetch/fetchProfessionMatch";
import { useEffect, useState } from "react";

interface Response {
  title: string;
  content: Matches[];
}

interface Matches {
  title: string;
  Percentage: string;
  NOC: string;
}

async function getProfessionMatches(
  profession: string,
  province: string,
): Promise<Response> {

  try {
    const response = await fetchMatches(profession, province);
    return response;
  } catch (error) {
    throw new Error("Error fetching matches");
  }
}

export const useMatches = (profession: string, province: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Matches[]>([]);

  useEffect(() => {
    if (!profession) return;
    getProfessionMatches(profession, province).then((matches) => {
      setMatches(matches.content);
      setIsLoading(false);
    });
  }),
    [profession, province];

  return { isLoading, matches };
};
