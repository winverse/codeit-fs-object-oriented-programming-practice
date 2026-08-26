class User {
  constructor(email) {
    this.email = email;
  }

  buy(item) {
    return `${this.email} buys ${item.name}`;
  }
}

const user1 = new User("a@shop.com");
const user2 = new User("b@shop.com");
console.log(user1.buy({ name: "청바지" }));
console.log(user1.buy === user2.buy);
