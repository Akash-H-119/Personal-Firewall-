import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h1>Dashboard</h1>
      <div>{children}</div>
    </div>
  );
};
