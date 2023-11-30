import { nextServer } from "@/tools/routes";
import { useEffect, useState } from "react";

async function fetchAutocompleteResults(
  query: string,
  location: string,
): Promise<string[] | []> {
  const url = `${nextServer}/autocomplete?query=${query}&location=${location}`;
  const res = await fetch(url);
  const results = await res.json();
  let parsedResponse: { professions: string[] };

  try {
    parsedResponse = JSON.parse(results);
  } catch (error) {
    parsedResponse = results;
  }

  if (Array.isArray(parsedResponse.professions)) {
    return parsedResponse.professions;
  } else {
    return [];
  }
}

export function useAutocomplete(query: string, location: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [professionOptions, setProfessionOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    fetchAutocompleteResults(query, location).then((results) => {
      setProfessionOptions(results);
      setIsLoading(false);
    });
  }, [query]);

  return { isLoading, professionOptions };
}
