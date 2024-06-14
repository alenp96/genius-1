'use client'
import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack     align={'center'}
    justify={'center'}>
      <Flex
        w={16}
        h={16}
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
          title={'Available 24/7'}
          text={
            'Our AI is always here for you. Whether its day or night, AIBreakupAdvisor provides round-the-clock support to help you through your toughest moments.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Affordable Support'}
          text={
            'AIBreakupAdvisor offers expert advice at a fraction of the cost of traditional breakup coaches. Get personalized support without breaking the bank.'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Empathetic Support'}
          text={
            'AIBreakupAdvisor understands your pain. Our AI offers compassionate and empathetic support, making sure you feel heard and understood every step of the way.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}