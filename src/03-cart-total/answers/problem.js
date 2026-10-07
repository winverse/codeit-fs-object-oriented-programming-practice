function Cart() {
  this.items = [];
  this.addItem = function (item) {
    this.items.push(item);
  };
  this.getTotalPrice = function () {
    return this.items.reduce(
      (sum, item) => sum + item.price,
      0,
    );
  };
}

const cart = new Cart();
cart.addItem({ name: "스웨터", price: 30_000 });
cart.addItem({ name: "청바지", price: 50_000 });
console.log(cart.getTotalPrice()); // 출력: 80000
