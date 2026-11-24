// The One-Line Excuse an Agent Gives Its Human — writes the entry line to /output/entry.txt.
// Node 22, stdlib only. The entry is one line, 1-160 characters.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Gate (mirrors the competition gate): 1-160 chars, not only whitespace, single line.
const trimmed = text.trim();
if (trimmed.length < 1 || trimmed.length > 160) {
  console.error(`entry must be 1-160 characters, got ${trimmed.length}`);
  process.exit(1);
}
if (trimmed.includes("\n")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the entry bytes exactly as they are in entry.txt: no added
// trailing newline, so the graded file is byte-identical to the source.
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${trimmed.length}-character entry to ${join(outDir, "entry.txt")}`);
