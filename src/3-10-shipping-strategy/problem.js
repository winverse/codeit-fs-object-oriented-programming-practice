// src/3-10-shipping-strategy/problem.js
class StandardShipping {
  calculate(weight) {
    return 3_000 + weight * 500;
  }
}

class ExpressShipping {
  calculate(weight) {
    return 6_000 + weight * 800;
  }
}

class ShippingCostCalculator {
  // TODO: 배송비 계산 전략을 담을 private field #shippingStrategy 선언

  constructor(shippingStrategy) {
    // TODO: 받은 shippingStrategy를 #shippingStrategy에 저장
  }

  setShippingStrategy(shippingStrategy) {
    // TODO: #shippingStrategy를 받은 shippingStrategy로 바꾸기
  }

  getCost(weight) {
    // TODO: 배송비 계산을 전략 객체의 calculate(weight)에 맡겨 그 결과 반환
  }
}

const calculator = new ShippingCostCalculator(
  new StandardShipping(),
);
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 4000원

calculator.setShippingStrategy(new ExpressShipping());
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 7600원
