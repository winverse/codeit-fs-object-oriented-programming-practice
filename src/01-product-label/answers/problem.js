class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getLabel() {
    return `${this.name}(${this.price}원)`;
  }
}

const product = new Product("스웨터", 30_000);
console.log(product.getLabel());
