import Head from "next/head";
import { Box } from "@chakra-ui/react";
import fs from "fs";
import path from "path";

import { Introduction, Landing } from "../components/Home";
import { QUANTITY } from "../utils/consts";
import { Gallery } from "../components/Home/Gallery";
import { GetStaticProps } from "next";

type HomeProps = {
  images: string[];
};

const Home = ({ images }: HomeProps) => {
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
        <Gallery images={images} />
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const imagesDirectory = path.join(process.cwd(), "public/images/gallery");
  const images = fs.readdirSync(imagesDirectory);

  return {
    props: {
      images,
    },
  };
};

export default Home;
