"use client";

import { MessageSquare } from "lucide-react";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
import CourseCard from "@/components/card";
import dynamic from "next/dynamic";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/ui/empty";


import { useProModal } from "@/hooks/use-pro-modal";
import {
  Grid,
  GridItem,
  Center,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  Flex,
  Button,
  Input,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Spinner,
  Text,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  background,
} from "@chakra-ui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { formSchema } from "./constants";
import { MdMic } from "react-icons/md";
import styles from "@/styles/page.module.css";
import { AnyNode } from "postcss";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
let url:any;
let imageblob;

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const ConversationPage = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [value, setValue] = useState("");
   const [prompt, setPrompt] = useState("");
   const [generatedBios, setGeneratedBios] = useState<any>("");
   const [isLoading, setIsLoading] = useState(false);
   const [editShow, setShow] = useState(false);
   const [text, setText] = useState("");
   const [pulicUrl, setPublicUrl] = useState(true);
   const [desc, setDesc] = useState<any>([]);
   const [description, setDescription] = useState("");
   const [isSpeaking, setIsSpeaking] = useState(false);
   const id='222'
   const user=""
  

  
  const [name, setName] = useState("");
  const ref = useRef("");
  const quillRef = useRef<any>(null);
  const router = useRouter();


  useEffect(() => {
      // fetchcourse();
    window.speechSynthesis.getVoices();
    getData();
  }, []);
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/static", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //  const data = await response.json();
      setGeneratedBios(data);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const handleClick = (newText: any) => {
    setText(newText);
    if (generatedBios){

            let selectedProduct =JSON.parse(generatedBios).find(
              (product: any) => product.name === newText
            );
            console.log("generated-->", selectedProduct);
            setDescription(selectedProduct?.description);
            // let selectedModule = desc?.data?.content.find(
            //   (product:any) => product.name === newText
            // );
            // setDescription(newText);
            setValue(newText);
    }

    //   setPublicUrl(selectedProduct?.image_ur);
    // setDescription(selectedProduct?.description);
    onOpen();
  };
  const handleChange = (e: any) => setPrompt(e.target.value);
    const onChange1 = (e:any) => (ref.current = e);
  const clear = () => {
    setGeneratedBios("");
    setPrompt("");
  };
  const downloadText = (e: any) => {
    const element = document.createElement("a");
    const _el = description + "\n" + generatedBios?.data;
    const file = new Blob([_el], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.doc";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleTextToSpeechClick = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${description}...  ..... ${generatedBios.data}`
      );
      const voices = window.speechSynthesis
        .getVoices()
        .filter(
          (voice) =>
            voice.voiceURI === "Microsoft Zira - English (United States)"
        );
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const generateText = async () => {
    if (prompt) {
      try {
        setIsLoading(true);
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        });
        const data = await response.json();
        //  const data = await response.json();
        setGeneratedBios(data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };
  return (
    <div>
      <Heading
        title="Course"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Grid paddingTop={"60px"} paddingBottom={"100px"} mb={"0"}>
            <div>
              <Grid
                h={["1000px", "400px", "400px", "400px"]}
                w={["100%", "400px", "800px", "1000px"]}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                gap={6}
              >
                <Box
                  as="button"
                  width={"60%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginLeft={"85px"}
                  marginTop={"8"}
                  border={"2px solid black"}
                  className={styles.card}
                  onClick={() => handleClick("Basics of Generative AI")}
                  style={{
                    backgroundColor: "#1cab94",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Basics of Generative AI
                </Box>
                <GridItem
                  w="100%"
                  h="100%"
                  position={"relative"}
                  // border="1px solid  rgb(31 41 55)"
                >
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Artificial Intelligence")}
                  >
                    Artificial Intelligence
                  </Box>

                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Machine Learning")}
                  >
                    Machine Learning
                  </Box>
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Deep Learning")}
                  >
                    Deep Learning
                  </Box>

                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Generative AI")}
                  >
                    Generative AI
                  </Box>
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() =>
                      handleClick("Artificial General Intelligence")
                    }
                  >
                    Artificial General Intelligence
                  </Box>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Foundation Models")}
                  >
                    <strong>Foundation Models</strong>
                  </Box>
                  <Flex gap={"2"}>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Large Language Models")}
                    >
                      Large Language Models
                    </Box>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Diffusion Models")}
                    >
                      Diffusion Models
                    </Box>
                  </Flex>
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Adapting Models")}
                  >
                    <strong>Adapting Models</strong>
                  </Box>
                  <Flex gap={"2"}>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Prompt Engineering")}
                    >
                      Prompt Engineering
                    </Box>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Fine-Tuning")}
                    >
                      Fine-Tuning
                    </Box>
                  </Flex>
                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("Leading Generative AI Models")}
                  >
                    <strong>Leading Generative AI Models</strong>
                  </Box>
                  <Flex gap={"2"}>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("OpenAI")}
                    >
                      OpenAI
                    </Box>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Google VertexAI")}
                    >
                      Google VertexAI
                    </Box>
                  </Flex>
                  <Flex gap={"2"}>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Hugging Face")}
                    >
                      Hugging Face
                    </Box>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Anthropic")}
                    >
                      Anthropic
                    </Box>
                  </Flex>

                  <Box
                    as="button"
                    width={"100%"}
                    marginTop={"2"}
                    border={"1px solid black"}
                    className={styles.card}
                    onClick={() => handleClick("LLM Tools and Frameworks")}
                  >
                    <strong>LLM Tools and Frameworks</strong>
                  </Box>
                  <Flex gap={"2"}>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Langchain")}
                    >
                      Langchain
                    </Box>
                    <Box
                      as="button"
                      width={"100%"}
                      marginTop={"2"}
                      border={"1px solid black"}
                      className={styles.card}
                      onClick={() => handleClick("Model Hubs")}
                    >
                      Model Hubs
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            </div>
          </Grid>
          <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
            <DrawerOverlay />

            <DrawerContent>
              <DrawerCloseButton />
              {/* <DrawerHeader>{`${text}`}</DrawerHeader> */}
              <DrawerHeader>
                <Editable defaultValue={text}>
                  <EditablePreview />
                  <EditableInput
                    name="name"
                    // value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </Editable>
              </DrawerHeader>

              <DrawerBody>
                <Box ml={"90%"} alignItems={"flex-start"}>
                  {" "}
                  <IconButton
                    colorScheme={isSpeaking ? "red" : "blue"}
                    onClick={handleTextToSpeechClick}
                    aria-label="Search database"
                    icon={<MdMic />}
                  />
                </Box>
                <Flex marginTop={"2"} marginBottom={"2"}>
                  <Input
                    type="text"
                    onChange={handleChange}
                    placeholder="Ask ChatGPT"
                    value={prompt}
                    marginRight={"2"}
                  />
                  <Button onClick={generateText}>
                    {isLoading ? <Spinner /> : "Submit"}
                  </Button>
                </Flex>
                {/* <p>{description}</p> */}
                {generatedBios ? (
                  <>
                    {" "}
                    <p>{generatedBios.data}</p>
                  </>
                ) : (
                  <>{/* <p>{description}</p> */}</>
                )}
                <CourseCard description={description} />
                {/* 
                {description &&
                  description.split(".").map((sentence, index) => (
                    <p key={index} className="text-justify">
                      {sentence.trim() + "."}
                      <br />
                    </p>
                  ))} */}

                {/* <ReactQuill
                  // @ts-ignore: Unreachable code error
                  forwardedRef={quillRef}
                  theme="snow"
                  placeholder={description ? description : "description"}
                  // defaultValue={description}
                  onChange={(value: any) => onChange1(value)}
                  value={value}
                  modules={modules}
                  formats={formats}
                /> */}
              </DrawerBody>
              <DrawerFooter>
                <Box
                  alignItems={"center"}
                  justifyContent={"center"}
                  marginRight={"40"}
                >
                  <Button variant="outline" mr={5} onClick={clear}>
                    Clear
                  </Button>
                  <Button onClick={(e) => downloadText(e)} colorScheme="blue">
                    Download
                  </Button>
                </Box>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
