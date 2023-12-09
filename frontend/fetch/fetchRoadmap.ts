import { provincesLowercase } from "@/provinces";
import { nextServer } from "@/tools/routes";

export const fetchRoadmap = async (
  endpoint: string,
  profession: string,
  province: string,
  signal: AbortSignal | null = null,
) => {
  const allowedProvince = provincesLowercase.includes(province.toLowerCase());
  if (!endpoint || !profession || !province || !allowedProvince) {
    return;
  }

  const url = `${nextServer}/prompts?endpoint=${endpoint}&profession=${profession}&province=${province}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
