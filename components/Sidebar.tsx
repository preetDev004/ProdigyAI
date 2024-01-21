"use client"; // Because we use routes here

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  CodeIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    lable: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    lable: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    lable: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    lable: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    lable: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-emerald-700",
  },
  {
    lable: "Code Generation",
    icon: CodeIcon,
    href: "/code",
    color: "text-green-500",
  },
  {
    lable: "Settings",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-gray-300",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col bg-[#111827] h-full text-white">
      <div className="p-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="w-8 h-8 relative mr-4 ">
            <Image sizes="auto" fill alt="logo" src={"/logo.png"} />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            ProdigyAI
          </h1>
        </Link>

        <div className="space-y-1">
          {routes &&
            routes.map((route, index) => (
              <Link
                href={route.href}
                key={index}
                className={cn(
                  "text-sm group flex justify-start w-full p-3 font-md cursor-pointer hover:text-white  hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "bg-white/10 text-white"
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  {/* Here route.icon is component imported from lucide */}
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.lable}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
