import { server } from "@/tools/routes";
import { useEffect, useState } from "react";

async function fetchAutocompleteResults(query: string, location: string) {
  const url = `${server}/autocomplete?term=${query}&province=${location}`;
  const res = await fetch(url);
  const results = await res.json();
  let parsedResponse;

  try {
    parsedResponse = JSON.parse(results);
  } catch (error) {
    parsedResponse = results;
  }

  if (Array.isArray(parsedResponse)) {
    return parsedResponse;
  } else {
    return [];
  }
}

export function useAutocomplete(query: string, location: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [professionOptions, setProfessionOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    fetchAutocompleteResults(query, location).then((results) => {
      setProfessionOptions(results);
      setIsLoading(false);
    });
  }, [query]);

  return { isLoading, professionOptions };
}