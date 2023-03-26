import { ChainId, DEPLOYMENT_ADDRESSES } from "@/blockchain/constants";
import { Splitz, Splitz__factory } from "@/blockchain/generated";
import { useChainId, useQuery, useSigner } from "wagmi";

function useReceipts(address: string, options: { enabled?: boolean } = {}) {
  const { enabled = true } = options;
  const { data: signer } = useSigner();
  const chainId = useChainId();
  return useQuery(
    ["balance", address],
    async () => {
      if (!signer) return;
      const splitz: Splitz = Splitz__factory.connect(
        DEPLOYMENT_ADDRESSES[chainId as ChainId],
        signer
      );
      return splitz.getReceiptsByAddress(address);
    },
    { enabled: enabled && !!signer }
  );
}

export default useReceipts;
