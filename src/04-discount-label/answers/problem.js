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

const product = new Product("자켓", 100_000);
console.log(product.getPriceLabel());
console.log(product.getPriceLabel(0.2));
