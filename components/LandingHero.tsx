"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import TypewritterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-10 md::py-36 space-y-5 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl space-y-5 font-extrabold mb-32">
        <h1>The Best AI Tool For</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-500 via-pink-500 to-purple-500 ">
          <TypewritterComponent
            options={{
              strings: [
                "Chat Bot.",
                "Photo Generation.",
                "Photo Generation.",
                "Video Generation.",
                "Music Generation.",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
              cursor: "|", // This sets the cursor to the pipe character
              cursorClassName: cn("cursor-blink text-pink-400 font-medium "),
            }}
          />
        </div>
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant={"premium"}
            className="md:text-lg p-4 md:p-6 font-semibold rounded-full "
          >
            {" "}
            Start Generating For Free
          </Button>
        </Link>
      </div>

      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required
      </div>
    </div>
  );
};

export default LandingHero;
