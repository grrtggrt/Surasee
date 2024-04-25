import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./contentTop.scss";
import { SidebarContext } from "../context/sidebarContext";
import { IoIosMenu } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { CiPower } from "react-icons/ci";

import Profile from '../assets/profile.png'

const content = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <span className="sidebar-toggler" onClick={() => toggleSidebar()}>
          <IoIosMenu />
        </span>
      </div>

      <div className="content-top-btns">
        <div className="profile">
          <img src={Profile} alt="Profile" />
          <h2>นายสุรสีห์ ไวยวุฒิโท</h2>
        </div>
        <CiSettings className="setting-btn" />
        <Link to="/">
          <CiPower className="logout-btn" />
        </Link>
      </div>
    </div>
  );
};

export default content;
