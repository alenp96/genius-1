"use client";

import * as z from "zod";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useToast } from "@chakra-ui/react";
import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

const CsvPage = () => {
   const toast = useToast();
  const router = useRouter();
  const [file, setFile] = useState(true);
  const proModal = useProModal();
  const [messages, setMessages] = useState<any[]>([]);
   const [prompt, setPromt] = useState("");
   const [prompt1, setPrompt1] = useState("How many rows does this csv have ");
   const [isLoading1, setIsLoading1] = useState(false);
   const inputFileRef = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
      const handleSubmit = async (e: any) => {
        setIsLoading1(true)
        console.log("submitting form", prompt);
        if (!inputFileRef.current?.files?.length) {
          alert("Please, select file you want to upload");
          return;
        }
        console.log("file", inputFileRef);
        const question = "what is etherium";
        const userMessage = {
          role: "user",
          content: prompt,
        };
        const newMessages = [...messages, userMessage];
        e.preventDefault();
        if (file) {
          try {
            const formData = new FormData();
            Object.values(inputFileRef.current.files).forEach((fil: any) => {
              formData.append("file", fil);

              console.log("data", inputFileRef.current.files);
            });
            formData.append("question", prompt);

            axios
              .post("https://saas-nlpc.onrender.com/ingest/csv", formData, {
                headers: {
                  "Content-Type":
                    "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                },
              })
              .then((res) => {
                console.log("answer csv->", res.data);
                                 toast({
                                   title: "Csv Ingested Succesfully.",
                                   description:
                                     "The csv file was ingested successfully.",
                                   status: "success",
                                   duration: 9000,
                                   isClosable: true,
                                 });
      
                console.log("messages", messages);
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            alert(err);
          } finally {
            setIsLoading1(false)
          }
        } else {
          alert("Please provide proper prompt");
        }
      };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
          axios
            .post(
              "https://saas-nlpc.onrender.com/query/csv",
              {
                prompt: values.prompt,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log(res);
              console.log("answer pdf", res.data);
              const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: res.data["question"],
              };

              const botMessage = {
                role: "system",
                content: res.data["answer"],
              };
              setMessages((current: any) => [
                ...current,
                botMessage,
                userMessage,
              ]);
              console.log("messages", messages);
            })
            .catch((err) => {
              console.log("error", err);
            });
      
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
          // toast({
          //   title: "Something went wrong",
          
          //   status: "error",
          //   duration: 9000,
          //   isClosable: true,
          // });
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <div className="mt-2">
        <Heading
          title="Document"
          description="Our most advanced conversation model."
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </div>
      <div className="mt-2 mb-4">
        <form className="mt-2 max-w-3xl" onSubmit={handleSubmit}>
          <input type="file" name="myfile" ref={inputFileRef} multiple />

          <Button type="submit" variant="outline">
            Ingest
          </Button>
          {isLoading1 && ` Wait, please...`}
        </form>
      </div>

      <div className="px-4 lg:px-8">
        <div>
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
                        placeholder="How many rows does this csv have?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading1 && (
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
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CsvPage;

