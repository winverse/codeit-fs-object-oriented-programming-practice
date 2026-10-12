class Warrior {
  constructor({
    name,
    maxHp,
    mp,
    attackPower,
    potionCount,
  }) {
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
    if (this.mp < 10) {
      return false;
    }
    this.mp -= 10;
    target.takeDamage(this.attackPower * 2);
    return true;
  }

  usePotion() {
    if (this.potionCount === 0) {
      return false;
    }
    this.hp = Math.min(this.hp + 30, this.maxHp);
    this.potionCount -= 1;
    return true;
  }

  getStatus() {
    return `${this.name} | HP:${this.hp}/${this.maxHp} MP:${this.mp} Potion:${this.potionCount}`;
  }
}

class Mage {
  constructor({
    name,
    maxHp,
    mp,
    attackPower,
    potionCount,
  }) {
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
    if (this.potionCount === 0) {
      return false;
    }
    this.hp = Math.min(this.hp + 30, this.maxHp);
    this.potionCount -= 1;
    return true;
  }

  castFireball(target) {
    if (this.mp < 20) {
      return false;
    }
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
  potionCount: 2,
});
const mage = new Mage({
  name: "마법사",
  maxHp: 90,
  mp: 60,
  attackPower: 8,
  potionCount: 0,
});

warrior.attack(mage); // 마법사 HP: 72
console.log(mage.castFireball(warrior)); // 출력: true (전사 HP: 100, 마법사 MP: 40)
console.log(warrior.powerStrike(mage)); // 출력: true (마법사 HP: 36, 전사 MP: 20)
console.log(warrior.usePotion()); // 출력: true (전사 HP: 130, 전사 Potion: 1)
warrior.usePotion(); // 전사 HP: 140, 전사 Potion: 0

console.log(warrior.getStatus()); // 출력: 전사 | HP:140/140 MP:20 Potion:0
console.log(mage.getStatus()); // 출력: 마법사 | HP:36/90 MP:40 Potion:0
// 포션이 없으므로 false를 반환합니다.
console.log(mage.usePotion()); // 출력: false
console.log(warrior.usePotion()); // 출력: false

mage.attack(warrior); // 전사 HP: 132
mage.castFireball(warrior); // 전사 HP: 92, 마법사 MP: 20
mage.castFireball(warrior); // 전사 HP: 52, 마법사 MP: 0
// MP가 부족하므로 false를 반환합니다.
console.log(mage.castFireball(warrior)); // 출력: false

warrior.powerStrike(mage); // 마법사 HP: 0, 전사 MP: 10
warrior.powerStrike(mage); // 마법사 HP: 0, 전사 MP: 0
// MP가 부족하므로 false를 반환합니다.
console.log(warrior.powerStrike(mage)); // 출력: false

console.log(warrior.getStatus()); // 출력: 전사 | HP:52/140 MP:0 Potion:0
console.log(mage.getStatus()); // 출력: 마법사 | HP:0/90 MP:0 Potion:0
