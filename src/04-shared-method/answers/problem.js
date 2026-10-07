class User {
  constructor(email) {
    this.email = email;
  }

  buy(item) {
    return `${this.email} buys ${item.name}`;
  }
}

const u1 = new User("a@shop.com");
const u2 = new User("b@shop.com");
console.log(u1.buy({ name: "청바지" }));
console.log(u1.buy === u2.buy);
console.log(u1.buy === User.prototype.buy);
