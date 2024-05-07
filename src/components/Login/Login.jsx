import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock, FaArrowRightLong } from "react-icons/fa6";

import video from "../../assets/video.mp4";
import logo from "../../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      navigateTo("/dashboard");
    } else {
      setLoginStatus("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง");
    }
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("showMessage");
      setTimeout(() => {
        setStatusHolder("message");
        setLoginStatus("");
      }, 4000);
    }
  }, [loginStatus]);

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">ระบบจัดตารางสอบ</h2>
            <p>มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</p>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" className="loginImg" />
            <h5>เข้าใช้งานระบบจัดตารางสอบ</h5>
          </div>
          <form action="" className="form grid">
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">บัญชีผู้ใช้</label>
              <div className="input">
                <FaUser className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="ชื่อบัญชีผู้ใช้งาน"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">รหัสผ่าน</label>
              <div className="input">
                <FaLock className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="รหัสผ่านบัญชีผู้ใช้งาน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <br/>
            <button type="submit" className="btn" onClick={handleLogin}>
              <span>เข้าสู่ระบบ</span>
              <FaArrowRightLong className="icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
