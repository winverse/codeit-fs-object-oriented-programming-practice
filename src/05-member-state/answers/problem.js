class Member {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  levelUp() {
    this.level += 1;
  }

  getInfo() {
    return `${this.name} - Lv.${this.level}`;
  }
}

const member1 = new Member("철수", 1);
const member2 = new Member("영희", 3);

member1.levelUp();

console.log(member1.getInfo());
console.log(member2.getInfo());
