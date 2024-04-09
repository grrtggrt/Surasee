import React from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";

import video from "../../assets/video.mp4";
import logo from "../../assets/logo.png";

const Register = () => {
  return (
    <div>
      <div className="registerPage flex">
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className="title">Create And Sell Exrtaordinary Products</h2>
              <p>Adopt the peacr of nature!</p>
            </div>

            <div className="footerDiv flex">
              <span className="text">Have an account?</span>
              <Link to={"/"}>
                <button className="btn">Login</button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={logo} alt="Logo Image" />
              <h3>Let Us Know You!</h3>
            </div>
            <form action="" className="form grid">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <MdMarkEmailRead className="icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    autoFocus
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter Username"
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
              <Link to="/">
                <button
                  type="submit"
                  className="btn flex"
                >
                  <span>Register</span>
                  <AiOutlineSwapRight className="icon" />
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
