import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

import video from "../../assets/video.mp4";
import logo from "../../assets/logo.png";

const Login = () => {
  return (
    <div>
      <div className="loginPage flex">
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className="title">Create And Sell Exrtaordinary Products</h2>
              <p>Adopt the peacr of nature!</p>
            </div>

            <div className="footerDiv flex">
              <span className="text">Don't have an account?</span>
              <Link to={"/register"}>
                <button className="btn">Sign Up</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={logo} alt="Logo Image" className="loginImg"/>
              <h3>Welcome Back!</h3>
            </div>
            <form action="" className="form grid">
              <span className="showMessage">Login Status will go here</span>
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    autoFocus
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <Link to="/dashboard">
                <button type="submit" className="btn flex">
                  <span>Login</span>
                  <AiOutlineSwapRight className="icon" />
                </button>
              </Link>
              <span className="forgotPassword">
                Forgot your password? <a href="">Click Here</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
