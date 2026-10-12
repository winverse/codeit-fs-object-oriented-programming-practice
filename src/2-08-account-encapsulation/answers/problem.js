class BankAccount {
  #balance;

  constructor(name, money) {
    this.holder = name;
    this.setBalance(money);
  }

  getBalance() {
    return this.#balance;
  }

  setBalance(money) {
    if (money >= 0) {
      this.#balance = money;
    } else {
      throw new Error(
        "You cannot set negative number for balance",
      );
    }
  }

  deposit(money) {
    this.setBalance(this.getBalance() + money);
  }

  withdraw(money) {
    if (this.getBalance() - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - money);
    }
  }

  transfer(money, anotherAccount) {
    if (this.getBalance() - money < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - money);
      anotherAccount.deposit(money);
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
