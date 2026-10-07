# 17. 개방 폐쇄 원칙으로 메시지 알림 고치기

푸는 시점: SOLID 원칙 › 개방 폐쇄 원칙 퀴즈 뒤

## 할 일

`problem.js`의 `MessageNotificationManager`는 `displayAll()`에서 `instanceof`로 메시지 종류를 확인해 종류마다 다른 메서드를 호출합니다. 그래서 새로 추가한 `InstagramMessage`의 알림은 출력되지 않고, 메시지 종류가 늘 때마다 `displayAll()`을 고쳐야 합니다.

1. `KakaoMessage`의 `getShortMessage()`를 다른 메시지 클래스와 같은 이름의 `getNotificationText()`로 바꿉니다.
2. `displayAll()`에서 `instanceof` 분기를 없애고, 모든 메시지에 `getNotificationText()`를 호출해 출력합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/17-message-open-closed/problem.js
pnpm test:17
```

## 성공 기준

- `pnpm test:17`이 통과합니다.
- `node`로 실행하면 `[카카오톡] 이영희: 점심 먹었어?`, `[문자] 김철수: 택배가 도착했습니다`, `[인스타그램] 박민수: 사진을 좋아합니다`가 차례로 출력됩니다.
- `displayAll()`에 메시지 클래스 이름과 `instanceof`가 없고, `getNotificationText()`를 가진 어떤 메시지 객체를 추가해도 그 알림이 출력됩니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
