// src/1-10-member-state/problem.js
function createMember(name, level) {
  const member = {
    // TODO: 받은 name과 level을 같은 이름의 프로퍼티로 넣기
    levelUp() {
      // TODO: this로 자신의 level을 1 올리기
    },
    getInfo() {
      // TODO: this의 name과 level로 "철수 - Lv.2" 형식의 문자열 반환
    },
  };
  return member;
}

const m1 = createMember("철수", 1);
const m2 = createMember("영희", 3);

m1.levelUp();

console.log(m1.getInfo()); // 출력: 철수 - Lv.2
console.log(m2.getInfo()); // 출력: 영희 - Lv.3
