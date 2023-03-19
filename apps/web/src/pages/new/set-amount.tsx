import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

// get DAI icon
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import ETH from "cryptocurrency-icons/svg/color/eth.svg";
import Image from "next/image";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { useNetwork } from "wagmi";
import FormSectionArrow from "@/components/Form/FormSectionArrow";
import FormSection from "@/components/Form/FormSection";

const SetAmount: NextPageWithLayout = () => {
  const network = useNetwork();

  const amount = useCreateRequestStore((store) => store.amount);
  const setAmount = useCreateRequestStore((store) => store.setAmount);

  return (
    <div className="flex flex-1 flex-col max-w-2xl mx-auto justify-center items-center">
      <FormSection title="Chain" disabled={true}>
        <div className="flex items-center gap-2">
          {/* icon */}
          <Image src={ETH} alt="ETH" width="24" height="24" />
          <span className="font-bold">{network.chain?.name}</span>
        </div>
      </FormSection>

      <FormSectionArrow />

      <FormSection title="Amount" disabled={true}>
        <div className="flex gap-1">
          <input
            type="number"
            defaultValue={amount || undefined}
            placeholder="0"
            className="flex flex-1 w-full bg-transparent rounded-xl p-2 -m-2 text-2xl focus:outline-none"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const value = input.value;
              console.log(value);

              setAmount(Number(value));
            }}
          />

          {/* DAI icon */}
          <div className="flex items-center gap-2 p-2 bg-gray-50 border rounded-xl">
            <Image src={DAI} alt="DAI" width="32" height="32" />
            <span>DAI</span>
          </div>
        </div>
      </FormSection>

      <FormSectionArrow />

      <FormSection title="Description">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="What is this request for?"
            className="flex flex-1 w-full bg-transparent rounded-xl p-2 -m-2 text-xl focus:outline-none"
          />
        </div>
      </FormSection>
    </div>
  );
};

SetAmount.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SetAmount;
