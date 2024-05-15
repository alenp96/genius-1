import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
export async function GET() {
  try {
    // const { userId } = auth();
    // const user = await currentUser();

    // if (!userId || !user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const file = await fs.readFile(process.cwd() + "/json/data.json", "utf8");
    console.log('data',file)

    return new NextResponse(JSON.stringify(file));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
