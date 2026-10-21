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
const orderQty = { "PO-2026-001": 16000, "PO-2026-002": 12000, "PO-2026-003": 14000, "PO-2026-004": 12000, "PO-2026-005": 12000, "PO-2026-006": 10000, "PO-2026-007": 600000, "PO-2026-008": 240000, "PO-2026-009": 44800, "PO-2026-010": 2400000 };
for (const o of DB.orders) assert.strictEqual(o.qty, orderQty[o.id], "Order quantity must match execution: " + o.id);
assert.strictEqual(DB.orders.length, 10, "Demo should have 10 parent orders");
assert.strictEqual(DB.childOrders.length, 16, "Demo should have 16 child orders");
for (const p of DB.orders) {
  const kids = DB.childOrders.filter(c => c.parent === p.id);
  assert.strictEqual(sum(kids, c => c.qty), p.qty, "Child qty must sum to parent qty: " + p.id);
  assert.strictEqual(sum(kids, c => c.filled), p.filled, "Child fills must sum to parent fills: " + p.id);
}
assert.strictEqual(DB.tca.transactionCost, 12.4, "TCA transaction cost");
assert.strictEqual(DB.tca.allIn, 21.1, "TCA all-in cost");

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
assert.strictEqual(PAGES.length, 31, "Demo should have 31 routes");
for (const page of PAGES) for (const r of page.roles) assert(roleList.includes(r), "Unknown role in page registry: " + r);
assert(!PAGES.find(p => p.id === "m3-hub").title.includes("集采"), "Page 12 must not contain 集采");
assert.strictEqual(DB.services.length, 10, "Service catalogue should have 10 items");
for (const svc of DB.services) {
  assert(!("price" in svc) && !("score" in svc), "Client-facing services must not expose price/score");
}
assert.strictEqual(DB.tax.advisor.type, "in-house", "M5 advisor must be HSBC internal");
const sc = DB.tax.scenarios;
const incomeBase = DB.tax.baseline.filter(x => x.type !== "香港股票印花税").reduce((a, x) => a + x.base, 0);
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

// 6. Family / consent / case objects
assert(DB.households.length >= 4, "Households should be present");
assert(DB.persons.length >= 12, "Persons should be present");
assert(DB.relationships.length >= 10, "Relationships should be present");
assert(DB.consents.length >= 8, "Consents should be present");
assert(DB.familyGoals.length >= 8, "Family goals should be present");
for (const g of DB.familyGoals) {
  assert(g.ownerPersonId && g.beneficiaryPersonIds.length && g.fundingPartyIds.length && g.decisionMakerId, "Goal must separate owner / beneficiary / funder / decision maker: " + g.id);
  for (const id of [g.ownerPersonId, g.decisionMakerId, ...g.beneficiaryPersonIds, ...g.fundingPartyIds]) {
    assert(DB.persons.some(p => p.id === id), "Goal references unknown person: " + id);
  }
}
assert(DB.cases.length >= 8, "Cases should be present");
for (const c of DB.cases) if (c.goalId) assert(DB.familyGoals.some(g => g.id === c.goalId), "Case references unknown goal: " + c.goalId);

// 7. Dictionary / terminology
const terms = new Set(DB.dictionary.map(d => d.term));
for (const t of ["Lombard", "SLB", "Household", "Beneficial Owner", "Trust Beneficiary", "Payee", "LTV", "Haircut", "Lendable Value", "Client / Person / BP / Account", "Taxpayer"]) {
  assert(terms.has(t), "Dictionary missing term: " + t);
}
assert(!DB.financing.options.some(o => o.name.includes("SLB")), "Lombard must not be labeled SLB");
assert(DB.proposals.funding && DB.proposals.funding.payer && DB.proposals.funding.beneficiary, "Proposal funding structure missing");
for (const row of DB.trust.taxRows) assert(row.payee, "Trust tax row needs payee: " + row.id);
for (const row of DB.trustHo.taxRows) assert(row.payee, "Holding trust tax row needs payee: " + row.id);
assert(DB.financing.facility.valuationDate, "M3 facility needs valuation date");
assert(DB.valuation.valuationDate, "M4 valuation needs valuation date");

// 8. Aladdin proposal vs objective review
const al = DB.aladdin;
assert(al.variants.aligned.status === "WARN", "Aligned Aladdin variant should be WARN");
assert(al.variants.conflict.status === "REJECT", "Conflict Aladdin variant should be REJECT");
assert(al.variants.conflict.checks.filter(c => c.result === "REJECT").length >= 4, "Conflict variant needs hard REJECT checks");
assert(DB.proposals.aladdinOption.id === "P-ALADDIN", "Aladdin proposal option missing");
assert(approx(sum(DB.proposals.aladdinOption.legs, l => l.w), 100), "P-ALADDIN weights must sum to 100");
assert(approx(sum(DB.proposals.aladdinOption.legs, l => l.amt), 20000000), "P-ALADDIN amounts must sum to 20m");
for (const v of [al.variants.aligned, al.variants.conflict]) {
  assert(approx(sum(v.rows, r => r.target), 100), "Aladdin CSV target weights must sum to 100: " + v.id);
}

// 9. Backtest curve and metrics must tie
const bt = DB.backtest;
assert.strictEqual(bt.points.length, 35, "Backtest should use 35 quarterly points");
const bRets = [];
for (let i = 1; i < bt.points.length; i++) bRets.push(bt.points[i] / bt.points[i - 1] - 1);
const bMean = bRets.reduce((a, x) => a + x, 0) / bRets.length;
const bSd = Math.sqrt(bRets.reduce((a, x) => a + (x - bMean) ** 2, 0) / (bRets.length - 1));
const bCagr = Math.pow(bt.points[bt.points.length - 1] / bt.points[0], 1 / bt.years) - 1;
const bVol = bSd * Math.sqrt(bt.periodsPerYear);
let bPeak = bt.points[0], bDd = 0;
for (const p of bt.points) { bPeak = Math.max(bPeak, p); bDd = Math.min(bDd, p / bPeak - 1); }
const bSharpe = (bCagr - bt.rf) / bVol;
assert(approx(bCagr * 100, 6.8, 0.1), "Backtest CAGR must tie to curve: " + (bCagr * 100));
assert(approx(bVol * 100, 5.6, 0.1), "Backtest vol must tie to curve: " + (bVol * 100));
assert(approx(bDd * 100, -14.2, 0.1), "Backtest max drawdown must tie to curve: " + (bDd * 100));
assert(approx(bSharpe, 0.65, 0.01), "Backtest Sharpe must tie to curve: " + bSharpe);
const bNet = [bt.points[0]];
const bDrag = bt.costDrag / bt.periodsPerYear;
for (let i = 1; i < bt.points.length; i++) bNet.push(bNet[i - 1] * (1 + (bt.points[i] / bt.points[i - 1] - 1 - bDrag)));
const bNetCagr = Math.pow(bNet[bNet.length - 1] / bNet[0], 1 / bt.years) - 1;
assert(approx(bNetCagr * 100, 5.9, 0.1), "Backtest net CAGR must tie to cost drag: " + (bNetCagr * 100));

console.log("OK — 31 routes; P-A & execution weights/amounts tie; cost 21.1 bps; 10 parent / 16 child orders tie; backtest curve ties to CAGR/vol/MDD/Sharpe; Aladdin aligned/reject reviews present; M3 270% / LTV 37%; M4 22% / 4.54x; family/consent/case and dictionary data present.");
