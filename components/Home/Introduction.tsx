import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import { FC } from "react";
import Image from "next/image";

import { QUANTITY } from "../../utils/consts";

export const Introduction: FC = () => {
  return (
    <Flex direction="column" align="center" justify="center" mb={32}>
      <Flex
        maxW="1440px"
        mx="auto"
        justify="center"
        align="center"
        px={[6, 6, 32]}
        mt={[6, 6, 36]}
        mb={[6, 12, 24]}
        direction={["column", "column", "row"]}
        textAlign={["center", "center", "initial"]}
      >
        <Flex direction="column" w="45%" color="white" mr={[0, 0, 16]}>
          <Heading lineHeight={1} fontSize={80} fontWeight="bold">
            {QUANTITY}
          </Heading>
          <Text lineHeight={1} fontSize={64} fontWeight="normal" mb={8}>
            unique deities
          </Text>
          <Text fontSize={16} fontWeight="normal" mb={4}>
            Deus ex Sol is a collection of {QUANTITY} generative antropomorph
            carachters with a number of elements inspired by the ancient
            Egyptian sun god Ra.
          </Text>
          <Text fontSize={16} fontWeight="normal">
            Each piece artwork is generated with a special algorythm to ensure
            consistent color flow and enhanced complexity with various
            attributes applied.
          </Text>
        </Flex>

        <Flex
          display={["none", "none", "flex"]}
          position="relative"
          w="45%"
          h={500}
        >
          <Image
            layout="fill"
            objectFit="contain"
            src="/images/intro.jpg"
            alt="deity poster"
            draggable="false"
          />
        </Flex>
      </Flex>

      <Box w="90%" ml="auto" pt="10%" position="relative">
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="right"
          src="/images/spear.png"
          alt="spear image"
          draggable="false"
        />
      </Box>
    </Flex>
  );
};
