# 05. 할인 가격 라벨 만들기

푸는 시점: 객체와 클래스 › 클래스 퀴즈 뒤

## 할 일

`problem.js`의 `Product`에서 상품 상태를 초기화하고 `getPriceLabel(discountRate = 0)`을 완성합니다. 할인율이 0이면 상품명과 정가를, 0보다 크면 상품명과 할인 적용가를 문자열로 반환합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/05-discount-label/problem.js
pnpm test:05
```

## 성공 기준

- `pnpm test:05`가 통과합니다.
- `node`로 실행하면 `재킷: 100000원`, `재킷: 80000원`이 차례로 출력됩니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
