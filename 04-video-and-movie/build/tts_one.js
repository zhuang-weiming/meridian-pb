/* Re-TTS a single shot and update timings.json in place.
 * usage: node tts_one.js shots12.json S2b */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CFG = process.argv[2] || "shots12.json";
const ONLY = process.argv[3];
if (!ONLY) throw new Error("usage: node tts_one.js <cfg> <shotId>");
const cfgDoc = JSON.parse(fs.readFileSync(__dirname + "/" + CFG, "utf8"));
const shot = cfgDoc.shots.find(s => s.id === ONLY);
if (!shot) throw new Error("shot not found: " + ONLY);
const TTS_DIR = path.join(__dirname, cfgDoc.ttsDir || "tts");
const URL_ = cfgDoc.ttsUrl || "http://localhost:8880/v1/audio/speech";
const GAP = 0.8;
const voice = shot.voice || cfgDoc.voice || "bm_george";

function durOf(f) {
  return parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString().trim());
}
async function synth(text, out, v) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "kokoro", voice: v, input: text, response_format: "mp3", speed: 1.0 })
  });
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
}
const sentences = text => text.split(/(?<=[.!?])\s+(?=[A-Z"'“(\d])/).map(s => s.trim()).filter(Boolean);

(async () => {
  const tmp = path.join(TTS_DIR, "_tmp");
  fs.mkdirSync(tmp, { recursive: true });
  const gapFile = path.join(tmp, "_gap.mp3");
  if (!fs.existsSync(gapFile)) {
    execSync(`ffmpeg -y -v error -f lavfi -i anullsrc=r=24000:cl=mono -t ${GAP} -c:a libmp3lame -q:a 4 "${gapFile}"`);
  }
  const gapDur = durOf(gapFile);
  const sents = sentences(shot.narration);
  const wc = t => (t.match(/[A-Za-z0-9][A-Za-z0-9'’\-]*/g) || []).length;
  const total0 = wc(shot.narration), covered = sents.reduce((a, x) => a + wc(x), 0);
  if (covered !== total0) throw new Error(`${shot.id}: sentence split lost words (${covered}/${total0})`);
  const parts = [];
  let t = 0;
  for (let i = 0; i < sents.length; i++) {
    const f = path.join(tmp, `${shot.id}_${i}.mp3`);
    await synth(sents[i], f, voice);
    const d = durOf(f);
    parts.push({ text: sents[i], start: +t.toFixed(3), dur: +d.toFixed(3), file: f });
    t += d;
    if (i < sents.length - 1) t += gapDur;
  }
  const list = path.join(tmp, `${shot.id}.txt`);
  const lines = [];
  parts.forEach((p, i) => { lines.push(`file '${p.file}'`); if (i < parts.length - 1) lines.push(`file '${gapFile}'`); });
  fs.writeFileSync(list, lines.join("\n"));
  const out = path.join(TTS_DIR, `${shot.id}.mp3`);
  execSync(`ffmpeg -y -v error -f concat -safe 0 -i "${list}" -c:a libmp3lame -q:a 2 "${out}"`);
  const total = durOf(out);
  const timPath = path.join(TTS_DIR, "timings.json");
  const tim = JSON.parse(fs.readFileSync(timPath, "utf8"));
  tim[shot.id] = { audioDur: +total.toFixed(3), gap: GAP, voice, sentences: parts.map(p => ({ text: p.text, start: p.start, dur: p.dur })) };
  fs.writeFileSync(timPath, JSON.stringify(tim, null, 2));
  console.log(`${shot.id}: ${total.toFixed(2)}s (${sents.length} sentences, ${voice})`);
})();
