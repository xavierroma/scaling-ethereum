import { FC, PropsWithChildren } from "react";

interface FormSectionProps extends PropsWithChildren {
  title: string;
  disabled?: boolean;
}

const FormSection: FC<FormSectionProps> = ({ title, disabled, children }) => (
  <div
    className={`flex flex-col w-full gap-1 p-4 py-3 rounded-2xl shadow-lg shadow-black/5
    ${disabled ? "bg-gray-50" : "bg-backgroundElevated"}
  `}
  >
    <span className="opacity-50 text-xs">{title}</span>

    {children}
  </div>
);

export default FormSection;
