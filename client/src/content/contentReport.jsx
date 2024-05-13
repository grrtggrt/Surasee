import React from 'react'
import ContentTop from "./contentTop.jsx";
import Report from '../pages/Report.jsx';
import "./content.scss";

const contentReport = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <Report/>
    </div>
  )
}

export default contentReport