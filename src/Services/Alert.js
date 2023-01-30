import { toast } from "react-toastify";
class Alert {
  constructor() {}
  showSuccessAlert = (msg) => {
    
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  showErrorAlert = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  showinfoAlert = (msg) => {
    toast.info(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  showWarningAlert = (msg) => {
    toast.warning(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
}

let alert = new Alert();
export default alert;
