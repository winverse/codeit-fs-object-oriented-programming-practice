# 13. 단순 팩토리로 알림 객체 만들기

푸는 시점: OOP 디자인 패턴 › 단순 팩토리 패턴 퀴즈 뒤

## 할 일

`problem.js`의 `sendWelcome()`은 채널에 맞는 알림 객체를 `NotificationFactory.create(channel)`로 얻어 메시지를 보냅니다. `create(channel)`을 완성해 `"email"`이면 `EmailNotification`, `"sms"`이면 `SmsNotification`의 새 객체를 반환하고, 등록되지 않은 채널이면 `지원하지 않는 채널입니다: 채널 이름` 오류를 던지게 합니다. 채널과 클래스를 고르는 생성 로직은 `NotificationFactory` 한 곳에만 둡니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/13-notification-factory/problem.js
pnpm test:13
```

## 성공 기준

- `pnpm test:13`이 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다.
- `create()`는 호출할 때마다 새 알림 객체를 반환합니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
