import { Registry } from "@/blockchain/generated/Splitz";
import {
  ChevronRight,
  Download01,
  ReceiptCheck,
  Upload01,
} from "@untitled-ui/icons-react";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import makeBlockie from "ethereum-blockies-base64";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface DebtProps {
  variant?: "settled" | "debt" | "request";
  address: string;
  amount: number;
  description: string;
  href?: Url;
  payers: Registry.ReceiptLineStructOutput[];
}

const PaymentRequest: FC<DebtProps> = ({
  variant = "request",
  address,
  amount,
  description,
  href,
  payers,
}) => {
  const gradient =
    variant === "settled"
      ? "text-gray-500 bg-gray-300/30"
      : variant === "debt"
      ? "text-orange-500 from-orange-300/20 to-orange-300/50"
      : "text-blue-500 from-blue-300/20 to-blue-300/50";

  const content = (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <div
          className={`
            flex
            gap-2
            items-center
            rounded-full
            p-2
            ${gradient}
            bg-gradient-to-br
          `}
        >
          {variant === "settled" ? (
            <ReceiptCheck />
          ) : variant === "debt" ? (
            <Upload01 />
          ) : (
            <Download01 />
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <span className="text-sm font-semibold">{description}</span>
          <span className="text-xs opacity-50">From {address}</span>
        </div>

        <div className="flex gap-2 items-center">
          <Image src={DAI} alt="DAI" className="w-8 h-8" />
          <span className="font-semibold">{amount} DAI</span>
        </div>

        {href && variant === "debt" && (
          <div>
            <ChevronRight xlinkTitle="Settle" />
          </div>
        )}
      </div>

      {variant === "request" && (
        <div className="flex gap-2">
          <div className="flex self-start items-center gap-2 rounded-full px-2 py-1 mt-2 bg-background">
            <span className="text-xs opacity-50">
              {payers.filter((p) => p.paid).length} paid
            </span>

            {payers
              .filter((p) => p.paid)
              .map((p) => (
                <img
                  key={p.owes}
                  src={makeBlockie(p.owes)}
                  className="w-4 h-4 rounded-full"
                />
              ))}
          </div>

          <div className="flex self-start items-center gap-2 rounded-full px-2 py-1 mt-2 bg-background">
            <span className="text-xs opacity-50">
              {payers.filter((p) => !p.paid).length} unpaid
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const rootClasses = `
    flex
    flex-col
    gap-2
    border-b
    border-background
    last:border-0
    py-4
    px-4
  `;

  return href ? (
    <Link className={rootClasses} href={href}>
      {content}
    </Link>
  ) : (
    <div className={rootClasses}>{content}</div>
  );
};

export default PaymentRequest;
