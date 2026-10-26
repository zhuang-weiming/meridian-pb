/* App shell, state, router, actions */
const DEFAULT_STATE = {
  role: "RM",
  navCollapsed: false,
  clientId: "C-1001",
  page: "m1-dashboard",
  proposal: { generated: false, selected: "P-ALADDIN", version: 3 },
  compliance: { approved: false, approvedVersion: null, esign: false, signedVersion: null },
  aladdinVariant: "aligned",
  stressScenario: "eq",
  includeCosts: true,
  decision: "adopt",
  facilityStress: "base",
  hubView: "client",
  serviceFilter: "全部",
  caseFilter: "all",
  valuationLtv: 22,
  ltvApproved: false,
  pledge: { V: 100000000, B: 1000000, t: 20, C: 25000000, i: 6.5, n: 5, r: 8, d: 0 },
  trustTab: "structure",
  m3tab: "tax",
  journeyTab: "j2",
  privateAssetTab: "intake",
  taxScenario: "A",
  taxLevers: ["L3", "L4", "L8"],
  clientTab: "proposal",
  taxSigned: false
};

const App = {
  state: null,

  load() {
    const q = new URLSearchParams(location.search);
    if (q.get("wipe") === "1") { /* recording reset: clear tab/scroll state, strip ?wipe from the URL */
      try { localStorage.removeItem("hsbc_pb_demo_v1"); } catch (e) {}
      this.state = Object.assign({}, DEFAULT_STATE);
      q.delete("wipe");
      const qs = q.toString();
      try { history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash); } catch (e) {}
    } else {
      try {
        const raw = localStorage.getItem("hsbc_pb_demo_v1");
        this.state = raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : Object.assign({}, DEFAULT_STATE);
      } catch (e) {
        this.state = Object.assign({}, DEFAULT_STATE);
      }
    }
    this.state.proposal = Object.assign({ generated: false, selected: "P-A", version: 3 }, this.state.proposal || {});
    this.state.compliance = Object.assign({ approved: false, approvedVersion: null, esign: false, signedVersion: null }, this.state.compliance || {});
    if (q.get("role")) this.state.role = q.get("role");
    if (q.get("client")) this.state.clientId = q.get("client");
    if (q.get("page")) this.state.page = q.get("page");
    const hp = location.hash.replace("#/", "");
    if (hp && PAGES.find(p => p.id === hp)) this.state.page = hp;
    else if (!location.hash) location.hash = "#/" + this.state.page;
    if (this.state.page.startsWith("m1") || this.state.page.startsWith("m2")) this.state.clientId = "C-1001";
    if (this.state.page === "m3-family" && !q.get("client")) this.state.clientId = "C-7701";
    if (this.state.page === "m3-financing" || this.state.page === "m3-hub") this.state.clientId = "C-7701";
    if (this.state.page === "m3-hub") this.state.serviceFilter = "全部";
  },

  save() {
    try { localStorage.setItem("hsbc_pb_demo_v1", JSON.stringify(this.state)); } catch (e) {}
  },

  client() {
    return DB.clients.find(c => c.id === this.state.clientId) || DB.clients[0];
  },

  household() {
    const c = this.client();
    return (DB.households || []).find(h => h.id === c.householdId) || null;
  },

  aladdinVariant() {
    return (DB.aladdin.variants[this.state.aladdinVariant] || DB.aladdin.variants.aligned);
  },

  aladdinStatus() {
    return this.aladdinVariant().status;
  },

  proposalBlocked() {
    return this.state.proposal.selected === "P-ALADDIN" && this.aladdinStatus() === "REJECT";
  },

  currentProposal() {
    if ((this.state.proposal.selected || "P-ALADDIN") === "P-ALADDIN") return DB.proposals.aladdinOption;
    return DB.proposals.options.find(o => o.id === (this.state.proposal.selected || "P-A")) || DB.proposals.options[0];
  },

  currentVersion() {
    return this.state.proposal.version || 3;
  },

  executionLines() {
    const p = this.currentProposal();
    if (p.id === "P-A" || p.id === "P-ALADDIN") return DB.execution;
    return p.legs.map((l, i) => ({
      no: i + 1,
      tpl: l.t,
      inst: l.i,
      isin: "—",
      act: l.a,
      qty: "—",
      amt: l.amt,
      w: l.w,
      venue: "待定",
      type: "—",
      limit: "—",
      timing: "T+1",
      cost: p.metrics.cost,
      taxLot: "—",
      funding: "HK-0091",
      status: "Draft"
    }));
  },

  isExecutionDraft() {
    const id = this.currentProposal().id;
    return id !== "P-A" && id !== "P-ALADDIN";
  },

  complianceSnapshotReady() {
    const id = this.currentProposal().id;
    return id === "P-A" || id === "P-ALADDIN";
  },

  orderReady() {
    const v = this.currentVersion();
    const c = this.state.compliance || {};
    return !!(c.approved && c.esign && c.approvedVersion === v && c.signedVersion === v && this.complianceSnapshotReady() && !this.proposalBlocked());
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
      ? `预期回报 ${(r * 100).toFixed(1)}% 高于盈亏平衡 ${(breakeven * 100).toFixed(2)}% + 3% 缓冲；且 −40% 情景仍为正。建议质押，但保留 40% 追保条款与利息覆盖检查。`
      : recommend === "Sell"
        ? `预期回报 ${(r * 100).toFixed(1)}% 未显著高于盈亏平衡 ${(breakeven * 100).toFixed(2)}%；或 −40% 情景无法补仓。建议卖出/部分卖出。`
        : `盈亏平衡 ${(breakeven * 100).toFixed(2)}%；预期回报接近阈值。建议“卖一半 + 押一半”，降低集中度与追保风险。`;
    return { sellAmt: S, tax, remain, interest, sellAt8, pledgeAt8, breakeven, sellDown, pledgeDown, downsideGap: sellDown - pledgeDown, sellSeries, pledgeSeries, recommend, rationale };
  },

  backtestSeries(withCosts = this.state.includeCosts) {
    const b = DB.backtest;
    const gross = b.points;
    if (!withCosts) return gross.slice();
    const drag = (b.costDrag || 0) / (b.periodsPerYear || 4);
    const net = [gross[0]];
    for (let i = 1; i < gross.length; i++) {
      const r = gross[i] / gross[i - 1] - 1 - drag;
      net.push(net[i - 1] * (1 + r));
    }
    return net;
  },

  backtestMetrics(points) {
    const b = DB.backtest;
    if (!points || points.length < 2) return { cagr: 0, vol: 0, sharpe: 0, dd: 0 };
    const years = b.years || 8.75;
    const rets = [];
    for (let i = 1; i < points.length; i++) rets.push(points[i] / points[i - 1] - 1);
    const mean = rets.reduce((a, x) => a + x, 0) / rets.length;
    const variance = rets.reduce((a, x) => a + (x - mean) ** 2, 0) / (rets.length - 1);
    const vol = Math.sqrt(variance) * Math.sqrt(b.periodsPerYear || 4);
    const cagr = Math.pow(points[points.length - 1] / points[0], 1 / years) - 1;
    let peak = points[0], dd = 0;
    for (const p of points) {
      peak = Math.max(peak, p);
      dd = Math.min(dd, p / peak - 1);
    }
    return {
      cagr: cagr * 100,
      vol: vol * 100,
      dd: dd * 100,
      sharpe: vol ? ((cagr - (b.rf || 0)) / vol) : 0
    };
  },

  allowed() {
    return PAGES.filter(p => p.roles.includes(this.state.role));
  },

  go(id) {
    const page = PAGES.find(p => p.id === id);
    if (!page) return;
    if (!page.roles.includes(this.state.role)) {
      UI.toast("当前角色无权访问该页面（权限矩阵）", "red");
      return;
    }
    UI.closeDrawer(); UI.closeModal();
    const leavingCase = this.state.page.startsWith("m4") || this.state.page.startsWith("m5") || this.state.page === "m3-hub" || this.state.page === "m3-financing";
    if (id.startsWith("m1") || id.startsWith("m2")) this.state.clientId = "C-1001";
    else if (id.startsWith("m4")) this.state.clientId = "C-88421";
    else if (id.startsWith("m5") || id === "m3-hub" || id === "m3-financing") this.state.clientId = "C-7701";
    else if (leavingCase && !id.startsWith("m3-family") && !id.startsWith("m3-cases") && (this.state.clientId === "C-88421" || this.state.clientId === "C-7701")) this.state.clientId = "C-1001";
    if (id === "m3-family" && this.state.clientId === "C-1001" && this.state.page !== "m3-cases") this.state.clientId = "C-7701";
    if (id === "m3-hub") this.state.serviceFilter = "全部";
    this.state.page = id;
    this.save();
    if (location.hash !== "#/" + id) history.pushState(null, "", "#/" + id);
    this.render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  topbar() {
    const c = this.client();
    const lockClient = this.state.page.startsWith("m1") || this.state.page.startsWith("m2") || this.state.page.startsWith("m4") || this.state.page.startsWith("m5") || this.state.page === "m3-hub" || this.state.page === "m3-financing";
    return `<div class="topbar">
      <button class="icon-btn" data-action="toggle-nav" title="收起/展开导航">☰</button>
      <div class="brand">
        <div class="brand-mark">HSBC</div>
        <div><div class="brand-name">Private Bank</div><div class="brand-sub">核心系统蓝图 · Demo v1.0 · 34 条路由</div></div>
      </div>
      <div class="topbar-spacer"></div>
      <div class="top-select"><label>Client</label>
        <select id="clientSel" ${lockClient ? "disabled" : ""} title="${lockClient ? "本案例客户固定，切换页面后可改" : "切换客户"}">
          ${DB.clients.map(x => `<option value="${x.id}" ${x.id === c.id ? "selected" : ""}>${x.name} · ${x.segment}</option>`).join("")}
        </select>
      </div>
      <div class="top-select"><label>Role</label>
        <select id="roleSel">
          ${["RM", "TH", "IC", "Compliance", "Credit", "Trustee", "Vendor", "Client"].map(r => `<option ${r === this.state.role ? "selected" : ""}>${r}</option>`).join("")}
        </select>
      </div>
      <div class="tiny muted" style="white-space:nowrap">${DB.asOf}</div>
      <button class="icon-btn" data-action="toast" data-msg="3 条通知：WARN 待批、估值更新、服务邀请待确认">🔔<span class="badge-dot"></span></button>
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
        <button class="btn sm" style="width:100%;justify-content:center" data-action="demo-script">Demo 脚本</button>
        <button class="btn sm" style="width:100%;justify-content:center;margin-top:5px" data-action="dictionary">业务词典</button>
        <button class="btn sm" style="width:100%;justify-content:center;margin-top:5px" data-action="reset">重置演示</button>
        <div style="margin-top:9px">Demo data only. 不构成投资/税务/法律建议。</div>
      </div>
    </aside>`;
  },

  rightbar(page) {
    if (this.state.role === "Client" || this.state.role === "Vendor") return "";
    const c = this.client();
    const audit = DB.audit.map(a => {
      if (a.what.includes("选择方案")) return Object.assign({}, a, { what: `选择方案 ${this.state.proposal.selected} / 锁定版本 v${this.currentVersion()}` });
      if (a.what.includes("电子签署")) return Object.assign({}, a, { what: this.state.compliance.esign ? `客户电子签署 v${this.state.compliance.signedVersion || this.currentVersion()}` : "电子签署待完成" });
      return a;
    });
    const next = (() => {
      if (this.proposalBlocked() && (page.id === "m1-execution" || page.id === "m1-compliance" || page.id === "m1-orders")) {
        return ["回到提案工作室", "m1-proposal"];
      }
      if (page.id === "m1-compliance") {
        return ["进入订单与 TCA", "m1-orders", "continue-compliance"];
      }
      return {
      "m1-dashboard": ["生成三套方案", "m1-proposal"],
      "m1-proposal": ["进入执行蓝图", "m1-execution", "continue-proposal"],
      "m1-execution": ["送合规闸门", "m1-compliance"],
      "m1-orders": ["进入 M2 量化实验室", "m2-allocation"],
      "m2-allocation": ["运行压力测试", "m2-stress"],
      "m2-stress": ["生成 RM 决策卡", "m2-decision"],
      "m2-backtest": ["生成 RM 决策卡", "m2-decision"],
      "m2-decision": ["回到配置工作室", "m2-allocation"],
      "m3-financing": ["回到案件工作台", "m3-cases"],
      "m3-taxlegal": ["回到案件工作台", "m3-cases"],
      "m3-family": ["打开案件工作台", "m3-cases"],
      "m3-cases": ["回到家庭工作台", "m3-family"],
      "m3-hub": ["回到案件工作台", "m3-cases"],
      "m4-founder": ["进入独立估值", "m4-valuation"],
      "m4-valuation": ["进入质押 vs 卖出", "m4-pledge"],
      "m4-pledge": ["进入信托 / 预算", "m4-trust"],
      "m4-trust": ["进入 M5 税务优化", "m5-intake"],
      "m5-intake": ["开始税务画像", "m5-profile"],
      "m5-profile": ["生成基线税图", "m5-baseline"],
      "m5-baseline": ["选择杠杆", "m5-levers"],
      "m5-levers": ["生成情景", "m5-scenarios"],
      "m5-booking": ["用于情景", "m5-scenarios"],
      "m5-scenarios": ["运行反避税校验", "m5-substance"],
      "m5-substance": ["送内部税务团队", "m5-advisor"],
      "m5-advisor": ["RM 批准并交付", "m5-delivery"],
      "m5-delivery": ["年度复盘", "m5-review"],
      "m5-review": ["回到案件", "m5-intake"],
      "audit": ["回到提案收件箱", "m1-dashboard"]
    }[page.id] || ["回到提案收件箱", "m1-dashboard"];
    })();
    return `<aside class="rightbar">
      <div class="card"><div class="card-head"><div><h2>客户快照</h2><p>${c.segment} · ${c.rm}</p></div></div><div class="card-body">
        <div class="strong">${c.name}</div>
        <div class="tiny muted">${c.booking.join(" / ")} · ${c.entity}</div>
        <div class="divider"></div>
        <div class="grid-2" style="gap:7px">
          <div><div class="tiny muted">总财富</div><div class="strong">${UI.money(c.totalWealth)}</div></div>
          <div><div class="tiny muted">T+7</div><div class="strong">${UI.money(c.liquid)}</div></div>
          <div><div class="tiny muted">集中度</div><div class="strong ${c.concentration > .6 ? "red" : ""}">${UI.pct(c.concentration * 100)}</div></div>
          <div><div class="tiny muted">风险</div><div class="strong">${c.risk}</div></div>
        </div>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>下一步</h2></div></div><div class="card-body">
        <div class="small strong">${next[0]}</div>
        <button class="btn sm primary" style="margin-top:7px;width:100%" data-action="${next[2] || "go"}" data-page="${next[1]}" data-id="${UI.esc(next[3] || "")}" data-msg="${UI.esc(next[3] || "")}">继续</button>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>证据 / 审批</h2></div></div><div class="card-body">
        <div class="timeline">${audit.slice(-4).map(a => `<div class="tl-item"><div class="when">${a.t}</div><div class="what">${a.what}</div><div class="who">${a.who}</div></div>`).join("")}</div>
        <button class="btn sm" style="width:100%;margin-top:6px" data-action="go" data-page="audit">打开证据链</button>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-body">
        <div class="tiny muted">当前角色权限</div>
        <div class="small"><b>${this.state.role}</b> · ${this.state.role === "Compliance" ? "全量只读 + 审批" : this.state.role === "Client" ? "本人/授权家庭" : this.state.role === "Vendor" ? "RFP/合同" : "自己名下客户"}</div>
        <div class="tiny muted" style="margin-top:4px">切换顶部 Role 查看字段/页面变化。</div>
      </div></div>
    </aside>`;
  },

  render() {
    if (this.state.page.startsWith("m1") || this.state.page.startsWith("m2")) this.state.clientId = "C-1001";
    if (this.state.page.startsWith("m4")) this.state.clientId = "C-88421";
    if (this.state.page.startsWith("m5") || this.state.page === "m3-hub" || this.state.page === "m3-financing") this.state.clientId = "C-7701";
    let page = PAGES.find(p => p.id === this.state.page);
    if (!page || !page.roles.includes(this.state.role)) {
      page = this.allowed()[0] || PAGES[0];
      this.state.page = page.id;
    }
    const html = `<div class="app ${this.state.navCollapsed ? "nav-collapsed" : ""}">
      ${this.topbar()}
      <div class="shell">
        ${this.sidebar()}
        <div class="main-wrap"><main class="main" id="main">${RENDER[page.id] ? RENDER[page.id]() : `<div class="empty">页面未实现</div>`}</main>${this.rightbar(page)}</div>
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
    App.save(); App.render();
    UI.toast("AI 参考方案已生成；当前选择不变（Aladdin 仍为默认提案）", "green");
    return;
  }
  if (a === "select-proposal") {
    if (id === "P-ALADDIN" && App.aladdinStatus() === "REJECT") { UI.toast("Aladdin 提案被 AI REJECT，不能采用；请退回 Aladdin 或选择 AI 参考方案", "red"); return; }
    if (App.state.proposal.selected === id) { UI.toast("当前已选择 " + id); return; }
    App.state.proposal.selected = id;
    App.state.proposal.version = (App.state.proposal.version || 3) + 1;
    App.state.compliance = { approved: false, approvedVersion: null, esign: false, signedVersion: null };
    App.save(); App.render();
    UI.toast(`已选择 ${id}；提案版本 v${App.state.proposal.version}，原审批/签署已失效`, "amber");
    return;
  }
  if (a === "aladdin-variant") {
    const v = DB.aladdin.variants[id];
    if (!v) return;
    App.state.aladdinVariant = id;
    if (App.state.proposal.selected === "P-ALADDIN") {
      App.state.proposal.version = (App.state.proposal.version || 3) + 1;
      App.state.compliance = { approved: false, approvedVersion: null, esign: false, signedVersion: null };
    }
    App.save(); App.render();
    UI.toast(`已载入 ${v.label}；AI 审阅：${v.status}`, v.status === "REJECT" ? "red" : v.status === "WARN" ? "amber" : "green");
    return;
  }
  if (a === "run-aladdin-review") {
    const v = App.aladdinVariant();
    const rejects = v.checks.filter(c => c.result === "REJECT").length;
    UI.toast(`AI 审阅完成：${v.status}${rejects ? ` · ${rejects} 项 REJECT` : ""}`, v.status === "REJECT" ? "red" : v.status === "WARN" ? "amber" : "green");
    return;
  }
  if (a === "import-aladdin-csv") {
    const v = App.aladdinVariant();
    UI.toast(`CSV 已导入：${v.rows.length} 行；AI 审阅已更新`, "green");
    return;
  }
  if (a === "continue-proposal") {
    if (App.proposalBlocked()) {
      UI.toast("Aladdin 提案被 AI REJECT，不能进入执行；请退回 Aladdin 或选择 AI 参考方案", "red");
      return;
    }
    App.go("m1-execution");
    return;
  }
  if (a === "approve-warn") {
    if (!App.complianceSnapshotReady()) { UI.toast("当前方案没有合规快照", "red"); return; }
    App.state.compliance.approved = true;
    App.state.compliance.approvedVersion = App.currentVersion();
    App.save(); App.render();
    UI.toast(`WARN 已附条件通过（v${App.currentVersion()}）`, "amber");
    return;
  }
  if (a === "create-order") {
    const v = App.currentVersion();
    const c = App.state.compliance || {};
    if (!App.complianceSnapshotReady()) { UI.toast("当前方案没有合规快照；demo 仅提供 P-A 的完整链路", "red"); return; }
    if (!c.approved) { UI.toast("先完成 WARN 附条件审批", "red"); return; }
    if (!c.esign) { UI.toast("客户尚未电子签署", "red"); return; }
    if (c.approvedVersion !== v || c.signedVersion !== v) { UI.toast("提案版本已变化，请重新审批并签署", "red"); return; }
    App.go("m1-orders"); UI.toast(`订单已创建：${App.state.proposal.selected} / 提案 v${v}`, "green"); return;
  }
  if (a === "continue-compliance") {
    const ready = App.orderReady();
    UI.closeDrawer(); UI.closeModal();
    App.go("m1-orders");
    UI.toast(ready
      ? `订单已创建：${App.state.proposal.selected} / 提案 v${App.currentVersion()}`
      : "demo 继续进入订单页；生产环境需先完成放行条件（审批 / 签署 / 同一版本 / P-A 快照）",
      ready ? "green" : "amber");
    return;
  }
  if (a === "esign") {
    const p = App.currentProposal();
    const v = App.currentVersion();
    UI.modal("客户电子签署", `<div class="note green"><b>${p.name} · 提案 v${v}</b> · 成本披露、风险揭示、KFS 已附；签署后不可修改。</div>
      <div class="small" style="margin-top:8px"><b>签署范围：</b>账户 HK-0091 / HK-0092；最高金额 $20.0m；产品范围：债券阶梯 / UCITS / 黄金 / 现金；有效期至 2027-03-31。</div>
      <div class="check" style="margin-top:8px"><input type="checkbox" checked> <span>客户已阅读并理解主要风险</span></div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-esign">确认签署</button>`);
    return;
  }
  if (a === "confirm-esign") { App.state.compliance.esign = true; App.state.compliance.signedVersion = App.currentVersion(); App.save(); UI.closeModal(); UI.toast(`客户已签署 v${App.currentVersion()}；订单可放行`, "green"); App.render(); return; }
  if (a === "stress") { App.state.stressScenario = id; App.save(); App.render(); return; }
  if (a === "set-cost") { App.state.includeCosts = id === "1"; App.save(); App.render(); return; }
  if (a === "save-decision") {
    const r = document.querySelector('input[name="decision"]:checked');
    App.state.decision = r ? r.value : "adopt"; App.save();
    UI.toast("RM 决策已保存；可生成客户版", "green"); return;
  }
  if (a === "facility-stress") { App.state.facilityStress = id; App.save(); App.render(); return; }
  if (a === "m3tab") { App.state.m3tab = id; App.save(); App.render(); return; }
  if (a === "journeyTab") { App.state.journeyTab = id; App.save(); App.render(); return; }
  if (a === "privateAssetTab") { App.state.privateAssetTab = id; App.save(); App.render(); return; }
  if (a === "hub-view") { App.state.hubView = id; App.save(); App.render(); return; }
  if (a === "service-filter") { App.state.serviceFilter = id; App.save(); App.render(); return; }
  if (a === "award-vendor") {
    DB.vendors.forEach(v => { v.selected = v.id === id; v.status = v.id === id ? "Awarded" : "Shortlist"; });
    App.render(); UI.toast("已定标 " + id + "；客户将收到邀请（不含价格/评分）", "green"); return;
  }
  if (a === "trust-tab") { App.state.trustTab = id; App.save(); App.render(); return; }
  if (a === "approve-ltv") { App.state.ltvApproved = true; App.save(); UI.toast("LTV 已批准；40% 触发已写入前置条件", "green"); App.render(); return; }
  if (a === "calc-pledge") {
    const g = (k) => +document.getElementById("pv-" + k).value;
    App.state.pledge = { V: g("V"), B: g("B"), t: g("t"), C: g("C"), i: g("i"), n: g("n"), r: g("r"), d: g("d") };
    App.save(); App.render(); UI.toast("已按新假设重算"); return;
  }
  if (a === "add-distribution") {
    UI.modal("新增信托分配", `<div class="form-grid">
      ${UI.field({ id: "d-item", label: "项目", value: "医疗" })}
      ${UI.field({ id: "d-amt", label: "金额（USD）", value: "120000" })}
      ${UI.field({ id: "d-layer", label: "来源层", type: "select", value: "C2 当年已税", options: ["C1 本金", "C2 当年已税", "C3 累计已税", "C4 未税", "C5 资本利得", "C6 借款"] })}
      ${UI.field({ id: "d-person", label: "申报人 / 纳税人", type: "select", value: "受益人", options: ["受托人", "委托人", "受益人", "无"] })}
      ${UI.field({ id: "d-payee", label: "收款人（Payee）", type: "select", value: "学校", options: ["学校", "医院", "房东/物业", "经销商", "酒店/运营商", "基金会", "其他"] })}
      ${UI.field({ id: "d-credit", label: "可抵扣税额", value: "24000" })}
    </div><div class="note amber" style="margin-top:8px">无来源层 / 无完税计提 / 无估值 → 不得付款。</div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-distribution">提交分配</button>`);
    return;
  }
  if (a === "confirm-distribution") {
    const item = document.getElementById("d-item").value;
    const amt = +document.getElementById("d-amt").value;
    const layer = document.getElementById("d-layer").value;
    const person = document.getElementById("d-person").value;
    const payee = document.getElementById("d-payee").value;
    const credit = +document.getElementById("d-credit").value;
    DB.trust.taxRows.push({ id: "D-00" + (DB.trust.taxRows.length + 1), item, amt, layer, payee, person, due: 0, credit, filing: "年度汇总", status: "待审批" });
    UI.closeModal(); App.render(); UI.toast("分配已创建；待受托人审批", "green"); return;
  }
  if (a === "toggle-lever") { return; }
  if (a === "select-scenario") { return; }
  if (a === "esign-tax") {
    UI.modal("客户电子签署", `<div class="note green"><b>税务优化方案 A（附条件）</b> · 非税务意见、假设、风险、顾问范围已披露。</div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-tax-esign">确认签署</button>`);
    return;
  }
  if (a === "confirm-tax-esign") { App.state.taxSigned = true; App.save(); UI.closeModal(); UI.toast("客户已签署；进入实施", "green"); App.render(); return; }
  if (a === "client-tab") { App.state.clientTab = id; App.save(); App.render(); return; }
  if (a === "dictionary") {
    const body = `<div class="note blue">同一份材料里，术语必须同名同义。以下为 demo 口径；Avaloq 源码术语以行内定义为准。</div>` +
      DB.dictionary.map(d => `<div class="card" style="margin-top:8px"><div class="card-body">
        <div class="row between"><div class="strong">${UI.esc(d.term)}</div><span class="pill gray">${UI.esc(d.en)}</span></div>
        <div class="small" style="margin-top:5px">${UI.esc(d.definition)}</div>
        <div class="tiny muted" style="margin-top:4px">${UI.esc(d.avoid)}</div>
      </div></div>`).join("");
    UI.drawer("业务词典", body, `<button class="btn" data-action="close-overlay">关闭</button>`);
    return;
  }
  if (a === "family-goal-new") {
    const h = App.household();
    if (!h) { UI.toast("当前客户没有家庭视图", "red"); return; }
    const persons = DB.persons.filter(p => p.householdId === h.id);
    const opts = persons.map(p => ({ value: p.id, label: `${p.name} · ${p.role}` }));
    const first = opts[0] ? opts[0].value : "—";
    UI.modal("新增家庭目标", `<div class="form-grid">
      ${UI.field({ id: "fg-title", label: "目标", value: "子女教育资金" })}
      ${UI.field({ id: "fg-cat", label: "类别", type: "select", value: "教育", options: ["教育", "流动性", "传承", "成年子女独立", "创业支持", "退休", "慈善", "税务"] })}
      ${UI.field({ id: "fg-owner", label: "提出人", type: "select", value: first, options: opts })}
      ${UI.field({ id: "fg-ben", label: "受益人", type: "select", value: first, options: opts })}
      ${UI.field({ id: "fg-fund", label: "出资方", type: "select", value: first, options: opts })}
      ${UI.field({ id: "fg-decide", label: "决策人", type: "select", value: first, options: opts })}
      ${UI.field({ id: "fg-amt", label: "目标金额", value: "1000000", suffix: "USD" })}
      ${UI.field({ id: "fg-date", label: "目标日期", value: "2028-09-01" })}
      ${UI.field({ id: "fg-priority", label: "优先级", type: "select", value: "中", options: ["高", "中", "低"] })}
      ${UI.field({ id: "fg-flex", label: "可调整性", type: "select", value: "中", options: ["高", "中", "低"] })}
      ${UI.field({ id: "fg-scope", label: "可见范围", type: "select", value: "本人 + 出资人", options: ["本人 + 出资人", "父母 + RM", "核心家庭成员", "家族成员"] })}
    </div><div class="note blue" style="margin-top:8px">提出人 ≠ 受益人 ≠ 出资方 ≠ 决策人。成年子女的目标应由本人确认；家长可以表达资助意愿，但不能代替子女决定。</div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-family-goal">保存目标</button>`);
    return;
  }
  if (a === "confirm-family-goal") {
    const g = (id) => document.getElementById(id).value;
    const h = App.household();
    if (!h) { UI.closeModal(); UI.toast("当前客户没有家庭视图", "red"); return; }
    const goal = {
      id: "FG-" + h.id.replace("H-", "") + "-" + String(DB.familyGoals.filter(x => x.householdId === h.id).length + 1).padStart(2, "0"),
      householdId: h.id,
      title: g("fg-title"),
      category: g("fg-cat"),
      ownerPersonId: g("fg-owner"),
      beneficiaryPersonIds: [g("fg-ben")],
      fundingPartyIds: [g("fg-fund")],
      decisionMakerId: g("fg-decide"),
      decisionMaker: (DB.persons.find(p => p.id === g("fg-decide")) || {}).name || "—",
      targetAmount: +g("fg-amt"),
      currency: "USD",
      targetDate: g("fg-date"),
      priority: g("fg-priority"),
      flexibility: g("fg-flex"),
      visibilityScope: g("fg-scope"),
      fundingCommitmentStatus: "待确认",
      status: "待确认",
      gap: "新建目标；待确认出资与授权",
      caseId: null
    };
    DB.familyGoals.push(goal);
    UI.closeModal(); App.render();
    UI.toast("家庭目标已创建（demo，仅保存在当前会话）", "green");
    return;
  }
  if (a === "invite-service") {
    const svc = DB.services.find(s => s.id === id);
    const h = App.household();
    if (!svc || !h) { UI.toast("当前客户没有家庭视图", "red"); return; }
    const persons = DB.persons.filter(p => p.householdId === h.id);
    const opts = persons.map(p => ({ value: p.id, label: `${p.name} · ${p.role}` }));
    const adult = persons.find(p => p.role.includes("成年")) || persons[persons.length - 1] || persons[0];
    UI.modal("发送服务邀请", `<div class="form-grid">
      ${UI.field({ id: "inv-person", label: "邀请对象", type: "select", value: adult.id, options: opts })}
      ${UI.field({ id: "inv-relation", label: "关系客户", value: `${h.name} · ${h.id}`, disabled: true })}
      ${UI.field({ id: "inv-service", label: "项目", value: svc.title, disabled: true })}
      ${UI.field({ id: "inv-consent", label: "同意状态", type: "select", value: "待本人确认", options: ["已授权", "待本人确认", "未授权"] })}
      ${UI.field({ id: "inv-scope", label: "可分享范围", type: "select", value: "仅邀请", options: ["仅邀请", "邀请 + 出席反馈", "全部服务记录"] })}
    </div>
    <label class="check" style="margin-top:8px"><input type="checkbox" id="inv-confirm"> <span>本人/监护人已同意被联系，且仅共享上述范围</span></label>
    <div class="note amber" style="margin-top:8px">家长可以表达资助意愿，但成年子女自行决定是否参加、是否分享反馈。未经同意不得发送。</div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-invite">确认发送</button>`);
    return;
  }
  if (a === "confirm-invite") {
    const person = DB.persons.find(p => p.id === document.getElementById("inv-person").value);
    const consent = document.getElementById("inv-consent").value;
    const ok = document.getElementById("inv-confirm").checked;
    if (consent !== "已授权" || !ok) { UI.toast("未取得本人/监护人同意，不能发送邀请", "red"); return; }
    UI.closeModal();
    UI.toast(`邀请已发送给 ${person ? person.name : "成员"}（仅邀请，不含价格/评分）`, "green");
    return;
  }
  if (a === "case-filter") { App.state.caseFilter = id; App.save(); App.render(); return; }
  if (a === "case-detail") {
    const c = DB.cases.find(x => x.id === id);
    if (!c) return;
    const goal = DB.familyGoals.find(g => g.id === c.goalId);
    UI.drawer("案件详情", `<div class="stack">
      <div class="row between"><div><div class="tiny muted">${UI.esc(c.id)}</div><div class="strong" style="font-size:14px">${UI.esc(c.title)}</div></div>${UI.pill(c.status, c.status === "进行中" ? "blue" : c.status.includes("等待") ? "amber" : "gray")}</div>
      <div class="grid-2" style="gap:8px">
        <div><div class="tiny muted">模块</div><div class="strong">${UI.esc(c.module)}</div></div>
        <div><div class="tiny muted">类型</div><div class="strong">${UI.esc(c.type)}</div></div>
        <div><div class="tiny muted">负责人</div><div class="strong">${UI.esc(c.owner)}</div></div>
        <div><div class="tiny muted">期限</div><div class="strong">${UI.esc(c.due)}</div></div>
      </div>
      <div class="note blue"><b>关联目标：</b>${goal ? `${UI.esc(goal.title)} · ${UI.esc(goal.id)}` : "—"}</div>
      <div class="small"><b>依赖：</b>${UI.esc(c.dependencies)}</div>
      <div class="small"><b>交付物：</b>${UI.esc(c.deliverable)}</div>
      <div class="small"><b>客户待办：</b>${UI.esc(c.clientTodo)}</div>
      <div class="note amber">一个案件可以跨 M3/M4/M5；任务、依赖、期限、交付物和客户待办在同一视图。</div>
      ${c.link ? `<div class="note blue"><b>下一步：</b>${UI.esc(c.linkLabel || "打开对应页面")}</div>` : ""}
    </div>`, `<button class="btn" data-action="close-overlay">关闭</button>${c.link ? `<button class="btn primary" data-action="go" data-page="${c.link}">${UI.esc(c.linkLabel || "打开")}</button>` : ""}`);
    return;
  }
  if (a === "toggle-nav") {
    if (window.innerWidth <= 900) {
      UI.drawer("导航", `<div class="stack">${App.nav()}</div>`, `<button class="btn" data-action="close-overlay">关闭</button>`);
      return;
    }
    App.state.navCollapsed = !App.state.navCollapsed;
    App.save(); App.render();
    UI.toast(App.state.navCollapsed ? "导航已收起，主区域已加宽" : "导航已展开", "blue");
    return;
  }
  if (a === "demo-script") {
    UI.drawer("Demo 脚本", `<div class="timeline">
      <div class="tl-item"><div class="what">1. M1 提案 → 订单</div><div class="who">生成三套方案 → 选 A → 执行蓝图 → 合规 WARN → 附条件通过 → 客户电子签署 → 创建订单（审批 + 签署 + 同一版本）</div></div>
      <div class="tl-item"><div class="what">2. M2 量化</div><div class="who">配置 → 压力 → 回测 → RM 决策卡</div></div>
      <div class="tl-item"><div class="what">3. M3 家庭 / 案件 / 服务</div><div class="who">家庭工作台 → 目标与授权 → 案件工作台 → 融资 / 税务 / 邀请（发送前需本人同意）</div></div>
      <div class="tl-item"><div class="what">4. M4 创始人</div><div class="who">360 → 估值 LTV → 押 vs 卖 → 信托预算/税务台账</div></div>
      <div class="tl-item"><div class="what">5. M5 税务优化</div><div class="who">案件 → 画像 → 基线 → 杠杆 → 情景 → 反避税 → 顾问 → 交付</div></div>
    </div><div class="note blue" style="margin-top:8px">切换顶部 Role 到 Client / Vendor / Compliance，演示权限矩阵。</div>`, `<button class="btn" data-action="close-overlay">关闭</button>`);
    return;
  }
  if (a === "reset") { localStorage.removeItem("hsbc_pb_demo_v1"); location.reload(); return; }
  if (a === "close-overlay") { UI.closeDrawer(); UI.closeModal(); return; }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "clientSel") {
    if (App.state.page.startsWith("m1") || App.state.page.startsWith("m2")) App.state.clientId = "C-1001";
    else if (App.state.page.startsWith("m4")) App.state.clientId = "C-88421";
    else if (App.state.page.startsWith("m5") || App.state.page === "m3-hub" || App.state.page === "m3-financing") App.state.clientId = "C-7701";
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
    UI.toast("已切换角色：" + r + "（页面/字段权限随之变化）", "blue");
    return;
  }
  if (e.target.id === "inv-person") {
    const h = App.household();
    const con = h ? DB.consents.find(c => c.householdId === h.id && c.personId === e.target.value) : null;
    const sel = document.getElementById("inv-consent");
    if (sel) sel.value = con ? (con.status.startsWith("已授权") ? "已授权" : "待本人确认") : "未授权";
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
    UI.toast(el.checked ? "已加入 " + id : "已移除 " + id);
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
