const Model = require("./Model")

class Order extends Model {
  static get tableName() {
    return "orders"
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minlength: 1, maxLength: 20 }
      }
    }
  }

  static get relationMappings() {
    const VendOrderDetail = require("./VendOderDetail")
    const Item = require("./Item")

    return {
      vendOrderDetails: {
        relation: Model.HasManyRelation,
        modelClass: VendOrderDetail,
        join: {
          from: "orders.id",
          to: "vendOrderDetails.orderId"
        }
      },
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: "orders.id",
          through: {
            from: "vendOrderDetails.orderId",
            to: "vendOrderDetails.itemId"
          },
          to: "items.id"
        }
      }
    }
  }
}

module.exports = Order