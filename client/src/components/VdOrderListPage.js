import React, { useState, useEffect } from "react"
import { Link } from " react-router-dom"

import VdOrderTile from "./vdOrderTile"

const VdOrderListPage = () => {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const response = await fetch("/api/v1/orders")
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const parsedOrders = await response.json()
      setOrders(parsedOrders.orders)
    } catch (err) {
      console.error(`Error in ListPage fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const orderTileComponents = orders.map((orderObject)=> {
    return (
      <VdOrderTile
        key={orderObject.id}
        {...orderObject}
      />
    )
  })

  return (
    <div className="grid-container">
      <h3><Link to="/orders/new">Place a New Order</Link></h3>
      <div className="gride-x grid-margin-x align-center callout primary">
        <div className="cell grid-x grid-margin-x small-11 align-11 align-center callout">
          <h2 className="text-center">Current Vender items orders: <b><em>{orders.length}</em></b></h2>
          <div className="cell small-11 grid-x grid-margin-x align-center callout secondary">
            {orderTileComponents}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VdOrderListPage