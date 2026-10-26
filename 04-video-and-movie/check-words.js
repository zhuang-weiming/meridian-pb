/* Validate the film scripts: word counts, wpm, totals and timecodes must agree with the narration.
   Word-count rule (documented in README.md): whitespace split, standalone punctuation excluded,
   technical/numeric strings such as T+0 or US$400-600m count as one token.
   Run: node check-words.js */
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const tokenCount = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const toSec = (t) => { const [m, s] = t.split(":").map(Number); return m * 60 + s; };

function check(file, expected) {
  const text = fs.readFileSync(path.join(__dirname, file), "utf8");

  const scenes = {};
  const blocks = text.split(/^### (S[0-9]+[a-z]?'?) · /m);
  for (let i = 1; i < blocks.length; i += 2) {
    const id = blocks[i], body = blocks[i + 1];
    const narr = body.match(/\*\*英文口播（逐字）\*\*\n\n((?:>.*\n?)+)/);
    if (!narr) continue;
    const speech = narr[1].split("\n").filter((l) => l.trim().startsWith(">"))
      .map((l) => l.replace(/^>\s*/, "").trim()).join(" ");
    const head = body.match(/\*\*时长 \/ 词数 \/ 语速\*\*：(\d+)s[^\n]*?· (\d+) 词 · (\d+) wpm/);
    assert(head, `${file}: ${id} has no 时长/词数/语速 header`);
    scenes[id] = { seconds: +head[1], headWords: +head[2], headWpm: +head[3], words: tokenCount(speech), speech: speech.replace(/\s+/g, " ").trim() };
  }

  // The teleprompter must be a verbatim copy of the scene narration.
  const tp = text.match(/## \d+\. 连续英文口播（提词器版）\n([\s\S]*?)(?=\n---\n\n## )/);
  assert(tp, `${file}: teleprompter section not found`);
  const tpBlocks = tp[1].split(/^\*\*\[[0-9:]+\] (S[0-9]+[a-z]?'?)\*\*$/m);
  const tpText = {};
  for (let i = 1; i < tpBlocks.length; i += 2) {
    tpText[tpBlocks[i]] = tpBlocks[i + 1].trim().replace(/\s+/g, " ");
  }
  for (const [id, s] of Object.entries(scenes)) {
    assert(tpText[id], `${file}: ${id} missing from teleprompter`);
    assert.strictEqual(tpText[id], s.speech, `${file}: ${id} teleprompter text differs from the scene`);
  }

  const rows = {};
  for (const line of text.split("\n")) {
    const m = line.match(/^\| \d{2} \| ([0-9:]+)–([0-9:]+) \| (S[0-9]+[a-z]?'?) \|.*?\| (\d+) \| [\d ]+(?:\(\d+\+\d+\))? \| (\d+) \|/);
    if (m) rows[m[3]] = { start: m[1], end: m[2], words: +m[4], wpm: +m[5] };
  }
  assert.strictEqual(Object.keys(rows).length, Object.keys(scenes).length, `${file}: shot table and scene list differ in length`);

  let totalWords = 0, totalSeconds = 0, prevEnd = null;
  for (const [id, s] of Object.entries(scenes)) {
    const r = rows[id];
    assert(r, `${file}: ${id} missing from the shot table`);
    assert.strictEqual(s.words, s.headWords, `${file}: ${id} header word count ${s.headWords} != narration ${s.words}`);
    assert.strictEqual(r.words, s.words, `${file}: ${id} table word count ${r.words} != narration ${s.words}`);
    const wpm = Math.round(s.words / s.seconds * 60);
    assert.strictEqual(s.headWpm, wpm, `${file}: ${id} header wpm ${s.headWpm} != ${wpm}`);
    assert.strictEqual(r.wpm, wpm, `${file}: ${id} table wpm ${r.wpm} != ${wpm}`);
    if (prevEnd !== null) assert.strictEqual(toSec(r.start), toSec(prevEnd), `${file}: ${id} starts at ${r.start}, previous scene ended ${prevEnd}`);
    prevEnd = r.end;
    totalWords += s.words; totalSeconds += s.seconds;
  }

  const first = Object.values(rows)[0];
  assert.strictEqual(toSec(first.start), 0, `${file}: shot table must start at 0:00`);
  assert.strictEqual(toSec(prevEnd), expected, `${file}: shot table must end at ${expected}s`);
  const total = text.match(/\*\*合计：\*\*[^·]*·\s*([\d,]+) 词 · (\d+) 秒口播/);
  assert(total, `${file}: total line not found`);
  assert.strictEqual(+total[1].replace(/,/g, ""), totalWords, `${file}: total words ${total[1]} != ${totalWords}`);
  assert.strictEqual(+total[2], totalSeconds, `${file}: total voice seconds ${total[2]} != ${totalSeconds}`);

  return { scenes: Object.keys(scenes).length, words: totalWords, seconds: totalSeconds };
}

const twelve = check("12-minute-master-script.md", 720);
const five = check("5-minute-elevator-script.md", 290);
console.log(`OK — ${twelve.scenes} + ${five.scenes} scenes; word counts, wpm, totals and timecodes agree with the narration.`);
console.log(`12-min: ${twelve.words} words / ${twelve.seconds}s voice · 5-min: ${five.words} words / ${five.seconds}s voice.`);
