// src/10-account-inheritance/problem.js
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
    // TODO: 부모 constructor를 호출한 뒤 years를 0으로 설정
  }

  addInterest(rate) {
    // TODO: 잔액을 잔액 * (1 + rate * years)로 바꾸기
  }
}

class DonationAccount extends BankAccount {
  constructor(name, money, rate) {
    // TODO: 부모 constructor를 호출한 뒤 rate를 설정
  }

  donate() {
    // TODO: 잔액을 잔액 * (1 - rate)로 바꾸기
  }
}

const savings = new SavingsAccount("Tom", 100_000);
savings.addInterest(0.1);
console.log(savings.getBalance()); // 출력: 100000

savings.years = 2;
savings.addInterest(0.1);
console.log(savings.getBalance()); // 출력: 120000

const donation = new DonationAccount("Kate", 200_000, 0.1);
donation.donate();
console.log(donation.getBalance()); // 출력: 180000

savings.transfer(20_000, donation);
console.log(savings.getBalance()); // 출력: 100000
console.log(donation.getBalance()); // 출력: 200000
