import React from "react";
import ContentTop from "./contentTop.jsx";
import Schedule from "../pages/Schedule.jsx";
import "./content.scss";

const contentSchedule = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <Schedule/>
    </div>
  )
}

export default contentSchedule