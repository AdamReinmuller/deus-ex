import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import Image from "next/image";

import { QUANTITY } from "../../utils/consts";
import Perspective from "../Effect/Perspective";

export const Introduction: FC = () => {
  const [isHover, setIsHover] = useState(false);

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

        <Perspective>
          <Image
            layout="fill"
            objectFit="contain"
            src="/images/intro.jpg"
            alt="deity poster"
            draggable="false"
          />
        </Perspective>
      </Flex>

      <Box
        w="90%"
        ml="auto"
        pt="10%"
        position="relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="right"
          src="/images/spear.png"
          alt="spear image"
          draggable="false"
        />
        //TODO: real image
        <Box opacity={isHover ? 1 : 0} transition="all 1s linear">
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="right"
            src="/images/spear1.png"
            alt="spear glowing"
            draggable="false"
          />
        </Box>
      </Box>
    </Flex>
  );
};
