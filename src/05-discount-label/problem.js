// src/05-discount-label/problem.js
class Product {
  constructor(name, price) {
    // TODO
  }

  getPriceLabel(discountRate = 0) {
    // TODO
  }
}

const p = new Product("재킷", 100_000);
console.log(p.getPriceLabel()); // 출력: 재킷: 100000원
console.log(p.getPriceLabel(0.2)); // 출력: 재킷: 80000원
