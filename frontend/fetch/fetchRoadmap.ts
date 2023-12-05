import { provincesLowercase } from "@/provinces";
import { nextServer } from "@/tools/routes";

export const fetchRoadmap = async (
  endpoint: string,
  profession: string,
  province: string,
) => {
  const allowedProvince = provincesLowercase.includes(province.toLowerCase());
  if (!endpoint || !profession || !province || !allowedProvince) {
    return;
  }

  const url = `${nextServer}/prompts?endpoint=${endpoint}&profession=${profession}&province=${province}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    throw error;
  }
};
