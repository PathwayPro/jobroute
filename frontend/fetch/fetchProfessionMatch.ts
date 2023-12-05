import { provincesLowercase } from "@/provinces";
import { nextServer } from "@/tools/routes";

export const fetchMatches = async (profession: string, province: string) => {
  const allowedProvince = provincesLowercase.includes(province.toLowerCase());
  if (!profession || !province || !allowedProvince) {
    return;
  }
  const url = `${nextServer}/professionMatch?profession=${profession}&province=${province}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error in fetchMatches:", error);
    throw error;
  }
};
