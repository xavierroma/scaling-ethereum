import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SetDescription: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Set Description</h1>
    </>
  );
};

SetDescription.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SetDescription;
