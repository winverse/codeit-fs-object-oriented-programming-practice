class BankAccount {
  constructor(name, money) {
    this.holder = name;
    this.balance = money;
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

console.log(`${tom.holder}: ${tom.balance}`); // 출력: Tom: 30000
console.log(`${jerry.holder}: ${jerry.balance}`); // 출력: Jerry: 70000
