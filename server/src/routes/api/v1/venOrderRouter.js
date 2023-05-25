import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Order } from "../../../models/index.js"
import cleanUserInput from "../../../../services/cleanUserInput.js"
import VenderOrderSerializer from "../../../serializers/VenderOrderSerializer.js"

const venOrderRouter = new express.Router()

venOrderRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.query().orderBy("createdAt")

    const serializedOrders = orders.map(order => VenderOrderSerializer.getSummary(order))
    return res.status(200).json({ orders: serializedOrders })
  }catch (error) {
    return res.status(500).json({ errors:error })
  } 
})

venOrderRouter.get("/:id", async (req, res) => {
  const { id } =req.params
  try {
    const order = await Order.query().findById(id)
    
    const serializedOrder = await VenderOrderSerializer.getOrderSummaryWithItems(order)

    return res.status(200).json({ order: serializedOrder })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

venOrderRouter.post("/", async (req, res) => {
  const cleanedFormInput = cleanUserInput(req.body)
  const { name, items } = cleanedFormInput

  try {
    if (items) {
      const newOrder = await Order.query().insertAndFetch({ name })
      for (const item of items) {
        await newOrder.$relatedQuery("vendOrderDetails").insert({ itemId: item.itemId, quantity: item.quantity})
      }
      return res.status(201).json({ order: newOrder })
    } else {
      const itemError = {
        items: [{
          message: "should be selected"
        }]
      }
      return res.status(422).json({ errors: itemError })
    }
  }catch (error) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default venOrderRouter