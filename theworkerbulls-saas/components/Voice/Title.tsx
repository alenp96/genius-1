"use client";
import React, { useState } from "react";
import axios from "axios";
import { Box, IconButton, Flex } from "@chakra-ui/react";

function Title({ setMessages }: any) {
  const [isResetting, setIsResetting] = useState(false);

  // Reset conversation
  const resetConversation = async () => {
    setIsResetting(true);

    await axios
      .get("http://localhost:8000/reset", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setMessages([]);
        }
      })
      .catch((err) => {});

    setIsResetting(false);
  };

  return (
    <Box bg="#111827">
      <Flex
        justify="space-between"
        align="center"
        w="full"
        p={4}
        bg="gray.900"
        color="white"
        fontWeight="bold"
        shadow="sm"
      >
        <Flex justify="space-between" w="80%">
          <Box as="div" fontStyle="italic">
            Rachel
          </Box>
          <IconButton
            colorScheme="white"
            onClick={resetConversation}
            aria-label="Search database"
            w={6}
            h={6}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#93c5fd"
                // className="w-10 h-10"
                width="25"
                height="25"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            }
            animation={isResetting ? "pulse 1s infinite" : ""}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Title;
