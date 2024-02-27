import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkUserApiUsage, increaseApiUse } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the request body contents
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // Check that we're under our rate limit for this user before proceeding
    const isUnderLimit = await checkUserApiUsage();
    const isPro = await checkSubscription();

    if (!isUnderLimit && !isPro) {
      return new NextResponse("No free credits left.", { status: 403 });
    }
    const response = await replicate.run(
      `riffusion/${process.env.MUSIC_API_KEY}`,
      {
        input: {
          prompt_a: prompt,
        },
      }
    );
    if (!isPro) {
      await increaseApiUse();
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
