/* Page metadata + M1 / M2 renderers */
const MODULES = {
  M1: { name: "M1 · Proposal Studio", short: "Proposal → Orders" },
  M2: { name: "M2 · Quant Lab", short: "Quant Lab" },
  M3: { name: "M3 · RM Copilot", short: "RM Copilot" },
  M4: { name: "M4 · Founder Desk", short: "Founder Desk" },
  M5: { name: "M5 · Tax Optimization", short: "Tax Optimization" },
  X: { name: "Shared", short: "Shared" }
};

const PAGES = [
  { id: "m1-dashboard", mod: "M1", title: "Proposal Inbox", sub: "Who needs a proposal today, and why now?", icon: "01", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m1-proposal", mod: "M1", title: "Proposal Studio", sub: "Objective → Constraints → Three options → TES", icon: "02", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m1-execution", mod: "M1", title: "Execution Blueprint", sub: "Choose at proposal layer, trade line by line at execution layer", icon: "03", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m1-compliance", mod: "M1", title: "Compliance Gate", sub: "Four-dimension rules × suitability × disclosure × Chinese wall", icon: "04", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m1-orders", mod: "M1", title: "Orders & TCA", sub: "Parent / child orders / fills / cost write-back", icon: "05", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },

  { id: "m2-allocation", mod: "M2", title: "Allocation Studio", sub: "SAA / TAA under hard IPS constraints", icon: "06", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m2-stress", mod: "M2", title: "Stress Test", sub: "When does it hurt, and by how much?", icon: "07", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m2-backtest", mod: "M2", title: "Backtest Lab", sub: "With costs, with tax, with out-of-sample", icon: "08", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m2-decision", mod: "M2", title: "RM Decision Card", sub: "RM decides how to present it, and how much to say", icon: "09", roles: ["RM", "IC", "TH", "Compliance"] },

  { id: "m3-financing", mod: "M3", title: "Financing Cockpit", sub: "How much is missing, how much can be borrowed, how to repay", icon: "10", roles: ["RM", "IC", "TH", "Credit", "Compliance"] },
  { id: "m3-taxlegal", mod: "M3", title: "Tax / Legal Cockpit", sub: "Obligation calendar, scenarios, licensed referrals", icon: "11", roles: ["RM", "IC", "TH", "Compliance", "Trustee"] },
  { id: "m3-hub", mod: "M3", title: "Services / Invitations", sub: "Family services and invitations: the client pays nothing and signs nothing", icon: "12", roles: ["RM", "IC", "TH", "Compliance"] },

  { id: "m4-founder", mod: "M4", title: "Founder 360", sub: "Paper wealth → manageable assets", icon: "13", roles: ["RM", "IC", "TH", "Credit", "Compliance", "Trustee"] },
  { id: "m4-valuation", mod: "M4", title: "Independent Valuation Committee", sub: "LTV 10%–30%; 40% trigger", icon: "14", roles: ["RM", "TH", "Credit", "Compliance"] },
  { id: "m4-pledge", mod: "M4", title: "Pledge vs Sell", sub: "Same cash need — who has more terminal wealth after tax", icon: "15", roles: ["RM", "IC", "TH", "Credit", "Compliance"] },
  { id: "m4-trust", mod: "M4", title: "Trust / Budget / Tax Ledger", sub: "Spendable, auditable, reportable", icon: "16", roles: ["RM", "TH", "Compliance", "Trustee"] },

  { id: "m5-intake", mod: "M5", title: "Tax Optimisation Case", sub: "One transaction — how to structure it more tax-efficiently", icon: "17", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-profile", mod: "M5", title: "Tax Profile / Nexus", sub: "Residence, entity, account and asset are not the same thing", icon: "18", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-baseline", mod: "M5", title: "Baseline Tax Map", sub: "Without optimisation, what tax each event triggers", icon: "19", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-levers", mod: "M5", title: "Lever Library", sub: "Ten levers, each with its red flags", icon: "20", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-booking", mod: "M5", title: "Booking / Entity Comparison", sub: "Cayman ≠ tax-free; look at substance and CRS", icon: "21", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-scenarios", mod: "M5", title: "Scenario Comparison", sub: "After-tax cash, cost, risk, defensibility", icon: "22", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-substance", mod: "M5", title: "Anti-Avoidance Check", sub: "HK s.61A / FSIE / substance / CRS", icon: "23", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-advisor", mod: "M5", title: "HSBC Internal Review / RM Decision", sub: "No internal review, no delivery", icon: "24", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-delivery", mod: "M5", title: "Client Delivery / Implementation", sub: "Client pack, disclosures, account opening, filings", icon: "25", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-review", mod: "M5", title: "Annual Review", sub: "Regulations, day counts, filings, structure", icon: "26", roles: ["RM", "TH", "Compliance"] },

  { id: "client-portal", mod: "X", title: "Client Portal", sub: "Proposals, invitations, trust report", icon: "CL", roles: ["Client"] },
  { id: "vendor-portal", mod: "X", title: "Vendor Bidding", sub: "RFP, bid, delivery (no client data access)", icon: "VE", roles: ["Vendor"] },
  { id: "audit", mod: "X", title: "Audit & Evidence", sub: "Evidence chain, model versions, access logs", icon: "AU", roles: ["Compliance", "TH", "RM"] }
];

const RENDER = {};

const selected = (a, b) => a === b ? " selected" : "";
const val = (v) => v == null ? "" : UI.esc(v);

function clientHeader(c) {
  return `<div class="row">
    <div class="avatar" style="background:#10243f">${c.name.slice(0, 1)}</div>
    <div>
      <div class="strong">${val(c.name)}</div>
      <div class="tiny muted">${val(c.segment)} · ${val(c.rm)} · ${c.booking.join(" / ")}</div>
    </div>
    <div style="margin-left:auto">${UI.pill(c.risk, c.risk === "Conservative" ? "blue" : c.risk === "Aggressive" ? "red" : "green")}</div>
  </div>`;
}

/* ───────── M1 ───────── */

RENDER["m1-dashboard"] = () => {
  const c = App.client();
  const ev = DB.events.filter(e => e.clientId === c.id);
  const next = ev[0] || { days: "—", title: "No events", detail: "Start with the client 360 and objective confirmation.", type: "—" };
  const eventPage = c.id === "C-88421" ? "m4-founder" : c.id === "C-7701" ? "m5-baseline" : next.type === "Pledge" ? "m3-financing" : "m3-taxlegal";
  const eventLabel = c.id === "C-88421" ? "Open Founder 360" : c.id === "C-7701" ? "Open Tax Baseline" : next.type === "Pledge" ? "Open Financing Cockpit" : "Open Tax Cockpit";
  const configPage = c.id === "C-88421" ? "m4-valuation" : "m1-proposal";
  const financePage = c.id === "C-88421" ? "m4-pledge" : c.id === "C-7701" ? "m3-hub" : "m3-financing";
  const taxId = App.state.role === "Compliance" ? c.taxId : c.taxId.replace(/[0-9]{4}$/, "****");
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Inbox`,
    title: "Proposal Inbox",
    sub: "Event-driven, not a quarterly review. Every lead drills down to the client 360, the event source and the suggested action.",
    actions: `<button class="btn" data-action="toast" data-msg="Events and holdings refreshed (mock)">Refresh</button>
      <button class="btn primary" data-action="go" data-page="m1-proposal">New proposal</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Total Client Wealth", UI.money(c.totalWealth), "Custody + non-custody", "")}
    ${UI.stat("T+7 Available", UI.money(c.liquid), (c.liquid / c.totalWealth * 100).toFixed(1) + "% · " + (c.liquid / c.totalWealth >= .10 ? "above" : "below") + " the 10% floor", c.liquid / c.totalWealth >= .10 ? "green" : "red")}
    ${UI.stat("Single-Stock Concentration", UI.pct(c.concentration * 100), c.concentration > .6 ? "Above the 60% threshold" : "Within threshold", c.concentration > .6 ? "red" : "green")}
    ${UI.stat("Next Event", ev[0] ? `${ev[0].days} days` : "—", ev[0] ? ev[0].type + " · " + ev[0].date : "None", "amber")}
  </div>
  <div class="grid-2-1" style="margin-top:12px">
    <div class="card">
      <div class="card-head"><div><h2>Open Events</h2><p>Sorted by priority; click “Proposal” to set the objective and constraints.</p></div><div class="spacer"></div>${UI.pill(ev.length + " items", "gray")}</div>
      ${ev.length ? UI.table(
        ["Event", "Date / Days", "Detail", "Priority", "Status", ""],
        ev.map(e => [
          `<span class="strong">${e.type}</span><span class="sub">${e.title}</span>`,
          `<span class="mono">${e.date}</span><span class="sub">${e.days > 0 ? e.days + " days away" : "Expired"}</span>`,
          `<span class="small">${e.detail}</span>`,
          `<b class="mono">${e.priority}</b>`,
          UI.pill(e.status, e.status === "Not Contacted" ? "red" : e.status === "In Progress" ? "blue" : "amber"),
          `<button class="btn sm" data-action="go" data-page="m1-proposal">Proposal</button>`
        ]), { compact: true }) : `<div class="empty">No events. Switch to another client.</div>`}
    </div>
    <div class="card">
      <div class="card-head"><div><h2>Client 360</h2><p>Field-level permissions: RM sees masked values, Compliance sees full detail.</p></div></div>
      <div class="card-body">
        ${clientHeader(c)}
        <div class="divider"></div>
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">Tax Resident</div><div class="strong">${c.taxResidency}</div></div>
          <div><div class="tiny muted">Entity</div><div class="strong">${c.entity}</div></div>
          <div><div class="tiny muted">Tax ID</div><div class="strong mono">${taxId}</div></div>
          <div><div class="tiny muted">Family</div><div class="strong">${c.family}</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:5px">Accounts (${c.accounts.length})</div>
        ${UI.table(["Account", "Centre", "Type", "Currency", "Market Value"], c.accounts.map(a => [
          `<span class="mono">${a.id}</span>`, a.centre, a.type, a.ccy, `<span class="num">${UI.money(a.value)}</span>`
        ]), { compact: true })}
      </div>
    </div>
  </div>
  <div class="grid-3" style="margin-top:12px">
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill amber">Recommended Action</span><span class="tiny muted">T-${next.days} days</span></div>
      <div class="strong" style="margin:7px 0 3px">${next.title}</div>
      <div class="small muted">${next.detail}</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${eventPage}">${eventLabel}</button>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill blue">Allocation</span><span class="tiny muted">Concentration ${UI.pct(c.concentration * 100)}</span></div>
      <div class="strong" style="margin:7px 0 3px">${c.concentration > .6 ? "Liquidity and concentration first" : "Use the bond ladder to cut single-stock weight"}</div>
      <div class="small muted">${c.concentration > .6 ? "Target: lock liquidity and tax first, then reduce concentration in stages." : "Target: bring concentration to 30% over 24 months; keep a 12% cash buffer."}</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${configPage}">${c.id === "C-88421" ? "View Valuation" : "Generate Proposal"}</button>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill purple">Financing</span><span class="tiny muted">Lombard</span></div>
      <div class="strong" style="margin:7px 0 3px">Pledge first, sell later?</div>
      <div class="small muted">3-year pledge cost vs one-off tax; a 40% fall triggers a margin call that must be flagged early.</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${financePage}">${c.id === "C-7701" ? "View Family Services" : "Compare Financing"}</button>
    </div></div>
  </div>`;
};

RENDER["m1-proposal"] = () => {
  const c = App.client();
  const p = DB.proposals;
  const gen = App.state.proposal.generated;
  const sel = App.state.proposal.selected;
  const cards = p.options.map(o => {
    const tes = App.tes(o.subs);
    return `<div class="card" style="border-color:${sel === o.id ? "#fda4af" : "var(--line)"};box-shadow:${sel === o.id ? "0 0 0 3px #fff1f2" : "var(--shadow)"}">
      <div class="card-head">
        <div><div class="row"><span class="pill ${o.tag === "Recommended" ? "red" : o.tag === "Steady" ? "blue" : "amber"}">${o.tag}</span><span class="tiny muted">${o.id}</span></div>
          <h2 style="margin-top:5px">${o.name}</h2><p>${o.thesis}</p></div>
        <div class="spacer"></div>
        <div style="text-align:right"><div class="tiny muted">TES</div><div class="strong" style="font-size:19px">${tes}</div></div>
      </div>
      <div class="card-body tight">
        <div class="grid-4" style="gap:6px">
          ${UI.stat("All-in cost", o.metrics.cost + " bps", "First year", "")}
          ${UI.stat("After-tax drag", o.metrics.tax + " bps", "Annualised", "")}
          ${UI.stat("Time to investable", o.metrics.time + " days", "Decision → funded", "")}
          ${UI.stat("Impact", o.metrics.impact + " bps", "20% ADV", "")}
        </div>
        ${UI.table(["Template", "Instrument", "Action", "Weight", "Amount"], o.legs.map(l => [
          `<span class="mono">${l.t}</span>`, l.i, l.a, l.w + "%", `<span class="num">${UI.money(l.amt)}</span>`
        ]), { compact: true })}
        <div class="grid-2" style="margin-top:8px">
          <div class="note green"><b>Why this option:</b>${o.why}</div>
          <div class="note amber"><b>Cost / risk:</b>${o.not}</div>
        </div>
        <div class="tiny muted" style="margin-top:7px"><b>When to switch:</b>${o.change} · Confidence: ${o.confidence}</div>
        <div class="row" style="margin-top:9px">
          <button class="btn ${sel === o.id ? "primary" : ""}" data-action="select-proposal" data-id="${o.id}">${sel === o.id ? "Selected" : "Choose this"}</button>
          <button class="btn sm" data-action="toast" data-msg="Opened leg-level detail (demo)">View line by line</button>
          <span class="tiny muted" style="margin-left:auto">Expected ${o.exp} · Vol ${o.vol} · Stress drawdown ${o.dd}</span>
        </div>
      </div>
    </div>`;
  }).join("");

  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Proposal layer`,
    title: "Proposal Studio",
    sub: `${c.name} · Lock the objective and constraints first; the AI only generates three executable options within the permitted template and product universe.`,
    actions: `<button class="btn" data-action="go" data-page="m1-dashboard">Back to inbox</button>
      <button class="btn primary" data-action="generate-proposals">${gen ? "Regenerate" : "Generate three options"}</button>`
  }) + `
  <div class="stepper">
    <span class="step done"><b>1</b> Objective</span><span class="step done"><b>2</b> Constraints</span><span class="step done"><b>3</b> Templates</span>
    <span class="step ${gen ? "done" : "on"}"><b>4</b> Generate</span><span class="step"><b>5</b> TES</span><span class="step"><b>6</b> Compliance</span><span class="step"><b>7</b> Sign</span>
  </div>
  <div class="grid-1-2">
    <div>
      <div class="card"><div class="card-head"><div><h2>Objective</h2><p>Use ranges, not point estimates; split liquidity by T+0/7/90.</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "Objective type", type: "select", value: "Liquidity + diversification", options: ["Liquidity + diversification", "Return", "Growth", "Hedge", "Legacy"] })}
          ${UI.field({ label: "Investment amount", value: "20,000,000", suffix: "USD" })}
          ${UI.field({ label: "Tenor", value: "24", suffix: "months" })}
          ${UI.field({ label: "Target return (range)", value: "4.5% – 5.5%" })}
          ${UI.field({ label: "T+0 cash", value: "500,000", suffix: "USD" })}
          ${UI.field({ label: "T+7 cash", value: "1,000,000", suffix: "USD" })}
          ${UI.field({ label: "T+90 cash", value: "2,000,000", suffix: "USD" })}
          ${UI.field({ label: "Max drawdown", value: "10", suffix: "%" })}
        </div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Constraints</h2><p>Hard constraints block generation; soft constraints warn.</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "Single-issuer cap", value: "15", suffix: "%" })}
          ${UI.field({ label: "Minimum cash retained", value: "8", suffix: "%" })}
          ${UI.field({ label: "Leverage", type: "select", value: "Not permitted", options: ["Not permitted", "Permitted (LTV ≤ 25%)"] })}
          ${UI.field({ label: "Derivatives", type: "select", value: "Not permitted", options: ["Not permitted", "Hedging only"] })}
          ${UI.field({ label: "Tax resident", type: "select", value: c.taxResidency, options: ["Mainland China", "Hong Kong", "Singapore", "United States", "Other"] })}
          ${UI.field({ label: "Client category", type: "select", value: "Professional investor", options: ["Professional investor", "Retail", "Institutional"] })}
          ${UI.field({ label: "ESG", type: "select", value: "None", options: ["None", "Excluded", "Preferred", "Impact"] })}
          ${UI.field({ label: "Restricted list", value: "Checked · no hit", disabled: true, help: "R-WALL-001 / 2026-10-20" })}
        </div>
        <div class="note" style="margin-top:9px"><b>Constraint compiler:</b> “keep some cash” → 12 months of spending = 8% minimum cash; “don’t be too concentrated” → single issuer ≤ 15%. Each can be changed, but the client must confirm.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Templates</h2><p>Choose the trade route, not the product.</p></div></div><div class="card-body">
        <div class="row">${DB.templates.slice(0, 6).map(t => `<span class="pill ${t.id === "FI-LADDER-01" ? "red" : "gray"}">${t.id} · ${t.name}</span>`).join("")}</div>
        <div class="tiny muted" style="margin-top:7px">Four templates selected: FI-LADDER-01, FD-UCITS-01, EQ-CASH-01, CASH. Each template has mandatory fields, cost items, tax treatment and an approval matrix.</div>
      </div></div>
    </div>
    <div>
      ${gen ? cards : `<div class="card"><div class="empty" style="padding:42px 24px">
        <div class="strong" style="font-size:14px;color:var(--ink)">No options generated yet</div>
        <div class="small muted" style="margin:6px auto 12px;max-width:360px">The AI will draw on 12,480 available tools and generate three executable options weighted “cost 25 / after-tax 20 / time 20 / impact 20 / ease 15”. All numbers come from calculation services, never from the model itself.</div>
        <button class="btn primary" data-action="generate-proposals">Generate three options</button>
      </div></div>`}
      ${gen ? `<div class="card"><div class="card-head"><div><h2>TES Comparison</h2><p>Ranked within this candidate set only; absolute values shown alongside.</p></div></div><div class="card-body">
        ${UI.bars(p.options.map(o => ({ label: o.name, value: App.tes(o.subs), display: App.tes(o.subs), color: o.id === "P-A" ? "var(--red)" : o.id === "P-B" ? "var(--blue)" : "var(--amber)" })), 100)}
        <div class="tiny muted" style="margin-top:6px">A wins on cost/time/impact; B wins on executability; C only wins on coupon and no impact. Consider combining rather than picking one.</div>
      </div></div>` : ""}
    </div>
  </div>`;
};

