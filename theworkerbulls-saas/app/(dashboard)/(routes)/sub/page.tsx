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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const ProfilePage = () => {

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
        <Alert status='success'>
    <AlertIcon />
    Subscription succesful!
  </Alert>


        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

