# 13. 단순 팩토리로 알림 객체 만들기 해설

`NotificationFactory`는 채널 이름(`"email"`, `"sms"`)을 키로 하고 그 채널의 알림 객체를 만드는 함수를 값으로 하는 `static #creators` 객체를 둡니다. `create(channel)`은 채널 이름으로 생성 함수를 찾아, 없으면 `지원하지 않는 채널입니다: push`처럼 오류를 던지고, 있으면 그 함수를 호출해 새 알림 객체를 반환합니다. 객체가 아니라 생성 함수를 등록했으므로 `create()`를 호출할 때마다 새 객체가 만들어집니다. `sendWelcome()`은 어떤 알림 클래스가 있는지 모른 채 `NotificationFactory.create(channel)` 한 줄로 알림 객체를 얻고, 두 알림 클래스가 같은 `send(message)`를 제공하므로 같은 `notifier.send(message)` 호출로 채널에 맞는 알림을 보냅니다. `create()` 안에서 `if`로 채널을 골라도 생성 분기가 이 한 곳에 모여 있으면 같은 단순 팩토리입니다.
