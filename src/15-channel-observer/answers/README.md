# 15. 옵저버 패턴으로 구독자에게 알리기 해설

발행자인 `YouTubeChannel`은 구독자 목록을 private field `#subscribers`에 두고, `subscribe()`로 목록에 구독자를 더하며 `unsubscribe()`로 그 구독자를 뺀 새 배열을 `#subscribers`에 다시 저장합니다. `uploadVideo()`는 업로드 메시지를 출력한 뒤 private 메서드 `#notifyAll()`로 목록의 모든 구독자에게 `update(title)`을 호출합니다. 발행자는 구독자가 어떤 클래스인지 알 필요 없이 `update()`만 호출하고, 알림을 어떻게 보여 줄지는 각 구독자가 정합니다. `filter()`는 원래 배열을 바꾸지 않고 새 배열을 반환하므로, 결과를 `#subscribers`에 다시 저장하지 않으면 해지한 구독자에게도 계속 알림이 갑니다.
