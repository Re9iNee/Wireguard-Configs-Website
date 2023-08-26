import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { readFileSync } from "fs";
import path from "path";

export default function Home() {
  const serverStatus = readFileSync(
    path.join("./public/mocks/serverStatus.txt"),
    "utf8"
  );

  return (
    <main className='flex flex-col items-center justify-between p-24  min-h-screen'>
      <form action='' className='text-center grid gap-2'>
        <div>
          <Label htmlFor='config_file'>Config File</Label>
          <Input type='file' id='config_file' />
        </div>

        <div>
          <Label htmlFor='server_status'>Server Status</Label>
          <Textarea
            className='placeholder:grayscale placeholder:opacity-40'
            id='server_status'
            placeholder={serverStatus}
            rows={10}
          />
        </div>

        <Button>Export Config Files</Button>
      </form>
    </main>
  );
}
