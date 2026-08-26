# 패턴 독해 정답

- 코드 A: 싱글턴 패턴. `static #instance`와 `getInstance()`가 같은 객체를 재사용합니다. 다만 생성자가 public이라 직접 `new Logger()`를 호출하는 우회는 남아 있습니다.
- 코드 B: 옵저버 패턴. `YouTubeChannel`이 구독자 목록을 관리하고 `notify()`를 일괄 호출합니다.
- 코드 C: 단순 팩토리 패턴. `NotificationFactory.create()`가 구체 알림 객체의 생성 책임을 맡습니다.
- 코드 D: 전략 패턴. `Checkout`이 `pay()` 인터페이스에 실행을 위임하고 전략 객체를 교체합니다.
