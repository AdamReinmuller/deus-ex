import Head from "next/head";
import { Box } from "@chakra-ui/react";

import { Introduction, Landing } from "../components/Home";
import { QUANTITY } from "../utils/consts";

const Home = () => {
  return (
    <>
      <Head>
        <title>Deus ex Sol</title>
        <meta
          name="description"
          // TODO: description
          content={`NFT project with ${QUANTITY} generated pieces from the metaverse`}
        />
        // TODO: favicon
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box overflow="hidden" mx="auto">
        <Landing />
        <Introduction />
      </Box>
    </>
  );
};

export default Home;
