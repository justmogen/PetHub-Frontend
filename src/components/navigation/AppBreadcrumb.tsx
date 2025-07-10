"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AppBreadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  const routeLabels: Record<string, string> = {
    pets: "Browse Pets",
    articles: "Articles",
    pet: "Pet Details",
    article: "Article",
  };

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbItems = [{ label: "Home", path: "/" }];

  let currentPath = "";
  pathnames.forEach((pathname) => {
    currentPath += `/${pathname}`;

    if (pathname.match(/^[0-9a-fA-F-]+$/)) {
      return;
    }

    const label =
      routeLabels[pathname] ||
      pathname.charAt(0).toUpperCase() + pathname.slice(1);
    breadcrumbItems.push({
      label,
      path: currentPath,
    });
  });

  return (
    <nav className="bg-gray-50 border-b px-4 py-3">
      <div className="container mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.path}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbItems.length - 1 ? (
                    <BreadcrumbPage className="flex items-center">
                      {index === 0 && <Home className="w-4 h-4 mr-2" />}
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.path}
                        className="flex items-center text-[#E07A5F] hover:text-[#d4654a]"
                      >
                        {index === 0 && <Home className="w-4 h-4 mr-2" />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};

export default AppBreadcrumb;
