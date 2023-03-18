import { FC, PropsWithChildren } from "react";
import AppLayout from "../AppLayout/AppLayout";

const PayLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppLayout
      breadcrumb={[
        {
          label: "Pay",
        },
      ]}
    >
      {children}
    </AppLayout>
  );
};

export default PayLayout;
