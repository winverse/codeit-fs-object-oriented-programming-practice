// src/07-account-naming/problem.js
// TODO: 각 프로퍼티와 메서드가 하는 일을 읽고
// a, b, add, sub, move의 이름을 balance, deposit, holder, transfer, withdraw 가운데
// 하는 일에 맞는 이름으로 바꾸기 (파일 끝의 호출부도 함께)
class BankAccount {
  constructor(name, money) {
    this.a = name;
    this.b = money;
  }

  add(money) {
    this.b += money;
  }

  sub(money) {
    if (this.b - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.b -= money;
    }
  }

  move(money, anotherAccount) {
    if (this.b - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.b -= money;
      anotherAccount.b += money;
    }
  }
}

const tom = new BankAccount("Tom", 50_000);
const jerry = new BankAccount("Jerry", 30_000);

tom.add(20_000);
tom.sub(100_000); // 출력: Insufficient balance
tom.move(40_000, jerry);

console.log(`${tom.a}: ${tom.b}`); // 출력: Tom: 30000
console.log(`${jerry.a}: ${jerry.b}`); // 출력: Jerry: 70000
