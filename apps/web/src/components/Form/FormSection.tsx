import { FC, PropsWithChildren } from "react";

interface FormSectionProps extends PropsWithChildren {
  title: string;
  disabled?: boolean;
}

const FormSection: FC<FormSectionProps> = ({ title, disabled, children }) => (
  <div
    className={`flex flex-col w-full gap-1 border p-4 py-3 rounded-xl
    ${disabled ? "bg-gray-50" : "bg-background"}
  `}
  >
    <span className="opacity-50 text-xs">{title}</span>

    {children}
  </div>
);

export default FormSection;
