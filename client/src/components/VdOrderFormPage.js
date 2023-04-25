import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

import ItemOption from "./ItemOption"
import ErrorList from "./layout/ErrorList"
import translateServerError from "../services/translateServerErrors"

const VdOrderFormPage = (props) => {
  const [errors, setErrors] = useState({})
  const [shouldRedirect, setShouldRedirect]= useState({
    status: false,
    id: null
  })
  const [orderName, setOrderName] = useState("")

  const handleNameInput = (event) => {
    setOrderName(event.currentTarget.value)
  }

  const [items, setItems] = useState([])
  const getItemFlavors = async () => {
    try {
      const response = await fetch("/api/v1/items")
      if (!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const parsedResponse = await response.json()
      setItems(parsedResponse.items)
    } catch (error) {
      console.error(`Error in VdOrderDetail fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getItemFlavors()
  }, [])

  const [orderItems, setOrderItems] = useState([])

  const handleItemQuality = (event) => {
    const checkIfItemIsInOrder= orderItems.find((item) => item.itemId == event.currentTarget.id)

    if (checkIfItemIsInOrder) {
      const newSetOfItems = [...orderItems]
      const itemToUpdateIndex = orderItems.findIndex((item) => item.itemId == event.currentTarget.id)

      if (event.currentTarget.value > 0) {
        newSetOfItems[itemToUpdateIndex] = {
          ...newSetOfItems[itemToUpdateIndex],
          quality: event.currentTarget.value
        }
        setOrderItems(newSetOfItems)
      } else {
        const updatedItems = orderItems.filter((item) => item.itemId !== event.currentTarget.id)
        setOrderItems(updatedItems)
      }
    } else {
      const newItem = {
        itemId: event.currentTarget.id,
        itemFlavor: event.currentTarget.name,
        quality: event.currentTarget.value
      }
      setOrderItems([
        ...orderItems,
        newItem
      ])
    }
  }
  
  const itemOptions = items.map((option) => {
    let optionQuantity = ""
    const newOrderItem = orderItems.find((item) => item.itemId == option.id)

    if (newOrderItem) {
      optionQuantity = newOrderItem.quality
    }

    return (
      <ItemOption
        key={option.id}
        optionQuantity={optionQuantity}
        handleItemQuantity={handleItemQuality}
        {...option}
        />
    )
  })

  let orderFor 
  if (orderName) {
    orderFor = (
      <h4 className="text-center">for <em>{orderName}</em></h4>
    )
  }

  const itemSummary = orderItems.map((item) => {
    return (
      <li key= {item.itemId}>
        <b><em>{item.itemFlavor}</em></b>, quantity: <b><em>{item.quality}</em></b>
      </li>
    )
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch ("/api/v1/orders", {
        method: "POST",
        headers: new Headers({
          "Accept": "application/json",
          "Content-Type":"application/json"
        }),
        body: JSON.stringify({ name: orderName, items: orderItems })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerError(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body =await response.json()
        setShouldRedirect({
          status: true,
          id: body.order.id
        })
      }
    } catch (error) {
      console.error(`Error in VdOrder fetch: ${error.message}`)
    }
  }

  const handleClear = () => {
    setErrors({})
    setOrderItems([])
    setOrderName("")
  }

  if (shouldRedirect.status) {
    return <Redirect to={`/orders/${shouldRedirect.id}`} />
  }

  return (
    <div className="grid-container">
      <h3><Link to="/orders">Back to All Orders</Link></h3>
      <div className="grid-x grid-margin-x callout primary">
        <div className="cell small-6">
          <div className="callout">
            <h2 className="text-center"> Build Your Item Order </h2>
            <h6 className="text-center"><em>Choose your flavor!</em></h6>
            <h6 className="text-center"><em>Our system is limited by 04 items per flavor per order.</em></h6>
          </div>
          <div className="callout">
            <form onSubmit={handleSubmit}>
              <ErrorList errors={errors} />

              <div className="grid-x text-center align-justify align-middle">
                <label htmlFor="name" className="cell small-3 h6">
                  <b><em>Order Name:</em></b>
                </label>
                <input id="name" type = "text" name="name" value={orderName} onChange={handleNameInput} className="cell auto align-middle"
                />
              </div>

              <div className="grid-x grid-margin-x callout secondary">
                {itemOptions}
              </div>

              <div className="button-group grid-x grid-margin-x align-spaced">
                <input className="button cell small-4" type="submit" value="Submit" />
                <button className="button cell small-4" type="button" onClick={handleClear}>Clear</button>
              </div>
            </form>
          </div>
        </div>

        <div className="cell small-6 callout">
          <h2 className="text-center">Item Order Summary</h2>
          {orderFor}
          <ul>{itemSummary}</ul>
        </div>
      </div>
    </div>
  )
}

export default VdOrderFormPage