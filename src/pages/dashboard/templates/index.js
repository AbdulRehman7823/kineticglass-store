import CardList from "@/components/cardlist";
import SellerNavigation from "@/components/sellerDashboard/Navigation/SellerNavigation";
import alert from "@/Services/Alert";
import authServices from "@/Services/AuthServices";
import axios from "axios";
import React, { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import templateService from "../../../Services/TemplateServices";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  React.useEffect( () => {
    setLoading(true);
     templateService
      .getAllUserTemplates(authServices.getLoggedInUser()._id)
      .then((res) => {
        console.log(res.data);
        setTemplates(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert.showErrorAlert("Could not load Sites!!" + err.message);
        setLoading(false);
      });
  }, []);
  return (
    <SellerNavigation>
      <div className="p-12 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl text-gray-700 text-center font-bold items-center">
          {" "}
          Your Available Sites
        </h1>
        {loading?<ClimbingBoxLoader color="#005974" size={20}/>:
        <CardList templates={templates} isSeller={true}/>}
      </div>
    </SellerNavigation>
  );
}

export default Templates;
