import { auth, currentUser,useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";


const settingsUrl = absoluteUrl("/settings");

export async function GET(req:any) {
  console.log('request',req)
  const url= new URL(req.url)
  const search_params= new URLSearchParams(url.searchParams)
 const session_id= search_params.get('session_id')
  try {
    const { userId,user } = auth();
 



    return new NextResponse(JSON.stringify({ state: session_id}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
