import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
      group bg-gradient-to-br 
      from-purple-600 
      to-blue-500 
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
      py-2.5 
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
        h-8 
        w-8 
        dark:text-gray-500 
        enabled:dark:hover:text-white 
        dark:bg-gray-800 
        enabled:dark:hover:bg-gray-700`}
      data-dismiss-target="#toast-success"
      aria-label="Close"
      {...props}
    >
      <span className="sr-only">Close</span>
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
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
