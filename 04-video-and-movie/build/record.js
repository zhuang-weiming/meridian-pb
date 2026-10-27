/* Record per-shot video clips with Playwright. (v4)
 * - usage: node record.js [shots12.json] [shotId]   (config default shots.json)
 * - NO fake cursor / arrows: a single fixed-position red box (wb-hl-box) is
 *   glued to the highlighted element via a rAF loop, so it follows scrolling
 *   and zooming, and always shows all four sides (never clipped by tables).
 * - avatars: "avatar" action fades in an illustrated avatar card with a short
 *   thought bubble (~1/18 of the screen), auto-avoiding the red box;
 *   "avatarOut" fades it out; "ms" auto-fades after N ms.
 * - hover* actions are treated as highlight* (arrows removed).
 * - clickText clicks tabs/rows; card shots: standalone HTML animations.
 * - recordVideo.size = cfg.outW/outH (2x pixels) for HD output.
 * Each clip is recorded slightly long; head is trimmed in assembly. */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const CFG = process.argv[2] || "shots.json";
const ONLY = process.argv[3]; // optional: record a single shot by id
const cfg = JSON.parse(fs.readFileSync(__dirname + "/" + CFG, "utf8"));
const ROOT = path.resolve(__dirname, "..", "..");
const WB = path.join(ROOT, "03-web-page", "rm-workbench.html");
const CJ = path.join(ROOT, "03-web-page", "client-journey.html");
const CLIPS = path.join(__dirname, cfg.clipsDir || "clips");

/* resolve after/at sentence markers -> absolute t */
const timingsPath = path.join(__dirname, cfg.ttsDir || "tts", "timings.json");
if (fs.existsSync(timingsPath)) {
  const tim = JSON.parse(fs.readFileSync(timingsPath, "utf8"));
  for (const s of cfg.shots) {
    const t = tim[s.id];
    if (!t) continue;
    for (const a of s.actions || []) {
      if (a.t == null && (a.after || a.at)) {
        const marker = a.after || a.at;
        const sent = t.sentences.find(x => x.text.includes(marker));
        if (sent) {
          const frac = a.frac != null ? a.frac : (a.after ? 1 : 0);
          a.t = +(sent.start + frac * sent.dur + (a.lag || 0)).toFixed(2);
        } else {
          console.warn(`[warn] ${s.id}: marker not found: "${marker}" (falls back to t=${a.t || 2})`);
          a.t = a.t || 2;
        }
      }
    }
  }
} else if (cfg.shots.some(s => (s.actions || []).some(a => a.after || a.at))) {
  throw new Error("timings.json missing but actions use after/at markers — run tts.js first");
}

