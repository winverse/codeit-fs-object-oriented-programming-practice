// src/07-job-inheritance/problem.js
class Character {
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

  getStatus() {
    return `${this.name} | HP:${this.hp}/${this.maxHp} MP:${this.mp} Potion:${this.potionCount}`;
  }
}

class Rogue extends Character {
  shadowStrike(target) {
    // TODO:
    // mp가 10 미만이면 false 반환
    // 아니면 mp를 10 차감하고 target에게 attackPower * 2 + 7 피해, true 반환
  }
}

class Archer extends Character {
  piercingArrow(target) {
    // TODO:
    // mp가 12 미만이면 false 반환
    // 아니면 mp를 12 차감하고 target에게 attackPower + 25 피해, true 반환
  }
}

const rogue = new Rogue({
  name: "도적",
  maxHp: 100,
  mp: 40,
  attackPower: 14,
  potionCount: 1,
});
const archer = new Archer({
  name: "궁수",
  maxHp: 95,
  mp: 30,
  attackPower: 11,
  potionCount: 1,
});

console.log(rogue.shadowStrike(archer)); // 출력: true (궁수 HP: 60, 도적 MP: 30)
console.log(archer.piercingArrow(rogue)); // 출력: true (도적 HP: 64, 궁수 MP: 18)
archer.piercingArrow(rogue); // 도적 HP: 28, 궁수 MP: 6
// MP가 부족하므로 false를 반환합니다.
console.log(archer.piercingArrow(rogue)); // 출력: false
console.log(rogue.usePotion()); // 출력: true (도적 HP: 58, 도적 Potion: 0)

rogue.shadowStrike(archer); // 궁수 HP: 25, 도적 MP: 20
rogue.shadowStrike(archer); // 궁수 HP: 0, 도적 MP: 10
rogue.shadowStrike(archer); // 궁수 HP: 0, 도적 MP: 0
// MP가 부족하므로 false를 반환합니다.
console.log(rogue.shadowStrike(archer)); // 출력: false

console.log(rogue.getStatus()); // 출력: 도적 | HP:58/100 MP:0 Potion:0
console.log(archer.getStatus()); // 출력: 궁수 | HP:0/95 MP:6 Potion:1
