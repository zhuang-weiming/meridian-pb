/* M3 / M4 renderers */
(() => {
  const founder = DB.clients.find(c => c.id === "C-88421");

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
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · Tax / Legal`,
      title: "Tax / Legal Cockpit",
      sub: "M3 only identifies scenarios, makes licensed referrals and handles funding; M5 tax optimisation is a separate HSBC internal workstream; M3 does not give tax or legal opinions.",
      actions: `<button class="btn" data-action="toast" data-msg="Referral ticket created (SLA 1 business day)">Refer to specialist</button>`
    }) + `
    <div class="tabs">
      <button class="tab ${tab === "tax" ? "on" : ""}" data-action="m3tab" data-id="tax">Tax</button>
      <button class="tab ${tab === "legal" ? "on" : ""}" data-action="m3tab" data-id="legal">Legal</button>
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
