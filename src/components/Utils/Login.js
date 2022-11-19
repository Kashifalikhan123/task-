import React from "react";
import API from "../Constant_Api/Api";
export default async function LoginUser(username, hashPassword) {
  try {
    const res = await fetch(API.LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: username, Password: hashPassword }),
    });
    const data = await res.json();
    return { data, res };
  } catch (err) {}
}
