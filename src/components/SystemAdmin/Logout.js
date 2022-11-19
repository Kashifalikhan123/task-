import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../Constant_Api/Api";
const Logout = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const logout = async () => {
    debugger;
    var token = localStorage.getItem("dataToken");
    var UserID = localStorage.getItem("UserID");
    try {
      const res = await fetch(API.LOGOUT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          userID: UserID,
        }),
      });
      localStorage.clear();
      history.push("/");
      const ab = await res.json();

      debugger;
      if (res.status == 200) {
        toast.success("Logout Successfull", { autoClose: 5000 });
        localStorage.clear();
        history.push("/");
        debugger;
      } else {
        toast.error("Logout failed", { autoClose: 5000 });
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {}
  };

  return (
    <div>
      <button
        className="dropdown-item"
        type="button"
        onClick={() => {
          logout();
          localStorage.clear();
          history.push("/");
        }}
      >
        {t("Logout")}
      </button>
    </div>
  );
};

export default Logout;
