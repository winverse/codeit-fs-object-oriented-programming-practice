// 파일: src/04-discount-label/problem.js
class Product {
  constructor(name, price) {
    // TODO
  }

  getPriceLabel(discountRate = 0) {
    // TODO
  }
}

const p = new Product("자켓", 100_000);
console.log(p.getPriceLabel()); // 자켓: 100000원
console.log(p.getPriceLabel(0.2)); // 자켓: 80000원
