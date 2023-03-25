import { useEnsName } from "wagmi";
import { useMainnet } from "./useMainnet";

function useMainnetEnsName(address: string = "") {
  const { chainId, enabled } = useMainnet();
  const isValidAddress = address.startsWith("0x");

  return useEnsName({
    address: address as unknown as `0x${string}`,
    chainId,
    enabled: enabled && isValidAddress,
  });
}

export default useMainnetEnsName;
