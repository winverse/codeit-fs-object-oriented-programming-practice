# 01. 상품 라벨 만들기

푸는 시점: 객체와 클래스 › 객체 리터럴 퀴즈 뒤

## 할 일

`problem.js`의 `product` 객체 리터럴에서 `getLabel()` 메서드를 완성합니다. `getLabel()`은 `this`로 자신의 `name`과 `price`를 읽어 `스웨터(30000원)` 형식의 문자열을 반환합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/01-product-label/problem.js
pnpm test:01
```

## 성공 기준

- `pnpm test:01`이 통과합니다.
- `node`로 실행하면 `스웨터(30000원)`이 출력됩니다.
- 같은 `getLabel` 함수를 다른 상품 객체의 메서드로 호출하면 그 객체의 이름과 가격으로 문자열을 만듭니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
