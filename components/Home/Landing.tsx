/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Button, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { Toaster } from "react-hot-toast";

import useCandyMachine from "../../hooks/useCandyMachine";
import useWalletBalance from "../../hooks/useWalletBalance";
import useWalletNfts from "../../hooks/useWalletNFTs";

import AnNFT from "../AnNFT/AnNFT";
import { LogoIcon } from "../icons";
import { Header } from "./Header";

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

const Title = () => {
  return (
    <Flex
      direction="column"
      position="absolute"
      bottom={-12}
      left="50%"
      transform="translate(-50%)"
      justify="flex-end"
      align="center"
      w="100%"
      h="100%"
    >
      <LogoIcon boxSize="57%" />
    </Flex>
  );
};

export const Landing = () => {
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
    <Flex
      overflow="hidden"
      w="100vw"
      h="100vh"
      direction="column"
      align="center"
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
      <Title />
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
                        <Button
                          onClick={startMint}
                          disabled={isMinting}
                          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
                        >
                          {isMinting ? "loading" : "mint 1"}
                        </Button>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint Many</h1>
                        {/* <MintMany /> */}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
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
  );
};
