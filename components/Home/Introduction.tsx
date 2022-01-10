import { Heading, HStack, Text, Flex } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";

import { QUANTITY } from "../../utils/consts";

export const Introduction: FC = () => {
  return (
    <Flex
      justify="center"
      align="center"
      maxW="1440px"
      mx="auto"
      my={64}
      px={32}
    >
      <Flex direction="column" w="50%" color="white" mr={16}>
        <Heading lineHeight={1} fontSize={80} fontWeight="bold">
          {QUANTITY}
        </Heading>
        <Text lineHeight={1} fontSize={64} fontWeight="normal" mb={8}>
          unique deities
        </Text>
        <Text fontSize={16} fontWeight="normal" mb={4}>
          Deus ex Sol is a collection of {QUANTITY} generative antropomorph
          carachters with a number of elements inspired by the ancient Egyptian
          sun god Ra.
        </Text>
        <Text fontSize={16} fontWeight="normal">
          Each piece artwork is generated with a special algorythm to ensure
          consistent color flow and enhanced complexity with various attributes
          applied.
        </Text>
      </Flex>

      <Flex position="relative" w="50%" h={500}>
        <Image
          layout="fill"
          objectFit="contain"
          src="/images/intro.jpg"
          alt="deity poster"
          draggable="false"
        />
      </Flex>
    </Flex>
  );
};
