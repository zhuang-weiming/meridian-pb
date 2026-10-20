/* App shell, state, router, actions */
const DEFAULT_STATE = {
  role: "RM",
  navCollapsed: false,
  clientId: "C-1001",
  page: "m1-dashboard",
  proposal: { generated: false, selected: "P-A" },
  compliance: { approved: false, esign: false },
  stressScenario: "eq",
  includeCosts: true,
  decision: "adopt",
  facilityStress: "base",
  hubView: "client",
  serviceFilter: "All",
  valuationLtv: 22,
  ltvApproved: false,
  pledge: { V: 100000000, B: 1000000, t: 20, C: 25000000, i: 6.5, n: 5, r: 8, d: 0 },
  trustTab: "structure",
  m3tab: "tax",
  taxScenario: "A",
  taxLevers: ["L3", "L4", "L8"],
  clientTab: "proposal",
  taxSigned: false
};

const App = {
  state: null,

  load() {
    try {
      const raw = localStorage.getItem("hsbc_pb_demo_en_v1");
      this.state = raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : Object.assign({}, DEFAULT_STATE);
    } catch (e) {
      this.state = Object.assign({}, DEFAULT_STATE);
    }
    const q = new URLSearchParams(location.search);
    if (q.get("role")) this.state.role = q.get("role");
    if (q.get("client")) this.state.clientId = q.get("client");
    if (q.get("page")) this.state.page = q.get("page");
    const hp = location.hash.replace("#/", "");
    if (hp && PAGES.find(p => p.id === hp)) this.state.page = hp;
    else if (!location.hash) location.hash = "#/" + this.state.page;
    if (this.state.page === "m3-hub") this.state.serviceFilter = "All";
  },

  save() {
    try { localStorage.setItem("hsbc_pb_demo_en_v1", JSON.stringify(this.state)); } catch (e) {}
  },

  client() {
    return DB.clients.find(c => c.id === this.state.clientId) || DB.clients[0];
  },

  founder() {
    return DB.clients.find(c => c.id === "C-88421");
  },

  tes(subs) {
    return +(subs.cost * .25 + subs.tax * .20 + subs.time * .20 + subs.impact * .20 + subs.ease * .15).toFixed(1);
  },

  pledgeCalc(p) {
    const V = +p.V, B = +p.B, t = +p.t / 100, C = +p.C, i = +p.i / 100, n = +p.n, r = +p.r / 100;
    const S = C / (1 - t * (1 - B / V));
    const tax = t * S * (1 - B / V);
    const remain = V - S;
    const interest = C * i * n;
    const sellAt8 = remain * Math.pow(1.08, n);
    const pledgeAt8 = V * Math.pow(1.08, n) - C - interest;
    const breakeven = Math.pow(C * (1 + i * n) / S, 1 / n) - 1;
    const sellDown = remain * 0.6;
    const pledgeDown = V * 0.6 - C - interest;
    const rates = [-0.2, -0.1, 0, 0.08, 0.15];
    const sellSeries = rates.map(x => +(remain * Math.pow(1 + x, n) / 1e6).toFixed(2));
    const pledgeSeries = rates.map(x => +((V * Math.pow(1 + x, n) - C - interest) / 1e6).toFixed(2));
    let recommend = "Hybrid";
    if (r > breakeven + .03 && pledgeDown > 0) recommend = "Pledge";
    else if (r <= breakeven + .02) recommend = "Sell";
    const rationale = recommend === "Pledge"
      ? `Expected return ${(r * 100).toFixed(1)}% is above break-even ${(breakeven * 100).toFixed(2)}% + a 3% buffer; the −40% scenario is still positive. Recommend pledging, but keep the 40% margin-call clause and the interest-coverage check.`
      : recommend === "Sell"
        ? `Expected return ${(r * 100).toFixed(1)}% is not meaningfully above break-even ${(breakeven * 100).toFixed(2)}%; or the −40% scenario cannot be topped up. Recommend selling / part-selling.`
        : `Break-even ${(breakeven * 100).toFixed(2)}%; expected return is close to the threshold. Recommend “sell half + pledge half” to reduce concentration and margin-call risk.`;
    return { sellAmt: S, tax, remain, interest, sellAt8, pledgeAt8, breakeven, sellDown, pledgeDown, downsideGap: sellDown - pledgeDown, sellSeries, pledgeSeries, recommend, rationale };
  },

  allowed() {
    return PAGES.filter(p => p.roles.includes(this.state.role));
  },

  go(id) {
    const page = PAGES.find(p => p.id === id);
    if (!page) return;
    if (!page.roles.includes(this.state.role)) {
      UI.toast("Current role has no access to this page (permission matrix)", "red");
      return;
    }
    const leavingCase = this.state.page.startsWith("m4") || this.state.page.startsWith("m5") || this.state.page === "m3-hub";
    if (id.startsWith("m4")) this.state.clientId = "C-88421";
    else if (id.startsWith("m5") || id === "m3-hub") this.state.clientId = "C-7701";
    else if (leavingCase && (this.state.clientId === "C-88421" || this.state.clientId === "C-7701")) this.state.clientId = "C-1001";
    if (id === "m3-hub") this.state.serviceFilter = "All";
    this.state.page = id;
    this.save();
    if (location.hash !== "#/" + id) history.pushState(null, "", "#/" + id);
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  topbar() {
    const c = this.client();
    const lockClient = this.state.page.startsWith("m4") || this.state.page.startsWith("m5") || this.state.page === "m3-hub";
    return `<div class="topbar">
      <button class="icon-btn" data-action="toggle-nav" title="Collapse / expand navigation">☰</button>
      <div class="brand">
        <div class="brand-mark">HSBC</div>
        <div><div class="brand-name">Private Bank</div><div class="brand-sub">Core system blueprint · Demo v1.0 · 29 routes</div></div>
      </div>
      <div class="topbar-spacer"></div>
      <div class="top-select"><label>Client</label>
        <select id="clientSel" ${lockClient ? "disabled" : ""} title="${lockClient ? "Client is fixed for this case; switch pages to change it" : "Switch client"}">
          ${DB.clients.map(x => `<option value="${x.id}" ${x.id === c.id ? "selected" : ""}>${x.name} · ${x.segment}</option>`).join("")}
        </select>
      </div>
      <div class="top-select"><label>Role</label>
        <select id="roleSel">
          ${["RM", "TH", "IC", "Compliance", "Credit", "Trustee", "Vendor", "Client"].map(r => `<option ${r === this.state.role ? "selected" : ""}>${r}</option>`).join("")}
        </select>
      </div>
      <div class="tiny muted" style="white-space:nowrap">${DB.asOf}</div>
      <button class="icon-btn" data-action="toast" data-msg="3 notifications: WARN pending approval, valuation updated, service invitation awaiting confirmation">🔔<span class="badge-dot"></span></button>
      <div class="avatar">AC</div>
    </div>`;
  },

  nav() {
    const groups = ["M1", "M2", "M3", "M4", "M5", "X"];
    return groups.map(g => {
      const items = PAGES.filter(p => p.mod === g && p.roles.includes(this.state.role));
      if (!items.length) return "";
      return `<div class="side-group"><div class="side-label">${MODULES[g].name}</div>
        ${items.map(p => `<a class="nav-item ${p.id === this.state.page ? "active" : ""}" href="#/${p.id}" data-action="go" data-page="${p.id}">
          <span class="nav-ico">${p.icon}</span><span>${p.title}</span>
        </a>`).join("")}
      </div>`;
    }).join("");
  },

  sidebar() {
    return `<aside class="sidebar">
      ${this.nav()}
      <div class="side-foot">
        <button class="btn sm" style="width:100%;justify-content:center" data-action="demo-script">Demo script</button>
        <button class="btn sm" style="width:100%;justify-content:center;margin-top:5px" data-action="reset">Reset demo</button>
        <div style="margin-top:9px">Demo data only. Not investment, tax or legal advice.</div>
      </div>
    </aside>`;
  },

  rightbar(page) {
    if (this.state.role === "Client" || this.state.role === "Vendor") return "";
    const c = this.client();
    const next = {
      "m1-dashboard": ["Generate three options", "m1-proposal"],
      "m1-proposal": ["Select option A, move to the execution layer", "m1-execution"],
      "m1-execution": ["Send to compliance gate", "m1-compliance"],
      "m1-compliance": ["Approve the WARN with conditions, create orders", "m1-orders"],
      "m1-orders": ["Write back TCA, move to review", "m1-orders"],
      "m2-allocation": ["Run stress test", "m2-stress"],
      "m2-stress": ["Generate RM decision card", "m2-decision"],
      "m2-backtest": ["Generate RM decision card", "m2-decision"],
      "m2-decision": ["Save the decision, generate the client version", "m2-decision"],
      "m3-financing": ["Submit for credit pre-review", "m3-financing"],
      "m3-taxlegal": ["Refer to a tax adviser / lawyer", "m3-taxlegal"],
      "m3-hub": ["Filter services by family member and send invitations", "m3-hub"],
      "m4-founder": ["Move to independent valuation", "m4-valuation"],
      "m4-valuation": ["Approve LTV, write the 40% trigger into pre-conditions", "m4-valuation"],
      "m4-pledge": ["Adjust assumptions, compare pledge vs sell", "m4-pledge"],
      "m4-trust": ["View the tax ledger", "m4-trust"],
      "m5-intake": ["Start the tax profile", "m5-profile"],
      "m5-profile": ["Generate the baseline tax map", "m5-baseline"],
      "m5-baseline": ["Select levers", "m5-levers"],
      "m5-levers": ["Generate scenarios", "m5-scenarios"],
      "m5-booking": ["Use in scenarios", "m5-scenarios"],
      "m5-scenarios": ["Run the anti-avoidance check", "m5-substance"],
      "m5-substance": ["Send to the internal tax team", "m5-advisor"],
      "m5-advisor": ["RM approves and delivers", "m5-delivery"],
      "m5-delivery": ["Annual review", "m5-review"],
      "m5-review": ["Back to the case", "m5-intake"],
      "audit": ["Export the audit pack", "audit"]
    }[page.id] || ["Continue", page.id];
    return `<aside class="rightbar">
      <div class="card"><div class="card-head"><div><h2>Client snapshot</h2><p>${c.segment} · ${c.rm}</p></div></div><div class="card-body">
        <div class="strong">${c.name}</div>
        <div class="tiny muted">${c.booking.join(" / ")} · ${c.entity}</div>
        <div class="divider"></div>
        <div class="grid-2" style="gap:7px">
          <div><div class="tiny muted">Total wealth</div><div class="strong">${UI.money(c.totalWealth)}</div></div>
          <div><div class="tiny muted">T+7</div><div class="strong">${UI.money(c.liquid)}</div></div>
          <div><div class="tiny muted">Concentration</div><div class="strong ${c.concentration > .6 ? "red" : ""}">${UI.pct(c.concentration * 100)}</div></div>
          <div><div class="tiny muted">Risk</div><div class="strong">${c.risk}</div></div>
        </div>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Next step</h2></div></div><div class="card-body">
        <div class="small strong">${next[0]}</div>
        <button class="btn sm primary" style="margin-top:7px;width:100%" data-action="go" data-page="${next[1]}">Continue</button>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Evidence / approvals</h2></div></div><div class="card-body">
        <div class="timeline">${DB.audit.slice(-4).map(a => `<div class="tl-item"><div class="when">${a.t}</div><div class="what">${a.what}</div><div class="who">${a.who}</div></div>`).join("")}</div>
        <button class="btn sm" style="width:100%;margin-top:6px" data-action="go" data-page="audit">Open evidence chain</button>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-body">
        <div class="tiny muted">Current role permissions</div>
        <div class="small"><b>${this.state.role}</b> · ${this.state.role === "Compliance" ? "full read + approval" : this.state.role === "Client" ? "self / authorised family" : this.state.role === "Vendor" ? "RFP / contracts" : "own clients"}</div>
        <div class="tiny muted" style="margin-top:4px">Switch the Role in the top bar to see field and page changes.</div>
      </div></div>
    </aside>`;
  },

  render() {
    if (this.state.page.startsWith("m4")) this.state.clientId = "C-88421";
    if (this.state.page.startsWith("m5") || this.state.page === "m3-hub") this.state.clientId = "C-7701";
    let page = PAGES.find(p => p.id === this.state.page);
    if (!page || !page.roles.includes(this.state.role)) {
      page = this.allowed()[0] || PAGES[0];
      this.state.page = page.id;
    }
    const html = `<div class="app ${this.state.navCollapsed ? "nav-collapsed" : ""}">
      ${this.topbar()}
      <div class="shell">
        ${this.sidebar()}
        <div class="main-wrap"><main class="main" id="main">${RENDER[page.id] ? RENDER[page.id]() : `<div class="empty">Page not implemented</div>`}</main>${this.rightbar(page)}</div>
      </div>
    </div>`;
    document.getElementById("app").innerHTML = html;
    this.afterRender();

  },

  afterRender() {
    const ltv = document.querySelector("[data-ltv]");
    if (ltv) {
      ltv.addEventListener("input", () => {
        const v = +ltv.value;
        this.state.valuationLtv = v;
        const lend = DB.valuation.lendable;
        const fac = lend * v / 100;
        const cov = lend / fac;
        const f = document.getElementById("ltv-facility");
        const c = document.getElementById("ltv-cov");
        const vv = document.getElementById("ltv-value");
        if (f) f.textContent = UI.money(fac);
        if (c) c.textContent = cov.toFixed(2) + "x";
        if (vv) vv.value = v + "%";
        this.save();
      });
    }
  }
};

window.App = App;

/* Global events */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const a = el.dataset.action;
  const id = el.dataset.id;
  if (a === "go") { e.preventDefault(); App.go(el.dataset.page); return; }
  if (a === "toast") { UI.toast(el.dataset.msg || "Done"); return; }
  if (a === "generate-proposals") {
    App.state.proposal.generated = true;
    App.state.proposal.selected = "P-A";
    App.save(); App.render();
    UI.toast("3 options generated; TES calculated (mock)", "green");
    return;
  }
  if (a === "select-proposal") {
    App.state.proposal.selected = id; App.save(); App.render();
    UI.toast("Selected " + id + "; the execution layer will build from this version");
    return;
  }
  if (a === "approve-warn") {
    App.state.compliance.approved = true; App.save(); App.render();
    UI.toast("WARN approved with conditions: US tax adviser opinion (within 30 days)", "amber");
    return;
  }
  if (a === "create-order") {
    if (!App.state.compliance.approved) { UI.toast("Complete the conditional WARN approval first", "red"); return; }
    App.go("m1-orders"); UI.toast("Orders created: 5 parent orders / 7 child orders", "green"); return;
  }
  if (a === "esign") {
    UI.modal("Client e-signature", `<div class="note green"><b>Proposal v3</b> · Cost disclosure, risk warnings and KFS attached; cannot be changed after signing.</div><div class="check" style="margin-top:8px"><input type="checkbox" checked> <span>Client has read and understood the main risks</span></div>`, `<button class="btn" data-action="close-overlay">Cancel</button><button class="btn primary" data-action="confirm-esign">Confirm signature</button>`);
    return;
  }
  if (a === "confirm-esign") { App.state.compliance.esign = true; App.save(); UI.closeModal(); UI.toast("Client signed v3; orders can be released", "green"); App.render(); return; }
  if (a === "stress") { App.state.stressScenario = id; App.save(); App.render(); return; }
  if (a === "set-cost") { App.state.includeCosts = id === "1"; App.save(); App.render(); return; }
  if (a === "save-decision") {
    const r = document.querySelector('input[name="decision"]:checked');
    App.state.decision = r ? r.value : "adopt"; App.save();
    UI.toast("RM decision saved; the client version can be generated", "green"); return;
  }
  if (a === "facility-stress") { App.state.facilityStress = id; App.save(); App.render(); return; }
  if (a === "m3tab") { App.state.m3tab = id; App.save(); App.render(); return; }
  if (a === "hub-view") { App.state.hubView = id; App.save(); App.render(); return; }
  if (a === "service-filter") { App.state.serviceFilter = id; App.save(); App.render(); return; }
  if (a === "award-vendor") {
    DB.vendors.forEach(v => { v.selected = v.id === id; v.status = v.id === id ? "Awarded" : "Shortlist"; });
    App.render(); UI.toast("Awarded " + id + "; the client will receive an invitation (no price or score)", "green"); return;
  }
  if (a === "trust-tab") { App.state.trustTab = id; App.save(); App.render(); return; }
  if (a === "approve-ltv") { App.state.ltvApproved = true; App.save(); UI.toast("LTV approved; the 40% trigger is written into the pre-conditions", "green"); App.render(); return; }
  if (a === "calc-pledge") {
    const g = (k) => +document.getElementById("pv-" + k).value;
    App.state.pledge = { V: g("V"), B: g("B"), t: g("t"), C: g("C"), i: g("i"), n: g("n"), r: g("r"), d: g("d") };
    App.save(); App.render(); UI.toast("Recalculated with the new assumptions"); return;
  }
  if (a === "add-distribution") {
    UI.modal("Add trust distribution", `<div class="form-grid">
      ${UI.field({ id: "d-item", label: "Item", value: "Medical" })}
      ${UI.field({ id: "d-amt", label: "Amount (USD)", value: "120000" })}
      ${UI.field({ id: "d-layer", label: "Source layer", type: "select", value: "C2 Taxed in year", options: ["C1 Principal", "C2 Taxed in year", "C3 Cumulative taxed", "C4 Untaxed", "C5 Capital gain", "C6 Borrowing"] })}
      ${UI.field({ id: "d-person", label: "Filer", type: "select", value: "Beneficiary", options: ["Trustee", "Settlor", "Beneficiary", "None"] })}
      ${UI.field({ id: "d-credit", label: "Creditable tax", value: "24000" })}
    </div><div class="note amber" style="margin-top:8px">No source layer / no tax paid or accrued / no valuation → no payment.</div>`, `<button class="btn" data-action="close-overlay">Cancel</button><button class="btn primary" data-action="confirm-distribution">Submit distribution</button>`);
    return;
  }
  if (a === "confirm-distribution") {
    const item = document.getElementById("d-item").value;
    const amt = +document.getElementById("d-amt").value;
    const layer = document.getElementById("d-layer").value;
    const person = document.getElementById("d-person").value;
    const credit = +document.getElementById("d-credit").value;
    DB.trust.taxRows.push({ id: "D-00" + (DB.trust.taxRows.length + 1), item, amt, layer, person, due: 0, credit, filing: "Annual return", status: "Pending approval" });
    UI.closeModal(); App.render(); UI.toast("Distribution created; pending trustee approval", "green"); return;
  }
  if (a === "toggle-lever") { return; }
  if (a === "select-scenario") { return; }
  if (a === "esign-tax") {
    UI.modal("Client e-signature", `<div class="note green"><b>Tax optimisation Option A (with conditions)</b> · Not a tax opinion; assumptions, risks and adviser scope disclosed.</div>`, `<button class="btn" data-action="close-overlay">Cancel</button><button class="btn primary" data-action="confirm-tax-esign">Confirm signature</button>`);
    return;
  }
  if (a === "confirm-tax-esign") { App.state.taxSigned = true; App.save(); UI.closeModal(); UI.toast("Client signed; moving to implementation", "green"); App.render(); return; }
  if (a === "client-tab") { App.state.clientTab = id; App.save(); App.render(); return; }
  if (a === "toggle-nav") {
    if (window.innerWidth <= 900) {
      UI.drawer("Navigation", `<div class="stack">${App.nav()}</div>`, `<button class="btn" data-action="close-overlay">Close</button>`);
      return;
    }
    App.state.navCollapsed = !App.state.navCollapsed;
    App.save(); App.render();
    UI.toast(App.state.navCollapsed ? "Navigation collapsed, main area widened" : "Navigation expanded", "blue");
    return;
  }
  if (a === "demo-script") {
    UI.drawer("Demo script", `<div class="timeline">
      <div class="tl-item"><div class="what">1. M1 Proposal → Orders</div><div class="who">Generate 3 options → pick A → execution blueprint → compliance WARN → create orders → TCA</div></div>
      <div class="tl-item"><div class="what">2. M2 Quant</div><div class="who">Allocation → stress → backtest → RM decision card</div></div>
      <div class="tl-item"><div class="what">3. M3 Copilot / Service invitations</div><div class="who">Financing → tax/legal → family service invitations / Vendor bidding</div></div>
      <div class="tl-item"><div class="what">4. M4 Founder</div><div class="who">360 → valuation LTV → pledge vs sell → trust budget / tax ledger</div></div>
      <div class="tl-item"><div class="what">5. M5 Tax optimisation</div><div class="who">Case → profile → baseline → levers → scenarios → anti-avoidance → internal review → delivery</div></div>
    </div><div class="note blue" style="margin-top:8px">Switch the top-bar Role to Client / Vendor / Compliance to demonstrate the permission matrix.</div>`, `<button class="btn" data-action="close-overlay">Close</button>`);
    return;
  }
  if (a === "reset") { localStorage.removeItem("hsbc_pb_demo_en_v1"); location.reload(); return; }
  if (a === "close-overlay") { UI.closeDrawer(); UI.closeModal(); return; }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "clientSel") {
    if (App.state.page.startsWith("m4")) App.state.clientId = "C-88421";
    else if (App.state.page.startsWith("m5") || App.state.page === "m3-hub") App.state.clientId = "C-7701";
    else App.state.clientId = e.target.value;
    App.save(); App.render(); return;
  }
  if (e.target.id === "roleSel") {
    const r = e.target.value;
    App.state.role = r;
    if (r === "Client") App.state.page = "client-portal";
    else if (r === "Vendor") App.state.page = "vendor-portal";
    else if (!PAGES.find(p => p.id === App.state.page)?.roles.includes(r)) App.state.page = App.allowed()[0]?.id || "m1-dashboard";
    App.save(); App.render();
    UI.toast("Role switched: " + r + " (page / field permissions change accordingly)", "blue");
    return;
  }
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const a = el.dataset.action;
  if (a === "toggle-lever") {
    const id = el.dataset.id;
    const set = new Set(App.state.taxLevers || []);
    if (el.checked) set.add(id); else set.delete(id);
    App.state.taxLevers = Array.from(set); App.save(); App.render();
    UI.toast(el.checked ? "Added " + id : "Removed " + id);
    return;
  }
  if (a === "select-scenario") { App.state.taxScenario = el.dataset.id; App.save(); App.render(); return; }
});

window.addEventListener("hashchange", () => {
  const id = location.hash.replace("#/", "");
  if (id && id !== App.state.page) {
    const p = PAGES.find(x => x.id === id);
    if (p && p.roles.includes(App.state.role)) { App.state.page = id; App.save(); App.render(); }
  }
});

App.load();
App.render();
