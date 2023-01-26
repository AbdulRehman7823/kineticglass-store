import React from 'react'
import SellerNavigation from '../../components/sellerDashboard/Navigation/SellerNavigation'

import Orders from '../../components/sellerDashboard/Orders/Orders'
function SellerOrders() {
  return (
    <div>

      <SellerNavigation>
        <Orders></Orders>
      </SellerNavigation>
    </div>
  )
}

export default SellerOrders;