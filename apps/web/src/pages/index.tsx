import Button from "@/components/Button";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { NextPageWithLayout } from "@/types/next-types";
import Link from "next/link";
import { ReactElement } from "react";

const Index: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex gap-2">
        <Link href="/new/select-chain" passHref>
          <Button.Primary>Request Money</Button.Primary>
        </Link>

        <Link href="/pay/to-do" passHref>
          <Button.Primary>Send Money</Button.Primary>
        </Link>
      </div>
    </>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Index;
