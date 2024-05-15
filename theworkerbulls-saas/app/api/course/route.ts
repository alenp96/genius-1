import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import{db} from "../../../lib/db"

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
   
    
        try {
          const courses = await db.course.findFirst({
            select: {
              id: true,
              content:true,
              students:true,
              name:true,
              description :true,
              image:true,

              instructor: true,
            },
            where: { id: "65361d7ba16358bff66f5fbc" },
          });

        return NextResponse.json({ data: courses });
       
        } catch (error) {
          console.error(error);
      return new NextResponse("Prompt is required", { status: 500 });
        }
    // const { prompt, amount = 1, resolution = "512x512" } = body;

    // if (!prompt) {
    //   return new NextResponse("Prompt is required", { status: 400 });
    // }

 
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
