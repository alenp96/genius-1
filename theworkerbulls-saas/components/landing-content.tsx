'use client'
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  
  HStack,
 
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Center,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}
const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text color={'white'} fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={'white'}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function LandingContent() {
  return (
    <Box >
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading color={'white'}>Stop Paying $1000s for Breakup Coaches.</Heading>
          <Text color={'white'}>Why spend a fortune on breakup coaches when AIBreakupAdvisor can provide expert-like guidance at a fraction of the price? Our AI chatbot is designed to support you through your breakup with personalised advice and emotional support, available anytime you need it.</Text>
        </Stack>
        <Stack spacing={0} align={'center'}>
          <Heading color={'white'}>Sometimes You Just Need a Chat…</Heading>
          <Text color={'white'}>Breakups are hard. AIBreakupAdvisor is here to help you through every step of the journey. Our AI is trained to provide personalized advice, emotional support, and practical tips to help you move forward. Whether youre feeling lost, overwhelmed, or just need someone to talk to, AIBreakupAdvisor is always available to listen and offer guidance.</Text>
        </Stack>

        <Stack
          // direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
            <Center>
            <Heading color={'white'}>FAQs</Heading>
            </Center>
        
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box color={'white'} as='span' flex='1' textAlign='left'>
                    What is AIBreakupAdvisor?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                AIBreakupAdvisor is an AI-powered chatbot designed to help individuals navigate the emotional and practical challenges of breakups. Our AI provides personalized advice and support, drawing on expert knowledge to guide you through this difficult time.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' color={'white'} flex='1' textAlign='left'>
                    How does AIBreakupAdvisor work?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                Sign up for one of our affordable subscription plans and share your breakup story with our AI. You will receive instant, tailored advice and support. The AI uses advanced algorithms to understand your unique situation and provide relevant tips and guidance to help you move forward. Our subscription plans offer comprehensive support to ensure you receive the help you need.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' color={'white'} flex='1' textAlign='left'>
                    How can AIBreakupAdvisor help me?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                Our AI offers emotional support, practical tips, and expert-backed advice to help you cope with and recover from a breakup. Whether you need help processing your emotions, finding ways to move on, or seeking motivation to heal, AIBreakupAdvisor is here for you.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' color={'white'} flex='1' textAlign='left'>
                    Is the advice from AIBreakupAdvisor reliable?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                Yes, our AI is trained on expert data and uses the latest research in psychology to provide reliable and effective advice. While the AI cannot replace professional therapy, it offers valuable support and guidance tailored to your specific situation.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' color={'white'} flex='1' textAlign='left'>
                    Can I use AIBreakupAdvisor anytime?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                Absolutely. AIBreakupAdvisor is available 24/7, so you can access support whenever you need it. Whether its late at night or early in the morning, our AI is here to help you through your breakup.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' color={'white'} flex='1' textAlign='left'>
                    What makes AIBreakupAdvisor different from other breakup support services?

                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel color={'white'} pb={4}>
                AIBreakupAdvisor combines the expertise of relationship professionals with the convenience of AI technology. Unlike traditional coaches or therapists, our AI is available around the clock and offers affordable, personalized support tailored to your needs.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
<Stack>
<Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading  color={'white'} as="h1" fontSize="4xl">
          Pricing
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
        Plans that fit your need
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text  color={'white'} fontWeight="500" fontSize="2xl">
            Weekly
            </Text>
            <HStack justifyContent="center">
              <Text  color={'white'} fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text   color={'white'}fontSize="5xl" fontWeight="900">
                5
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /week
              </Text>
            </HStack>
          </Box>
          <VStack
            // bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem  color={'white'}>
                <ListIcon as={FaCheckCircle} color="green.500" />
                24/7 Availability
              </ListItem>
              <ListItem  color={'white'}>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Personalized Advice
              </ListItem>
              <ListItem  color={'white'}>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Expert-Backed Tips
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red">
                  Start trial
                </Button>
            </Box>
          </VStack>
        </PriceWrapper>

 
        <PriceWrapper>
          <Box position="relative">
            {/* <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                (25% off)
              </Text>
            </Box> */}
            <Box py={4} px={12}>
              <Text color={'white'} fontWeight="500" fontSize="2xl">
              Monthly
              </Text>
              <HStack justifyContent="center">
                <Text  color={'white'} fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text color={'white'} fontSize="5xl" fontWeight="900">
                  19
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
      
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem color={'white'}> 
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  24/7 Availability
                </ListItem>
                <ListItem color={'white'}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Personalized Advice
                </ListItem>
                <ListItem color={'white'}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                   Expert-Backed Tips
                </ListItem>
        
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                (30% off)
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text color={'white'} fontWeight="500" fontSize="2xl">
              3 Months
              </Text>
              <HStack justifyContent="center">
                <Text  color={'white'} fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text color={'white'} fontSize="5xl" fontWeight="900">
                  39
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
      
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem color={'white'}> 
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  24/7 Availability
                </ListItem>
                <ListItem color={'white'}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Personalized Advice
                </ListItem>
                <ListItem color={'white'}>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                   Expert-Backed Tips
                </ListItem>
        
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  Start trial
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
</Stack>
      </Container>
    </Box>
  );
}