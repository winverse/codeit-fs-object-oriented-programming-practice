// src/03-cart-total/problem.js
function Cart() {
  // TODO: items 프로퍼티
  this.addItem = function (item) {
    // TODO
  };
  this.getTotalPrice = function () {
    // TODO
  };
}

const cart = new Cart();
cart.addItem({ name: "스웨터", price: 30_000 });
cart.addItem({ name: "청바지", price: 50_000 });
console.log(cart.getTotalPrice()); // 출력: 80000
