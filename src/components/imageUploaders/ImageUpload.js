import axios from "axios";
import { useState } from "react";
import alert from "../../Services/Alert";
axios.defaults.withCredentials = false;
export const uploadImage = async ( img, cb, setProgress, isFile) => {
  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let precentage = Math.floor((loaded * 100) / total);
      if (precentage < 100) setProgress(precentage);
    },
  };
  console.log(setProgress);
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "imagesStore");
    data.append("cloud_name", "dxlblouo1");
  
    alert.showinfoAlert(
      `Please wait, ${isFile ? "file" : "image"} is uploading`
    );
    return axios
      .post(
        isFile
          ? "https://api.cloudinary.com/v1_1/dxlblouo1/raw/upload/"
          : "https://api.cloudinary.com/v1_1/dxlblouo1/image/upload/",
        data,
        setProgress ? options : {}
      )
      .then(({ data }) => {
        if (setProgress) setProgress(100);
        alert.showSuccessAlert(
          `Your ${isFile ? "file" : "image"} Uploaded Successfully`
        );
        cb(data.url, true);
      })
      .catch((err) => {
        console.log(err);
        alert.showErrorAlert(
          `Error occured while uploading your ${
            isFile ? "file" : "image"
          } Try again`
        );
        cb("", false);
      });
  }
};
