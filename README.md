# Object-Oriented Programming - JS Practice

이 저장소는 객체 지향 프로그래밍 강의의 문제 해결 실습입니다. 강의자료의 각 단계에서 본문과 퀴즈를 마친 뒤, 아래 표에서 그 단계에 해당하는 문제를 바로 풉니다.

## 시작 상태

- `src/01-*`부터 `src/15-*`까지 열다섯 문제는 서로 독립적이며, 각 문제는 폴더 안의 `problem.js` 하나만 고칩니다.
- `problem.js`는 실행되는 뼈대이고, 직접 구현하거나 고칠 자리에 `TODO`가 있습니다. 04, 07, 11은 이미 동작하는 코드의 구조나 이름을 고치는 문제입니다.
- 각 문제 폴더의 `README.md`에 할 일, 실행·테스트 명령, 성공 기준이 있습니다.
- 정답은 각 문제의 `answers/problem.js`에, 해설은 `answers/README.md`에 있습니다. 테스트와 실행 명령은 `answers/`를 불러오지 않습니다.

## 실행

별도 패키지 설치 없이 Node.js로 실행할 수 있습니다. 명령은 저장소 루트에서 실행합니다.

```bash
pnpm test
pnpm test:01
node src/01-product-label/problem.js
```

처음 `pnpm test`를 실행하면 아직 풀지 않은 열다섯 문제의 테스트가 모두 실패합니다. 문제 이름이 `✖ 01 상품 라벨`처럼 `✖`와 함께 열다섯 줄 표시되고, 그 아래 요약에 `ℹ pass 0`과 `ℹ fail 15`가 표시되며, 요약 뒤에는 실패한 테스트마다 원인 메시지가 이어집니다. 문제를 하나 풀 때마다 그 번호의 테스트(문제 1이면 `pnpm test:01`)를 실행해 통과를 확인하고, 정답과 해설을 비교합니다.

## 문제 순서

| 문제 | 장 | 푸는 시점 | 다루는 내용 |
| --- | --- | --- | --- |
| `src/01-product-label` | 객체와 클래스 | 객체 리터럴 퀴즈 뒤 | 객체 리터럴의 메서드에서 `this`로 상태 읽기 |
| `src/02-member-state` | 객체와 클래스 | 팩토리 함수 퀴즈 뒤 | 팩토리 함수로 상태가 섞이지 않는 객체 만들기 |
| `src/03-cart-total` | 객체와 클래스 | 생성자 함수 퀴즈 뒤 | 생성자 함수와 `new`로 배열 상태와 합계 다루기 |
| `src/04-shared-method` | 객체와 클래스 | 클래스 퀴즈 뒤 | prototype 메서드 공유 |
| `src/05-discount-label` | 객체와 클래스 | 클래스 퀴즈 뒤 | 기본 파라미터와 파생 값 |
| `src/06-battle` | 객체와 클래스 | 클래스 퀴즈 뒤 | 클래스별 책임과 조건 분기 |
| `src/07-account-naming` | 객체 지향 프로그래밍의 핵심 개념 | 추상화 퀴즈 뒤 | 책임을 드러내는 이름 짓기 |
| `src/08-account-encapsulation` | 객체 지향 프로그래밍의 핵심 개념 | 캡슐화 퀴즈 뒤 | private field와 메서드로 잔액 보호하기 |
| `src/09-job-inheritance` | 객체 지향 프로그래밍의 핵심 개념 | 상속 퀴즈 뒤 | 상속과 자식 클래스 스킬 |
| `src/10-account-inheritance` | 객체 지향 프로그래밍의 핵심 개념 | super 퀴즈 뒤 | `super()`로 계좌 종류 추가하기 |
| `src/11-account-polymorphism` | 객체 지향 프로그래밍의 핵심 개념 | 부모 클래스 메서드 재사용 퀴즈 뒤 | 오버라이딩과 `super.transfer()`로 이체 코드 줄이기 |
| `src/12-singleton-logger` | OOP 디자인 패턴 | 싱글턴 패턴 퀴즈 뒤 | 로거 인스턴스 하나만 쓰기 |
| `src/13-notification-factory` | OOP 디자인 패턴 | 단순 팩토리 패턴 퀴즈 뒤 | 채널별 알림 객체 생성 모으기 |
| `src/14-shipping-strategy` | OOP 디자인 패턴 | 전략 패턴 퀴즈 뒤 | 배송비 계산 전략 바꿔 끼우기 |
| `src/15-channel-observer` | OOP 디자인 패턴 | 옵저버 패턴 퀴즈 뒤 | 구독자 목록에 새 영상 알리기 |
