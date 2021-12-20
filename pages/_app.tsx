import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";

import { WalletBalanceProvider } from "../hooks/useWalletBalance";
import theme from "../theme";

require("@solana/wallet-adapter-react-ui/styles.css");

const WalletConnectionProvider = dynamic(
  () => import("../components/WalletConnection/WalletConnectionProvider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WalletConnectionProvider>
        <WalletBalanceProvider>
          <Component {...pageProps} />
        </WalletBalanceProvider>
      </WalletConnectionProvider>
    </ChakraProvider>
  );
}
export default MyApp;
