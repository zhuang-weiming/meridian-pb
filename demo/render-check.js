/* Render smoke test: all routes + client-portal tabs, no exceptions, balanced div stack. */
const fs = require("fs");
const vm = require("vm");

global.window = {};
global.document = { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {} };
for (const f of ["data.js", "ui.js", "pages.js", "pages2.js", "pages3.js"]) {
  vm.runInThisContext(fs.readFileSync(f, "utf8"), { filename: f });
}

const baseState = {
  role: "RM", clientId: "C-7701", proposal: { generated: true, selected: "P-A" },
  compliance: { approved: true }, stressScenario: "eq", includeCosts: true,
  decision: "adopt", facilityStress: "base", hubView: "client", serviceFilter: "全部",
  valuationLtv: 22, pledge: { V: 100000000, B: 1000000, t: 20, C: 25000000, i: 6.5, n: 5, r: 8, d: 0 },
  trustTab: "structure", m3tab: "tax", taxScenario: "A", taxLevers: ["L3"], clientTab: "proposal"
};
global.App = {
  state: { ...baseState },
  client() { return DB.clients.find(c => c.id === App.state.clientId) || DB.clients[0]; },
  founder() { return DB.clients.find(c => c.id === "C-88421"); },
  tes() { return 80; },
  pledgeCalc() {
    return { tax: 1, sellAmt: 1, interest: 1, breakeven: .01, downsideGap: 1, sellAt8: 1, pledgeAt8: 1,
      sellDown: 1, pledgeDown: 1, sellSeries: [1, 2, 3, 4, 5], pledgeSeries: [1, 2, 3, 4, 5],
      recommend: "Pledge", rationale: "x" };
  }
};

function checkDivBalance(id, html) {
  let depth = 0, min = 0, open = 0, close = 0;
  for (const m of html.matchAll(/<\/?div[^>]*>/g)) {
    if (m[0].startsWith("</")) { depth--; close++; } else { depth++; open++; }
    if (depth < min) min = depth;
  }
  if (open !== close || depth !== 0 || min < 0) {
    throw new Error(`${id}: div imbalance open=${open} close=${close} depth=${depth} min=${min}`);
  }
}

let count = 0;
for (const page of PAGES) {
  try {
    const html = RENDER[page.id]();
    if (!html || html.length < 100) throw new Error("empty render");
    checkDivBalance(page.id, html);
    count++;
  } catch (e) {
    console.error("FAIL", page.id, e.message);
    process.exitCode = 1;
  }
}

for (const clientId of ["C-7701", "C-88421"]) {
  for (const tab of ["proposal", "invitation", "trust"]) {
    App.state.clientId = clientId;
    App.state.clientTab = tab;
    const id = `client-portal:${clientId}:${tab}`;
    try {
      const html = RENDER["client-portal"]();
      if (!html || html.length < 100) throw new Error("empty render");
      checkDivBalance(id, html);
      count++;
    } catch (e) {
      console.error("FAIL", id, e.message);
      process.exitCode = 1;
    }
  }
}

if (!process.exitCode) console.log(`OK — ${count} renders, balanced div stacks, no route exceptions.`);
