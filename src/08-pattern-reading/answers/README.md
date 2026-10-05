# 패턴 독해 정답

- 코드 A: 싱글턴을 의도했지만 직접 `new`를 막지 못한 불완전한 구현. `static #instance`와 `getInstance()`가 같은 객체를 재사용하지만, `DatabasePool`의 `constructor`처럼 `#instance`를 확인해 오류를 던지는 코드가 없어 클래스 밖에서 `new Logger()`를 직접 호출하면 다른 인스턴스가 만들어집니다.
- 코드 B: 옵저버 패턴. `YouTubeChannel`이 구독자 목록을 관리하고 `notify()`를 일괄 호출합니다.
- 코드 C: 단순 팩토리 패턴. `NotificationFactory.create()`가 채널별 알림 객체의 생성 책임을 맡습니다.
- 코드 D: 전략 패턴. `ShippingCostCalculator`가 `calculate(weight)` 인터페이스를 가진 전략 객체에 배송비 계산을 맡기고, 실행 중에 전략 객체를 교체합니다.
