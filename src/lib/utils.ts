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
  // selects "S08" in "[ S08 ] ( 🟠 ) [ PSD ]"
  const serverNameRegex = /S\d+\w+/gi;
  const availableServers = serverStatus.matchAll(serverNameRegex);

  availableServers.next().value;
  const zip = new JSZip();

  for (let sv of availableServers) {
    // Replace S08 with S8
    const newSV = sv.toString().replace(/S0(\d)/i, "S$1");

    const newConfigText = inputConfig.replace(/= s\d+/i, `= ${newSV}`);

    zip.file(`${sv}.conf`, newConfigText);
    console.dir({ sv, newConfigText });
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "download.zip");
  });
}
