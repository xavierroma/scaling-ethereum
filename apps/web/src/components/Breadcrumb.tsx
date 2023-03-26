import { Strikethrough02 } from "@untitled-ui/icons-react";
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
    <nav className="flex gap-2 text-sm font-bold space-x-1 items-center" aria-label="Breadcrumb">
      {breadcrumbItems.map((item, index) => {
        if (index === 0 && hasLogo) {
          return (
            <React.Fragment key={index}>
              <Strikethrough02 />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {index > 0 && <div className="mx-4 h-5 w-px bg-black opacity-20" />}
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
