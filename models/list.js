module.exports = function list(oldList) {
    this.items = oldList.items;
    this.totalQty = oldList.totalQty;
    this.totalPrice = oldList.totalPrice;

    this.add = function(item, id) {
      var storedItem = this.items[id];
      if(!storedItem) {
        storedItem = this.items[id] = {item: item, qty: 0, sale_price: null}
      }
      storedItem.qty++;
      storedItem.sale_price = storedItem.item.sale_price ;
      this.totalQty++;
      this.totalPrice += storedItem.sale_price;
    }

    this.generateArray = function() {
      var arr = [];
      for (var id in this.items){
          arr.push(this.items[id]);
      }
      return arr;
    };
};
