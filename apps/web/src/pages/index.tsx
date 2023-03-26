import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import Balance from "@/layouts/DashboardLayout/components/Balance";
import NoOustandingRequests from "@/layouts/DashboardLayout/components/NoOustandingRequests";
import PaymentRequest from "@/layouts/DashboardLayout/components/PaymentRequest";
import { NextPageWithLayout } from "@/types/next-types";
import { ReactElement } from "react";

const Index: NextPageWithLayout = () => {
  const hasRequests = true; // TODO

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 lg:p-16 pt-0 md:flex-row max-w-7xl w-full mx-auto">
      <div className="w-full lg:w-440 md:w-400">
        <Balance balanceOwed={500} balanceRequested={1300} />
      </div>

      <div className="flex-1 flex flex-col gap-8 md:gap-16">
        {hasRequests ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm opacity-50">Unsettled Requests</h2>
            <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
              <PaymentRequest
                href={`/pay/${12344}`}
                address="bartaxyz.eth"
                amount={-50}
                description="Lunch"
              />
              <PaymentRequest
                address="0x04352cab323b2c234"
                amount={24}
                description="Very fancy coffee"
              />
              <PaymentRequest
                href={`/pay/${12344}`}
                address="bartaxyz.eth"
                amount={-50}
                description="Lunch"
              />
              <PaymentRequest
                address="0x04352cab323b2c234"
                amount={24}
                description="Very fancy coffee"
              />
            </div>
          </div>
        ) : (
          <NoOustandingRequests />
        )}

        <div className="flex flex-col gap-2">
          <h2 className="text-sm opacity-50">History</h2>
          <div className="flex flex-col bg-backgroundElevated rounded-2xl shadow-lg shadow-black/5">
            <PaymentRequest
              address="vitalik.eth"
              amount={-100}
              description="Taxi to the airport"
              isSettled
            />
            <PaymentRequest
              address="vitalik.eth"
              amount={100}
              description="Taxi to the airport"
              isSettled
            />
            <PaymentRequest
              address="vitalik.eth"
              amount={-100}
              description="Taxi to the airport"
              isSettled
            />
            <PaymentRequest
              address="vitalik.eth"
              amount={-100}
              description="Taxi to the airport"
              isSettled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Index;
