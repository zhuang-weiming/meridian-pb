/* Generate per-shot English narration via local Kokoro TTS. (v3)
 * - usage: node tts.js [shots12.json]   (default shots.json)
 * - sentence-level synthesis at natural speed 1.0 (no time pressure)
 * - 0.8s silence between sentences (user: breath pauses)
 * - per-shot voice override (s.voice || cfg.voice)
 * - writes <ttsDir>/<id>.mp3 + <ttsDir>/timings.json (per-sentence start/dur for exact SRT) */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CFG = process.argv[2] || "shots.json";
const cfgDoc = JSON.parse(fs.readFileSync(__dirname + "/" + CFG, "utf8"));
const shots = cfgDoc.shots;
const TTS_DIR = path.join(__dirname, cfgDoc.ttsDir || "tts");
fs.mkdirSync(TTS_DIR, { recursive: true });
const URL_ = cfgDoc.ttsUrl || "http://localhost:8880/v1/audio/speech";
const GAP = 0.8; // silence between sentences (seconds)

function durOf(f) {
  return parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString().trim());
}

async function synth(text, out, voice) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "kokoro", voice: voice, input: text, response_format: "mp3", speed: 1.0 })
  });
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
}

// split on ". "/"? "/“! ” followed by a capital — decimals ("31.2") never match
function sentences(text) {
  return text.split(/(?<=[.!?])\s+(?=[A-Z"'‘“(\d])/).map(s => s.trim()).filter(Boolean);
}

(async () => {
  const tmp = path.join(TTS_DIR, "_tmp");
  fs.mkdirSync(tmp, { recursive: true });
  const gapFile = path.join(tmp, "_gap.mp3");
  execSync(`ffmpeg -y -v error -f lavfi -i anullsrc=r=24000:cl=mono -t ${GAP} -c:a libmp3lame -q:a 4 "${gapFile}"`);
  const gapDur = durOf(gapFile);

  const timings = {};
  for (const s of shots) {
    const voice = s.voice || cfgDoc.voice || "bm_george";
    const sents = sentences(s.narration);
    // integrity: every word of the narration must land in exactly one sentence
    const wc = t => (t.match(/[A-Za-z0-9][A-Za-z0-9'’\-]*/g) || []).length;
    const total0 = wc(s.narration), covered = sents.reduce((a, x) => a + wc(x), 0);
    if (covered !== total0) throw new Error(`${s.id}: sentence split lost words (${covered}/${total0})`);
    const parts = [];
    let t = 0;
    for (let i = 0; i < sents.length; i++) {
      const f = path.join(tmp, `${s.id}_${i}.mp3`);
      await synth(sents[i], f, voice);
      const d = durOf(f);
      parts.push({ text: sents[i], start: +t.toFixed(3), dur: +d.toFixed(3), file: f });
      t += d;
      if (i < sents.length - 1) t += gapDur;
    }
    const list = path.join(tmp, `${s.id}.txt`);
    const lines = [];
    parts.forEach((p, i) => {
      lines.push(`file '${p.file}'`);
      if (i < parts.length - 1) lines.push(`file '${gapFile}'`);
    });
    fs.writeFileSync(list, lines.join("\n"));
    const out = path.join(TTS_DIR, `${s.id}.mp3`);
    execSync(`ffmpeg -y -v error -f concat -safe 0 -i "${list}" -c:a libmp3lame -q:a 2 "${out}"`);
    const total = durOf(out);
    timings[s.id] = { audioDur: +total.toFixed(3), gap: GAP, voice, sentences: parts.map(p => ({ text: p.text, start: p.start, dur: p.dur })) };
    const wpm = Math.round((s.narration.match(/[A-Za-z0-9][A-Za-z0-9'’\-]*/g) || []).length / (total / 60));
    console.log(`${s.id}: ${total.toFixed(2)}s (${sents.length} sentences, ${voice}) wpm=${wpm}`);
  }
  fs.writeFileSync(path.join(TTS_DIR, "timings.json"), JSON.stringify(timings, null, 2));
  console.log("timings.json written");
  process.exit(0);
})();
