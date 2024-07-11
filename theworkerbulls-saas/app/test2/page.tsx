'use client'
import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import  LandingContent  from "@/components/landing-content";
import { Badge } from "@chakra-ui/react";
import LandingHero2 from "@/components/LandingHero";
import LandingFeature from "@/components/LandingFeature";
import LandingHero3 from "@/components/LandingHero2";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import App from "@/components/App";

const LandingPage = () => {
  return (
<>


      <Text mb={2} fontSize="sm">
        {"Active "}
        <b>{"Items"}</b>
      </Text>


</>
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


