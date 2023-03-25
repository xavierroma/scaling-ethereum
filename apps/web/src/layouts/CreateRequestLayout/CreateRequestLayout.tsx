import Stepper from "@/components/Stepper";
import StepperStep from "@/components/StepperStep";
import { useCreateRequestStore } from "@/stores/useCreateRequestStore";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useMemo } from "react";
import AppLayout from "../AppLayout/AppLayout";
import Button from "@/components/Button";

export enum Steps {
  SetPayers = "SetPayers",
  SetAmounts = "SetAmounts",
  SetDescription = "SetDescription",
  SubmitRequest = "SubmitRequest",
}

const CreateRequestLayout: FC<PropsWithChildren> = ({ children }) => {
  const { push, pathname } = useRouter();

  const steps = useMemo(
    () => [
      {
        title: "New Request",
        href: "/new/request",
        step: Steps.SetPayers,
      },
      {
        title: "Submit",
        href: "/new/submit-request",
        step: Steps.SubmitRequest,
      },
    ],
    []
  );

  const selectedStep = steps.find((step) => step.href === pathname) || "";

  return (
    <AppLayout breadcrumb={[{ label: "Create Request" }]}>
      <div className="max-w-2xl flex flex-col flex-1 w-full ml-auto mr-auto">
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>

        <div className="flex flex-col items-end justify-end gap-4 w-full p-4">
          <Button.Primary
            disabled={!selectedStep?.description}
            onClick={() => {
              push(selectedStep?.href);
            }}
          >
            Next
          </Button.Primary>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateRequestLayout;
