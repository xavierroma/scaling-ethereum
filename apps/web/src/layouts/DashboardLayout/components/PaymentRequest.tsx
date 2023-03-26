import {
  ChevronRight,
  Download01,
  ReceiptCheck,
  Upload01,
} from "@untitled-ui/icons-react";
import DAI from "cryptocurrency-icons/svg/color/dai.svg";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface DebtProps {
  address: string;
  amount: number;
  description: string;
  href?: Url;
  isSettled?: boolean;
}

const PaymentRequest: FC<DebtProps> = ({
  address,
  amount,
  description,
  href,
  isSettled = false,
}) => {
  const isOutgoing = amount < 0;

  const gradient = isSettled
    ? "text-gray-500 bg-gray-300/30"
    : isOutgoing
    ? "text-orange-500 from-orange-300/20 to-orange-300/50"
    : "text-blue-500 from-blue-300/20 to-blue-300/50";

  const content = (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-xl
      `}
    >
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
        {isSettled ? (
          <ReceiptCheck />
        ) : isOutgoing ? (
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

      {href && (
        <div>
          <ChevronRight xlinkTitle="Settle" />
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
