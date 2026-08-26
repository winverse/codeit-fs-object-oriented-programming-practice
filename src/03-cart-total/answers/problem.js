class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

const cart = new Cart();
cart.addItem({ name: "스웨터", price: 30_000 });
cart.addItem({ name: "청바지", price: 50_000 });
console.log(cart.getTotalPrice());
