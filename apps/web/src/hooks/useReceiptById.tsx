import { Registry } from "@/blockchain/generated/Splitz";
import { useAccount } from "wagmi";
import useReceipts from "./useReceipts";

export function useReceiptId(
  id: number
): Registry.ReceiptStructOutput | undefined {
  const { address } = useAccount();
  const { data: receipts = [] } = useReceipts(String(address), {
    enabled: !!address,
  });

  return receipts.find((receipt) => receipt.id?.toNumber() === id);
}
