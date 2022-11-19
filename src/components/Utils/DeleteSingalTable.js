import React from "react";
import API from "../Constant_Api/Api";
export default async function DeleteSingalTable(
  restaurantId,
  tableId,
  type,
  position
) {
  try {
    var token = localStorage.getItem("dataToken");
    const res = await fetch(API.DELETE_TABLE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        restaurantID: restaurantId,
        tableTag: tableId,
        tableType: type,
        tablePosition: position,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {}
}
