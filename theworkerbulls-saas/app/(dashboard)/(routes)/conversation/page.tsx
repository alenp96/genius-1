"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Box,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { Hearts } from 'react-loader-spinner'

import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [message1, setMessage1] = useState<ChatCompletionRequestMessage[]>([{"role": "system", "content": "You are an empathetic and wise breakup advisor. Your role is to provide caring, thoughtful, and helpful guidance to people going through relationship challenges and breakups.Before responding, take time to carefully consider the details and nuances of what they have shared. Put yourself in their shoes and reflect on what they are feeling and experiencing. Your responses should be conversational, organic, and concise. Keep the responses short, human-like, and under 150 words. Don't go off-topic or provide any other services or tasks that are not related to the topic of breakup."}]);
  const [sub, SetSub] = useState()
  const [loaded, SetDisabled] = useState(true)
  const [customer, SetCustomer] = useState()
  const [link, SetLInk] = useState()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`)
      const _hasSub =await hasSub.json()
      SetLInk(_hasSub?.link)
      SetSub(_hasSub?.sub)
      SetDisabled(false)
      console.log('in useeffect',_hasSub?.link,_hasSub?.sub)
      // console.log('has sub',hasSub)
    }

    // call the function
    fetchData()


  }, [])
  const isLoading = form.formState.isSubmitting;
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      const newMessages1 = [...message1, userMessage];
      
      const response = await axios.post('/api/conversation', { messages: newMessages1 });
      setMessages((current) => [...current, userMessage, response.data]);
      setMessage1((current) => [...current, userMessage, response.data]);
      
      form.reset();
    } catch (error: any) {
      console.log('error',error)
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }
  if (loaded) {
    return( 
      <>
      <Box
      width={'400px'}
      height={'400px'}
      position={'absolute'}
      left={0}
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
      color="green"
      ariaLabel="loading"
    
    /></Box>


      
      </>
    
  )
}
  if (!loaded && !sub)  {
    router.push('/profile');
}

  return ( 
    <div className="mt-6">
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        {sub?(<>        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading} 
                        placeholder="How do I calculate the radius of a circle?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Chat
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content} 
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div></>):(<>        <Alert status='success'>
    <AlertIcon />
    Please subscribe to view
  </Alert></>)}
        <></>

      </div>
    </div>
   );
}
 
export default ConversationPage;

