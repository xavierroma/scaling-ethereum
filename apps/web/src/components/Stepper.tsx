import { FC, PropsWithChildren } from "react";

interface StepperProps extends PropsWithChildren {}

const Stepper: FC<StepperProps> = ({ children }) => (
  <div className="shadow-sm rounded-xl border shadow-sm h-16">
    <div className="flex items-stretch justify-stretch h-full">
      {children}
    </div>
  </div>
);

export default Stepper;
