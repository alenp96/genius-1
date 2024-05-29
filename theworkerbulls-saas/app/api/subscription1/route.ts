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
 console.log('session_id',session_id)
  try {
    const { userId } = auth();
    const user = await prismadb.userSubscription.findUnique({
      //@ts-ignore
      where: { userId: userId },
    });

  
    const subscription = await stripe.subscriptions.list({
      customer: String(user?.stripeCustomerId)
  })
  console.log('subscription1 -->',subscription)
    await prismadb.userSubscription.update({
      where: {
        
        userId: userId as string,
      },
      data: {
        stripePriceId: subscription?.data[0]?.id as string,
        stripeSubscriptionId: subscription?.data[0]?.id as string,
        stripeCurrentPeriodEnd: new Date(
          subscription?.data[0]?.current_period_end * 1000
        ),
      },
    })
    console.log('subscriptions',subscription.data[0].id)

    return new NextResponse(JSON.stringify({ state: subscription?.data[0]?.id}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
