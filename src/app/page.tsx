import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <main className='items-center justify-between p-24 flex min-h-screen flex-col'>
      <form action=''>
        <div className=''>
          <Label htmlFor='config_file'>Config File</Label>
          <Input type='file' id='config_file' />
        </div>

        <div className=''>
          <Label htmlFor='server_status'>Server Status</Label>
          <Textarea id='server_status' />
        </div>
  <Button>Export Config Files</Button>
        
      </form>
    </main>
  );
}
