import React from "react";
import API from "../Constant_Api/Api";
export default async function Getrestuarntgallery() {
  try {
    var id = JSON.parse(localStorage.getItem("ResObject"));
    var token = localStorage.getItem("dataToken");
    const GetRestaurantsGallery = await fetch(
      `${API.GET_RESTUARANTGALLERY}?RestaurantID=${id.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await GetRestaurantsGallery.json();
    return data;
  } catch (err) {}
}
