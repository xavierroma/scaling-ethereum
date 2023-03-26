import {
  backgroundNegativeGradient,
  backgroundPrimaryGradient,
} from "@/styles/classes";
import { FC } from "react";

interface BalanceBoxProps {
  balance: number;
  variant: "positive" | "negative" | "neutral";
}

const BalanceBox: FC<BalanceBoxProps> = ({ balance, variant }) => {
  const text = variant === "positive" ? "Yow owe" : "You are owed";
  const background =
    variant === "positive"
      ? "-bg-blue-100/50 -border -border-blue-200/50"
      : variant === "negative"
      ? "-bg-orange-100/50 -border -border-orange-200/50"
      : "-bg-gray-100/50 -border -border-gray-200/50";
  const labelTextColor =
    variant === "positive"
      ? "text-blue-700/50"
      : variant === "negative"
      ? "text-orange-700/50"
      : "text-gray-700/50";
  const valueGradient =
    variant === "positive"
      ? `text-blue-500 ${backgroundPrimaryGradient}`
      : variant === "negative"
      ? `text-orange-500 ${backgroundNegativeGradient}`
      : "text-gray-500 from-gray-500/40 to-gray-500";

  return (
    <div
      className={`
        flex
        flex-1
        flex-col
        justify-center
        items-center
        gap-2
        rounded-2xl
        p-4
        bg-backgroundElevated
        shadow-lg
        shadow-black/5
        ${background}
      `}
    >
      <span
        className={`
          text-xs
          ${labelTextColor}
        `}
      >
        {text}
      </span>
      <div className="flex items-baseline gap-2">
        <span
          className={`
            ${valueGradient}
            bg-gradient-to-b
            text-transparent
            bg-clip-text
            text-4xl
            font-bold
          `}
        >
          {balance.toFixed(2)}
        </span>
        <span
          className={`
            text-xs
            ${labelTextColor}
          `}
        >
          DAI
        </span>
      </div>
    </div>
  );
};

export default BalanceBox;
