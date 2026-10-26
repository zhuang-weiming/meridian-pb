/* Render smoke test for the Operating Workbench. Run: node check.js */
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

const makeNode = () => ({ innerHTML: "", textContent: "", classList: { add() {}, remove() {} } });
const nodes = new Map();
global.window = { addEventListener() {}, scrollTo() {}, WB_PAGES: null, WB_RENDER: null };
global.document = {
  title: "",
  querySelector(sel) {
    if (!nodes.has(sel)) nodes.set(sel, makeNode());
    return nodes.get(sel);
  },
  addEventListener() {}
};
global.location = { hash: "#/overview" };

vm.runInThisContext(fs.readFileSync("data.js", "utf8"), { filename: "data.js" });
vm.runInThisContext(fs.readFileSync("app.js", "utf8"), { filename: "app.js" });

const pages = global.window.WB_PAGES || global.WB_PAGES;
assert(pages && Object.keys(pages).length >= 21, "Workbench should have at least 21 pages");

let count = 0;
for (const [id, page] of Object.entries(pages)) {
  const html = page.render();
  assert(html && html.length > 120, `${id}: empty render`);
  let depth = 0, min = 0, open = 0, close = 0;
  for (const m of html.matchAll(/<\/?div[^>]*>/g)) {
    if (m[0].startsWith("</")) { depth--; close++; } else { depth++; open++; }
    if (depth < min) min = depth;
  }
  assert.strictEqual(open, close, `${id}: div open/close ${open}/${close}`);
  assert.strictEqual(depth, 0, `${id}: div depth ${depth}`);
  assert(min >= 0, `${id}: negative div depth`);
  count++;
}
const scripts = require("./scripts.js");
const src = fs.readFileSync("app.js", "utf8");
assert.strictEqual((src.match(/sourceNote\(/g) || []).length, count, "Every workbench page must carry a Data note");
assert.strictEqual(Object.keys(scripts).length, count, "Every workbench page needs a bilingual script");
for (const id of Object.keys(pages)) assert(scripts[id], `Missing speaker notes for ${id}`);
for (const r of WB.revenue.rms) {
  assert(r.support_ratio > 0, `${r.rm}: support_ratio must be positive`);
  const mix = r.segment_mix.uhnw + r.segment_mix.hnw + r.segment_mix.familyOffice;
  assert.strictEqual(mix, 100, `${r.rm}: segment_mix must sum to 100`);
  assert(r.service_intensity && r.service_intensity.meetingsPerYear >= 0 && r.service_intensity.tradesPerYear >= 0, `${r.rm}: service_intensity incomplete`);
}

/* ── Numeric & compliance integrity (added 2026-10-26 review) ── */
const rev = WB.revenue.summary;
assert.strictEqual(rev.grossMargin, rev.revenue - rev.directCost, "cockpit: gross margin = revenue − direct cost");
assert.strictEqual(rev.netMargin, rev.grossMargin - rev.fundingRisk - rev.costToServe, "cockpit: net margin = GM − funding/risk − cost-to-serve");
assert(Math.abs(rev.costIncome - 100 * (1 - rev.netMargin / rev.revenue)) <= 1, "cockpit: cost/income must match the net-margin basis");
assert.strictEqual(WB.revenue.products.reduce((a, p) => a + p.revenue, 0), rev.revenue, "product P&L must reconcile to total revenue");
assert.strictEqual(WB.revenue.products.reduce((a, p) => a + p.margin, 0), rev.grossMargin, "product margins must reconcile to gross margin");
assert.strictEqual(WB.ipo.valuation.methods.reduce((a, m) => a + m.weight, 0), 100, "valuation method weights must sum to 100");
assert.strictEqual(WB.ipo.valuation.range, "US$23.9bn – US$32.8bn", "valuation range must use one consistent discount stack");
assert.strictEqual(WB.estate.cases[0].daysSinceDeath, 8279, "Mui estate: days 2003-12-30 → 2026-08-30");
assert.strictEqual(WB.estate.cases[1].probReleaseDays, 15, "FOS case: probate 08-16 → release 08-31 = 15 days");
assert(WB.estate.cases.some(c => /Closed — trust terminated/.test(c.status)), "Mui estate must be shown as a closed case");
for (const c of WB.estate.cases) assert(c.daysSinceDeath !== undefined && c.probReleaseDays !== undefined, `${c.id}: two day metrics required`);
for (const c of WB.revenue.clients) {
  assert(Math.abs(c.grossMargin - (c.revenue - c.cost)) < 1, `${c.client}: gross margin = revenue − cost`);
  assert(c.netMargin <= c.grossMargin && c.aum > 0 && c.wallet > 0 && c.wallet <= 100, `${c.client}: client economics coherent`);
}
for (const r of WB.revenue.rms) assert(r.grossMargin < r.revenue && r.netMargin < r.grossMargin, `${r.rm}: margin ordering`);
assert.strictEqual(WB.orders.reasonPeriod, "Trailing 30 days", "reason pareto needs an explicit window");
assert.strictEqual(WB.orders.reasons.reduce((a, r) => a + r.pct, 0), 100, "reason shares must sum to 100");
for (const o of WB.orders.orders) {
  assert(["USD", "HKD", "GBP", "SGD"].includes(o.ccy), `${o.id}: order needs a currency tag`);
  if (o.market === "LSE") {
    const [h, m] = o.time.split(":").map(Number), mins = h * 60 + m;
    if (/closed/i.test(o.reason)) assert(mins >= 990, `${o.id}: LSE closed-order must be at/after 16:30`);
    else assert(mins >= 480 && mins < 990, `${o.id}: LSE in-hours order must sit within the session`);
  }
}
const accountRows = JSON.stringify([...WB.revenue.clients.map(c => c.client), ...WB.orders.orders.map(o => o.client), ...WB.orders.recovery.map(r => r.client), ...WB.onboarding.families.map(f => f.name), WB.onboarding.suitability.client, WB.onboarding.first.client]);
assert(!/Nadiya|Abdaal|Wenfeng|Neame|Hussain/.test(accountRows), "account-level rows must use fictional demo families, not public persons");

console.log(`OK — ${count} pages rendered, balanced div stacks, ${Object.keys(scripts).length} bilingual speaker scripts, RM capacity fields valid, ${WB.revenue.clients.length} client P&Ls reconciled, order/estate facts coherent.`);
