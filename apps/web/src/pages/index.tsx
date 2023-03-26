import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Balance from "@/layouts/DashboardLayout/components/Balance";
import NoOustandingRequests from "@/layouts/DashboardLayout/components/NoOustandingRequests";
import PaymentRequest from "@/layouts/DashboardLayout/components/PaymentRequest";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";
import { useAccount } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { middleElipse } from "@/utils/middleElipse";
import useReceipts from "@/hooks/useReceipts";
import { Registry } from "@/blockchain/generated/Splitz";

const Index: NextPageWithLayout = () => {
  const connectedAccount = useAccount();
  const connectedAddress = String(connectedAccount.address);
  const { data: receipts = [] } = useReceipts(String(connectedAddress), {
    enabled: !!connectedAccount.address,
  });
  const owedReceipts = getOwedReceipts(connectedAddress, receipts);
  const owesReceipts = getOwesReceipts(connectedAddress, receipts);
  const settled = getSettledReceipts(connectedAddress, receipts);
  const { totalOwed, totalOwes } = computeMetrics(connectedAddress, receipts);
  const isOwed = owedReceipts.length > 0;
  const hasPendingPayments = owesReceipts.length > 0;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 lg:p-16 pt-0 md:flex-row max-w-7xl w-full mx-auto">
      <div className="w-full lg:w-440 md:w-400">
        <Balance balanceOwed={totalOwed} balanceRequested={totalOwes} />
      </div>

      <div className="flex-1 flex flex-col gap-8 md:gap-16">
        {isOwed ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm opacity-50">You Are Owed</h2>
            <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
              {owedReceipts.map((receipt) => {
                console.log(receipt.lines);
                return (
                  <PaymentRequest
                    address={middleElipse(receipt.owed)}
                    amount={
                      receipt.amount &&
                      Number(ethers.utils.formatUnits(receipt.amount, 6)) *
                        (receipt.owed === connectedAddress ? 1 : -1)
                    }
                    description={receipt.description}
                    payers={receipt.lines}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <NoOustandingRequests />
        )}
        {hasPendingPayments && (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm opacity-50">You Owe</h2>
            <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
              {owesReceipts.map((receipt) => {
                return (
                  <PaymentRequest
                    variant="debt"
                    href={`/pay/${receipt.id}`}
                    address={middleElipse(receipt.owed)}
                    amount={
                      receipt.amount &&
                      Number(ethers.utils.formatUnits(receipt.amount, 6)) *
                        (receipt.owed === connectedAccount.address ? 1 : -1)
                    }
                    description={receipt.description}
                    payers={receipt.lines}
                  />
                );
              })}
            </div>
          </div>
        )}
        {settled.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm opacity-50">History</h2>
            <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
              {settled.map((receipt) => {
                return (
                  <PaymentRequest
                    variant="settled"
                    address={middleElipse(receipt.owed)}
                    amount={
                      receipt.amount &&
                      Number(ethers.utils.formatUnits(receipt.amount, 6)) *
                        (receipt.owed === connectedAccount.address ? 1 : -1)
                    }
                    description={receipt.description}
                    payers={receipt.lines}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Index;

function computeMetrics(
  address: string,
  pending: Registry.ReceiptStructOutput[]
): {
  totalOwed: number;
  totalOwes: number;
} {
  return {
    totalOwed: Number(
      ethers.utils.formatUnits(computeOwed(address, pending), 6)
    ),
    totalOwes: Number(
      ethers.utils.formatUnits(computeOwes(address, pending), 6)
    ),
  };
}

function computeOwed(address: string, pending: Registry.ReceiptStructOutput[]) {
  return pending.reduce((acc, receipt) => {
    if (receipt.owed === address && receipt.lines) {
      for (const line of receipt.lines) {
        if (!line.paid && line.owes !== address) {
          acc = acc.add(line.amount);
        }
      }
    }
    return acc;
  }, BigNumber.from(0));
}

function computeOwes(address: string, pending: Registry.ReceiptStructOutput[]) {
  return pending.reduce((acc, receipt) => {
    if (receipt.owed !== address && receipt.lines) {
      for (const line of receipt.lines) {
        if (!line.paid && line.owes === address) {
          acc = acc.add(line.amount);
        }
      }
    }
    return acc;
  }, BigNumber.from(0));
}

function getOwedReceipts(
  address: string,
  pending: Registry.ReceiptStructOutput[]
) {
  return pending
    .filter(
      (receipt) =>
        receipt.owed === address && receipt.lines.some((l) => !l.paid)
    )
    .reverse();
}

function getOwesReceipts(
  address: string,
  pending: Registry.ReceiptStructOutput[]
) {
  return pending
    .filter(
      (receipt) =>
        receipt.owed !== address &&
        receipt.lines?.some((l) => l.owes === address && !l.paid)
    )
    .reverse();
}

function getSettledReceipts(
  address: string,
  pending: Registry.ReceiptStructOutput[]
) {
  return pending
    .filter((receipt) => {
      const addressPaid = receipt.lines?.some(
        (l) => l.owes === address && l.paid
      );
      const hasBeenPaid =
        receipt.owed === address && receipt.lines?.every((l) => l.paid);
      return addressPaid || hasBeenPaid;
    })
    .reverse();
}
