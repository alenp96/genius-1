import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

import { hasSubscription ,createCustomerIfNull,createCheckoutLink} from "@/lib/stripe";
const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    console.log('user-->',user?.emailAddresses[0].emailAddress)
    
    const sub1 = await hasSubscription();
    const customer = await createCustomerIfNull(String(user?.emailAddresses[0]?.emailAddress));
    const checkoutLink = await createCheckoutLink(String(customer),String(userId));
    // console.log('subs',sub,customer,checkoutLink)
    const sub = false;
    // const customer = await createCustomerIfNull(String(user?.emailAddresses[0]?.emailAddress));
  
    console.log('subs ,customer-->',sub1,customer)
  

    return new NextResponse(JSON.stringify({ sub: sub1,link:checkoutLink}))

    // return new NextResponse(JSON.stringify({ url: 'url' }))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
