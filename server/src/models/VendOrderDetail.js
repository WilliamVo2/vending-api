const Model = require("./Model")

class VendOrderDetail extends Model {
  static get tableName() {
    return "vendOrderDetails"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["quantity"],
      properties: {
        quantity: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const Order = require("./Order")
    const Item = require("./Item")

    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "vendOrderDetails.orderId",
          to: "orders.id"
        }
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: "vendOrderDetails.itemId",
          to: "items.id"
        }
      }
    }
  }
}

module.exports = VendOrderDetail