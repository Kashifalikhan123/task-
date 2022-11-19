import React from "react";
import API from "../Constant_Api/Api";
export default async function GetUserRestaurant(userID) {
  try {
    var token = localStorage.getItem("dataToken");

    const getuserrestaurant = await fetch(
      `${API.GET_USER_RESTAURANTS}?UserID=${userID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await getuserrestaurant.json();
    return data;
  } catch (err) {}
}
