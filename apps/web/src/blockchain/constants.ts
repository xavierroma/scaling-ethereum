import { Chain } from "wagmi";

export enum ChainId {
  // ethereum = 1,
  goerli = 5,
  // polygon = 137,
  scroll = 534353,
  // optimismGoerli = 420,
  // arbitrumGoerli = 421_613,
  optimism = 10,
  // arbitrum = 42_161,
  gnosis = 100,
  polygonZkEvm = 1442,
}

export enum Token {
  dai = "dai",
  usdc = "usdc",
}

export const TOKEN_ADDRESSES: Record<ChainId, string> = {
  [ChainId.goerli]: "0xf06605C57289098Cb82b284c0D2Dcbc3ba84d2d0",
  [ChainId.scroll]: "0x67aE69Fd63b4fc8809ADc224A9b82Be976039509", //USDC
  [ChainId.optimism]: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", //DAI
  [ChainId.gnosis]: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", //USDC
  [ChainId.polygonZkEvm]: "0xDfc8f52d43007972c60bDf2e6b1Fe10F49bD86D3", //USDC
};

export const DEPLOYMENT_ADDRESSES: Record<ChainId, string> = {
  [ChainId.goerli]: "0x683912cC6636387bc3e05DF44147123B75edAA3b",
  [ChainId.scroll]: "0xC848f8Fe46838DE0ca499283A06B45DC4a681baA",
  [ChainId.optimism]: "0xAf537337b75cB49A9a52265fa0b03128A6c74416",
  [ChainId.gnosis]: "0xAf537337b75cB49A9a52265fa0b03128A6c74416",
  [ChainId.polygonZkEvm]: "0x24Fc2DF0c12D6B20220A665405a9Da4f6568d41f",
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

export const polygonZkEvm: Chain = {
  id: 1442,
  name: "Polygon zkEVM Testnet",
  network: "Polygon zkEVM Testnet",
  nativeCurrency: { symbol: "ETH", name: "Ether", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.public.zkevm-test.net"] },
    public: { http: ["https://rpc.public.zkevm-test.net"] },
  },
  testnet: true,
};