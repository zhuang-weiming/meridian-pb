/* Diagnose arrow placement across the S8p action sequence. */
const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const exe = "/Users/weimingzhuang/Library/Caches/ms-playwright/chromium-1200/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
  const b = await chromium.launch({ executablePath: exe, headless: true, args: ["--disable-gpu"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto("file:///Users/weimingzhuang/Documents/source_code/meridian-pb/03-web-page/rm-workbench.html?record=1#/estate-case");
  await p.waitForTimeout(1500);
  // reuse record.js's own injectHelpers by requiring its logic inline
  const rec = fs.readFileSync(__dirname + "/record.js", "utf8");
  const helpers = rec.split("const HELPERS = `")[1].split("`;\n")[0];
  await p.evaluate((style) => {
    const st = document.createElement("style");
    st.textContent = style;
    document.head.appendChild(st);
    const c = document.createElement("div");
    c.id = "wb-fake-cursor";
    document.body.appendChild(c);
  }, rec.split("st.textContent = `")[1].split("`;\n")[0]);
  await p.evaluate(helpers);
  // make sure cursor div has the svg (injectHelpers in record.js creates it with innerHTML)
  await p.evaluate(() => {
    const c = document.getElementById("wb-fake-cursor");
    if (!c.querySelector("svg")) {
      c.innerHTML = '<svg width="36" height="26" viewBox="0 0 36 26"><line x1="1" y1="13" x2="24" y2="13" stroke="#db0011" stroke-width="6" stroke-linecap="round"/><path d="M20 3 L34 13 L20 23 Z" fill="#db0011" stroke="#db0011" stroke-width="2" stroke-linejoin="round"/></svg>';
    }
  });
  // replicate S8p sequence: highlight T+0 -> hover Grant of probate -> holdHighlight T+60
  await p.evaluate(() => window.__hl("T+0", false));
  const r1 = await p.evaluate(() => window.__cursorTo("Grant of probate"));
  await p.waitForTimeout(700);
  await p.evaluate(() => window.__hl("T+60", false));
  await p.waitForTimeout(700);
  const st2 = await p.evaluate(() => {
    const c = document.getElementById("wb-fake-cursor");
    const box = document.querySelector(".wb-shot-hl");
    const br = box ? box.getBoundingClientRect() : null;
    const W = 36, H = 26;
    const cx = parseFloat(c.style.left), cy = parseFloat(c.style.top);
    const overlap = br ? (cx < br.right && cx + W > br.left && cy < br.bottom && cy + H > br.top) : null;
    return { left: c.style.left, top: c.style.top, hlbox: br ? { l: +br.left.toFixed(0), r: +br.right.toFixed(0) } : null, overlap };
  });
  console.log("cursorTo returned:", JSON.stringify(r1));
  console.log("after holdHighlight T+60 (expect overlap=false):", JSON.stringify(st2));
  await p.screenshot({ path: "assets/arrow_diag.png" });
  await b.close();
  process.exit(0);
})();
