/* Probe all find-strings used by a config's actions on their real pages.
 * usage: node probe12.js shots12.json
 * Reports, per shot: which finds are missing (text mode / row mode / click mode). */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const CFG = process.argv[2] || "shots12.json";
const cfg = JSON.parse(fs.readFileSync(__dirname + "/" + CFG, "utf8"));
const ROOT = path.resolve(__dirname, "..", "..");
const WB = "file://" + path.join(ROOT, "03-web-page", "rm-workbench.html");
const CJ = "file://" + path.join(ROOT, "03-web-page", "client-journey.html");

const FIND_FN = () => {
  window.__find = (txt) => {
    if (!txt) return null;
    const t = txt.toLowerCase();
    let best = null;
    for (const el of document.querySelectorAll("td,th,div,span,h1,h2,h3,h4,li,p,a,section,tr,b,strong,button")) {
      if (el.closest("#wb-fake-cursor")) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(" ").trim();
      if (own.toLowerCase().includes(t)) {
        if (!best || own.length < best.textContent.trim().length) best = el;
      }
    }
    return best;
  };
};

(async () => {
  const exe = "/Users/weimingzhuang/Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
  const browser = await chromium.launch({ executablePath: exe, headless: true, args: ["--disable-gpu"] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let lastKey = null;
  for (const s of cfg.shots) {
    if (s.type === "card") continue;
    for (const a of s.actions || []) {
      const mode = a.do === "clickText" ? "click" : (a.do === "highlightRow" || a.do === "hoverRow" ? "row" : "text");
      const key = (s.pageFile === "client" ? "CJ" : "WB") + s.route;
      if (key !== lastKey) {
        await page.goto((s.pageFile === "client" ? CJ + "?wipe=1" : WB + "?record=1") + s.route, { waitUntil: "load" });
        await page.waitForTimeout(1100);
        await page.evaluate(FIND_FN);
        lastKey = key;
      }
      const found = await page.evaluate(txt => !!window.__find(txt), a.find);
      const rowEl = mode === "row" ? await page.evaluate(txt => { const e = window.__find(txt); return e ? !!(e.closest("tr") || e.closest(".module-card")) : null; }, a.find) : null;
      const flag = found ? (mode === "row" && !rowEl ? "ROW?" : "ok") : "MISSING";
      if (flag !== "ok") console.log(`${s.id} [${mode}] ${flag} "${a.find}"  (${key})`);
    }
  }
  console.log("probe done");
  await browser.close();
  process.exit(0);
})();
