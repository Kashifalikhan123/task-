import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useHistory } from "react-router-dom";

import Login from "../LoginModel/Login";
import SignUp from "../SignUp/SignUp";
import en from "../../images/fren.jpg";
import ReactFlagsSelect from "react-flags-select";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import tEn from "./locales/en/transaltion.json";
import tDe from "./locales/de/transaltion.json";
import tIt from "./locales/it/transaltion.json";
import tes from "./locales/es/transaltion.json";
import tfr from "./locales/fr/transaltion.json";
import tsv from "./locales/sv/transaltion.json";
import tda from "./locales/da/transaltion.json";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: tEn,
      },
      de: {
        translation: tDe,
      },
      it: {
        translation: tIt,
      },
      es: {
        translation: tes,
      },
      fr: {
        translation: tfr,
      },
      sv: {
        translation: tsv,
      },
      da: {
        translation: tda,
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const Navbar = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [selected, setSelected] = useState("US");
  const history = useHistory();

  const { t } = useTranslation();

  const [lang, setLang] = useState(false);
  const changeLang = (l) => {
    debugger;
    //alert('OK');
    localStorage.setItem("language", JSON.stringify(l));
    setSelected(l);
    let selectedLanguage;

    if (l == "US") {
      selectedLanguage = "en";
    } else {
      if (l == "SE") {
        selectedLanguage = "sv";
      } else {
        selectedLanguage = l.toLowerCase();
      }
    }
    if (l == "DK" || l == "dk") {
      selectedLanguage = "da";
    }

    i18n.changeLanguage(selectedLanguage);
    debugger;

    //Now set the current language in local storage
    localStorage.setItem("lang", selectedLanguage);
    return () => {
      debugger;

      debugger;
    };
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("language")) == undefined ||
      JSON.parse(localStorage.getItem("language")) == null
    ) {
      setSelected("US");
    } else {
      setSelected(JSON.parse(localStorage.getItem("language")));
    }
    if (
      localStorage.getItem("lang") == undefined ||
      localStorage.getItem("lang") == null
    ) {
      i18n.changeLanguage("en");
    } else {
      let currentLang = localStorage.getItem("lang");
      i18n.changeLanguage(currentLang);
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg " style={{ position: "sticky" }}>
        <NavLink
          to="#"
          className="navbar-brand "
          style={{
            color: "#fff",
            marginTop: "-10px",
            fontSize: "20px",
          }}
        >
          {t("TASK")}
        </NavLink>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler navbar-toggler-right"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <NavLink to="#" className="nav-link text-uppercase ">
              <li
                className="nav-item"
                style={{
                  fontSize: "15px",
                }}
              >
                <ReactFlagsSelect
                  selected={selected}
                  optionsSize={20}
                  onSelect={(code) => changeLang(code)}
                  countries={["US", "DE", "IT", "ES", "DK", "FR", "SE"]}
                  customLabels={{
                    US: "English",
                    DE: "Deutsch",
                    IT: "Italiano",
                    ES: "Español",
                    DK: "Dansk",
                    FR: "Français",
                    SE: "Svenska",
                  }}
                  fullWidth={false}
                />
              </li>
            </NavLink>

            <NavLink to="#" className="nav-link text-uppercase ">
              <li className="nav-item active" style={{ fontSize: "15px" }}>
                {t("HOME")}
              </li>
            </NavLink>
            <NavLink to="#" className="nav-link text-uppercase">
              {" "}
              <li className="nav-item" style={{ fontSize: "15px" }}>
                {t("ABOUT US")}
              </li>
            </NavLink>
            <NavLink to="#" className="nav-link text-uppercase ">
              {" "}
              <li className="nav-item" style={{ fontSize: "15px" }}>
                {t("FEATURES")}
              </li>
            </NavLink>
            <NavLink to="#" className="nav-link text-uppercase ">
              {" "}
              <li className="nav-item" style={{ fontSize: "15px" }}>
                {t("CONTACT")}
              </li>
            </NavLink>

            <div className="dropdown">
              <li
                style={{
                  fontSize: "15px",
                  border: "1px solid #fff",
                  width: "100%",
                  textAlign: "center",
                  height: "28px",
                  color: "#fff",
                  borderRadius: "none ",
                  lineHeight: "15px",
                  marginTop: "5px",
                }}
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span> {t("LOGIN")} </span>
              </li>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#Login"
                  data-whatever="@mdo"
                >
                  {t("LOGIN AS WORKER")}
                </a>
              </div>
            </div>

            <NavLink
              to="#"
              className="nav-link text-uppercase"
              data-toggle="modal"
              data-target=".SignUp"
            >
              <li
                className="login-btn"
                style={{
                  fontSize: "15px",
                  border: "1px solid #fff",
                  width: "100%",
                  marginTop: "-2px",
                  textAlign: "center",
                  height: "28px",
                }}
              >
                <span style={{ marginTop: "10px" }}>{t("SIGN UP")}</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>

      <Login />
      <SignUp />
    </>
  );
};

export default Navbar;
