class Warrior {
  constructor({ name, maxHp, mp, attackPower, potionCount }) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.mp = mp;
    this.attackPower = attackPower;
    this.potionCount = potionCount;
  }

  takeDamage(amount) {
    this.hp = Math.max(this.hp - amount, 0);
  }

  attack(target) {
    target.takeDamage(this.attackPower);
  }

  powerStrike(target) {
    if (this.mp < 10) return false;
    this.mp -= 10;
    target.takeDamage(this.attackPower * 2);
    return true;
  }

  usePotion() {
    if (this.potionCount === 0) return false;
    this.hp = Math.min(this.hp + 30, this.maxHp);
    this.potionCount -= 1;
    return true;
  }

  getStatus() {
    return `${this.name} | HP:${this.hp}/${this.maxHp} MP:${this.mp} Potion:${this.potionCount}`;
  }
}

class Mage {
  constructor({ name, maxHp, mp, attackPower, potionCount }) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.mp = mp;
    this.attackPower = attackPower;
    this.potionCount = potionCount;
  }

  takeDamage(amount) {
    this.hp = Math.max(this.hp - amount, 0);
  }

  attack(target) {
    target.takeDamage(this.attackPower);
  }

  usePotion() {
    if (this.potionCount === 0) return false;
    this.hp = Math.min(this.hp + 30, this.maxHp);
    this.potionCount -= 1;
    return true;
  }

  castFireball(target) {
    if (this.mp < 20) return false;
    this.mp -= 20;
    target.takeDamage(40);
    return true;
  }

  getStatus() {
    return `${this.name} | HP:${this.hp}/${this.maxHp} MP:${this.mp} Potion:${this.potionCount}`;
  }
}

const warrior = new Warrior({
  name: "전사",
  maxHp: 140,
  mp: 30,
  attackPower: 18,
  potionCount: 1,
});
const mage = new Mage({
  name: "마법사",
  maxHp: 90,
  mp: 60,
  attackPower: 8,
  potionCount: 0,
});

warrior.attack(mage);
mage.castFireball(warrior);
warrior.powerStrike(mage);
warrior.usePotion();

console.log(warrior.getStatus());
console.log(mage.getStatus());
console.log(mage.usePotion());
console.log(warrior.usePotion());
warrior.powerStrike(mage);
warrior.powerStrike(mage);
console.log(warrior.powerStrike(mage));
