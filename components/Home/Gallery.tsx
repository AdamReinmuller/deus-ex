import React, { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Flex, FlexProps } from "@chakra-ui/react";
import { motion, PanInfo } from "framer-motion";

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
        top: "50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isCurrent ? 1 : background.scale,
        left: "50%",
        opacity: isCurrent ? 1 : 0.5,
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
      w="30%"
      h="420px"
      py={8}
      px={4}
      bg="gray.600"
      sx={{
        "> *": {
          userSelect: "none",
        },
      }}
    >
      <Image
        layout="fill"
        objectFit="contain"
        src={`/images/gallery/${image}`}
        alt="gallery image"
        draggable="false"
      />
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
    <MotionFlex
      onPanEnd={onPanEnd}
      overflow="hidden"
      onPanStart={() => setIsPanned(true)}
      style={{ perspective: "1000px", touchAction: "pan-x" }}
      align="center"
      justify="center"
      position="relative"
    >
      {images.map((image, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Card
            onClick={onClick}
            image={image}
            current={current}
            key={i}
            index={i}
          />
        );
      })}
    </MotionFlex>
  );
};
