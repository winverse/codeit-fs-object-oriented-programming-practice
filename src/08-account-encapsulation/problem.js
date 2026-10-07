// src/08-account-encapsulation/problem.js
// TODO: balance를 private field #balance로 바꾸고,
// constructor와 deposit, withdraw, transfer가 getBalance()와 setBalance()로 잔액을 읽고 바꾸게 하기
// transfer는 상대 계좌의 잔액을 상대 계좌의 deposit()으로 늘리기
class BankAccount {
  constructor(name, money) {
    this.holder = name;
    this.balance = money;
  }

  getBalance() {
    // TODO
  }

  setBalance(money) {
    // TODO: 0 이상이면 저장하고, 음수면 오류 던지기
  }

  deposit(money) {
    this.balance += money;
  }

  withdraw(money) {
    if (this.balance - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.balance -= money;
    }
  }

  transfer(money, anotherAccount) {
    if (this.balance - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.balance -= money;
      anotherAccount.balance += money;
    }
  }
}

const tom = new BankAccount("Tom", 50_000);
const jerry = new BankAccount("Jerry", 30_000);

tom.deposit(20_000);
tom.withdraw(100_000); // 출력: Insufficient balance
tom.transfer(40_000, jerry);

console.log(tom.getBalance()); // 출력: 30000
console.log(jerry.getBalance()); // 출력: 70000

try {
  tom.setBalance(-5_000);
} catch (error) {
  console.log(error.message); // 출력: You cannot set negative number for balance
}

console.log(tom.getBalance()); // 출력: 30000
