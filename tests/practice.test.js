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

function readSource(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

// 문제 파일을 출력 없이 실행한 뒤 최상위에 선언한 클래스·함수·변수를 이름으로 꺼냅니다
function loadDeclarations(relativePath, names) {
  const source = readSource(relativePath);
  const context = vm.createContext({ console: { log() {} } });
  return vm.runInContext(`${source}\n;({ ${names.join(", ")} });`, context);
}

// loadDeclarations와 같지만, 꺼낸 뒤에 호출한 console.log 출력을 logs 배열에 모읍니다
function loadDeclarationsWithLogs(relativePath, names) {
  const logs = [];
  const source = readSource(relativePath);
  const context = vm.createContext({
    console: { log: (...values) => logs.push(values.join(" ")) },
  });
  const declarations = vm.runInContext(
    `${source}\n;({ ${names.join(", ")} });`,
    context,
  );
  // 문제 파일 끝의 실행 코드가 남긴 출력은 지웁니다
  logs.length = 0;
  return { ...declarations, logs };
}

// 클래스 prototype에 직접 정의한 메서드 이름을 constructor를 빼고 꺼냅니다
function ownMethods(Class) {
  return Object.getOwnPropertyNames(Class.prototype).filter(
    (name) => name !== "constructor",
  );
}

// 주석을 뺀 문제 파일 코드를 읽습니다
function readCode(relativePath) {
  return readSource(relativePath).replace(/\/\/.*$/gm, "");
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

// 수수료가 있는 자식 계좌의 transfer를 잔액이 넉넉할 때와 모자랄 때로 나눠 확인합니다
function checkTransferFee(BankAccount, createAccount, fee) {
  const account = createAccount(10_000);
  const name = account.constructor.name;
  const target = new BankAccount("받는 계좌", 0);

  // 부모의 transfer가 호출되는지 세려고 잠시 감쌉니다
  const parentTransfer = BankAccount.prototype.transfer;
  let parentCalls = 0;
  BankAccount.prototype.transfer = function (...args) {
    parentCalls += 1;
    return parentTransfer.apply(this, args);
  };
  try {
    account.transfer(2_000, target);
  } finally {
    BankAccount.prototype.transfer = parentTransfer;
  }

  assert.equal(
    target.getBalance(),
    2_000,
    `${name}의 transfer 메서드는 받는 계좌에 보낸 금액만큼 입금해야 합니다`,
  );
  assert.equal(
    account.getBalance(),
    10_000 - 2_000 - fee,
    `${name}의 transfer 메서드는 보낸 금액과 수수료 ${fee}원을 함께 빼야 합니다`,
  );
  assert.equal(
    parentCalls,
    1,
    `${name}의 transfer 메서드는 실제 이체를 super.transfer()로 부모 메서드에 맡겨야 합니다`,
  );

  const poor = createAccount(2_000);
  const untouched = new BankAccount("받는 계좌", 0);
  poor.transfer(2_000, untouched);
  assert.equal(
    poor.getBalance(),
    2_000,
    `잔액이 보낸 금액과 수수료를 합한 것보다 적으면 ${name}의 transfer 메서드는 수수료도 빼지 않아야 합니다`,
  );
  assert.equal(
    untouched.getBalance(),
    0,
    `잔액이 모자라면 ${name}의 transfer 메서드는 입금하지 않아야 합니다`,
  );
}

test("01 상품 라벨", () => {
  const { product } = loadDeclarations("src/01-product-label/problem.js", [
    "product",
  ]);
  const jeans = {
    name: "청바지",
    price: 50_000,
    getLabel: product.getLabel,
  };
  assert.equal(
    jeans.getLabel(),
    "청바지(50000원)",
    "getLabel 메서드는 product 변수 이름이나 정해 둔 값 대신 this로 호출한 객체의 name과 price를 읽어야 합니다",
  );

  assert.deepEqual(run("src/01-product-label/problem.js"), ["스웨터(30000원)"]);
});

test("02 회원 상태", () => {
  const { createMember } = loadDeclarations("src/02-member-state/problem.js", [
    "createMember",
  ]);
  const member = createMember("테스트", 1);
  const other = createMember("비교", 5);
  assert.deepEqual(
    { name: member.name, level: member.level },
    { name: "테스트", level: 1 },
    "createMember가 반환한 객체에는 전달받은 name과 level이 프로퍼티로 들어 있어야 합니다",
  );

  member.levelUp();
  assert.equal(
    member.level,
    2,
    "levelUp 메서드는 this로 호출한 객체의 level 프로퍼티를 1 올려야 합니다",
  );
  assert.equal(
    other.level,
    5,
    "한 객체의 levelUp이 다른 객체의 level을 바꾸지 않아야 합니다",
  );
  assert.equal(
    other.getInfo(),
    "비교 - Lv.5",
    "getInfo 메서드는 this로 호출한 객체의 name과 level로 문자열을 만들어야 합니다",
  );

  assert.deepEqual(run("src/02-member-state/problem.js"), [
    "철수 - Lv.2",
    "영희 - Lv.3",
  ]);
});

test("03 장바구니 합계", () => {
  const { Cart } = loadDeclarations("src/03-cart-total/problem.js", ["Cart"]);
  assert.equal(
    new Cart().getTotalPrice(),
    0,
    "상품이 없으면 getTotalPrice 메서드는 0을 반환해야 합니다",
  );

  const cart = new Cart();
  const sweater = { name: "스웨터", price: 30_000 };
  cart.addItem(sweater);
  assert.ok(
    Array.isArray(cart.items),
    "Cart 인스턴스에는 상품 목록 배열 items 프로퍼티가 있어야 합니다",
  );
  assert.deepEqual(
    [...cart.items],
    [sweater],
    "addItem 메서드는 this.items 배열에 상품을 추가해야 합니다",
  );
  assert.equal(
    new Cart().getTotalPrice(),
    0,
    "한 장바구니에 담은 상품이 다른 장바구니에 섞이지 않아야 합니다",
  );
  assert.equal(
    cart.getTotalPrice(),
    30_000,
    "getTotalPrice 메서드는 items에 담긴 상품 가격의 합을 반환해야 합니다",
  );

  assert.deepEqual(run("src/03-cart-total/problem.js"), ["80000"]);
});

test("04 공유 메서드", () => {
  assert.deepEqual(run("src/04-shared-method/problem.js"), [
    "a@shop.com buys 청바지",
    "true",
    "true",
  ]);
});

test("05 할인 가격 라벨", () => {
  assert.deepEqual(run("src/05-discount-label/problem.js"), [
    "재킷: 100000원",
    "재킷: 80000원",
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

  const { Warrior, Mage } = loadDeclarations("src/06-battle/problem.js", [
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

test("07 계좌 이름", () => {
  const { BankAccount } = loadDeclarations("src/07-account-naming/problem.js", [
    "BankAccount",
  ]);
  assert.deepEqual(
    Object.keys(new BankAccount("테스트", 1_000)).sort(),
    ["balance", "holder"],
    "프로퍼티 a, b의 이름을 balance, holder 가운데 하는 일에 맞는 것으로 바꿔야 합니다",
  );
  assert.deepEqual(
    Object.getOwnPropertyNames(BankAccount.prototype).sort(),
    ["constructor", "deposit", "transfer", "withdraw"],
    "메서드 add, sub, move의 이름을 deposit, transfer, withdraw 가운데 하는 일에 맞는 것으로 바꿔야 합니다",
  );

  const account = new BankAccount("테스트", 1_000);
  assert.equal(
    account.holder,
    "테스트",
    "holder에는 계좌 주인의 이름이 들어 있어야 합니다",
  );
  assert.equal(
    account.balance,
    1_000,
    "balance에는 계좌의 잔액이 들어 있어야 합니다",
  );
  account.deposit(500);
  assert.equal(
    account.balance,
    1_500,
    "deposit은 잔액을 늘리는 메서드여야 합니다",
  );
  account.withdraw(300);
  assert.equal(
    account.balance,
    1_200,
    "withdraw는 잔액을 줄이는 메서드여야 합니다",
  );
  const other = new BankAccount("상대", 0);
  account.transfer(200, other);
  assert.deepEqual(
    [account.balance, other.balance],
    [1_000, 200],
    "transfer는 내 잔액을 줄이고 상대 계좌의 잔액을 늘리는 메서드여야 합니다",
  );

  assert.deepEqual(run("src/07-account-naming/problem.js"), [
    "Insufficient balance",
    "Tom: 30000",
    "Jerry: 70000",
  ]);
});

test("08 계좌 캡슐화", () => {
  const { BankAccount } = loadDeclarations(
    "src/08-account-encapsulation/problem.js",
    ["BankAccount"],
  );
  const negativeError = {
    message: "You cannot set negative number for balance",
  };

  const account = new BankAccount("테스트", 1_000);
  assert.deepEqual(
    Object.keys(account),
    ["holder"],
    "잔액은 public 프로퍼티 balance가 아니라 private field #balance에 저장해야 합니다",
  );
  assert.equal(
    account.getBalance(),
    1_000,
    "getBalance 메서드는 #balance 값을 반환해야 합니다",
  );
  assert.throws(
    () => account.setBalance(-1),
    negativeError,
    "setBalance 메서드는 음수를 받으면 You cannot set negative number for balance 오류를 던져야 합니다",
  );
  assert.equal(
    account.getBalance(),
    1_000,
    "setBalance 메서드가 음수를 거부하면 잔액이 바뀌지 않아야 합니다",
  );
  assert.doesNotThrow(
    () => account.setBalance(0),
    "setBalance 메서드는 0 이상이면 오류 없이 저장해야 합니다",
  );
  assert.equal(
    account.getBalance(),
    0,
    "setBalance 메서드는 0 이상이면 #balance에 저장해야 합니다",
  );
  assert.throws(
    () => new BankAccount("음수", -1),
    negativeError,
    "constructor도 setBalance()로 잔액을 저장해 처음 잔액이 음수이면 거부해야 합니다",
  );

  const tom = new BankAccount("Tom", 1_000);
  tom.deposit(500);
  assert.equal(
    tom.getBalance(),
    1_500,
    "deposit 메서드는 잔액을 늘려야 합니다",
  );
  tom.withdraw(2_000);
  assert.equal(
    tom.getBalance(),
    1_500,
    "잔액이 모자라면 withdraw 메서드는 잔액을 바꾸지 않아야 합니다",
  );
  tom.withdraw(500);
  assert.equal(
    tom.getBalance(),
    1_000,
    "withdraw 메서드는 잔액을 줄여야 합니다",
  );

  const received = [];
  try {
    tom.transfer(300, { deposit: (money) => received.push(money) });
  } catch {
    // 상대 계좌의 #balance를 직접 바꾸면 여기서 오류가 납니다
  }
  assert.deepEqual(
    received,
    [300],
    "transfer 메서드는 상대 계좌의 deposit()으로 입금해야 합니다",
  );
  assert.equal(
    tom.getBalance(),
    700,
    "transfer 메서드는 보낸 금액만큼 내 잔액을 줄여야 합니다",
  );

  assert.deepEqual(run("src/08-account-encapsulation/problem.js"), [
    "Insufficient balance",
    "30000",
    "70000",
    "You cannot set negative number for balance",
    "30000",
  ]);
});

test("09 직업 상속", () => {
  assert.deepEqual(run("src/09-job-inheritance/problem.js"), [
    "true",
    "true",
    "false",
    "true",
    "false",
    "도적 | HP:58/100 MP:0 Potion:0",
    "궁수 | HP:0/95 MP:6 Potion:1",
  ]);

  const { Character, Rogue, Archer } = loadDeclarations(
    "src/09-job-inheritance/problem.js",
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

test("10 계좌 상속", () => {
  const { BankAccount, SavingsAccount, DonationAccount } = loadDeclarations(
    "src/10-account-inheritance/problem.js",
    ["BankAccount", "SavingsAccount", "DonationAccount"],
  );

  const savings = new SavingsAccount("저축", 1_000);
  assert.equal(
    savings.getBalance(),
    1_000,
    "SavingsAccount의 constructor는 name과 money를 부모 constructor에 넘겨야 합니다",
  );
  assert.deepEqual(
    Object.keys(savings),
    ["holder", "years"],
    "SavingsAccount의 constructor는 부모 constructor를 호출한 뒤 years 프로퍼티를 설정해야 합니다",
  );
  assert.equal(savings.years, 0, "years의 처음 값은 0이어야 합니다");
  assert.deepEqual(
    Object.getOwnPropertyNames(SavingsAccount.prototype),
    ["constructor", "addInterest"],
    "SavingsAccount에는 addInterest만 두고 나머지 메서드는 BankAccount에서 물려받습니다",
  );
  savings.addInterest(0.25);
  assert.equal(
    savings.getBalance(),
    1_000,
    "years가 0이면 addInterest 메서드는 잔액을 바꾸지 않아야 합니다",
  );
  savings.years = 2;
  savings.addInterest(0.25);
  assert.equal(
    savings.getBalance(),
    1_500,
    "addInterest(rate) 메서드는 잔액을 잔액 * (1 + rate * years)로 바꿔야 합니다",
  );

  const donation = new DonationAccount("기부", 1_000, 0.25);
  assert.equal(
    donation.getBalance(),
    1_000,
    "DonationAccount의 constructor는 name과 money를 부모 constructor에 넘겨야 합니다",
  );
  assert.deepEqual(
    Object.keys(donation),
    ["holder", "rate"],
    "DonationAccount의 constructor는 부모 constructor를 호출한 뒤 rate 프로퍼티를 설정해야 합니다",
  );
  assert.equal(
    donation.rate,
    0.25,
    "rate에는 전달받은 기부 비율이 들어 있어야 합니다",
  );
  assert.deepEqual(
    Object.getOwnPropertyNames(DonationAccount.prototype),
    ["constructor", "donate"],
    "DonationAccount에는 donate만 두고 나머지 메서드는 BankAccount에서 물려받습니다",
  );
  donation.donate();
  assert.equal(
    donation.getBalance(),
    750,
    "donate 메서드는 잔액을 잔액 * (1 - rate)로 바꿔야 합니다",
  );

  for (const account of [savings, donation]) {
    assert.ok(
      account instanceof BankAccount,
      `${account.constructor.name}는 BankAccount를 상속해야 합니다`,
    );
  }

  assert.deepEqual(run("src/10-account-inheritance/problem.js"), [
    "100000",
    "120000",
    "180000",
    "100000",
    "200000",
  ]);
});

test("11 계좌 다형성", () => {
  const { BankAccount, SavingsAccount, DonationAccount } = loadDeclarations(
    "src/11-account-polymorphism/problem.js",
    ["BankAccount", "SavingsAccount", "DonationAccount"],
  );

  for (const [Account, oldName] of [
    [SavingsAccount, "give"],
    [DonationAccount, "send"],
  ]) {
    assert.equal(
      oldName in Account.prototype,
      false,
      `${Account.name}의 ${oldName}는 부모와 같은 이름의 transfer로 바꿔야 합니다`,
    );
    assert.equal(
      Object.hasOwn(Account.prototype, "transfer"),
      true,
      `${Account.name}에 부모의 transfer를 오버라이딩하는 transfer 메서드를 두어야 합니다`,
    );
  }

  // 주석은 빼고 호출부의 코드만 확인합니다
  const code = readSource("src/11-account-polymorphism/problem.js").replace(
    /\/\/.*$/gm,
    "",
  );
  assert.doesNotMatch(
    code,
    /\.(give|send)\(/,
    "give와 send 호출을 모두 transfer 호출로 바꿔야 합니다",
  );
  assert.equal(
    code.match(/(?<!super)\.transfer\(/g)?.length,
    1,
    "네 줄의 이체 호출을 배열과 반복문 하나로 줄여야 합니다",
  );

  checkTransferFee(
    BankAccount,
    (money) => new SavingsAccount("저축", money),
    10,
  );
  checkTransferFee(
    BankAccount,
    (money) => new DonationAccount("기부", money, 0.1),
    4,
  );

  assert.deepEqual(run("src/11-account-polymorphism/problem.js"), [
    "200000",
    "196000",
    "198400",
    "196000",
    "3200000",
  ]);
});

test("12 싱글턴 로거", () => {
  const { Logger } = loadDeclarations("src/12-singleton-logger/problem.js", [
    "Logger",
  ]);
  assert.deepEqual(
    Object.getOwnPropertyNames(Logger).filter(
      (name) => !["length", "name", "prototype"].includes(name),
    ),
    ["getInstance"],
    "인스턴스는 클래스 밖에서 읽거나 바꿀 수 없게 static과 #이 함께 붙은 필드에 담고, static 메서드는 getInstance만 둡니다",
  );

  const logger1 = Logger.getInstance();
  assert.ok(
    logger1 instanceof Logger,
    "getInstance 메서드는 Logger 인스턴스를 반환해야 합니다",
  );
  assert.equal(
    Logger.getInstance(),
    logger1,
    "getInstance 메서드는 호출할 때마다 같은 인스턴스를 반환해야 합니다",
  );
  assert.throws(
    () => new Logger(),
    { message: "이미 인스턴스가 존재합니다. getInstance()를 사용하십시오." },
    "인스턴스가 이미 있을 때 new Logger()를 직접 호출하면 constructor가 오류를 던져야 합니다",
  );
  assert.equal(
    Logger.getInstance(),
    logger1,
    "막힌 new Logger() 호출 뒤에도 getInstance 메서드는 처음 인스턴스를 반환해야 합니다",
  );

  assert.deepEqual(run("src/12-singleton-logger/problem.js"), [
    "Logger 생성",
    "[LOG] 서버 시작",
    "[LOG] 사용자 로그인",
    "true",
    "이미 인스턴스가 존재합니다. getInstance()를 사용하십시오.",
  ]);
});

test("13 알림 팩토리", () => {
  const { NotificationFactory, EmailNotification, SmsNotification } =
    loadDeclarations("src/13-notification-factory/problem.js", [
      "NotificationFactory",
      "EmailNotification",
      "SmsNotification",
    ]);

  const email = NotificationFactory.create("email");
  assert.ok(
    email instanceof EmailNotification,
    'create("email")은 EmailNotification 객체를 반환해야 합니다',
  );
  assert.ok(
    NotificationFactory.create("sms") instanceof SmsNotification,
    'create("sms")는 SmsNotification 객체를 반환해야 합니다',
  );
  assert.notEqual(
    NotificationFactory.create("email"),
    email,
    "create 메서드는 호출할 때마다 새 알림 객체를 만들어 반환해야 합니다",
  );
  assert.throws(
    () => NotificationFactory.create("push"),
    { message: "지원하지 않는 채널입니다: push" },
    "등록되지 않은 채널이면 create 메서드는 오류를 던져야 합니다",
  );

  assert.deepEqual(run("src/13-notification-factory/problem.js"), [
    "[EMAIL] 회원가입이 완료되었습니다.",
    "[SMS] 인증번호는 1234입니다.",
    "지원하지 않는 채널입니다: push",
  ]);
});

test("14 배송비 전략", () => {
  const { ShippingCostCalculator } = loadDeclarations(
    "src/14-shipping-strategy/problem.js",
    ["ShippingCostCalculator"],
  );

  const calculator = new ShippingCostCalculator({
    calculate: (weight) => weight * 10,
  });
  assert.deepEqual(
    Object.keys(calculator),
    [],
    "배송비 계산 전략은 public 프로퍼티가 아니라 private field에 담아야 합니다",
  );
  assert.equal(
    calculator.getCost(3),
    30,
    "getCost 메서드는 배송비 계산을 전략 객체의 calculate(weight)에 맡겨야 합니다",
  );
  calculator.setShippingStrategy({ calculate: (weight) => weight * 100 });
  assert.equal(
    calculator.getCost(3),
    300,
    "setShippingStrategy 메서드로 전략을 바꾸면 getCost 메서드가 새 전략으로 계산해야 합니다",
  );

  assert.deepEqual(run("src/14-shipping-strategy/problem.js"), [
    "[배송비] 4000원",
    "[배송비] 7600원",
  ]);
});

test("15 채널 옵저버", () => {
  const { YouTubeChannel } = loadDeclarations(
    "src/15-channel-observer/problem.js",
    ["YouTubeChannel"],
  );

  const channel = new YouTubeChannel();
  assert.deepEqual(
    Object.keys(channel),
    [],
    "구독자 목록은 public 프로퍼티가 아니라 private field에 담아야 합니다",
  );
  assert.deepEqual(
    Object.getOwnPropertyNames(YouTubeChannel.prototype),
    ["constructor", "subscribe", "unsubscribe", "uploadVideo"],
    "구독자에게 알리는 메서드는 클래스 밖에서 부를 수 없게 #notifyAll()로 둡니다",
  );

  const first = [];
  const second = [];
  const firstSubscriber = { update: (title) => first.push(title) };
  const secondSubscriber = { update: (title) => second.push(title) };
  channel.subscribe(firstSubscriber);
  channel.subscribe(secondSubscriber);
  channel.uploadVideo("1강");
  assert.deepEqual(
    [first, second],
    [["1강"], ["1강"]],
    "uploadVideo 메서드는 구독한 모든 객체의 update에 영상 제목을 넘겨야 합니다",
  );

  channel.unsubscribe(secondSubscriber);
  channel.uploadVideo("2강");
  assert.deepEqual(
    second,
    ["1강"],
    "unsubscribe로 해지한 구독자에게는 다음 영상부터 알리지 않아야 합니다",
  );
  assert.deepEqual(
    first,
    ["1강", "2강"],
    "해지하지 않은 구독자에게는 계속 알려야 합니다",
  );

  assert.deepEqual(run("src/15-channel-observer/problem.js"), [
    "[YouTube] 영상 업로드: 자바스크립트 기초 강좌 1강",
    "[김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강",
    "[이영희님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강",
    "[YouTube] 영상 업로드: 자바스크립트 기초 강좌 2강",
    "[김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 2강",
  ]);
});

test("16 학생 성적표", () => {
  const { Student, GradeBook, ReportCardPrinter, logs } =
    loadDeclarationsWithLogs("src/16-student-responsibility/problem.js", [
      "Student",
      "GradeBook",
      "ReportCardPrinter",
    ]);

  assert.deepEqual(
    ownMethods(Student),
    ["getName", "getMajor"],
    "Student에는 학생 정보를 돌려주는 getName과 getMajor만 남겨야 합니다",
  );
  const student = new Student("테스트", "수학과");
  assert.deepEqual(
    [student.getName(), student.getMajor()],
    ["테스트", "수학과"],
    "Student의 getName과 getMajor는 constructor로 받은 이름과 전공을 반환해야 합니다",
  );

  assert.deepEqual(
    ownMethods(GradeBook),
    ["addGrade", "getAverage"],
    "GradeBook에는 성적을 기록하는 addGrade와 평균을 구하는 getAverage를 두어야 합니다",
  );
  const gradeBook = new GradeBook();
  assert.deepEqual(
    Object.keys(gradeBook),
    [],
    "성적 목록은 public 프로퍼티가 아니라 GradeBook의 private field에 담아야 합니다",
  );
  gradeBook.addGrade(2);
  gradeBook.addGrade(3);
  assert.equal(
    gradeBook.getAverage(),
    2.5,
    "GradeBook의 getAverage는 addGrade로 기록한 성적의 평균을 반환해야 합니다",
  );

  new ReportCardPrinter().print(
    { getName: () => "가짜 학생", getMajor: () => "가짜 학과" },
    { getAverage: () => 3 },
  );
  assert.deepEqual(
    logs,
    ["[성적표] 가짜 학생 (가짜 학과)", "평균 학점: 3"],
    "ReportCardPrinter의 print는 받은 student와 gradeBook의 메서드로 이름·전공·평균을 읽어 출력해야 합니다",
  );

  assert.deepEqual(run("src/16-student-responsibility/problem.js"), [
    "[성적표] 김코드 (컴퓨터공학과)",
    "평균 학점: 4",
  ]);
});

test("17 메시지 알림", () => {
  const problem = "src/17-message-open-closed/problem.js";
  const { KakaoMessage, MessageNotificationManager, logs } =
    loadDeclarationsWithLogs(problem, [
      "KakaoMessage",
      "MessageNotificationManager",
    ]);

  assert.deepEqual(
    ownMethods(KakaoMessage),
    ["getNotificationText"],
    "KakaoMessage의 getShortMessage는 다른 메시지와 같은 이름의 getNotificationText로 바꿔야 합니다",
  );

  assert.doesNotMatch(
    MessageNotificationManager.toString(),
    /instanceof|KakaoMessage|TextMessage|InstagramMessage/,
    "MessageNotificationManager는 메시지 종류를 확인하지 않고 모든 메시지에 같은 메서드를 호출해야 합니다",
  );

  // 문제 파일에 없는 새 메시지 종류도 고치지 않고 출력되는지 확인합니다
  const manager = new MessageNotificationManager();
  manager.addMessage({ getNotificationText: () => "[새 메신저] 테스트" });
  manager.displayAll();
  assert.deepEqual(
    logs,
    ["[새 메신저] 테스트"],
    "displayAll은 getNotificationText를 가진 어떤 메시지 객체든 그 결과를 출력해야 합니다",
  );

  assert.deepEqual(run(problem), [
    "[카카오톡] 이영희: 점심 먹었어?",
    "[문자] 김철수: 택배가 도착했습니다",
    "[인스타그램] 박민수: 사진을 좋아합니다",
  ]);
});

test("18 도형 치환", () => {
  const problem = "src/18-shape-substitution/problem.js";
  const { Rectangle, Square, resizeToBanner } = loadDeclarations(problem, [
    "Rectangle",
    "Square",
    "resizeToBanner",
  ]);

  assert.equal(
    Square.prototype instanceof Rectangle,
    false,
    "Square는 Rectangle을 상속하지 않아야 합니다",
  );
  assert.deepEqual(
    ownMethods(Square),
    ["setSize", "getArea"],
    "Square에는 한 변의 길이를 바꾸는 setSize와 넓이를 구하는 getArea만 두어야 합니다",
  );

  const square = new Square(3);
  assert.deepEqual(
    Object.keys(square),
    [],
    "한 변의 길이는 public 프로퍼티가 아니라 private field에 담아야 합니다",
  );
  assert.equal(
    square.getArea(),
    9,
    "Square의 getArea는 constructor로 받은 한 변의 길이로 넓이를 구해야 합니다",
  );
  square.setSize(4);
  assert.equal(
    square.getArea(),
    16,
    "Square의 setSize로 한 변의 길이를 바꾸면 getArea도 바뀐 길이로 계산해야 합니다",
  );

  assert.equal(
    resizeToBanner(new Rectangle(1, 1)),
    20,
    "Rectangle과 resizeToBanner는 고치지 않아야 합니다",
  );
  assert.doesNotMatch(
    readCode(problem),
    /resizeToBanner\(square\)/,
    "square를 resizeToBanner에 넘기는 줄을 지워야 합니다",
  );

  assert.deepEqual(run(problem), ["20", "20", "36"]);
});

test("19 프린터 인터페이스", () => {
  const problem = "src/19-printer-interface/problem.js";
  const { SamsungPrinter, LgPrinter, printAll, scanAll, logs } =
    loadDeclarationsWithLogs(problem, [
      "SamsungPrinter",
      "LgPrinter",
      "printAll",
      "scanAll",
    ]);

  assert.deepEqual(
    ownMethods(LgPrinter),
    ["print"],
    "스캔 기능이 없는 LgPrinter에서는 scan 메서드를 지워야 합니다",
  );
  assert.deepEqual(
    ownMethods(SamsungPrinter),
    ["print", "scan"],
    "SamsungPrinter의 print와 scan은 그대로 두어야 합니다",
  );
  assert.doesNotMatch(
    readCode(problem),
    /runOffice/,
    "runOffice는 printAll과 scanAll로 나눈 뒤 지워야 합니다",
  );

  // print만 가진 객체와 scan만 가진 객체를 넘겨 확인합니다
  printAll([{ print: (file) => logs.push(`인쇄 ${file}`) }], "a.txt");
  scanAll([{ scan: (paper) => logs.push(`스캔 ${paper}`) }], "b.txt");
  assert.deepEqual(
    logs,
    ["인쇄 a.txt", "스캔 b.txt"],
    "printAll은 받은 객체마다 print(file)만, scanAll은 받은 객체마다 scan(paper)만 호출해야 합니다",
  );

  assert.deepEqual(run(problem), [
    "[삼성] 회의록.docx 인쇄",
    "[LG] 회의록.docx 인쇄",
    "[삼성] 영수증 스캔",
  ]);
});

test("20 보고서 변환기", () => {
  const problem = "src/20-exporter-inversion/problem.js";
  const { Report, MarkdownExporter, HtmlExporter, ExportController, logs } =
    loadDeclarationsWithLogs(problem, [
      "Report",
      "MarkdownExporter",
      "HtmlExporter",
      "ExportController",
    ]);

  for (const Exporter of [MarkdownExporter, HtmlExporter]) {
    assert.deepEqual(
      ownMethods(Exporter),
      ["convert"],
      `${Exporter.name}의 변환 메서드는 같은 이름의 convert로 바꿔야 합니다`,
    );
  }

  assert.doesNotMatch(
    ExportController.toString(),
    /MarkdownExporter|HtmlExporter|toMarkdown|toHtml/,
    "ExportController에는 변환기 클래스 이름이나 변환기마다 다른 메서드 이름이 남지 않아야 합니다",
  );

  // 문제 파일에 없는 변환기를 넘겨도 그 convert 결과를 출력하는지 확인합니다
  const controller = new ExportController({
    convert: (report) => `[가짜] ${report.getTitle()}`,
  });
  assert.deepEqual(
    Object.keys(controller),
    [],
    "변환기는 public 프로퍼티가 아니라 private field에 담아야 합니다",
  );
  controller.run(new Report("제목", "본문"));
  assert.deepEqual(
    logs,
    ["[가짜] 제목"],
    "ExportController의 run은 constructor로 받은 변환기의 convert(report) 결과를 출력해야 합니다",
  );

  assert.deepEqual(run(problem), [
    "# 3분기 매출",
    "매출이 10% 늘었습니다.",
    "<h1>3분기 매출</h1><p>매출이 10% 늘었습니다.</p>",
  ]);
});
