# 08. 계좌 잔액 캡슐화하기

푸는 시점: 객체 지향 프로그래밍의 핵심 개념 › 캡슐화 퀴즈 뒤

## 할 일

`problem.js`의 `BankAccount`는 잔액을 public 프로퍼티 `balance`에 두어, 클래스 밖에서 `tom.balance = -5000`처럼 잔액을 음수로 바꿔도 막을 수 없습니다. 잔액을 private field `#balance`로 옮기고 다음을 구현합니다.

1. `getBalance()`는 `#balance`를 반환합니다.
2. `setBalance(money)`는 0 이상이면 `#balance`에 저장하고, 음수면 `throw new Error("You cannot set negative number for balance")`로 거부합니다.
3. constructor도 `setBalance()`로 처음 잔액을 저장합니다.
4. `deposit`, `withdraw`, `transfer`는 `getBalance()`와 `setBalance()`로 잔액을 읽고 바꿉니다. `transfer`는 상대 계좌의 `deposit()`으로 입금합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/08-account-encapsulation/problem.js
pnpm test:08
```

## 성공 기준

- `pnpm test:08`이 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다.
- 인스턴스에는 public 프로퍼티 `balance`가 없고, 음수 잔액은 constructor와 `setBalance()` 어느 쪽으로도 저장되지 않습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
