import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
// 터미널에서 실행해도 문제 파일 출력에 색 코드가 붙지 않도록 FORCE_COLOR를 넘기지 않습니다
const { FORCE_COLOR, ...env } = process.env;

function run(relativePath) {
  return execFileSync(process.execPath, [relativePath], {
    cwd: root,
    encoding: "utf8",
    env: { ...env, NO_COLOR: "1" },
  })
    .trim()
    .split("\n");
}

function loadClasses(relativePath, names) {
  const source = readFileSync(
    new URL(`../${relativePath}`, import.meta.url),
    "utf8",
  );
  const context = vm.createContext({ console: { log() {} } });
  return vm.runInContext(`${source}\n;({ ${names.join(", ")} });`, context);
}

// 상대의 takeDamage로 받은 피해를 확인합니다
function checkHits(hits, method, amount) {
  assert.ok(
    hits.length > 0,
    `${method} 메서드는 상대의 hp를 직접 바꾸지 않고 상대의 takeDamage를 호출해야 합니다`,
  );
  assert.equal(
    hits.reduce((sum, value) => sum + value, 0),
    amount,
    `공격력이 10일 때 ${method} 메서드의 피해량은 ${amount}이어야 합니다`,
  );
}

// MP를 쓰는 스킬을 MP가 딱 맞을 때와 1 부족할 때 호출해 확인합니다
function checkSkill(Job, skill, cost, amount) {
  const stats = {
    name: "테스트",
    maxHp: 100,
    attackPower: 10,
    potionCount: 1,
  };

  const hits = [];
  const ready = new Job({ ...stats, mp: cost });
  assert.equal(
    ready[skill]({ takeDamage: (value) => hits.push(value) }),
    true,
    `MP가 정확히 ${cost}이면 ${skill} 메서드는 true를 반환해야 합니다`,
  );
  assert.equal(ready.mp, 0, `${skill} 메서드는 MP를 ${cost} 차감해야 합니다`);
  checkHits(hits, skill, amount);

  const misses = [];
  const tired = new Job({ ...stats, mp: cost - 1 });
  assert.equal(
    tired[skill]({ takeDamage: (value) => misses.push(value) }),
    false,
    `MP가 ${cost} 미만이면 ${skill} 메서드는 false를 반환해야 합니다`,
  );
  assert.equal(
    tired.mp,
    cost - 1,
    `MP가 부족하면 ${skill} 메서드는 MP를 바꾸지 않아야 합니다`,
  );
  assert.equal(
    misses.length,
    0,
    `MP가 부족하면 ${skill} 메서드는 피해를 주지 않아야 합니다`,
  );
}

test("01 상품 라벨", () => {
  assert.deepEqual(run("src/01-product-label/problem.js"), ["스웨터(30000원)"]);
});

test("02 공유 메서드", () => {
  assert.deepEqual(run("src/02-shared-method/problem.js"), [
    "a@shop.com buys 청바지",
    "true",
    "true",
  ]);
});

test("03 장바구니 합계", () => {
  assert.deepEqual(run("src/03-cart-total/problem.js"), ["80000"]);
});

test("04 할인 가격 라벨", () => {
  assert.deepEqual(run("src/04-discount-label/problem.js"), [
    "재킷: 100000원",
    "재킷: 80000원",
  ]);
});

test("05 인스턴스 상태", () => {
  assert.deepEqual(run("src/05-member-state/problem.js"), [
    "철수 - Lv.2",
    "영희 - Lv.3",
  ]);
});

test("06 전투 객체", () => {
  assert.deepEqual(run("src/06-battle/problem.js"), [
    "true",
    "true",
    "true",
    "전사 | HP:140/140 MP:20 Potion:0",
    "마법사 | HP:36/90 MP:40 Potion:0",
    "false",
    "false",
    "false",
    "false",
    "전사 | HP:52/140 MP:0 Potion:0",
    "마법사 | HP:0/90 MP:0 Potion:0",
  ]);

  const { Warrior, Mage } = loadClasses("src/06-battle/problem.js", [
    "Warrior",
    "Mage",
  ]);
  const stats = {
    name: "테스트",
    maxHp: 100,
    mp: 100,
    attackPower: 10,
    potionCount: 1,
  };
  const warrior = new Warrior(stats);
  const mage = new Mage(stats);

  assert.equal(
    "castFireball" in warrior,
    false,
    "Warrior에는 castFireball을 두지 않습니다",
  );
  assert.equal(
    "powerStrike" in mage,
    false,
    "Mage에는 powerStrike를 두지 않습니다",
  );

  for (const Job of [Warrior, Mage]) {
    const hits = [];
    new Job(stats).attack({ takeDamage: (value) => hits.push(value) });
    checkHits(hits, `${Job.name}의 attack`, 10);

    const character = new Job(stats);
    character.takeDamage(150);
    assert.equal(
      character.hp,
      0,
      `${Job.name}의 takeDamage 메서드는 hp를 0보다 작게 만들지 않아야 합니다`,
    );
    assert.equal(
      character.usePotion(),
      true,
      `포션이 있으면 ${Job.name}의 usePotion 메서드는 true를 반환해야 합니다`,
    );
    assert.equal(
      character.hp,
      30,
      `${Job.name}의 usePotion 메서드는 hp를 30 회복해야 합니다`,
    );
    assert.equal(
      character.potionCount,
      0,
      `${Job.name}의 usePotion 메서드는 포션을 1개 줄여야 합니다`,
    );
    assert.equal(
      character.usePotion(),
      false,
      `포션이 없으면 ${Job.name}의 usePotion 메서드는 false를 반환해야 합니다`,
    );
    assert.equal(
      character.hp,
      30,
      `포션이 없으면 ${Job.name}의 usePotion 메서드는 hp를 바꾸지 않아야 합니다`,
    );

    const hurt = new Job(stats);
    hurt.takeDamage(10);
    hurt.usePotion();
    assert.equal(
      hurt.hp,
      100,
      `${Job.name}의 usePotion 메서드는 hp를 maxHp보다 크게 만들지 않아야 합니다`,
    );
  }

  checkSkill(Warrior, "powerStrike", 10, 20);
  checkSkill(Mage, "castFireball", 20, 40);
});

test("07 직업 상속", () => {
  assert.deepEqual(run("src/07-job-inheritance/problem.js"), [
    "true",
    "true",
    "false",
    "true",
    "false",
    "도적 | HP:58/100 MP:0 Potion:0",
    "궁수 | HP:0/95 MP:6 Potion:1",
  ]);

  const { Character, Rogue, Archer } = loadClasses(
    "src/07-job-inheritance/problem.js",
    ["Character", "Rogue", "Archer"],
  );

  for (const [Job, skill] of [
    [Rogue, "shadowStrike"],
    [Archer, "piercingArrow"],
  ]) {
    assert.deepEqual(
      Object.getOwnPropertyNames(Job.prototype),
      ["constructor", skill],
      `${Job.name}에는 ${skill}만 두고 나머지 동작은 Character에서 물려받습니다`,
    );

    const stats = {
      name: "테스트",
      maxHp: 100,
      mp: 30,
      attackPower: 10,
      potionCount: 1,
    };
    assert.deepEqual(
      { ...new Job(stats) },
      { ...new Character(stats) },
      `${Job.name}의 상태는 Character의 constructor가 설정해야 합니다`,
    );
  }

  checkSkill(Rogue, "shadowStrike", 10, 27);
  checkSkill(Archer, "piercingArrow", 12, 35);
});
