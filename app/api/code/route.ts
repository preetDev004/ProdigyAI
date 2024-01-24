import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// pre-instructions
const instructions : ChatCompletionMessageParam ={
  role:"system",
  content: "You are a super powerful code generator. You must answer only in markdown code snippets. Use code comments for explaination. You must use only one markdown code snippet for answring a question!"
}

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

    if(!messages){
        return new NextResponse("Messages are required", {status:400})
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[instructions, ...messages]
    })
    return NextResponse.json(response.choices[0].message, {status:200})
    // return new NextResponse("Good", {status:200})

  } catch (error) {

    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
