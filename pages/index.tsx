/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  ComponentWithAs,
  Flex,
  IconProps,
  Stack,
} from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Countdown from "react-countdown";
import { Toaster } from "react-hot-toast";

import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";
import { DiscordIcon, GithubIcon, TwitterIcon } from "../components/icons";

// const MintMany = () => {
//   const [mintCount, setMintCount] = useState(5);

//   return (
//     <>
//       <button
//         onClick={() => startMintMultiple(mintCount)}
//         disabled={isMinting}
//         className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
//       >
//         {isMinting ? "loading" : `mint ${mintCount}`}
//       </button>

//       <input
//         disabled={isMinting}
//         type="number"
//         min={2}
//         max={10}
//         className="px-2 mx-auto mt-5 font-bold text-white bg-gray-500"
//         value={mintCount}
//         onChange={(e) => setMintCount((e.target as any).value)}
//       />
//       <p className="mx-auto mt-2">min 2; max 10;</p>
//     </>
//   );
// };

type SocialProps = {
  link: string;
  Icon: ComponentWithAs<"svg", IconProps>;
};

const Social = ({ Icon }: SocialProps) => {
  return (
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
      // TODO: onclick link a
    >
      <Icon boxSize={6} />
    </Button>
  );
};

const Header: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const resetStyle = useCallback(() => {
    setIsHovered(false);
    setIsActive(false);
  }, []);

  return (
    <Flex p={8} justify="space-between" align="center">
      <Stack direction="row" spacing={2}>
        <Social Icon={TwitterIcon} link="asd" />
        <Social Icon={DiscordIcon} link="asd" />
        <Social Icon={GithubIcon} link="asd" />
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
        {/* <Flex
          position="absolute"
          mt="0px !important"
          top={0}
          zIndex={-1}
          left={0}
          w="100%"
          h="100%"
          filter="blur(8px)"
        />  */}
      </Flex>
    </Flex>
  );
};

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    // startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [_isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [_isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Deus ex Sol</title>
        <meta
          name="description"
          // TODO: description
          content="NFT project with 5000 generated pieces from the metaverse"
        />
        // TODO: favicon
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        direction="column"
        position="relative"
        sx={{
          ".bgImage": {
            zIndex: -2,
          },
        }}
      >
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="backround image"
          className="bgImage"
        />
        <Box
          left={0}
          top={0}
          position="absolute"
          h="100%"
          w="100%"
          zIndex={-1}
          background="linear-gradient(to bottom, transparent, black)"
        />
        <Header />
        <Toaster />
        <div className="flex flex-col items-center min-h-screen mx-6">
          <div className="flex items-center justify-between w-full mt-3">
            <h1 className="text-2xl font-bold">next-candy-machine</h1>
            <div className="flex items-center">
              {connected && (
                <div className="flex items-end mr-2">
                  <p className="text-xs text-gray-400">balance</p>
                  <p className="mx-1 font-bold leading-none">
                    {balance.toFixed(2)}
                  </p>
                  <p
                    className="font-bold leading-none text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, #00FFA3, #03E1FF, #DC1FFF)`,
                    }}
                  >
                    SOL
                  </p>
                </div>
              )}
            </div>
          </div>
          {connected && (
            <p className="mr-auto text-sm">
              <span className="font-bold">Available/Minted/Total:</span>{" "}
              {nftsData.itemsRemaining}/{nftsData.itemsRedeemed}/
              {nftsData.itemsAvailable}
            </p>
          )}
          <div className="flex items-start justify-center w-11/12 my-10">
            {connected ? (
              <>
                {new Date(mintStartDate).getTime() < Date.now() ? (
                  <>
                    {isSoldOut ? (
                      <p>SOLD OUT</p>
                    ) : (
                      <>
                        <div className="flex flex-col w-1/2">
                          <h1 className="mb-10 text-3xl font-bold">Mint One</h1>
                          <button
                            onClick={startMint}
                            disabled={isMinting}
                            className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
                          >
                            {isMinting ? "loading" : "mint 1"}
                          </button>
                        </div>
                        {/* <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint Many</h1> */}
                        {/* <MintMany /> */}
                        {/* </div> */}
                      </>
                    )}
                  </>
                ) : (
                  <Countdown
                    date={mintStartDate}
                    onMount={({ completed }) =>
                      completed && setIsMintLive(true)
                    }
                    onComplete={() => setIsMintLive(true)}
                  />
                )}
              </>
            ) : (
              <p>connect wallet to mint</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <h2 className="text-2xl font-bold">My NFTs</h2>
            <div className="flex mt-3 gap-x-2">
              {(nfts as any).map((nft: any, i: number) => {
                return <AnNFT key={i} nft={nft} />;
              })}
            </div>
          </div>
        </div>
      </Flex>
    </>
  );
}
