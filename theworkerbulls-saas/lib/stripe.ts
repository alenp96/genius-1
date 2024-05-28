
import Stripe from "stripe"
import { auth, useUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { PrismaClient } from "@prisma/client";
// import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});


export async function hasSubscription() {
  const { userId ,user} = auth();
  const subscription = await prisma.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: userId },
  });

  if (subscription) {


    const subscriptions = await stripe.subscriptions.list({
      customer: String(subscription.stripeCustomerId)
    })
    console.log('subscribers', subscriptions)
    return subscriptions.data.length > 0;
  }

  return false;
}
export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: "https://genius-beta-lac.vercel.app/profile/profile?success=true",
    cancel_url: "https://genius-beta-lac.vercel.app/profile?success=true",
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: 'price_1PL7DdRot8TS07y6H1GyiXzK',
        quantity: 1,
      },
    ],
    mode: "subscription"
  })

  return checkout.url;
}
export async function createCustomerIfNull(email:String) {
  const { userId, user } = auth();
  // const {  user } = useUser();

  if (userId) {

    const _user = await prismadb.userSubscription.findUnique({
      //@ts-ignore
      where: { userId: userId },
    });


    if (!_user) {
      const customer = await stripe.customers.create({
        email: String(email)
      })


      await prismadb.userSubscription.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,


        },
      })
    }
    const user2 = await prismadb.userSubscription.findFirst({ where: { userId: userId } });
    return user2?.stripeCustomerId;
  }

}