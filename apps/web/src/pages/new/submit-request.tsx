import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SubmitRequest: NextPageWithLayout = () => {
  const { amount, description } = useCreateRequestStore();

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full shadow-sm rounded-xl border bg-white">
        {/* Table of all details */}
        <div className="flex flex-col items-center justify-center gap-4 w-full p-4">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <span className="font-bold">Amount</span>
            <span className="text-2xl">{amount} DAI</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <span className="font-bold">Description</span>
            <span className="text-2xl">{description}</span>
          </div>
        </div>
      </div>
    </>
  );
};

SubmitRequest.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SubmitRequest;
