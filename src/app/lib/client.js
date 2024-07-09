"use client"

import { useState } from "react";
import { findOrCreateUser } from "./server";

const updateStorage = (userInfo) => {
    const [name, image] = userInfo
    localStorage.setItem("name", name)
    localStorage.setItem("image", image)
}

const getSavedUser = () => {
    const name = localStorage.getItem("name");
    const image = localStorage.getItem("image");
    return [name, image];
}

const dateConverter = date => {
    const now = Date.now();
    const minDif = Math.round((now - date) / 60000);
    const f = num => Math.round(minDif / num)

    if (minDif < 1) {
      return "Just now";;
    } else if (minDif < 60) {
      return `${minDif} ${minDif === 1? "minute": "minutes"} ago`;
    } else if (minDif < 1440) {
      return `${f(60)} ${f(60) === 1? "hour": "hours"} ago`;
    } else if (minDif < 43200) {
      return `${f(1440)} ${f(1440) === 1? "day": "days"} ago`;
    } else if (minDif < 43200) {
      return `${f(1440)} ${f(10080) === 1? "week": "weeks"} ago`;
    } else if (minDif < 518400) {
      return `${f(43200)} ${f(43200) === 1? "month": "months"} ago`;
    } else {
      return `${f(518400)} ${f(518400) === 1? "year": "years"} ago`;
    }
}

const imageLoader = ({ src }) => {
  return src
}


export {updateStorage, getSavedUser, dateConverter, imageLoader};