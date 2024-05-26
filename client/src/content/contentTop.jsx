import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./contentTop.scss";
import { SidebarContext } from "../context/sidebarContext";
import { NavDropdown } from "react-bootstrap";
import { FaBars, FaPowerOff, FaGear, FaUserPen, FaLock } from "react-icons/fa6";
import { logout, getToken } from "../../services/authorize";
import axios from "axios";

import Profile from "../assets/profile.png";
import PopupUserSetting from "../pages/popup/PopupUserSetting";
import PopupResetPassword from "../pages/popup/PopupResetPassword";

import "../styles/Nav.scss";

const content = () => {
  const navigateTo = useNavigate();

  const { toggleSidebar } = useContext(SidebarContext);
  const [showPopupUserSetting, setShowPopupUserSetting] = useState(false);
  const [showPopupResetPassword, setShowPopupResetPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);

  //Popup
  const handleShowPopupUserSetting = () => setShowPopupUserSetting(true);
  const handleHidePopupUserSetting = () => setShowPopupUserSetting(false);
  const handleShowPopupResetPassword = () => setShowPopupResetPassword(true);
  const handleHidePopupResetPassword = () => setShowPopupResetPassword(false);

  const fetchUserInfo = useCallback(async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5500/api/user",
        config
      );
      setUserInfo({
        ...response.data,
        profileImage: response.data.profileImage
          ? `data:image/jpeg;base64,${response.data.profileImage}`
          : Profile,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
    };
    fetchData();
  }, [fetchUserInfo, showPopupUserSetting, showPopupResetPassword]);

  const handleSaveProfileImage = (image) => {
    setUserInfo((prevState) => ({
      ...prevState,
      profileImage: `data:image/jpeg;base64,${image}`,
    }));
  };

  const handleLogout = () => {
    logout(() => {
      navigateTo("/");
    });
  };

  return (
    <>
      {loading && <div className="loader" />}
      <div className="main-content-top">
        <div className="content-top-left">
          <span className="sidebar-toggler" onClick={() => toggleSidebar()}>
            <FaBars />
          </span>
        </div>

        <div className="content-top-btns">
          <div className="profile">
            <img src={userInfo.profileImage} alt="Profile" />
            <h2>
              {userInfo.name} {userInfo.surname}
            </h2>
          </div>
          <NavDropdown
            title={<FaGear className="setting-btn" />}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => handleShowPopupUserSetting()}>
              <FaUserPen className="me-2 fs-5" />
              แก้ไขข้อมูลส่วนตัว
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleShowPopupResetPassword()}>
              <FaLock className="me-2 fs-6" />
              เปลี่ยนรหัสผ่าน
            </NavDropdown.Item>
          </NavDropdown>

          <Link to="/" onClick={handleLogout}>
            <FaPowerOff className="logout-btn" />
          </Link>
          <PopupUserSetting
            show={showPopupUserSetting}
            hide={handleHidePopupUserSetting}
            onSaveProfileImage={handleSaveProfileImage}
            userData={userInfo}
          />
          <PopupResetPassword
            show={showPopupResetPassword}
            hide={handleHidePopupResetPassword}
          />
        </div>
      </div>
    </>
  );
};

export default content;
