import React from "react"

const VendOrderDetailTile = ({ item, quantity }) => {
  return (
    <div className="callout">
      <h5><em>{item.flavor}</em></h5>
      <p>Quantity: <b>{quantity}</b></p>
    </div>
  )
}

export default VendOrderDetailTile