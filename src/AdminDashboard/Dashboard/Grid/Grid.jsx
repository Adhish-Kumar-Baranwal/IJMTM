import React from "react";
import "./Grid.css";
import StatCards from "./StatCard/StatCard";

const Grid = () => {
  return <div className="px-4 grid gap-3 grid-cols-12">
    <StatCards />
  </div>;
};

export default Grid;
