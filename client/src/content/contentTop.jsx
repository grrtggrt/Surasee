import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./contentTop.scss";
import { SidebarContext } from "../context/sidebarContext";
import { NavDropdown } from "react-bootstrap";
import { FaBars, FaPowerOff, FaGear, FaUserPen, FaLock } from "react-icons/fa6";

import Profile from "../assets/profile.png";
import PopupUserSetting from "../pages/popup/PopupUserSetting";
import PopupResetPassword from "../pages/popup/PopupResetPassword";

import "../styles/Nav.scss";

const content = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [showPopupUserSetting, setShowPopupUserSetting] = useState(false);
  const [showPopupResetPassword, setShowPopupResetPassword] = useState(false);

  const handleShowPopupUserSetting = () => setShowPopupUserSetting(true);
  const handleHidePopupUserSetting = () => setShowPopupUserSetting(false);
  const handleShowPopupResetPassword = () => setShowPopupResetPassword(true);
  const handleHidePopupResetPassword = () => setShowPopupResetPassword(false);

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
        <NavDropdown title={<FaGear className="setting-btn" />} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => handleShowPopupUserSetting()}>
              <FaUserPen className="me-2 fs-5"/>
              แก้ไขข้อมูลส่วนตัว
            </NavDropdown.Item>
          <NavDropdown.Item onClick={() => handleShowPopupResetPassword()} >
              <FaLock className="me-2 fs-6" />
              เปลี่ยนรหัสผ่าน
            </NavDropdown.Item>
        </NavDropdown>

        <Link to="/">
          <FaPowerOff className="logout-btn" />
        </Link>
        <PopupUserSetting show={showPopupUserSetting} hide={handleHidePopupUserSetting} />
        <PopupResetPassword show={showPopupResetPassword} hide={handleHidePopupResetPassword} />
      </div>
    </div>
  );
};

export default content;
