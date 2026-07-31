const test = require("node:test");
const assert = require("node:assert/strict");
const { validateTaskInput } = require("../validation.js");

test("공백 입력 거부", () => {
  assert.equal(validateTaskInput("   ").valid, false);
});

test("앞뒤 공백 제거", () => {
  assert.equal(validateTaskInput("  알고리즘  ").value, "알고리즘");
});

test("40자 허용", () => {
  assert.equal(validateTaskInput("가".repeat(40)).valid, true);
});

test("41자 거부", () => {
  assert.equal(validateTaskInput("가".repeat(41)).valid, false);
});

