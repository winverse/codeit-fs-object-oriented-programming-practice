// src/14-shipping-strategy/problem.js
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
  // TODO: 배송비 계산 전략을 담을 private field

  constructor(shippingStrategy) {
    // TODO
  }

  setShippingStrategy(shippingStrategy) {
    // TODO
  }

  getCost(weight) {
    // TODO: 배송비 계산을 전략 객체에 맡기기
  }
}

const calculator = new ShippingCostCalculator(
  new StandardShipping(),
);
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 4000원

calculator.setShippingStrategy(new ExpressShipping());
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 7600원
