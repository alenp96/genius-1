import App from "@/components/App";
const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
  <App>
   {children}
  </App>
     
 
   );
}
 
export default LandingLayout;