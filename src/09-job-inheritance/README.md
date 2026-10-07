# 09. 상속으로 직업 추가하기

푸는 시점: 객체 지향 프로그래밍의 핵심 개념 › 상속 퀴즈 뒤

## 할 일

`problem.js`에서 `Character`를 상속한 `Rogue`의 `shadowStrike`와 `Archer`의 `piercingArrow`를 완성합니다. 파일 위쪽의 `Character`는 수정하지 않습니다. `mp`와 `attackPower`는 `Character`의 constructor가 설정하므로 스킬 메서드에서 `this`로 읽고, 피해는 대상의 `takeDamage`로 줍니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/09-job-inheritance/problem.js
pnpm test:09
```

## 성공 기준

- `pnpm test:09`가 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다.
- MP가 부족하면 두 스킬 모두 `false`를 반환하고 MP와 대상의 HP를 바꾸지 않습니다.
- `Rogue`와 `Archer`에는 스킬 메서드만 있고, 상태 설정과 나머지 동작은 `Character`에 있습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
