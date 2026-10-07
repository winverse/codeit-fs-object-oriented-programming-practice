// src/11-account-polymorphism/problem.js
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

  // TODO: give를 부모의 transfer를 오버라이딩하는 메서드로 바꾸고,
  // 수수료만 여기서 처리한 뒤 실제 이체는 부모 메서드에 맡기기
  give(money, anotherAccount) {
    const fee = money * 0.005;
    if (this.getBalance() - money - fee < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - money - fee);
      anotherAccount.deposit(money);
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

  // TODO: send를 부모의 transfer를 오버라이딩하는 메서드로 바꾸고,
  // 수수료만 여기서 처리한 뒤 실제 이체는 부모 메서드에 맡기기
  send(money, anotherAccount) {
    const fee = money * 0.002;
    if (this.getBalance() - money - fee < 0) {
      console.log("Insufficient balance");
    } else {
      this.setBalance(this.getBalance() - money - fee);
      anotherAccount.deposit(money);
    }
  }
}

const tom = new BankAccount("Tom", 1_000_000);
const jerry = new SavingsAccount("Jerry", 1_000_000);
const kate = new DonationAccount("Kate", 1_000_000, 0.1);
const alice = new SavingsAccount("Alice", 1_000_000);
const vacation = new BankAccount("Vacation", 0);

// TODO: 네 줄의 이체 호출을 배열과 반복문 하나로 줄이기
tom.transfer(800_000, vacation);
jerry.give(800_000, vacation);
kate.send(800_000, vacation);
alice.give(800_000, vacation);

console.log(tom.getBalance()); // 출력: 200000
console.log(jerry.getBalance()); // 출력: 196000
console.log(kate.getBalance()); // 출력: 198400
console.log(alice.getBalance()); // 출력: 196000
console.log(vacation.getBalance()); // 출력: 3200000
