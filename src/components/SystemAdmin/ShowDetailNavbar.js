import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./ShowDetailNavbar.css";
import logo from "../../images/logo.png";
import Logout from "./Logout";
import { useTranslation } from "react-i18next";
var id;
const ShowDetailNavbar = () => {
  const { t } = useTranslation();

  id = JSON.parse(localStorage.getItem("ResObject"));
  return (
    <>
      <nav
        className="navbar showDetail navbar-expand-lg navbar-light "
        style={{
          position: "sticky",
          height: "60px",
        }}
      >
        <NavLink to="/" className="logo1">
          <img
            src={logo}
            style={{
              height: "80px",
              width: "80px",
              marginLeft: "-10px",
            }}
            alt="main-logo"
            className="logo-img"
          />
        </NavLink>
        <p
          className="nav-brand"
          disable={true}
          style={{ color: "#fff", marginTop: "10px" }}
        >
          {t("TASK")}

          <span className="resInfo" style={{ fontSize: "15px" }}>
            {" "}
            [{id.name + " " + "  " + id.city}]{" "}
          </span>
        </p>

        <button
          className="navbar-toggler nav-toggle"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon toggle-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav ml-auto"
            style={{
              fontSize: "14px",
              paddingRight: "50px",
            }}
          >
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link sys"
                  to="/Restaurant"
                  style={{ color: "#fff", fontSize: "14px" }}
                  activeClassName="active"
                >
                  {t("Restaurant")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link sys"
                  to="/Tables"
                  style={{ color: "#fff", fontSize: "14px" }}
                  activeClassName="active"
                >
                  {t("Tables")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link sys"
                  to="/Gallery"
                  style={{ color: "#fff", fontSize: "14px" }}
                  activeClassName="active"
                >
                  {t("Gallery")}
                </NavLink>
              </li>
            </>

            <li className="nav-item dropdown">
              <a
                style={{ color: "#fff" }}
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></a>
              <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                <Logout />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ShowDetailNavbar;
