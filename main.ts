// One Word, One Username, One Reward
// Writes a single username word to /output/entry.txt.
// No dependencies; plain JavaScript syntax so it also parses under plain node --check.
const fs = require("node:fs");
const path = require("node:path");

const WORD = "Wobble";

function main() {
  // Gate: exactly one word, 1-30 characters, no whitespace at all.
  if (typeof WORD !== "string" || WORD.length < 1 || WORD.length > 30) {
    throw new Error("word must be 1-30 characters, got length " + WORD.length);
  }
  if (/\s/.test(WORD)) {
    throw new Error("word must contain no whitespace");
  }
  if (WORD.trim() !== WORD || WORD.split(/\s+/).length !== 1) {
    throw new Error("word must be exactly one token");
  }
  if (!/^[A-Za-z]+$/.test(WORD)) {
    throw new Error("word must be letters only");
  }
  const outDir = "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "entry.txt");
  fs.writeFileSync(outFile, WORD, "utf8");
  fs.chmodSync(outFile, 0o644);
}

main();
