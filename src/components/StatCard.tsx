import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
};

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", margin: "10px" }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
