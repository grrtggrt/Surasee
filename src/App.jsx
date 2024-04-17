import React from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Schedule from "./pages/Schedule.jsx";
import ManageRoom from "./pages/ManageRoom.jsx";
import ImportData from "./pages/ImportData.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Sidebar from "./components/SideBar Section/sidebar.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./styles/App.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div className="container">
        <Sidebar />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/schedule",
    element: (
      <div className="container">
        <Sidebar />
        <Schedule />
      </div>
    ),
  },
  {
    path: "/manageRoom",
    element: (
      <div className="container">
        <Sidebar />
        <ManageRoom />
      </div>
    ),
  },
  {
    path: "/importData",
    element: (
      <div className="container">
        <Sidebar />
        <ImportData />
      </div>
    ),
  },
]);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <RouterProvider router={router} />
      </div>
    </DndProvider>
  );
}

export default App;
