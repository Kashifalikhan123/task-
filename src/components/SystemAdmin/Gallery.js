import React, { useEffect, useState } from "react";
import "./Gallery.css";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowDetailNavbar from "./ShowDetailNavbar";
import API from "../Constant_Api/Api";
import Loading from "../Loading-spinner/Loading";
import { useTranslation } from "react-i18next";
import UploadFile from "./../Utils/UploadFile";
import UpdateDescrptionOfImage from "./../Utils/UpdateDescrptionOfImage";
import DeleteGalleryPhotos from "./../Utils/DeleteGalleryPhoto";
import Getrestuarntgallery from "./../Utils/Getrestuarntgallery";

toast.configure();
const Gallery = () => {
  const [item, setItem] = useState([]);
  const [description, setDescription] = useState("");
  const [restaurantID, setRestaurantID] = useState("");
  const [photoID, setPhotoID] = useState("");
  const [descError, setDescError] = useState("");
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  //******************************************************** */
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("UploadedFile", selectedFile);
    const res = await UploadFile(data);
    if (res.status == 200 || res.status == 204) {
      toast.success("Image Upload Successfully", { autoClose: 3000 });
      GetRestaurantGallery();
    }
  };

  // ***********************************************************************************************************************
  const UpdateDescription = async () => {
    if (description != "") {
      try {
        const updateDescription = await UpdateDescrptionOfImage(
          photoID,
          restaurantID,
          description
        );
        if (updateDescription.status == 200) {
          toast.success("Image Description Updated Successfully", {
            autoClose: 3000,
          });
          GetRestaurantGallery();
        } else {
          toast.error("Image Description Updated failed", { autoClose: 3000 });
        }
      } catch (error) {}
    } else {
      setDescError("Required");
    }
  };

  // ************************************************************************************************************
  const DeleteGalleryPhoto = async () => {
    try {
      const DeletePhoto = await DeleteGalleryPhotos(photoID, restaurantID);
      if (DeletePhoto.status == 200) {
        toast.success("Gallery Image Deleted successfully", {
          autoClose: 3000,
        });
        GetRestaurantGallery();
      } else {
        toast.error("Gallery Image Deleted failed", { autoClose: 3000 });
      }
    } catch (error) {}
  };
  // ************************************************************************************************************
  const GetRestaurantGallery = async () => {
    setLoading(true);
    try {
      const data = await Getrestuarntgallery();
      if (data != undefined && data != null) {
        setItem(data);
      }
      setLoading(false);
      debugger;
    } catch (error) {}
  };
  useEffect(() => {
    GetRestaurantGallery();
  }, []);
  // ************************************************************************************************************
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
        <button
          type="button"
          className="btn mt-4"
          data-toggle="modal"
          data-target="#exampleModalUploadPic"
          data-whatever="@mdo"
          style={{
            background: "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
            color: "#fff",
          }}
        >
          <FaPlusCircle
            style={{
              height: "30px",
              width: "100%",
            }}
            onClick={() => {
              debugger;
              setSelectedFile("");
            }}
          />
        </button>
        <hr />
        <div className="row ">
          {loading == true ? (
            <>
              <div className="col-6" style={{ textAlign: "right" }}>
                <Loading />
              </div>
            </>
          ) : (
            <>
              {" "}
              {item.map((pic, index) => (
                <div className="col-4 galleryRow" key={index}>
                  <div
                    className="card"
                    style={{
                      background: "#fff",
                      opacity: "none",
                    }}
                  >
                    <img
                      className="card-img-top"
                      src={`https://images.speedbytes.io/RestaurantImages/${pic.photo}`}
                      alt="Image Not Found"
                      style={{
                        height: "300px",
                        background: "gray",
                        color: "#fff",
                      }}
                    />
                    <div
                      className="card-body"
                      style={{
                        background:
                          "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                        color: "#fff",
                      }}
                    >
                      <div className="row">
                        <div className="col-8">
                          <p className="card-text">
                            <span
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              data-toggle="modal"
                              data-target="#exampleModalUpdatePhoto"
                              data-whatever="@mdo"
                              onClick={() => {
                                if (pic.restaurantId != null) {
                                  setDescription(pic.description);
                                  setRestaurantID(pic.restaurantId);
                                  setPhotoID(pic.id);
                                }
                              }}
                            >
                              {pic.description}{" "}
                            </span>
                            {show == false ? (
                              <>
                                <div
                                  className="modal fade"
                                  id="exampleModalUpdatePhoto"
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
                                        <p
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          {t("UPDATE GALLERY")}
                                        </p>
                                        <button
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          style={{ color: "#fff" }}
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
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
                                              {t("Description")}
                                            </label>
                                            <p
                                              style={{
                                                color: "red",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {descError}
                                            </p>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="user-name"
                                              value={description}
                                              onChange={(e) =>
                                                setDescription(e.target.value)
                                              }
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
                                            {t("CLOSE")}{" "}
                                          </button>
                                          <button
                                            type="button"
                                            className="btn    "
                                            style={{
                                              background:
                                                "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                                              color: "#fff",
                                            }}
                                            onClick={() => {
                                              UpdateDescription();
                                            }}
                                            data-dismiss="modal"
                                            aria-label="Close"
                                          >
                                            {t("UPDATE")}{" "}
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </p>
                        </div>
                        <div className="col-4 ">
                          <FaTrash
                            className="galleryDelete"
                            style={{
                              height: "20px",
                              width: "20%",
                              cursor: "pointer",
                              float: "right",
                            }}
                            data-toggle="modal"
                            data-target="#exampleModalconfirmdelete"
                            data-whatever="@mdo"
                            onClick={() => {
                              setRestaurantID(pic.restaurantId);
                              setPhotoID(pic.id);
                            }}
                          />
                          <>
                            <div
                              className="modal fade"
                              id="exampleModalconfirmdelete"
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
                                    <p
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      {t("DELETE GALLERY")}
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
                                          {t("Do You Want To Delete This...")}
                                        </label>
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
                                          DeleteGalleryPhoto();
                                        }}
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        {t("DELETE")}{" "}
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>

                      <div
                        className="form-check form-check-inline mt-3"
                        style={{ marginLeft: "-25px" }}
                      >
                        <label className="form-check-label">
                          {t("Default")}
                        </label>
                        <label className="switch ">
                          {pic.isDefault == true ? (
                            <input
                              type="checkbox"
                              defaultChecked={pic.isDefault}
                              disabled={true}
                            />
                          ) : (
                            <input
                              type="checkbox"
                              defaultChecked={pic.isDefault}
                            />
                          )}
                          <span
                            className="slider round"
                            style={{
                              width: "85%",
                              marginLeft: "100px",
                            }}
                          ></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </>
          )}{" "}
        </div>
        <hr />
        <div
          className="modal fade"
          id="exampleModalUploadPic"
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
                  {t("UPLOAD PHOTO")}
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
                  <form>
                    <input
                      type="file"
                      accept=".jpg, .png, .jpeg, .JPG, .JPEG, .PNG"
                      name="file"
                      onChange={changeHandler}
                    />
                  </form>
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
                    {t("CANCEL")}{" "}
                  </button>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      background:
                        "linear-gradient(rgb(158 158 158), hsl(0deg 0% 8%))",
                      color: "#fff",
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    {t("UPLOAD")}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
