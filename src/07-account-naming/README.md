# 07. 이름으로 계좌의 책임 드러내기

푸는 시점: 객체 지향 프로그래밍의 핵심 개념 › 추상화 퀴즈 뒤

## 할 일

`problem.js`의 `BankAccount`는 은행 계좌로서 하는 일은 맞지만, 프로퍼티 `a`, `b`와 메서드 `add`, `sub`, `move`의 이름만으로는 무엇을 하는지 알 수 없습니다. 각 멤버의 코드를 읽고 하는 일에 맞는 이름을 `balance`, `deposit`, `holder`, `transfer`, `withdraw` 가운데에서 하나씩 골라 바꿉니다. 파일 끝의 호출부도 바꾼 이름으로 고칩니다. 이름만 바꾸므로 실행 결과는 처음과 같습니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/07-account-naming/problem.js
pnpm test:07
```

## 성공 기준

- `pnpm test:07`이 통과합니다.
- `node`로 실행하면 `Insufficient balance`, `Tom: 30000`, `Jerry: 70000`이 차례로 출력됩니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
