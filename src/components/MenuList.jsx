import { Menu } from "antd";
import React from "react";
import {
  TableOutlined,
  BarChartOutlined,
  AppstoreAddOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuList({ darkTheme }) {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      defaultSelectedKeys={["1"]}
    >
      <Menu.Item key="1" icon={<BarChartOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<TableOutlined />}>
        <Link to="/schedule">Schedule</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
        <Link to="/manageroom">Manage Room</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<CloudUploadOutlined />}>
        <Link to="/importdata">Import Data</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuList;
