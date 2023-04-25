import VenderOrderDetailSerializer from "./VenderOrderDetailsSerializer.js";

class VenderOrderSerializer {
  static getSummary(order) {
    const allowedAttributes = ["id", "name", "createdAt"]

    let serializedOrder = {}
    for (const attribute of allowedAttributes) {
      serializedOrder[attribute] = order[attribute]
    }
    return serializedOrder
  }

  static async getOrderSummaryWithItems(order) {
    const allowedAttributes = ["id", "name", "createdAt"]
    let serializedOrder = {}
    for (const attribute of allowedAttributes) {
      serializedOrder[attribute] = order[attribute]
    }

    const vendOrderDetails = await order.$relatedQuery("vendOrderDetails")

    //console.log(vendOrderDetails)

    const serializedVdOrderDetails = await Promise.all (
      vendOrderDetails.map(async (vendOrderDetail) => await VenderOrderDetailSerializer.getSummary(vendOrderDetail))
      )

    serializedOrder.details = serializedVdOrderDetails
      

    let total = serializedVdOrderDetails.reduce((previousValue, currentValue) =>{
      return previousValue + currentValue.quantity}, 0)
      serializedOrder.total = total

      return serializedOrder
     }
}

export default VenderOrderSerializer