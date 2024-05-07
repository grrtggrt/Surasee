import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./contentTop.scss";
import { SidebarContext } from "../context/sidebarContext";
import { FaBars, FaPowerOff, FaGear } from "react-icons/fa6";

import Profile from '../assets/profile.png'
import PopupUserSetting from "../pages/popup/PopupUserSetting";

const content = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleHide = () => setShow(false);

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
        <FaGear className="setting-btn" onClick={handleShow} />
        <Link to="/">
          <FaPowerOff className="logout-btn" />
        </Link>
        <PopupUserSetting show={show} hide={handleHide}/>
      </div>
    </div>
  );
};

export default content;
