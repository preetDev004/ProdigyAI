"use client";

import { Montserrat } from "next/font/google";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  // useAuth is basically same as Auth that we have used in this project But this is a hook used
  // at client side in client compponents
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 flex items-center bg-transparent justify-between">
      <Link href={"/"} className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image src={"/logo.png"} alt="logo" fill />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          ProdigyAI
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant={"outline"} className="rounded-full">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
