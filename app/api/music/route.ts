import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import  Replicate from  "replicate";

const replicate = new Replicate({
  auth:process.env.REPLICATE_API_KEY
})

export const POST = async (req: Request) => {
  try {

    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the request body contents
    const body = await req.json();
    const { prompt } = body;

    if(!prompt){
        return new NextResponse("Prompt is required", {status:400})
    }
   
    const response = await replicate.run(
      `riffusion/${process.env.MUSIC_API_KEY}`,
      {
        input: {
          prompt_a: prompt
        }
      }
    );
  
    return NextResponse.json(response, {status:200})
    // return new NextResponse("Good", {status:200})

  } catch (error) {

    console.log("[MUSIC_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
