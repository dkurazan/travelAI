"use client";

import { FaBarsStaggered } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Loading from "../app/(dashboard)/loading";

const DasboardContent = ({ children }) => {
  const pathname = usePathname();
  const isProfilePage = pathname === "/profile";
  const isChatPage = pathname === "/chat";

  return (
    <div className="drawer-content h-full overflow-auto">
      <label
        htmlFor="my-drawer-2"
        className="drawer-button bg-base-200 w-full flex justify-end lg:hidden fixed p-6 top-0 right-0 z-10"
      >
        <FaBarsStaggered className="w-8 h-8 text-primary" />
      </label>
      <div
        className={`bg-base-200 px-8 pt-20 pb-12 ${
          isProfilePage && "!px-0"
        } ${isChatPage && "h-full !p-0 !pb-3"} min-h-full`}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default DasboardContent;
