# 11. 다형성으로 이체 코드 줄이기 해설

`give`와 `send`를 부모와 같은 이름의 `transfer`로 바꾸면 세 클래스가 모두 `transfer(money, anotherAccount)`라는 같은 인터페이스를 제공합니다. 그러면 호출부는 계좌의 종류를 확인하지 않고 배열의 모든 계좌에 `account.transfer(800_000, vacation)`만 호출하면 되고, 실제로는 각 객체의 클래스에 정의한 `transfer`가 실행됩니다. 자식의 `transfer`는 수수료를 계산해 보낸 금액과 수수료를 함께 낼 잔액이 있는지 먼저 확인하고, 잔액이 충분할 때만 수수료를 뺀 뒤 실제 이체는 `super.transfer(money, anotherAccount)`로 부모 메서드에 맡깁니다. 이렇게 하면 잔액 확인·출금·상대 계좌 입금 코드는 `BankAccount`에 한 번만 남습니다. 확인 없이 수수료부터 빼고 `super.transfer()`를 호출하면, 잔액이 모자란 계좌는 부모가 이체를 거부해도 수수료만 빠집니다.
