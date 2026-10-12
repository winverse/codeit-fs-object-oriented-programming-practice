// src/1-13-cart-total/problem.js
function Cart() {
  // TODO: 상품 목록 this.items를 빈 배열로 두기
  this.addItem = function (item) {
    // TODO: 받은 item을 this.items에 추가
  };
  this.getTotalPrice = function () {
    // TODO: this.items에 담긴 상품 price의 합계 반환 (담긴 상품이 없으면 0)
  };
}

const cart = new Cart();
cart.addItem({ name: "스웨터", price: 30_000 });
cart.addItem({ name: "청바지", price: 50_000 });
console.log(cart.getTotalPrice()); // 출력: 80000
