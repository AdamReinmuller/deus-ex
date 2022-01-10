import Head from "next/head";

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
      <Landing />
      <Introduction />
    </>
  );
};

export default Home;
