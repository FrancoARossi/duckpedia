import React, { type ReactElement } from "react";

const MainLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return (
    <div
    id="main-layout"
      className="transition-all bg-gradient-to-b from-[#0e7490] to-[#1e40af] flex h-full w-full flex-1 flex-col items-center text-center xs:px-10 xs:pt-24 md:justify-center md:pl-40 md:pr-20"
    >
      {children}
    </div>
  );
};

export default MainLayout;
