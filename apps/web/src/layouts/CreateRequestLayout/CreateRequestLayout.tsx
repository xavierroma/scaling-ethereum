import { FC, PropsWithChildren } from "react";
import AppLayout from "../AppLayout/AppLayout";

const CreateRequestLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppLayout
      breadcrumb={[
        {
          label: "Create Request",
        },
      ]}
    >
      {children}
    </AppLayout>
  );
};

export default CreateRequestLayout;
