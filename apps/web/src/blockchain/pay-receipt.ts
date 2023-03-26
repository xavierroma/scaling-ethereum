import { Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ethers } from "ethers";
import { useSignTypedData } from "wagmi";
import usdcAbi from "./abis/goerli/tUSDC.json";
import { ChainId, DEPLOYMENT_ADDRESSES, TOKEN_ADDRESSES } from "./constants";
import { Splitz__factory } from "./generated";

// signTypedDataAsync is obtained from wagmi, e.g.:
// const { isLoading, signTypedDataAsync } = useSignTypedData();
export async function payReceipt(
  fromAddress: string,
  amount: BigNumber,
  config: {
    signTypedDataAsync: ReturnType<typeof useSignTypedData>["signTypedDataAsync"];
    signer: Provider;
  }
) {
  const chainId = (await config.signer.getNetwork()).chainId as ChainId;
  const deploymentAddress = DEPLOYMENT_ADDRESSES[chainId];
  if (deploymentAddress === undefined || deploymentAddress === "") throw new Error("Unsupported chainId");

  const tokenContract = new Contract(TOKEN_ADDRESSES[chainId], usdcAbi, config.signer);
  const nonce = await tokenContract.nonces(fromAddress);

  const permit = {
    owner: fromAddress as `0x${string}`,
    spender: deploymentAddress as `0x${string}`,
    value: amount,
    nonce,
    deadline: BigNumber.from(Date.now() + 15 * 60 * 1000),
  };

  const signature = await config.signTypedDataAsync({
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

  const splitzSigner = Splitz__factory.connect(deploymentAddress, config.signer);

  try {
    await splitzSigner.callStatic.pay(0, permit, split);
  } catch (_error) {
    const error = _error as Error;
    throw new Error("Unable to pay receipt " + error.message);
  }

  const transaction = await splitzSigner.pay(0, permit, split);
  await transaction.wait(1);
}
