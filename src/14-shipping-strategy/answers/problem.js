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
  #shippingStrategy;

  constructor(shippingStrategy) {
    this.#shippingStrategy = shippingStrategy;
  }

  setShippingStrategy(shippingStrategy) {
    this.#shippingStrategy = shippingStrategy;
  }

  getCost(weight) {
    return this.#shippingStrategy.calculate(weight);
  }
}

const calculator = new ShippingCostCalculator(
  new StandardShipping(),
);
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 4000원

calculator.setShippingStrategy(new ExpressShipping());
console.log(`[배송비] ${calculator.getCost(2)}원`); // 출력: [배송비] 7600원
