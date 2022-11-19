import React, { useState } from "react";
import "./Header.css";

import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <>
      <div
        className="row"
        id="header"
        style={{
          // background: "#A31E34",
          // background : "#111",
          height: "60px",
          width: "100.5%",
        }}
      >
        <div className="col-3 logo-section">
          <span className="logo-image">
            <NavLink to="/">
              <img
                src={logo}
                style={{
                  height: "80px",
                  width: "80px",
                  marginTop: "-8px",
                }}
                alt="main-logo"
                className="logo"
              />
            </NavLink>
          </span>
        </div>
        <div className="col-4">
          <div id="info">
            <ul style={{ float: "left" }}>
              <li>
                <span>
                  <i className="fa fa-map-marker"></i>
                </span>
                xxxxxxxxxxxxxxxxxx
              </li>
              <li>
                <span>
                  <i className="fa fa-phone"></i>
                </span>
                +xx xxx xxxx
              </li>
            </ul>
          </div>
        </div>
        <div className="col-5">
          <ul className="social" style={{ float: "left" }}>
            <li>
              <NavLink to="#">
                <span>
                  <i className="fa fa-facebook"></i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <span>
                  <i className="fa fa-twitter"></i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <span>
                  <i className="fa fa-google-plus"></i>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="#">
                <span>
                  <i className="fa fa-pinterest-p"></i>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
