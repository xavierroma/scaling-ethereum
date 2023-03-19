import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SetAmount: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">Set Amount</h1>

      <div className="flex items-center justify-center mt-8 gap-4">
        <input
          type="number"
          placeholder="Amount"
          className="rounded-xl p-2 font-bold text-2xl text-center"
        />

        {/* DAI icon */}
        <img
          src="/images/dai.svg"
          alt="DAI"
          className="w-10 h-10 rounded-full border"
        />
      </div>

      {/* Numeric keyboard */}
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <div className="flex gap-4">
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            1
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            2
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            3
          </button>
        </div>

        <div className="flex gap-4">
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            4
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            5
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            6
          </button>
        </div>

        <div className="flex gap-4">
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            7
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            8
          </button>
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            9
          </button>
        </div>

        <div className="flex gap-4">
          <button className="w-20 h-20 rounded-full border font-bold text-2xl">
            0
          </button>
        </div>
      </div>
    </>
  );
};

SetAmount.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SetAmount;
