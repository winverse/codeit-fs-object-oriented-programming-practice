# 10. 상속으로 계좌 종류 추가하기 해설

`SavingsAccount`와 `DonationAccount`는 `extends BankAccount`로 잔액 관리와 입금·출금·이체를 물려받고, 각자 필요한 상태와 메서드만 더합니다. 자식 클래스의 constructor에서는 `this`를 쓰기 전에 `super(name, money)`로 부모 constructor를 먼저 호출해 `holder`와 `#balance`를 설정한 뒤, `this.years = 0`이나 `this.rate = rate`처럼 자식의 고유 상태를 설정합니다. `#balance`는 `BankAccount` 본문에서만 쓸 수 있으므로, `addInterest()`와 `donate()`는 상속받은 `getBalance()`로 잔액을 읽고 `setBalance()`로 새 잔액을 저장합니다. `years`가 0일 때 `addInterest(0.1)`은 잔액에 `1 + 0.1 * 0`, 곧 1을 곱하므로 잔액이 그대로이고, `years`를 2로 바꾼 뒤에는 1.2를 곱해 120000이 됩니다.
