'use client'
import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex, VStack, Container, Heading, HStack } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit, FcIdea } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={'center'} justify={'center'} spacing={4} p={4} bg={'gray.700'} borderRadius={'md'} boxShadow={'lg'}>
      <Flex w={16} h={16} align={'center'} justify={'center'} rounded={'full'} bg={'purple.600'} mb={1}>
        {icon}
      </Flex>
      <Text color={'white'} fontWeight={600} fontSize={'lg'} textAlign={'center'}>
        {title}
      </Text>
      <Text align={'center'} color={'gray.300'}>
        {text}
      </Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={12} h={12} />}
          title={'Available 24/7'}
          text={'Round-the-clock support to help you anytime.'}
        />
        <Feature
          icon={<Icon as={FcDonate} w={12} h={12} />}
          title={'Affordable Support'}
          text={'Expert advice at a fraction of the cost.'}
        />
        <Feature
          icon={<Icon as={FcInTransit} w={12} h={12} />}
          title={'Empathetic Support'}
          text={'Compassionate support to help you heal.'}
        />
      </SimpleGrid>
      <Container maxW={'6xl'} mt={10}>
        <HStack align={'flex-start'} spacing={8}>
          <VStack spacing={6} align={'flex-start'} flex={1}>
            <Heading as="h3" size="lg" color={'white'}>
              Our Mission
            </Heading>
            <Text
              color={'gray.300'}
              fontSize={'lg'}
              lineHeight={1.7}
              bg={'gray.800'}
              p={4}
              borderRadius={'md'}
              boxShadow={'md'}
              border={'2px solid #805AD5'}
            >
              This project was born from a personal journey of overcoming <b>heartbreak</b>. Understanding the challenges of navigating a breakup without spending a fortune on coaches, I set out to create a simple, affordable solution.
              <br /> 
              <br />
              This AI chatbot is designed to provide compassionate support and practical advice, helping others through tough times. 
              <br />
              <br />
              My goal is to offer an accessible resource for healing and personal growth, ensuring no one feels alone on their journey to recovery.
            
            </Text>
          </VStack>
          <VStack spacing={4} align="flex-end" flex={1}>
            <Box bg="purple.600" p={4} borderRadius="md" boxShadow="md" color="white" maxW="60%" alignSelf="flex-end">
              <HStack>
                <Text>&quot;I can&apos;t stop thinking about my ex. What should I do?&quot;</Text>
              </HStack>
            </Box>
            <Box bg="purple.600" p={4} borderRadius="md" boxShadow="md" color="white" maxW="60%" alignSelf="flex-start">
              <HStack>
                <Icon as={FcIdea} w={6} h={6} />
                <Text>It&apos;s understandable. Have you tried any new activities to distract yourself? Exploring hobbies can help shift your focus.&quot;</Text>
              </HStack>
            </Box>
            <Box bg="purple.600" p={4} borderRadius="md" boxShadow="md" color="white" maxW="60%" alignSelf="flex-end">
              <HStack>
                <Text>&quot;I&apos;ve been avoiding it. I just feel stuck.&quot;</Text>
              </HStack>
            </Box>
            <Box bg="purple.600" p={4} borderRadius="md" boxShadow="md" color="white" maxW="60%" alignSelf="flex-start">
              <HStack>
                <Icon as={FcIdea} w={6} h={6} />
                <Text>&quot;It&apos;s normal to feel that way. Maybe start small, like taking a walk or reading a new book. Would you like more suggestions?&quot;</Text>
              </HStack>
            </Box>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}
