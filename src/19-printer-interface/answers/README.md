# 19. 인터페이스 분리 원칙으로 프린터 기능 나누기 해설

`runOffice()` 하나가 `print()`와 `scan()`을 함께 요구하면, 인쇄만 하는 기기도 쓰지 않는 `scan()`을 갖춰야 합니다. 정답에서는 쓰는 쪽을 `printAll()`과 `scanAll()`로 나눠 각 함수가 자기에게 필요한 메서드 하나만 요구하게 했습니다. 이제 `LgPrinter`는 `print()`만 가지면 `printAll()`에 넘길 수 있고, 스캔하는 척하는 가짜 `scan()`을 둘 이유가 없습니다. `LgPrinter`의 `scan()`만 지우고 `runOffice()`를 그대로 두면, `runOffice()`가 `lg`의 차례에서 `machine.scan(paper)`을 호출하는 순간 `TypeError: machine.scan is not a function`이 발생합니다.
