import { nextServer } from "@/tools/routes";
import { validateProvinceCode } from "@/utils/utils";

export const fetchRoadmap = async (
  endpoint: string,
  profession: string,
  province: string,
  signal: AbortSignal | null = null,
) => {
  if (!endpoint || !profession || !province || !validateProvinceCode(province)) {
    throw new Error("Invalid province code or missing parameters");
  }

  const url = `${nextServer}/prompts?endpoint=${endpoint}&profession=${profession}&province=${province}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
