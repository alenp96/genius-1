"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  Flex,
  Input,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import Controller from "./Controller";

function VoiceButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const buttonMargin = useBreakpointValue({
    base: 4,
    sm: 50,
    md: 100,
    lg: 200,
  });
  const fontSize = useBreakpointValue({
    base: "xs", // smaller font size for smallest screens
    sm: "sm",
    md: "md",
    lg: "lg",
  });
  const buttonSize = useBreakpointValue({
    base: "sm", // smaller button size for smallest screens
    sm: "md",
    md: "lg",
    lg: "lg",
  });
  return (
    <>
      {/* <Button
          onClick={onOpen}
          ref={btnRef}
          alignSelf={{ base: "center", md: "end" }}
          colorScheme="brand"
          mb="5"
          variant="outline"
        >
          Ask Rachel
        </Button> */}
      <Button
        alignSelf={{ base: "center", md: "end" }}
        colorScheme="brand"
        mb="5"
        variant="outline"
        ref={btnRef}
        onClick={onOpen}
        ml={buttonMargin}
        fontSize={fontSize}
        size={buttonSize}
        whiteSpace="normal" // allow the text to wrap
      >
        Ask Rachael
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
        <DrawerOverlay />

        <DrawerContent padding={0} margin={0}>
          <DrawerCloseButton color={"white"} w={10} h={10} mr={3} />
          <DrawerHeader padding={0} margin={0}></DrawerHeader>

          <DrawerBody padding={0} margin={0}>
            <Controller />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default VoiceButton;
