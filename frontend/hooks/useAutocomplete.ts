import { server } from "@/tools/routes";
import { useEffect, useState } from "react";

async function fetchAutocompleteResults(query: string, location: string) {
  const url = `${server}/autocomplete?term=${query}&province=${location}`;
  const res = await fetch(url);
  console.log('res', res)
  const results = await res.json();
  // TODO: deal with empty response that comes as "I'm sorry, but I couldn't find any relevant professions that start with the symbols \"weinfwei\" in the Canadian context. It's possible that those symbols do not correspond to any recognized professions. Can I assist you with anything else?"
  console.log('results na function', results)
  return JSON.parse(results);
}

export function useAutocomplete(query: string, location: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [professionOptions, setProfessionOptions] = useState([]);

  useEffect(() => {
    if (!query) return;
    fetchAutocompleteResults(query, location).then((results) => {
      setProfessionOptions(results);
      setIsLoading(false);
    });
  }, [query]);

  return { isLoading, professionOptions };
}