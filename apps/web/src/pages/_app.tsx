import { AppPropsWithLayout } from "@/types/next-types";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { mainnet, gnosis, optimism, polygon } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { scroll } from "@/blockchain/constants";
import "@/styles/global.css";
import Head from "next/head";

const { chains, provider } = configureChains(
  [mainnet, gnosis, optimism, polygon, goerli, scroll],
  [
    publicProvider(),
    jsonRpcProvider({
      static: true,
      rpc: (chain) => ({ http: "http://localhost:8545" }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Splitz",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          fontStack: "system",
        })}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Splitz - Request money from your friends and family</title>
        </Head>

        {getLayout(<Component {...pageProps} />)}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
