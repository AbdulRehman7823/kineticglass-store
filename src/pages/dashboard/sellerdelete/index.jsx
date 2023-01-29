import React from 'react'
import SellerNavigation from '../../../components/sellerDashboard/Navigation/SellerNavigation'
import DeleteComponent from '../../../components/sellerDashboard/DeleteComponent/DeleteComponent'
import { useRouter } from "next/router";
import authServices from '@/Services/AuthServices';
import { useEffect } from 'react';

function SellerDelete() {
  const router = useRouter();
  useEffect(() => {
    if (!authServices.isLoggedIn()) {
      router.push("/auth/login");
    }
  }, []);
  return (

    
    <div>

      <SellerNavigation>
        <DeleteComponent></DeleteComponent>
      </SellerNavigation>
    </div>
  )
}

export default SellerDelete