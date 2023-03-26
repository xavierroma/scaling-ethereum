import { useEnsAddress, useEnsName } from "wagmi";
import { useMainnet } from "./useMainnet";

function useMainnetEnsAddress(name: string = "") {
  const { chainId, enabled } = useMainnet();
  const isValidEns = name.endsWith(".eth");

  return useEnsAddress({
    name,
    chainId,
    enabled: enabled && isValidEns,
  });
}

export default useMainnetEnsAddress;
