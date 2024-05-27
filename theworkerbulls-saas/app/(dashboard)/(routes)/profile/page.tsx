"use client";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { auth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  // createCheckoutLink,
  // CreateCustomerIfNull,
  hasSubscription,
  // stripe,
} from "@/lib/stripe";

const ProfilePage = () => {
  const [sub, SetSub] = useState()
  const [customer, SetCustomer] = useState()
  const [link, SetLInk] = useState()
  // const router = useRouter();
  const { user } = useUser();
  console.log('user',user?.primaryEmailAddress?.emailAddress)
  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`, { cache: 'force-cache' })
      const checkoutLink = await fetch(`/api/subscription1`, { cache: 'force-cache' })
      const creatCustomer = await fetch(`/api/subscription2`, { cache: 'force-cache' })
      // const hasSub = await hasSubscription()
      // const customer = await CreateCustomerIfNull(String(user?.primaryEmailAddress))
      // const checkoutLink = await createCheckoutLink(String(customer));
      const _hasSub =await hasSub.json()
      const _checkoutLink =await checkoutLink.json()
      const _creatCustomer =await creatCustomer.json()
      // console.log('has sub', hasSub)
      // console.log('customer', customer)
      // console.log('checkout link', checkoutLink)
      console.log('in useeffect',_hasSub,_checkoutLink,_creatCustomer)
      // console.log('has sub',hasSub)
    }

    // call the function
    fetchData()


  }, [])
  // const [isLoading, SetIsLoading] = useState(false)
  // const customer = await CreateCustomerIfNull(String(user?.primaryEmailAddress));
  // const hasSub = await hasSubscription();
  // const checkoutLink = await createCheckoutLink(String(customer));
  // let current_usage = 0;
  // if (hasSub) {
  //   const subscriptions = await stripe.subscriptions.list({
  //     customer: String(customer),
  //   });
  //   const invoice = await stripe.invoices.retrieveUpcoming({
  //     subscription: subscriptions.data.at(0)?.id,
  //   });

  //   current_usage = invoice.amount_due;
  // }

  // console.log('has sub',hasSub)
  // console.log('customer',customer)
  // console.log('checkout link',checkoutLink)
  return (
    <div>
      <Heading
        title="Profile"
        description="View subscription."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>

          <Button className="col-span-12 lg:col-span-2 w-full" type="submit" size="icon">
            Manage
          </Button>
          <Link
              // href={String(checkoutLink)}
       href={'/dashboard'}
              
              className="font-medium text-base hover:underline"
            >
              You have no subscription, checkout now!
            </Link>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

