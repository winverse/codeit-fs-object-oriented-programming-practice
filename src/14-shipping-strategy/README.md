# 14. 전략 패턴으로 배송비 계산 바꾸기

푸는 시점: OOP 디자인 패턴 › 전략 패턴 퀴즈 뒤

## 할 일

`problem.js`의 `StandardShipping`과 `ExpressShipping`은 같은 `calculate(weight)`로 배송비를 계산하는 전략 클래스입니다. `ShippingCostCalculator`를 Context로 완성합니다.

1. 전략 객체를 private field `#shippingStrategy`에 담습니다. constructor로 처음 전략을 받고, `setShippingStrategy()`로 실행 중에 바꿉니다.
2. `getCost(weight)`는 배송비를 직접 계산하지 않고 전략 객체의 `calculate(weight)`에 맡깁니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/14-shipping-strategy/problem.js
pnpm test:14
```

## 성공 기준

- `pnpm test:14`가 통과합니다.
- `node`로 실행하면 `[배송비] 4000원`, `[배송비] 7600원`이 차례로 출력됩니다.
- `calculate(weight)`를 가진 어떤 전략 객체를 넘겨도 `getCost()`가 그 객체의 계산 결과를 반환합니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
