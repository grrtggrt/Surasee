import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Sidebar from "./components/SideBar Section/sidebar.jsx";
import ContentDashboard from "./content/contentDashboard.jsx";
import ContentSchedule from "./content/contentSchedule.jsx";
import ContentManageRoom from "./content/contentManageRoom.jsx";
import ContentImportData from "./content/contentImportData.jsx";
import ContentReport from "./content/contentReport.jsx";
import "./styles/App.scss";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <div className="main-container">
                <Sidebar />
                <ContentDashboard />
              </div>
            }
          />
          <Route
            path="/schedule"
            element={
              <div className="main-container">
                <Sidebar />
                <ContentSchedule />
              </div>
            }
          />
          <Route
            path="/manageRoom"
            element={
              <div className="main-container">
                <Sidebar />
                <ContentManageRoom />
              </div>
            }
          />
          <Route
            path="/importData"
            element={
              <div className="main-container">
                <Sidebar />
                <ContentImportData />
              </div>
            }
          />
          <Route
            path="/report"
            element={
              <div className="main-container">
                <Sidebar />
                <ContentReport />
              </div>
            }
          />
        </Routes>
      </Router>
  );
}

export default App;