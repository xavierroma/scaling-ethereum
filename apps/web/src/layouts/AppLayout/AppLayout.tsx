import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, PropsWithChildren } from "react";

interface AppLayoutProps extends PropsWithChildren {
  breadcrumb: BreadcrumbItem[];
}

const AppLayout: FC<AppLayoutProps> = ({ children, breadcrumb }) => {
  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <Breadcrumb hasLogo={true} items={breadcrumb} />

        <ConnectButton />
      </div>

      <div className="flex flex-col gap-4 m-4">{children}</div>
    </>
  );
};

export default AppLayout;
