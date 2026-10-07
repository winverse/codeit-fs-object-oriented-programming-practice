# 17. 개방 폐쇄 원칙으로 메시지 알림 고치기 해설

세 메시지 클래스가 모두 같은 `getNotificationText()`를 제공하면 `displayAll()`은 메시지의 종류를 확인할 필요가 없습니다. 분기 없이 모든 메시지에 `message.getNotificationText()`만 호출하면, 실제로는 각 객체의 클래스에 정의한 메서드가 실행되어 메시지 종류에 맞는 알림이 출력됩니다. 이제 새 메시지 종류는 `getNotificationText()`를 가진 클래스를 추가하는 것으로 끝나고, `MessageNotificationManager`는 고치지 않습니다. `displayAll()`에 `else if (message instanceof InstagramMessage)`를 하나 더 붙여도 지금의 출력은 맞출 수 있지만, 메시지 종류가 늘 때마다 같은 메서드를 다시 고쳐야 하므로 수정에 닫혀 있지 않습니다.
