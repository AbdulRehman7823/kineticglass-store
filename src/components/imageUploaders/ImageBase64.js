import alert from "../../Services/Alert";

const convertImageToBase64 = (img, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = function () {
    cb(reader.result, true);
  };
  reader.onerror = function (error) {
   
    alert.showErrorAlert("Error!!! "+"Description: "+error.message);
    cb(reader.result, false);
  };
};

export default convertImageToBase64;
