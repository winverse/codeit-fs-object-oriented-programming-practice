// src/02-shared-method/problem.js
class User {
  constructor(email) {
    this.email = email;
    // TODO: 인스턴스마다 만드는 buy를 class 본문의 메서드로 옮기세요.
    this.buy = function (item) {
      return `${this.email} buys ${item.name}`;
    };
  }
}

const u1 = new User("a@shop.com");
const u2 = new User("b@shop.com");
console.log(u1.buy({ name: "청바지" }));
console.log(u1.buy === u2.buy);
