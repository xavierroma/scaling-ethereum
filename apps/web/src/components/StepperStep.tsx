import Link from "next/link";
import { FC } from "react";

interface StepperStepProps {
  title: string;
  description?: string;
  href: string;
  selected?: boolean;
}

const StepperStep: FC<StepperStepProps> = ({
  title,
  description,
  href,
  selected,
}) => (
  <Link
    href={href}
    passHref
    className={`group relative flex flex-1 flex-col justify-stretch transition
      ${selected ? "bg-primary-50 text-primary-500" : "text-gray-400"}
    `}
  >
    <div
      className={`flex items-center md:p-3 md:px-4 p-2 px-2 text-sm font-medium gap-4 transition 
        ${selected ? "bg-primary-50 text-primary-500" : "text-gray-400"}
      `}
    >
      <div className="flex flex-col">
        {title}

        {description && (
          <div className="text-xs text-gray-400">{description}</div>
        )}
      </div>
    </div>

    {/* Arrow right, fill height */}
    <svg
      className="absolute -right-2 top-0 w-4 h-full stroke-gray-200 group-last-of-type:stroke-transparent"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 0l12 12-12 12"
      />
    </svg>
  </Link>
);

export default StepperStep;
