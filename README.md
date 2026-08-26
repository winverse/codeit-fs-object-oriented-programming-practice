# Object-Oriented Programming - JS Practice

이 저장소는 Codeit 풀스택 15기 `30. Object-Oriented Programming - JS` 과정의 문제 해결 실습입니다.

## 시작 상태

- `src/01-*`부터 `src/06-*`까지는 서로 독립적인 class 구현 문제입니다.
- 각 `problem.js`에는 학습 대상 로직만 `TODO`로 남아 있습니다.
- `src/07-pattern-reading`은 코드를 수정하지 않고 패턴과 근거를 분석하는 실습입니다.
- 정답은 각 문제의 `answers/`에 있으며 기본 테스트와 실행 명령에서는 불러오지 않습니다.

## 실행

별도 패키지 설치 없이 Node.js로 실행할 수 있습니다.

```bash
npm test
npm run test:01
npm run patterns
```

처음에는 미완성 문제 때문에 테스트가 실패합니다. 각 문제를 직접 구현하고 해당 번호의 테스트를 통과한 뒤 정답 파일과 비교합니다.

## 문제 순서

1. `src/01-product-label/problem.js`: 상태 초기화와 문자열 반환
2. `src/02-shared-method/problem.js`: prototype 메서드 공유
3. `src/03-cart-total/problem.js`: 배열 상태 변경과 합계 계산
4. `src/04-discount-label/problem.js`: 기본 매개변수와 파생 값
5. `src/05-member-state/problem.js`: 인스턴스 상태 분리
6. `src/06-battle/problem.js`: 클래스별 책임과 조건 분기
7. `src/07-pattern-reading/code-a.js`~`code-d.js`: 디자인 패턴 독해
