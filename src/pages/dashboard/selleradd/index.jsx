import React from "react";
import { useEffect, useState } from "react";
import SellerNavigation from "../../../components/sellerDashboard/Navigation/SellerNavigation";
import AddComponent from "../../../components/sellerDashboard/AddComponent/AddComponent";
import authServices from "@/Services/AuthServices";
import { useRouter } from "next/router";

function SellerAdd() {
  const router = useRouter();
  useEffect(() => {
    if (!authServices.isLoggedIn()) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div>
      <SellerNavigation>
        <AddComponent></AddComponent>
      </SellerNavigation>
    </div>
  );
}

export default SellerAdd;
