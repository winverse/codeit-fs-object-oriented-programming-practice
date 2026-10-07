# 02. 팩토리 함수로 회원 상태 분리하기

푸는 시점: 객체와 클래스 › 팩토리 함수 퀴즈 뒤

## 할 일

`problem.js`의 팩토리 함수 `createMember(name, level)`을 완성합니다. 반환할 객체에 `name`과 `level`을 프로퍼티 축약 표기로 넣고, `levelUp()`은 `this`로 자신의 `level`을 1 올리며, `getInfo()`는 `철수 - Lv.2` 형식의 문자열을 반환합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/02-member-state/problem.js
pnpm test:02
```

## 성공 기준

- `pnpm test:02`가 통과합니다.
- `node`로 실행하면 `철수 - Lv.2`, `영희 - Lv.3`이 차례로 출력됩니다.
- `m1.levelUp()`을 호출해도 `m2`의 레벨은 바뀌지 않습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
