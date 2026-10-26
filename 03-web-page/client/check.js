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
assert.strictEqual(PAGES.length, 34, "Demo should have 34 routes");
for (const page of PAGES) for (const r of page.roles) assert(roleList.includes(r), "Unknown role in page registry: " + r);

// 5b. Household layer (ported): clients ↔ households ↔ persons ↔ consents ↔ goals ↔ cases
assert.strictEqual(DB.households.length, 4, "Four demo households");
assert.strictEqual(DB.persons.length, 16, "Sixteen demo persons");
assert.strictEqual(DB.relationships.length, 13, "Thirteen demo relationships");
assert.strictEqual(DB.consents.length, 16, "Sixteen consent records");
assert.strictEqual(DB.familyGoals.length, 8, "Eight family goals");
assert.strictEqual(DB.cases.length, 9, "Nine demo cases");
const hhIds = new Set(DB.households.map(h => h.id));
for (const c of DB.clients) {
  assert(c.householdId && hhIds.has(c.householdId), "Client must carry a valid householdId: " + c.id);
  assert(DB.households.some(h => h.primaryClientId === c.id), "Household must point back to its primary client: " + c.id);
}
for (const p of DB.persons) assert(hhIds.has(p.householdId), "Person household must resolve: " + p.id);
const pendingSelf = DB.consents.filter(x => x.householdId === "H-7701" && !x.status.startsWith("Granted"));
assert.strictEqual(pendingSelf.length, 2, "He family must keep 2 pending adult-child consents");
const pageIds = new Set(PAGES.map(p => p.id));
for (const x of DB.cases) {
  assert(DB.familyGoals.some(g => g.id === x.goalId), "Case goal must resolve: " + x.id);
  if (x.link) assert(pageIds.has(x.link), "Case link must be a registered route (" + x.link + ")");
}

// 5c. Reference graph: every on-page jump must resolve to a registered route
const refSrc = ["pages.js", "pages2.js", "pages3.js", "data.js"].map(f => fs.readFileSync(f, "utf8")).join("\n");
const pageRefs = new Set([...refSrc.matchAll(/data-page="([a-z0-9-]+)"/g)].map(m => m[1]).concat([...refSrc.matchAll(/page: "([a-z0-9-]+)"/g)].map(m => m[1])));
for (const r of pageRefs) assert(pageIds.has(r), "Referenced route must be registered: " + r);

// 5d. Fictional-issuer policy on the pledge/valuation pages
const pages2src = fs.readFileSync("pages2.js", "utf8");
assert(!pages2src.includes("controlPremium"), "Control premium is not a discount column");
assert(!pages2src.includes("DeepSeek"), "Pledge collateral must be the fictional issuer (AI Terra Ltd), not real-company data");
assert.strictEqual(DB.privateAssetLab.valuations[0].asset, "AI Terra Ltd (illustrative)", "VAL-2026-001 asset");
const v1 = DB.privateAssetLab.valuations[0];
assert(approx(v1.valuationAmount, 5.67e9, 1e6), "VAL-2026-001 adjusted value ties to the M4 valuation chain ($5.67bn)");
assert(approx(v1.lendableValue, 0.2 * DB.privateAssetLab.summary.paperValue, 1e6), "VAL-2026-001 lendable = 20% of paper (within the 10–30% LTV guide)");
const pg = DB.privateAssetLab.pledge;
assert(approx(pg.coverage, pg.lendable / pg.facility * 100, 0.5), "Pledge coverage = lendable / facility");
assert.strictEqual(pg.haircut, 78, "Pledge haircut 78% consistency");
assert(DB.familyOfficeDashboard && DB.familyOfficeDashboard.consolidated.length >= 5, "Family office dashboard data must be present");
assert(DB.privateAssetLab.capitalCalls.length >= 3 && DB.privateAssetLab.earnOuts.length >= 2 && DB.privateAssetLab.obligations.length >= 5, "Private asset lifecycle data must be present");
assert(!/procurement|tender|集采/i.test(PAGES.find(p => p.id === "m3-hub").title), "Page 12 client-facing title must not mention procurement");
assert.strictEqual(DB.services.length, 10, "Service catalogue should have 10 items");
for (const svc of DB.services) {
  assert(!("price" in svc) && !("score" in svc), "Client-facing services must not expose price/score");
}
assert.strictEqual(DB.tax.advisor.type, "in-house", "M5 advisor must be HSBC internal");
assert(DB.taxGuide && DB.taxGuide.canSay.length >= 6 && DB.taxGuide.cannotSay.length >= 6, "RM tax guidance cards must be present");
assert(DB.taxPartners && DB.taxPartners.length >= 3, "Approved accountant panel must have at least 3 firms");
for (const p of DB.taxPartners) assert(!("price" in p) && !("score" in p), "Partner panel must not expose price/score");
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

assert(DB.journeyBlueprints && DB.journeyBlueprints.j2 && DB.journeyBlueprints.j3 && DB.journeyBlueprints.j4, "J2/J3/J4 journey blueprints must be present");
console.log("OK — 34 routes; P-A & execution weights/amounts tie; cost 21.1 bps; M3 270% / LTV 37%; M4 22% / 4.54x; J2/J3/J4 blueprints and private asset lifecycle data present.");
