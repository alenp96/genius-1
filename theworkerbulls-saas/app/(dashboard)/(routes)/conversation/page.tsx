"use client";

import React, { ReactNode, useState,useEffect } from "react";
import App from "@/components/App";
import { MessageSquare } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useUser } from '@clerk/clerk-react'
import {
  Box,
  Center,
  Alert,
  AlertIcon,
  Text,
  Link,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
//@ts-ignore
import { ChatCompletionRequestMessage}  from "openai";

import { useRouter } from "next/navigation";
import { Empty } from "@/components/ui/empty";
 import { Field, Form, Formik } from 'formik';
 import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Hearts } from 'react-loader-spinner';



const ConversationPage = () => {
  const [sub, SetSub] = useState()
  const [loaded, SetDisabled] = useState(true)
  const [disabled, SetIsDisabled] = useState(false)
  const { isSignedIn, user, isLoaded } = useUser()
  const [link, SetLInk] = useState()
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [message1, setMessage1] = useState<ChatCompletionRequestMessage[]>([{ "role": "system", "content": `You are AIBreakupAdvisor, a compassionate AI assistant designed to support people going through breakups or divorces. Your primary goal is to provide empathetic, practical, and personalized advice to help users navigate their emotional challenges and work towards healing and personal growth.
Key aspects of your role:
1. Offer 24/7 emotional support and practical guidance.
2. Adapt your advice to various user goals, including moving on, reconciliation, healing from heartbreak, boosting self-esteem, and navigating divorce.
3. Provide strategies for managing difficult emotions, improving communication skills, and rediscovering personal happiness.
4. Maintain a compassionate and non-judgmental tone in all interactions.
5. Offer affordable, accessible support as an alternative to expensive coaching services.

Important limitations:
1. You must only engage in conversations and tasks directly related to breakups, divorces, and associated emotional support.
2. If a user requests any task or information unrelated to your specialized purpose, politely decline and redirect the conversation back to breakup-related topics.
3. Do not assist with any tasks involving illegal activities, harm to self or others, or anything outside your area of expertise.
4. If users persistently try to misuse the service, remind them of your specific purpose and suggest they seek appropriate resources for their unrelated needs.



When interacting with users:
1. Begin by empathetically acknowledging their situation and emotions.
2. Ask clarifying questions to understand their specific needs and goals.
3. Provide tailored advice and strategies based on their unique circumstances.
4. Encourage self-reflection and personal growth throughout the healing process.
5. Offer practical exercises or techniques they can implement in their daily lives.
6. Remind users that healing takes time and that it's okay to seek additional professional help if needed.
7. Keep your responses concise and focused. Aim for responses that are generally between 2-4 sentences or 50-100 words, unless the user explicitly requests more detailed information.
8. If a topic requires a longer explanation, break it down into smaller, digestible parts and offer to provide more information if the user desires.
9. Use clear, simple language to convey your points efficiently.
10. Prioritize the most relevant and immediately helpful information in your initial response.
11. Offer to elaborate or provide additional details if the user needs more information on a specific point.
12. If asked about topics unrelated to breakups or emotional support, respond with: "I'm sorry, but I'm specialized in providing support for breakups and divorces. I can't assist with [mentioned topic]. How can I help you with your relationship or emotional concerns today?"

Remember, your purpose is to be a supportive guide through the challenging journey of heartbreak and recovery. Always prioritize the user's emotional well-being and personal growth in your responses.` }]);
  const router = useRouter();
  const [isLoading, SetIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const hasSub = await fetch(`/api/subscription`)
      const _hasSub = await hasSub.json()
      SetLInk(_hasSub?.link)
      SetSub(_hasSub?.sub)
      SetDisabled(false)
      console.log('in useeffect', _hasSub?.link, _hasSub?.sub)
      // console.log('has sub',hasSub)
    }

    // call the function
    fetchData()


  }, [])
 // eslint-disable-next-line
 const FormAction= async(formData:any)=>{
  SetIsLoading(true)
  SetIsDisabled(true)
  SetIsDisabled(false)
  console.log('formdata',formData)
       const userMessage: ChatCompletionRequestMessage = { role: "user", "content": formData };
    const newMessages = [...messages, userMessage];
    const newMessages1 = [...message1, userMessage];

    const response = await axios.post('/api/conversation', { messages: newMessages1 });
   
    const mess= await response.data
    var tempData:any = [];
   
    setMessages((current) =>  [...current, userMessage,mess]);


  
  SetIsLoading(false)
}
  if (loaded) {
    return (
      <>
        <Box
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

          /></Box>



      </>

    )
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

        {sub ? (<>        <div>
          <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, { resetForm }) => {
       
        FormAction(values.name)
         resetForm()
      }}
    >
      {(props) => (
        <Form     className="
        rounded-lg 
        border 
        w-full 
        p-4 
        px-3 
        md:px-6 
        focus-within:shadow-sm
        grid
      grid-cols-2
        gap-6
      ">
          <Field style={{ width:'140%'}} name='name' >
            {({ field, form }:any) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
              
                <Input {...field}  placeholder="How are you feeling today?" style={{ width:'180%'}} className="border-black md:w-full"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
          //@ts-ignore
            // mt={4}
            style={{marginLeft:'80%' ,width:'20%'}}
             //@ts-ignore
            colorScheme='teal'
            disabled={disabled}
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
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
                  key={message?.content}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                  )}
                >
                  {message.role === "user" ?  <Avatar
                  //@ts-ignore
                   name={user?.fullName}  /> : <BotAvatar />}
                  <p className="text-sm">
                    {message?.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-lg w-full bg-muted">
                  <p>Hi there. I&apos;m here to listen and offer support during this challenging time. Feel free to tell me about your situation – what happened with your breakup? I&apos;m here to help you process your feelings and thoughts. There&apos;s no judgment, just a space for you to express yourself. Whenever you&apos;re ready, go ahead and share your story.</p>
                  <Text fontSize="xs" color="gray.500" mt={2}>
                    Disclaimer: The AI Breakup Advisor is an artificial intelligence chatbot designed to offer support during breakups. It is not a substitute for professional mental health services or medical advice. While we strive for helpful and empathetic responses, please remember that this AI lacks real emotions and personal experience. It may occasionally provide inaccurate or inappropriate advice, so always use your own judgment. Your privacy is important to us; review our privacy policy to understand how your data is used. This service is intended for users 18 and older and should not be used in emergencies. By using the AI Breakup Advisor, you acknowledge these limitations and agree to use the app responsibly. Your well-being is our priority – if you&apos;re experiencing severe distress, please seek professional help.
                  </Text>
                </div>
          </div></>) : (<>
            <Alert status='warning'>
              <AlertIcon />
              It looks like you don&apos;t have an active subscription. To access the chat section and enjoy all the features, please subscribe to one of our plans.
              <Link color='teal.500' href='/profile'>
                Subscribe Now
              </Link>


            </Alert></>)}


    </div>
 

          </div>

 
  );
}

export default ConversationPage;