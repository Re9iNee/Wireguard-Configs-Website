import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import JSZip from "jszip";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type generateConfigFiles = {
  serverStatus: string;
  inputConfig: string;
};
export async function generateConfigFiles({
  serverStatus,
  inputConfig,
}: generateConfigFiles) {
  // selects "08" in "08 ( 🔥 ) SHT"
  const serverNameRegex = /\d+/gi;
  const availableServers = serverStatus.matchAll(serverNameRegex);

  availableServers.next().value;
  const zip = new JSZip();

  for (let sv of availableServers) {
    // Replace 08 with S8
    const newSV = sv.toString().replace(/0(\d)/i, "$1");

    const newConfigText = inputConfig.replace(/= s\d+/i, `= s${newSV}`);

    zip.file(`${sv}.conf`, newConfigText);
    console.dir({ sv, newConfigText });
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "download.zip");
  });
}
