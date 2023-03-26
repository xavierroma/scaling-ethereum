import AvatarAddress from "@/components/AvatarAddress";
import Button from "@/components/Button";
import PayLayout from "@/layouts/PayLayout/PayLayout";
import { textBackgroundPrimaryGradient } from "@/styles/classes";
import { NextPageWithLayout } from "@/types/next-types";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, ReactElement } from "react";

const PaySection: FC<PropsWithChildren & { title: string }> = ({
  children,
  title,
}) => (
  <div className="flex flex-col gap-2 border-t border-background p-4">
    <span className="opacity-50 text-xs">{title}</span>
    {children}
  </div>
);

const Pay: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { requestId } = query;

  const { amount, address } = {
    amount: 100,
    address: "vitalik.eth",
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 lg:p-16 pt-0 max-w-xl w-full mx-auto">
      <h1 className="text-sm opacity-50">Payment of request {requestId}</h1>

      <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
        <div className="flex flex-col gap-2 p-4 py-8">
          <span className={`opacity-50 text-xs text-center`}>Amount</span>
          <span
            className={`text-4xl font-extrabold text-center ${textBackgroundPrimaryGradient}`}
          >
            {amount} DAI
          </span>
        </div>

        <PaySection title="Description">
          <span className="font-semibold">Lunch</span>
        </PaySection>

        <PaySection title="Recipient">
          <div className="flex items-center gap-2">
            <AvatarAddress ens={address} address={address} />
          </div>
        </PaySection>

        <div className="flex flex-col p-4">
          <Button.Primary>Pay</Button.Primary>
        </div>
      </div>
    </div>
  );
};

Pay.getLayout = (page: ReactElement) => {
  return <PayLayout>{page}</PayLayout>;
};

export default Pay;
