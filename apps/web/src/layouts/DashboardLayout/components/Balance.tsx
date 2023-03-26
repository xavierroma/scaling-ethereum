import { FC } from "react";
import BalanceBox from "./BalanceBox";
import Link from "next/link";
import Button from "@/components/Button";

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

    <div className="flex flex-col gap-4 p-4 bg-backgroundElevated shadow-lg shadow-black/5 rounded-2xl">
      <div className="flex self-stretch justify-between gap-1 text-gray-800/50">
        <span>
          Total <span className="text-xs">(requested - owed)</span>
        </span>
        <span>{balanceRequested - balanceOwed} DAI</span>
      </div>

      <Link href="/new/request" passHref className="flex flex-1">
        <Button.Tertiary>Request Money</Button.Tertiary>
      </Link>
    </div>
  </div>
);

export default Balance;
