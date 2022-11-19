import React from "react";
import API from "../Constant_Api/Api";
export default async function UpdateTables(
  updateTableID,
  updateType,
  updatePosition
) {
  try {
    var token = localStorage.getItem("dataToken");
    var id = JSON.parse(localStorage.getItem("ResObject"));
    const res = await fetch(API.UPDATE_TABLE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        restaurantID: id.id,
        tableTag: updateTableID,
        tableType: updateType,
        tablePosition: updatePosition,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {}
}
