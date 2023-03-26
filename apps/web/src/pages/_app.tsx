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
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  goerli,
  gnosis,
  optimism,
  gnosisChiado,
  polygon,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import "@/styles/global.css";
import { AppPropsWithLayout } from "@/types/next-types";

const { chains, provider } = configureChains(
  [mainnet, arbitrum, bsc, gnosis, optimism, polygon, gnosisChiado, goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! }),
    publicProvider(),
    jsonRpcProvider({
      static: true,
      rpc: (chain) => ({ http: "http://localhost:8545" }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
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
        {getLayout(<Component {...pageProps} />)}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
