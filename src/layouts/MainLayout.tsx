import React, { type ReactElement } from "react";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-100">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
