import Button from "@/components/Button";
import { Umbrella03 } from "@untitled-ui/icons-react";
import Link from "next/link";

const NoOustandingRequests = () => (
  <div className="flex flex-col gap-4 border px-4 py-8 rounded-xl items-center color-gray-200">
    <Umbrella03 />
    <span className="text-center text-sm font-semibold">
      You have no oustanding requests
    </span>

    <Link href="/new/request" passHref className="flex flex-1">
      <Button.Tertiary>Request Money</Button.Tertiary>
    </Link>
  </div>
);

export default NoOustandingRequests;
