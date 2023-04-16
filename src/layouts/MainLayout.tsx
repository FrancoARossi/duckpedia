import React, { type ReactElement } from "react";

const MainLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center pl-40 pr-20 text-center">
      {children}
    </div>
  );
};

export default MainLayout;
