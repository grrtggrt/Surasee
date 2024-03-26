import React, { useState } from "react";
import Icon from "../assets/Icon.svg";
import Profile from "../assets/profile.png";
import Dashboard from "../assets/chart-histogram.svg";
import Schedule from "../assets/calendar-lines.svg";
import ManageRoom from "../assets/apps-add.svg";
import ImportData from "../assets/file-import.svg";
import { useLocation, Link } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false ? "logoContainer" : "logoContainer active"
        }
      >
        <img src={Icon} alt="icon" className="logo" />
        <h2 className="title">FinalProject</h2>
      </div>
      <div
        className={
          closeMenu === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>
      <div
        className={
          closeMenu === false ? "profileContainer" : "profileContainer active"
        }
      >
        <img src={Profile} alt="profile" className="profile" />
        <div className="profileContents">
          <p className="name">Hello, John</p>
          <p>johnsmith@gmail.com</p>
        </div>
      </div>
      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <img src={Dashboard} alt="dashboard" />
              {closeMenu === false ? "Dashboard" : ""}
            </Link>
          </li>
          <li className={location.pathname === "/schedule" ? "active" : ""}>
            <Link to="/schedule">
              <img src={Schedule} alt="schedule" />
              {closeMenu === false ? "Schedule" : ""}
            </Link>
          </li>
          <li className={location.pathname === "/manageroom" ? "active" : ""}>
            <Link to="/manageroom">
              <img src={ManageRoom} alt="manageroom" />
              {closeMenu === false ? "Manageroom" : ""}
            </Link>
          </li>
          <li className={location.pathname === "/importdata" ? "active" : ""}>
            <Link to="/importdata">
              <img src={ImportData} alt="importdata" />
              {closeMenu === false ? "Importdata" : ""}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
