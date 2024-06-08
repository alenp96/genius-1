'use client'
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import  LandingContent  from "@/components/landing-content";
import { Badge } from "@chakra-ui/react";
import LandingHero2 from "@/components/LandingHero";
import LandingFeature from "@/components/LandingFeature";
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

      <LandingHero />
      <LandingHero2 />
      <LandingFeature />
      <LandingContent/>

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


