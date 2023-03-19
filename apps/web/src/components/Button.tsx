import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={`
        inline-flex
        items-center
        px-4 py-2
        border border-transparent
        text-sm text-buttonColor font-medium text-center
        rounded-md
        shadow-sm
        bg-buttonBackground hover:bg-buttonBackgroundHover active:bg-buttonBackgroundActive
        focus:outline-none
        /* linear gradient */
        bg-gradient-to-r from-buttonBackground to-buttonBackgroundHover
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
