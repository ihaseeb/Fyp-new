module.exports = function list(oldList) {
    this.items = oldList.items || {};
    this.totalQty = oldList.totalQty || 0;
    this.totalPrice = oldList.totalPrice || 0;

    this.add = function(item, id) {
      var storedItem = this.items[id];
      if(!storedItem) {
        storedItem = this.items[id] = {item: item, qty: 0, sale_price: null}
      }
      storedItem.qty++;
      storedItem.sale_price = storedItem.item.sale_price ;
      this.totalQty++;
      this.totalPrice += storedItem.sale_price;
    };

    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.generateArray = function() {
      var arr = [];
      for (var id in this.items){
          arr.push(this.items[id]);
      }
      return arr;
    };
};
