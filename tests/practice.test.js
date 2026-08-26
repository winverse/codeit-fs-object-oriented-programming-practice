import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

function run(relativePath) {
  return execFileSync(process.execPath, [relativePath], {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split("\n");
}

test("01 상품 라벨", () => {
  assert.deepEqual(run("src/01-product-label/problem.js"), ["스웨터(30000원)"]);
});

test("02 공유 메서드", () => {
  assert.deepEqual(run("src/02-shared-method/problem.js"), [
    "a@shop.com buys 청바지",
    "true",
  ]);
});

test("03 장바구니 합계", () => {
  assert.deepEqual(run("src/03-cart-total/problem.js"), ["80000"]);
});

test("04 할인 가격 라벨", () => {
  assert.deepEqual(run("src/04-discount-label/problem.js"), [
    "자켓: 100000원",
    "자켓: 80000원",
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
    "전사 | HP:130/140 MP:20 Potion:0",
    "마법사 | HP:36/90 MP:40 Potion:0",
    "false",
    "false",
    "false",
  ]);
});
