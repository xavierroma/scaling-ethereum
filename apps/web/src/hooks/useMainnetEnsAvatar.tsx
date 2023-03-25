import { useEnsAvatar, useEnsName } from "wagmi";
import { useMainnet } from "./useMainnet";

function useMainnetEnsAvatar(address: string = "") {
  const { chainId, enabled } = useMainnet();
  const isValidAddress = address.startsWith("0x");

  return useEnsAvatar({
    address: address as unknown as `0x${string}`,
    chainId,
    enabled: enabled && isValidAddress,
  });
}

export default useMainnetEnsAvatar;
