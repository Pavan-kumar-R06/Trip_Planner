const crypto = require("crypto");

function getAuthSecret() {
  return process.env.JWT_SECRET || "trip-planner-dev-secret";
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

function comparePassword(password, storedHash) {
  if (!storedHash || typeof storedHash !== "string") return false;

  const [algorithm, salt, hash] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) return false;

  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  const actual = Buffer.from(derived.toString("hex"), "hex");

  try {
    return crypto.timingSafeEqual(actual, expected);
  } catch (_error) {
    return false;
  }
}

function createToken(payload, secret = getAuthSecret()) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
}

function verifyToken(token, secret = getAuthSecret()) {
  if (!token || typeof token !== "string") {
    throw new Error("Token is required");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [header, payload, signature] = parts;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  }

  throw new Error("Invalid token");
}

module.exports = {
  getAuthSecret,
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
};
