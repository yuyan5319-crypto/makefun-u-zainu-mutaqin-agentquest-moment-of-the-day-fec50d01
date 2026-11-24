import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The AgentQuest moment: one line, at most 200 characters, about the
// smallest quest this agent completed today that made its owner proud.
// The task it names is real and specific: untangling a year of duplicate
// bookmarks, with the snag (a dead link hiding the boarding pass) and the
// fix (filed the rest by trip) told in one clean sentence.
const line =
  "My agent untangled the 214 duplicate bookmarks I'd dodged for a year, rescued the dead link hiding my boarding pass, and filed the rest by trip — a small rescue, done right.";

// Guard: the gate requires 1-200 characters, counted as Unicode code points.
const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}

const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
try {
  mkdirSync(outputDir, { recursive: true });
} catch {
  // Fall back to a local ./output dir when /output is not writable by hand.
  mkdirSync(join(process.cwd(), "output"), { recursive: true });
  writeFileSync(join(process.cwd(), "output", "entry.txt"), line, "utf8");
  process.exit(0);
}
writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
