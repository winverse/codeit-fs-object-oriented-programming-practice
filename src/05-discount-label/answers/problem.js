class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getPriceLabel(discountRate = 0) {
    const finalPrice = this.price * (1 - discountRate);
    return `${this.name}: ${finalPrice}원`;
  }
}

const p = new Product("재킷", 100_000);
console.log(p.getPriceLabel()); // 출력: 재킷: 100000원
console.log(p.getPriceLabel(0.2)); // 출력: 재킷: 80000원
