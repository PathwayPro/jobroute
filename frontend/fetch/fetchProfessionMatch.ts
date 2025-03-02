import { nextServer } from "@/tools/routes";
import { validateProvinceCode } from "@/utils/utils";

export const fetchMatches = async (profession: string, province: string) => {
  if (!profession || !province || !validateProvinceCode(province)) {
    throw new Error("Invalid province code or missing parameters");
  }
  
  const url = `${nextServer}/professionMatch?profession=${profession}&province=${province}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
