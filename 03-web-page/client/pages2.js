/* M3 / M4 renderers */
(() => {
  const founder = DB.clients.find(c => c.id === "C-88421");

  /* household helpers (ported from the Chinese demo) */
  const personById = (id) => DB.persons.find(p => p.id === id);
  const consentFor = (householdId, personId) => DB.consents.find(c => c.householdId === householdId && c.personId === personId);
  const peopleNames = (ids) => (ids || []).map(id => personById(id)).filter(Boolean).map(p => p.name).join(", ") || "—";

  RENDER["m3-family"] = () => {
    const c = App.client();
    const h = App.household();
    if (!h) {
      return UI.pageHead({
        crumb: `<b>M3</b> · RM Copilot · Family Cockpit`,
        title: "Family Cockpit",
        sub: "No household view for the selected client yet."
      }) + `<div class="card"><div class="empty">This client has no household; the demo provides examples for Chen Zhiyuan, He Qiming, Lin Zhe and Ms Wang.</div></div>`;
    }
    const persons = DB.persons.filter(p => p.householdId === h.id);
    const rels = DB.relationships.filter(r => r.householdId === h.id);
    const goals = DB.familyGoals.filter(g => g.householdId === h.id);
    const cases = DB.cases.filter(x => x.householdId === h.id);
    const consents = DB.consents.filter(x => x.householdId === h.id);
    const pending = consents.filter(x => !x.status.startsWith("Granted"));
    const activeGoals = goals.filter(g => g.status === "In progress").length;
    const openCases = cases.filter(x => x.status !== "Completed").length;
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Family Cockpit`,
      title: `${h.name} · Family Cockpit`,
      sub: "Client and family: who we serve, relationships and their verification, family goals, authorisation gaps and open actions. Four demo households; switch with the Client selector.",
      actions: `<button class="btn" data-action="dictionary">Business dictionary</button>
        ${App.state.role === "RM" ? `<button class="btn primary" data-action="family-goal-new">New family goal</button>` : UI.pill("Read-only", "gray")}`
    }) + `
    <div class="grid-4">
      ${UI.stat("Family members", persons.length, "Primary client and dependants", "")}
      ${UI.stat("Family goals", goals.length, activeGoals + " in progress", activeGoals ? "green" : "")}
      ${UI.stat("Awaiting authorisation", pending.length, "Self / guardian confirmation", pending.length ? "amber" : "green")}
      ${UI.stat("Open cases", openCases, "Across M3 / M4 / M5", "")}
    </div>
    <div class="note blue" style="margin-top:10px"><b>${UI.term("Household", "Household")}</b>: a family relationship and service view, not a legal entity; account holder ≠ beneficiary ≠ decision maker. Legal entities remain Client / Person / Legal Entity / Trust.</div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Family relationships & service authorisations</h2><p>Validity, verification status and consent status are seen separately.</p></div></div>
        ${UI.table(["Member", "Relationship", "Age", "Service market", "Account holder", "Authorisation / consent", "Relationship verification"], persons.map(p => {
          const con = consentFor(h.id, p.id);
          const rel = rels.find(r => r.from === p.id || r.to === p.id);
          return [
            `<span class="strong">${p.name}</span><span class="sub">${p.role}</span>`,
            p.isClient ? "Primary client" : rel ? rel.type : "—",
            p.age,
            p.serviceMarket,
            p.accountHolder ? `<span class="pill green">Yes</span>` : `<span class="pill gray">No</span>`,
            con ? UI.pill(con.status, con.status.startsWith("Granted") ? "green" : "amber") : `<span class="pill gray">Not recorded</span>`,
            rel ? UI.pill(rel.verified, rel.verified === "Verified" ? "green" : "amber") : "—"
          ];
        }), { compact: true })}
      </div>
      <div class="card"><div class="card-head"><div><h2>Who we currently serve</h2><p>Not "parents acting for the whole family".</p></div></div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">Primary client</div><div class="strong">${c.name}</div></div>
          <div><div class="tiny muted">Household</div><div class="strong mono">${h.id}</div></div>
          <div><div class="tiny muted">Responsible RM</div><div class="strong">${h.rm}</div></div>
          <div><div class="tiny muted">Booking centres</div><div class="strong">${h.booking.join(" / ")}</div></div>
          <div><div class="tiny muted">Reporting currency</div><div class="strong">${h.reportingCurrency}</div></div>
          <div><div class="tiny muted">Consent record</div><div class="strong mono">${h.consentRef}</div></div>
        </div>
        <div class="divider"></div>
        <div class="small muted">${h.note}</div>
        <div class="note amber" style="margin-top:8px"><b>Authorisation gaps:</b> ${pending.length ? pending.map(x => `${(personById(x.personId) || {}).name || x.personId} · ${x.purpose}`).join("; ") : "None"}</div>
      </div></div>
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Family goals</h2><p>Confirm who proposes, who benefits, who funds, who decides first; a goal is not a product.</p></div><div class="spacer"></div><span class="pill blue">${goals.length}</span></div><div class="card-body">
      <div class="goal-grid">${goals.map(g => {
        const owner = personById(g.ownerPersonId);
        const decider = personById(g.decisionMakerId);
        const gc = DB.cases.find(x => x.id === g.caseId);
        return `<div class="goal-card">
          <div class="row between"><div><div class="tiny muted">${g.id} · ${g.category}</div><div class="strong" style="font-size:12.5px">${g.title}</div></div>${UI.pill(g.status, g.status === "In progress" ? "green" : g.status.includes("Pending") ? "amber" : "gray")}</div>
          <div class="grid-2" style="margin-top:7px;gap:5px 10px">
            <div><div class="tiny muted">Target amount</div><div class="strong">${g.targetAmount ? UI.money(g.targetAmount, g.currency) : "—"}</div></div>
            <div><div class="tiny muted">Target date</div><div class="strong">${g.targetDate}</div></div>
            <div><div class="tiny muted">Proposed by</div><div class="strong">${owner ? owner.name : "—"}</div></div>
            <div><div class="tiny muted">Beneficiaries</div><div class="strong">${peopleNames(g.beneficiaryPersonIds)}</div></div>
            <div><div class="tiny muted">Funded by</div><div class="strong">${peopleNames(g.fundingPartyIds)}</div></div>
            <div><div class="tiny muted">Decision maker</div><div class="strong">${g.decisionMaker || (decider ? decider.name : "—")}</div></div>
          </div>
          <div class="row" style="margin-top:7px"><span class="pill gray">Priority ${g.priority}</span><span class="pill gray">Flexibility ${g.flexibility}</span><span class="pill gray">${g.visibilityScope}</span></div>
          <div class="tiny muted" style="margin-top:6px">Gap: ${g.gap}</div>
          <div class="row" style="margin-top:7px"><span class="pill ${g.fundingCommitmentStatus.includes("Arranged") ? "green" : "amber"}">Funding: ${g.fundingCommitmentStatus}</span>${g.caseId ? `<button class="btn sm" data-action="case-detail" data-id="${g.caseId}">Linked case</button>` : `<span class="tiny muted">No case yet</span>`}${gc && gc.link ? `<button class="btn sm primary" data-action="go" data-page="${gc.link}">${gc.linkLabel}</button>` : ""}</div>
        </div>`;
      }).join("")}</div>
    </div></div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Actionable items</h2><p>Goal gaps, pending confirmations, professional tasks and authorisation gaps.</p></div><div class="spacer"></div><button class="btn sm" data-action="go" data-page="m3-cases">Open case workbench</button></div>
      ${UI.table(["Case", "Module", "Owner", "Dependencies", "Due", "Deliverable", "Client to-do", "Status"], cases.map(x => [
        `<span class="strong">${x.title}</span><span class="sub mono">${x.id}</span>`,
        x.module, x.owner, `<span class="small">${x.dependencies}</span>`, x.due,
        `<span class="small">${x.deliverable}</span>`, `<span class="small">${x.clientTodo}</span>`,
        UI.pill(x.status, x.status === "In progress" ? "blue" : x.status.includes("Awaiting") || x.status.includes("pending") ? "amber" : "gray")
      ]), { compact: true })}
    </div>`;
  };

  RENDER["m3-cases"] = () => {
    const h = App.household();
    const all = h ? DB.cases.filter(x => x.householdId === h.id) : DB.cases;
    const filter = App.state.caseFilter || "all";
    const cases = filter === "all" ? all : all.filter(x => x.module.includes(filter));
    const today = DB.asOf.slice(0, 10);
    const overdue = cases.filter(x => x.due < today && x.status !== "Completed").length;
    const waitingClient = cases.filter(x => x.status.toLowerCase().includes("awaiting") || x.status.includes("pending")).length;
    const waitingInternal = cases.filter(x => x.status.includes("internal")).length;
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Case Workbench`,
      title: "Case Workbench",
      sub: "Financing, tax, trust and service tasks are no longer separate queues; one view for owners, dependencies, deliverables and client to-dos.",
      actions: `<button class="btn" data-action="dictionary">Business dictionary</button>
        <button class="btn primary" data-action="go" data-page="m3-family">Back to family cockpit</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Cases", cases.length, h ? h.name : "All", "")}
      ${UI.stat("Overdue", overdue, "Against the demo as-of date", overdue ? "red" : "green")}
      ${UI.stat("Awaiting client", waitingClient, "Authorisation / documents / confirmation", waitingClient ? "amber" : "green")}
      ${UI.stat("Awaiting internal", waitingInternal, "Professional teams / committees", waitingInternal ? "amber" : "green")}
    </div>
    <div class="tabs" style="margin-top:10px">
      ${[["all", "All"], ["M3", "M3 Service / financing"], ["M4", "M4 Founder / trust"], ["M5", "M5 Tax"]].map(([id, label]) => `<button class="tab ${filter === id ? "on" : ""}" data-action="case-filter" data-id="${id}">${label}</button>`).join("")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Task view</h2><p>One case can span M3/M4/M5; organised by goals and deliverables, not by system module.</p></div></div>
      ${UI.table(["Case", "Module", "Type", "Linked goal", "Owner", "Dependencies", "Due", "Deliverable", "Client to-do", "Status", "Priority", "Entry", ""], cases.map(x => {
        const g = DB.familyGoals.find(y => y.id === x.goalId);
        return [
          `<span class="strong">${x.title}</span><span class="sub mono">${x.id}</span>`,
          x.module, x.type, g ? `<span class="small">${g.title}</span>` : "—",
          x.owner, `<span class="small">${x.dependencies}</span>`, x.due,
          `<span class="small">${x.deliverable}</span>`, `<span class="small">${x.clientTodo}</span>`,
          UI.pill(x.status, x.status === "In progress" ? "blue" : x.status.includes("Awaiting") || x.status.includes("pending") ? "amber" : "gray"),
          x.priority,
          x.link ? `<button class="btn sm primary" data-action="go" data-page="${x.link}">${x.linkLabel || "Open"}</button>` : `<span class="tiny muted">—</span>`,
          `<button class="btn sm" data-action="case-detail" data-id="${x.id}">View</button>`
        ];
      }), { compact: true })}
    </div>`;
  };

  /* ───────── M3 ───────── */

  RENDER["m3-financing"] = () => {
    const f = DB.financing;
    const stress = App.state.facilityStress || "base";
    const coll = stress === "base" ? f.facility.collateral : stress === "-30" ? f.facility.collateral * .7 : f.facility.collateral * .5;
    const lend = coll * (1 - f.facility.haircut / 100);
    const cov = (lend / f.facility.drawn) * 100;
    const status = cov >= f.facility.warning ? "Normal" : cov >= f.facility.call ? "Warning" : cov >= f.facility.forced ? "Margin call" : "Liquidation";
    const tone = status === "Normal" ? "green" : status === "Warning" ? "amber" : "red";
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Financing`,
      title: "Financing Cockpit",
      sub: `${App.client().name} · Needs to pay roughly USD 10m of tax in March 2027; does not want to sell shares.`,
      actions: `<button class="btn" data-action="toast" data-msg="Term sheet draft generated (v0.3)">Generate term sheet</button>
        <button class="btn primary" data-action="toast" data-msg="Credit pre-review submitted (SLA 5–15 business days)">Submit for credit</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Funding gap", UI.money(f.need), f.needDate, "red")}
      ${UI.stat("Recommended", "Lombard USD 10m", "6.1% p.a. · 2–4 weeks", "green")}
      ${UI.stat("Collateral coverage", Math.round(cov) + "%", "Warning 250% / margin call 200%", tone)}
      ${UI.stat("Annual interest", UI.money(f.need * .061), "Interest only · 24 months", "")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>12-month cash flow</h2><p>The gap lands in M3; liquidity is needed before M6.</p></div></div><div class="card-body">
        ${UI.table(["Month", "Inflow", "Outflow", "Net", "Cumulative"], f.cashflow.map(r => [
          r.m, `<span class="num green">${UI.money(r.inflow)}</span>`, `<span class="num red">${UI.money(r.outflow)}</span>`,
          `<span class="num">${UI.money(r.net)}</span>`, `<span class="num ${r.cum < 0 ? "red" : "green"}">${UI.money(r.cum)}</span>`
        ]), { compact: true })}
        <div class="note amber" style="margin-top:8px"><b>Conclusion:</b>Peak cumulative gap is about USD 5.9m; recommend a USD 10m revolving facility plus a USD 3m cash buffer to avoid a forced sale in M3.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Option comparison</h2></div></div><div class="card-body">
        ${UI.table(["Option", "Amount", "Cost", "Tax", "Time", "LTV cap", "Risk"], f.options.map(o => [
          `<span class="${o.rec ? "strong red" : ""}">${o.name}</span>`, UI.money(o.amount), o.cost,
          o.tax ? UI.money(o.tax) : "—", o.time, o.ltv, `<span class="tiny muted">${o.risk}</span>`
        ]), { compact: true })}
        <div class="note green" style="margin-top:8px"><b>Recommendation:</b>Lombard USD 10m; LTV cap 45%, actual 37%; pledge first, sell later, keeping the upside optionality.</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Facility structure</h2><p>Collateral: listed equities + bonds; 55% haircut.</p></div><div class="spacer"></div>
        <div class="btn-group"><button class="${stress === "base" ? "on" : ""}" data-action="facility-stress" data-id="base">Base</button><button class="${stress === "-30" ? "on" : ""}" data-action="facility-stress" data-id="-30">−30%</button><button class="${stress === "-50" ? "on" : ""}" data-action="facility-stress" data-id="-50">−50%</button></div>
      </div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">Collateral market value</div><div class="strong">${UI.money(coll)}</div></div>
          <div><div class="tiny muted">Lendable value (55% haircut)</div><div class="strong">${UI.money(lend)}</div></div>
          <div><div class="tiny muted">Drawn</div><div class="strong">${UI.money(f.facility.drawn)}</div></div>
          <div><div class="tiny muted">Coverage (lendable / drawn)</div><div class="strong ${tone}">${Math.round(cov)}%</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:5px">Margin call ladder</div>
        ${UI.bars([
          { label: "Warning 250%", value: 250, display: "250%", color: "var(--amber)" },
          { label: "Margin call 200%", value: 200, display: "200%", color: "var(--amber)" },
          { label: "Liquidation 175%", value: 175, display: "175%", color: "var(--red)" },
          { label: "Current " + Math.round(cov) + "%", value: Math.min(300, cov), display: Math.round(cov) + "%", color: cov > 250 ? "var(--green)" : "var(--red)" }
        ], 300)}
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Terms and covenants</h2></div></div><div class="card-body">
        ${UI.table(["Item", "Value"], [
          ["Facility", UI.money(f.facility.amount)],
          ["Drawn", UI.money(f.facility.drawn)],
          ["Rate", f.facility.rate + "% p.a."],
          ["Tenor", f.facility.tenor],
          ["Haircut", f.facility.haircut + "%"],
          ["LTV (on lendable value)", f.facility.ltv + "%"],
          ["Covenants", "Maintain coverage ≥ 200%; no new pledges; control unchanged"]
        ], { compact: true })}
        <div class="tiny muted" style="margin-top:6px">Pricing is illustrative; actual terms follow credit policy and the collateral.</div>
      </div></div>
    </div>`;
  };

  RENDER["m3-taxlegal"] = () => {
    const tab = App.state.m3tab || "tax";
    if (tab === "guide") {
      const g = DB.taxGuide;
      return UI.pageHead({
        crumb: `<b>M3</b> · RM Copilot · Tax guidance`,
        title: "RM tax guidance / approved accountant panel",
        sub: "RM gives facts, checklists, boundaries and referrals — not tax advice; the client contracts directly with a licensed accountant/tax adviser.",
        actions: `<button class="btn" data-action="toast" data-msg="Tax data pack generated (watermarked PDF/CSV)">Generate tax data pack</button>
          <button class="btn primary" data-action="toast" data-msg="Referral created (2–3 panel firms sent after client consent)">Recommend 2–3 firms</button>`
      }) + `
      <div class="grid-2">
        <div class="card"><div class="card-head"><div><h2>RM can say</h2><p>Facts, process, boundaries, referrals</p></div><span class="pill green">Yes</span></div><div class="card-body">
          ${g.canSay.map(x => `<div class="row" style="margin:5px 0"><span class="pill green">✓</span><span class="small">${x}</span></div>`).join("")}
        </div></div>
        <div class="card"><div class="card-head"><div><h2>RM cannot say</h2><p>Tax opinions, conclusions, guarantees</p></div><span class="pill red">No</span></div><div class="card-body">
          ${g.cannotSay.map(x => `<div class="row" style="margin:5px 0"><span class="pill red">✕</span><span class="small">${x}</span></div>`).join("")}
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Six discovery questions</h2><p>Ask facts first; do not jump to answers.</p></div></div>
        ${UI.table(["Area", "What to ask", "Status"], g.questions.map(q => [`<b>${q.q}</b>`, q.hint, UI.pill(q.state, q.state === "Known" ? "green" : q.state === "Unknown" ? "gray" : "amber")]), { compact: true })}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Tax data pack</h2><p>Bank data + client/adviser data; not a tax return.</p></div></div><div class="card-body">
        <div class="grid-3">${g.packs.map(p => `<div class="stat"><div class="stat-label">${p.id} · ${p.name}</div><div class="stat-value sm">${p.owner}</div><div class="stat-sub">${p.desc}</div></div>`).join("")}</div>
        <div class="note blue" style="margin-top:8px"><b>Boundary:</b>the pack contains only consented fields; the adviser sees the case/pack, not other clients or holdings; generation/access is logged.</div>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Common scenario cards</h2><p>RM needs to know when to refer.</p></div></div>
        ${UI.table(["Scenario", "What to know", "Red flag/escalate"], g.scenarios.map(s => [`<b>${s.name}</b>`, s.know, `<span class="small" style="color:var(--warning)">${s.flag}</span>`]), { compact: true })}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Approved accountant panel</h2><p>Client voluntary; fees agreed between client and partner; any HSBC referral fee must be disclosed.</p></div></div>
        ${UI.table(["Panel", "Jurisdictions", "Services", "Languages", "Fees", "SLA", "Status"], DB.taxPartners.map(p => [`<b>${p.name}</b><div class="tiny muted">${p.note}</div>`, p.jurisdictions, p.services, p.languages, p.fee, p.sla, UI.pill(p.status === "approved" ? "Approved" : "Conditional", p.status === "approved" ? "green" : "amber")]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Referral flow</h2></div></div><div class="card-body"><div class="timeline">
          ${g.referral.map((x, i) => `<div class="tl-item"><div class="what">${i + 1}. ${x}</div></div>`).join("")}
        </div></div></div>
        <div class="card"><div class="card-head"><div><h2>What the client sees</h2></div></div><div class="card-body">
          <div class="note"><b>Only:</b>2–3 recommended firms, scope, fee model, SLA and documents needed.</div>
          <div class="note amber" style="margin-top:7px"><b>Never:</b>other clients, other quotes, internal scores, HSBC procurement/evaluation.</div>
          <div class="note blue" style="margin-top:7px"><b>Revocable:</b>the client can withdraw consent; pack versions/access are logged.</div>
        </div></div>
      </div>`;
    }
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Tax / Legal`,
      title: "Tax / Legal Cockpit",
      sub: "M3 only identifies scenarios, makes licensed referrals and handles funding; M5 tax optimisation is a separate HSBC internal workstream; M3 does not give tax or legal opinions.",
      actions: `<button class="btn" data-action="toast" data-msg="Referral ticket created (SLA 1 business day)">Refer to specialist</button>`
    }) + `
    <div class="tabs">
      <button class="tab ${tab === "tax" ? "on" : ""}" data-action="m3tab" data-id="tax">Tax</button>
      <button class="tab ${tab === "legal" ? "on" : ""}" data-action="m3tab" data-id="legal">Legal</button>
      <button class="tab ${tab === "guide" ? "on" : ""}" data-action="m3tab" data-id="guide">RM guidance / partners</button>
    </div>
    ${tab === "tax" ? `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>Obligation calendar</h2><p>Generated from the client's tax residency; not sales messaging.</p></div></div>
          ${UI.table(["Item", "Jurisdiction", "Deadline", "Status"], [
            ["Annual individual income tax settlement", "Mainland China", "2027-03-01 – 06-30", UI.pill("To prepare", "amber")],
            ["Restricted-share transfer at 20%", "Mainland China", "On sell-down", UI.pill("To be modelled", "amber")],
            ["CRS / FATCA", "Hong Kong / Singapore", "Annually", UI.pill("Filed", "green")],
            ["Offshore trust 20% annual charge", "Mainland China", "Annually", UI.pill("Advice needed", "red")],
            ["Equity incentives taxed separately", "Mainland China", "By 2027-12-31", UI.pill("Window", "blue")]
          ], { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>Sell / Pledge / Trust</h2><p>Scenarios only, not opinions.</p></div></div><div class="card-body">
          ${UI.table(["Route", "Tax at the time", "Afterwards", "Liquidity"], [
            ["Direct sale of USD 10m", "about USD 1.8m", "None", "High"],
            ["Pledge of USD 10m", "0", "Interest 6.1%", "Medium"],
            ["Transfer into trust", "Deemed disposal at 20%", "20% p.a. ongoing", "Low"]
          ], { compact: true })}
          <div class="note amber" style="margin-top:8px"><b>Boundary:</b>US estate tax, Announcement 21 and Announcement 7 need a licensed tax adviser; the bank does not promise a tax outcome.</div>
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Licensed referrals</h2><p>Case fields are shared only with client consent; the adviser sees the case, not the holdings.</p></div></div><div class="card-body">
        <div class="grid-3">
          <div><div class="tiny muted">Tax adviser</div><div class="strong">An international tax firm</div><div class="small muted">Scope: cross-border, Announcement 21, Announcement 7; SLA 1 business day</div></div>
          <div><div class="tiny muted">Lawyer</div><div class="strong">A Hong Kong family / trust law firm</div><div class="small muted">Scope: trusts, succession, marriage; SLA 1 business day</div></div>
          <div><div class="tiny muted">Consent</div><div class="strong">Field-level, revocable</div><div class="small muted">Only the need category and necessary documents; no transaction detail</div></div>
        </div>
      </div></div>
    ` : `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>Legal matters</h2></div></div>
          ${UI.table(["Item", "Jurisdiction", "Deadline", "Status", "Owner"], [
            ["Block trade disclosure", "Hong Kong", "Pre-trade / T+2", UI.pill("In Progress", "blue"), "External lawyer"],
            ["Prenuptial agreement", "Hong Kong / Mainland", "Before the event", UI.pill("To start", "amber"), "Family lawyer"],
            ["Inheritance / will", "Hong Kong", "Before the event", UI.pill("Reviewed", "green"), "Estate lawyer"],
            ["Trust deed", "Hong Kong", "Before execution", UI.pill("Advice needed", "amber"), "Trust lawyer"],
            ["Circular 37 / cross-border structuring", "Mainland / Hong Kong", "Before structuring", UI.pill("Not applicable", "gray"), "Cross-border lawyer"]
          ], { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>Document checklist</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>✅ Register of members</div><div>✅ Articles of association</div><div>✅ Board resolutions</div><div>✅ SHA</div>
            <div>⚠️ Marriage agreement (missing)</div><div>⚠️ Will (missing)</div><div>✅ Letter of wishes</div><div>✅ KYC / SoW</div>
          </div>
          <div class="note blue" style="margin-top:8px"><b>Bank boundary:</b>No structuring design, no legal opinions; checklists, referrals and document handling only.</div>
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Referral and privilege</h2><p>Option B: within the free scope only HSBC signs; beyond that the client contracts with the vendor directly.</p></div></div><div class="card-body">
        ${UI.table(["Scope", "Contract", "Client pays", "Legal privilege"], [
          ["Free consultation slot", "HSBC ↔ vendor", "0", "May not arise"],
          ["Deep implementation / litigation / long-term advisory", "Client ↔ vendor (independent of HSBC)", "Client pays", "Can arise"]
        ], { compact: true })}
      </div></div>
    `}`;
  };

  const serviceCard = (s) => `<div class="card">
    <div class="card-head"><div><div class="row"><span class="pill blue">${s.cat}</span><span class="pill ${s.status === "Invited" ? "amber" : "green"}">${s.status}</span></div><h2 style="margin-top:5px">${s.title}</h2><p>${s.desc}</p></div><div class="spacer"></div><span class="tiny muted">${s.id}</span></div>
    <div class="card-body">
      <div class="grid-2" style="gap:9px">
        <div><div class="tiny muted">Who it suits</div><div class="strong">${s.who}</div></div>
        <div><div class="tiny muted">Delivered by</div><div class="strong">${s.provider}</div></div>
        <div><div class="tiny muted">When</div><div class="strong">${s.date}</div></div>
        <div><div class="tiny muted">Location / format</div><div class="strong">${s.loc}</div></div>
        <div><div class="tiny muted">Places</div><div class="strong">${s.seats}</div></div>
        <div><div class="tiny muted">Tags</div><div class="row">${s.tags.map(t => `<span class="pill gray">${t}</span>`).join("")}</div></div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <button class="btn primary sm" data-action="toast" data-msg="Invitation accepted: ${s.title}">Accept invitation</button>
        <button class="btn sm" data-action="toast" data-msg="Recorded: not attending">Not attending</button>
        <button class="btn ghost sm" data-action="toast" data-msg="Feedback recorded (demo)">Feedback</button>
        <span class="tiny muted" style="margin-left:auto">Client pays nothing · no price or score shown</span>
      </div>
    </div>
  </div>`;

  const invitationCard = () => {
    const s = DB.services[0];
    return `<div class="card"><div class="card-head"><div><div class="row"><span class="pill blue">${s.cat}</span><span class="pill green">HSBC invitation</span></div><h2 style="margin-top:5px">${s.title}</h2><p>Exclusive to HSBC private banking clients · not open to public sale</p></div></div><div class="card-body">
      <div class="grid-2">
        <div><div class="tiny muted">Delivered by</div><div class="strong">${s.provider}</div>
          <div class="tiny muted" style="margin-top:8px">When</div><div class="strong">${s.date}</div>
          <div class="tiny muted" style="margin-top:8px">Location / format</div><div class="strong">${s.loc}</div>
        </div>
        <div><div class="tiny muted">Suits</div><div class="strong">${s.who}</div>
          <div class="tiny muted" style="margin-top:8px">Content</div><div class="strong">${s.desc}</div>
          <div class="tiny muted" style="margin-top:8px">Places</div><div class="strong">${s.seats}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="small muted">Provided or coordinated by HSBC; the client pays no fee and delivery is performed by the institution above. The client takes no part in procurement or scoring. Invitations are issued only by the Hong Kong / Singapore teams.</div>
      <div class="row" style="margin-top:10px">
        <button class="btn primary" data-action="toast" data-msg="Invitation accepted; a confirmation will be emailed to the client">Accept invitation</button>
        <button class="btn" data-action="toast" data-msg="Recorded: not attending">Not attending</button>
        <button class="btn ghost" data-action="toast" data-msg="Feedback recorded (demo)">Feedback</button>
        <span class="tiny muted" style="margin-left:auto">No price / score / tender process shown</span>
      </div>
    </div></div>`;
  };

  RENDER["m3-hub"] = () => {
    const cats = ["All", ...Array.from(new Set(DB.services.map(s => s.cat)))];
    const filter = App.state.serviceFilter || "All";
    const list = filter === "All" ? DB.services : DB.services.filter(s => s.cat === filter);
    const family = [
      { role: "Founder", age: 62, need: "Control / legacy" },
      { role: "Spouse", age: 59, need: "Risk / philanthropy" },
      { role: "Eldest son", age: 28, need: "Succession / entrepreneurship" },
      { role: "Younger daughter", age: 25, need: "Education / impact" },
      { role: "Mother", age: 86, need: "Health / eldercare" }
    ];
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Services / Invitations`,
      title: "Services / Invitations",
      sub: "Example family: He Qiming (Example) · Invitations issued only by the Hong Kong / Singapore teams; the client pays nothing and signs nothing; you see only the invitation, the programme and the delivery party.",
      actions: `<button class="btn" data-action="toast" data-msg="Invitation list exported (watermarked PDF)">Export invitations</button>`
    }) + `
      <div class="card"><div class="card-body">
        <div class="row between"><div><div class="tiny muted">One family, five kinds of need</div><div class="strong">Do not serve only one decision-maker</div></div><span class="pill purple">Family lens</span></div>
        <div class="grid-4" style="margin-top:8px">
          ${family.map(f => `<div class="stat"><div class="stat-label">${f.role} · ${f.age}</div><div class="stat-value sm">${f.need}</div><div class="stat-sub">Different risk / different goals</div></div>`).join("")}
        </div>
      </div></div>
      <div class="tabs" style="margin-top:10px">
        ${cats.map(c => `<button class="tab ${filter === c ? "on" : ""}" data-action="service-filter" data-id="${c}">${c}</button>`).join("")}
      </div>
      <div class="grid-2">
        ${list.map(serviceCard).join("")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Why “family” rather than “one person”</h2></div></div><div class="card-body">
          <div class="note blue"><b>Ida Liu (public reporting):</b>Private banking needs to move from serving a single decision-maker to understanding the different needs of a spouse, adult children and even grandchildren; the rise of family offices and inter-generational wealth transfer are key sources of demand change.</div>
          <div class="note" style="margin-top:7px"><b>Family governance:</b>The founder wants the children to take over, but they may not want to return to the family business; different members see risk, philanthropy, control and distribution differently. Succession is not just legal documents, it is relationship coordination.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Service journey</h2></div></div><div class="card-body"><div class="timeline">
          <div class="tl-item"><div class="what">Family conversation</div><div class="who">Founder / spouse / children: separate conversations first, then a joint one</div></div>
          <div class="tl-item"><div class="what">Governance workshop</div><div class="who">Family charter, decision rights, benefit rules</div></div>
          <div class="tl-item"><div class="what">Next-gen course / forum</div><div class="who">MIT Sloan · Future Family Leaders; Athens Forum</div></div>
          <div class="tl-item"><div class="what">Family office / trust</div><div class="who">Structure, investment governance, trustee and compliance</div></div>
          <div class="tl-item"><div class="what">Philanthropy / impact</div><div class="who">Family foundation, impact investing, next-generation participation</div></div>
        </div><div class="tiny muted" style="margin-top:7px">The services and dates above are demo examples based on public reporting; all invitations are issued by the Hong Kong / Singapore teams and are not a solicitation in Mainland China or any other jurisdiction; actual programmes follow HSBC's formal release.</div></div></div>
      </div>`;
  };

  RENDER["m3-journeys"] = () => {
    const tab = App.state.journeyTab || "j2";
    const j = DB.journeyBlueprints[tab] || DB.journeyBlueprints.j2;
    const tabs = [["j2", "J2 Founder"], ["j3", "J3 Creator"], ["j4", "J4 Women"]];
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Journey blueprints`,
      title: "Journey Blueprints · J2 / J3 / J4",
      sub: "One page: who, when, what they need, how it runs, what the system needs, and what we must not do. <b>J1 Family is the flagship</b>; J2/J3/J4 are P0/P1 growth journeys.",
      actions: `<button class="btn" data-action="go" data-page="m3-family">Family cockpit</button>
        <button class="btn primary" data-action="go" data-page="m4-founder">Founder 360</button>`
    }) + `
    <div class="tabs">
      ${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "on" : ""}" data-action="journeyTab" data-id="${id}">${label} <span class="pill ${DB.journeyBlueprints[id].priority === "P0" ? "red" : "amber"}" style="margin-left:5px">${DB.journeyBlueprints[id].priority}</span></button>`).join("")}
    </div>
    <div class="grid-4">
      ${UI.stat("Client", j.who, "Who", "")}
      ${UI.stat("Trigger", j.trigger, "When", "")}
      ${UI.stat("Job", j.job, "What", "")}
      ${UI.stat("Outcome", j.outcome, "Success", "green")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Five stages</h2><p>From entry to long-term relationship; not a product list.</p></div></div><div class="card-body">
      <div class="timeline">${j.stages.map((s, i) => `<div class="tl-item"><div class="when">${i + 1}</div><div class="what">${s.name}</div><div class="who">${s.what}</div></div>`).join("")}</div>
    </div></div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Key moments</h2></div></div><div class="card-body">${j.moments.map(x => `<span class="pill blue" style="margin:3px">${x}</span>`).join("")}</div></div>
      <div class="card"><div class="card-head"><div><h2>Key objects</h2></div></div><div class="card-body">${j.objects.map(x => `<span class="pill gray" style="margin:3px">${x}</span>`).join("")}</div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Metrics</h2></div></div><div class="card-body">${j.metrics.map(x => `<div class="row" style="margin:4px 0"><span class="pill green">✓</span><span class="small">${x}</span></div>`).join("")}</div></div>
      <div class="card"><div class="card-head"><div><h2>Must not do</h2></div></div><div class="card-body">${j.boundary.map(x => `<div class="row" style="margin:4px 0"><span class="pill red">✕</span><span class="small">${x}</span></div>`).join("")}</div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Case anchors</h2><p>Public people/families; no client relationship implied.</p></div></div><div class="card-body">${j.cases.map(x => `<span class="pill purple" style="margin:3px">${x}</span>`).join("")}</div></div>
      <div class="card"><div class="card-head"><div><h2>Benchmarks</h2></div></div><div class="card-body">${j.peers.map(x => `<span class="pill blue" style="margin:3px">${x}</span>`).join("")}</div></div>
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Open a page</h2><p>Jump from the blueprint into the current demo.</p></div></div><div class="card-body"><div class="row">
      ${j.links.map(l => `<button class="btn" data-action="go" data-page="${l.page}">${l.label} →</button>`).join("")}
    </div></div></div>`;
  };

  /* ───────── M4 ───────── */

  RENDER["m4-founder"] = () => {
    const c = founder;
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · 360`,
      title: `${c.name} · Founder 360`,
      sub: "Paper wealth → manageable assets: equity intake, independent valuation, custody / pledging, realisation, trust.",
      actions: `<button class="btn" data-action="toast" data-msg="Asset intake opened (demo)">Asset intake</button>
        <button class="btn" data-action="go" data-page="m4-valuation">Valuation Committee</button>
        <button class="btn primary" data-action="go" data-page="m4-pledge">Pledge vs Sell</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Paper value of stake", UI.money(DB.valuation.gross), "30% × $30bn", "")}
      ${UI.stat("Adjusted value", UI.money(DB.valuation.adjusted), "DLOM 30% + minority 10%", "")}
      ${UI.stat("Lendable value", UI.money(DB.valuation.lendable), "60% haircut", "")}
      ${UI.stat("Approved facility (target)", UI.money(DB.valuation.facility), "At 22% LTV: " + UI.money(DB.valuation.lendable * 22 / 100), "green")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Holding structure</h2><p>Look through to the ultimate beneficial owner; must be done before any pledge or trust.</p></div></div><div class="card-body">
        <div class="code-block">Lin Zhe (Mainland China tax resident)
  └─ 100%  BVI HoldCo (holding platform)
        └─ 30%  DeepThink (Cayman)
              ├─ Ordinary shares 28%
              ├─ Option pool 2%
              └─ Restrictions: lock-up / ROFR / board consent</div>
        <div class="grid-3" style="margin-top:10px">
          ${UI.stat("Stake", "30%", "Paper $9.0bn", "")}
          ${UI.stat("Tax basis", "$1.5m", "very low → heavy tax on sale", "amber")}
          ${UI.stat("Pledge status", "Not pledged", "80m shares pledgeable", "green")}
        </div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Event radar</h2></div></div><div class="card-body"><div class="timeline">
        <div class="tl-item"><div class="when">2026-06</div><div class="what">Latest funding round: $30bn post-money</div><div class="who">Public information</div></div>
        <div class="tl-item"><div class="when">2026-10</div><div class="what">Pre-IPO structuring assessment</div><div class="who">Lead RM / counsel</div></div>
        <div class="tl-item"><div class="when">2027-03</div><div class="what">Expected HK IPO window</div><div class="who">Investment banking / HK private banking</div></div>
        <div class="tl-item"><div class="when">2028-03</div><div class="what">First lock-up expiry (assumed)</div><div class="who">Lead RM</div></div>
      </div></div></div>
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Assets and rights</h2></div></div>
      ${UI.table(["Asset", "Class", "Shares", "Rights", "Restrictions", "Pledge", "Valuation"], [
        ["DeepThink ordinary shares", "Pre-IPO equity", "80,000,000", "Voting / dividend / pre-emption", "Lock-up / ROFR / board consent", "Not pledged", `<span class="num">${UI.money(9000000000)}</span>`],
        ["BVI HoldCo", "Holding entity", "100%", "Control", "Economic substance to be evidenced", "—", "—"],
        ["Hong Kong cash", "Liquidity", "—", "—", "—", "—", `<span class="num">${UI.money(52000000)}</span>`]
      ], { compact: true })}
    </div>
    <div class="grid-3" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">Valuation</div><div class="strong" style="margin:4px 0">$5.67bn adjusted</div><div class="small muted">Latest round 50% / comparables 30% / DCF 20%; committee approved 4:0.</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-valuation">View resolution</button></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">Liquidity</div><div class="strong" style="margin:4px 0">$500m facility</div><div class="small muted">LTV 22% (on lendable value); −40% triggers a margin call; interest 6.5%.</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-pledge">Pledge or sell</button></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">Legacy</div><div class="strong" style="margin:4px 0">Hong Kong discretionary trust</div><div class="small muted">Budget $5m p.a.; injection tax about $90m; tax ledger C1–C6.</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-trust">Trust and spending</button></div></div>
    </div>`;
  };

  RENDER["m4-valuation"] = () => {
    const v = DB.valuation;
    const ltv = App.state.valuationLtv || 22;
    const facility = v.lendable * ltv / 100;
    const cov = v.lendable / facility;
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · Valuation Committee`,
      title: "Independent Valuation Committee",
      sub: "LTV is a committee decision, not a system default; a 40% fall triggers a margin call written into the lending pre-conditions.",
      actions: `<button class="btn" data-action="toast" data-msg="Submitted to the committee (4 votes for / 0 against)">Submit resolution</button>
        <button class="btn primary" data-action="approve-ltv">Approve LTV</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Paper value", UI.money(v.gross), "30% × $30bn", "")}
      ${UI.stat("Adjusted value", UI.money(v.adjusted), "DLOM 30% + minority 10%", "")}
      ${UI.stat("Lendable value", UI.money(v.lendable), "60% haircut", "")}
      ${UI.stat("Recommended LTV (on lendable value)", ltv + "%", "Range 10%–30%", "green")}
    </div>
    <div class="grid-1-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Valuation inputs</h2><p>Independent valuer plus committee challenge.</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "Latest round post-money", value: "30,000,000,000", suffix: "USD" })}
          ${UI.field({ label: "Stake", value: "30", suffix: "%" })}
          ${UI.field({ label: "DLOM", value: "30", suffix: "%" })}
          ${UI.field({ label: "Minority / unlisted", value: "10", suffix: "%" })}
          ${UI.field({ label: "Haircut", value: "60", suffix: "%" })}
          ${UI.field({ id: "ltv-value", label: "Recommended LTV", value: ltv + "%", disabled: true, help: "range slider on the right" })}
        </div>
        <div class="divider"></div>
        <div class="row"><span class="tiny muted">LTV 10%</span><input type="range" min="10" max="30" value="${ltv}" step="1" data-ltv style="flex:1"><span class="tiny muted">30%</span></div>
        <div class="tiny muted" style="margin-top:6px">After dragging: facility = lendable value × LTV; coverage = lendable value ÷ facility.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Resolution output</h2><p>The system records the committee's resolution and rationale; it does not set LTV automatically.</p></div><div class="spacer"></div>${UI.pill("Passed 4:0", "green")}</div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">Facility</div><div class="strong" id="ltv-facility">${UI.money(facility)}</div></div>
          <div><div class="tiny muted">Coverage (lendable / facility)</div><div class="strong" id="ltv-cov">${cov.toFixed(2)}x</div></div>
          <div><div class="tiny muted">40% trigger</div><div class="strong red">Yes</div></div>
          <div><div class="tiny muted">Valuation validity</div><div class="strong">6 months</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:4px">Valuation methods</div>
        ${UI.table(["Method", "Value", "Weight"], v.methods.map(m => [m.name, `<span class="num">${UI.money(m.value)}</span>`, m.weight + "%"]), { compact: true })}
        <div class="note" style="margin-top:8px"><b>40% trigger:</b>A 40% fall from the drawdown date → regardless of coverage, triggers a margin call / top-up negotiation. Written into the term sheet and credit approval.</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>LTV sensitivity</h2></div></div>
        ${UI.table(["LTV (on lendable value)", "Facility", "Coverage (lendable / facility)", "Applies"], [10, 15, 20, 22, 30].map(x => {
          const f = v.lendable * x / 100; const cv = v.lendable / f;
          return [`<b>${x}%</b>`, `<span class="num">${UI.money(f)}</span>`, cv.toFixed(2) + "x", x === ltv ? `<span class="red">Current</span>` : x <= 15 ? "Conservative" : x >= 30 ? "Cap" : "Steady"];
        }), { compact: true })}
      </div>
      <div class="card"><div class="card-head"><div><h2>Committee</h2></div></div><div class="card-body">
        <div class="two-col-list">
          <div>✅ Independent valuation chair</div><div>✅ External valuer</div><div>✅ Credit risk</div><div>✅ Private banking product</div>
          <div>👁 Compliance (observer)</div><div>👁 Legal (observer)</div><div>🚫 RM does not participate</div><div>🚫 Client does not participate</div>
        </div>
        <div class="note amber" style="margin-top:8px"><b>Dissenting view:</b>None. Minutes: valuation report 2026-10-18; DLOM 30% validated across three comparables; LTV 22% corresponds to a −50% scenario coverage of 227%.</div>
      </div></div>
    </div>`;
  };

  RENDER["m4-pledge"] = () => {
    const p = App.state.pledge;
    const calc = App.pledgeCalc(p);
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · Realisation`,
      title: "Pledge vs Sell",
      sub: "Getting the same cash: compare after-tax terminal wealth, break-even and the −40% downside, not just the tax rate.",
      actions: `<button class="btn" data-action="toast" data-msg="Client comparison generated (with assumptions and disclosures)">Generate client version</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Immediate tax on sale", UI.money(calc.tax), "Sell " + UI.money(calc.sellAmt), "red")}
      ${UI.stat("5-year pledge interest", UI.money(calc.interest), "Principal " + UI.money(p.C), "")}
      ${UI.stat("Break-even return", UI.pct(calc.breakeven * 100, 2), "r*", "amber")}
      ${UI.stat("−40% gap", UI.money(calc.downsideGap), "more left if sold", "red")}
    </div>
    <div class="grid-1-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Inputs</h2><p>Every field is editable; numbers recompute live.</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ id: "pv-V", label: "Value of holding", value: "100,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-B", label: "Tax basis", value: "1,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-t", label: "Disposal tax rate", value: "20", suffix: "%" })}
          ${UI.field({ id: "pv-C", label: "Cash required", value: "25,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-i", label: "Pledge rate", value: "6.5", suffix: "%" })}
          ${UI.field({ id: "pv-n", label: "Tenor", value: "5", suffix: "yrs" })}
          ${UI.field({ id: "pv-r", label: "Annualised equity return", value: "8", suffix: "%" })}
          ${UI.field({ id: "pv-d", label: "Dividend yield", value: "0", suffix: "%" })}
        </div>
        <button class="btn primary" style="margin-top:10px;width:100%" data-action="calc-pledge">Recalculate</button>
        <div class="tiny muted" style="margin-top:6px">Assumptions: interest paid annually, no dividends, no transaction costs; tax rate 20% for a Mainland China tax resident.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Terminal wealth</h2><p>In 5 years; sell vs pledge.</p></div><div class="spacer"></div><span class="pill ${calc.recommend === "Pledge" ? "green" : calc.recommend === "Sell" ? "blue" : "amber"}">${calc.recommend}</span></div><div class="card-body">
        <div class="chart" id="pledge-chart">${UI.lineChart([
          { name: "Sell", color: "var(--blue)", points: calc.sellSeries },
          { name: "Pledge", color: "var(--green)", points: calc.pledgeSeries }
        ], { height: 220, min: 0, max: 190, xLabels: ["−20%", "−10%", "0%", "8%", "15%"] })}</div>
        <div class="legend" style="margin-top:6px"><span><i style="background:var(--blue)"></i>Shares remaining after sale</span><span><i style="background:var(--green)"></i>Shares after pledge − loan − interest</span></div>
        <div class="divider"></div>
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">Sold, 8% annualised</div><div class="strong">${UI.money(calc.sellAt8)}</div></div>
          <div><div class="tiny muted">Pledged, 8% annualised</div><div class="strong green">${UI.money(calc.pledgeAt8)}</div></div>
          <div><div class="tiny muted">One-off −40% sell</div><div class="strong">${UI.money(calc.sellDown)}</div></div>
          <div><div class="tiny muted">One-off −40% pledge</div><div class="strong red">${UI.money(calc.pledgeDown)}</div></div>
        </div>
        <div class="note ${calc.recommend === "Sell" ? "amber" : "green"}" style="margin-top:8px"><b>Conclusion:</b>${calc.rationale}</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Decision matrix</h2></div></div><div class="card-body">
        ${UI.table(["Condition", "Pledge", "Sell"], [
          ["Expected return vs funding cost", "r > i + 3%", "r ≤ i + 2%"],
          ["Tax basis / tax", "Low basis, heavy tax", "High basis, light tax"],
          ["Concentration", "< 60%", "> 60%"],
          ["Horizon", "≥ 3–5 yrs", "Needs permanent liquidity"],
          ["−40% scenario", "Can top up", "Cannot top up"],
          ["Control", "Wants to keep", "Willing to reduce"]
        ], { compact: true })}
      </div></div>
      <div class="card"><div class="card-head"><div><h2>Tax regime differences</h2></div></div><div class="card-body">
        ${UI.table(["Client", "Tax on sale", "Point of pledging"], [
          ["HK resident / HK shares", "Capital gains usually not taxed", "Low deferral value; compare rate vs return"],
          ["Mainland China resident / offshore shares", "20% on transfer of property", "High deferral value; CRS / Circular 7 / Circular 21"],
          ["US resident", "LTCG + NIIT", "Medium deferral; estate tax is another layer"],
          ["Held in trust", "Depends on jurisdiction / beneficiary", "Trustee powers / conflicts of interest"]
        ], { compact: true })}
      </div></div>
    </div>`;
  };

  RENDER["m3-family-office"] = () => {
    const d = DB.familyOfficeDashboard;
    const totalNet = d.consolidated.reduce((a, x) => a + x.net, 0);
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Family Office`,
      title: "Family Office Dashboard",
      sub: "One consolidated view for the family office: entities, trusts, investments, liquidity, banking/CIB services, governance and next-generation milestones. Demo data; no client relationship implied.",
      actions: `<button class="btn" data-action="toast" data-msg="Consolidated report generated (demo)">Generate report</button>
        <button class="btn primary" data-action="go" data-page="m4-private-assets">Private assets</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Consolidated AUA", UI.money(d.aua), "Across entities and trusts", "green")}
      ${UI.stat("Entities / trusts", `${d.entities} / ${d.trusts}`, `${d.jurisdictions} jurisdictions`, "")}
      ${UI.stat("Liquidity", UI.money(d.liquidity), "Cash / near cash", "amber")}
      ${UI.stat("IPS compliance", `${d.ipsCompliance}%`, "Actual vs policy bands", d.ipsCompliance >= 90 ? "green" : "amber")}
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Consolidated balance sheet</h2><p>Bank / trust / property / investment entities; net assets after liabilities.</p></div></div>
        ${UI.table(["Entity", "Jurisdiction", "Assets", "Liabilities", "Net"], d.consolidated.map(e => [
          `<b>${e.entity}</b>`, e.jurisdiction, UI.money(e.assets), UI.money(e.liabilities), UI.money(e.net)
        ]), { compact: true })}
        <div class="note blue" style="margin-top:8px"><b>Total net assets:</b> ${UI.money(totalNet)}. Consolidation does not change legal ownership; trust assets remain separate from personal assets.</div>
      </div>
      <div class="card"><div class="card-head"><div><h2>Investment policy vs actual</h2><p>Target, actual and policy band; deviations require investment committee action.</p></div></div>
        ${UI.table(["Asset class", "Target", "Actual", "Band", "Status"], d.allocation.map(a => [
          a.assetClass, `${a.target}%`, `${a.actual}%`, a.band, UI.pill(Math.abs(a.actual - a.target) <= 5 ? "In band" : "Review", Math.abs(a.actual - a.target) <= 5 ? "green" : "amber")
        ]), { compact: true })}
        <div class="tiny muted" style="margin-top:6px">Cost / income ratio: ${d.costIncome}% (demo).</div>
      </div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Banking, CIB and trust services</h2><p>Who provides what; one service catalogue, not six portals.</p></div></div>
        ${UI.table(["Service", "Provider", "Status", "Note"], d.services.map(s => [
          `<b>${s.service}</b>`, s.provider, UI.pill(s.status, s.status === "Active" ? "green" : "amber"), s.note
        ]), { compact: true })}
      </div>
      <div class="card"><div class="card-head"><div><h2>Governance and next generation</h2><p>Charter, council, investment committee, next-gen, philanthropy.</p></div></div>
        ${UI.table(["Milestone", "Status", "Date"], d.governance.map(g => [
          `<b>${g.milestone}</b>`, UI.pill(g.status, g.status === "Signed" ? "green" : g.status === "Quarterly" || g.status === "Monthly" ? "blue" : "amber"), g.date
        ]), { compact: true })}
      </div>
    </div>`;
  };

  RENDER["m4-private-assets"] = () => {
    const d = DB.privateAssetLab;
    const tab = App.state.privateAssetTab || "capital-call";
    const tabs = [["intake", "Asset Intake"], ["valuation", "Valuation Governance"], ["pledge", "Pledge & Credit"], ["capital-call", "Capital Calls"], ["earn-out", "Earn-Outs"], ["obligation", "Obligation Calendar"]];
    const next90 = d.obligations.filter(o => o.dueDate >= "2026-10-26" && o.dueDate <= "2027-01-24").reduce((a, o) => a + o.amount, 0);
    const totalCommitment = d.capitalCalls.reduce((a, c) => a + c.commitment, 0);
    const called = d.capitalCalls.reduce((a, c) => a + c.calledToDate, 0);
    const uncalled = totalCommitment - called;
    const gap = d.capitalCalls.reduce((a, c) => a + c.fundingGap, 0);
    const valuationTable = d.valuations.map(v => [
      `<span class="mono">${v.id}</span>`, `<b>${v.asset}</b>`, v.method, v.latestRound,
      `${v.marketabilityDiscount}% / ${v.minorityDiscount}% / ${v.concentrationDiscount}%`,
      `<span class="num">${UI.money(v.valuationAmount, v.currency)}</span>`, `<span class="num">${UI.money(v.lendableValue, v.currency)}</span>`,
      v.committee, v.approvalDate, v.nextReview, UI.pill(v.status, v.status.includes("Approved") ? "green" : v.status.includes("Not") ? "gray" : "amber")
    ]);
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · Private Asset Lifecycle`,
      title: "Private Asset Lifecycle",
      sub: "Capital calls, earn-outs, obligation calendar and valuation governance for concentrated, illiquid and pre-IPO wealth. Demo data; public cases are illustrative, not client relationships.",
      actions: `<button class="btn" data-action="toast" data-msg="Capital call notice uploaded (demo)">Upload capital call</button>
        <button class="btn primary" data-action="toast" data-msg="Valuation submitted to committee (demo)">Submit valuation</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("Paper value", UI.money(d.summary.paperValue), "Latest round / market price", "")}
      ${UI.stat("Pledgeable value", UI.money(d.summary.pledgeableValue), "After discounts and restrictions", "green")}
      ${UI.stat("Spendable value", UI.money(d.summary.spendableValue), "After tax, debt and reserves", "amber")}
      ${UI.stat("Funding gap (12M)", UI.money(d.summary.fundingGap), "Capital calls / obligations", d.summary.fundingGap ? "red" : "green")}
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>Before</h2><p>Fragmented, manual, hard to prove.</p></div></div><div class="card-body">
        <div class="small muted">Paper value and spendable value are mixed; valuation lives in email; capital calls and earn-outs sit in spreadsheets; pledge documents are in legal folders; margin calls are tracked by memory; tax, trust and family office are separate.</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>After</h2><p>One lifecycle, one evidence chain.</p></div></div><div class="card-body">
        <div class="small muted">One private asset register; valuation governance with method, discounts and committee; capital call and earn-out register; obligation calendar with funding source; pledge and credit gates; tax/trust/family office handoff; every number has a date, owner and evidence.</div>
      </div></div>
    </div>
    <div class="tabs" style="margin-top:10px">
      ${tabs.map(([id, label]) => `<button class="tab ${tab === id ? "on" : ""}" data-action="privateAssetTab" data-id="${id}">${label}</button>`).join("")}
    </div>
    ${tab === "intake" ? `
      <div class="grid-3">
        ${UI.stat("Intake completeness", `${d.intake.completeness}%`, "Required fields and documents", d.intake.completeness >= 80 ? "green" : "amber")}
        ${UI.stat("Ownership", d.intake.ownershipPercentage, "Shares / voting / economic rights", "")}
        ${UI.stat("Shares held", d.intake.sharesHeld, "Ordinary shares", "")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Private asset intake</h2><p>Capture the asset, legal structure, restrictions, related trusts/entities and source documents before valuation or credit.</p></div><div class="spacer"></div><button class="btn sm" data-action="toast" data-msg="Intake saved as draft (demo)">Save draft</button></div>
        ${UI.table(["Field", "Value", "Evidence / status"], [
          ["Asset source", d.intake.source, "Founder / primary shares"],
          ["Asset class", d.intake.assetClass, "Private equity / pre-IPO"],
          ["Issuer", d.intake.issuer, "Public case; illustrative"],
          ["Issuer jurisdiction", d.intake.issuerJurisdiction, "Cayman Islands"],
          ["Holding entity", d.intake.holdingEntity, "BVI HoldCo"],
          ["Beneficial owner", d.intake.beneficialOwner, "KYC / UBO file"],
          ["Ownership percentage", d.intake.ownershipPercentage, "Cap table v4"],
          ["Shares held", d.intake.sharesHeld, "Share certificate"],
          ["Share class", d.intake.shareClass, "Articles of association"],
          ["Voting rights", d.intake.votingRights, "Shareholder agreement"],
          ["Economic rights", d.intake.economicRights, "Shareholder agreement"],
          ["Lock-up", d.intake.lockUp, "IPO / financing documents"],
          ["Transfer restrictions", d.intake.transferRestrictions, "ROFR / board consent"],
          ["Pledge status", d.intake.pledgeStatus, UI.pill("Conditional", "amber")],
          ["Source documents", d.intake.sourceDocuments, "Document vault"],
          ["Related trust", d.intake.relatedTrust, "Trust deed / trustee"],
          ["Related family office", d.intake.relatedFamilyOffice, "FO operating model"],
          ["Valuation source", d.intake.valuationSource, "Valuation report"],
          ["Risk flags", `<span style="color:var(--destructive)">${d.intake.riskFlags}</span>`, "Escalate to Credit / Legal"]
        ], { compact: true })}
        <div class="note amber" style="margin-top:8px"><b>Gate:</b> intake is not complete until ownership, voting rights, transfer restrictions, pledge status, related trust/entity and source documents are verified. Missing items block valuation and credit.</div>
      </div>
    ` : tab === "pledge" ? `
      <div class="grid-4">
        ${UI.stat("LTV", `${d.pledge.ltv}%`, "Facility / lendable value", "")}
        ${UI.stat("Haircut", `${d.pledge.haircut}%`, "Applied to market value", "amber")}
        ${UI.stat("Facility", UI.money(d.pledge.facility), "Approved / target", "green")}
        ${UI.stat("Coverage", `${d.pledge.coverage}%`, "Lendable / facility", d.pledge.coverage > 150 ? "green" : "red")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Pledge eligibility</h2><p>Legal, corporate and registration conditions before drawdown.</p></div></div>
          ${UI.table(["Condition", "Status", "Note"], d.pledge.eligibility.map(e => [e.item, UI.pill(e.status, e.status === "Clear" ? "green" : e.status === "Pending" ? "amber" : e.status === "Not started" ? "red" : "blue"), e.note]), { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>Drawdown preconditions</h2><p>No precondition, no drawdown.</p></div></div><div class="card-body">
          ${d.pledge.preconditions.map(x => `<div class="row" style="margin:5px 0"><span class="pill green">✓</span><span class="small">${x}</span></div>`).join("")}
          <div class="note red" style="margin-top:8px"><b>Margin call:</b> ${d.pledge.marginCall}. Escalate to Credit and the client before the threshold is breached.</div>
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Credit structure</h2><p>Facility, collateral and covenants in one view.</p></div></div>
        ${UI.table(["Item", "Value", "Note"], [
          ["Lendable value", UI.money(d.pledge.lendable, "USD"), "After 78% haircut"],
          ["Facility amount", UI.money(d.pledge.facility, "USD"), "22% LTV"],
          ["Coverage", `${d.pledge.coverage}%`, "Lendable / facility"],
          ["Margin call trigger", d.pledge.marginCall, "Valuation-based"],
          ["Collateral", "AI Terra Ltd ordinary shares (illustrative)", "30.0% (demo)"],
          ["Security", "Share pledge / account charge", "Cayman / BVI / HK"],
          ["Covenants", "Concentration / lock-up / information", "Credit agreement"],
          ["Conditions precedent", "Valuation, board consent, registration, legal opinion, KYC", "Drawdown gate"]
        ], { compact: true })}
      </div>
    ` : tab === "capital-call" ? `
      <div class="grid-4">
        ${UI.stat("Total commitment", UI.money(totalCommitment), "Across funds", "")}
        ${UI.stat("Called to date", UI.money(called), "Paid / funded", "")}
        ${UI.stat("Uncalled commitment", UI.money(uncalled), "Future obligation", "amber")}
        ${UI.stat("Next 90 days", UI.money(next90), "All obligations", next90 ? "red" : "green")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Capital call register</h2><p>Commitment, called amount, notice date, due date, funding source and gap in one register.</p></div></div>
        ${UI.table(["Call ID", "Fund", "Limited partner", "Commitment", "Called", "Uncalled", "Notice", "Due", "Call amount", "Ccy", "Funding source", "Gap", "Status"], d.capitalCalls.map(c => [
          `<span class="mono">${c.id}</span>`, c.fund, c.limitedPartner,
          `<span class="num">${UI.money(c.commitment)}</span>`, `<span class="num">${UI.money(c.calledToDate)}</span>`, `<span class="num">${UI.money(c.uncalled)}</span>`,
          c.noticeDate, c.dueDate, `<span class="num">${UI.money(c.callAmount)}</span>`, c.currency, c.fundingSource,
          `<span class="num" style="color:${c.fundingGap ? "var(--destructive)" : "var(--success)"}">${UI.money(c.fundingGap)}</span>`,
          UI.pill(c.status, c.status === "Paid" ? "green" : c.status === "Funding required" ? "red" : "blue")
        ]), { compact: true })}
        <div class="note amber" style="margin-top:8px"><b>Rule:</b> a capital call is not a payment until the notice, LP entity, amount, due date, funding source and evidence are linked. Funding gap is escalated to the Family Office CFO and Credit.</div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Private asset register</h2><p>Paper, pledgeable and spendable value are different numbers.</p></div></div>
        ${UI.table(["Asset", "Public case", "Instrument", "Ownership", "Lock-up", "Restrictions", "Paper value", "Pledgeable", "Spendable", "Pledge status"], d.assets.map(a => [
          `<b>${a.name}</b>`, `<span class="tiny muted">${a.publicCase}</span>`, a.instrument, a.ownership, a.lockUp, a.restrictions,
          a.paperValue, a.pledgeableValue, a.spendableValue, a.pledgeStatus
        ]), { compact: true })}
      </div>
    ` : tab === "earn-out" ? `
      <div class="card"><div class="card-head"><div><h2>Earn-out and deferred consideration</h2><p>Headline consideration is not cash. Track trigger, measurement period, fair value and probability-weighted value.</p></div></div>
        ${UI.table(["ID", "Transaction", "Buyer", "Upfront", "Deferred / max", "Trigger", "Measurement period", "Payment date", "Discount rate", "Fair value", "Probability-weighted", "Status"], d.earnOuts.map(e => [
          `<span class="mono">${e.id}</span>`, `<b>${e.transaction}</b>`, e.buyer,
          `<span class="num">${UI.money(e.upfrontConsideration, e.currency)}</span>`,
          `<span class="num">${UI.money(e.deferredConsideration, e.currency)}</span>`,
          `${e.triggerMetric}<div class="tiny muted">${e.threshold}</div>`, e.measurementPeriod, e.paymentDate, `${e.discountRate}%`,
          `<span class="num">${UI.money(e.fairValue, e.currency)}</span>`,
          `<span class="num">${UI.money(e.probabilityWeighted, e.currency)}</span>`,
          UI.pill(e.status, e.status === "Performing" ? "green" : "amber")
        ]), { compact: true })}
        <div class="grid-3" style="margin-top:10px">
          <div class="stat"><div class="stat-label">Headline consideration</div><div class="stat-value sm">${UI.money(d.earnOuts[0].upfrontConsideration + d.earnOuts[0].deferredConsideration, "GBP")}</div><div class="stat-sub">Upfront + maximum deferred</div></div>
          <div class="stat"><div class="stat-label">Risk-adjusted fair value</div><div class="stat-value sm">${UI.money(d.earnOuts[0].fairValue, "GBP")}</div><div class="stat-sub">Independent valuation / model</div></div>
          <div class="stat"><div class="stat-label">Probability-weighted</div><div class="stat-value sm">${UI.money(d.earnOuts[0].probabilityWeighted, "GBP")}</div><div class="stat-sub">For liquidity and tax planning</div></div>
        </div>
        <div class="note amber" style="margin-top:8px"><b>Rule:</b> do not book the maximum earn-out as available liquidity. Use fair value and probability-weighted value; link the sale and purchase agreement, measurement period and dispute mechanism.</div>
      </div>
    ` : tab === "obligation" ? `
      <div class="grid-3">
        ${UI.stat("Next 30 days", UI.money(d.obligations.filter(o => o.dueDate <= "2026-11-25").reduce((a, o) => a + o.amount, 0)), "Cash required", "amber")}
        ${UI.stat("Next 90 days", UI.money(next90), "Cash required", "red")}
        ${UI.stat("Next 365 days", UI.money(d.obligations.reduce((a, o) => a + o.amount, 0)), "All obligations", "")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>Obligation calendar</h2><p>Capital calls, earn-outs, vendor loans, tax, interest and trust distributions on one timeline.</p></div></div>
        ${UI.table(["Obligation ID", "Type", "Counterparty", "Amount", "Ccy", "Due date", "Priority", "Funding source", "Responsible", "Status", "Source document"], d.obligations.map(o => [
          `<span class="mono">${o.id}</span>`, `<b>${o.type}</b>`, o.counterparty, `<span class="num">${UI.money(o.amount, o.currency)}</span>`, o.currency,
          o.dueDate, UI.pill(o.priority, o.priority === "High" ? "red" : "amber"), o.fundingSource, o.responsibleParty,
          UI.pill(o.status, o.status.includes("gap") || o.status.includes("funded") ? "red" : "green"), o.sourceDocument
        ]), { compact: true })}
        <div class="note blue" style="margin-top:8px"><b>Rule:</b> every obligation must have an amount, currency, due date, priority, responsible party and source document. A due date without a funding source is a red flag.</div>
      </div>
    ` : `
      <div class="card"><div class="card-head"><div><h2>Valuation governance</h2><p>Method, discounts, independent valuer, committee and next review for each private asset.</p></div><div class="spacer"></div><button class="btn sm" data-action="go" data-page="m4-valuation">Open valuation committee</button></div>
        ${UI.table(["Valuation ID", "Asset", "Method", "Latest round / market", "Marketability / minority / concentration", "Valuation amount", "Lendable value", "Committee", "Approved", "Next review", "Status"], valuationTable, { compact: true })}
        <div class="grid-3" style="margin-top:10px">
          <div class="stat"><div class="stat-label">AI Terra lendable value</div><div class="stat-value sm">${UI.money(d.valuations[0].lendableValue)}</div><div class="stat-sub">30% / 10% / 10% discounts</div></div>
          <div class="stat"><div class="stat-label">Shepherd Neame concentration</div><div class="stat-value sm">20%</div><div class="stat-sub">Thin market / family control</div></div>
          <div class="stat"><div class="stat-label">Riverford pledgeable</div><div class="stat-value sm">${UI.money(d.valuations[1].lendableValue)}</div><div class="stat-sub">EOT interest not pledgeable</div></div>
        </div>
        <div class="note amber" style="margin-top:8px"><b>Rule:</b> no valuation, no pledge; no pledge registration, no drawdown. The committee approves the method, discounts, lendable value and next review; the system records dissent and evidence.</div>
      </div>
    `}`;
  };

  globalThis.invitationCard = invitationCard;

  RENDER["m4-trust"] = () => {
    const t = DB.trust;
    const tab = App.state.trustTab || "structure";
    const total = t.budget.reduce((a, b) => a + b.amt, 0);
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · Trust`,
      title: "Trust / Budget / Tax Ledger",
      sub: "Trust holding + letter of wishes + direct trustee payments + small cash; no “spend at will”.",
      actions: `<button class="btn" data-action="toast" data-msg="Submitted to the trustee committee (SLA 5 business days)">Submit distribution</button>`
    }) + `
    <div class="tabs">
      <button class="tab ${tab === "structure" ? "on" : ""}" data-action="trust-tab" data-id="structure">Structure</button>
      <button class="tab ${tab === "budget" ? "on" : ""}" data-action="trust-tab" data-id="budget">Budget</button>
      <button class="tab ${tab === "tax" ? "on" : ""}" data-action="trust-tab" data-id="tax">Tax ledger</button>
    </div>
    ${tab === "structure" ? `
      <div class="grid-2">
        <div class="card"><div class="card-head"><div><h2>Trust structure</h2><p>Example: HSBC TFS acts as trustee.</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:9px">
            <div><div class="tiny muted">Type</div><div class="strong">${t.type}</div></div>
            <div><div class="tiny muted">Jurisdiction</div><div class="strong">${t.jurisdiction}</div></div>
            <div><div class="tiny muted">Trustee</div><div class="strong">${t.trustee}</div></div>
            <div><div class="tiny muted">Protector</div><div class="strong">${t.protector}</div></div>
            <div><div class="tiny muted">Settlor</div><div class="strong">${t.settlor}</div></div>
            <div><div class="tiny muted">Beneficiaries</div><div class="strong">${t.beneficiaries}</div></div>
            <div><div class="tiny muted">Reserved powers</div><div class="strong">${t.reserved}</div></div>
            <div><div class="tiny muted">Injection</div><div class="strong">${UI.money(t.injection)}</div></div>
          </div>
          <div class="note amber" style="margin-top:9px"><b>Control vs protection:</b>The more powers are reserved, the weaker the asset protection. If the settlor is still a beneficiary and can distribute unilaterally, creditors or tax authorities may look through.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Injection tax (example)</h2></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">Value injected</div><div class="strong">${UI.money(t.injection)}</div></div>
            <div><div class="tiny muted">Deemed disposal tax at 20%</div><div class="strong red">${UI.money(t.injectionTax)}</div></div>
            <div><div class="tiny muted">Annual charge</div><div class="strong">${t.annualTax * 100}% p.a.</div></div>
            <div><div class="tiny muted">Cost deductibility</div><div class="strong red">Not deductible</div></div>
          </div>
          <div class="note" style="margin-top:8px"><b>Announcement 21:</b>Loading in is taxed at market value − original value − expenses 20%; annual income taxed at 20%; termination is a deemed liquidation at market value; transfer to a non-resident is a deemed liquidation on the day. Transition period to 2026-10-22 (subject to the latest official guidance).</div>
        </div></div>
      </div>` : tab === "budget" ? `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>Annual budget</h2><p>Total ${UI.money(total)}; trustee discretion, not a direct client instruction.</p></div></div>
          ${UI.table(["Category", "Annual budget", "Payment method"], t.budget.map(b => [
            `<span class="strong">${b.cat}</span>`, `<span class="num">${UI.money(b.amt)}</span>`, b.pay
          ]), { compact: true })}
          <div class="card-foot"><span class="tiny muted">Spend outside the budget needs separate approval; no cash; vendors pass KYC / sanctions / related-party checks.</span><div style="flex:1"></div><button class="btn sm" data-action="toast" data-msg="Budget saved (v2027)">Save</button></div>
        </div>
        <div class="card"><div class="card-head"><div><h2>Tax reserve</h2></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">Minimum</div><div class="strong">${UI.money(t.reserve.min)}</div></div>
            <div><div class="tiny muted">Target</div><div class="strong">${UI.money(t.reserve.target)}</div></div>
            <div><div class="tiny muted">Current</div><div class="strong green">${UI.money(t.reserve.actual)}</div></div>
            <div><div class="tiny muted">Coverage</div><div class="strong">${Math.round(t.reserve.actual / t.reserve.min * 100)}%</div></div>
          </div>
          <div class="tiny muted" style="margin-top:8px">Policy: ${t.reserve.policy}</div>
          <div class="note green" style="margin-top:8px"><b>Hard rule:</b>Below the minimum → suspend non-essential distributions; quarterly review; annual trustee committee + tax adviser sign-off.</div>
        </div></div>
      </div>` : `
      <div class="card"><div class="card-head"><div><h2>Distribution tax ledger</h2><p>Source layers C1–C6; who files, tax credit, filing status.</p></div><div class="spacer"></div><button class="btn sm" data-action="add-distribution">Add distribution</button></div>
        ${UI.table(["ID", "Item", "Amount", "Source layer", "Filer", "Tax", "Credit", "Filing", "Status"], t.taxRows.map(r => [
          `<span class="mono">${r.id}</span>`, r.item, `<span class="num">${UI.money(r.amt)}</span>`, r.layer, r.person,
          `<span class="num">${r.due ? UI.money(r.due) : "0"}</span>`, `<span class="num">${r.credit ? UI.money(r.credit) : "—"}</span>`,
          r.filing, UI.pill(r.status, r.status === "Paid" ? "green" : r.status === "Advice pending" ? "amber" : "blue")
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Source layers</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div><b>C1</b> Principal / corpus</div><div><b>C2</b> Taxed in year</div><div><b>C3</b> Cumulative taxed</div>
            <div><b>C4</b> Untaxed</div><div><b>C5</b> Capital gain</div><div><b>C6</b> Borrowing / advance</div>
          </div>
          <div class="note" style="margin-top:8px"><b>No source, no distribution:</b>Cannot tag C1–C6 → blocked; no tax paid or accrued → blocked; no valuation → no benefits in kind.</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>Who files</h2></div></div><div class="card-body">
          ${UI.table(["Item", "Trustee", "Settlor", "Beneficiary"], [
            ["Annual income tax", "R/A", "C", "I"],
            ["Distribution", "R/A", "C", "A"],
            ["Benefits in kind", "R", "I", "A"],
            ["CRS/FATCA", "R/A", "I", "I"]
          ], { compact: true })}
          <div class="tiny muted" style="margin-top:6px">R=executes, A=ultimately responsible, C=consulted, I=informed. A trustee resolution ≠ payment review.</div>
        </div></div>
      </div>`}`;
  };
})();
