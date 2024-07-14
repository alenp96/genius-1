import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

import { hasSubscription ,createCustomerIfNull,createCheckoutLink,expiry} from "@/lib/stripe";
const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    console.log('reached')
    const user = await currentUser();
    console.log('user-->',user?.emailAddresses[0].emailAddress)
    
    const sub1 = await hasSubscription();
    
    const _expiry = await expiry();
    const customer = await createCustomerIfNull(String(user?.emailAddresses[0]?.emailAddress));
  
    const checkoutLink = await createCheckoutLink(String(customer),String(userId));
    // console.log('subs ,customer-->',sub1,customer)
  
    return new NextResponse(JSON.stringify({ sub: sub1,link:checkoutLink,exp:_expiry}))

    // return new NextResponse(JSON.stringify({ url: sub1 ,exp:_expiry,customer:customer,checkoutLink:''}))
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
