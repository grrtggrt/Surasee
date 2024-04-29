import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./contentTop.scss";
import { SidebarContext } from "../context/sidebarContext";
import { FaBars, FaPowerOff, FaGear } from "react-icons/fa6";

import Profile from '../assets/profile.png'

const content = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <span className="sidebar-toggler" onClick={() => toggleSidebar()}>
        <FaBars />
        </span>
      </div>

      <div className="content-top-btns">
        <div className="profile">
          <img src={Profile} alt="Profile" />
          <h2>นายสุรสีห์ ไวยวุฒิโท</h2>
        </div>
        <FaGear className="setting-btn" />
        <Link to="/">
          <FaPowerOff className="logout-btn" />
        </Link>
      </div>
    </div>
  );
};

export default content;
