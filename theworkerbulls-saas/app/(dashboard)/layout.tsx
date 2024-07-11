import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";
import App from "@/components/App";
const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  // const apiLimitCount = await getApiLimitCount();
   const apiLimitCount = 0
  // const isPro = await checkSubscription();
  const isPro = false;

  return ( 
    <App>
    {children}
   </App>
   );
}
 
export default DashboardLayout;
