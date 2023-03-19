import CreateRequestLayout from "@/layouts/CreateRequestLayout/CreateRequestLayout";
import PayLayout from "@/layouts/PayLayout/PayLayout";
import { NextPageWithLayout } from "@/types/next-types";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const Pay: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { requestId } = query;

  return (
    <>
      <h1 className="text-3xl font-bold">Pay Request {requestId}</h1>
    </>
  );
};

Pay.getLayout = (page: ReactElement) => {
  return <PayLayout>{page}</PayLayout>;
};

export default Pay;
