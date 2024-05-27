import { auth, currentUser,useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
 const { isLoaded, isSignedIn, user } = useUser();

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const subscriptions = await stripe.subscriptions.list({
        customer: String(userSubscription.stripeCustomerId)
    })
    return userSubscription.stripeCustomerId
      // const stripeSession = await stripe.billingPortal.sessions.create({
      //   customer: userSubscription.stripeCustomerId,
      //   return_url: settingsUrl,
      // })

    //   return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }else{
      console.log('email',user)
    }



    return new NextResponse(JSON.stringify({ state: user}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
