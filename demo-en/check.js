/* Lightweight business invariants for the demo data. Run: node check.js */
const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

global.window = {};
global.document = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {} };
for (const f of ["data.js", "pages.js"]) vm.runInThisContext(fs.readFileSync(f, "utf8"), { filename: f });

const approx = (a, b, eps = 0.01) => Math.abs(a - b) <= eps;
const sum = (arr, fn) => arr.reduce((a, x) => a + fn(x), 0);

// 1. Proposal layer: weights and amounts
const p = DB.proposals.options[0];
assert(approx(sum(p.legs, l => l.w), 100), "P-A weights must sum to 100");
assert(approx(sum(p.legs, l => l.amt), 20000000), "P-A amounts must sum to 20m");

// 2. Execution layer: weights, amounts, templates, weighted cost
const ex = DB.execution;
assert(approx(sum(ex, l => l.w), 100), "Execution weights must sum to 100");
assert(approx(sum(ex, l => l.amt), 20000000), "Execution amounts must sum to 20m");
const templateIds = new Set(DB.templates.map(t => t.id));
for (const l of ex) assert(templateIds.has(l.tpl), "Missing template: " + l.tpl);
const wcost = sum(ex, l => l.amt * l.cost) / sum(ex, l => l.amt);
assert(approx(wcost, 21.09, 0.05), "Weighted execution cost should be ~21.09 bps, got " + wcost);
assert(approx(p.metrics.cost, 21, 0.01), "Proposal A cost should be 21 bps");
assert(approx(sum(ex.filter(l => l.tpl === "FI-LADDER-01"), l => l.w), 38), "Execution bond weight must be 38%");
assert(approx(sum(ex.filter(l => l.tpl === "FD-UCITS-01"), l => l.w), 42), "Execution UCITS weight must be 42%");
assert(approx(sum(ex.filter(l => l.tpl === "EQ-CASH-01"), l => l.w), 8), "Execution gold weight must be 8%");
assert(approx(sum(ex.filter(l => l.tpl === "CASH-01"), l => l.w), 12), "Execution cash weight must be 12%");
const orderQty = { "PO-2026-001": 30000, "PO-2026-002": 28000, "PO-2026-003": 16000, "PO-2026-004": 86000, "PO-2026-005": 45000 };
for (const o of DB.orders) assert.strictEqual(o.qty, orderQty[o.id], "Order quantity must match execution: " + o.id);

// 3. M3 facility: LTV and coverage identity
const f = DB.financing.facility;
assert(approx(f.lendable, f.collateral * (1 - f.haircut / 100), 1), "M3 lendable value");
assert(approx(f.ltv, f.drawn / f.lendable * 100, 0.5), "M3 LTV = drawn / lendable");
assert(approx(f.coverage, f.lendable / f.drawn * 100, 0.5), "M3 coverage = lendable / drawn");
assert(f.coverage > f.warning, "M3 base coverage should be above warning line");

// 4. M4 valuation: LTV and coverage identity
const v = DB.valuation;
assert(approx(v.lendable, v.adjusted * (1 - v.haircut), 1), "M4 lendable value");
assert(approx(v.ltv * 100, v.facility / v.lendable * 100, 0.5), "M4 LTV = facility / lendable");
assert(approx(v.coverage, v.lendable / v.facility, 0.01), "M4 coverage = lendable / facility");

// 5. Route / role registry
const roleList = ["RM", "TH", "IC", "Compliance", "Credit", "Trustee", "Vendor", "Client"];
assert.strictEqual(PAGES.length, 29, "Demo should have 29 routes");
for (const page of PAGES) for (const r of page.roles) assert(roleList.includes(r), "Unknown role in page registry: " + r);
assert(!/procurement|tender|集采/i.test(PAGES.find(p => p.id === "m3-hub").title), "Page 12 client-facing title must not mention procurement");
assert.strictEqual(DB.services.length, 10, "Service catalogue should have 10 items");
for (const svc of DB.services) {
  assert(!("price" in svc) && !("score" in svc), "Client-facing services must not expose price/score");
}
assert.strictEqual(DB.tax.advisor.type, "in-house", "M5 advisor must be HSBC internal");
const sc = DB.tax.scenarios;
const incomeBase = DB.tax.baseline.filter(x => x.type !== "HK Stamp Duty").reduce((a, x) => a + x.base, 0);
assert.strictEqual(incomeBase, 225000000, "M5 income base should be 225m (stamp duty base excluded)");
const baseTax = DB.tax.baseline.reduce((a, x) => a + x.cash, 0);
const base = sc.find(x => x.id === "BASE");
assert.strictEqual(base.afterTax, 225000000 - baseTax - base.cost, "Baseline after-tax cash must tie to tax base and cost");
for (const id of ["A", "B", "C"]) {
  const x = sc.find(s => s.id === id);
  assert.strictEqual(x.afterTax, 225000000 - 225000000 * x.rate / 100 - x.cost, id + " after-tax cash must tie to rate and cost");
}
assert(sc.find(x => x.id === "A").afterTax > base.afterTax, "A should beat baseline");
assert.strictEqual(sc.find(x => x.id === "C").result, "REJECT", "C must be rejected");

console.log("OK — 29 routes; P-A & execution weights/amounts tie; cost 21.1 bps; M3 270% / LTV 37%; M4 22% / 4.54x.");
