import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Sidebar from "./components/SideBar Section/sidebar.jsx";
import ContentDashboard from "./content/contentDashboard.jsx";
import ContentSchedule from "./content/contentSchedule.jsx";
import ContentManageRoom from "./content/contentManageRoom.jsx";
import ContentImportData from "./content/contentImportData.jsx";
import ContentReport from "./content/contentReport.jsx";
import PrivateRoute from "./PrivateRoute.js"; // import PrivateRoute
import "./styles/App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="main-container">
                <Sidebar />
                <ContentDashboard />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <div className="main-container">
                <Sidebar />
                <ContentSchedule />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/manageRoom"
          element={
            <PrivateRoute>
              <div className="main-container">
                <Sidebar />
                <ContentManageRoom />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/importData"
          element={
            <PrivateRoute>
              <div className="main-container">
                <Sidebar />
                <ContentImportData />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <div className="main-container">
                <Sidebar />
                <ContentReport />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
