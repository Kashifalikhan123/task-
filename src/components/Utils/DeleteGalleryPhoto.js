import React from "react";
import API from "../Constant_Api/Api";
export default async function DeleteGalleryPhotos(photoID, restaurantID) {
  try {
    var token = localStorage.getItem("dataToken");
    const DeletePhoto = await fetch(API.DELETEGALLERYPHOTO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ PhotoID: photoID, RestaurantID: restaurantID }),
    });
    const data = await DeletePhoto.json();
    return DeletePhoto;
  } catch (err) {}
}
