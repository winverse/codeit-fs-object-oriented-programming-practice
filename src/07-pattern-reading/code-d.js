// src/07-pattern-reading/code-d.js
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
  #policy;

  constructor(policy) {
    this.#policy = policy;
  }

  changePolicy(policy) {
    this.#policy = policy;
  }

  getCost(weight) {
    return this.#policy.calculate(weight);
  }
}

const calculator = new ShippingCostCalculator(new StandardShipping());
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 4000원

calculator.changePolicy(new ExpressShipping());
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 7600원