const HELPERS = `
  window.__find = (txt, row) => {
    if (!txt) return null;
    const t = txt.toLowerCase();
    let best = null;
    for (const el of document.querySelectorAll('td,th,div,span,h1,h2,h3,h4,li,p,a,section,tr,b,strong,button')) {
      if (el.closest('#wb-hl-box,#wb-avatars')) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ').trim();
      if (own.toLowerCase().includes(t)) {
        const cr = el.getBoundingClientRect();
        if (cr.width < 2 || cr.height < 2) continue; // skip hidden elements (e.g. collapsed sidebar links)
        if (!best || own.length < best.textContent.trim().length) best = el;
      }
    }
    if (!best) return null;
    if (row) best = best.closest('tr') || best.closest('.module-card') || best;
    return best;
  };
  /* single red box, glued to the element; rAF keeps it on scroll/zoom */
  window.__hl = (txt, row) => {
    const el = window.__find(txt, row);
    if (!el) return false;
    window.__hlEl = el;
    document.getElementById('wb-hl-box').style.display = 'block';
    return true;
  };
  window.__hlRect = () => {
    const box = document.getElementById('wb-hl-box');
    if (!window.__hlEl || !document.body.contains(window.__hlEl)) { box.style.display = 'none'; return null; }
    const r = window.__hlEl.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight) { box.style.display = 'none'; return r; }
    box.style.display = 'block';
    const pad = 3;
    box.style.left = (r.left - pad) + 'px';
    box.style.top = (r.top - pad) + 'px';
    box.style.width = (r.width + pad * 2) + 'px';
    box.style.height = (r.height + pad * 2) + 'px';
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  };
  /* proxy box: absolute-positioned div in DOCUMENT coords; rAF follow still works */
  window.__proxy = (r) => {
    let d = document.getElementById('wb-hl-proxy');
    if (!d) { d = document.createElement('div'); d.id = 'wb-hl-proxy'; document.body.appendChild(d); }
    d.style.cssText = 'position:absolute;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;pointer-events:none;';
    window.__hlEl = d;
    document.getElementById('wb-hl-box').style.display = 'block';
    return true;
  };
  /* highlight an entire table column (header + all body cells) as one vertical box */
  window.__hlCol = (txt) => {
    const th = window.__find(txt);
    if (!th) return false;
    const table = th.closest('table');
    if (!table) return false;
    const idx = [...th.parentElement.children].indexOf(th);
    let l = Infinity, r = -Infinity, t = Infinity, b = -Infinity;
    table.querySelectorAll('tr').forEach(tr => {
      const c = tr.children[idx];
      if (!c) return;
      const cr = c.getBoundingClientRect();
      l = Math.min(l, cr.left + scrollX); r = Math.max(r, cr.right + scrollX);
      t = Math.min(t, cr.top + scrollY); b = Math.max(b, cr.bottom + scrollY);
    });
    if (l === Infinity) return false;
    return window.__proxy({ left: l - 5, top: t - 5, width: r - l + 10, height: b - t + 10 });
  };
  /* highlight the union block of two anchors (e.g. first tile .. last tile) */
  window.__hlUnion = (t1, t2) => {
    const e1 = window.__find(t1), e2 = window.__find(t2);
    if (!e1 || !e2) return false;
    const a = e1.closest('.grid-4') || e1.closest('tr') || e1;
    const b = e2.closest('.grid-4') || e2.closest('tr') || e2;
    const r1 = a.getBoundingClientRect(), r2 = b.getBoundingClientRect();
    const l = Math.min(r1.left, r2.left) + scrollX, r = Math.max(r1.right, r2.right) + scrollX;
    const t = Math.min(r1.top, r2.top) + scrollY, bt = Math.max(r1.bottom, r2.bottom) + scrollY;
    return window.__proxy({ left: l - 6, top: t - 6, width: r - l + 12, height: bt - t + 12 });
  };
  window.__hlClear = () => {
    window.__hlEl = null;
    document.getElementById('wb-hl-box').style.display = 'none';
  };
  (function loop() { window.__hlRect(); requestAnimationFrame(loop); })();
  /* avatars: fixed white card + thought bubble, avoids the red box */
  window.__avSpecs = {};
  window.__placeAv = (id) => {
    const card = document.getElementById('wb-av-' + id);
    if (!card) return;
    const spec = window.__avSpecs[id];
    let x = spec.x, y = spec.y;
    const W = card.offsetWidth || 270, H = card.offsetHeight || 230;
    const hl = window.__hlRect();
    for (let i = 0; i < 4; i++) {                       // drop lower until clear of the red box
      if (!hl || x + W < hl.left - 14 || x > hl.right + 14 || y + H < hl.top - 14 || y > hl.bottom + 14) break;
      y = Math.min(hl.bottom + 18, innerHeight - H - 70);
    }
    x = Math.max(10, Math.min(x, innerWidth - W - 10));
    y = Math.max(10, Math.min(y, innerHeight - H - 60));
    card.style.left = x + 'px'; card.style.top = y + 'px';
  };
  window.__avatarIn = (spec) => {
    window.__avSpecs[spec.id] = spec;
    let wrap = document.getElementById('wb-avatars');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'wb-avatars';
      document.body.appendChild(wrap);
    }
    if (document.getElementById('wb-av-' + spec.id)) return;
    const card = document.createElement('div');
    card.id = 'wb-av-' + spec.id;
    card.className = 'wb-av-card';
    card.innerHTML =
      '<div class="wb-av-ava">' + spec.svg + '</div>' +
      '<div class="wb-av-side"><div class="wb-av-bubble">' + spec.bubble + '</div>' +
      (spec.cap ? '<div class="wb-av-cap">' + spec.cap + '</div>' : '') + '</div>';
    wrap.appendChild(card);
    window.__placeAv(spec.id);
    requestAnimationFrame(() => card.classList.add('on'));
    if (spec.ms) setTimeout(() => window.__avatarOut(spec.id), spec.ms);
  };
  window.__avatarOut = (id) => {
    const card = document.getElementById('wb-av-' + id);
    if (!card) return;
    card.classList.remove('on');
    setTimeout(() => card.remove(), 700);
  };
  window.__push = (to, ms) => new Promise(done => {
    const start = performance.now(), from = 100;
    const step = now => {
      const k = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      document.documentElement.style.zoom = (from + (to - from) * e) + '%';
      if (k < 1) requestAnimationFrame(step); else done();
    };
    requestAnimationFrame(step);
  });
`;

