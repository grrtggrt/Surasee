import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

import { AiOutlineLineChart } from "react-icons/ai";
import { TbFileImport } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { BsQuestionCircle } from "react-icons/bs";

import logo from "../../assets/logo.png";
import Profile from "../../assets/profile.png";

const Sidebar = () => {
  const location = useLocation();

  const user = {
    name: "สุรสีห์ ไวยวุฒิโท",
    email: "surasee.w@ku.th",
  };

  return (
    <>
      <div className="sideBar grid">
        <div className="logoDiv flex">
          <img src={logo} alt="Image Name" />
          <h2>FinalProject.</h2>
        </div>

        <div className="profileContainer">
          <img src={Profile} alt="profile" className="profile" />
          <div className="profileContents">
            <p className="name">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="menuDiv">
          <h3 className="divTitle">MENU</h3>
          <ul className="menuLists grid">
            <li
              className={`listItem ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              <Link to="/dashboard" className="menuLink flex">
                <AiOutlineLineChart className="icon" />
                <span className="smallText">Dashboard</span>
              </Link>
            </li>
            <li
              className={`listItem ${
                location.pathname === "/schedule" ? "active" : ""
              }`}
            >
              <Link to="/schedule" className="menuLink flex">
                <AiOutlineSchedule className="icon" />
                <span className="smallText">Schedule</span>
              </Link>
            </li>
            <li
              className={`listItem ${
                location.pathname === "/manageroom" ? "active" : ""
              }`}
            >
              <Link to="/manageroom" className="menuLink flex">
                <IoCreateOutline className="icon" />
                <span className="smallText">ManageRoom</span>
              </Link>
            </li>
            <li
              className={`listItem ${
                location.pathname === "/importdata" ? "active" : ""
              }`}
            >
              <Link to="/importdata" className="menuLink flex">
                <TbFileImport className="icon" />
                <span className="smallText">ImportData</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="settingsDiv">
          <h3 className="divTitle">SETTINGS</h3>
          <ul className="menuLists grid">
            <li className="listItem">
              <Link to="" className="menuLink flex">
                <FiSettings className="icon" />
                <span className="smallText">User Setting</span>
              </Link>
            </li>
            <li className="listItem">
              <Link to="/" className="menuLink flex">
                <TbLogout2 className="icon" />
                <span className="smallText">LogOut</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sideBarCard">
          <BsQuestionCircle className="icon" />
          <div className="cardContent">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <h3>Help Center</h3>
            <p>
              Having trouble in Project, please contact us from for more
              questions.
            </p>
            <button className="btn">Go to help center</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
