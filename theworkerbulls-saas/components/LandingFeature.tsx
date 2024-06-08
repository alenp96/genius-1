'use client'
import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Center,
  Text,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export default function LandingFeature() {
  return (
    <Box  marginTop={8} marginBottom={8} paddingLeft={2} paddingBottom={8} paddingRight={2} position={'relative'}>
      <Center display={'grid'}>
        
      <Heading
                color={'white'}
                mb={'20px'}
                fontSize={{ base: '3xl', md: '5xl' }}>
                Features
              </Heading>

  
      </Center>
      <Center>
      <Flex
        // flex={1}
        
        zIndex={0}
        display={{ base: 'none', lg: 'flex' }}
        // backgroundImage="url('/templates/stats-grid-with-image.png')"
        // backgroundSize={'cover'}
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
        // position={'absolute'}
        // width={'50%'}
        // insetY={0}
        // right={0}
        >
            {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    color={'white'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={'gray.400'}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid> */}



      </Flex>
      </Center>
 
      <SimpleGrid marginLeft={['unset','200px']} columns={2} spacing={10}>
      {stats.map((stat) => (
            
      <Box key={stat.title}  height={['unset','100px']}>
                <Text
                    fontFamily={'heading'}
                    fontSize={'3xl'}
                    color={'white'}
                    mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={'xl'} color={'gray.400'}>
                    {stat.content}
                  </Text>

</Box>
              ))}

</SimpleGrid>
  
    </Box>
  );
}

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={'span'} fontWeight={700} color={'white'}>
    {children}
  </Text>
);

const stats = [
  {
    title: '24/7 Availability',
    content: (
      <>
       Get support whenever you need it.
      </>
    ),
  },
  {
    title: 'Personalized Advice',
    content: (
      <>
       Tailored to your unique situation.
      </>
    ),
  },
  {
    title: 'Expert-Backed Tips',
    content: (
      <>
      Based on the latest relationship psychology.
      </>
    ),
  },
  {
    title: 'Progress Tracking',
    content: (
      <>
     Monitor your emotional recovery over time
      </>
    ),
  },
];