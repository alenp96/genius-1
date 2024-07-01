'use client'
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import  LandingContent  from "@/components/landing-content";
import { Badge,Box } from "@chakra-ui/react";
import LandingHero2 from "@/components/LandingHero";
import LandingFeature from "@/components/LandingFeature";
import LandingHero3 from "@/components/LandingHero2";
// import {
//   Stack,
//   Flex,
//   Button,
//   Text,
//   VStack,
//   useBreakpointValue,
// } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <div >
      <LandingNavbar />
      <div id="about">
      <LandingHero />
      </div>
      <LandingHero2 />
      <LandingFeature />
    
      <LandingHero3 />
      <LandingContent/>

<Box>
<footer className="bg-gray-800 py-8">
    <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <img src="/logo4.png" alt="Logo" className="w-24 mb-4" style={{ width: '250px' }} />
        <div className="flex space-x-4 text-white">
        <a href="#about" className="hover:underline">About</a>
            <a href="mailto:info@breakupadvisor.com" className="hover:underline">Contact</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
        <p className="text-sm text-gray-500 mt-4">© 2024 - AIBreakupAdvisor. All rights reserved.</p>
    </div>
</footer>


</Box>



    </div>
  );
}
 
export default LandingPage;
// import {
//   Stack,
//   Flex,
//   Button,
//   Text,
//   VStack,
//   useBreakpointValue,
// } from '@chakra-ui/react';