RENDER["m1-execution"] = () => {
  const sel = App.state.proposal.selected || "P-A";
  const lines = DB.execution;
  const total = lines.reduce((a, l) => a + l.amt, 0);
  const wcost = total ? lines.reduce((a, l) => a + l.amt * l.cost, 0) / total : 0;
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Execution layer`,
    title: "Execution Blueprint",
    sub: `Selected ${sel}. Every line must carry a template, instrument, funding account and suitability record; line-level changes beyond threshold return to the proposal layer.`,
    actions: `<button class="btn" data-action="toast" data-msg="Pre-trade simulation run: expected slippage 6.4 bps, T+0 cash flow −$17.6m">Run pre-trade simulation</button>
      <button class="btn primary" data-action="go" data-page="m1-compliance">Send to compliance gate</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Portfolio amount", UI.money(total), lines.length + " lines", "")}
    ${UI.stat("Estimated all-in cost", wcost.toFixed(1) + " bps", "Incl. commission / spread / impact / fund OCF", "green")}
    ${UI.stat("Deviation vs proposal layer", "0.0%", "Cost +0.1 bps", "green")}
    ${UI.stat("Funding status", "Validated", "T+0 gap $0", "green")}
  </div>
  <div class="note green" style="margin-top:10px"><b>Integrity checks passed:</b>6/6 lines have templates; 6/6 lines have funding accounts; 0 lines trigger re-proposal; 0 lines hit the restricted list. Cost +0.1 bps and weight deviation 0.0pp, both within tolerance.</div>
  <div class="card" style="margin-top:10px">
    <div class="card-head"><div><h2>Line-by-line blueprint</h2><p>Click any row for the full field set (TIF, settlement, tax basis, suitability, approval).</p></div><div class="spacer"></div><span class="pill blue">Version v3</span></div>
    ${UI.table([
      "#", "Template", "Instrument / ISIN", "Action", "Qty", "Amount", "Weight", "venue", "Type", "Limit", "Timing", "Cost bps (first year / annualised)", "Tax basis", "Funding", "Status"
    ], lines.map(l => [
      `<span class="mono">${l.no}</span>`,
      `<span class="mono">${l.tpl}</span>`,
      `<span class="strong">${l.inst}</span><span class="sub mono">${l.isin}</span>`,
      `<b>${l.act}</b>`, `<span class="num">${l.qty}</span>`, `<span class="num">${UI.money(l.amt)}</span>`, `<span class="num">${l.w}%</span>`,
      l.venue, l.type, l.limit, l.timing, `<span class="num">${l.cost} bps</span>`, l.taxLot, `<span class="mono">${l.funding}</span>`,
      UI.pill(l.status, l.status === "Ready" ? "green" : "amber")
    ]), { compact: true })}
    <div class="card-foot"><span class="tiny muted">Line-level change rule: cost +20bps / weight +2pp / risk rating up → return to the proposal layer.</span><div style="flex:1"></div><button class="btn sm" data-action="toast" data-msg="Execution blueprint v3.1 saved">Save</button></div>
  </div>
  <div class="grid-3" style="margin-top:10px">
    <div class="card"><div class="card-body"><div class="tiny muted">Proposal layer → execution layer</div><div class="strong" style="margin:4px 0">No deviation, only execution</div><div class="small muted">After selecting A, the execution layer splits the 38% bond ladder into 3 lines; UCITS 42% into 1 line; gold 8% and cash 12% into 1 line each.</div></div></div>
    <div class="card"><div class="card-body"><div class="tiny muted">Cost</div><div class="strong" style="margin:4px 0">${wcost.toFixed(1)} bps</div><div class="small muted">Commission 3.1 / spread 4.2 / impact 3.6 / custody 1.5 / fund OCF 8.7. Deviation of +0.1 vs the proposal layer's 21.0 bps.</div></div></div>
    <div class="card"><div class="card-body"><div class="tiny muted">Approval</div><div class="strong" style="margin:4px 0">RM → IC → Compliance</div><div class="small muted">T2 dual review; the US estate tax WARN needs conditional Compliance approval.</div></div></div>
  </div>`;
};

RENDER["m1-compliance"] = () => {
  const s = App.state.compliance;
  const warn = DB.checks.filter(x => x.sev === "WARN").length;
  const pass = DB.checks.filter(x => x.sev === "PASS").length;
  const approved = s.approved;
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Compliance gate`,
    title: "Compliance Gate",
    sub: "Four-dimension rules constrain output at generation; BLOCK cannot be overridden, WARN needs a named approver and conditions.",
    actions: `<button class="btn" data-action="toast" data-msg="Check workpaper exported (PDF)">Export workpaper</button>
      <button class="btn primary" data-action="create-order" ${approved ? "" : "disabled"}>Create orders</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Checks", DB.checks.length, "10 items", "")}
    ${UI.stat("PASS", pass, "No blockers", "green")}
    ${UI.stat("WARN", warn, "Needs conditional approval", "amber")}
    ${UI.stat("BLOCK", 0, "None", "green")}
  </div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card">
      <div class="card-head"><div><h2>Check results</h2><p>Rule version 2026.10.3 · input snapshot locked</p></div><div class="spacer"></div>${approved ? UI.pill("Approved with conditions", "green") : UI.pill("Pending approval", "amber")}</div>
      ${UI.table(["Check", "Result", "Rule", "Explanation", "Evidence", ""], DB.checks.map(k => [
        `<span class="strong">${k.name}</span><span class="sub">${k.id}</span>`,
        UI.pill(k.sev, k.sev === "PASS" ? "green" : k.sev === "WARN" ? "amber" : "red"),
        `<span class="mono">${k.rule}</span>`, `<span class="small">${k.msg}</span>`,
        `<span class="mono tiny">${k.evidence}</span>`,
        k.sev === "WARN" && !approved ? `<button class="btn sm" data-action="approve-warn">Approve with conditions</button>` : `<span class="tiny muted">—</span>`
      ]), { compact: true })}
    </div>
    <div>
      <div class="card"><div class="card-head"><div><h2>Approval chain</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="when">09:04</div><div class="what">RM submitted proposal v3</div><div class="who">Alex Chan</div></div>
          <div class="tl-item"><div class="when">09:06</div><div class="what">IC reviewed allocation and assumptions</div><div class="who">Grace Lin · signed</div></div>
          <div class="tl-item"><div class="when">09:08</div><div class="what">${approved ? "Compliance approved with conditions" : "Compliance pending approval"}</div><div class="who">${approved ? "David Wong · condition: US tax adviser opinion" : "David Wong"}</div></div>
          <div class="tl-item"><div class="when">—</div><div class="what">Client e-signature</div><div class="who">${approved ? "Awaiting client" : "Not started"}</div></div>
        </div>
        <div class="divider"></div>
        <button class="btn" style="width:100%" data-action="esign">Client e-signature</button>
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">Conditions</div>
        <div class="small strong" style="margin:4px 0">US estate tax exposure</div>
        <div class="small muted">US Treasuries are US situs assets; the non-resident exemption is only USD 60k. Condition: the client obtains a written US tax adviser opinion before drawdown or ordering; otherwise switch to Irish UCITS.</div>
      </div></div>
    </div>
  </div>
  <div class="note" style="margin-top:10px"><b>Hard rules:</b>There is no “force pass” button for BLOCK; WARN can only be approved with conditions by IC / Compliance within their authority, and always with an expiry date. Every check writes an EvidenceEvent (rule version + input snapshot).</div>`;
};

