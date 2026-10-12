// src/1-07-product-label/problem.js
const product = {
  name: "스웨터",
  price: 30_000,
  getLabel() {
    // TODO: this로 name과 price를 읽어 "스웨터(30000원)" 형식의 문자열 반환
  },
};

console.log(product.getLabel()); // 출력: 스웨터(30000원)
