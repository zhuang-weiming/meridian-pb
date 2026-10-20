/* M5 + client / vendor / audit renderers */
(() => {
  const t = DB.tax;

  RENDER["m5-intake"] = () => UI.pageHead({
    crumb: `<b>M5</b> · Tax Optimization · Case`,
    title: "Tax Optimisation Case",
    sub: "One transaction, structured more tax-efficiently: legal, reportable and explainable. Delivered after RM review.",
    actions: `<button class="btn" data-action="toast" data-msg="Case created; client consent and data scope locked">Save draft</button>
      <button class="btn primary" data-action="go" data-page="m5-profile">Start profiling</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("Transaction amount", UI.money(t.amount), t.trigger, "")}
      ${UI.stat("Jurisdictions involved", t.jurisdictions.length + "", t.jurisdictions.join(" / "), "")}
      ${UI.stat("Complexity", t.complexity, "Multi-layer entities + cross-border", "amber")}
      ${UI.stat("Goal", "Legal optimisation", "No substance-free structures", "green")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Case scope</h2><p>Not “zero tax”, but “after-tax outcome + defensibility”.</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "Case ID", value: t.caseId, disabled: true })}
          ${UI.field({ label: "Trigger", type: "select", value: "HK share sale + family-office profit", options: ["HK share sale + family-office profit", "Share transfer + dividend", "Sell-down", "Reorganisation", "Relocation", "Year-end"] })}
          ${UI.field({ label: "Transaction amount", value: t.amount.toLocaleString("en-US"), suffix: "USD" })}
          ${UI.field({ label: "Jurisdiction", value: "Hong Kong / Singapore / BVI", help: "Multi-select; led by the internal team, external counsel as needed" })}
          ${UI.field({ label: "Client objective", type: "textarea", rows: 2, value: t.target })}
          ${UI.field({ label: "Internal budget / cost", value: "150,000", suffix: "USD" })}
          ${UI.field({ label: "Lead team", type: "select", value: "HSBC PB · Tax & Wealth Structuring", options: ["HSBC PB · Tax & Wealth Structuring", "Unassigned"] })}
          ${UI.field({ label: "Review / support", type: "select", value: "HSBC internal review (external counsel coordinated by HSBC if needed)", options: ["HSBC internal review (external counsel coordinated by HSBC if needed)", "To be confirmed"] })}
        </div>
        <div class="note" style="margin-top:9px"><b>Boundaries:</b>No concealed income, sham trusts, nominee holding, fabricated identity or artificial splitting; every option must pass the PB-560 anti-avoidance check and internal review.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Five-layer structure</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="what">L1 Identity and residency</div><div class="who">Who is the taxpayer? Which treaty? Exit tax?</div></div>
          <div class="tl-item"><div class="what">L2 Bookings and entities</div><div class="who">Where are the accounts / companies / trusts? Substance?</div></div>
          <div class="tl-item"><div class="what">L3 Deal form</div><div class="who">Shares vs assets; debt vs equity</div></div>
          <div class="tl-item"><div class="what">L4 Timing and splitting</div><div class="who">Annual / instalments / loss harvesting / commercial purpose</div></div>
          <div class="tl-item"><div class="what">L5 Legacy and compliance</div><div class="who">Trust / insurance / FSIE / CRS / stamp duty</div></div>
        </div>
      </div></div>
    </div>`;

  RENDER["m5-profile"] = () => {
    const p = t.profile;
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Profile`,
      title: "Tax Profile / Nexus",
      sub: "Residence, entity, account and asset are not the same thing; a BVI account does not change the client's residence.",
      actions: `<button class="btn" data-action="toast" data-msg="Profile saved; four residency fields validated">Save profile</button>
        <button class="btn primary" data-action="go" data-page="m5-baseline">Generate baseline tax map</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("Tax resident", p.residency.join(" / "), "Domicile: " + p.domicile, "")}
        ${UI.stat("Days in HK", p.days["Hong Kong"] + " days", "Ordinary residence", "amber")}
        ${UI.stat("Entities", p.entities.length, p.entities.map(e => e.jurisdiction).join(" / "), "")}
        ${UI.stat("Accounts", p.accounts.length, p.accounts.map(a => a.centre).join(" / "), "")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Nexus map</h2><p>Four separate things: client / entity / account / asset.</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div class="note blue"><b>Client residence</b><br>${p.residency.join(" / ")}<br><span class="tiny">300 days in Hong Kong</span></div>
            <div class="note"><b>Entity residence</b><br>BVI / Hong Kong / Hong Kong<br><span class="tiny">BVI substance weak; HK has people</span></div>
            <div class="note amber"><b>Account location</b><br>Hong Kong / Singapore / BVI<br><span class="tiny">CRS reportable</span></div>
            <div class="note green"><b>Asset location</b><br>BVI equity / Hong Kong cash<br><span class="tiny">Share transfer settles in Hong Kong</span></div>
          </div>
          <div class="tiny muted" style="margin-top:8px">Conclusion: where the account sits is not where the client is resident; BVI is not a “tax-free” label. The tax outcome is driven by all four.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Entities and substance</h2></div></div>
          ${UI.table(["Entity", "Jurisdiction", "Role", "Substance", "Note"], p.entities.map(e => [
            `<b>${e.name}</b>`, e.jurisdiction, e.role, UI.pill(e.substance, e.substance === "Strong" ? "green" : e.substance === "Moderate" ? "amber" : "red"), "Documents / staff to be provided"
          ]), { compact: true })}
        </div>
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Accounts</h2></div></div>
          ${UI.table(["Centre", "Bank", "Type", "Currency", "Market Value"], p.accounts.map(a => [
            a.centre, a.bank, a.type, a.ccy, `<span class="num">${UI.money(a.value)}</span>`
          ]), { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>Filings and flows</h2></div></div><div class="card-body">
          <div class="row">${p.filings.map(f => `<span class="pill blue">${f}</span>`).join("")}</div>
          <div class="divider"></div>
          ${UI.table(["Type", "Amount", "Year"], p.flows.map(f => [f.type, `<span class="num">${UI.money(f.amount)}</span>`, f.year]), { compact: true })}
        </div></div>
      </div>`;
  };

  RENDER["m5-baseline"] = () => {
    const b = t.baseline;
    const totalBase = b.filter(x => x.type !== "HK Stamp Duty").reduce((a, x) => a + x.base, 0);
    const totalCash = b.reduce((a, x) => a + x.cash, 0);
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Baseline`,
      title: "Baseline Tax Map",
      sub: "Without optimisation, what tax each event triggers, when it is paid and who files.",
      actions: `<button class="btn" data-action="toast" data-msg="Baseline locked; assumptions and data version retained">Lock baseline</button>
        <button class="btn primary" data-action="go" data-page="m5-levers">Select levers</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("Taxable base", UI.money(totalBase), b.length + " events", "")}
        ${UI.stat("Cash tax", UI.money(totalCash), "Baseline", "red")}
        ${UI.stat("Effective tax rate", UI.pct(totalCash / totalBase * 100, 2), "Weighted", "amber")}
        ${UI.stat("Compliance cost", "$100k", "Filing / internal review", "")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Event-level tax map</h2><p>This is the “no optimisation” comparison, not a recommendation.</p></div></div>
        ${UI.table(["Event", "Taxpayer", "Tax type", "Tax base", "Rate", "Cash tax", "Timing"], b.map(x => [
          `<b>${x.event}</b>`, x.taxpayer, x.type, `<span class="num">${UI.money(x.base)}</span>`, x.rate + "%", `<span class="num red">${UI.money(x.cash)}</span>`, x.timing
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Tax composition</h2></div></div><div class="card-body">
          ${UI.bars(b.map(x => ({ label: x.event, value: x.cash / 1000000, display: UI.money(x.cash), color: "var(--red)" })), 10)}
          <div class="tiny muted" style="margin-top:6px">Cash tax is concentrated in stamp duty of $0.36m and family-office profits tax of $2.475m; HK capital gains and dividends on HK shares are not taxed. Stamp duty is computed on $180m of traded value × 0.2% and is excluded from the “taxable base” above.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Baseline assumptions</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>Hong Kong tax resident, source basis</div><div>Personal holding + HK family office</div><div>HK share capital gains usually not taxed</div><div>Dividends not taxed</div>
            <div>Stamp duty 0.1% per side</div><div>Family-office profits tax 16.5%</div><div>FIHV concession not applied</div><div>CRS reporting</div>
          </div>
          <div class="note amber" style="margin-top:8px"><b>Do not skip the baseline:</b>Without a baseline you cannot prove how much the “optimisation” saved, nor explain it to the internal tax team or a regulator.</div>
        </div></div>
      </div>`;
  };

  RENDER["m5-levers"] = () => {
    const sel = App.state.taxLevers || ["L3", "L4", "L8"];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Levers`,
      title: "Lever Library",
      sub: "Ten levers, each with its own conditions and red flags; splitting, treaties and trusts attract the most scrutiny.",
      actions: `<button class="btn" data-action="toast" data-msg="Lever combination saved (3 levers)">Save combination</button>
        <button class="btn primary" data-action="go" data-page="m5-scenarios">Generate scenarios</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("Levers available", t.levers.length, "Residency / bookings / entity / deal / instrument / timing / splitting / treaty / trust / financing", "")}
        ${UI.stat("Selected", sel.length, "3–5 recommended", "green")}
        ${UI.stat("High red flags", t.levers.filter(l => l.risk.includes("High")).length, "Needs internal review", "red")}
        ${UI.stat("Internal review", "Mandatory", "One per case", "")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        ${t.levers.map(l => `<div class="card"><div class="card-body">
          <div class="row between"><div><span class="pill gray">${l.cat}</span> <span class="tiny mono">${l.id}</span></div>
            <label class="check"><input type="checkbox" data-action="toggle-lever" data-id="${l.id}" ${sel.includes(l.id) ? "checked" : ""}><span></span></label></div>
          <div class="strong" style="margin:5px 0 2px">${l.name}</div>
          <div class="small muted">Suits: ${l.fit}</div>
          <div class="row" style="margin-top:6px"><span class="pill ${l.impact === "High" ? "green" : "gray"}">Impact ${l.impact}</span><span class="pill ${l.risk.includes("High") ? "red" : l.risk.includes("Med") ? "amber" : "green"}">Risk ${l.risk}</span></div>
          <div class="note amber" style="margin-top:6px;padding:5px 7px;font-size:9.5px">${l.flag}</div>
        </div></div>`).join("")}
      </div>`;
  };

  RENDER["m5-booking"] = () => {
    const rows = [
      { c: "Hong Kong", tax: "Source basis; profits tax 8.25/16.5%", treaty: "Broad", cfc: "Medium", es: "Medium", crs: "Yes", cost: "$35k/yr", score: 82 },
      { c: "Singapore", tax: "Territorial + exemption; 17%", treaty: "Broad", cfc: "Medium", es: "Med-High", crs: "Yes", cost: "$45k/yr", score: 80 },
      { c: "Cayman", tax: "No direct tax", treaty: "Few", cfc: "High", es: "Weak", crs: "Yes", cost: "$25k/yr", score: 58 },
      { c: "BVI", tax: "No direct tax", treaty: "Few", cfc: "High", es: "Weak", crs: "Yes", cost: "$18k/yr", score: 52 },
      { c: "Luxembourg", tax: "Corporate tax + withholding", treaty: "Very broad", cfc: "Low", es: "Strong", crs: "Yes", cost: "$80k/yr", score: 74 },
      { c: "Ireland", tax: "12.5% / fund", treaty: "Very broad", cfc: "Low", es: "Strong", crs: "Yes", cost: "$70k/yr", score: 76 }
    ];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Bookings`,
      title: "Booking / Entity Comparison",
      sub: "Cayman ≠ tax-free; where the account sits, where the entity is resident, where the assets sit and where the client is resident are four different things.",
      actions: `<button class="btn primary" data-action="go" data-page="m5-scenarios">Use in scenarios</button>`
    }) + `
      <div class="card"><div class="card-head"><div><h2>Jurisdiction comparison</h2><p>The score is not the tax rate; it includes substance, treaties, CRS, cost and reputation.</p></div></div>
        ${UI.table(["Jurisdiction", "Tax regime", "Treaty network", "CFC", "Substance", "CRS", "Annual cost", "Score"], rows.map(r => [
          `<b>${r.c}</b>`, `<span class="small">${r.tax}</span>`, r.treaty, r.cfc, r.es, r.crs, r.cost, `<b class="${r.score < 60 ? "red" : "green"}">${r.score}</b>`
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-body"><div class="tiny muted">Cayman note</div><div class="strong" style="margin:4px 0">Not a “tax-free account”</div><div class="small muted">The Cayman is a booking and fund-domicile venue; whether it is taxed depends on the client's residence, the entity's residence, where the assets sit, CRS and substance. A holding company without substance is easily pierced by CFC, beneficial-ownership and economic-substance rules.</div></div></div>
        <div class="card"><div class="card-body"><div class="tiny muted">Recommendation</div><div class="strong" style="margin:4px 0">HK holding + substance (Option A)</div><div class="small muted">Has staff, premises and decisions; treaty access; CRS reportable; controllable cost. The Cayman is used only as a fund or holding vehicle, never sold as a “tax-avoidance” feature.</div></div></div>
      </div>`;
  };

  RENDER["m5-scenarios"] = () => {
    const sel = App.state.taxScenario || "A";
    const s = t.scenarios.find(x => x.id === sel) || t.scenarios[1];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Scenario`,
      title: "Scenario Comparison",
      sub: "After-tax cash, effective rate, cost, risk and defensibility; not ranked on tax rate alone.",
      actions: `<button class="btn" data-action="toast" data-msg="Scenario comparison exported (with assumptions)">Export</button>
        <button class="btn primary" data-action="go" data-page="m5-substance">Run anti-avoidance check</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("Baseline effective rate", t.scenarios[0].rate.toFixed(2) + "%", "Personal holding + family office", "amber")}
        ${UI.stat("Current option", s.id, s.name, "")}
        ${UI.stat("After-tax cash", UI.money(s.afterTax), "Baseline " + UI.money(t.scenarios[0].afterTax), "green")}
        ${UI.stat("Defensibility", s.defend + "/100", s.result, s.result === "REJECT" ? "red" : "amber")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Four scenarios</h2><p>Click to select; a REJECT never reaches internal review or the RM.</p></div></div>
        ${UI.table(["", "Option", "Levers", "After-tax cash", "Effective rate", "Cost", "Risk", "Defensible", "Score", "Result"], t.scenarios.map(x => [
          `<input type="radio" name="scenario" ${x.id === sel ? "checked" : ""} data-action="select-scenario" data-id="${x.id}">`,
          `<b>${x.name}</b><span class="sub">${x.note}</span>`, x.levers.join(" / ") || "—",
          `<span class="num">${UI.money(x.afterTax)}</span>`, x.rate + "%", UI.money(x.cost), x.risk, x.defend, `<b>${x.score}</b>`,
          UI.pill(x.result, x.result === "PASS" ? "green" : x.result === "CONDITIONAL" ? "amber" : "red")
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>After-tax cash</h2></div></div><div class="card-body">
          ${UI.bars(t.scenarios.map(x => ({ label: x.id === "BASE" ? "Baseline" : x.id, value: x.afterTax / 1000000, display: UI.money(x.afterTax), color: x.id === sel ? "var(--red)" : x.result === "REJECT" ? "var(--muted-2)" : "var(--blue)" })), 230)}
          <div class="note blue" style="margin-top:8px">Hong Kong has no capital gains tax and no dividend tax, so the tax on the transaction itself is low; the optimisation space in this case is mainly family-office profits tax (16.5% → 0%) and stamp duty (0.1% per side), not 20% capital gains tax. If the client were a Mainland China tax resident, the conclusion would be completely different.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>${s.name}</h2><p>${s.note}</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">After-tax cash</div><div class="strong">${UI.money(s.afterTax)}</div></div>
            <div><div class="tiny muted">Effective rate</div><div class="strong">${s.rate}%</div></div>
            <div><div class="tiny muted">Cost</div><div class="strong">${UI.money(s.cost)}</div></div>
            <div><div class="tiny muted">Defensible</div><div class="strong">${s.defend}/100</div></div>
          </div>
          <div class="note ${s.result === "REJECT" ? "amber" : "green"}" style="margin-top:8px"><b>${s.result}:</b>${s.result === "REJECT" ? "No substance / indefensible, so it does not reach internal review; drop or redesign it." : "Conditions must be met before it reaches the anti-avoidance check and internal review."}</div>
        </div></div>
      </div>
      <div class="tiny muted" style="margin-top:8px">Basis: after-tax cash = taxable base − cash tax − implementation cost; excludes investment return, time value and unrealised tax.</div>`;
  };

  RENDER["m5-substance"] = () => {
    const fails = t.checks.filter(x => x.res === "FAIL").length;
    const warns = t.checks.filter(x => x.res === "WARN").length;
    const selected = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    const result = selected.result === "REJECT" ? "REJECT" : fails ? "REJECT" : warns ? "CONDITIONAL" : "PASS";
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Anti-avoidance`,
      title: "Anti-Avoidance Check",
      sub: "HK s.61A / FSIE / substance / beneficial ownership / stamp duty / CRS; a red light stops everything.",
      actions: `<button class="btn" data-action="toast" data-msg="Compliance workpaper generated (watermarked)">Export workpaper</button>
        <button class="btn primary" data-action="go" data-page="m5-advisor" ${result === "REJECT" ? "disabled" : ""}>Send to internal tax team</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("Checks", t.checks.length, "PASS/WARN/FAIL/N/A", "")}
        ${UI.stat("PASS", t.checks.filter(x => x.res === "PASS").length, "Can proceed", "green")}
        ${UI.stat("WARN", warns, "Conditions required", "amber")}
        ${UI.stat("Result", result, result === "REJECT" ? "Does not reach review" : "Can reach review", result === "REJECT" ? "red" : "amber")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Check matrix</h2><p>Dual sign-off by the internal tax team and Compliance; every check writes an EvidenceEvent.</p></div></div>
        ${UI.table(["Check", "Result", "Explanation", ""], t.checks.map(x => [
          `<b>${x.name}</b>`, UI.pill(x.res, x.res === "PASS" ? "green" : x.res === "WARN" ? "amber" : x.res === "FAIL" ? "red" : "gray"), `<span class="small">${x.note}</span>`,
          x.res === "WARN" ? `<button class="btn sm" data-action="toast" data-msg="Remediation task recorded: ${x.id}">Remediate</button>` : ""
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Red flag list</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>❌ Splitting without commercial purpose</div><div>❌ Shell company without substance</div><div>❌ Conduit / treaty abuse</div><div>❌ Sham relocation</div>
            <div>❌ Concealment / non-filing</div><div>❌ Circular funding</div><div>❌ Under-invoicing contracts</div><div>❌ Evading stamp duty / FSIE</div>
          </div>
          <div class="note amber" style="margin-top:8px"><b>This option:</b>${selected.result === "REJECT" ? "Already judged REJECT (no substance / indefensible), so it does not reach review; drop or redesign it." : "No hard red flag hit; but FSIE / stamp duty are WARN and must be answered point by point in the internal review opinion."}</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Pass conditions</h2></div></div><div class="card-body">
          <div class="check"><input type="checkbox" checked> <span><b>Hong Kong substance</b><small>Staff, premises, decisions, board minutes</small></span></div>
          <div class="check"><input type="checkbox" checked> <span><b>Beneficial ownership</b><small>Looked through to the individual; consistent with CRS</small></span></div>
          <div class="check"><input type="checkbox"> <span><b>FSIE economic substance</b><small>Substance / associated-entity tests for the foreign-sourced exemption</small></span></div>
          <div class="check"><input type="checkbox"> <span><b>Stamp duty / transfer pricing</b><small>0.1% per side; related-party pricing</small></span></div>
          <div class="tiny muted" style="margin-top:6px">Unchecked items → conditions in the internal review opinion; no direct implementation.</div>
        </div></div>
      </div>`;
  };

  RENDER["m5-advisor"] = () => {
    const a = t.advisor;
    const s = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    const blocked = s.result === "REJECT";
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Internal Review / RM`,
      title: "HSBC Internal Tax Opinion / RM Decision",
      sub: "Reviewed by the HSBC PB internal tax team; delivered after RM review; where a formal legal opinion is required, HSBC coordinates external counsel. The AI does not sign.",
      actions: `<button class="btn" data-action="toast" data-msg="Client pack draft generated (with disclosures)">Generate client pack</button>
        ${blocked ? `<button class="btn primary" disabled>RM approves and delivers</button>` : `<button class="btn primary" data-action="go" data-page="m5-delivery">RM approves and delivers</button>`}`
    }) + `${blocked ? `<div class="note amber"><b>The current selection C is already REJECT:</b>it does not reach internal review or RM delivery; return to the scenario comparison and choose A or B.</div>` : ""}` + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>HSBC PB internal tax opinion</h2><p>${a.name} · ${a.jurisdiction}</p></div><div class="spacer"></div>${UI.pill("Internal review complete", "green")}</div><div class="card-body">
          <div class="note green"><b>Conclusion:</b>${a.opinion}</div>
          <div class="grid-2" style="margin-top:9px;gap:8px">
            <div><div class="tiny muted">Scope</div><div class="strong">${a.scope}</div></div>
            <div><div class="tiny muted">Cost</div><div class="strong">${a.fees ? UI.money(a.fees) : (a.costLabel || "Internal cost")}</div></div>
            <div><div class="tiny muted">Conflicts of interest</div><div class="strong">${a.conflict ? "Yes" : "None"}</div></div>
            <div><div class="tiny muted">Review reference</div><div class="strong mono">IR-2026-1019</div></div>
          </div>
          <div class="divider"></div>
          <div class="tiny muted">Conditions</div>
          <div class="small">① Complete Hong Kong substance; ② FSIE / stamp duty modelling; ③ beneficial-ownership disclosure; ④ Option C not recommended.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>RM decision</h2></div></div><div class="card-body">
          <div class="note blue"><b>Selected:</b>${s.name} · After tax ${UI.money(s.afterTax)} · Effective rate ${s.rate}%</div>
          <div class="stack" style="margin-top:9px">
            <label class="check"><input type="radio" name="rmdec" checked> <span><b>Adopt (with conditions)</b><small>Implement once the internal review conditions are met</small></span></label>
            <label class="check"><input type="radio" name="rmdec"> <span><b>Modify</b><small>Adjust levers / structure and recompute</small></span></label>
            <label class="check"><input type="radio" name="rmdec"> <span><b>Reject</b><small>Internal reference only</small></span></label>
          </div>
          ${UI.field({ label: "RM rationale / reservations", type: "textarea", rows: 3, value: "Client accepts the conditional option; prioritise Hong Kong family-office substance and FSIE / stamp-duty modelling, with no trust injection for now.", help: "Mandatory if rejecting" })}
          ${UI.field({ label: "Delivery mode", type: "select", value: "Meeting + internal review summary", options: ["Meeting + internal review summary", "Meeting + full pack", "Internal only"] })}
        </div></div>
      </div>`;
  };

  RENDER["m5-delivery"] = () => {
    const s = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · Delivery`,
      title: "Client Delivery / Implementation",
      sub: "Client pack, disclosures, account opening / entity setup / transaction / filing; every step has an owner.",
      actions: `<button class="btn" data-action="toast" data-msg="Client pack sent (watermarked PDF + App)">Send to client</button>
        <button class="btn primary" data-action="esign-tax">Client e-signature</button>`
    }) + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>Client pack</h2><p>${s.name} · ${s.result}</p></div></div><div class="card-body">
          <div class="grid-4" style="gap:6px">
            ${UI.stat("After-tax cash", UI.money(s.afterTax), "Baseline " + UI.money(t.scenarios[0].afterTax), "green")}
            ${UI.stat("Effective rate", s.rate + "%", "Baseline " + t.scenarios[0].rate + "%", "green")}
            ${UI.stat("Implementation cost", UI.money(s.cost), "one-off", "")}
            ${UI.stat("Defensibility", s.defend + "/100", s.result, "amber")}
          </div>
          <div class="divider"></div>
          <div class="tiny muted">Disclosure trio</div>
          <div class="two-col-list" style="margin-top:5px">
            <div>✅ Not-a-tax-opinion statement</div><div>✅ Key assumptions (rates / residence / substance)</div><div>✅ Key risks (FSIE / stamp duty / CRS)</div>
            <div>✅ Internal team scope and cost</div><div>✅ No guarantee to the client</div><div>✅ Data-use consent</div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Implementation tasks</h2></div></div><div class="card-body"><div class="timeline">
          <div class="tl-item"><div class="when">W1</div><div class="what">Complete Hong Kong substance</div><div class="who">Client / counsel · Iris</div></div>
          <div class="tl-item"><div class="when">W2</div><div class="what">FSIE / stamp duty modelling</div><div class="who">HSBC tax team · pending review</div></div>
          <div class="tl-item"><div class="when">W3</div><div class="what">Beneficial-ownership disclosure</div><div class="who">Compliance · David</div></div>
          <div class="tl-item"><div class="when">W4</div><div class="what">Share transfer settlement</div><div class="who">Investment banking / Ops</div></div>
          <div class="tl-item"><div class="when">W6</div><div class="what">Filing and review</div><div class="who">HSBC tax team / RM</div></div>
        </div></div></div>
      </div>
      <div class="note" style="margin-top:10px"><b>Hard rules:</b>Never promise a tax outcome; never implement before internal review; never present “the client contracts directly” as an HSBC endorsement. All documents retained for ≥7 years.</div>`;
  };

  RENDER["m5-review"] = () => UI.pageHead({
    crumb: `<b>M5</b> · Tax Optimization · Review`,
    title: "Annual Review",
    sub: "Regulations, day counts, filings and structure changes; any change re-runs the model.",
    actions: `<button class="btn primary" data-action="toast" data-msg="Annual review generated; 3 items need follow-up">Run review</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("Year", "2027", "Review cycle", "")}
      ${UI.stat("Effective rate", "0.4%", "Actual vs target 0.35%", "amber")}
      ${UI.stat("Filings", "3/4 complete", "1 item outstanding", "amber")}
      ${UI.stat("Structure changes", "2", "HK family office / FSIE", "")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Review checklist</h2></div></div>
      ${UI.table(["Item", "Change", "Action", "Owner", "Status"], [
        ["HK FSIE / family-office compliance", "Annual review", "FIHV substance and related parties", "HSBC tax team", UI.pill("To do", "red")],
        ["Stamp duty / transfer pricing", "HK share sale", "Check 0.1% per side and related-party pricing", "HSBC tax team", UI.pill("In Progress", "amber")],
        ["Hong Kong substance", "2 new employees", "Update board minutes", "Client", UI.pill("Complete", "green")],
        ["CRS", "Account information", "Annual filing", "Compliance", UI.pill("Complete", "green")],
        ["Residency days", "300 days in HK", "Maintain Hong Kong tax residency", "RM", UI.pill("Monitor", "blue")]
      ], { compact: true })}
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">Next year's actions</div><div class="strong" style="margin:4px 0">3 items</div><div class="small muted">FSIE / stamp duty modelling, family-office compliance, substance review. Any change re-runs the anti-avoidance check.</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">Evidence</div><div class="strong" style="margin:4px 0">Archived</div><div class="small muted">Opinions, filings, board minutes, CRS acknowledgements; ≥7 years.</div></div></div>
    </div>`;

  /* ───────── Client portal ───────── */
  RENDER["client-portal"] = () => {
    const tab = App.state.clientTab || "proposal";
    const c = App.client();
    const p = DB.proposals.options.find(x => x.id === (App.state.proposal.selected || "P-A")) || DB.proposals.options[0];

    const proposal = `<div class="grid-2-1">
      <div class="card"><div class="card-head"><div><h2>${p.name}</h2><p>${p.thesis}</p></div><div class="spacer"></div>${UI.pill("Awaiting your confirmation", "amber")}</div><div class="card-body">
        <div class="grid-4" style="gap:6px">${UI.stat("Expected", p.exp, "annualised range", "")}${UI.stat("Volatility", p.vol, "annualised", "")}${UI.stat("Stress drawdown", p.dd, "equity −30%", "amber")}${UI.stat("Liquidity", p.liquidity, "T+7", "green")}</div>
        <div class="divider"></div>
        ${UI.table(["Allocation", "Weight", "Amount"], p.legs.map(l => [l.i, l.w + "%", `<span class="num">${UI.money(l.amt)}</span>`]), { compact: true })}
        <div class="note green" style="margin-top:8px"><b>Why it suits you:</b>${p.why}</div>
        <div class="row" style="margin-top:9px"><button class="btn primary" data-action="toast" data-msg="Proposal accepted; your RM will confirm the execution timing">Accept proposal</button><button class="btn" data-action="toast" data-msg="Question recorded; your RM will reply">I have a question</button></div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Next steps</h2></div></div><div class="card-body"><div class="timeline"><div class="tl-item"><div class="what">Confirm proposal</div><div class="who">Today</div></div><div class="tl-item"><div class="what">KYC / suitability review</div><div class="who">1 business day</div></div><div class="tl-item"><div class="what">Execution</div><div class="who">T+1</div></div><div class="tl-item"><div class="what">Fills and cost report</div><div class="who">T+2</div></div></div></div></div>
    </div>`;

    const tr = c.id === "C-88421" ? DB.trust : c.id === "C-7701" ? DB.trustHo : null;
    const trust = tr ? `<div class="grid-2-1">
      <div class="card"><div class="card-head"><div><h2>Trust report</h2><p>${tr.type} · ${tr.jurisdiction} · ${tr.trustee}</p></div></div><div class="card-body">
        <div class="grid-3" style="gap:7px">${UI.stat("Trust assets", UI.money(tr.injection), "Value injected", "")}${UI.stat("Annual budget", UI.money(tr.budget.reduce((a, b) => a + b.amt, 0)), tr.budget.length + " categories", "")}${UI.stat("Tax reserve", UI.money(tr.reserve.actual), "≥ minimum", "green")}</div>
        <div class="divider"></div>
        ${UI.table(["Beneficiary", "Annual distribution", "Purpose"], [["Spouse", UI.money(1200000), "Housing / travel"], ["Child 1", UI.money(900000), "Education"], ["Child 2", UI.money(600000), "Education / medical"]], { compact: true })}
        <div class="note blue" style="margin-top:8px">Trust distributions are at the trustee's discretion; you may submit wishes but cannot direct them unilaterally. Tax treatment follows the trustee's / HSBC tax team's opinion.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Recent distributions</h2></div></div><div class="card-body"><div class="timeline">${tr.taxRows.slice(0,4).map(r => `<div class="tl-item"><div class="when">${r.id}</div><div class="what">${r.item} · ${UI.money(r.amt)}</div><div class="who">${r.status}</div></div>`).join("")}</div></div></div>
    </div>` : "";

    const hero = `<div class="portal-hero">
      <div class="row between"><div><div class="tiny" style="color:#f3b4bc;letter-spacing:.12em;text-transform:uppercase">HSBC Private Bank</div><h2>${c.name}, welcome back</h2><p>Your RM: ${c.rm} · Last updated: ${DB.asOf}</p></div><div class="pill">Client view</div></div>
      <div class="row"><span class="pill">Portfolio ${UI.money(c.totalWealth)}</span><span class="pill">Liquidity ${UI.money(c.liquid)}</span><span class="pill">Risk ${c.risk}</span></div>
    </div>`;

    const showTrust = !!tr;
    const activeTab = tab === "trust" && !showTrust ? "proposal" : tab;
    const tabs = `<div class="tabs">
      <button class="tab ${activeTab === "proposal" ? "on" : ""}" data-action="client-tab" data-id="proposal">My proposals</button>
      <button class="tab ${activeTab === "invitation" ? "on" : ""}" data-action="client-tab" data-id="invitation">Invitations</button>
      ${showTrust ? `<button class="tab ${activeTab === "trust" ? "on" : ""}" data-action="client-tab" data-id="trust">Trust report</button>` : ""}
    </div>`;

    let body = proposal;
    if (activeTab === "invitation") body = invitationCard();
    if (activeTab === "trust" && showTrust) body = trust;
    return hero + tabs + body;
  };

  RENDER["vendor-portal"] = () => {
    const v = DB.vendors[0];
    return UI.pageHead({ crumb: `<b>Vendor</b> · RFP Portal`, title: "Bidding", sub: "You see only the RFP specification and your own bid; never client names, holdings or other bids." }) + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>${v.program}</h2><p>RFP-2026-018 · Deadline 2026-11-03 17:00 HKT</p></div><div class="spacer"></div>${UI.pill("Shortlist", "blue")}</div><div class="card-body">
          <div class="form-grid">
            ${UI.field({ label: "Course proposal", type: "textarea", rows: 3, value: "10 lectures; incl. 2 innovation site visits and a closing exhibition" })}
            ${UI.field({ label: "Price (USD)", value: "280000" })}
            ${UI.field({ label: "SLA / cancellation terms", value: "Free reschedule up to 30 days before the course" })}
            ${UI.field({ label: "Conflict declaration", type: "select", value: "None", options: ["None", "Yes (please explain)"] })}
          </div>
          <div class="note blue" style="margin-top:8px">The client takes no part in evaluation; HSBC evaluates and awards. You see only the cohort size (12 places), never client identity.</div>
          <button class="btn primary" style="margin-top:8px" data-action="toast" data-msg="Bid submitted (sealed); withdraw any time before the deadline">Submit bid</button>
        </div></div>
        <div class="card"><div class="card-body"><div class="tiny muted">Bid status</div><div class="strong">Submitted · sealed</div><div class="small muted" style="margin-top:6px">HSBC completes evaluation within 5 business days; if you are not awarded, no other quotes are disclosed.</div></div></div>
      </div>`;
  };

  RENDER["audit"] = () => UI.pageHead({
    crumb: `<b>Shared</b> · Evidence Ledger`,
    title: "Audit & Evidence",
    sub: "Every recommendation can answer: based on what data, which rule version, who changed what, and when the client agreed.",
    actions: `<button class="btn" data-action="toast" data-msg="Audit pack exported (watermarked ZIP)">Export audit pack</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("Events", DB.audit.length + 18, "this engagement", "")}
      ${UI.stat("Model", "v3.2", "proposal-gen", "")}
      ${UI.stat("Rules", "2026.10.3", "four-dimension engine", "")}
      ${UI.stat("Retention", "≥ 7 years", "by jurisdiction", "green")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Evidence chain</h2><p>Immutable log; directly retrievable by a regulator.</p></div></div>
      ${UI.table(["Time", "Actor", "Action", "Reference"], DB.audit.map(a => [
        `<span class="mono">${a.t}</span>`, a.who, a.what, `<span class="mono tiny">${a.ref}</span>`
      ]), { compact: true })}
    </div>
    <div class="grid-3" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">Proposal pack</div><div class="strong">Objective / Constraints / 3 options / TES</div><div class="small muted">Version v3; client signs v3.</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">Rule pack</div><div class="strong">Rule ID / version / hit</div><div class="small muted">BLOCK cannot be overridden; WARN requires conditions.</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">AI pack</div><div class="strong">Model / prompt / input snapshot</div><div class="small muted">Numbers grounded; out-of-scope output blocked.</div></div></div>
    </div>`;
})();
