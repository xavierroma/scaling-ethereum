import { FC, PropsWithChildren, useState } from "react";
import AppLayout from "../AppLayout/AppLayout";
import Button from "@/components/Button";
import { Registry, Splitz } from "@/blockchain/generated/Splitz";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { ethers } from "ethers";
import { Splitz__factory } from "@/blockchain/generated";
import { useChainId, useSigner } from "wagmi";
import { ChainId, DEPLOYMENT_ADDRESSES } from "@/blockchain/constants";
import { useRouter } from "next/router";

const CreateRequestLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: signer } = useSigner();
  const { push } = useRouter();
  const chainId = useChainId();
  const splits = useCreateRequestStore((state) => state.splits);
  const amount = useCreateRequestStore((state) => state.amount);
  const clear = useCreateRequestStore((state) => state.clear);
  const description = useCreateRequestStore((state) => state.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit =
    !isSubmitting && splits.length > 0 && amount > 0 && description && signer;

  const submitRequest = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    const createRequest: Registry.CreateReceiptLineStruct[] = splits.map(
      (split) => ({
        amount: ethers.utils.parseUnits(split.amount.toString(), 6),
        owes: split.address,
      })
    );
    const splitz: Splitz = Splitz__factory.connect(
      DEPLOYMENT_ADDRESSES[chainId as ChainId],
      signer
    );
    const res = await splitz.addReceipt(description, createRequest);
    await res.wait(1);
    clear();
    push("/");
  };
  return (
    <AppLayout breadcrumb={[{ label: "Create Request" }]}>
      <div className="max-w-sm flex flex-col flex-1 w-full ml-auto mr-auto">
        <div className="flex flex-col" />

        <div className="flex flex-col gap-4 p-4">{children}</div>

        <div className="flex flex-col  justify-end gap-4 w-full p-4 pt-0">
          <Button.Primary disabled={!canSubmit} onClick={submitRequest}>
            <div className="flex flex-row justify-center items-center gap-2">
              {isSubmitting && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              <p>Submit</p>
            </div>
          </Button.Primary>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateRequestLayout;