const AVATAR_CSS = `
  #wb-hl-box { display: none; position: fixed; z-index: 99998; pointer-events: none;
    border: 3px solid #db0011; border-radius: 5px;
    box-shadow: 0 0 0 3px rgba(219,0,17,.10); background: rgba(219,0,17,.04); }
  #wb-avatars { position: fixed; inset: 0; z-index: 99997; pointer-events: none; }
  .wb-av-card { position: absolute; display: flex; gap: 10px; align-items: center;
    background: #ffffff; border: 1px solid #e3e6ec; border-radius: 14px;
    padding: 12px 14px; box-shadow: 0 10px 30px rgba(16,24,40,.18);
    opacity: 0; transform: translateY(10px);
    transition: opacity .6s ease, transform .6s ease; }
  .wb-av-card.on { opacity: 1; transform: translateY(0); }
  .wb-av-ava { width: 104px; height: 104px; border-radius: 50%; overflow: hidden; flex: 0 0 auto;
    border: 3px solid #db0011; background: #eef1f6; }
  .wb-av-ava svg { display: block; width: 100%; height: 100%; }
  .wb-av-side { display: flex; flex-direction: column; }
  .wb-av-bubble { position: relative; background: #f2f4f8; border: 1px solid #dde3ec;
    border-radius: 12px; padding: 9px 12px; font-size: 15px; font-weight: 650;
    color: #121826; max-width: 128px; line-height: 1.25; }
  .wb-av-bubble:before { content: ""; position: absolute; left: -6px; top: 45%;
    width: 10px; height: 10px; background: #f2f4f8; border-left: 1px solid #dde3ec;
    border-bottom: 1px solid #dde3ec; transform: rotate(45deg); }
  .wb-av-cap { margin-top: 6px; font-size: 10.5px; color: #8a94a6; letter-spacing: .02em; }
`;

