/* HSBC Private Bank — Operating Workbench.
   Static, route-based prototype. Public cases are illustrative; bank figures are demo data. */
(() => {
  const $ = (s) => document.querySelector(s);

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const money = (n, ccy = "USD") => {
    const sign = Number(n) < 0 ? "−" : "";
    const v = Math.abs(Number(n || 0));
    const unit = ccy === "USD" ? "$" : ccy + " ";
    if (v >= 1e9) return sign + unit + (v / 1e9).toFixed(2) + "bn";
    if (v >= 1e6) return sign + unit + (v / 1e6).toFixed(1) + "m";
    if (v >= 1e3) return sign + unit + (v / 1e3).toFixed(0) + "k";
    return sign + unit + v.toFixed(0);
  };

  const pct = (n, d = 1) => `${Number(n || 0).toFixed(d)}%`;
  const badge = (text, tone = "gray") => `<span class="badge ${tone}">${esc(text)}</span>`;
    const statusTone = (s) => {
    const t = String(s || "").toLowerCase();
    if (/(done|filled|active|approved|clear|paid|signed|verified|closed|recovered|listed|completed)/.test(t)) return "green";
    if (/(pending|review|conditional|forecast|partial|education|monitor|measurement|in progress|application|submitted|informed|continues)/.test(t)) return "amber";
    if (/(failed|rejected|red|not started|not onboarded|insufficient|timeout|gap|terminated)/.test(t)) return "red";
    if (/(new|selected|cohort|quarterly|monthly)/.test(t)) return "blue";
    return "gray";
  };

  const table = (headers, rows, opts = {}) => {
    const cls = opts.compact ? " compact" : "";
    return `<div class="table-wrap"><table class="data${cls}"><thead><tr>${headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c == null ? "" : c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  };

  const stat = (label, value, sub = "", tone = "") => `<div class="stat ${tone}"><div class="stat-label">${esc(label)}</div><div class="stat-value">${esc(value)}</div><div class="stat-sub">${esc(sub)}</div></div>`;

  const card = (title, sub, body, actions = "") => `<section class="card"><div class="card-head"><div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ""}</div>${actions ? `<div class="actions">${actions}</div>` : ""}</div><div class="card-body">${body}</div></section>`;

  const pageHead = (crumb, title, sub, actions = "") => `<div class="page-head"><div><div class="crumb">${crumb}</div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div><div class="actions">${actions}<button class="btn" data-notes>Speaker notes</button></div></div>`;

  const btn = (label, msg = "Action recorded (demo)") => `<button class="btn" data-toast="${esc(msg)}">${esc(label)}</button>`;
  const primary = (label, msg = "Action recorded (demo)") => `<button class="btn primary" data-toast="${esc(msg)}">${esc(label)}</button>`;

  const steps = (items, current = 0) => `<div class="steps">${items.map((x, i) => `<div class="step ${i === current ? "on" : ""} ${i < current ? "done" : ""}"><div class="dot">${i < current ? "✓" : i + 1}</div><div class="step-text"><b>${esc(x)}</b></div></div>`).join("")}</div>`;

  const sourceNote = (text) => `<div class="note"><b>Data note:</b> ${esc(text)}</div>`;

  const capacityIndex = (r) => {
    const s = r.service_intensity || {};
    const weighted = Number(r.relationships || 0) * (
      0.3 +
      Number(s.meetingsPerYear || 0) / 20 +
      Number(s.tradesPerYear || 0) / 50 +
      Number(s.trustCases || 0) / 30 +
      Number(s.creditFacilities || 0) / 40
    );
    return Number((weighted / Number(r.support_ratio || 1)).toFixed(1));
  };

  const capacityLabel = (v) => v > 85 ? "Overloaded" : v > 65 ? "Watch" : v >= 45 ? "Balanced" : "Underloaded";

  const PAGES = {
    overview: {
      section: "Overview",
      title: "Operating Workbench",
      sub: "Five real business problems, twenty process pages, and the data needed to prove them.",
      render: () => pageHead("HSBC Private Bank · Workbench", "Operating Workbench", "A working prototype for the five new initiatives: CIB IPO-to-PB, estate outcomes, family onboarding, client margin and failed-trade trust. Public cases are illustrative; bank data is demo data.") + `
        <div class="grid-5">
          ${["IPO & PB", "Estate & Continuity", "Family Onboarding", "Revenue & Margin", "Order Trust"].map((x, i) => `<a class="module-card" href="#/${["ipo-pipeline", "estate-portfolio", "onboarding-family", "revenue-cockpit", "order-monitor"][i]}"><div class="module-no">0${i + 1}</div><div class="module-name">${x}</div><div class="module-sub">${["CIB pipeline, pre-IPO valuation, consent-based handoff", "Death-to-12-month funds, authority, probate, outcomes", "Templates, suitability, first investment, permissions", "AUM, revenue, client commission, margin, RM capacity", "Failed trade %, reasons, recovery, RM KPI"][i]}</div><span class="arrow">→</span></a>`).join("")}
        </div>
        <div class="grid-3" style="margin-top:12px">
          ${stat("IPO / wealth events", WB.ipo.pipeline.length, "CIB / MSS pipeline", "blue")}
          ${stat("Estate cases", WB.estate.cases.length, "Public + illustrative", "amber")}
          ${stat("Failed trade %", pct(WB.orders.summary.failedPct), "Today / demo", "red")}
        </div>
        <div class="grid-2" style="margin-top:12px">
          ${card("What this workbench is", "Not a marketing demo; a process-and-data prototype.", `<div class="prose"><p>Each module has four pages: the event/pipeline, the case/company, the decision model, and the outcome/recovery. Every table has real business fields; every action has a status, owner and evidence.</p><p><b>Naming policy.</b> Public cases (Anita Mui estate, FOS Mrs P, Lo Family Trust / Tao Soh Ngun [2019] HKCFI 1268, DeepSeek 2026 round, Mindray, Lens, Riverford, Unruly) are structural references only. Account-level rows — orders, onboarding files, client P&L — use fictional demo families (He family, UK creator family, AI founder family, Ashworth family). No client relationship is implied.</p></div>`)}
          ${card("How to use it", "Start at the five modules; follow the arrows.", `<div class="prose"><p>1. IPO & PB: pipeline → company → valuation → handoff.</p><p>2. Estate: portfolio → case → authority → 12-month outcome.</p><p>3. Onboarding: family → suitability → templates → first investment.</p><p>4. Revenue: cockpit → client → product → RM.</p><p>5. Orders: monitor → failure → recovery → KPI.</p></div>`)}
        </div>
        ${sourceNote("Public facts as of 2026-10-26 (review quarterly). All monetary figures are demo data pending finance/transfer-pricing sign-off.")}`
    },

    /* ── IPO & PB ── */
    "ipo-pipeline": {
      section: "IPO & PB",
      title: "IPO & Wealth Event Pipeline",
      sub: "CIB / MSS events, management shareholders, estimated wealth and PB readiness.",
      render: () => pageHead("1 · IPO & PB", "IPO & Wealth Event Pipeline", "A single pipeline for IPO, H-share, secondary, M&A and employee-ownership events. PB follows only with client consent and wall clearance.") + `
        ${steps(["Identify event", "Profile management", "Pre-IPO valuation", "Consent handoff"], 0)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("Pipeline events", WB.ipo.pipeline.length, "IPO / M&A / EOT", "blue")}
          ${stat("Management holders", "23", "Across five events", "")}
          ${stat("PB-ready", "2", "Existing / onboarded", "green")}
          ${stat("Consent pending", "3", "Wall / client consent", "amber")}
        </div>
        ${card("Wealth event pipeline", "Public cases are illustrative; stage/dates are demo.", table(["ID", "Company", "Exchange", "Stage", "Expected", "CIB coverage", "Founder / holders", "Estimated wealth", "PB status", "PB RM"], WB.ipo.pipeline.map(x => [`<span class="mono">${x.id}</span>`, `<b>${x.company}</b><div class="tiny">${x.sector}</div>`, x.exchange, badge(x.stage, statusTone(x.stage)), x.expected, x.cib, `${x.founder}<div class="tiny">${x.holders}</div>`, x.wealth, badge(x.pb, statusTone(x.pb)), x.owner]), { compact: true }), `<a class="btn primary" href="#/ipo-company">Open DeepSeek company profile →</a>`)}
        ${sourceNote("Pipeline and dates are illustrative. Real pipeline requires CIB/MSS deal data, client consent and Chinese Wall clearance.")}`
    },

    "ipo-company": {
      section: "IPO & PB",
      title: "Company & Management Profile",
      sub: "Ownership, restrictions, wealth event, PB opportunity and cross-border complexity.",
      render: () => {
        const c = WB.ipo.company;
        return pageHead("1 · IPO & PB", `${c.name} · Company & Management`, "One company view for CIB and PB: cap table, lock-up, control, cross-border and the family wealth event.") + `
          ${steps(["Identify event", "Profile management", "Pre-IPO valuation", "Consent handoff"], 1)}
          <div class="grid-4" style="margin-top:12px">
            ${stat("Stage", c.stage, c.jurisdiction, "blue")}
            ${stat("Founder beneficial", "≈84.3%", "31.01% direct + vehicle (public records)", "amber")}
            ${stat("Estimated wealth", c.estimatedWealth, "Media estimate", "")}
            ${stat("PB opportunity", "Founder + family", "Credit / trust / Access", "green")}
          </div>
          <div class="grid-2" style="margin-top:12px">
            ${card("Cap table", "Shares, votes and notes; do not collapse economic and voting rights.", table(["Holder", "Shares", "Votes", "Notes"], c.capTable.map(x => [`<b>${x.holder}</b>`, x.shares, x.votes, x.notes]), { compact: true }))}
            ${card("Restrictions & complexity", "Legal / cross-border / wealth-event constraints.", `<div class="list">${c.restrictions.map(x => `<div class="list-row"><span class="badge amber">!</span><span>${esc(x)}</span></div>`).join("")}<div class="list-row"><span class="badge red">!</span><span>${esc(c.crossBorder)}</span></div></div><div class="note" style="margin-top:8px"><b>Wealth event:</b> ${esc(c.wealthEvent)}</div>`)}
          </div>
          ${card("PB opportunity and tasks", "What PB needs before it can serve the founder and family.", table(["Task", "Owner", "Status"], c.tasks.map(t => [t.task, t.owner, badge(t.status, statusTone(t.status))]), { compact: true }), primary("Start consent workflow", "Consent workflow started (demo)"))}
          ${sourceNote("Company facts are public/illustrative. MNPI and deal information must remain inside the wall.")}`;
      }
    },

    "ipo-valuation": {
      section: "IPO & PB",
      title: "Pre-IPO Valuation",
      sub: "Method, inputs, discounts, range and committee decision.",
      render: () => {
        const v = WB.ipo.valuation;
        return pageHead("1 · IPO & PB", "Pre-IPO Valuation", "A valuation is not a price target. It is a governed range with method, inputs, discounts and committee evidence.") + `
          ${steps(["Identify event", "Profile management", "Pre-IPO valuation", "Consent handoff"], 2)}
          <div class="grid-4" style="margin-top:12px">
            ${stat("Latest round", v.latestRound, "Primary input", "")}
            ${stat("Valuation range", v.range, "After 30/10/10 discounts", "green")}
            ${stat("Lendable guide", v.lendableHint, "10–30% LTV · rules in demo m4-valuation", "blue")}
            ${stat("Committee", v.committee, "Pending · next review 90 days", "amber")}
          </div>
          ${card("Methods and weights", "Use more than one method; preserve inputs and weights.", table(["Method", "Weight", "Input", "Value", "Note"], v.methods.map(x => [`<b>${x.method}</b>`, x.weight + "%", x.input, x.value, x.note]), { compact: true }))}
          ${card("Discounts", "Each discount needs a rationale and evidence; control premium is not a discount and is excluded.", table(["Item", "Value", "Rationale"], v.discounts.map(x => [`<b>${x.item}</b>`, x.value, x.rationale]), { compact: true }) + `<div class="note" style="margin-top:8px"><b>Range basis:</b> ${esc(v.rangeBasis)}</div>`)}
          ${card("Committee evidence", "No approval, no lending value.", `<div class="list">${v.evidence.map(x => `<div class="list-row"><span class="badge green">✓</span><span>${esc(x)}</span></div>`).join("")}</div><div class="actions" style="margin-top:10px">${primary("Submit to committee", "Valuation submitted (demo)")}${btn("Save draft")}</div>`)}
          ${sourceNote("Valuation is illustrative; real work requires independent valuation, legal/tax review and committee approval.")}`;
      }
    },

    "ipo-handoff": {
      section: "IPO & PB",
      title: "CIB → PB Handoff",
      sub: "Consent, wall clearance, KYC, family discovery and service activation.",
      render: () => pageHead("1 · IPO & PB", "CIB → PB Handoff", "A consent-based handoff, not a data transfer. CIB introduces; PB independently onboards; compliance clears the wall.") + `
        ${steps(["Identify event", "Profile management", "Pre-IPO valuation", "Consent handoff"], 3)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("Consent", "Pending", "Client must opt in", "amber")}
          ${stat("Wall clearance", "Pending", "No MNPI transfer", "amber")}
          ${stat("KYC reuse", "Possible", "Within policy", "blue")}
          ${stat("PB services", "6", "Credit / trust / Access / family", "")}
        </div>
        ${card("Handoff tasks", "Every step has an owner, status and evidence.", table(["Step", "Owner", "Status", "Evidence"], WB.ipo.handoff.map(x => [`<b>${x.step}</b>`, x.owner, badge(x.status, statusTone(x.status)), x.evidence]), { compact: true }), primary("Request consent", "Consent request sent (demo)"))}
        ${card("Consent & wall record", "Consent and Chinese-wall clearance are recorded artefacts, not a conversation.", table(["Item", "Value", "Note"], WB.ipo.consentRecord.map(x => [`<b>${x.item}</b>`, x.value, x.note]), { compact: true }))}
        ${card("What PB can offer after onboarding", "Service menu, subject to suitability and jurisdiction.", `<div class="grid-3">${["Pre-IPO / private asset valuation", "Lombard / private share pledge", "Trust / estate / family governance", "Next-gen / MIT / Athens", "HSBC Access / Innovation Banking", "Tax data pack / adviser coordination"].map(x => `<div class="mini-card">${esc(x)}</div>`).join("")}</div>`)}
        ${sourceNote("Do not transfer CIB deal information to PB. Consent and wall clearance are prerequisites.")}`
    },

    /* ── ESTATE ── */
    "estate-portfolio": {
      section: "Estate & Continuity",
      title: "Estate Case Portfolio",
      sub: "Death, probate, distribution, legal cost and family outcome.",
      render: () => pageHead("2 · Estate & Continuity", "Estate Case Portfolio", "Every death case has a clock, an estate value, a distribution status and a family outcome. The portfolio is the source for 12-month analytics.") + `
        ${steps(["Portfolio", "Case timeline", "Authority", "12-month outcome"], 0)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("Cases", WB.estate.cases.length, "3 open · 1 closed (public)", "amber")}
          ${stat("Median first payment", "15 days", "2026 cohort", "green")}
          ${stat("12-month distribution", "72%", "2026 cohort", "")}
          ${stat("Cross-border gap", "38 days", "First payment", "red")}
        </div>
        ${card("Estate cases", "Public cases are used structurally; account-level rows are fictional. One public case (Mui estate) closed in 2026 and is shown as a completed case.", table(["Case", "Deceased", "Death date", "Days since death", "Probate → release (days)", "Estate value", "Distributed", "Legal cost", "Status", "Beneficiaries"], WB.estate.cases.map(c => [`<span class="mono">${c.id}</span>`, `<b>${c.deceased}</b><div class="tiny">${c.source}</div>`, c.deathDate, typeof c.daysSinceDeath === "number" ? String(c.daysSinceDeath) : "—", typeof c.probReleaseDays === "number" ? String(c.probReleaseDays) : "—", c.estateValue, c.distributed, c.legalCost, badge(c.status, statusTone(c.status)), c.beneficiaries]), { compact: true }), `<a class="btn primary" href="#/estate-case">Open He case timeline →</a>`)}
        ${sourceNote("Real case tracking requires consent, data minimization and jurisdiction-specific privacy review.")}`
    },

    "estate-case": {
      section: "Estate & Continuity",
      title: "Estate Case Timeline",
      sub: "Death to distribution: POA end, executor, probate, estate account, trust.",
      render: () => pageHead("2 · Estate & Continuity", "Estate Case Timeline", "The case is a sequence of legal events, not a single task. The timeline makes the lawful order visible.") + `
        ${steps(["Portfolio", "Case timeline", "Authority", "12-month outcome"], 1)}
        ${card("Case: He family (illustrative)", "Death 2026-01-15; estate US$30m; executor = spouse; HK/SG/UK assets.", table(["Day", "Event", "Authority", "Action", "Evidence"], WB.estate.timeline.map(x => [`<b>${x.day}</b>`, x.event, x.authority, x.action, x.evidence]), { compact: true }))}
        <div class="grid-3" style="margin-top:12px">
          ${stat("Estate assets", "US$30.0m", "HK / SG / UK", "")}
          ${stat("Distributed", "US$8.0m", "27% at 9 months", "amber")}
          ${stat("Legal cost", "US$320k", "1.1% of estate", "red")}
        </div>
        ${sourceNote("Timeline is illustrative; real cases depend on will, grant, cross-border reseal and family dynamics.")}`
    },

    "estate-authority": {
      section: "Estate & Continuity",
      title: "Authority & Probate",
      sub: "Who can act, under what instrument, in which jurisdiction.",
      render: () => pageHead("2 · Estate & Continuity", "Authority & Probate", "The bank cannot treat family consensus as authority. This page separates executor, trustee, attorney and beneficiary.") + `
        ${steps(["Portfolio", "Case timeline", "Authority", "12-month outcome"], 2)}
        ${card("Authority matrix", "Scope, status and what each role cannot do.", table(["Role", "Instrument", "Scope", "Status", "Can pay", "Cannot"], WB.estate.authority.map(x => [`<b>${x.role}</b>`, x.instrument, x.scope, badge(x.status, statusTone(x.status)), x.canPay, x.cannot]), { compact: true }))}
        <div class="grid-2" style="margin-top:12px">
          ${card("Probate / estate checklist", "Grant before full asset release; limited urgent payments may be allowed.", `<div class="list">${["Death certificate", "Will / intestacy review", "Executor ID / KYC", "Grant of probate / letters", "Estate account", "Asset / liability map", "Tax / debt / distribution"].map(x => `<div class="list-row"><span class="badge blue">□</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
          ${card("Negative rules", "What the bank must not do.", `<div class="list">${["Do not keep POA active after death", "Do not treat trust assets as estate assets", "Do not disclose to unauthorized family", "Do not promise a fixed payout date", "Do not bypass probate or court orders"].map(x => `<div class="list-row"><span class="badge red">✕</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
        </div>
        ${sourceNote("Authority matrix is illustrative; verify instruments per jurisdiction (POA ends at death in HK/UK rules; trust vs estate separation is jurisdiction-specific). Real cases require legal sign-off.")}`
    },

    "estate-outcomes": {
      section: "Estate & Continuity",
      title: "12-Month Outcomes",
      sub: "What happened to the family and the money after death.",
      render: () => pageHead("2 · Estate & Continuity", "12-Month Outcomes", "The question is not only 'was the estate closed?' It is 'did the family get the money, at what cost, and did they stay?'") + `
        ${steps(["Portfolio", "Case timeline", "Authority", "12-month outcome"], 3)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("First payment", "15 days", "2026 cohort", "green")}
          ${stat("12-month distribution", "72%", "2026 cohort", "")}
          ${stat("Legal cost", "2.1%", "Of estate", "amber")}
          ${stat("Retention", "84%", "Family retained", "green")}
        </div>
        ${card("Cohort outcomes", "Cohorts make the use case measurable.", table(["Cohort", "Cases", "First payment (days)", "12-month distribution", "Legal cost %", "Retention", "NPS"], WB.estate.outcomes.map(x => [`<b>${x.cohort}</b>`, x.cases, x.firstPaymentDays, x.distribution12m + "%", x.legalCostPct + "%", x.retention + "%", x.nps]), { compact: true }))}
        ${card("What to measure next", "Data that would prove the pain and the solution.", `<div class="grid-2">${["Time to authority verification", "Time to first lawful payment", "Estate closure time", "Distribution rate at 12 months", "Legal / professional cost", "Beneficiary retention and NPS", "Cross-border vs domestic gap", "Complaints / court disputes"].map(x => `<div class="mini-card">${esc(x)}</div>`).join("")}</div>`)}
        ${sourceNote("Outcome tracking requires beneficiary consent and privacy review. Never use estate data for marketing.")}`
    },

    /* ── ONBOARDING ── */
    "onboarding-family": {
      section: "Family Onboarding",
      title: "Family Onboarding",
      sub: "People, roles, consent, goals and permissions before product.",
      render: () => pageHead("3 · Family Onboarding", "Family Onboarding", "Start with the family, not the product. Who is the client, who is the spouse, who is the next generation, and who has consented to what.") + `
        ${steps(["Family", "Suitability", "Template", "First investment"], 0)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("Families in onboarding", WB.onboarding.families.length, "Public + illustrative", "blue")}
          ${stat("Templates", WB.onboarding.templates.length, "From liquidity to growth", "")}
          ${stat("First investments", "2", "Ready / pending", "green")}
          ${stat("Consent gaps", "4", "Spouse / next gen", "amber")}
        </div>
        ${card("Families", "A family is a graph, not one client ID.", table(["ID", "Family / person", "Type", "Members", "Goal", "Consent", "Risk", "Template", "Status"], WB.onboarding.families.map(f => [`<span class="mono">${f.id}</span>`, `<b>${f.name}</b>`, f.type, f.members, f.goal, f.consent, f.risk, f.template, badge(f.status, statusTone(f.status))]), { compact: true }))}
        ${card("Permission model", "Spouse/next-gen rights are explicit, not assumed.", table(["Role", "Can view", "Can invest", "Can receive", "Consent"], [["Primary client", "Own + family (consented)", "Yes", "Yes", "Self"], ["Spouse", "Own + joint", "Own / joint", "Yes", "Self"], ["Adult child", "Own only", "Own", "Own", "Self"], ["Minor child", "Guardian view", "No", "Trust / guardian", "Guardian + trust"], ["Attorney / deputy", "Scoped", "Scoped", "No", "Legal instrument"]]))}
        ${sourceNote("Family permissions require legal authority and individual consent; a parent cannot consent for an adult child.")}`
    },

    "onboarding-suitability": {
      section: "Family Onboarding",
      title: "Suitability & Risk",
      sub: "Objective, tolerance, capacity, knowledge, liquidity, restrictions.",
      render: () => pageHead("3 · Family Onboarding", "Suitability & Risk", "A template is not a suitability assessment. Every client needs objective, tolerance, capacity, knowledge, horizon and restrictions.") + `
        ${steps(["Family", "Suitability", "Template", "First investment"], 1)}
        ${card("Suitability file", "UK creator family (demo); creator-economy household.", table(["Field", "Value", "Status"], WB.onboarding.suitability.fields.map(f => [`<b>${f.field}</b>`, f.value, badge(f.status, statusTone(f.status))]), { compact: true }))}
        <div class="grid-2" style="margin-top:12px">
          ${card("Outcome", "Suitability decision and limits.", `<div class="prose"><p>${esc(WB.onboarding.suitability.outcome)}</p></div><div class="actions" style="margin-top:10px">${primary("Approve suitability", "Suitability approved (demo)")}${btn("Request education")}</div>`)}
          ${card("Negative rules", "What the template cannot override.", `<div class="list">${["No leverage without separate approval", "No private markets for limited-knowledge clients", "No concentration above policy", "No recommendation without documented suitability", "No minor account without guardian / trust"].map(x => `<div class="list-row"><span class="badge red">✕</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
        </div>
        ${sourceNote("Suitability file is a fictional demo household. Real assessment follows the booking entity's suitability policy and record-keeping rules.")}`
    },

    "onboarding-templates": {
      section: "Family Onboarding",
      title: "Portfolio Templates",
      sub: "Low-friction starting points, not a substitute for advice.",
      render: () => pageHead("3 · Family Onboarding", "Portfolio Templates", "Templates give a new client, spouse or next-generation member a clear starting point with known risk, fee, minimum and liquidity.") + `
        ${steps(["Family", "Suitability", "Template", "First investment"], 2)}
        ${card("Template library", "Choose by objective and risk, not by product push.", table(["ID", "Template", "Risk", "Horizon", "Target", "Minimum", "Fee", "Liquidity"], WB.onboarding.templates.map(t => [`<span class="mono">${t.id}</span>`, `<b>${t.name}</b>`, badge(t.risk, /high/i.test(t.risk) ? "red" : /medium/i.test(t.risk) ? "amber" : "green"), t.horizon, t.target, t.min, t.fee, t.liquidity]), { compact: true }))}
        <div class="grid-3" style="margin-top:12px">
          ${stat("Best for first investment", "Income / Balanced", "Education → first ticket", "green")}
          ${stat("Minimum ticket", "GBP 25k", "Liquidity template", "")}
          ${stat("Fee range", "0.20%–0.80%", "Template-dependent", "amber")}
        </div>
        ${sourceNote("Fees and minimums are illustrative; actual terms depend on entity, jurisdiction and client agreement.")}`
    },

    "onboarding-first": {
      section: "Family Onboarding",
      title: "First Investment",
      sub: "Small ticket, clear suitability, client confirmation, post-trade review.",
      render: () => pageHead("3 · Family Onboarding", "First Investment", "The goal is not to sell a product; it is to create a safe, understood first experience that leads to a long-term relationship.") + `
        ${steps(["Family", "Suitability", "Template", "First investment"], 3)}
        <div class="grid-4" style="margin-top:12px">
          ${stat("Client", WB.onboarding.first.client, "Illustrative", "")}
          ${stat("Amount", WB.onboarding.first.amount, "First ticket", "green")}
          ${stat("Template", WB.onboarding.first.template, "Income & education", "")}
          ${stat("Date", WB.onboarding.first.date, "Target", "blue")}
        </div>
        ${card("First investment checklist", "Every step has an owner and evidence.", table(["Step", "Status", "Evidence"], WB.onboarding.first.steps.map(s => [`<b>${s.step}</b>`, badge(s.status, statusTone(s.status)), s.evidence]), { compact: true }), primary("Confirm first investment", "First investment confirmed (demo)"))}
        <div class="grid-2" style="margin-top:12px">
          ${card("Education", "Before the first trade.", `<div class="list">${["Risk and return", "Fees and costs", "Liquidity and access", "Diversification", "Tax basics / adviser referral"].map(x => `<div class="list-row"><span class="badge green">✓</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
          ${card("After the trade", "Trust is built after execution.", `<div class="list">${["Confirmation / statement", "Post-trade review", "Next goal / review date", "Feedback / NPS", "Escalation if anything fails"].map(x => `<div class="list-row"><span class="badge blue">→</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
        </div>
        ${sourceNote("First-investment flow is illustrative: statuses are demo states; e-sign and booking are not implemented in this prototype.")}`
    },

    /* ── REVENUE ── */
    "revenue-cockpit": {
      section: "Revenue & Margin",
      title: "PB Operating Dashboard",
      sub: "AUM, revenue, client commission, margin, cost/income and RM capacity.",
      render: () => {
        const r = WB.revenue.summary;
        return pageHead("4 · Revenue & Margin", "PB Operating Dashboard", "AUM is not revenue. Revenue is not margin. One operating view from AUM to revenue, client commission, gross margin, net margin and RM capacity.") + `
        <div class="grid-4">
          ${stat("AUM", money(r.aum), "64-RM demo book", "")}
          ${stat("Revenue", money(r.revenue), "Annualised", "")}
          ${stat("Client commission", money(r.clientCommission), pct(r.clientCommission / r.revenue * 100) + " of revenue", "blue")}
          ${stat("Cost / income", pct(r.costIncome), "(revenue − net margin) ÷ revenue", "amber")}
        </div>
        <div class="grid-4" style="margin-top:12px">
          ${stat("Gross margin", money(r.grossMargin), pct(r.grossMargin / r.revenue * 100) + " after direct cost", "green")}
          ${stat("Net margin", money(r.netMargin), pct(r.netMargin / r.revenue * 100) + " after funding / allocated cost", "green")}
          ${stat("Revenue yield", pct(r.revenue / r.aum * 100, 2), "Revenue ÷ AUM", "")}
          ${stat("Gross margin yield", pct(r.grossMargin / r.aum * 100, 2), "Gross margin ÷ AUM", "green")}
        </div>
        ${card("Operating formulas", "Every headline number is traceable to a formula.", table(["Line", "Formula", "Value"], [
          ["AUM", "Client assets / 64 RMs", money(r.aum)],
          ["Revenue", "Advisory + client commission + lending + FX + custody + trust", money(r.revenue)],
          ["Client commission", "Brokerage / execution", money(r.clientCommission) + " · " + pct(r.clientCommission / r.revenue * 100) + " of revenue"],
          ["Gross margin", "Revenue − direct cost-to-serve", money(r.grossMargin) + " · " + pct(r.grossMargin / r.revenue * 100)],
          ["Net margin", "Gross margin − funding & risk − allocated cost", money(r.netMargin) + " · " + pct(r.netMargin / r.revenue * 100)],
          ["Cost / income", "(Revenue − net margin) ÷ revenue", pct(r.costIncome)],
          ["Revenue yield", "Revenue ÷ AUM", pct(r.revenue / r.aum * 100, 2)],
          ["Gross margin yield", "Gross margin ÷ AUM", pct(r.grossMargin / r.aum * 100, 2)]
        ], { compact: true }))}
        <div class="grid-2" style="margin-top:12px">
          ${card("Revenue lines", "Client commission is one line, not the whole revenue pool.", table(["Line", "Revenue"], WB.revenue.revenueLines.map(l => [`<b>${esc(l.line)}</b>`, money(l.amount)]), { compact: true }))}
          ${card("Monthly revenue / margin", "Revenue, gross margin and net margin in USD millions.", table(["Month", "Revenue", "Gross margin", "Net margin"], WB.revenue.monthly.map(x => [x.month, money(x.revenue * 1e6), money(x.grossMargin * 1e6), money(x.netMargin * 1e6)]), { compact: true }))}
        </div>
        ${card("Client economics", "Top clients; gross margin and wallet share.", table(["Client", "Revenue", "Cost", "Gross margin", "Wallet"], WB.revenue.clients.map(c => [`<b>${esc(c.client)}</b><div class="tiny">${c.segment}</div>`, money(c.revenue), money(c.cost), money(c.grossMargin), pct(c.wallet)]), { compact: true }))}
        ${sourceNote("AUM, revenue, client commission and costs are demo. Real dashboard requires Finance, Treasury, Product Control and transfer pricing sign-off.")}`;
      }
    },

    "revenue-client": {
      section: "Revenue & Margin",
      title: "Client P&L",
      sub: "One client, all revenue and cost lines.",
      render: () => pageHead("4 · Revenue & Margin", "Client P&L", "The client view is the bridge between RM relationship and finance margin.") + `
        ${card("Client P&L", "He family (demo) — coherent with the client-economics table; numbers are demo.", table(["Line", "Amount", "Note"], [["Advisory / managed revenue", money(1650000), "Recurring"], ["Lending / Lombard", money(900000), "Spread / fees"], ["FX / treasury", money(300000), "Spread"], ["Trust / family office", money(750000), "TFS / advisory"], ["Direct cost", money(-1420000), "RM / ops / legal / tech"], ["Gross margin", money(2180000), "Before allocation"], ["Allocated cost", money(-1050000), "Capital / overhead"], ["Net margin", money(1130000), "Client contribution"]], { compact: true }))}
        <div class="grid-3" style="margin-top:12px">
          ${stat("Revenue", money(3600000), "All lines sum", "")}
          ${stat("Gross margin", pct(2180000 / 3600000 * 100), "After direct cost", "green")}
          ${stat("Wallet share", pct(34), "Of family wallet", "amber")}
        </div>
        ${sourceNote("Client P&L is a fictional demo family; USD labels are demo. A real P&L requires revenue-line mapping, funding cost and transfer pricing signed off by Finance.")}`
    },

    "revenue-product": {
      section: "Revenue & Margin",
      title: "Product P&L",
      sub: "Which products create margin, which create cost.",
      render: () => pageHead("4 · Revenue & Margin", "Product P&L", "Product revenue without cost is not a business case.") + `
        ${card("Product economics", "Revenue, cost and margin by product line.", table(["Product", "Revenue", "Cost", "Margin", "Margin %"], WB.revenue.products.map(p => [`<b>${p.product}</b>`, money(p.revenue), money(p.cost), money(p.margin), pct(p.marginPct)]), { compact: true }))}
        ${sourceNote("Product margins are illustrative; real allocation requires finance and product control.")}`
    },

    "revenue-rm": {
      section: "Revenue & Margin",
      title: "RM Scorecard",
      sub: "Revenue, margin, clients, failed trades and trust.",
      render: () => pageHead("4 · Revenue & Margin", "RM Scorecard", "RM incentives should reward sustainable margin and trust, not just revenue or trade count.") + `
        ${card("RM scorecard", "Relationships, households, AUM, revenue, margin, failed trades and NPS.", table(["RM", "Relationships", "Households", "AUM", "Revenue", "Gross margin", "Net margin", "Failed trades", "NPS"], WB.revenue.rms.map(r => [`<b>${r.rm}</b>`, r.relationships, r.households, money(r.aum), money(r.revenue), money(r.grossMargin), money(r.netMargin), pct(r.failedTrades), r.nps]), { compact: true }))}
        ${card("Capacity & service intensity", "The missing three fields: support ratio, segment mix and service intensity.", table(["RM", "Support FTE / RM", "Segment mix (UHNW/HNW/FO)", "Meetings / relationship", "Trades / relationship", "Trust / estate cases", "Credit facilities", "Workload index", "Capacity"], WB.revenue.rms.map(r => {
          const idx = capacityIndex(r);
          return [`<b>${r.rm}</b>`, r.support_ratio.toFixed(1), `${r.segment_mix.uhnw}% / ${r.segment_mix.hnw}% / ${r.segment_mix.familyOffice}%`, r.service_intensity.meetingsPerYear, r.service_intensity.tradesPerYear, r.service_intensity.trustCases, r.service_intensity.creditFacilities, idx.toFixed(1), badge(capacityLabel(idx), capacityLabel(idx) === "Overloaded" ? "red" : capacityLabel(idx) === "Watch" ? "amber" : capacityLabel(idx) === "Balanced" ? "green" : "blue")];
        }), { compact: true }))}
        <div class="note"><b>Workload index (illustrative):</b> relationships × (0.30 + meetings/20 + trades/50 + trust cases/30 + credit facilities/40) ÷ support FTE. Thresholds: under 45 underloaded, 45–65 balanced, 65–85 watch, above 85 overloaded. This is a calibration model, not an HR policy; it should be replaced by a time-study baseline.</div>
        <div class="grid-3" style="margin-top:12px">
          ${stat("Top RM", "Alex Chan", "Margin + NPS", "green")}
          ${stat("Watchlist", "James Wong", "Failed trades 2.1%", "red")}
          ${stat("KPI principle", "Risk-adjusted", "Revenue × trust × cost", "blue")}
        </div>
        <div class="note"><b>Capacity benchmark:</b> private-banking relationship managers typically serve about 50–70 clients (Accenture, 2025), while Goldman Sachs PWM cites a 1:25 advisor-to-client ratio. Asian Private Banker (2025) reports average AUM per RM of about US$473m. The demo book (35–51 relationships, 14–24 households, US$420–620m AUM) is therefore plausible for a mixed HNW/UHNW book, but the actual number must be set by segment, team model and service intensity.</div>
        ${sourceNote("Scorecard shows 4 illustrative RMs of a 64-RM demo book; revenue, margin and workload numbers are demo and require HR/Finance calibration.")}`
    },

    /* ── ORDERS ── */
    "order-monitor": {
      section: "Order Trust",
      title: "Order Monitor",
      sub: "Live orders, failed %, reasons, market and system status.",
      render: () => pageHead("5 · Order Trust", "Order Monitor", "A failed order is a client-trust event, not just an operations ticket.") + `
        <div class="grid-4">
          ${stat("Orders today", WB.orders.summary.ordersToday, "Across markets", "")}
          ${stat("Failed trade %", pct(WB.orders.summary.failedPct), "Target <3%", "red")}
          ${stat("First-time fill", pct(WB.orders.summary.firstTimeFill), "Target >95%", "amber")}
          ${stat("Client-impacted", WB.orders.summary.clientImpact, "Failures", "red")}
        </div>
        ${card("Order blotter", "Venue-local times; amounts in the order's currency. Demo session.", table(["Order", "Client", "RM", "Market", "Symbol", "Side", "Amount", "Status", "Reason", "Attribution"], WB.orders.orders.map(o => [`<span class="mono">${o.id}</span>`, o.client, o.rm, o.market, o.symbol, o.side, money(o.amount, o.ccy), badge(o.status, statusTone(o.status)), o.reason, o.cause]), { compact: true }), primary("Open failure", "Failure detail opened (demo)"))}
        ${card("Failure reasons", `Pareto of failure causes — ${WB.orders.reasonPeriod.toLowerCase()}; the blotter shows today's session only (7 of 128 today).`, table(["Reason", "Count", "Share", "Controllable", "Owner"], WB.orders.reasons.map(r => [`<b>${r.reason}</b>`, r.count, pct(r.pct), r.controllable, r.owner]), { compact: true }))}
        ${sourceNote("Blotter and reason pareto are demo. Client rows use fictional demo families; named public persons never appear in account-level rows. Real deployment needs order events, market calendars and reason codes from the execution stack.")}`
    },

    "order-failure": {
      section: "Order Trust",
      title: "Failure Detail",
      sub: "What failed, why, who is impacted, what happens next.",
      render: () => pageHead("5 · Order Trust", "Failure Detail", "The RM needs a clear explanation and a recovery path; the client needs honesty and a next step.") + `
        ${card("ORD-1002 · UK creator family (demo)", "Market closed — submitted 16:44 London time, after close; order not executed.", `<div class="grid-3">${stat("Client", "UK creator family (demo)", "HNW / UK · VOD.L GBP 45.0k", "")}${stat("RM", "Priya Nair", "Owns communication", "")}${stat("Impact", "Client informed", "Rebook next session", "amber")}</div><div class="note" style="margin-top:8px"><b>Root cause:</b> no market-hours/calendar check at order entry; the order was submitted after the London close. <b>Control:</b> pre-trade market-session check. <b>Recovery:</b> rebook at next open; confirm with client; log evidence.</div>`)}
        ${card("Attribution", "One primary cause, contributing cause, owner and evidence — not a single reason code.", table(["Order", "Primary cause", "Contributing cause", "Owner", "IT?", "Evidence"], [
          ["ORD-1002", "Market / calendar", "Market-hours check missed at order entry", "Operations / RM", "No", "Order event + market calendar"],
          ["ORD-1008", "IT / system", "Order-router timeout", "Technology", "Yes", "Incident ID + order event"]
        ], { compact: true }))}
        ${card("RM knowledge card", "What the RM should be able to explain and carry into the next conversation.", table(["Question", "Answer"], [
          ["What happened", "Order submitted after the London close; not executed"],
          ["Why", "Market-hours check was missed; not an IT failure"],
          ["What to check next time", "Market session, holiday calendar and cut-off before entry"],
          ["What to tell the client", "Cause, impact, next session, what the bank changed"]
        ], { compact: true }))}
        ${card("Recovery queue", "Owner, action, SLA and status.", table(["Order", "Client", "Issue", "Action", "Owner", "Status", "SLA"], WB.orders.recovery.map(r => [`<span class="mono">${r.order}</span>`, r.client, r.issue, r.action, r.owner, badge(r.status, statusTone(r.status)), r.sla]), { compact: true }), primary("Send client update", "Client update sent (demo)"))}
        ${sourceNote("ORD-1002 and ORD-1008 are demo cases. Attribution separates market/process failures from IT/system failures and records the knowledge the RM should carry forward.")}`
    },

    "order-recovery": {
      section: "Order Trust",
      title: "Recovery Workflow",
      sub: "Communicate, rebook, compensate, root-cause, evidence.",
      render: () => pageHead("5 · Order Trust", "Recovery Workflow", "A failed trade becomes a trust event if the client is not told quickly and given a next step.") + `
        ${steps(["Detect", "Explain", "Rebook", "Compensate", "Root cause"], 2)}
        ${card("Recovery steps", "What the RM and operations must do.", table(["Step", "Owner", "Action", "Evidence"], [["Detect", "Operations", "Flag failed order; classify reason", "Order event"], ["Explain", "RM", "Call client; explain reason and next step", "Call note"], ["Rebook", "RM / Trading", "Re-enter or alternate venue", "New order"], ["Compensate", "Service", "Fee waiver / gesture if appropriate", "Approval"], ["Root cause", "COO", "Fix calendar/system/process", "Incident / change"]], { compact: true }), primary("Mark recovered", "Recovery recorded (demo)"))}
        <div class="grid-3" style="margin-top:12px">
          ${stat("Recovery time", "42 min", "Average", "amber")}
          ${stat("Client informed", "4 / 4", "Same day", "green")}
          ${stat("Repeat failures", "1", "Same reason", "red")}
        </div>
        ${sourceNote("Recovery steps and SLAs are demo targets; real SLAs must follow the bank's client-service standards and incidents policy.")}`
    },

    "order-kpi": {
      section: "Order Trust",
      title: "Failure Attribution & Learning",
      sub: "Attribution, IT/system flags, learning loop, failed %, recovery and trust.",
      render: () => pageHead("5 · Order Trust", "Failure Attribution & Learning", "Every failed trade gets a primary cause, contributing cause, owner and evidence; IT/system is explicit; the RM turns the cause into knowledge.") + `
        ${card("Attribution taxonomy", "One primary cause per failure; IT/system is tagged separately and excluded from RM blame.", table(["Cause", "Count", "Share", "Owner", "IT?", "Learning"], WB.orders.attribution.map(r => [`<b>${r.cause}</b>`, r.count, pct(r.pct), r.owner, r.it ? "Yes" : "No", r.learning]), { compact: true }))}
        ${card("KPI dashboard", "Targets and ownership.", table(["Metric", "Value", "Target", "Trend", "Owner"], WB.orders.kpis.map(k => [`<b>${k.metric}</b>`, k.value, k.target, k.trend, k.owner]), { compact: true }))}
        <div class="grid-2" style="margin-top:12px">
          ${card("What to instrument", "Data needed to prove the problem and the fix.", `<div class="list">${["Order event: created, validated, sent, acknowledged, filled, failed", "Primary cause / contributing cause", "Reason code and free-text", "Market calendar / trading session", "IT incident ID / latency / order-router log", "Client communication and compensation", "TCA / slippage", "RM knowledge card / training record", "Client NPS / trust survey"].map(x => `<div class="list-row"><span class="badge blue">•</span><span>${esc(x)}</span></div>`).join("")}</div>`)}
          ${card("Learning loop", "Cause → knowledge card → pre-trade check → client conversation → training.", `<div class="prose"><p>Every failure produces a knowledge card owned by the RM and reviewed with the desk. IT/system failures go to Technology with an incident ID; they are reported but not counted against the RM.</p><p>The RM scorecard uses controllable failures and recovery quality, not raw failures. Client trust is measured by explanation quality, recovery speed and whether the client would recommend the bank after the failure.</p></div>`)}
        </div>
        ${sourceNote("Attribution counts, KPI values and thresholds are demo. Real deployment needs order events, market calendars, incident IDs and a reviewed knowledge-card process.")}`
    }
  };

  const SECTIONS = [
    { name: "Overview", pages: [["overview", "Operating Workbench"]] },
    { name: "1 · IPO & PB", pages: [["ipo-pipeline", "IPO & Wealth Event Pipeline"], ["ipo-company", "Company & Management"], ["ipo-valuation", "Pre-IPO Valuation"], ["ipo-handoff", "CIB → PB Handoff"]] },
    { name: "2 · Estate & Continuity", pages: [["estate-portfolio", "Estate Case Portfolio"], ["estate-case", "Estate Case Timeline"], ["estate-authority", "Authority & Probate"], ["estate-outcomes", "12-Month Outcomes"]] },
    { name: "3 · Family Onboarding", pages: [["onboarding-family", "Family Onboarding"], ["onboarding-suitability", "Suitability & Risk"], ["onboarding-templates", "Portfolio Templates"], ["onboarding-first", "First Investment"]] },
    { name: "4 · Revenue & Margin", pages: [["revenue-cockpit", "PB Operating Dashboard"], ["revenue-client", "Client P&L"], ["revenue-product", "Product P&L"], ["revenue-rm", "RM Scorecard"]] },
    { name: "5 · Order Trust", pages: [["order-monitor", "Order Monitor"], ["order-failure", "Failure Detail"], ["order-recovery", "Recovery Workflow"], ["order-kpi", "Failure Attribution & Learning"]] }
  ];

  const route = () => (location.hash.replace(/^#\/?/, "") || "overview").split("?")[0];
  const page = () => PAGES[route()] || PAGES.overview;

  const nav = () => SECTIONS.map(s => `<div class="nav-section"><div class="nav-title">${esc(s.name)}</div>${s.pages.map(([id, name]) => `<a class="nav-link ${route() === id ? "active" : ""}" href="#/${id}">${esc(name)}</a>`).join("")}</div>`).join("");

  const render = () => {
    const p = page();
    $("#nav").innerHTML = nav();
    $("#main").innerHTML = p.render();
    document.title = `${p.title} · HSBC PB Workbench`;
    window.scrollTo(0, 0);
  };

  const openNotes = () => {
    const id = route();
    const s = (typeof SCRIPTS !== "undefined" && SCRIPTS[id]) ? SCRIPTS[id] : null;
    if (!s) return;
    $("#notes-title").textContent = s.title;
    $("#notes-body").innerHTML = `<div class="notes-grid">
      <div class="notes-block"><h3>中文台词</h3><p>${esc(s.cn)}</p></div>
      <div class="notes-block"><h3>English script</h3><p>${esc(s.en)}</p></div>
    </div>
    <div class="notes-meta"><h3>On screen / 屏幕动作</h3><p>${esc(s.screen)}</p></div>
    <div class="notes-meta"><h3>Transition / 转场</h3><p>${esc(s.transition)}</p></div>`;
    $("#notes").classList.add("open");
    $("#notes").setAttribute("aria-hidden", "false");
  };

  const closeNotes = () => {
    $("#notes").classList.remove("open");
    $("#notes").setAttribute("aria-hidden", "true");
  };

  const RECORD = new URLSearchParams(location.search).get("record") === "1";
  if (RECORD) document.body.classList.add("record");

  window.addEventListener("hashchange", () => { closeNotes(); render(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNotes(); });
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-notes]")) { e.preventDefault(); openNotes(); return; }
    if (e.target.closest("[data-notes-close]")) { e.preventDefault(); closeNotes(); return; }
    if (RECORD && e.target.closest("[data-toast]")) { e.preventDefault(); return; } /* recording mode: no demo toasts */
    const t = e.target.closest("[data-toast]");
    if (t) {
      e.preventDefault();
      const el = $("#toast");
      el.textContent = t.getAttribute("data-toast");
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 2600);
    }
  });

  window.WB_PAGES = PAGES;
  window.WB_RENDER = render;
  render();
})();
