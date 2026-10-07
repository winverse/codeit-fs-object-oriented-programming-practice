# 14. 전략 패턴으로 배송비 계산 바꾸기 해설

`ShippingCostCalculator`는 배송비를 직접 계산하지 않고, 받은 전략 객체를 private field `#shippingStrategy`에 담아 두었다가 `getCost(weight)`에서 `this.#shippingStrategy.calculate(weight)`로 계산을 맡기는 Context입니다. `StandardShipping`과 `ExpressShipping`은 서로 상속하지 않지만 같은 `calculate(weight)`를 제공하므로, `setShippingStrategy()`로 전략을 바꾸면 같은 `calculator.getCost(2)` 호출의 결과가 4000원에서 7600원으로 바뀝니다. `getCost()` 안에서 배송 방식마다 `if`로 나눠 계산하면 배송 방식이 늘 때마다 `ShippingCostCalculator`를 고쳐야 하지만, 계산을 전략 객체에 맡기면 같은 `calculate(weight)`를 가진 새 전략 클래스만 만들면 됩니다.
