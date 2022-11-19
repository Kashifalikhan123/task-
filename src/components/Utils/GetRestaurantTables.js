import React from "react";
import API from "../Constant_Api/Api";
export default async function GetRestaurantTable() {
  try {
    var id = JSON.parse(localStorage.getItem("ResObject"));
    var token = localStorage.getItem("dataToken");
    const res = await fetch(
      `${API.GET_RESTUARANT_TABLE}?RestaurantID=${id.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {}
}
