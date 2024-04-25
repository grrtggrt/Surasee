import React from "react";
import ContentTop from "./contentTop.jsx";
import ManageRoom from "../pages/ManageRoom.jsx";
import "./content.scss";

const contentManageRoom = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <ManageRoom/>
    </div>
  )
}

export default contentManageRoom