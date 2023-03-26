import { Chain } from "wagmi";

export enum ChainId {
  ethereum = 1,
  goerli = 5,
  polygon = 137,
  scroll = 534353,
  optimismGoerli = 420,
  arbitrumGoerli = 421_613,
  optimism = 10,
  arbitrum = 42_161,
  gnosis = 100,
}

export enum Token {
  dai = "dai",
  usdc = "usdc",
}

export const TOKEN_ADDRESSES: Record<ChainId, string> = {
  [ChainId.goerli]: "0xf06605C57289098Cb82b284c0D2Dcbc3ba84d2d0",
  [ChainId.ethereum]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  [ChainId.polygon]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  [ChainId.optimismGoerli]: "0xe54d54f6B463320CF12a08d1d5d821888Ca3f208",
  [ChainId.arbitrumGoerli]: "0xe54d54f6B463320CF12a08d1d5d821888Ca3f208",
  [ChainId.optimism]: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
  [ChainId.arbitrum]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  [ChainId.scroll]: "0xf06605C57289098Cb82b284c0D2Dcbc3ba84d2d0",
  [ChainId.gnosis]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
};

export const DEPLOYMENT_ADDRESSES: Record<ChainId, string> = {
  [ChainId.goerli]: "0x683912cC6636387bc3e05DF44147123B75edAA3b",
  [ChainId.gnosis]: "0x24Fc2DF0c12D6B20220A665405a9Da4f6568d41f",
  [ChainId.scroll]: "0x683912cC6636387bc3e05DF44147123B75edAA3b",
  [ChainId.ethereum]: "",
  [ChainId.polygon]: "",
  [ChainId.optimismGoerli]: "",
  [ChainId.arbitrumGoerli]: "",
  [ChainId.optimism]: "",
  [ChainId.arbitrum]: "",
};

export const scroll: Chain = {
  id: 534353,
  name: "Scroll",
  network: "Scroll Alpha Testnet",
  nativeCurrency: { symbol: "ETH", name: "Ether", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://alpha-rpc.scroll.io/l2"] },
    public: { http: ["https://alpha-rpc.scroll.io/l2"] },
  },
  testnet: true,
};