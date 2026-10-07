# 12. 싱글턴으로 로거 하나만 쓰기 해설

`#instance`는 static과 #이 함께 붙은 필드이므로 `Logger` 클래스에 하나만 있고 클래스 밖에서는 읽거나 바꿀 수 없습니다. `getInstance()`는 `#instance`가 `null`일 때만 `new Logger()`를 호출하고, 언제나 `#instance`에 저장해 둔 인스턴스를 반환합니다. constructor는 먼저 `#instance`가 이미 있는지 확인해 있으면 오류를 던지고, 없으면 생성 메시지를 출력한 뒤 방금 만든 인스턴스(`this`)를 `#instance`에 저장합니다. 그래서 `getInstance()`를 두 번 호출해도 `Logger 생성`은 한 번만 출력되고 `logger1 === logger2`는 `true`이며, 인스턴스가 있는데 `new Logger()`를 직접 호출하면 constructor의 검사에 막힙니다. constructor에 이 검사가 없으면 `getInstance()`를 거치지 않은 `new Logger()`가 오류 없이 다른 인스턴스를 만들어, 인스턴스가 하나뿐이라는 보장이 깨집니다.
