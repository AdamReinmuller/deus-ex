import { FC, useState, useCallback } from "react";
import {
  Button,
  ComponentWithAs,
  Flex,
  IconProps,
  Stack,
} from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { TwitterIcon, DiscordIcon, GithubIcon } from "../icons";

type SocialProps = {
  href: string;
  Icon: ComponentWithAs<"svg", IconProps>;
};

const Social = ({ Icon, href }: SocialProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button
        borderRadius={0}
        borderColor="white"
        color="white"
        variant="outline"
        h="initial"
        p={3}
        _hover={{
          borderColor: "gold.500",
          color: "gold.500",
        }}
        _active={{
          borderColor: "gold.600",
          color: "gold.600",
        }}
        transition="all linear 0.2s"
      >
        <Icon boxSize={6} />
      </Button>
    </a>
  );
};

export const Header: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const resetStyle = useCallback(() => {
    setIsHovered(false);
    setIsActive(false);
  }, []);

  return (
    <Flex p={8} justify="space-between" align="center" w="100%" maxW="1440px">
      <Stack direction="row" spacing={2}>
        <Social Icon={TwitterIcon} href="https://twitter.com/deusexsol" />
        <Social Icon={DiscordIcon} href="asd" />
        <Social Icon={GithubIcon} href="asd" />
      </Stack>
      <Flex
        onMouseEnter={() => setIsHovered(true)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={resetStyle}
        position="relative"
        sx={{
          ".wallet-adapter-button": {
            color: isActive ? "gold.600" : isHovered ? "gold.500" : "white",
            height: "44px",
            backgroundColor: "blue.700",
            borderRadius: "0",
            marginTop: "0px",
            paddingLeft: "24px",
            paddingRight: "24px",
            fontSize: "18px",
            fontWeight: "500",
            textTransform: "uppercase",
            letterSpacing: "3px",
            transition: "all linear 0.2s",
            clipPath:
              "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
          },
        }}
      >
        <WalletMultiButton />
        <Flex
          position="absolute"
          left="-1px"
          top="-1px"
          w="calc(100% + 2px)"
          h="calc(100% + 2px)"
          // mixBlendMode="darken"
          bg={isActive ? "gold.600" : isHovered ? "gold.500" : "white"}
          clipPath="polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)"
          zIndex={-1}
          transition="all linear 0.2s"
        />
      </Flex>
    </Flex>
  );
};