/* flat illustrated avatars (schematic, NOT photos) */
const AV = {
  liang: `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
    <rect width="108" height="108" fill="#dfe7f2"/>
    <circle cx="54" cy="44" r="24" fill="#f3c9a5"/>
    <path d="M30 42 Q30 16 54 16 Q78 16 78 42 Q78 30 66 28 Q54 26 44 30 Q32 33 30 42Z" fill="#20242c"/>
    <rect x="36" y="46" width="15" height="9" rx="4.5" fill="none" stroke="#20242c" stroke-width="2.4"/>
    <rect x="57" y="46" width="15" height="9" rx="4.5" fill="none" stroke="#20242c" stroke-width="2.4"/>
    <line x1="51" y1="50" x2="57" y2="50" stroke="#20242c" stroke-width="2.4"/>
    <path d="M46 60 Q54 64 62 60" stroke="#b0713f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M22 108 Q22 74 54 74 Q86 74 86 108Z" fill="#2b3a55"/>
    <path d="M46 74 L54 84 L62 74" fill="#fff"/>
  </svg>`,
  wife: `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
    <rect width="108" height="108" fill="#f6e8e2"/>
    <circle cx="54" cy="44" r="23" fill="#f3c9a5"/>
    <path d="M28 52 Q26 14 54 14 Q82 14 80 52 L74 50 Q76 30 54 28 Q32 30 34 50Z" fill="#3a2a22"/>
    <path d="M28 50 Q26 84 22 96 L36 96 Q30 78 34 54Z" fill="#3a2a22"/>
    <path d="M80 50 Q82 84 86 96 L72 96 Q78 78 74 54Z" fill="#3a2a22"/>
    <circle cx="45" cy="44" r="2.6" fill="#20242c"/>
    <circle cx="63" cy="44" r="2.6" fill="#20242c"/>
    <path d="M47 57 Q54 61 61 57" stroke="#c76a54" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M24 108 Q24 76 54 76 Q84 76 84 108Z" fill="#8c2f39"/>
    <path d="M47 76 L54 86 L61 76" fill="#fff"/>
  </svg>`,
  son: `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
    <rect width="108" height="108" fill="#e3ecdf"/>
    <circle cx="54" cy="45" r="23" fill="#f3c9a5"/>
    <path d="M31 46 Q30 20 54 20 Q78 20 77 46 Q74 32 54 31 Q34 32 31 46Z" fill="#171a20"/>
    <circle cx="45" cy="45" r="2.6" fill="#20242c"/>
    <circle cx="63" cy="45" r="2.6" fill="#20242c"/>
    <path d="M46 58 Q54 63 62 58" stroke="#b0713f" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M25 108 Q25 77 54 77 Q83 77 83 108Z" fill="#1f6b52"/>
    <path d="M47 77 L54 87 L61 77" fill="#fff"/>
  </svg>`,
  elder: `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
    <rect width="108" height="108" fill="#efe6f4"/>
    <circle cx="54" cy="45" r="23" fill="#f0c8a4"/>
    <path d="M32 40 Q34 22 54 22 Q74 22 76 40 Q70 30 54 30 Q38 30 32 40Z" fill="#cfd2d8"/>
    <circle cx="54" cy="18" r="9" fill="#cfd2d8"/>
    <circle cx="45" cy="45" r="2.6" fill="#20242c"/>
    <circle cx="63" cy="45" r="2.6" fill="#20242c"/>
    <path d="M47 57 Q54 60 61 57" stroke="#a8755a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M24 108 Q24 77 54 77 Q84 77 84 108Z" fill="#5c5578"/>
    <path d="M47 77 L54 86 L61 77" fill="#fff"/>
    <path d="M38 50 Q42 49 44 51 M70 50 Q66 49 64 51" stroke="#8a8f99" stroke-width="1.6" fill="none"/>
  </svg>`
};

async function injectHelpers(page) {
  await page.evaluate((css) => {
    const st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    // hide the left menu: content only
    const extra = document.createElement("style");
    extra.textContent = `#app { grid-template-columns: minmax(0, 1fr) !important; }
      .sidebar { display: none !important; }
      .main, main { max-width: none !important; }`;
    document.head.appendChild(extra);
    const box = document.createElement("div");
    box.id = "wb-hl-box";
    document.body.appendChild(box);
  }, AVATAR_CSS);
  await page.evaluate(HELPERS);
}

