import React from 'react'
import SellerNavigation from '../../components/sellerDashboard/Navigation/SellerNavigation'
import Login from '@/pages/auth/login';
import authServices from '@/Services/AuthServices';
import Orders from '../../components/sellerDashboard/Orders/Orders'
import { useRouter } from "next/router";
import { useEffect } from 'react';
function SellerOrders() {
  const router = useRouter();
  useEffect(() => {
    if (!authServices.isLoggedIn()) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div>
      {user?
      <SellerNavigation>
        <Orders/>
      </SellerNavigation>
      :<Login></Login>}
    </div>
  )
}

export default SellerOrders;