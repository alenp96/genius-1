"use client";
import React, { useState } from "react";
import Title from "./Title";
import axios from "axios";
import RecordMessage from "./RecordMessage";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  function createBlobURL(data: any) {
    const blob = new Blob([data], { type: "audio/mpeg" });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  const handleStop = async (blobUrl: any) => {
    setIsLoading(true);

    // Append recorded message to messages
    const myMessage = { sender: "me", blobUrl };
    const messagesArr: any = [...messages, myMessage];

    // convert blob url to blob object
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        // Construct audio to send file
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        // send form data to api endpoint
        await axios
          .post("https://workerbull.onrender.com/post-audio", formData, {
            headers: {
              "Content-Type": "audio/mpeg",
            },
            responseType: "arraybuffer", // Set the response type to handle binary data
          })

          .then((res) => {
            const blob = res.data;
            const audio = new Audio();
            audio.src = createBlobURL(blob);

            // Append to audio
            const rachelMessage = { sender: "rachel", blobUrl: audio.src };
            messagesArr.push(rachelMessage);
            setMessages(messagesArr);

            // Play audio
            setIsLoading(false);
            audio.play();
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      });
  };

  const paddingBottom = useBreakpointValue({ base: "44%", md: "56%" });

  return (
    <Box
      width="full"
      height="fullvh"
      overflowY="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Title */}
      <Title setMessages={setMessages} />

      <Flex
        direction="column"
        justify="between"
        overflowY="scroll"
        pb={{ base: 24, md: 96 }}
      >
        {/* Conversation */}
        <Box mt={5} px={5}>
          {messages?.map((audio: any, index) => (
            <Flex
              key={index + audio?.sender}
              direction="column"
              align={audio.sender == "rachel" ? "end" : "start"}
            >
              {/* Sender */}
              <Box mt={4}>
                <Text
                  textAlign={audio.sender == "rachel" ? "right" : "left"}
                  fontStyle="italic"
                  color={audio.sender == "rachel" ? "green.500" : "blue.500"}
                  mx={2}
                >
                  {audio.sender}
                </Text>

                {/* Message */}
                <Box maxW={{ base: "full", md: "3/4" }}>
                  <audio src={audio.blobUrl} controls />
                </Box>
              </Box>
            </Flex>
          ))}

          {messages.length === 0 && !isLoading && (
            <Box textAlign="center" mt={4} fontStyle="italic" fontWeight="bold">
              <Text>Ask Rachel a question...</Text>
              <Text mt={4} color="red.500" fontSize="sm">
                Press and hold button to speak, then release to get answer
              </Text>
            </Box>
          )}

          {isLoading && (
            <Box
              textAlign="center"
              fontStyle="italic"
              mt={10}
              animation="pulse"
            >
              Gimme a few seconds...
            </Box>
          )}
        </Box>

        {/* Recorder */}
        <Flex
          position="fixed"
          bottom={0}
          width="full"
          py={6}
          borderTop="1px"
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-r, #0ea5e9, #22c55e)"
        >
          <RecordMessage handleStop={handleStop} />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Controller;

// return (
//   <Box
//     className="w-full h-screen overflow-y-hidden"
//     width={'100%'}
//     height="100vh"
//     display="flex"
//     flexDirection="column"
//   >
//     {/* Title */}
//     <Title setMessages={setMessages} />

//     <div className="flex flex-col justify-between h-full overflow-y-scroll pb-24 md:pb-96">
//       {/* Conversation */}
//       <div className="mt-5 px-5">
//         {messages?.map((audio, index) => {
//           return (
//             <div
//               key={index + audio.sender}
//               className={
//                 'flex flex-col ' +
//                 (audio.sender == 'rachel' ? 'items-end' : 'items-start')
//               }
//             >
//               {/* Sender */}
//               <div className="mt-4">
//                 <p
//                   className={
//                     audio.sender == 'rachel'
//                       ? 'text-right mr-2 italic text-green-500'
//                       : 'ml-2 italic text-blue-500'
//                   }
//                 >
//                   {audio.sender}
//                 </p>

//                 {/* Message */}
//                 <audio
//                   src={audio.blobUrl}
//                   className="appearance-none w-full md:w-3/4"
//                   controls
//                 />
//               </div>
//             </div>
//           );
//         })}

//         {messages.length == 0 && !isLoading && (
//           // <div className="text-center font-light italic mt-10">
//           //   Ask Rachel a question...
//           //   <p className="text-center text-red-500 text-sm font-light italic mt-5">
//           //     Press and hold button to speak, then release to get answer
//           //   </p>
//           // </div>
//           <Box textAlign="center" mt={4} fontStyle="italic" fontWeight="bold">
//             <Text>Ask Rachel a question...</Text>
//             <Text mt={4} color="red.500" fontSize="sm">
//               Press and hold button to speak, then release to get answer
//             </Text>
//           </Box>
//         )}

//         {isLoading && (
//           <div className="text-center font-light italic mt-10 animate-pulse">
//             Gimme a few seconds...
//           </div>
//         )}
//       </div>

//       {/* Recorder */}
//       <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">
//         <Box
//           mt={600}
//           w={'100%'}
//           py={6}
//           bgGradient="linear(to-r, #0ea5e9, #22c55e)"
//         >
//           <div className="flex justify-center items-center w-full">
//             <div>
//               <RecordMessage handleStop={handleStop} />
//             </div>
//           </div>
//         </Box>
//       </div>
//     </div>
//   </Box>
// );
// };
