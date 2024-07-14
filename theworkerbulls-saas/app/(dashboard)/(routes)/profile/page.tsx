"use client";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Spinner } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import NextLink from 'next/link'
import { auth, useUser } from "@clerk/nextjs";
// import Link from "next/link";

import {
  // Heading,
  Avatar,
  Link,
  Box,
  Center,
  Image,
  // Heading,

  HStack,

  VStack,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  List,
  ListItem,
  ListIcon,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Hearts } from 'react-loader-spinner';
import { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';


function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={'gray.200'}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}
const ProfilePage = () => {
  const [sub, SetSub] = useState()
  const [customer, SetCustomer] = useState()
  const [link, SetLInk] = useState('')
  const [expiry, SetExpiry] = useState('')
  const [loaded, SetDisabled] = useState(true)

  // const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`)
      const _hasSub = await hasSub.json()
      SetLInk(_hasSub?.link)
      SetSub(_hasSub?.sub)
      SetExpiry(_hasSub?.exp)
      SetDisabled(false)
      console.log('in useeffect',_hasSub, _hasSub?.link, _hasSub?.sub)
      // console.log('has sub',_hasSub)
    }

    // call the function

    fetchData()


  }, [])
  console.log('user frontend ', user)
  if (loaded) {
    return (<>        <Box
      width={'400px'}
      height={'400px'}
      position={'absolute'}
      left={['40%','20%','20%','20%']}
      right={0}
      top={0}
      bottom={0}
      margin={'auto'}
      maxH={'100%'}
      maxW={'100%'}
      overflow={'auto'}
    >
      <Hearts
        height="80"
        width="80"
        // radius="9"
        color="red"
        ariaLabel="loading"

      /></Box></>)
  }
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


          <Flex>


            <Box
            display={['none','unset','unset','unset']}
              maxW={'270px'}
              w={'full'}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
              />
              <Flex  justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={
                    user?.imageUrl
                  }
                  //@ts-ignore
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>

              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Text fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    {user?.fullName}
                  </Text>
                  <Text color={'gray.500'}> {user?.primaryEmailAddress?.emailAddress}</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>status</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      {sub ? 'Subscribed' : 'not subscribed'}
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>  Plan</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      {sub ? 'Premium' : 'Free Plan'}
                    </Text>


                  </Stack>
                </Stack>

                {sub ? (<>   <Stack spacing={0} align={'center'} mb={5}>
                  <Text fontSize={'sm'} fontWeight={600} fontFamily={'body'}>
                    Subscription ends in
                  </Text>
                  <Text fontSize={'sm'} fontWeight={500} color={'gray.500'} fontFamily={'body'}>
                    {expiry ? new Date(expiry)?.toDateString() : ' April 30 2024'} { }
                  </Text>

                </Stack></>) : (<></>)}

                {/* <Center>
                  {sub ? (<Link
                    //@ts-ignore
                    // as={'link'}
                    as={NextLink}
                    // w={'full'}
                    mt={8}
                    paddingX={4}

                    href={link ? String(link[0]) : '#'}
                    paddingY={2}
                    //@ts-ignore
                    _disabled={true}
                    bg={'black'}
                    color={'white'}
                    // href={'#'}
                    // href={'https://buy.stripe.com/test_dR68yDaCI16ieGI9AA'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}>
                    Manage
                  </Link>) : (<Link
                    //@ts-ignore
                    // as={'link'}
                    as={NextLink}
                    mt={8}
                    paddingX={4}


                    paddingY={2}
                    //@ts-ignore
                    _disabled={true}
                    bg={'black'}
                    color={'white'}
                    href={link ? String(link) : '#'}
                    // href={'https://buy.stripe.com/test_dR68yDaCI16ieGI9AA'}
                    rounded={'md'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}>
                    
                    Subscribe
                  </Link>)}

                </Center> */}

              </Box>
            </Box>
            <Box ml={['16px','unset',12,12]} py={12}>
              <VStack spacing={2} textAlign="center">
                <Text color={'black'} as="h1" fontSize="4xl">
                  Pricing
                </Text>
                <Text fontSize="lg" color={'gray.500'}>
                  Plans that fit your need
                </Text>
              </VStack>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                textAlign="center"
                justify="center"
                spacing={{ base: 4, lg: 10 }}
                py={10}>

                <PriceWrapper>
                  <Box position="relative">
          
                    <Box py={4} px={12}>
                      <Text color={'black'} fontWeight="500" fontSize="2xl">
                        Monthly
                      </Text>
                      <HStack justifyContent="center">
                        <Text color={'black'} fontSize="3xl" fontWeight="600">
                          $
                        </Text>
                        <Text color={'black'} fontSize="5xl" fontWeight="900">
                          19
                        </Text>
                        <Text fontSize="3xl" color="gray.500">
                          /month
                        </Text>
                      </HStack>
                    </Box>
                    <VStack

                      py={4}
                      borderBottomRadius={'xl'}>
                      <List spacing={3} textAlign="start" px={12}>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          24/7 Availability
                        </ListItem>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Personalized Advice
                        </ListItem>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Expert-Backed Tips
                        </ListItem>

                      </List>
                      <Box w="80%" pt={7}>
                        <Button w="full"
                           as={NextLink} 
                             href={link ? String(link[0]) : '#'}
                        colorScheme="red" variant='outline'>
                          Subscribe
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                </PriceWrapper>
                <PriceWrapper>
                  <Box position="relative">
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: 'translate(-50%)' }}>
                      <Text
                        textTransform="uppercase"
                        bg={'red.300'}
                        px={3}
                        py={1}
                        color={'gray.900'}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl">
                        (30% off)
                      </Text>
                    </Box>
                    <Box py={4} px={12}>
                      <Text color={'black'} fontWeight="500" fontSize="2xl">
                        3 Months
                      </Text>
                      <HStack justifyContent="center">
                        <Text color={'black'} fontSize="3xl" fontWeight="600">
                          $
                        </Text>
                        <Text color={'black'} fontSize="5xl" fontWeight="900">
                          39
                        </Text>
                        <Text fontSize="3xl" color="gray.500">
                          /month
                        </Text>
                      </HStack>
                    </Box>
                    <VStack

                      py={4}
                      borderBottomRadius={'xl'}>
                      <List spacing={3} textAlign="start" px={12}>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          24/7 Availability
                        </ListItem>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Personalized Advice
                        </ListItem>
                        <ListItem color={'black'}>
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          Expert-Backed Tips
                        </ListItem>

                      </List>
                      <Box w="80%" pt={7}>
                        <Button         as={NextLink} 
                             href={link ? String(link[1]) : '#'}w="full" colorScheme="red">
                          Subscribe
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                </PriceWrapper>
              </Stack>
            </Box>

          </Flex>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

