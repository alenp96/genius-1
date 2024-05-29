
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
 console.log('user sub',subscription)
//   if (subscription?.stripeSubscriptionId) {

   
// console.log('subscription valid')

//     // const subscriptions = await stripe.subscriptions.list({
//     //   customer: String(subscription.stripeCustomerId)
//     // })
//     // console.log('subscribers', subscriptions)
//     // return subscriptions.data.length > 0;
//     return true
//   }else{return false}
return subscription?.stripeSubscriptionId?true:false
  
}
export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: "https://genius-beta-lac.vercel.app/sub?session_id={CHECKOUT_SESSION_ID}?",
    cancel_url: "https://genius-beta-lac.vercel.app/profile",
    customer: customer,
    payment_method_types: ["card"],
    line_items: [
      {
        price: 'price_1PLMJ7Rot8TS07y6dYnY894u',
        quantity: 1,
      },
    ],
    mode: "subscription"
  })

  return checkout.url;
}
export async function createCustomerIfNull(email:String) {
  console.log('enter customer register',email)
  const { userId, user } = auth();
  // const {  user } = useUser();

  if (userId) {
    console.log('user found')

    const _user = await prismadb.userSubscription.findUnique({
      //@ts-ignore
      where: { userId: userId },
    });
    console.log('_user results->',_user)


    if (!_user) {
      console.log('no user ')
      const customer = await stripe.customers.create({
        email: String(email)
      })
      const subscriptions = await stripe.customers.list()
      console.log('customer',customer,email)


      await prismadb.userSubscription.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
          stripeSubscriptionId:null,
          stripePriceId:null,
          stripeCurrentPeriodEnd:null,



        },
      })
    }
    const user2 = await prismadb.userSubscription.findFirst({ where: { userId: userId } });
    return user2?.stripeCustomerId;
  }

}