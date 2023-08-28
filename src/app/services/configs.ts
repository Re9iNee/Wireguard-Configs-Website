import { Configs } from "@/types/configs";

export async function insertConfigToDB(data: Configs) {
  const response = await fetch("/api/config", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}
