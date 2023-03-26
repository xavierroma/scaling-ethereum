import {
  backgroundPrimaryGradient,
  backgroundPrimaryGradientHover,
} from "@/styles/classes";
import { Trash03 } from "@untitled-ui/icons-react";
import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={`
        disabled:opacity-50
        text-white
        transition-all
        ${backgroundPrimaryGradient}
        ${backgroundPrimaryGradientHover}
        focus-visible:ring-4
        focus-visible:outline-none
        focus-visible:ring-blue-300
        dark:focus-visible:ring-blue-800
        font-semibold
        rounded-lg
        text-sm
        px-5
        py-2.5
        text-center
        shadow-lg
        shadow-blue-500/20
        active:shadow-transparent
        disabled:shadow-transparent
        disabled:active:top-0
        relative
        active:top-px
      `}
      {...props}
    >
      {children}
    </button>
  );
};

const SecondaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={`
        relative 
        inline-flex 
        items-center 
        justify-center 
        p-0.5 
        overflow-hidden 
        text-sm 
        font-medium 
        text-gray-900 
        rounded-lg 
        group
        ${backgroundPrimaryGradient}
        enabled:group-hover:to-blue-500 
        enabled:group-hover:from-purple-600 
        enabled:hover:text-white 
        dark:text-white 
        focus:ring-4 
        focus:outline-none 
        focus:ring-blue-300 
        enabled:dark:focus:ring-blue-800
        disabled:opacity-50
     `}
      {...props}
    >
      <span
        className={`
          relative 
          px-5 
          py-2
          transition-all 
          ease-in 
          duration-75 
          bg-white 
          dark:bg-gray-900 
          rounded-md 
          ${!props.disabled ? "group-hover:bg-opacity-0" : ""}
        `}
      >
        {children}
      </span>
    </button>
  );
};

const TertiaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={`
        border
        rounded-md
        flex-1
        hover:bg-gray-100
        active:bg-gray-200
      `}
    >
      <span
        className={`
          flex
          items-center
          justify-center
          gap-1
          px-4
          py-2
          text-sm
          font-medium
        `}
      >
        {children}
      </span>
    </button>
  );
};

const IconButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className={`
        bg-white
        disabled:opacity-75
        text-gray-400 
        enabled:hover:text-gray-900 
        rounded-lg 
        enabled:focus:ring-2 
        enabled:focus:ring-gray-300 
        p-1.5 
        enabled:hover:bg-gray-100 
        inline-flex 
        h-9 
        w-9 
        dark:text-gray-500 
        enabled:dark:hover:text-white 
        dark:bg-gray-800 
        enabled:dark:hover:bg-gray-700
      `}
      data-dismiss-target="#toast-success"
      aria-label="Close"
      {...props}
    >
      <span className="sr-only">Close</span>
      <Trash03 />
    </button>
  );
};

const Button = {
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
  Tertiary: TertiaryButton,
  Icon: IconButton,
};
export default Button;
