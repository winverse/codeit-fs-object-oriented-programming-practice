# 11. 다형성으로 이체 코드 줄이기

푸는 시점: 객체 지향 프로그래밍의 핵심 개념 › 부모 클래스 메서드 재사용 퀴즈 뒤

## 할 일

`problem.js`의 세 계좌 클래스는 이체하는 메서드 이름이 서로 다릅니다. `BankAccount`는 `transfer`(수수료 없음), `SavingsAccount`는 `give`(수수료 0.5%), `DonationAccount`는 `send`(수수료 0.2%)입니다. 그래서 Tom, Jerry, Kate, Alice가 공동 계좌 `vacation`으로 800000원씩 보내는 코드를 계좌마다 한 줄씩 따로 적었습니다.

1. `give`와 `send`를 부모의 `transfer`를 오버라이딩하는 `transfer`로 바꿉니다. 자식의 `transfer`는 수수료만 처리하고, 실제 이체는 `super.transfer()`로 부모 메서드에 맡깁니다.
2. 잔액이 보낸 금액과 수수료를 합한 것보다 적으면 수수료도 빼지 않고 `Insufficient balance`를 출력합니다.
3. 파일 끝의 이체 네 줄을 계좌 배열과 반복문 하나로 줄입니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/11-account-polymorphism/problem.js
pnpm test:11
```

## 성공 기준

- `pnpm test:11`이 통과합니다.
- `node`로 실행하면 `200000`, `196000`, `198400`, `196000`, `3200000`이 차례로 출력됩니다.
- 파일에 `give`, `send` 호출이 남아 있지 않고, 이체 호출은 반복문 안의 한 곳뿐입니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
