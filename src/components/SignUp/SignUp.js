import React, { useState } from "react";
import "./SignUp.css";
import Country from "./Countries";
import sha512 from "js-sha512";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading-spinner/Loading";
import { useTranslation } from "react-i18next";

toast.configure();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [userType, setUserType] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [error7, setError7] = useState("");
  const [error8, setError8] = useState("");
  const [error9, setError9] = useState("");
  const [error10, setError10] = useState("");
  const [showModel, setShowModel] = useState(true);

  const history = useHistory();
  const { t } = useTranslation();

  const Signup = async () => {
    debugger;

    if (password.length >= 4) {
      if (password == confirmPassword) {
        const hashPassword = sha512(password);
        setLoading(true);
        const Register = await fetch(
          "https://restaurantapi.speedbytes.io/api/v1/SignUpUser",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              email: email,
              salutation: title,
              name: name,
              userType: "Visitor",
              password: hashPassword,
              mobileNumber: mobile,
              address: address,
              postCode: postCode,
              city: city,
              country: country,
            }),
          }
        );

        const ab = await Register.json();
        setLoading(false);
        debugger;
        if (Register.status == 200) {
          toast.success("SignUp Successfull", { autoClose: 3000 });
          setShowModel(false);
          history.push("/");
        } else {
          toast.error("SignUp failed", { autoClose: 3000 });
          setLoading(false);
        }

        debugger;
      } else {
        setError10("Password Not Matched");
      }
    } else {
      setError9("Password must Atleast Four Characters");
    }
  };

  const ExistEmail = async (Email) => {
    debugger;
    try {
      // var token = localStorage.getItem("dataToken");

      const Active = await fetch(
        `https://restaurantapi.speedbytes.io/api/v1/CheckUserExists?Email=${Email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + token,
          },
        }
      );
      const data = await Active.json();
      return data;

      debugger;
      // setCount(data[data.length-1])
    } catch (error) {
      //  setError("Login Failed");
    }
  };
  const validatEmail = async (e) => {
    var email = e.target.value;

    setEmail(email);
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email.toLowerCase())) {
      debugger;
      let res = await ExistEmail(e.target.value);
      if (res == false) {
        setDisable(false);
        debugger;
        setError2("");
      } else {
        setError2("Email Already Exists");
      }
    } else {
      setError2("Invalid Email");
      setDisable(true);
    }
    if (email == "") {
      setError2("");
      setDisable(true);
    }

    // setEmail(email);
    // setError2("");
    // } else {
    //   setError2("Invalid Email");
    // }
    // if (email == "") {
    //   setError2("");
    // }
  };

  return (
    <>
      {showModel && (
        <div
          className="modal fade SignUp"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
          data-backdrop="false"
          style={{ marginTop: "2rem" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  background:
                    "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                  color: "#fff",
                }}
              >
                <p className="modal-title" id="exampleModalLabel">
                  {t(" SIGN UP")}
                </p>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ color: "#fff" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row">
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "100px",
                          marginBottom: "5px",
                        }}
                      >
                        {error2}
                      </span>

                      <label
                        className="col-sm-3 col-form-label"
                        style={{ fontSize: " 13px" }}
                      >
                        {t("Email")}
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={(e) => validatEmail(e)}
                          value={email}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                {/* ****************************** */}
                <div className="form-group row ">
                  <div className="col-sm-6" style={{ marginTop: "-10px" }}>
                    <span
                      className=""
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginLeft: "130px",
                      }}
                    >
                      {error3}
                    </span>
                  </div>
                  <div className="col-sm-6" style={{ marginTop: "-10px" }}>
                    <span
                      className=""
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginLeft: "-130px",
                      }}
                    >
                      {error1}
                    </span>
                  </div>

                  <label
                    className="col-sm-2 col-form-label "
                    style={{ fontSize: "13px" }}
                  >
                    {t("ContactPerson")}
                  </label>

                  <div
                    className="col-sm-2 contactPersonRadio"
                    style={{
                      border: "1px solid silver",
                      height: "35px",
                      width: "8rem",
                      marginLeft: "-20px",
                    }}
                  >
                    <div
                      className="form-check form-check-inline mt-1 "
                      style={{}}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="option1"
                        onChange={(e) => {
                          setTitle("Mr");
                        }}
                        style={{ marginTop: "4px" }}
                      />
                      <label
                        className="form-check-label"
                        style={{ fontSize: "12px" }}
                      >
                        {t("Mr")}
                      </label>
                    </div>
                    <div
                      className="form-check form-check-inline "
                      style={{ display: "inline-block", marginRight: "-1rem" }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        value="option2"
                        onChange={(e) => {
                          setTitle("Ms");
                        }}
                        style={{ marginTop: "4px" }}
                      />
                      <label
                        className="form-check-label"
                        style={{ fontSize: "12px" }}
                      >
                        {t("Ms")}
                      </label>
                    </div>
                  </div>

                  <div className="col-sm-8">
                    <input
                      style={{ width: "104%" }}
                      type="text"
                      className="form-control contactField"
                      name="contactPerson"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <span
                    style={{
                      color: "red",
                      fontSize: "10px",
                      marginLeft: "130px",
                    }}
                  >
                    {error8}
                  </span>

                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: " 13px" }}
                  >
                    {t("Address")}
                  </label>
                  <div className="col-sm-10">
                    <input
                      style={{ marginLeft: "-33px", width: "105%" }}
                      type="text"
                      className="form-control Address"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-6 mt-2">
                    <form style={{ marginLeft: "0px" }}>
                      {/* 
                    <div className="form-group row">
                      <span style={{color : "red" , fontSize : "10px", marginLeft:"110px",}}>{error3}</span>

                      <label
                        className="col-sm-3 col-form-label"
                        style={{ fontSize: " 13px" }}
                      >
                        User Type
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          name="userType"
                          onChange={(e) => setUserType(e.target.value)}
                          value={userType}
                        />
                      </div>
                    </div> */}

                      <div className="form-group row">
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginLeft: "100px",
                          }}
                        >
                          {error5}
                        </span>

                        <label
                          className="col-sm-3 col-form-label"
                          style={{ fontSize: " 13px" }}
                        >
                          {t("PostCode")}
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            name="postCode"
                            onChange={(e) => setPostCode(e.target.value)}
                            value={postCode}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginLeft: "100px",
                          }}
                        >
                          {error7}
                        </span>

                        <label
                          className="col-sm-3 col-form-label"
                          style={{ fontSize: " 13px" }}
                        >
                          {t("Country")}
                        </label>
                        <div className="col-sm-8">
                          {/* <input
                          type="text"
                          className="form-control"
                          name="country"
                          onChange={(e) => setCountry(e.target.value)}
                          value={country}
                        /> */}
                          <select
                            className="custom-select"
                            onChange={(e) => setCountry(e.target.value)}
                            name="extenddate"
                          >
                            {Country.countries.map((item, index) => (
                              <option value={item.value} key={index}>
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-6 mt-2">
                    <form>
                      <div className="form-group row">
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginLeft: "130px",
                          }}
                        >
                          {error6}
                        </span>

                        <label
                          className="col-sm-4 col-form-label"
                          style={{ fontSize: " 13px" }}
                        >
                          {t("City")}
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <span
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginLeft: "130px",
                          }}
                        >
                          {error4}
                        </span>

                        <label
                          className="col-sm-4 col-form-label"
                          style={{ fontSize: " 13px" }}
                        >
                          {t("Mobile")}
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="number"
                            className="form-control"
                            name="mobile"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <div className="form-group row">
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "100px",
                        }}
                      >
                        {error9}
                      </span>

                      <label
                        className="col-sm-3 col-form-label"
                        style={{ fontSize: " 13px" }}
                      >
                        {t("Password")}
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group row">
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "130px",
                        }}
                      >
                        {error10}
                      </span>

                      <label
                        className="col-sm-4 col-form-label"
                        style={{ fontSize: " 13px" }}
                      >
                        {t("Confirm Password")}
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmpassword"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          value={confirmPassword}
                          // style={{ marginLeft: "-35px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*                 

                <p
            style={{
              fontSize: "10px",
              color: "red",
              marginLeft: "50px",
              marginBottom: "-10px",
            }}
          >
            {emailError}
          </p> */}

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn "
                  data-dismiss="modal"
                  style={{
                    background:
                      "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                    color: "#fff",
                  }}
                >
                  {t("Close")}
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={disable}
                  style={{
                    background:
                      "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                    color: "#fff",
                  }}
                  onClick={() => {
                    if (
                      name != "" &&
                      title != "" &&
                      email != "" &&
                      mobile != "" &&
                      postCode != "" &&
                      city != "" &&
                      country != "" &&
                      address != "" &&
                      password != "" &&
                      confirmPassword != ""
                    ) {
                      debugger;
                      Signup();
                    } else {
                      if (name == "") {
                        setError1("Required");
                      } else {
                        setError1("");
                      }
                      if (email == "") {
                        setError2("Required");
                      } else {
                        setError2("");
                      }
                      if (title == "") {
                        setError3("Required");
                      } else {
                        setError3("");
                      }
                      if (mobile == "") {
                        setError4("Required");
                      } else {
                        setError4("");
                      }
                      if (postCode == "") {
                        setError5("Required");
                      } else {
                        setError5("");
                      }
                      if (city == "") {
                        setError6("Required");
                      } else {
                        setError6("");
                      }
                      if (country == "") {
                        setError7("Required");
                      } else {
                        setError7("");
                      }
                      if (address == "") {
                        setError8("Required");
                      } else {
                        setError8("");
                      }
                      if (password == "") {
                        setError9("Required");
                      } else {
                        setError9("");
                      }
                      if (confirmPassword == "") {
                        setError10("Required");
                      } else {
                        setError10("");
                      }
                    }
                  }}
                >
                  {loading === true ? (
                    <>
                      <Loading />
                    </>
                  ) : (
                    <>{t("Submit")} </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
