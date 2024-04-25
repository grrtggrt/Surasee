import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";

import { AiOutlineLineChart } from "react-icons/ai";
import { TbFileImport } from "react-icons/tb";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";

import logo from "../../assets/logo.png";
import { SidebarContext } from "../../context/sidebarContext";

const Sidebar = () => {
  
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sideBar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  const location = useLocation();

  return (
    <>
      <div className={`sideBar ${sidebarClass}`}>
        <div className="logoDiv">
          <img src={logo} alt="Image Name" />
        </div>

        <div style={{ width: "100%", height: 1, background: "#3B3F43" }}></div>

        <div className="menuDiv">
          <ul className="menuLists">
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
      </div>
    </>
  );
};

export default Sidebar;


