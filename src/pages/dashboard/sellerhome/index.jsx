import React from 'react'
import SellerNavigation from '../../../components/sellerDashboard/Navigation/SellerNavigation'
import SellerHome from '../../../components/sellerDashboard/SellerHome/SellerHome'
function index() {
  return (
    <div>

      <SellerNavigation>
        <SellerHome></SellerHome>
      </SellerNavigation>
    </div>
  )
}

export default index;