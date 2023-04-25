class ItemSerializer {
  static getSummary(item) {
    const allowedAttributes = [ "id", "flavor" ]
    let serializedItem = {}
    for ( const attribute of allowedAttributes ){
      serializedItem[attribute] = item[attribute]
    }
    return serializedItem
  }
}

export default ItemSerializer