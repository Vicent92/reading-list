"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatBotDemo } from "./components/ai-chat-elements";
// import { logoutUser } from "@/app/actions";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  // const handleLogout = async () => {
  //   await logoutUser();
  // };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            Volver a la lista de lectura
          </Button>
        </Link>
        {/*<Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>*/}
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatBotDemo />
      </div>
    </div>
  );
}
