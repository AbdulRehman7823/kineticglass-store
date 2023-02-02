import alert from "../../Services/Alert";

export const uploadImage = async (img, cb, setProgress, isFile) => {
  if (img != null) {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "imagesStore");
    data.append("cloud_name", "dxlblouo1");
    alert.showinfoAlert(
      `Please wait, ${isFile ? "file" : "image"} is uploading`
    );
    return fetch(
      isFile
        ? "https://api.cloudinary.com/v1_1/dxlblouo1/raw/upload/"
        : "https://api.cloudinary.com/v1_1/dxlblouo1/image/upload/",
      { method: "POST", body: data }
    )
      .then((res) => res.json())
      .then((data) => {
        alert.showSuccessAlert(
          `Your ${isFile ? "file" : "image"} Uploaded Successfully`
        );
        console.log(data.url);
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
