# 03. 생성자 함수로 장바구니 합계 계산하기

푸는 시점: 객체와 클래스 › 생성자 함수 퀴즈 뒤

## 할 일

`problem.js`의 생성자 함수 `Cart`를 완성합니다. `new Cart()`로 만든 객체마다 상품 목록 `this.items`를 빈 배열로 두고, `this.addItem`은 상품을 `items`에 추가하며, `this.getTotalPrice`는 담긴 상품 가격의 합계를 반환합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/03-cart-total/problem.js
pnpm test:03
```

## 성공 기준

- `pnpm test:03`이 통과합니다.
- `node`로 실행하면 `80000`이 출력됩니다.
- 상품을 담지 않은 장바구니의 합계는 `0`이고, 한 장바구니에 담은 상품이 다른 장바구니에 섞이지 않습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
