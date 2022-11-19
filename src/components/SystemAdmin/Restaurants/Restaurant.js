import React, { useEffect, useState } from "react";
import "./Restaurant.css";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import ShowDetailNavbar from "../ShowDetailNavbar";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import API from "../../Constant_Api/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

toast.configure();
var restuaurantObj;
const Restaurant = () => {
  const { t } = useTranslation();
  const [item, setItem] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [paymentInfor, setPaymentInfor] = useState([]);
  const [bankType, setBankType] = useState("Bank");
  const [resObj, setresObj] = useState("");

  const GetPaymentInfo = async () => {
    var token = localStorage.getItem("dataToken");
    var id = JSON.parse(localStorage.getItem("ResObject"));

    const res = await fetch(`${API.GET_PAYMENT_INFO}?RestaurantId=${id.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    if (data != undefined && data != null) {
      setPaymentInfor(data);
    } else {
      toast.error("Payment Info failed", { autoClose: 5000 });
    }
  };
  // *********************************************************************************************
  const GetCurrencyList = async () => {
    var token = localStorage.getItem("dataToken");
    const GetCurrency = await fetch(API.GET_CURRENCY_LIST, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const currency = await GetCurrency.json();
    if (currency != undefined && currency != null) {
      setCurrencyList(currency);
    } else {
      toast.error("NO Currency", { autoClose: 5000 });
    }
    localStorage.setItem("currency", JSON.stringify(currency));
  };
  // ***************************************************************************************************
  const GetCountriesList = async () => {
    var token = localStorage.getItem("dataToken");
    const GetCountries = await fetch(API.GET_COUNTRY_LIST, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const countries = await GetCountries.json();
    if (countries != undefined && countries != null) {
      setCountryList(countries);
    }

    localStorage.setItem("countries", JSON.stringify(countries));
  };
  useEffect(() => {
    GetCurrencyList();
    GetCountriesList();
    GetPaymentInfo();
    restuaurantObj = JSON.parse(localStorage.getItem("ResObject"));
    setresObj(restuaurantObj);
    debugger;
  }, []);

  // ***************************************************************************************************************
  return (
    <>
      <ShowDetailNavbar />
      <div
        className="container mt-5"
        style={{
          marginTop: "50px",
          background: "black",
          color: "#fff",
        }}
      >
        {resObj != undefined && resObj != null ? (
          <>
            {" "}
            <div className="row ab">
              <div className="form-group row mt-3 ">
                <label
                  className="col-sm-2 col-form-label RestaurantLabel "
                  style={{ fontSize: " 15px" }}
                >
                  {t("Restaurant Name")}
                </label>

                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={resObj.name}
                    name="resname"
                    style={{
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  className="col-sm-2 col-form-label RestaurantLabel"
                  style={{ fontSize: " 15px" }}
                >
                  {t("Contact Person")}
                </label>

                <div
                  className="col-sm-2 salutaion ml-3"
                  style={{
                    border: "1px solid silver",
                    height: "35px",
                    width: "15%",
                  }}
                >
                  <div className="form-check form-check-inline mt-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={resObj.contactTitle == "Mr" ? true : false}
                      style={{ marginTop: "5px" }}
                    />
                    <label
                      className="form-check-label"
                      style={{ fontSize: "12px" }}
                    >
                      {t("Mr")}
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      checked={resObj.contactTitle == "Ms" ? true : false}
                      style={{ marginTop: "5px" }}
                    />
                    <label
                      className="form-check-label"
                      style={{ fontSize: "12px" }}
                    >
                      {t("Ms")}
                    </label>
                  </div>
                </div>

                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control contactField"
                    defaultValue={resObj.contactPerson}
                    name="contactPerson"
                    style={{
                      width: "53rem",
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-6 mt-2 ">
                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("Email")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="form-control ResInput"
                      defaultValue={resObj.email}
                      name="email"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("Street")}
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      className="form-control ResStreet"
                      defaultValue={resObj.street}
                      name="street"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control ResNumber"
                      defaultValue={resObj.number}
                      name="number"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("PostCode")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control ResInput"
                      defaultValue={resObj.postCode}
                      name="postCode"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("City")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control ResInput"
                      defaultValue={resObj.city}
                      name="city"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("Country")}
                  </label>

                  <div className="col-sm-6">
                    <select
                      className="custom-select ResCountry"
                      value={resObj.country}
                      name="country"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    >
                      {countryList.map((country, index) => (
                        <option value={country.code} key={index}>
                          {country.code + " - " + country.name}
                        </option>
                      ))}{" "}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    className="col-sm-4 col-form-label"
                    style={{ fontSize: " 15px" }}
                  >
                    {t("Phone")}
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="number"
                      className="form-control ResInput"
                      defaultValue={resObj.phone}
                      name="phone"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-6 mt-2">
                <form>
                  <div className="form-group row ">
                    <label
                      className="col-sm-4 col-form-label RestaurantLabel"
                      style={{
                        fontSize: " 15px",
                        marginLeft: "-30px",
                      }}
                    >
                      {t("Business Currency")}
                    </label>
                    <div className="col-sm-8">
                      <select
                        style={{
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                        className="custom-select"
                        value={resObj.businessCurrency}
                        name="currency"
                      >
                        {currencyList.map((currency, index) => (
                          <option value={currency.code} key={index}>
                            {currency.symbol != null &&
                            currency.symbol != undefined &&
                            currency.symbol != ""
                              ? currency.symbol + " - " + currency.currencyName
                              : currency.code +
                                " - " +
                                currency.currencyName}{" "}
                          </option>
                        ))}{" "}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-4  col-form-label"
                      style={{
                        fontSize: " 15px",
                        marginLeft: "-30px",
                      }}
                    >
                      {t("Is Active")}
                    </label>

                    <div className="col-sm-8 ml-3">
                      <label className="switch">
                        <input
                          type="checkbox"
                          disabled={true}
                          name="isActive"
                          checked={resObj.isActive}
                        />
                        <span className="slider round "></span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group row mr-1">
                    <label
                      className="col-sm-4 col-form-label vatNum"
                      style={{
                        fontSize: " 15px",
                        marginLeft: "-30px",
                      }}
                    >
                      {t("VAT")} #
                    </label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control vatId"
                        defaultValue={resObj.vatid}
                        style={{
                          width: "106%",
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <label
                      className="col-sm-3  col-form-label extendDate vatValu"
                      style={{
                        fontSize: " 14px",
                        marginLeft: "-10px",
                      }}
                    >
                      <span style={{ marginLeft: "45px" }}> {t("VAT")} %</span>
                    </label>
                    <div className="col-sm-3" style={{ marginLeft: "-30px" }}>
                      <input
                        type="number"
                        className="form-control vatValue"
                        defaultValue={resObj.vatvAlue}
                        name="vatValue"
                        style={{
                          width: "100%",
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mr-1">
                    <label
                      className="col-sm-4 col-form-label"
                      style={{
                        fontSize: " 15px",
                        marginLeft: "-30px",
                      }}
                    >
                      {t("Valid Until")}
                    </label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control validUntil"
                        disabled={true}
                        value={moment(resObj.validUntil).format("DD MMM YYYY")}
                        name="vatValue"
                        style={{
                          width: "106%",
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <label
                      className="col-sm-3  col-form-label extendDate Extenddate"
                      style={{
                        fontSize: " 14px",
                        marginLeft: "-10px",
                      }}
                    >
                      <span style={{ marginLeft: "45px" }}>
                        {t("Extend Date")}
                      </span>
                    </label>
                    <div
                      className="col-sm-3 ExtendInput"
                      style={{ marginLeft: "-30px" }}
                    >
                      <select
                        className="custom-select dateOption"
                        disabled={true}
                        name="extenddate"
                        style={{
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                      >
                        <option value="7">1 - Week</option>
                        <option value="14">2 - Week</option>
                        <option value="21">3 - Week</option>
                        <option value="30">1 - Month</option>
                        <option value="60">2 - Month</option>
                        <option value="90">3 - Month</option>
                        <option value="120">4 - Month</option>
                        <option value="150">5 - Month</option>
                        <option value="180">6 - Month</option>
                        <option value="210">7 - Month</option>
                        <option value="240">8 - Month</option>
                        <option value="270">9 - Month</option>
                        <option value="300">10 - Month</option>
                        <option value="330">11 - Month</option>
                        <option value="360">1 - Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      className="col-sm-4 col-form-label"
                      style={{
                        fontSize: " 15px",
                        marginLeft: "-30px",
                      }}
                    >
                      {t("Radius")}
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        className="form-control radiusInput"
                        defaultValue={resObj.radius}
                        name="vatValue"
                        style={{
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>{" "}
                </form>
              </div>

              <div className="form-group row">
                <label
                  className="col-sm-2 col-form-label RestaurantLabel"
                  style={{ fontSize: " 15px" }}
                >
                  {t("Restaurant Info")}
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control"
                    defaultValue={resObj.additionalInfo}
                    name="additionalInfo"
                    style={{
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>

              <>
                <div className="col-2 paymentInfo">
                  <label>{t("Payment Info")} </label>

                  <FaPlusCircle
                    style={{
                      height: "40px",
                      width: "50%",
                      cursor: "pointer",
                    }}
                    data-toggle="modal"
                    data-target=".UpdatePayment"
                  />

                  {/* ***************************************************************************************** */}
                </div>
                <div className="col-8">
                  <table className="payTable" style={{ width: "100%" }}>
                    <tr>
                      <th
                        className="thead"
                        style={{ border: " 1px solid #fff" }}
                      >
                        {t("Type")}
                      </th>
                      <th className="thead">{t("Payment ID")}</th>
                      <th className="thead">{t("Account Name")}</th>
                      <th className="thead">{t("IBAN")}</th>
                      <th className="thead">{t("BIC")}</th>
                      <th className="thead">{t("Default")}</th>
                      <th className="thead">{t("Update")}</th>
                    </tr>
                    {paymentInfor.map((info, index) => (
                      <tr className="trow" key={index}>
                        <td className="tcell" style={{ width: "10%" }}>
                          {info.type}
                        </td>
                        <td className="tdata" style={{ width: "17%" }}>
                          {info.paymentId}
                        </td>
                        <td className="tdata" style={{ width: "27%" }}>
                          {info.accountName}
                        </td>
                        <td className="tdata " style={{ width: "27%" }}>
                          {info.iban}
                        </td>
                        <td className="tdata" style={{ width: "8%" }}>
                          {info.bic}
                        </td>
                        <td className="tdata" style={{ width: "8%" }}>
                          {/* {info.isDefault.toString()} */}
                          <input type="checkbox" checked={info.isDefault} />
                        </td>
                        <td className="tdata" style={{ width: "8%" }}>
                          <button
                            type="button"
                            className="btn "
                            style={{
                              cursor: "pointer",
                              background:
                                "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                              color: "#fff",
                            }}
                          >
                            <FaEdit />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="col-2 UpdateRes"></div>
              </>
            </div>
          </>
        ) : (
          <></>
        )}
        <hr />
      </div>
    </>
  );
};

export default Restaurant;
