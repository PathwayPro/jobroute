import { fetchRoadmap } from "@/fetch/fetchRoadmap";
import { useEffect, useState } from "react";

async function getPromptResult(
  endpoint: string,
  profession: string,
  province: string,
) {
  try {
    const response = await fetchRoadmap(endpoint, profession, province);
    return response;
  } catch (error) {
    console.log(`Error fetching endpoint ${endpoint}`);
  }
}

export const usePrompt = (
  endpoint: string,
  profession: string,
  province: string,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState();

  useEffect(() => {
    if (!profession) return;
    getPromptResult(endpoint, profession, province).then((promptResult) => {
      setResult(promptResult);
      setIsLoading(false);
    });
  }),
    [profession, province];

  return { isLoading, result };
};
