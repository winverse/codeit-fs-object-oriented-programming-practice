# 06. 전투 객체의 책임 나누기

푸는 시점: 객체와 클래스 › 클래스 퀴즈 뒤

## 할 일

`problem.js`에서 `Warrior`와 `Mage`가 각자 자신의 상태와 스킬을 관리하도록 구현합니다. 상대에게 피해를 줄 때는 상대의 `hp`를 직접 바꾸지 않고 상대의 `takeDamage`를 호출합니다. 줄 끝 주석 가운데 `출력:`이 붙지 않은 것과 `출력:` 뒤 괄호 안의 값은 그 호출 뒤의 상태입니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/06-battle/problem.js
pnpm test:06
```

## 성공 기준

- `pnpm test:06`이 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다.
- 전사에는 `powerStrike`만, 마법사에는 `castFireball`만 직업 스킬로 있고, MP가 부족할 때와 포션이 없을 때는 `false`를 반환합니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
