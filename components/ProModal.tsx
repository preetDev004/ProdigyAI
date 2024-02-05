"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";

import {
  Check,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { Loader } from "@/components/Loader";
const tools = [
  {
    lable: "Conversation",
    icon: MessageSquare,
    border: "border-violet-500/20",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    desc: "Chat with AI to grab the knowledge about any topic",
  },
  {
    lable: "Image Generation",
    icon: ImageIcon,
    border: "border-pink-700/20",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    desc: "Turn words into art and create unique & surreal images with AI",
  },

  {
    lable: "Music Generation",
    icon: MusicIcon,
    border: "border-emerald-700/20",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    desc: "Elevate your musical journey to new heights with AI-generated melodies",
  },
  {
    lable: "Video Generation",
    icon: VideoIcon,
    border: "border-orange-700/20",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    desc: "Transform your ideas into reality by creating innovative videos with AI",
  },
  {
    lable: "Code Generation",
    icon: CodeIcon,
    color: "text-green-500",
    border: "border-green-500/20",
    bgColor: "bg-green-500/10",
    desc: "Ask AI to write code for you in any programming language!",
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false)
  const onSubscribe = async()=>{
    try {
      setLoading(true)
      const response =await axios.get('/api/stripe')
      window.location.href = response.data.url;
      
    } catch (error) {
      console.log(`[STRIPE_CLIENT_ERROR]: ${error}`)
    }finally{
      setLoading(false)
    }
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      {!loading ? <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center font-bold py-1 gap-x-2">
              Upgrade to ProdigyAI
              <Badge className="uppercase text-sm py-1" variant="premium">
                PRO
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 font-medium text-gray-200 ">
          
            {tools &&
              tools.map((tool, index) => (
                <Card
                  key={index}
                  className={`p-3 flex items-center justify-between bg-transparent border-2 ${tool.border} shadow-md`}
                >
                  <div className="flex gap-x-4 items-center">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>

                    <div className="font-semibold text-sm text-gray-200">
                      {tool.lable}
                    </div>
                  </div>
                  <Check className="text-gray-300 w-5 h-5" />
                </Card>
              ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubscribe} className="w-full focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 font-bold" variant="premium">
            Upgrade <Zap size={20} strokeWidth={3} absoluteStrokeWidth className="w-4 h-4 ml-2" />{" "}
          </Button>
        </DialogFooter>
      </DialogContent>:
      <DialogContent><Loader/></DialogContent>}
    </Dialog>
  );
};

export default ProModal;