async function runTimeline(page, actions) {
  for (const a of actions) {
    const target = (a.t + page.__offset) * 1000 - (Date.now() - page.__t0);
    if (target > 0) await page.waitForTimeout(target);
    try {
      if (a.do === "clearHighlight") {
        await page.evaluate(() => window.__hlClear());
      } else if (a.do === "highlightColumn") {
        const ok = await page.evaluate(txt => window.__hlCol(txt), a.find);
        if (!ok) console.warn(`    [warn] not found for highlightColumn: "${a.find}"`);
      } else if (a.do === "highlightBlock") {
        const ok = await page.evaluate(([t1, t2]) => window.__hlUnion(t1, t2), [a.find, a.find2]);
        if (!ok) console.warn(`    [warn] not found for highlightBlock: "${a.find}" / "${a.find2}"`);
      } else if (a.do.startsWith("highlight") || a.do.startsWith("hover")) {
        // arrows removed: hover* behaves exactly like highlight* (single red box)
        const row = a.do === "highlightRow" || a.do === "hoverRow" || a.do === "highlightCard" || a.do === "hoverCard";
        const ok = await page.evaluate(([txt, row]) => window.__hl(txt, row), [a.find, row]);
        if (!ok) console.warn(`    [warn] not found for ${a.do}: "${a.find}"`);
      } else if (a.do === "clickText") {
        const ok = await page.evaluate(txt => {
          const el = window.__find(txt);
          if (!el) return false;
          el.scrollIntoView({ block: "nearest" });
          el.click();
          return true;
        }, a.find);
        if (!ok) console.warn(`    [warn] not found for click: "${a.find}"`);
      } else if (a.do === "slowPush") {
        await page.evaluate(([to, ms]) => window.__push(to, ms), [a.to, 4000]);
      } else if (a.do === "scrollToText") {
        const ok = await page.evaluate(txt => {
          const el = window.__find(txt);
          if (!el) return false;
          el.scrollIntoView({ behavior: "smooth", block: "center" }); return true;
        }, a.find);
        if (!ok) console.warn(`    [warn] not found for scroll: "${a.find}"`);
      } else if (a.do === "scrollBottom") {
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
      } else if (a.do === "scrollTop") {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      } else if (a.do === "holdHighlight") {
        await page.evaluate(([txt, row]) => window.__hl(txt, row), [a.find, !!a.row]);
        await page.waitForTimeout(a.ms || 1500);
      } else if (a.do === "avatar") {
        const spec = { id: a.id, x: a.x, y: a.y, bubble: a.bubble, cap: a.cap, ms: a.ms, svg: AV[a.avatar] || "" };
        await page.evaluate(s => window.__avatarIn(s), spec);
      } else if (a.do === "avatarOut") {
        await page.evaluate(id => window.__avatarOut(id), a.id || a.find);
      }
    } catch (e) { console.warn(`    [warn] action ${a.do} failed: ${e.message}`); }
  }
}

(async () => {
  const tim = fs.existsSync(timingsPath) ? JSON.parse(fs.readFileSync(timingsPath, "utf8")) : {};
  const slotOf = (s) => s.slot != null ? s.slot : +(((tim[s.id] || {}).audioDur || 0) + 3.0).toFixed(2);
  const exe = "/Users/weimingzhuang/Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
  const browser = await chromium.launch({ executablePath: exe, headless: true, args: ["--disable-gpu", "--disable-dev-shm-usage", "--no-first-run", "--force-device-scale-factor=2"] });
  fs.mkdirSync(CLIPS, { recursive: true });
  const offsetsPath = path.join(CLIPS, "offsets.json");
  const offsets = fs.existsSync(offsetsPath) ? JSON.parse(fs.readFileSync(offsetsPath, "utf8")) : {};
  for (const shot of cfg.shots) {
    if (ONLY && shot.id !== ONLY) continue;
    const slot = slotOf(shot);
    console.log(`recording ${shot.id} (${slot}s) ...`);
    fs.rmSync(path.join(CLIPS, shot.id), { recursive: true, force: true }); // no stale clips
    const ctx = await browser.newContext({
      viewport: { width: cfg.width, height: cfg.height },
      deviceScaleFactor: cfg.deviceScaleFactor,
      recordVideo: { dir: path.join(CLIPS, shot.id), size: { width: cfg.outW || cfg.width, height: cfg.outH || cfg.height } }
    });
    const page = await ctx.newPage();
    page.__t0 = Date.now();
    let url;
    if (shot.type === "card") url = "file://" + path.resolve(__dirname, shot.card);
    else if (shot.pageFile === "client") url = "file://" + CJ + "?wipe=1" + shot.route; // client journey: clean state, no record mode
    else url = "file://" + WB + "?record=1" + shot.route;
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(1200); // let render settle
    const offset = +(((Date.now() - page.__t0) / 1000) + 0.15).toFixed(3); // head to trim
    page.__offset = offset;
    offsets[shot.id] = offset;
    await injectHelpers(page);
    const timeline = runTimeline(page, shot.actions || []);
    await page.waitForTimeout((slot + 1.2) * 1000);
    await timeline.catch(() => {});
    const video = page.video();
    await ctx.close();
    const file = await video.path();
    console.log(`  saved clips/${shot.id}/ (head trim ${offset}s) -> ${path.basename(file)}`);
  }
  fs.writeFileSync(path.join(CLIPS, "offsets.json"), JSON.stringify(offsets, null, 2));
  await browser.close();
  console.log("done");
  process.exit(0); // playwright keeps handles alive; force exit
})();
