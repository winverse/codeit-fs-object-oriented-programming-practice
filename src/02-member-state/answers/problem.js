function createMember(name, level) {
  const member = {
    name,
    level,
    levelUp() {
      this.level += 1;
    },
    getInfo() {
      return `${this.name} - Lv.${this.level}`;
    },
  };
  return member;
}

const m1 = createMember("철수", 1);
const m2 = createMember("영희", 3);

m1.levelUp();

console.log(m1.getInfo()); // 출력: 철수 - Lv.2
console.log(m2.getInfo()); // 출력: 영희 - Lv.3
