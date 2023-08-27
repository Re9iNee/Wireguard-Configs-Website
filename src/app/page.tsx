"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { generateConfigFiles } from "@/lib/utils";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function Home() {
  // TODO: useTransition?
  const [file, setFile] = useState<string>("");
  const [serverStatus, setServerStatus] = useState<string>("");
  const { toast } = useToast();

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (evt) => {
      const fileContent = evt.target?.result;

      if (!fileContent) {
        toast({ title: "Empty Config File" });
        return;
      }

      setFile(fileContent.toString());
    };
    reader.onerror = () => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with reading your file.",
        variant: "destructive",
      });
    };
  };

  const onServerStatusChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setServerStatus(event.target.value);
  };

  const formSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    generateConfigFiles({ inputConfig: file, serverStatus });
  };

  return (
    <main className='flex items-center justify-center text-xs sm:text-sm md:text-md lg:text-lg'>
      <form
        className='flex flex-col  justify-center p-4 min-h-screen max-w-screen-md text-center gap-5'
        onSubmit={formSubmitHandler}
      >
        <div className='grid gap-2'>
          <Label htmlFor='config_file'>Config File</Label>
          <Input
            type='file'
            id='config_file'
            accept='.conf'
            onChange={onFileChange}
          />
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='server_status'>Server Status</Label>
          <Textarea
            className='placeholder:grayscale placeholder:opacity-40'
            id='server_status'
            onChange={onServerStatusChange}
            placeholder={"Paste your server status text"}
            rows={10}
          />
          {/* TODO: Paste button */}
          <p className='mt-2 text-xs text-muted-foreground'>
            You can obtain by sending your config file to this{" "}
            <Link
              target='_blank'
              className='underline hover:text-black'
              href='https://t.me/WireToolsBot'
            >
              Telegram Bot
            </Link>
          </p>
        </div>

        <Button>Export Config Files</Button>
      </form>

      <Toaster />
    </main>
  );
}
