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
    const { prompt, amount=1, resolution="512x512" } = body;

    if(!prompt){
        return new NextResponse("Prompt is required", {status:400})
    }
    if(!amount){
        return new NextResponse("Amount is required", {status:400})
    }
    if(!resolution){
        return new NextResponse("Resolution is required", {status:400})
    }
  

    const response = await openai.images.generate({
        prompt:prompt,
        n:parseInt(amount,10),
        size:resolution
    })
  
    return NextResponse.json(response, {status:200})
    // return new NextResponse("Good", {status:200})

  } catch (error) {

    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
