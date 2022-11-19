import React from "react";
import API from "../Constant_Api/Api";
export default async function UploadFile(data) {
  try {
    var token = localStorage.getItem("dataToken");
    var id = JSON.parse(localStorage.getItem("ResObject"));
    let res = await fetch(API.UPLOADFILE, {
      method: "POST",
      body: data,
      headers: {
        Authorization: "Bearer " + token,
        RestaurantID: id.id,
      },
    });
    let responseJson = await res.json();
    return res;
  } catch (err) {}
}
