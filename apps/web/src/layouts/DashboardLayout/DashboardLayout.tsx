import { FC, PropsWithChildren } from "react";
import AppLayout from "../AppLayout/AppLayout";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppLayout
      breadcrumb={[
        {
          label: "Splitz",
          href: "/",
        },
      ]}
    >
      {children}
    </AppLayout>
  );
};

export default DashboardLayout;
