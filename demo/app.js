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
  serviceFilter: "全部",
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
      const raw = localStorage.getItem("hsbc_pb_demo_v1");
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
    if (this.state.page === "m3-hub") this.state.serviceFilter = "全部";
  },

  save() {
    try { localStorage.setItem("hsbc_pb_demo_v1", JSON.stringify(this.state)); } catch (e) {}
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
      ? `预期回报 ${(r * 100).toFixed(1)}% 高于盈亏平衡 ${(breakeven * 100).toFixed(2)}% + 3% 缓冲；且 −40% 情景仍为正。建议质押，但保留 40% 追保条款与利息覆盖检查。`
      : recommend === "Sell"
        ? `预期回报 ${(r * 100).toFixed(1)}% 未显著高于盈亏平衡 ${(breakeven * 100).toFixed(2)}%；或 −40% 情景无法补仓。建议卖出/部分卖出。`
        : `盈亏平衡 ${(breakeven * 100).toFixed(2)}%；预期回报接近阈值。建议“卖一半 + 押一半”，降低集中度与追保风险。`;
    return { sellAmt: S, tax, remain, interest, sellAt8, pledgeAt8, breakeven, sellDown, pledgeDown, downsideGap: sellDown - pledgeDown, sellSeries, pledgeSeries, recommend, rationale };
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
    const leavingCase = this.state.page.startsWith("m4") || this.state.page.startsWith("m5") || this.state.page === "m3-hub";
    if (id.startsWith("m4")) this.state.clientId = "C-88421";
    else if (id.startsWith("m5") || id === "m3-hub") this.state.clientId = "C-7701";
    else if (leavingCase && (this.state.clientId === "C-88421" || this.state.clientId === "C-7701")) this.state.clientId = "C-1001";
    if (id === "m3-hub") this.state.serviceFilter = "全部";
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
      <button class="icon-btn" data-action="toggle-nav" title="收起/展开导航">☰</button>
      <div class="brand">
        <div class="brand-mark">HSBC</div>
        <div><div class="brand-name">Private Bank</div><div class="brand-sub">核心系统蓝图 · Demo v1.0 · 29 条路由</div></div>
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
        <button class="btn sm" style="width:100%;justify-content:center;margin-top:5px" data-action="reset">重置演示</button>
        <div style="margin-top:9px">Demo data only. 不构成投资/税务/法律建议。</div>
      </div>
    </aside>`;
  },

  rightbar(page) {
    if (this.state.role === "Client" || this.state.role === "Vendor") return "";
    const c = this.client();
    const next = {
      "m1-dashboard": ["生成三套方案", "m1-proposal"],
      "m1-proposal": ["选择方案 A，进入执行层", "m1-execution"],
      "m1-execution": ["送合规闸门", "m1-compliance"],
      "m1-compliance": ["附条件通过 WARN，创建订单", "m1-orders"],
      "m1-orders": ["回写 TCA，进入复盘", "m1-orders"],
      "m2-allocation": ["运行压力测试", "m2-stress"],
      "m2-stress": ["生成 RM 决策卡", "m2-decision"],
      "m2-backtest": ["生成 RM 决策卡", "m2-decision"],
      "m2-decision": ["保存决策，生成客户版", "m2-decision"],
      "m3-financing": ["提交授信预审", "m3-financing"],
      "m3-taxlegal": ["转介税务师/律师", "m3-taxlegal"],
      "m3-hub": ["按家族成员筛选服务，发送邀请", "m3-hub"],
      "m4-founder": ["进入独立估值", "m4-valuation"],
      "m4-valuation": ["批准 LTV，40% 触发写入前置", "m4-valuation"],
      "m4-pledge": ["调整假设，比较押/卖", "m4-pledge"],
      "m4-trust": ["查看税务台账", "m4-trust"],
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
      "audit": ["导出审计包", "audit"]
    }[page.id] || ["继续", page.id];
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
        <button class="btn sm primary" style="margin-top:7px;width:100%" data-action="go" data-page="${next[1]}">继续</button>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>证据 / 审批</h2></div></div><div class="card-body">
        <div class="timeline">${DB.audit.slice(-4).map(a => `<div class="tl-item"><div class="when">${a.t}</div><div class="what">${a.what}</div><div class="who">${a.who}</div></div>`).join("")}</div>
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
    App.state.proposal.selected = "P-A";
    App.save(); App.render();
    UI.toast("已生成 3 套方案；TES 已计算（mock）", "green");
    return;
  }
  if (a === "select-proposal") {
    App.state.proposal.selected = id; App.save(); App.render();
    UI.toast("已选择 " + id + "；执行层将按此版本生成");
    return;
  }
  if (a === "approve-warn") {
    App.state.compliance.approved = true; App.save(); App.render();
    UI.toast("WARN 已附条件通过：美国税务顾问意见（30 天内）", "amber");
    return;
  }
  if (a === "create-order") {
    if (!App.state.compliance.approved) { UI.toast("先完成 WARN 附条件审批", "red"); return; }
    App.go("m1-orders"); UI.toast("订单已创建：5 个母单 / 7 个子单", "green"); return;
  }
  if (a === "esign") {
    UI.modal("客户电子签署", `<div class="note green"><b>提案 v3</b> · 成本披露、风险揭示、KFS 已附；签署后不可修改。</div><div class="check" style="margin-top:8px"><input type="checkbox" checked> <span>客户已阅读并理解主要风险</span></div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-esign">确认签署</button>`);
    return;
  }
  if (a === "confirm-esign") { App.state.compliance.esign = true; App.save(); UI.closeModal(); UI.toast("客户已签署 v3；订单可放行", "green"); App.render(); return; }
  if (a === "stress") { App.state.stressScenario = id; App.save(); App.render(); return; }
  if (a === "set-cost") { App.state.includeCosts = id === "1"; App.save(); App.render(); return; }
  if (a === "save-decision") {
    const r = document.querySelector('input[name="decision"]:checked');
    App.state.decision = r ? r.value : "adopt"; App.save();
    UI.toast("RM 决策已保存；可生成客户版", "green"); return;
  }
  if (a === "facility-stress") { App.state.facilityStress = id; App.save(); App.render(); return; }
  if (a === "m3tab") { App.state.m3tab = id; App.save(); App.render(); return; }
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
      ${UI.field({ id: "d-person", label: "申报人", type: "select", value: "受益人", options: ["受托人", "委托人", "受益人", "无"] })}
      ${UI.field({ id: "d-credit", label: "可抵扣税额", value: "24000" })}
    </div><div class="note amber" style="margin-top:8px">无来源层 / 无完税计提 / 无估值 → 不得付款。</div>`, `<button class="btn" data-action="close-overlay">取消</button><button class="btn primary" data-action="confirm-distribution">提交分配</button>`);
    return;
  }
  if (a === "confirm-distribution") {
    const item = document.getElementById("d-item").value;
    const amt = +document.getElementById("d-amt").value;
    const layer = document.getElementById("d-layer").value;
    const person = document.getElementById("d-person").value;
    const credit = +document.getElementById("d-credit").value;
    DB.trust.taxRows.push({ id: "D-00" + (DB.trust.taxRows.length + 1), item, amt, layer, person, due: 0, credit, filing: "年度汇总", status: "待审批" });
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
      <div class="tl-item"><div class="what">1. M1 提案 → 订单</div><div class="who">生成三套方案 → 选 A → 执行蓝图 → 合规 WARN → 创建订单 → TCA</div></div>
      <div class="tl-item"><div class="what">2. M2 量化</div><div class="who">配置 → 压力 → 回测 → RM 决策卡</div></div>
      <div class="tl-item"><div class="what">3. M3 副驾 / 服务邀请</div><div class="who">融资 → 税务/法律 → 家族服务邀请 / Vendor 投标</div></div>
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
    UI.toast("已切换角色：" + r + "（页面/字段权限随之变化）", "blue");
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
