# 04. 공유 메서드로 리팩터링하기

푸는 시점: 객체와 클래스 › 클래스 퀴즈 뒤

## 할 일

`problem.js`의 `User`는 올바르게 동작하지만 constructor 안에서 `buy`를 만들어 인스턴스마다 새 함수가 생깁니다. `buy`를 `class` 본문의 인스턴스 메서드로 옮겨 두 인스턴스가 같은 함수를 공유하게 합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/04-shared-method/problem.js
pnpm test:04
```

## 성공 기준

- `pnpm test:04`가 통과합니다.
- `node`로 실행하면 `a@shop.com buys 청바지`, `true`, `true`가 차례로 출력됩니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
