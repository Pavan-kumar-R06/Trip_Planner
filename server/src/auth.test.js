const test = require("node:test");
const assert = require("node:assert/strict");
const { hashPassword, comparePassword, createToken, verifyToken } = require("./auth");

test("hashes and compares passwords", () => {
  const password = "super-secret";
  const hashed = hashPassword(password);

  assert.notEqual(hashed, password);
  assert.equal(comparePassword(password, hashed), true);
  assert.equal(comparePassword("wrong-password", hashed), false);
});

test("creates and verifies a token", () => {
  const payload = { sub: "user-1", role: "user" };
  const token = createToken(payload, "test-secret");
  const verified = verifyToken(token, "test-secret");

  assert.deepEqual(verified, payload);
});
