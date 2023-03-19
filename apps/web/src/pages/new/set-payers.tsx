import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SetPayers: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Set Payers</h1>
    </>
  );
};

SetPayers.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SetPayers;
