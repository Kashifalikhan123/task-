import React from "react";
import API from "../Constant_Api/Api";
export default async function UpdateDescrptionOfImage(
  photoID,
  restaurantID,
  description
) {
  try {
    var token = localStorage.getItem("dataToken");
    const updateDescription = await fetch(API.UPDATEGALLERYPHOTO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        photoID: photoID,
        restaurantID: restaurantID,
        description: description,
      }),
    });
    const data = await updateDescription.json();
    return updateDescription;
  } catch (err) {}
}
