import { Splitz, Splitz__factory } from "@/blockchain/generated";
import { useQuery, useSigner } from "wagmi";

function useReceipts(address: string, options: { enabled?: boolean } = {}) {
  const { enabled = true } = options;
  const { data: signer } = useSigner();
  return useQuery(
    ["balance", address],
    async () => {
      if (!signer) return;
      const splitz: Splitz = Splitz__factory.connect(
        "0x58395A4d794928Fda2a30660ceC6467181c62498",
        signer
      );
      return splitz.getReceiptsByAddress(address);
    },
    { enabled: enabled && !!signer }
  );
}

export default useReceipts;
