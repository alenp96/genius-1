"use client";
import { MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";

import { auth, useUser } from "@clerk/nextjs";
import Link from "next/link";

import {
  // Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';


const ProfilePage = () => {
  const [sub, SetSub] = useState()
  const [customer, SetCustomer] = useState()
  const [link, SetLInk] = useState()
  // const router = useRouter();
  const { user } = useUser();
  console.log('user',user)
  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`)
      const _hasSub =await hasSub.json()
      SetLInk(_hasSub?.link)
      SetSub(_hasSub?.sub)
      console.log('in useeffect',_hasSub?.link,_hasSub?.sub)
      // console.log('has sub',hasSub)
    }

    // call the function
    fetchData()


  }, [])

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

          {/* <Button className="col-span-12 lg:col-span-2 w-full" type="submit" size="icon">
           {sub?'Manage':'Subscribe'} 
          </Button> */}
          {/* <Link
              href={String(link)}
   
              className="col-span-12 lg:col-span-2 w-full" 
            >
               {sub?'Manage':'Subscribe'} 
            </Link> */}
         
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
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
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
           { user?.primaryEmailAddress?.emailAddress}
            </Text>
            <Text color={'gray.500'}>Frontend Developer</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
            <Text fontWeight={600}>{sub?'Subscribed':'not subscribed'}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                status
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{sub?'':'Free Plan'}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Plan
              </Text>
            </Stack>
          </Stack>

          <Link
          //@ts-ignore
            w={'full'}
            mt={8}
            bg={'black'}
            color={'white'}
            href={String(link)}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
             {sub?'Manage':'Subscribe'} 
          </Link>
        </Box>
      </Box>
 
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

