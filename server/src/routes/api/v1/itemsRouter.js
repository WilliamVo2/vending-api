import express from "express"
import {Item} from "../../../models/index.js"
import ItemSerializer from "../../../serializers/ItemSerializer.js"

const itemsRouter = new express.Router()

itemsRouter.get("/", async (req, res) => {
  try {
    const items = await Item.query() 
      const serializedItems = items.map(item => ItemSerializer.getSummary(item))

      return res.status(200).json({ items: serializedItems })

    } catch (error) {
      return res.status(500).json({ errors:error })
    }
})

export default itemsRouter