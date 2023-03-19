import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-buttonColor bg-buttonBackground hover:bg-buttonBackgroundHover active:bg-buttonBackgroundActive focus:outline-none"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
