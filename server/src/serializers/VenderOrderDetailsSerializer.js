import ItemSerializer from "./ItemSerializer.js"

class VenderOrderDetailSerializer {
  static async getSummary (vendOrderDetail) {
    const allowedAttributes = ["id", "quantity"]
    let serializedVdOrderDetail = {}
    for (const attribute of allowedAttributes) {
      serializedVdOrderDetail[attribute] = vendOrderDetail[attribute]
    }

    const relatedItem = await vendOrderDetail.$relatedQuery("item")
    const serializedItem = ItemSerializer.getSummary(relatedItem)
    serializedVdOrderDetail.item = serializedItem

    return serializedVdOrderDetail
  }
}

export default VenderOrderDetailSerializer