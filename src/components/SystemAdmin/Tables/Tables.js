import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import ShowDetailNavbar from "../ShowDetailNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../Constant_Api/Api";
import Loading from "../../Loading-spinner/Loading";
import { useTranslation } from "react-i18next";
import DeleteallTables from "../../Utils/DeleteallTables";
import AddTables from "../../Utils/AddTables";
import UpdateTables from "../../Utils/UpdateTables";
import DeleteSingalTable from "../../Utils/DeleteSingalTable";
import GetRestaurantTable from "../../Utils/GetRestaurantTables";

toast.configure();
const Tables = () => {
  const [getTables, setGetTables] = useState([]);
  const { t } = useTranslation();
  const [updateTableID, setUpdateTableID] = useState("");
  const [updatePosition, setUpdatePosition] = useState("");
  const [updateType, setUpdateType] = useState("");
  const [addTable, setAddTable] = useState("");
  const [loading, setLoading] = useState(false);
  // ***********************************************************************************************************************
  const DeleteAllTable = async () => {
    try {
      const res = await DeleteallTables();
      if (res.status == 200) {
        GetRestaurantTables();
        toast.success("All Tables Deleted Successfully", { autoClose: 3000 });
      } else {
        toast.error("All Tables Deleted Failed", { autoClose: 3000 });
      }
    } catch (error) {}
  };
  const AddTable = async () => {
    if (addTable != "") {
      try {
        setGetTables([]);
        const data = await AddTables(addTable);
        if (data !== undefined) {
          toast.success("Table Added Successfully", { autoClose: 3000 });
          setGetTables(data);
        }
      } catch (error) {}
    } else {
      toast.error("Table Count Required", { autoClose: 3000 });
    }
  };
  // ***********************************************************************************************************************
  const UpdateTable = async () => {
    try {
      const data = await UpdateTables(
        updateTableID,
        updateType,
        updatePosition
      );
      if (data !== undefined) {
        toast.success("Table Updated Successfully", { autoClose: 3000 });
        getTables.map((item, i) => {
          if (item.id == data.id) {
            var newArr = [...getTables];
            newArr.splice(i, 1, data);
            setGetTables(newArr);
          }
        });
      } else {
        toast.error("Table Updated failed", { autoClose: 3000 });
      }
    } catch (error) {}
  };
  // ***********************************************************************************************************************
  const DeleteTable = async (restaurantId, tableId, type, position, index) => {
    const data = await DeleteSingalTable(restaurantId, tableId, type, position);
    let newArr = [...getTables];
    newArr.splice(index, 1);
    setGetTables(newArr);
    if (data !== undefined) {
      toast.success(`${tableId} Deleted Successfully`, { autoClose: 5000 });
    } else {
      toast.error(`${tableId} Deleted failed`, { autoClose: 5000 });
    }
  };
  // *********************************************************************************************************************
  const GetRestaurantTables = async () => {
    setLoading(true);
    try {
      const data = await GetRestaurantTable();
      if (data != undefined && data != null) {
        setGetTables(data);
      }
      setLoading(false);
      debugger;
    } catch (error) {}
  };

  useEffect(() => {
    GetRestaurantTables();
  }, []);
  return (
    <>
      <ShowDetailNavbar />

      <div
        className="container"
        style={{
          marginTop: "100px",
          background: "black",
          color: "#fff",
        }}
      >
        <div className="row">
          <div className="col-8 mt-3">
            <button
              className="btn "
              data-toggle="modal"
              data-target="#exampleModalAddTables"
              data-whatever="@mdo"
              style={{
                background:
                  "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                color: "#fff",
              }}
            >
              <FaPlusCircle
                style={{
                  height: "30px",
                  width: "90%",
                  color: "#fff",
                }}
              />
            </button>
            <div
              className="modal fade"
              id="exampleModalAddTables"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              data-backdrop="false"
              style={{ marginTop: "30px" }}
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
                      {t("ADD TABLES")}
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
                    <div className="modal-body" style={{ color: "black" }}>
                      <div className="form-group">
                        <label className="col-form-label">
                          {t("Tables Count")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-name"
                          onChange={(e) => setAddTable(e.target.value)}
                          value={addTable}
                        />
                      </div>
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
                        onClick={() => {
                          setAddTable("");
                        }}
                      >
                        {t("CLOSE")}{" "}
                      </button>
                      <button
                        type="button"
                        className="btn "
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{
                          background:
                            "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                          color: "#fff",
                        }}
                        onClick={() => {
                          AddTable();
                          setAddTable("");
                        }}
                      >
                        {t("Add Table")}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 mt-4">
            <button
              className="btn "
              data-toggle="modal"
              data-target="#DeleteAllTable"
              style={{
                float: "right",
                background:
                  "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                color: "#fff",
              }}
            >
              {t("Delete All Tables")}
            </button>
          </div>
        </div>
        <div
          className="container"
          style={{
            marginTop: "20px",
            background: "black",
            color: "#fff",
            opacity: "0.9",
          }}
        >
          <div className="row" style={{ overflowY: "auto", height: "600px" }}>
            <table class="table">
              <thead>
                <tr
                  style={{
                    position: "sticky",
                    top: 0,
                    background:
                      "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                    color: "#fff",
                  }}
                >
                  <td scope="col">{t("Table ID")}</td>
                  <td scope="col">{t("Position")}</td>
                  <td scope="col">{t("Type")}</td>
                  <td scope="col">{t("Edit")}</td>
                  <td scope="col">{t("Delete")}</td>
                </tr>
              </thead>
              <tbody>
                {" "}
                {loading == true ? (
                  <>
                    <tr>
                      <td></td>
                      <td></td>

                      <td>
                        <Loading />
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  <>
                    {" "}
                    {getTables.map((items, index) => (
                      <tr key={index} style={{ color: "#fff" }}>
                        <td>{items.tableId}</td>
                        <td>{items.position}</td>
                        <td>{items.type}</td>
                        <td>
                          <button
                            type="button"
                            className="btn "
                            style={{
                              cursor: "pointer",
                              background:
                                "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                              color: "#fff",
                            }}
                            data-toggle="modal"
                            data-target="#exampleModalUpdateTableRow"
                            data-whatever="@mdo"
                            onClick={() => {
                              setUpdateTableID(items.tableId);
                              setUpdateType(items.type);
                              setUpdatePosition(items.position);
                            }}
                          >
                            <FaEdit />
                          </button>

                          <div
                            className="modal fade"
                            id="exampleModalUpdateTableRow"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                            data-backdrop="false"
                          >
                            <div className="modal-dialog" role="document">
                              <div
                                className="modal-content"
                                style={{ marginTop: "13%" }}
                              >
                                <div
                                  className="modal-header"
                                  style={{
                                    background:
                                      "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                                    color: "#fff",
                                  }}
                                >
                                  <p
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {t("Update")}{" "}
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
                                  <div
                                    className="modal-body"
                                    style={{
                                      color: "black",
                                    }}
                                  >
                                    <div className="form-group">
                                      <label className="col-form-label">
                                        {t("Table ID")}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="user-name"
                                        disabled={true}
                                        value={updateTableID}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="col-form-label">
                                        {t("Position")}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="password-name"
                                        onChange={(e) =>
                                          setUpdatePosition(e.target.value)
                                        }
                                        defaultValue={updatePosition}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label className="col-form-label">
                                        {t("Type")}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="password-name"
                                        onChange={(e) =>
                                          setUpdateType(e.target.value)
                                        }
                                        defaultValue={updateType}
                                      />
                                    </div>
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
                                      {t("Cancel")}{" "}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn "
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      style={{
                                        background:
                                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                                        color: "#fff",
                                      }}
                                      onClick={() => {
                                        UpdateTable();
                                      }}
                                    >
                                      {t("Update")}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn "
                            style={{
                              cursor: "pointer",
                              background:
                                "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                              color: "#fff",
                            }}
                            onClick={() => {
                              DeleteTable(
                                items.restaurantId,
                                items.tableId,
                                items.type,
                                items.position,
                                index
                              );
                            }}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}{" "}
                  </>
                )}{" "}
              </tbody>
            </table>
          </div>
          <div
            className="modal fade"
            id="DeleteAllTable"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            data-backdrop="false"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div
                  className="modal-header"
                  style={{
                    background:
                      "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                    color: "#fff",
                  }}
                >
                  <p className="modal-title" id="exampleModalLongTitle">
                    {t("Delete All Tables")}
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
                <div className="modal-body" style={{ color: "black" }}>
                  {t("Do you want to delete all tables")}
                </div>
                <div className="modal-footer">
                  <button
                    style={{
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                    type="button"
                    className="btn "
                    data-dismiss="modal"
                  >
                    {t("No")}
                  </button>
                  <button
                    type="button"
                    className="btn "
                    style={{
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      DeleteAllTable();
                    }}
                  >
                    {t("Yes")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Tables;
