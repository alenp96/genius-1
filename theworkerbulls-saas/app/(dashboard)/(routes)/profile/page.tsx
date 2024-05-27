"use client";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription,
  stripe,
} from "@/lib/stripe";

const ProfilePage = async () => {
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState(false)
  const customer = await createCustomerIfNull();
  const hasSub = await hasSubscription();
  const checkoutLink = await createCheckoutLink(String(customer));
  let current_usage = 0;
  if (hasSub) {
    const subscriptions = await stripe.subscriptions.list({
      customer: String(customer),
    });
    const invoice = await stripe.invoices.retrieveUpcoming({
      subscription: subscriptions.data.at(0)?.id,
    });

    current_usage = invoice.amount_due;
  }

  console.log('has sub',hasSub)
  console.log('customer',customer)
  console.log('checkout link',checkoutLink)
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
   
        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Manage
              </Button>
        </div>
   
      </div>
    </div>
   );
}
 
export default ProfilePage;

