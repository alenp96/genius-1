'use client'
import { ReactNode } from 'react';
import {
  Box,
  Center,
  Text,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';

export default function LandingFeature() {
  return (
    <Box marginTop={8} marginBottom={8} paddingX={4} paddingBottom={8} position={'relative'}>
      <Center>
        <Heading color={'white'} mb={'20px'} fontSize={{ base: '3xl', md: '5xl' }}>
          Features
        </Heading>
      </Center>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} padding={4}>
        {stats.map((stat) => (
          <Box
            key={stat.title}
            bg="gray.700"
            borderRadius="md"
            p={6}
            boxShadow="lg"
            textAlign="center"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)', bg: 'gray.600' }}
          >
            <VStack spacing={3}>
              <Text fontFamily={'heading'} fontSize={'2xl'} color={'white'} mb={1}>
                {stat.title}
              </Text>
              <Text fontSize={'lg'} color={'gray.300'}>
                {stat.content}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

const stats = [
  {
    title: '24/7 Availability',
    content: 'Get support whenever you need it.',
  },
  {
    title: 'Personalized Advice',
    content: 'Tailored to your unique situation.',
  },
  {
    title: 'Expert-Backed Tips',
    content: 'Based on the latest relationship psychology.',
  },
  {
    title: 'Progress Tracking',
    content: 'Monitor your emotional recovery over time.',
  },
];
