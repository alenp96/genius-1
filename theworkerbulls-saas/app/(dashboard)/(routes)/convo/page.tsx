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



const ConversationPage = () => {
  const [sub, SetSub] = useState()
  const [loaded, SetDisabled] = useState(true)
  const [disabled, SetIsDisabled] = useState(false)
  //@ts-ignore
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [messages2, setMessages2] = useState<ChatCompletionRequestMessage[]>([]);
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
  const [isSubmitting, SetIsSubmiting] = useState(false)
  // useEffect(() => {
    
  //   const fetchData = async () => {
     

  //     SetIsLoading(true)
  //     SetIsDisabled(true)
  //     SetIsDisabled(false)
   
  //     const userMessage: ChatCompletionRequestMessage = { role: "user", "content": "hi" };
  //     const newMessages = [...messages, userMessage];
  //     const newMessages1 = [...message1, userMessage];

  //     const response = await axios.post('/api/conversation', { messages: newMessages1 });
     
  //     const mess= await response.data
  //     var tempData = [];
  //     tempData.push( userMessage );
  //     tempData.push(mess)
  //     setMessages((current) => [...current, ]);
  

  //     // SetIsLoading(false)
  //     console.log('has sub',tempData)
  //   }

  //   // call the function
  //   fetchData()


  // }, [isSubmitting])
  

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
      tempData.push( userMessage );
      tempData.push(mess)
      setMessages((current) => [...current, tempData]);
      var m = messages.flat()

 
    

  
    SetIsLoading(false)
  }
  console.log('messages',messages2)

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

      
        <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, actions) => {
        SetIsSubmiting(true)
       
        setTimeout(() => {
          FormAction(values.name)
          actions.setSubmitting(false)
        }, 1000)
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
              
                <Input {...field}  placeholder="How are you feeling today?" style={{ width:'140%'}} className="border-black md:w-full"/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
          //@ts-ignore
            // mt={4}
            style={{marginLeft:'40%' ,width:'20%'}}
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
              {messages?.map((message) => (
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
          </div>

          </div>

 
  );
}

export default ConversationPage;