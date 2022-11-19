import React, { useState, useEffect } from "react";
import sha512 from "js-sha512";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import "./Login.css";
import API from "../Constant_Api/Api";
import Loading from "../Loading-spinner/Loading";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginUser from "../Utils/Login";
import GetUserRestaurant from "../Utils/GetUserRestaurant";

toast.configure();
var userType;
var data;
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    marginTop: "-400px",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    width: "100%",
  },
  head: {
    background: "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",

    color: "#fff",
    fontSize: "13px",
  },

  row: {
    fontSize: "12px",
  },
}));
const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState([]);
  const login = async () => {
    try {
      if (username !== "" && password !== "") {
        setLoading(true);
        const hashPassword = sha512(password);
        const { data, res } = await LoginUser(username, hashPassword);
        if (res.status !== 200) {
          setError("Invalid User Credentials");
          setLoading(false);
        } else {
          localStorage.setItem("dataToken", data.token);
          setShow(true);
          getuserRestaurant(data.userID);
        }
        setLoading(false);
      } else {
        setError("Required User Credentials");
        setLoading(false);
      }
    } catch (error) {
      setError("Login Failed");
      setLoading(false);
    }
  };
  const getuserRestaurant = async (userID) => {
    debugger;

    try {
      const data = await GetUserRestaurant(userID);
      debugger;
      if (data != null) {
        setName(data);
        setOpen(true);
      }
      debugger;
    } catch (error) {
      setError("Login Failed");
    }
  };
  return (
    <>
      {show != true ? (
        <>
          <div
            className="modal fade"
            id="Login"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-backdrop="false"
            style={{ marginTop: "8rem" }}
          >
            <div className="modal-dialog" role="document">
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
                    {t("Worker Login")}
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
                <form>
                  <div className="modal-body">
                    <div className="-formgroup">
                      <label className="col-form-label">{t("Email")}</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setUserName(e.target.value);
                          if (e.target.value == "") {
                            setError("");
                          }
                        }}
                        value={username}
                      />
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">{t("Password")}</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (e.target.value == "") {
                            setError("");
                          }
                        }}
                        value={password}
                      />
                    </div>
                    <p
                      style={{
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {error}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn"
                      data-dismiss="modal"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    >
                      {t("CLOSE")}{" "}
                    </button>
                    <button
                      type="button"
                      className="btn "
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                      onClick={() => {
                        login();
                      }}
                    >
                      {loading === true ? (
                        <>
                          <Loading />
                        </>
                      ) : (
                        <>{t("Login")}</>
                      )}{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="resModel"
            open={open}
            closeAfterTransition
            className={classes.modal}
          >
            <div style={{ background: "#fff", overflowX: "auto" }}>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.head}>
                        {t("Restaurant")}
                      </TableCell>
                      <TableCell className={classes.head}>
                        {t("ContactPerson")}
                      </TableCell>
                      <TableCell className={classes.head}>
                        {t("PostCode")}
                      </TableCell>
                      <TableCell className={classes.head}>
                        {t("City")}
                      </TableCell>
                      <TableCell className={classes.head}>
                        {t("Country")}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {name != undefined && name != null && name != "" ? (
                      <>
                        <TableRow
                          className="fullrow"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={async () => {
                            localStorage.setItem(
                              "ResObject",
                              JSON.stringify(name[1])
                            );
                            history.push({
                              pathname: "/Restaurant",
                            });
                          }}
                          // key={index}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            className={classes.row}
                          >
                            {name[1].name}{" "}
                          </TableCell>
                          <TableCell className={classes.row}>
                            {name[1].contactPerson}{" "}
                          </TableCell>
                          <TableCell className={classes.row}>
                            {name[1].postCode}{" "}
                          </TableCell>
                          <TableCell className={classes.row}>
                            {name[1].city}{" "}
                          </TableCell>
                          <TableCell className={classes.row}>
                            {name[1].country}{" "}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <>
                        <TableRow style={{ background: "black" }}>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            <Loading />
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default Login;
