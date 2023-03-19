import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  hasLogo?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, hasLogo }) => {
  const breadcrumbItems = hasLogo
    ? [
        {
          label: "Logo",
          href: "/",
        },
        ...items,
      ]
    : items;

  return (
    <nav
      className="flex text-sm font-medium text-gray-500 space-x-1"
      aria-label="Breadcrumb"
    >
      {breadcrumbItems.map((item, index) => {
        if (index === 0 && hasLogo) {
          return (
            <React.Fragment key={index}>
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect
                  width="20"
                  height="20"
                  fill="none"
                  transform="translate(20 20) rotate(180)"
                  stroke="currentColor"
                />
              </svg>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <svg
                className="mx-1 h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="text-gray-900">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
