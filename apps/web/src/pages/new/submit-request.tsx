import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const SubmitRequest: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Submit Request</h1>
    </>
  );
};

SubmitRequest.getLayout = (page: ReactElement) => {
  return <CreateRequestLayout>{page}</CreateRequestLayout>;
};

export default SubmitRequest;
