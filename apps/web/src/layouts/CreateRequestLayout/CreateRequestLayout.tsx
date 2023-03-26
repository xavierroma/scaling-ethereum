import { FC, PropsWithChildren } from "react";
import AppLayout from "../AppLayout/AppLayout";
import Button from "@/components/Button";
import { Registry, Splitz } from "@/blockchain/generated/Splitz";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { ethers } from "ethers";
import { Splitz__factory } from "@/blockchain/generated";
import { useSigner } from "wagmi";

const CreateRequestLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: signer } = useSigner();
  const splits = useCreateRequestStore((state) => state.splits);
  const description = useCreateRequestStore((state) => state.description);

  const submitRequest = async () => {
    if (!signer) return;
    const createRequest: Registry.CreateReceiptLineStruct[] = splits.map(
      (split) => ({
        amount: ethers.utils.parseUnits(split.amount.toString(), 18),
        owes: split.address,
      })
    );
    const splitz: Splitz = Splitz__factory.connect(
      "0x9A9336DB3814a82CdC55c76e6a95aB75191eEbfE",
      signer
    );
    const res = await splitz.addReceipt(description, createRequest);
    console.log(res);
  };

  return (
    <AppLayout breadcrumb={[{ label: "Create Request" }]}>
      <div className="max-w-2xl flex flex-col flex-1 w-full ml-auto mr-auto">
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>

        <div className="flex flex-col items-end justify-end gap-4 w-full p-4">
          <Button.Primary onClick={submitRequest}>Submit</Button.Primary>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateRequestLayout;
