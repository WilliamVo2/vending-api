const Model = require("./Model")

class Item extends Model {
  static get tableName() {
    return "items"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["flavor"],
      properties: {
        flavor: { type: "string", minLength: 1, maxLength: 175 }
      }
    }
  }

  static get relationMappings() {
    const VendOrderDetail = require("./VendOrderDetail")
    const Order = require("./Order")

    return {
      vendOrderDetails: {
        relation: Model.HasManyRelation,
        modelClass: VendOrderDetail,
        join: {
          from: "items.id",
          to: "vendOrderDetails.itemId"
        }
      },
      orders: {
        relation: Model.ManyToManyRelation,
        modelClass: Order,
        join: {
          from: "items.id",
          through: {
            from: "vendOrderDetails.itemId",
            to: "vendOrderDetails.orderId"
          },
          to: "orders.id"
        }
      }
    }
  }
}

module.exports = Item