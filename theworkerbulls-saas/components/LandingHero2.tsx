'use client'
import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex,Center } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack     
    p={4}         align={'center'}
        justify={'center'} borderWidth="1px"
    borderColor={'gray.200'}
    borderRadius={'xl'}>
    
      <Flex
        w={16}
        h={16}
        shadow="base"

        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text color={'white'} fontWeight={600}>{title}</Text>
      <Text     align={'center'}
        color={'white'}>{text}</Text>
   

    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Move On from a Breakup'}
          text={
            'Our AI is always here for you. Whether its day or night, AIBreakupAdvisor provides round-the-clock support to help you through your toughest moments.Find the strength to move forward with tailored advice and emotional support that helps you let go and rebuild your life.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Get Back with Your Ex'}
          text={
            'Receive guidance on how to rekindle your relationship, understand past mistakes, and communicate effectively to rebuild trust.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Stop Thinking About Your Ex'}
          text={
            'Learn techniques to shift your focus away from your ex and reclaim your peace of mind with practical tips and supportive advice.'
          }
        />
             <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Heal from Heartbreak'}
          text={
            'Navigate the pain of heartbreak with compassionate support and strategies to heal emotionally and regain your sense of self.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Boost Your Self-Esteem'}
          text={
            'Improve your self-confidence and self-worth with personalized tips that empower you to see your value beyond the relationship.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Navigate Divorce'}
          text={
            'Get specialized advice for dealing with the emotional and practical aspects of divorce, helping you to cope and move forward.'
          }
        />
             <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Cope with Loneliness'}
          text={
            'Find comfort and companionship through our AI support, designed to help you manage feelings of loneliness and isolation.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Improve Communication Skills'}
          text={
            'Enhance your ability to communicate in future relationships with expert advice on healthy communication practices.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Rediscover Personal Happiness'}
          text={
            'Focus on your own happiness and well-being with strategies and tips to help you rediscover joy and fulfillment in your life.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}