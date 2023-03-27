import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import VendOrderDetailTile from "./VendOderDetailTile"

const VdShowPage = (props) => {

  const [order, setOrder] = useState({ details: [] })

  const orderId = props.match.params.orderId

  const getOrder = async () => {
    try {
      const response = await fetch(`/api/v1/orders/${orderId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const orderData = await response.json()
      setOrder(orderData.order)
    } catch (error) {
      console.error(`Error in VdShowPage fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getOrder()
  }, [])

  const detailTileComponents = order.details.map((detailObject) => {
    return (
      <VendOrderDetailTile key= {detailObject.id}
      {...detailObject} />
    )
  })

  const created = new Date(order.createdAt)

  return (
    <div className="grid-container">
      <h3><Link to="/orders">Back to All orders</Link></h3>
      <div className="grid-x grid-margin-x callout primary">
        <div className="cell small-6 callout text-right">
          <h2>Order for <em>{order.name}</em></h2>
          <h5 className="cell small-2">
            Placed: <em><b>
              {created.toDateString()} {created.toLocaleString("en-US",{ hour:"numeric", minute: "numeric", second: "numeric", hour12: true})}
               </b></em>
          </h5>
          <h5>Total Items: <em><b>{order.total}</b></em></h5>
        </div>
        <div className="cell small-6 callout secondary">
          {detailTileComponents}
        </div>
      </div>
    </div>
  )
}

export default VdShowPage