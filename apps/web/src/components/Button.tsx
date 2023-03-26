import {
  backgroundPrimaryGradient,
  backgroundPrimaryGradientHover,
} from "@/styles/classes";
import { Trash03 } from "@untitled-ui/icons-react";
import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const PrimaryButton: FC<ButtonProps> = ({ children, loading, ...props }) => {
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
      <div className="flex flex-row justify-center items-center gap-2">
        {loading && (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
        {children}
      </div>
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
        relative
        active:top-px
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
