import React, { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import { motion, PanInfo } from "framer-motion";
import { TriangleIcon } from "../icons";

const MotionFlex = motion<FlexProps>(Flex);

type CardProps = {
  current: number;
  index: number;
  image: string;
  onClick: (index: number) => void;
};

const background = {
  distance: 80,
  rotation: 30,
  scale: 0.7,
};

const Card: FC<CardProps> = ({ image, index, current, onClick }) => {
  const isCurrent = index === current;
  return (
    <MotionFlex
      initial={{
        scale: 0,
        left: 0,
        top: 0,
      }}
      animate={{
        scale: isCurrent ? 1 : background.scale,
        left: "50%",
        opacity: isCurrent ? 1 : 0.6,
        rotateY: isCurrent
          ? "0deg"
          : `${(index - current) * background.rotation}deg`,
        translateX: `${(index - current) * background.distance - 50}%`,
      }}
      // @ts-ignore
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      display={Math.abs(index - current) <= 1 ? "flex" : "none"}
      justify="center"
      align="center"
      position="absolute"
      onClick={() => onClick(index)}
      w="420px"
      h="420px"
      cursor="grabbing"
      sx={{
        "> *": {
          userSelect: "none",
        },
      }}
    >
      <Box
        position="relative"
        w="100%"
        h="100%"
        borderWidth={isCurrent ? 1 : 0}
        borderStyle="solid"
        borderColor="gold.500"
      >
        <Image
          layout="fill"
          objectFit="contain"
          src={`/images/gallery/${image}`}
          alt="gallery image"
          draggable="false"
        />
      </Box>
    </MotionFlex>
  );
};

const minimumDrag = 15;

type GalleryProps = {
  images: string[];
};

export const Gallery: FC<GalleryProps> = ({ images }) => {
  console.log("images in gallery: ", images);

  const [current, setCurrent] = useState(0);
  const [isPanned, setIsPanned] = useState(false);

  const onClick = useCallback(
    (index: number) => {
      if (!isPanned) {
        setCurrent(index);
      }
      setIsPanned(false);
    },
    [isPanned]
  );

  const onPanEnd = useCallback(
    (_e, { offset: { x } }: PanInfo) => {
      if (x >= minimumDrag && current > 0) {
        setCurrent((value) => value - 1);
      } else if (x <= -minimumDrag && current + 1 < images.length) {
        setCurrent((value) => value + 1);
      }
    },
    [current, images]
  );

  return (
    <Flex direction="column" justify="center" align="center" mb={36}>
      <MotionFlex
        onPanEnd={onPanEnd}
        // overflow="hidden"
        onPanStart={() => setIsPanned(true)}
        style={{ perspective: "1000px", touchAction: "pan-x" }}
        mb={12}
        align="center"
        justify="center"
        position="relative"
        h={420}
      >
        {images.map((image, i) => {
          return (
            <Card
              onClick={onClick}
              image={image}
              current={current}
              key={image}
              index={i}
            />
          );
        })}
      </MotionFlex>

      <Flex align="center">
        <TriangleIcon
          cursor="pointer"
          boxSize={8}
          color={current === 0 ? "gold.600" : "gold.500"}
          transform="rotate(90deg)"
          mr={4}
          onClick={() => current > 0 && setCurrent((value) => value - 1)}
        />
        {images.map((_, index) => (
          <Box py={3} onClick={() => setCurrent(index)} cursor="pointer">
            <Box
              mr={4}
              h="1px"
              w={8}
              bg={index === current ? "gold.500" : "gold.600"}
            />
          </Box>
        ))}
        <TriangleIcon
          cursor="pointer"
          boxSize={8}
          color={current + 1 === images.length ? "gold.600" : "gold.500"}
          transform="rotate(-90deg)"
          onClick={() =>
            current + 1 < images.length && setCurrent((value) => value + 1)
          }
        />
      </Flex>
    </Flex>
  );
};
