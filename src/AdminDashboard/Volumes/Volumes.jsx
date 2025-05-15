import React from "react";
import "./Volumes.css"
import VolumeManagement from "./VolumeManagement/VolumeManagement";
import TopBar from "../Dashboard/TopBar/TopBar";

const Volumes = () => {
  return (
    <div className="volume-page shadow">
      <TopBar />
      <VolumeManagement />
    </div>
  );
};

export default Volumes;
