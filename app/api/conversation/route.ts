import { checkUserApiUsage, increaseApiUse } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("Open AI API key not configured", {
        status: 500,
      });
    }

    // Get the request body contents
    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    // Check that we're under our rate limit for this user before proceeding
    const isUnderLimit = await checkUserApiUsage();

    if (isUnderLimit) {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      await increaseApiUse();
      return NextResponse.json(response.choices[0].message, { status: 200 });
    }
    return new NextResponse("No free credits left.",{status:403})

    // return new NextResponse("Good", {status:200})
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
