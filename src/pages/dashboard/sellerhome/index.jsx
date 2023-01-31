import React from 'react'
import SellerNavigation from '../../../components/sellerDashboard/Navigation/SellerNavigation'
import SellerHome from '../../../components/sellerDashboard/SellerHome/SellerHome'
import { useRouter } from "next/router";
import authServices from '@/Services/AuthServices';
import { useEffect } from 'react';

function Index() {
  const router = useRouter();
  useEffect(() => {
    if (!authServices.isLoggedIn()) {
      router.push("/auth/login");
    }
  }, []);
  return (
    <div>

      <SellerNavigation>
        <SellerHome></SellerHome>
      </SellerNavigation>
    </div>
  )
}

export default Index;