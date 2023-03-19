import Breadcrumb, { BreadcrumbItem } from "@/components/Breadcrumb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FC, PropsWithChildren } from "react";

interface AppLayoutProps extends PropsWithChildren {
  breadcrumb: BreadcrumbItem[];
}

const AppLayout: FC<AppLayoutProps> = ({ children, breadcrumb }) => {
  return (
    <div className="flex flex-col flex-1 min-h-full">
      <div className="p-4 flex justify-between items-center">
        <Breadcrumb hasLogo={true} items={breadcrumb} />

        <ConnectButton />
      </div>

      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </div>
  );
};

export default AppLayout;
