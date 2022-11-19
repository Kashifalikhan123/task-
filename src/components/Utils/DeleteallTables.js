import React from "react";
import API from "../Constant_Api/Api";
export default async function DeleteallTables() {
  try {
    var token = localStorage.getItem("dataToken");
    var id = JSON.parse(localStorage.getItem("ResObject"));

    const res = await fetch(API.DELETE_ALL_TABLE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ restaurantID: id.id }),
    });
    const data = await res.json();
    return res;
  } catch (err) {}
}
