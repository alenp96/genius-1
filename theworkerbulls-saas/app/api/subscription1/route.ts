import { auth, currentUser,useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";


const settingsUrl = absoluteUrl("/settings");

export async function GET(  req: NextApiRequest,
  res: NextApiResponse) {
  try {
    const { userId,user } = auth();
    console.log('request-->',req)


    return new NextResponse(JSON.stringify({ state: 'url'}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
