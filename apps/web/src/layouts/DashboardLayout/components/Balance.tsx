import { FC } from "react";
import BalanceBox from "./BalanceBox";
import Link from "next/link";
import Button from "@/components/Button";
import { backgroundPrimaryGradient, backgroundPrimaryGradientHover, textBackgroundPrimaryGradient } from "@/styles/classes";

interface BalanceProps {
  balanceOwed: number;
  balanceRequested: number;
}

const Balance: FC<BalanceProps> = ({ balanceOwed, balanceRequested }) => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <BalanceBox balance={balanceOwed} variant="negative" />

      <BalanceBox balance={balanceRequested} variant="positive" />
    </div>

    <div className="flex flex-col bg-backgroundElevated shadow-lg shadow-black/5 rounded-2xl overflow-hidden">
      <div className="flex self-stretch justify-between gap-1 text-gray-800/50 p-4">
        <span>
          Total <span className="text-xs">(requested - owed)</span>
        </span>
        <span>{balanceRequested - balanceOwed} DAI</span>
      </div>

      <Link href="/new/request" passHref className="flex flex-1">
        <div
          className={`
            flex
            flex-1
            justify-center
            items-center
            text-sm
            font-semibold
            border-t
            border-background
            p-3
            transition-all
            hover:bg-background
            active:bg-backgroundElevated
          `}
        >
          <span
            className={`
            ${textBackgroundPrimaryGradient}
          `}
          >
            Request Money
          </span>
        </div>
      </Link>
    </div>
  </div>
);

export default Balance;
