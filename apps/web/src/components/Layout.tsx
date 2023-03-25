import { FC, ReactComponentElement, ReactElement } from "react";

type Props = {
    main: ReactElement
  footer: ReactElement;
};

const Layout: FC<Props> = ({ main, footer}) => {
  return (
    <div className="flex h-screen md:container">
      <div className="m-auto h-96 w-96 shadow sm:overflow-hidden sm:rounded-md flex-col flex justify-between">
            <div className="bg-white px-4 py-5 sm:p-6">
            {main}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6">
            {footer}
            </div>
      </div>
  </div>
  );
};

export default Layout;
