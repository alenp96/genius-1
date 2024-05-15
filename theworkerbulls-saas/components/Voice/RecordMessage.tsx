import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Button, IconButton, Flex, Text } from '@chakra-ui/react';
import { AiOutlineAudio } from 'react-icons/ai';

// import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from './RecordIcon';
const ReactMediaRecorder = dynamic(
  // @ts-ignore
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

const RecordMessage = ({ handleStop }:any) => {
  return (
    <ReactMediaRecorder
      // @ts-ignore
      audio
      onStop={handleStop}
      render={({ status, startRecording, stopRecording }: any) => (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt="2"
        >
          <IconButton
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            isRound={true}
            padding={2}
            w={16}
            h={16}
            aria-label="Search database"
            icon={<RecordIcon status={status} />}
          />
          <Text mt="2" color="white" textAlign="center" fontSize="lg">
            {status}
          </Text>
        </Flex>
      )}
    />
  );
};

export default RecordMessage;
