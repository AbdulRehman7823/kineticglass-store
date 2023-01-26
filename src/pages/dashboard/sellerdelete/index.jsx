import React from 'react'
import SellerNavigation from '../../../components/sellerDashboard/Navigation/SellerNavigation'
import DeleteComponent from '../../../components/sellerDashboard/DeleteComponent/DeleteComponent'
function SellerDelete() {
  return (
    <div>

      <SellerNavigation>
        <DeleteComponent></DeleteComponent>
      </SellerNavigation>
    </div>
  )
}

export default SellerDelete