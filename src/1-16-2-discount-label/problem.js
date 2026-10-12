// src/1-16-2-discount-label/problem.js
class Product {
  constructor(name, price) {
    // TODO: 받은 name과 price를 같은 이름의 프로퍼티에 저장
  }

  getPriceLabel(discountRate = 0) {
    // TODO: "재킷: 100000원" 형식의 문자열 반환
    // 가격은 discountRate가 0이면 정가, 0보다 크면 할인 적용가
  }
}

const p = new Product("재킷", 100_000);
console.log(p.getPriceLabel()); // 출력: 재킷: 100000원
console.log(p.getPriceLabel(0.2)); // 출력: 재킷: 80000원
