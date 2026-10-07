# 10. 상속으로 계좌 종류 추가하기

푸는 시점: 객체 지향 프로그래밍의 핵심 개념 › super 퀴즈 뒤

## 할 일

`problem.js` 위쪽의 `BankAccount`는 08 문제의 정답이며 수정하지 않습니다. 이 클래스를 상속한 두 계좌를 완성합니다.

1. 저축 계좌 `SavingsAccount`: constructor에서 부모 constructor를 호출한 뒤 보유 기간 `years`를 0으로 설정합니다. `addInterest(rate)`는 잔액을 `잔액 * (1 + rate * years)`로 바꿉니다.
2. 기부 계좌 `DonationAccount`: constructor에서 부모 constructor를 호출한 뒤 기부 비율 `rate`를 설정합니다. `donate()`는 잔액을 `잔액 * (1 - rate)`로 바꿉니다.

잔액은 `getBalance()`로 읽고 `setBalance()`로 바꿉니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/10-account-inheritance/problem.js
pnpm test:10
```

## 성공 기준

- `pnpm test:10`이 통과합니다.
- `node`로 실행하면 `100000`, `120000`, `180000`, `100000`, `200000`이 차례로 출력됩니다.
- 두 자식 클래스에는 각자 추가한 메서드만 있고, 입금·출금·이체는 `BankAccount`에서 물려받습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