RENDER["m1-orders"] = () => {
  const filled = DB.orders.filter(o => o.status === "Filled").length;
  const total = DB.orders.length;
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Orders`,
    title: "Orders & TCA",
    sub: "Parent orders split into child orders; costs, tax basis and template benchmarks are written back after fills.",
    actions: `<button class="btn" data-action="toast" data-msg="TCA generated: IS 8.4 bps, better than the 10 bps estimate">Generate TCA</button>
      <button class="btn" data-action="toast" data-msg="Client cost report generated (watermarked PDF)">Export cost report</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Parent orders", total, filled + " filled", "")}
    ${UI.stat("Fill rate", Math.round(filled / total * 100) + "%", "1 partial fill", "amber")}
    ${UI.stat("Implementation Shortfall", "8.4 bps", "Estimate 10.0 bps", "green")}
    ${UI.stat("Trading cost", "$24,800", "12.4 bps × $20m", "")}
  </div>
  <div class="card" style="margin-top:10px">
    <div class="card-head"><div><h2>Order book</h2><p>Benchmarks: ARRIVAL / VWAP; execution strategy: TWAP / POV 20%.</p></div><div class="spacer"></div>${UI.pill("In progress", "blue")}</div>
    ${UI.table(["Parent", "Instrument", "Side", "Qty", "Filled", "Avg price", "Benchmark", "Slippage", "Progress", "Status"], DB.orders.map(o => [
      `<span class="mono">${o.id}</span>`, `<span class="strong">${o.inst}</span>`, o.side,
      `<span class="num">${UI.num(o.qty)}</span>`, `<span class="num">${UI.num(o.filled)}</span>`,
      `<span class="num">${o.avg.toFixed(2)}</span>`, `<span class="num">${o.bench.toFixed(2)}</span>`,
      `<span class="num ${o.slip > 3 ? "amber" : "green"}">${o.slip.toFixed(1)} bps</span>`,
      `<div style="min-width:80px"><div class="progress ${o.status === "Partial" ? "red" : ""}"><i style="width:${Math.round(o.filled / o.qty * 100)}%"></i></div></div>`,
      UI.pill(o.status, o.status === "Filled" ? "green" : "amber")
    ]), { compact: true })}
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>Cost waterfall</h2></div></div><div class="card-body">
      ${UI.bars([
        { label: "Commission", value: 31, display: "3.1 bps", color: "var(--blue)" },
        { label: "Spread", value: 42, display: "4.2 bps", color: "var(--purple)" },
        { label: "Impact", value: 36, display: "3.6 bps", color: "var(--amber)" },
        { label: "Custody / platform", value: 15, display: "1.5 bps", color: "var(--green)" }
      ], 60)}
      <div class="divider"></div><div class="row between"><span class="small muted">Trading cost (ex fund OCF)</span><span class="strong">12.4 bps</span></div>
    </div></div>
    <div class="card"><div class="card-head"><div><h2>Template write-back</h2><p>Actual cost vs proposal estimate.</p></div></div><div class="card-body">
      ${UI.table(["Template", "Estimate", "Actual", "Variance"], [
        ["FI-LADDER-01", "4.0 bps", "4.4 bps", `<span class="amber">+0.4</span>`],
        ["FD-UCITS-01", "42.0 bps", "41.2 bps", `<span class="green">−0.8</span>`],
        ["EQ-CASH-01", "25.0 bps", "27.1 bps", `<span class="amber">+2.1</span>`]
      ], { compact: true })}
      <div class="tiny muted" style="margin-top:6px">Variance >15% automatically creates a review task; not triggered here.</div>
    </div></div>
  </div>`;
};

/* ───────── M2 ───────── */

RENDER["m2-allocation"] = () => {
  const a = DB.allocation;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · Allocation`,
    title: "Allocation Studio",
    sub: "IPS policy ranges are hard constraints; the optimiser only finds feasible solutions and does not promise the optimum.",
    actions: `<button class="btn" data-action="toast" data-msg="Re-ran the constrained solve with the 25% turnover cap">Rebalance</button>
      <button class="btn primary" data-action="go" data-page="m2-stress">Run stress test</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Expected annualised", UI.pct(a.expected), "10-yr CMA v2026.10", "")}
    ${UI.stat("Annualised volatility", UI.pct(a.vol), "Target ≤ 10%", "green")}
    ${UI.stat("Stress drawdown", UI.pct(a.dd), "Equity −30% scenario", "amber")}
    ${UI.stat("Sharpe (est.)", a.sharpe.toFixed(2), "Risk-free 3.2%", "")}
  </div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>Strategic allocation</h2><p>6 asset classes; 8% cash covers 18 months of spending.</p></div></div><div class="card-body">
      ${UI.donut(a.buckets, "Total", UI.money(a.total))}
    </div></div>
    <div class="card"><div class="card-head"><div><h2>Policy ranges</h2><p>A breach blocks.</p></div></div>
      ${UI.table(["Asset", "Current", "Range", "Status"], a.buckets.map(b => [
        b.name, `<b class="mono">${b.w}%</b>`, `${b.min}–${b.max}%`,
        UI.pill(b.w >= b.min && b.w <= b.max ? "In range" : "Out of range", b.w >= b.min && b.w <= b.max ? "green" : "red")
      ]), { compact: true })}
    </div>
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>Constraints and binding items</h2></div></div><div class="card-body">
      <div class="two-col-list">
        <div>Cash ≥ 8% <span class="pill green">binding</span></div>
        <div>Single issuer ≤ 15% <span class="pill green">ok</span></div>
        <div>Non-USD ≤ 25% <span class="pill amber">binding</span></div>
        <div>Turnover ≤ 25% <span class="pill green">ok</span></div>
        <div>PE ≤ 15% <span class="pill green">ok</span></div>
        <div>Volatility ≤ 10% <span class="pill green">ok</span></div>
      </div>
      <div class="note blue" style="margin-top:8px"><b>Method:</b>Black-Litterman + constrained optimisation; CMA v2026.10; 1,000 resamples. The harder the constraints, the more this is a feasible-solution search than an optimum.</div>
    </div></div>
    <div class="card"><div class="card-head"><div><h2>Change vs current portfolio</h2></div></div><div class="card-body">
      ${UI.table(["Asset", "Current", "Target", "Change"], [
        ["Cash", "14%", "8%", `<span class="red">−6pp</span>`],
        ["Investment grade bonds", "22%", "35%", `<span class="green">+13pp</span>`],
        ["Global equity", "38%", "30%", `<span class="red">−8pp</span>`],
        ["Alternatives", "12%", "15%", `<span class="green">+3pp</span>`],
        ["Gold", "2%", "5%", `<span class="green">+3pp</span>`],
        ["Private equity", "12%", "7%", `<span class="red">−5pp</span>`]
      ], { compact: true })}
      <div class="tiny muted" style="margin-top:6px">Estimated turnover 18%; tax cost $42k; implementation cost 14 bps.</div>
    </div></div>
  </div>`;
};

