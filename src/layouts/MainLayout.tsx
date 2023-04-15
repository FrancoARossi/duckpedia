import React, { type ReactElement } from "react";

const MainLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return (
    <div className="flex h-full w-full max-w-[1440px] flex-1 flex-col items-center justify-center px-20 text-center">
      {children}
    </div>
  );
};

export default MainLayout;
