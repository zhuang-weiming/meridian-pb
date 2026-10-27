/* Assemble the film. (v3)
 * - usage: node assemble.js [shots12.json]   (default shots.json)
 * - audio plays to its natural end (no hard atrim); 2.5s silent tail per scene
 * - slot falls back to 0.5 + audioDur + 2.5 when not set in config
 * - subtitles built from per-sentence TTS timings (exact sync) */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CFG = process.argv[2] || "shots.json";
const cfg = JSON.parse(fs.readFileSync(__dirname + "/" + CFG, "utf8"));
const TTS_DIR = path.join(__dirname, cfg.ttsDir || "tts");
const CLIPS = path.join(__dirname, cfg.clipsDir || "clips");
const OUT = path.join(__dirname, cfg.outDir || "out");
fs.mkdirSync(OUT, { recursive: true });
const tim = JSON.parse(fs.readFileSync(path.join(TTS_DIR, "timings.json"), "utf8"));

const offsets = JSON.parse(fs.readFileSync(path.join(CLIPS, "offsets.json"), "utf8"));
const FONT = "/System/Library/Fonts/Helvetica.ttc";

function webmOf(id) { return path.join(CLIPS, id, fs.readdirSync(path.join(CLIPS, id)).find(f => f.endsWith(".webm"))); }
function durOf(f) { return parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString().trim()); }
function esc(s) { return s.replace(/\\/g, "\\\\").replace(/:/g, "\\:").replace(/'/g, "\u2019"); }

/* ── SRT from per-sentence TTS timings (exact) ── */
function buildSrt() {
  const cues = [];
  let filmT = 0;
  const LEAD = 0.5;
  for (const s of cfg.shots) {
    const t = tim[s.id];
    for (const sent of t.sentences) {
      const start = filmT + LEAD + sent.start;
      const end = start + sent.dur + 0.25;
      // wrap long sentences into <=2 lines of ~50 chars, split proportionally
      const words = sent.text.split(/\s+/);
      const lines = [];
      let cur = [];
      for (const w of words) {
        cur.push(w);
        if (cur.join(" ").length > 50) { lines.push(cur); cur = []; }
      }
      if (cur.length) lines.push(cur);
      if (lines.length <= 1) {
        cues.push([start, end, sent.text.trim()]);
      } else {
        // split cue at the nearest word boundary to the midpoint by time share
        const total = words.length;
        let acc = 0, splitAt = 1, bestDiff = Infinity;
        for (let i = 0; i < words.length; i++) {
          acc += words[i].length + 1;
          const diff = Math.abs(acc / (sent.text.length + 1) - 0.5);
          if (diff < bestDiff) { bestDiff = diff; splitAt = i + 1; }
        }
        cues.push([start, end,
          words.slice(0, splitAt).join(" ") + "\n" + words.slice(splitAt).join(" ")]);
      }
    }
    filmT += s.slot != null ? s.slot : +(tim[s.id].audioDur + 3.0).toFixed(2);
  }
  const fmt = x => {
    const h = String(Math.floor(x / 3600)).padStart(2, "0");
    const m = String(Math.floor((x % 3600) / 60)).padStart(2, "0");
    const sec = String(Math.floor(x % 60)).padStart(2, "0");
    const ms = String(Math.round((x % 1) * 1000)).padStart(3, "0");
    return `${h}:${m}:${sec},${ms}`;
  };
  return cues.map((c, i) => `${i + 1}\n${fmt(c[0])} --> ${fmt(c[1])}\n${c[2]}\n`).join("\n");
}

(async () => {
  const perShot = [];
  const n = cfg.shots.length;
  cfg.shots.forEach((s, i) => {
    const webm = webmOf(s.id);
    const audio = path.join(TTS_DIR, `${s.id}.mp3`);
    const aDur = tim[s.id].audioDur;
    const slot = s.slot != null ? s.slot : +(aDur + 3.0).toFixed(2);
    const off = offsets[s.id] || 0.5;
    const outMp4 = path.join(OUT, `${s.id}.mp4`);
    const OW = cfg.outW || cfg.width, OH = cfg.outH || cfg.height;
    let vf = `fps=30,scale=${OW}:${OH}:flags=lanczos,setsar=1`;
    // topLabel removed (user: 顶部注释画蛇添足)
    if (i === 0) vf += ",fade=t=in:st=0:d=0.5";
    if (i === n - 1) vf += `,fade=t=out:st=${(slot - 1).toFixed(2)}:d=1`;
    // audio: 0.5s lead, FULL length (no atrim), pad silence to slot
    const af = `[1:a]adelay=500|500,apad=whole_dur=${slot},afade=t=out:st=${(slot - 0.3).toFixed(2)}:d=0.3[a]`;
    const cmd = `ffmpeg -y -v error -ss ${off} -i "${webm}" -i "${audio}" ` +
      `-filter_complex "[0:v]${vf}[v];${af}" ` +
      `-map "[v]" -map "[a]" -t ${slot} -r 30 -c:v libx264 -preset medium -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k "${outMp4}"`;
    execSync(cmd, { stdio: "inherit" });
    const d = durOf(outMp4);
    console.log(`${s.id}: clip ${d.toFixed(2)}s (slot ${slot}s, audio ${aDur.toFixed(2)}s full)`);
    perShot.push(outMp4);
  });

  /* concat */
  const listFile = path.join(OUT, "list.txt");
  fs.writeFileSync(listFile, perShot.map(f => `file '${f}'`).join("\n"));
  const raw = path.join(OUT, "film_raw.mp4");
  execSync(`ffmpeg -y -v error -f concat -safe 0 -i "${listFile}" -c copy "${raw}"`);
  console.log(`concat: ${durOf(raw).toFixed(2)}s`);

  /* global pass: subtitles only (compliance badge removed — user request #6)
   * libass script resolution is 384x288: FontSize/MarginV are in that space,
   * scaled by videoH/288. 14 → ~44px at 900p / ~88px at 1800p (same look as v2).
   * MarginV 16 → ~50px above bottom at 900p (much lower than v2's 200px). */
  const srt = path.join(OUT, "subs.srt");
  fs.writeFileSync(srt, buildSrt());
  const SUB_FS = 14, SUB_MV = 16;
  const final = path.join(__dirname, "..", cfg.film + ".mp4");
  execSync(`ffmpeg -y -v error -i "${raw}" -vf "subtitles='${path.join(OUT, "subs.srt")}':force_style='FontName=Helvetica,FontSize=${SUB_FS},PrimaryColour=&H00FFFFFF,BackColour=&H66000000,BorderStyle=4,MarginV=${SUB_MV}'" ` +
    `-c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a copy "${final}"`);
  console.log(`FINAL: ${final} ${durOf(final).toFixed(2)}s`);
  process.exit(0);
})();
