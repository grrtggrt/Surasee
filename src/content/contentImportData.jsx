import React from "react";
import ContentTop from "./contentTop.jsx";
import ImportData from "../pages/ImportData.jsx";
import "./content.scss";

const contentImportData = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <ImportData/>
    </div>
  )
}

export default contentImportData
