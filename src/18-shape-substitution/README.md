# 18. 리스코프 치환 원칙으로 도형 클래스 고치기

푸는 시점: SOLID 원칙 › 리스코프 치환 원칙 퀴즈 뒤

## 할 일

`problem.js`의 `resizeToBanner(rectangle)`는 받은 직사각형의 가로를 5, 세로를 4로 바꾼 뒤 넓이를 반환하므로, 어떤 직사각형을 넘겨도 `20`을 기대합니다. 그런데 `Rectangle`을 상속한 `Square`는 가로나 세로 하나만 바꿔도 두 변을 함께 바꾸도록 오버라이딩되어 있어, `Square` 객체를 넘기면 `16`이 출력됩니다. 정사각형은 직사각형 자리에 넣을 수 없으므로 상속 관계를 끊습니다.

1. `Square`가 `Rectangle`을 상속하지 않게 바꿉니다. 한 변의 길이는 private field `#size`에 담고, `setSize(size)`와 `getArea()`만 둡니다.
2. 파일 끝의 `resizeToBanner(square)` 호출을 지우고, `square.setSize(6)`으로 한 변을 6으로 바꿉니다.
3. `Rectangle`, `resizeToBanner()`, `printAreas()`는 고치지 않습니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/18-shape-substitution/problem.js
pnpm test:18
```

## 성공 기준

- `pnpm test:18`이 통과합니다.
- `node`로 실행하면 `20`, `20`, `36`이 차례로 출력됩니다.
- `Square`는 `Rectangle`을 상속하지 않고, `setSize()`와 `getArea()`만 가집니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
