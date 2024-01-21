"use client";

import {
  ArrowRight,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const tools = [
  {
    lable: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    desc: "Chat with AI to grab the knowledge about any topic",
  },
  {
    lable: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    desc: "Turn words into art and create unique & surreal images with AI",
  },
  {
    lable: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    desc: "Convert your ideas into videos with AI",
  },
  {
    lable: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-700",
    bgColor: "bg-emerald-700/10",
    desc: "Get your first verse with AI from text",
  },
  {
    lable: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    desc: "Ask AI to write code for you in any programming language!",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl text-center font-bold">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Interact and Unleash Your Creativity with the smartest ProdigyAI
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools &&
          tools.map((tool, index) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={index}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">{tool.lable}</div>
                  <div className="text-sm md:text-md font-light text-muted-foreground">
                    {tool.desc}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default DashboardPage;
