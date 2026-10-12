const product = {
  name: "스웨터",
  price: 30_000,
  getLabel() {
    return `${this.name}(${this.price}원)`;
  },
};

console.log(product.getLabel()); // 출력: 스웨터(30000원)