RENDER["m2-stress"] = () => {
  const active = App.state.stressScenario || "eq";
  const s = DB.stress.find(x => x.id === active) || DB.stress[0];
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · Stress`,
    title: "Stress Test",
    sub: "Answers “where does it hurt worst”, not “what is the worst case”. Correlations rise in a crisis.",
    actions: `<button class="btn" data-action="toast" data-msg="All 6 scenarios run (async, 3.2s)">Run all</button>
      <button class="btn primary" data-action="go" data-page="m2-decision">Generate decision card</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("Portfolio P&L", UI.pct(s.pnl), s.name, s.pnl < -15 ? "red" : "amber")}
    ${UI.stat("Max drawdown", UI.pct(s.dd), "Within scenario", "amber")}
    ${UI.stat("T+7 Available", s.t7 + "%", s.t7 < 10 ? "Below the 10% floor" : "Above the floor", s.t7 < 10 ? "red" : "green")}
    ${UI.stat("Margin call estimate", s.margin ? UI.money(s.margin) : "0", s.margin ? "Margin required" : "None", s.margin ? "red" : "green")}
  </div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>Scenario comparison</h2><p>Click to switch; all scenarios include costs and tax.</p></div></div><div class="card-body">
      ${UI.bars(DB.stress.map(x => ({ label: x.name, value: Math.abs(x.pnl), display: UI.pct(x.pnl), color: x.id === active ? "var(--red)" : "var(--amber)" })), 25)}
      <div class="divider"></div>
      ${UI.table(["Scenario", "P&L", "Drawdown", "T+7", "Margin call", "Explanation"], DB.stress.map(x => [
        `<button class="btn ghost sm" data-action="stress" data-id="${x.id}" style="padding:0;color:${x.id === active ? "var(--red)" : "var(--ink)"}">${x.name}</button>`,
        `<span class="num ${x.pnl < -15 ? "red" : ""}">${UI.pct(x.pnl)}</span>`, UI.pct(x.dd), x.t7 + "%", x.margin ? UI.money(x.margin) : "—", `<span class="tiny muted">${x.note}</span>`
      ]), { compact: true })}
    </div></div>
    <div>
      <div class="card"><div class="card-head"><div><h2>Transmission path</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="what">Equity beta 0.92</div><div class="who">Global equity −30% → portfolio −9.2%</div></div>
          <div class="tl-item"><div class="what">Credit spread +80bp</div><div class="who">IG bonds −3.1% → portfolio −1.1%</div></div>
          <div class="tl-item"><div class="what">Correlations rise</div><div class="who">Gold hedge fails → extra −1.8%</div></div>
          <div class="tl-item"><div class="what">Liquidity discount</div><div class="who">PE gate → T+7 falls to 21%</div></div>
        </div>
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">Assumptions and limitations</div>
        <div class="small muted" style="margin-top:4px">Historical scenarios use actual prices; hypothetical scenarios use factor mapping; crisis correlations can exceed the model. The output is not the worst case, only “if this happens”.</div>
      </div></div>
    </div>
  </div>`;
};

RENDER["m2-backtest"] = () => {
  const b = DB.backtest;
  const inc = App.state.includeCosts;
  const cagr = inc ? b.cagrCost : b.cagr;
  const sharpe = inc ? b.sharpeCost : b.sharpe;
  const pts = inc ? b.points.map((v, i) => i === 0 ? 100 : 100 + (v - 100) * .86) : b.points;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · Backtest`,
    title: "Backtest Lab",
    sub: "Strategy rules can be restated; with costs, with tax, with out-of-sample; a backtest is not a forecast.",
    actions: `<div class="btn-group"><button class="${inc ? "on" : ""}" data-action="set-cost" data-id="1">With costs</button><button class="${inc ? "" : "on"}" data-action="set-cost" data-id="0">Theoretical</button></div>
      <button class="btn primary" data-action="go" data-page="m2-decision">Generate decision card</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("CAGR", UI.pct(cagr), inc ? "With costs/tax" : "Without costs", "")}
    ${UI.stat("Sharpe", sharpe.toFixed(2), "OOS " + b.oos.toFixed(2), "")}
    ${UI.stat("Max drawdown", UI.pct(b.dd), "2018–2026", "amber")}
    ${UI.stat("Deflated Sharpe", b.deflated.toFixed(2), "Multiple-testing adjusted", "amber")}
  </div>
  <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>NAV curve</h2><p>60/40 + 10% gold + 5% trend overlay; quarterly rebalancing.</p></div><div class="spacer"></div>${UI.pill(inc ? "With costs" : "Theoretical", inc ? "green" : "amber")}</div>
    <div class="card-body chart">
      ${UI.lineChart([{ name: "Portfolio", color: "var(--red)", points: pts }], { height: 230, min: 80, max: 180, xLabels: ["2018", "2020", "2022", "2024", "2026"] })}
    </div>
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>Metrics</h2></div></div><div class="card-body">
      ${UI.table(["Metric", "In-sample", "Out-of-sample", "Threshold"], [
        ["CAGR", UI.pct(cagr), UI.pct(cagr - 1.1), "≥ 5%"],
        ["Sharpe", sharpe.toFixed(2), b.oos.toFixed(2), "≥ 0.4"],
        ["Max DD", UI.pct(b.dd), "−16.8%", "≥ −20%"],
        ["Turnover", b.turnover + "%", "—", "≤ 30%"],
        ["Hit rate", b.hit + "%", "—", "—"]
      ], { compact: true })}
    </div></div>
    <div class="card"><div class="card-head"><div><h2>Limitations and red flags</h2></div></div><div class="card-body">
      <div class="note amber"><b>Overfitting check:</b>24 parameter sweeps, Deflated Sharpe 0.43; out-of-sample Sharpe 0.51, below in-sample 0.65, but not broken.</div>
      <div class="note" style="margin-top:7px"><b>Data:</b>PIT financials / index constituents; delisted names retained; prices split-adjusted; missing values are not forward-filled.</div>
      <div class="tiny muted" style="margin-top:7px">Capacity estimate: at 20% ADV, strategy capacity is about $180m; beyond that impact cost rises non-linearly.</div>
    </div></div>
  </div>`;
};

