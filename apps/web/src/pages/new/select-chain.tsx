import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SelectChain: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Select Chain</h1>
    </>
  );
};

SelectChain.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SelectChain;
