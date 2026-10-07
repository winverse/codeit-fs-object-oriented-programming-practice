# 15. 옵저버 패턴으로 구독자에게 알리기

푸는 시점: OOP 디자인 패턴 › 옵저버 패턴 퀴즈 뒤

## 할 일

YouTube 채널은 새 영상이 올라오면 구독자에게 알림을 보냅니다. `problem.js`의 발행자 `YouTubeChannel`을 완성합니다. 구독자 `User`는 수정하지 않습니다.

1. 구독자 목록을 private field `#subscribers`에 두고 constructor에서 빈 배열로 초기화합니다.
2. `subscribe(subscriber)`는 목록에 구독자를 더하고, `unsubscribe(subscriber)`는 목록에서 그 구독자를 뺍니다.
3. `uploadVideo(title)`은 업로드 메시지를 출력한 뒤 private 메서드 `#notifyAll(title)`로 모든 구독자의 `update(title)`을 호출합니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/15-channel-observer/problem.js
pnpm test:15
```

## 성공 기준

- `pnpm test:15`가 통과합니다.
- `node`로 실행한 결과가 파일 끝 `출력:` 주석과 같습니다.
- 구독을 해지한 `이영희`에게는 2강 알림이 가지 않습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
