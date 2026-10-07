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

class SavingsAccount extends BankAccount {
  constructor(name, money) {
    super(name, money);
    this.years = 0;
  }

  addInterest(rate) {
    this.setBalance(
      this.getBalance() * (1 + rate * this.years),
    );
  }

  transfer(money, anotherAccount) {
    const fee = money * 0.005;
    if (this.getBalance() - money - fee < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - fee);
      super.transfer(money, anotherAccount);
    }
  }
}

class DonationAccount extends BankAccount {
  constructor(name, money, rate) {
    super(name, money);
    this.rate = rate;
  }

  donate() {
    this.setBalance(this.getBalance() * (1 - this.rate));
  }

  transfer(money, anotherAccount) {
    const fee = money * 0.002;
    if (this.getBalance() - money - fee < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - fee);
      super.transfer(money, anotherAccount);
    }
  }
}

const tom = new BankAccount("Tom", 1_000_000);
const jerry = new SavingsAccount("Jerry", 1_000_000);
const kate = new DonationAccount("Kate", 1_000_000, 0.1);
const alice = new SavingsAccount("Alice", 1_000_000);
const vacation = new BankAccount("Vacation", 0);

const members = [tom, jerry, kate, alice];
members.forEach((account) => {
  account.transfer(800_000, vacation);
});

console.log(tom.getBalance()); // 출력: 200000
console.log(jerry.getBalance()); // 출력: 196000
console.log(kate.getBalance()); // 출력: 198400
console.log(alice.getBalance()); // 출력: 196000
console.log(vacation.getBalance()); // 출력: 3200000
