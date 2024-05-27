
import Stripe from "stripe"
import { auth,useUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { PrismaClient } from "@prisma/client";
// import { randomUUID } from 'crypto';
const prisma = new PrismaClient();
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

// export async function price() {
//   const checkout = await stripe.prices.list()

//   return checkout;
// }
// export async function prod() {

//   const checkout1 = await stripe.products
//   return checkout1;
// }
export async function hasSubscription() {
  const { userId } = auth();
  const subscription = await prisma.userSubscription.findUnique({
    //@ts-ignore
    where: { userId: userId },
  });

  if (subscription) {


      const subscriptions = await stripe.subscriptions.list({
          customer: String(subscription.stripeCustomerId)
      })

      return subscriptions.data.length > 0;
  }

  return false;
}
export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/profile?success=true",
      cancel_url: "http://localhost:3000/profile?success=true",
      customer: customer,
      line_items: [
          {
              price: 'price_1PL7DdRot8TS07y6H1GyiXzK'
          }
      ],
      mode: "subscription"
  })

  return checkout.url;
}
export async function CreateCustomerIfNull(email: string) {
  const { userId ,user} = auth();
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
              stripeCustomerId:  customer.id,
            
              
            },
          })
      }
      const user2 = await prismadb.userSubscription.findFirst({ where: { userId:userId } });
      return user2?.stripeCustomerId;
  }

}