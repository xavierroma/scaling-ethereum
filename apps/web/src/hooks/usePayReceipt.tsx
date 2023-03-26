import {
  ChainId,
  DEPLOYMENT_ADDRESSES,
  TOKEN_ADDRESSES,
} from "@/blockchain/constants";
import { Splitz__factory } from "@/blockchain/generated";
import { BigNumber, Contract, ethers } from "ethers";
import { useAccount, useChainId, useSigner, useSignTypedData } from "wagmi";

import usdcGoerli from "../blockchain/abis/goerli/tUSDC.json";

export function usePayReceipt() {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const chainId = useChainId() as ChainId;
  const { isLoading, signTypedDataAsync } = useSignTypedData();

  async function pay(amount: BigNumber) {
    if (!signer) return;
    if (!address) return;
    const deploymentAddress = DEPLOYMENT_ADDRESSES[chainId];
    if (deploymentAddress === undefined || deploymentAddress === "")
      throw new Error("Unsupported chainId");

    const tokenContract = new Contract(
      TOKEN_ADDRESSES[chainId],
      usdcGoerli,
      signer
    );
    const nonce = await tokenContract.nonces(address);

    const permit = {
      owner: address,
      spender: deploymentAddress as `0x${string}`,
      value: amount,
      nonce,
      deadline: BigNumber.from(Date.now() + 15 * 60 * 1000),
    };

    const signature = await signTypedDataAsync({
      domain: {
        chainId: 5,
        name: "TestUSDC",
        verifyingContract: tokenContract.address as `0x${string}`,
        version: "1",
      },
      types: {
        Permit: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
          },
          {
            name: "deadline",
            type: "uint256",
          },
        ],
      },
      value: permit,
    });

    const split = ethers.utils.splitSignature(signature);

    const splitzSigner = Splitz__factory.connect(deploymentAddress, signer);

    try {
      await splitzSigner.callStatic.pay(0, permit, split);
    } catch (_error) {
      const error = _error as Error;
      throw new Error("Unable to pay receipt " + error.message);
    }

    const transaction = await splitzSigner.pay(0, permit, split);
    await transaction.wait(1);
  }
  return { pay };
}