RENDER["m2-decision"] = () => {
  const d = App.state.decision;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · Decision card`,
    title: "RM Decision Card",
    sub: "Compress 20 pages of analysis into one page the RM can talk through with the client; the RM decides how to deliver it.",
    actions: `<button class="btn" data-action="toast" data-msg="Client version PDF generated (watermarked)">Generate client version</button>
      <button class="btn primary" data-action="save-decision">Save decision</button>`
  }) + `
  <div class="grid-2-1">
    <div class="card"><div class="card-head"><div><h2>Client question</h2><p>“I don't want to sell too much stock, but I need diversification, and I need to keep cash.” — Chen Zhiyuan, 2026-10-20</p></div></div><div class="card-body">
      <div class="note green"><b>Recommendation:</b>Use 3 years to cut single-stock weight from 42% to 30%; sell no more than 7% per year; route the proceeds into “bond ladder + global funds”; and use Lombard to cover the first 18 months of liquidity so nothing is sold at the low.</div>
      <div class="grid-3" style="margin-top:10px">
        ${UI.stat("Option A", "Fast de-risking", "2 yrs · tax concentrated", "")}
        ${UI.stat("Option B", "Balanced (recommended)", "3 yrs · tax smoothed", "green")}
        ${UI.stat("Option C", "Minimum action", "5 yrs · concentration persists", "amber")}
      </div>
      ${UI.table(["", "Option A", "Option B", "Option C"], [
        ["Single stock (after 3 yrs)", "22%", "<b>30%</b>", "38%"],
        ["Stress drawdown (equity −30%)", "−22%", "<b>−15%</b>", "−19%"],
        ["Tax (5-yr cumulative)", "High", "<b>Medium</b>", "Low"],
        ["Liquidity (T+7)", "24%", "<b>18%</b>", "14%"]
      ], { compact: true })}
      <div class="divider"></div>
      <div class="grid-2">
        <div><div class="tiny muted">What would change the recommendation</div><div class="small">Lock-up / window periods, pledge coverage < 150%, a 40% valuation write-down, a change in tax residency.</div></div>
        <div><div class="tiny muted">Key risks</div><div class="small">Valuation downside, sell-down rules, change in tax residency, liquidity.</div></div>
      </div>
      <div class="tiny muted" style="margin-top:7px">Assumptions: CMA v2026.10; tax rate 20%; costs include commission / spread / impact; stress correlations rise. Not a return forecast.</div>
    </div></div>
    <div>
      <div class="card"><div class="card-head"><div><h2>RM decision</h2><p>A rejection needs a written reason; the RM decides how to deliver.</p></div></div><div class="card-body">
        <div class="stack">
          <label class="check"><input type="radio" name="decision" value="adopt" ${d === "adopt" ? "checked" : ""}> <span><b>Adopt</b><small>Deliver to the client as recommended</small></span></label>
          <label class="check"><input type="radio" name="decision" value="modify" ${d === "modify" ? "checked" : ""}> <span><b>Modify</b><small>Recalculate after adjustment</small></span></label>
          <label class="check"><input type="radio" name="decision" value="reject" ${d === "reject" ? "checked" : ""}> <span><b>Reject</b><small>Internal reference only, no client materials</small></span></label>
        </div>
        <div class="divider"></div>
        ${UI.field({ label: "Rationale / reservations", type: "textarea", rows: 3, value: "Client is sensitive to lock-up periods; recommend a 12-month cash buffer first, then start selling down.", help: "Mandatory if rejecting" })}
        ${UI.field({ label: "Delivery mode", type: "select", value: "Meeting + summary PDF", options: ["Meeting + full PDF", "Meeting + summary PDF", "App push", "Internal only"] })}
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">Confidence</div><div class="strong" style="margin:3px 0">Medium</div>
        <div class="small muted">Depends on valuation and sell-down rule assumptions; a change in tax residency would materially change the conclusion.</div>
      </div></div>
    </div>
  </div>`;
};
