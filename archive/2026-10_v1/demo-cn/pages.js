/* Page metadata + M1 / M2 renderers */
const MODULES = {
  M1: { name: "M1 · Proposal Studio", short: "提案 → 订单" },
  M2: { name: "M2 · Quant Lab", short: "量化实验室" },
  M3: { name: "M3 · RM Copilot", short: "RM 副驾" },
  M4: { name: "M4 · Founder Desk", short: "创始人全景" },
  M5: { name: "M5 · Tax Optimization", short: "税务优化" },
  X: { name: "Shared", short: "共享" }
};

const PAGES = [
  { id: "m1-dashboard", mod: "M1", title: "提案收件箱", sub: "今天该为谁做提案？为什么是现在？", icon: "01", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m1-proposal", mod: "M1", title: "提案工作室", sub: "目标 → 约束 → 三套方案 → TES", icon: "02", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m1-execution", mod: "M1", title: "执行蓝图", sub: "提案层选路，执行层逐行下单", icon: "03", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m1-compliance", mod: "M1", title: "合规闸门", sub: "四维规则 × 适当性 × 披露 × 跨墙", icon: "04", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m1-orders", mod: "M1", title: "订单与 TCA", sub: "母单 / 子单 / 成交 / 成本回写", icon: "05", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },

  { id: "m2-allocation", mod: "M2", title: "配置工作室", sub: "IPS 硬约束下的 SAA / TAA", icon: "06", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m2-stress", mod: "M2", title: "压力测试", sub: "什么情况下会疼？疼多少？", icon: "07", roles: ["RM", "IC", "TH", "Compliance", "Credit"] },
  { id: "m2-backtest", mod: "M2", title: "回测实验室", sub: "含成本、含税、含样本外", icon: "08", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m2-decision", mod: "M2", title: "RM 决策卡", sub: "RM 决定怎么讲、讲多少", icon: "09", roles: ["RM", "IC", "TH", "Compliance"] },

  { id: "m3-family", mod: "M3", title: "家庭工作台", sub: "客户与家庭：关系、目标、授权、可执行事项", icon: "FH", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m3-cases", mod: "M3", title: "案件工作台", sub: "融资、税务、信托、服务的统一任务视图", icon: "CW", roles: ["RM", "IC", "TH", "Compliance", "Credit", "Trustee"] },
  { id: "m3-financing", mod: "M3", title: "融资驾驶舱", sub: "缺多少、能借多少、怎么还", icon: "10", roles: ["RM", "IC", "TH", "Credit", "Compliance"] },
  { id: "m3-taxlegal", mod: "M3", title: "税务 / 法律驾驶舱", sub: "义务日历、情景、持牌转介", icon: "11", roles: ["RM", "IC", "TH", "Compliance", "Trustee"] },
  { id: "m3-hub", mod: "M3", title: "服务 / 邀请", sub: "家族服务与邀请：客户不支付、不签约", icon: "12", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m3-journeys", mod: "M3", title: "旅程蓝图", sub: "J2 创始人 / J3 创作者 / J4 女性：一页 blueprint", icon: "JN", roles: ["RM", "IC", "TH", "Compliance", "Client"] },
  { id: "m3-family-office", mod: "M3", title: "Family Office Dashboard", sub: "Consolidated view / IPS / services / governance", icon: "FO", roles: ["RM", "IC", "TH", "Compliance", "Trustee", "Client"] },

  { id: "m4-founder", mod: "M4", title: "创始人 360", sub: "纸面财富 → 可管理资产", icon: "13", roles: ["RM", "IC", "TH", "Credit", "Compliance", "Trustee"] },
  { id: "m4-valuation", mod: "M4", title: "独立估值委员会", sub: "LTV 10%–30%；40% 触发", icon: "14", roles: ["RM", "TH", "Credit", "Compliance"] },
  { id: "m4-pledge", mod: "M4", title: "质押 vs 卖出", sub: "同一笔现金，税后终端财富谁更多", icon: "15", roles: ["RM", "IC", "TH", "Credit", "Compliance"] },
  { id: "m4-trust", mod: "M4", title: "信托 / 预算 / 税务台账", sub: "能花、可审计、可申报", icon: "16", roles: ["RM", "TH", "Compliance", "Trustee"] },
  { id: "m4-private-assets", mod: "M4", title: "Private Asset Lifecycle", sub: "Capital call / earn-out / obligation / valuation governance", icon: "PA", roles: ["RM", "IC", "TH", "Compliance", "Credit", "Trustee"] },

  { id: "m5-intake", mod: "M5", title: "税务优化案件", sub: "同一笔交易，怎么安排更省税", icon: "17", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-profile", mod: "M5", title: "税务画像 / Nexus", sub: "居民、实体、账户、资产不是一回事", icon: "18", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-baseline", mod: "M5", title: "基线税图", sub: "不优化时，每个事件交什么税", icon: "19", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-levers", mod: "M5", title: "杠杆库", sub: "十条杠杆，每条都有红旗", icon: "20", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-booking", mod: "M5", title: "簿记 / 实体比较", sub: "开曼 ≠ 免税；看实质与 CRS", icon: "21", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-scenarios", mod: "M5", title: "情景比较", sub: "税后现金、成本、风险、可辩护性", icon: "22", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-substance", mod: "M5", title: "反避税校验", sub: "HK s.61A / FSIE / 实质 / CRS", icon: "23", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-advisor", mod: "M5", title: "HSBC 内部复核 / RM 决策", sub: "无内部复核不交付", icon: "24", roles: ["RM", "IC", "TH", "Compliance"] },
  { id: "m5-delivery", mod: "M5", title: "客户交付 / 实施", sub: "客户包、披露、开户、申报", icon: "25", roles: ["RM", "TH", "Compliance"] },
  { id: "m5-review", mod: "M5", title: "年度复盘", sub: "法规、天数、申报、结构", icon: "26", roles: ["RM", "TH", "Compliance"] },

  { id: "client-portal", mod: "X", title: "客户门户", sub: "提案、邀请、信托报告", icon: "CL", roles: ["Client"] },
  { id: "vendor-portal", mod: "X", title: "Vendor 投标", sub: "RFP、投标、交付（不接触客户数据）", icon: "VE", roles: ["Vendor"] },
  { id: "audit", mod: "X", title: "审计与证据", sub: "证据链、模型版本、访问日志", icon: "AU", roles: ["Compliance", "TH", "RM"] }
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
    <div style="margin-left:auto">${UI.pill(c.risk, c.risk === "保守" ? "blue" : c.risk === "进取" ? "red" : "green")}</div>
  </div>`;
}

/* ───────── M1 ───────── */

RENDER["m1-dashboard"] = () => {
  const c = App.client();
  const ev = DB.events.filter(e => e.clientId === c.id);
  const next = ev[0] || { days: "—", title: "暂无事件", detail: "先做客户 360 与目标确认。", type: "—" };
  const eventPage = c.id === "C-88421" ? "m4-founder" : c.id === "C-7701" ? "m5-baseline" : next.type === "质押" ? "m3-financing" : "m3-taxlegal";
  const eventLabel = c.id === "C-88421" ? "查看创始人 360" : c.id === "C-7701" ? "打开税务基线" : next.type === "质押" ? "打开融资驾驶舱" : "打开税务驾驶舱";
  const configPage = c.id === "C-88421" ? "m4-valuation" : "m1-proposal";
  const financePage = c.id === "C-88421" ? "m4-pledge" : c.id === "C-7701" ? "m3-hub" : "m3-financing";
  const taxId = App.state.role === "Compliance" ? c.taxId : c.taxId.replace(/[0-9]{4}$/, "****");
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · 收件箱`,
    title: "提案收件箱",
    sub: "事件驱动，而不是季度回顾。每条线索都能下钻到客户 360、事件来源与建议动作。",
    actions: `<button class="btn" data-action="toast" data-msg="已刷新事件与持仓（mock）">刷新</button>
      <button class="btn primary" data-action="go" data-page="m1-proposal">新建提案</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("客户总财富", UI.money(c.totalWealth), "含托管 + 非托管", "")}
    ${UI.stat("T+7 可动用", UI.money(c.liquid), (c.liquid / c.totalWealth * 100).toFixed(1) + "% · " + (c.liquid / c.totalWealth >= .10 ? "高于" : "低于") + " 10% 下限", c.liquid / c.totalWealth >= .10 ? "green" : "red")}
    ${UI.stat("单一股票集中度", UI.pct(c.concentration * 100), c.concentration > .6 ? "高于 60% 阈值" : "在阈值内", c.concentration > .6 ? "red" : "green")}
    ${UI.stat("下一事件", ev[0] ? `${ev[0].days} 天` : "—", ev[0] ? ev[0].type + " · " + ev[0].date : "无", "amber")}
  </div>
  <div class="grid-2-1" style="margin-top:12px">
    <div class="card">
      <div class="card-head"><div><h2>待办事件</h2><p>按优先级排序；点击“提案”进入目标与约束。</p></div><div class="spacer"></div>${UI.pill(ev.length + " 条", "gray")}</div>
      ${ev.length ? UI.table(
        ["事件", "日期 / 天数", "详情", "优先级", "状态", ""],
        ev.map(e => [
          `<span class="strong">${e.type}</span><span class="sub">${e.title}</span>`,
          `<span class="mono">${e.date}</span><span class="sub">${e.days > 0 ? e.days + " 天后" : "已过期"}</span>`,
          `<span class="small">${e.detail}</span>`,
          `<b class="mono">${e.priority}</b>`,
          UI.pill(e.status, e.status === "待触达" ? "red" : e.status === "进行中" ? "blue" : "amber"),
          `<button class="btn sm" data-action="go" data-page="m1-proposal">提案</button>`
        ]), { compact: true }) : `<div class="empty">暂无事件。切换到其他客户查看。</div>`}
    </div>
    <div class="card">
      <div class="card-head"><div><h2>Client 360</h2><p>字段级权限：RM 看到掩码，Compliance 看到全量。</p></div></div>
      <div class="card-body">
        ${clientHeader(c)}
        <div class="divider"></div>
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">税务居民</div><div class="strong">${c.taxResidency}</div></div>
          <div><div class="tiny muted">实体</div><div class="strong">${c.entity}</div></div>
          <div><div class="tiny muted">税号</div><div class="strong mono">${taxId}</div></div>
          <div><div class="tiny muted">${UI.term("家庭", "Household")}</div><div class="strong">${c.family}</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:5px">账户（${c.accounts.length}）</div>
        ${UI.table(["账户", "中心", "类型", "币种", "市值"], c.accounts.map(a => [
          `<span class="mono">${a.id}</span>`, a.centre, a.type, a.ccy, `<span class="num">${UI.money(a.value)}</span>`
        ]), { compact: true })}
      </div>
    </div>
  </div>
  <div class="grid-3" style="margin-top:12px">
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill amber">建议动作</span><span class="tiny muted">T-${next.days} 天</span></div>
      <div class="strong" style="margin:7px 0 3px">${next.title}</div>
      <div class="small muted">${next.detail}</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${eventPage}">${eventLabel}</button>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill blue">配置</span><span class="tiny muted">集中度 ${UI.pct(c.concentration * 100)}</span></div>
      <div class="strong" style="margin:7px 0 3px">${c.concentration > .6 ? "先处理流动性与集中度" : "用债券阶梯降低单一股票"}</div>
      <div class="small muted">${c.concentration > .6 ? "目标：先锁定流动性/税务，再分阶段降低集中度。" : "目标：24 个月把集中度降到 30%；保留 12% 现金缓冲。"}</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${configPage}">${c.id === "C-88421" ? "查看估值" : "生成提案"}</button>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="row between"><span class="pill purple">融资</span><span class="tiny muted">Lombard</span></div>
      <div class="strong" style="margin:7px 0 3px">先质押、后减持？</div>
      <div class="small muted">质押 3 年成本 vs 一次性税负；40% 下跌触发追保需提前告知。</div>
      <button class="btn sm" style="margin-top:8px" data-action="go" data-page="${financePage}">${c.id === "C-7701" ? "查看家族服务" : "比较融资"}</button>
    </div></div>
  </div>`;
};

RENDER["m1-proposal"] = () => {
  const c = App.client();
  const p = DB.proposals;
  const f = p.funding;
  const a = DB.aladdin;
  const variant = App.aladdinVariant();
  const status = variant.status;
  const reviewReject = status === "REJECT";
  const selectedBlocked = App.proposalBlocked();
  const sel = App.state.proposal.selected;
  const aladdinOption = p.aladdinOption;
  const gen = App.state.proposal.generated;

  const objectiveFormCard = `<div class="card"><div class="card-head"><div><h2>目标</h2><p>用区间，不用单点；流动性按 T+0/7/90 拆。</p></div></div><div class="card-body">
    <div class="form-grid">
      ${UI.field({ label: "目标类型", type: "select", value: "流动性 + 分散", options: ["流动性 + 分散", "收益", "增长", "对冲", "传承"] })}
      ${UI.field({ label: "投资金额", value: "20,000,000", suffix: "USD" })}
      ${UI.field({ label: "期限", value: "24", suffix: "个月" })}
      ${UI.field({ label: "目标回报（区间）", value: "4.5% – 5.5%" })}
      ${UI.field({ label: "T+0 现金", value: "500,000", suffix: "USD" })}
      ${UI.field({ label: "T+7 现金", value: "1,000,000", suffix: "USD" })}
      ${UI.field({ label: "T+90 现金", value: "2,000,000", suffix: "USD" })}
      ${UI.field({ label: "最大回撤", value: "10", suffix: "%" })}
    </div>
  </div></div>`;

  const fundingCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><h2>资金与权利结构</h2><p>出资 ≠ 持有 ≠ 受益 ≠ 风险承担；为子女准备资金，不意味着订单属于子女账户。</p></div></div><div class="card-body">
    <div class="form-grid">
      ${UI.field({ label: "资金来源", type: "select", value: f.source, options: ["已上市股票减持 + 到期现金", "现金", "质押", "分红", "其他"] })}
      ${UI.field({ label: "出资方", value: f.payer })}
      ${UI.field({ label: "持有人 / 账户主体", value: f.holder, help: "订单必须落在持有人账户；受益人不是账户持有人时，需单独授权。" })}
      ${UI.field({ label: "受益人", value: f.beneficiary, help: UI.term("受益人 ≠ 账户持有人", "Trust Beneficiary") })}
      ${UI.field({ label: "风险承担人", value: f.riskBearer })}
      ${UI.field({ label: "决策人", value: f.decisionMaker })}
      ${UI.field({ label: "授权记录", value: f.consentRef, disabled: true })}
      ${UI.field({ label: "订单账户", value: f.account, disabled: true })}
    </div>
    <div class="note blue" style="margin-top:8px">${f.note}</div>
  </div></div>`;

  const constraintsCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><h2>约束</h2><p>硬约束会阻断生成；软约束会提示。</p></div></div><div class="card-body">
    <div class="form-grid">
      ${UI.field({ label: "权益上限", value: "50", suffix: "%" })}
      ${UI.field({ label: "单一发行人上限", value: "15", suffix: "%" })}
      ${UI.field({ label: "最低现金留存", value: "8", suffix: "%" })}
      ${UI.field({ label: "非美元上限", value: "25", suffix: "%" })}
      ${UI.field({ label: "久期区间", value: "4.0–5.0", suffix: "年" })}
      ${UI.field({ label: "杠杆", type: "select", value: "不允许", options: ["不允许", "允许（LTV ≤ 25%）"] })}
      ${UI.field({ label: "衍生品", type: "select", value: "不允许", options: ["不允许", "仅对冲"] })}
      ${UI.field({ label: "税务居民", type: "select", value: c.taxResidency, options: ["中国内地", "香港", "新加坡", "美国", "其他"] })}
    </div>
    <div class="note" style="margin-top:9px"><b>约束编译器：</b>“留点现金” → 12 个月支出 = 8% 最低现金；“别太集中” → 单一发行人 ≤ 15%。每条都可修改，但需客户确认。</div>
  </div></div>`;

  const templatesCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><h2>模板</h2><p>选交易方式，不是选产品。</p></div></div><div class="card-body">
    <div class="row">${DB.templates.slice(0, 6).map(t => `<span class="pill ${t.id === "FI-LADDER-01" ? "red" : "gray"}">${t.id} · ${t.name}</span>`).join("")}</div>
    <div class="tiny muted" style="margin-top:7px">已选 4 个模板：FI-LADDER-01、FD-UCITS-01、EQ-CASH-01、CASH。每个模板都有必填字段、成本项、税务处理与审批矩阵。</div>
  </div></div>`;

  const aiCards = p.options.map(o => {
    const tes = App.tes(o.subs);
    return `<div class="card" style="border-color:${sel === o.id ? "#fda4af" : "var(--line)"};box-shadow:${sel === o.id ? "0 0 0 3px #fff1f2" : "var(--shadow)"}">
      <div class="card-head">
        <div><div class="row"><span class="pill ${o.tag === "推荐" ? "red" : o.tag === "稳健" ? "blue" : "amber"}">${o.tag}</span><span class="pill gray">AI 参考</span><span class="tiny muted">${o.id}</span></div>
          <h2 style="margin-top:5px">${o.name}</h2><p>${o.thesis}</p></div>
        <div class="spacer"></div>
        <div style="text-align:right"><div class="tiny muted">TES</div><div class="strong" style="font-size:19px">${tes}</div></div>
      </div>
      <div class="card-body tight">
        <div class="grid-4" style="gap:6px">
          ${UI.stat("全口径成本", o.metrics.cost + " bps", "首年", "")}
          ${UI.stat("税后拖累", o.metrics.tax + " bps", "年化", "")}
          ${UI.stat("到可投资", o.metrics.time + " 天", "决策→建仓", "")}
          ${UI.stat("冲击", o.metrics.impact + " bps", "20% ADV", "")}
        </div>
        ${UI.table(["模板", "标的", "动作", "权重", "金额"], o.legs.map(l => [
          `<span class="mono">${l.t}</span>`, l.i, l.a, l.w + "%", `<span class="num">${UI.money(l.amt)}</span>`
        ]), { compact: true })}
        <div class="grid-2" style="margin-top:8px">
          <div class="note green"><b>为什么是这套：</b>${o.why}</div>
          <div class="note amber"><b>代价/风险：</b>${o.not}</div>
        </div>
        <div class="tiny muted" style="margin-top:7px"><b>什么情况下换：</b>${o.change} · 信心：${o.confidence}</div>
        <div class="row" style="margin-top:9px">
          <button class="btn ${sel === o.id ? "primary" : ""}" data-action="select-proposal" data-id="${o.id}">${sel === o.id ? "已选择" : "选择这套"}</button>
          <button class="btn sm" data-action="toast" data-msg="已打开 leg-level 详情（demo）">查看逐行</button>
          <span class="tiny muted" style="margin-left:auto">预期 ${o.exp} · 波动 ${o.vol} · 压力回撤 ${o.dd}</span>
        </div>
      </div>
    </div>`;
  }).join("");

  const statusTone = reviewReject ? "red" : status === "WARN" ? "amber" : "green";
  const statusText = reviewReject
    ? "REJECT — Aladdin 提案与目标 / 约束不一致，不能进入执行"
    : status === "WARN"
      ? "WARN — Aladdin 提案可通过，但需附条件"
      : "PASS — Aladdin 提案与目标 / 约束一致";
  const statusNote = reviewReject
    ? "这不是 WARN：至少一项硬约束被击穿。请退回 Aladdin 重跑，或在下方选择 AI 参考方案并记录理由。"
    : status === "WARN"
      ? "可通过，但需在合规闸门附条件（美国税务顾问意见）。"
      : "可进入执行；仍建议在合规闸门复核披露与适当性。";

  const reviewRows = variant.checks.map(k => [
    `<span class="strong">${k.name}</span><span class="sub mono">${k.id}</span>`,
    k.rule, `<span class="strong">${k.actual}</span>`,
    UI.pill(k.result, k.result === "PASS" ? "green" : k.result === "WARN" ? "amber" : "red"),
    `<span class="small">${k.note}</span>`, `<span class="mono tiny">${k.evidence}</span>`
  ]);

  const targetBy = {};
  variant.rows.forEach(r => { targetBy[r.asset] = (targetBy[r.asset] || 0) + r.target; });
  const currentBy = {};
  a.current.forEach(r => { currentBy[r.asset] = (currentBy[r.asset] || 0) + r.w; });
  const assetOrder = ["Single Stock (legacy)", "Global Equity", "Investment Grade Bonds", "Gold", "Cash", "Private Equity"];
  const targetRows = assetOrder.map(name => {
    const cur = currentBy[name] || 0;
    const tgt = targetBy[name] || 0;
    const band = variant.bands[name] || [0, 100];
    const out = tgt < band[0] || tgt > band[1];
    const delta = tgt - cur;
    const isExit = name === "Single Stock (legacy)";
    const statusLabel = isExit ? "退出" : out ? "越界" : Math.abs(delta) >= 5 ? "大幅调整" : "在区间";
    const tone = isExit ? "amber" : out ? "red" : Math.abs(delta) >= 5 ? "amber" : "green";
    return [name, `<span class="num">${cur}%</span>`, `<span class="num strong">${tgt}%</span>`, `${band[0]}–${band[1]}%`, `<span class="num ${delta < 0 ? "red" : "green"}">${delta > 0 ? "+" : ""}${delta}pp</span>`, UI.pill(statusLabel, tone)];
  });

  const header = `<div class="grid-4" style="gap:8px">
    ${UI.stat("Portfolio", a.portfolio, "Aladdin 组合", "")}
    ${UI.stat("Business Partner", a.businessPartner, "客户", "")}
    ${UI.stat("Container", a.container, "账户 / 容器", "")}
    ${UI.stat("IPS / Mandate", `${a.ips} · ${a.mandate}`, "政策与授权", "")}
    ${UI.stat("Base Ccy", a.baseCcy, "基准币种", "")}
    ${UI.stat("As of", variant.asOf, "Aladdin run", "")}
    ${UI.stat("Run ID", variant.runId, "CSV 版本", "")}
    ${UI.stat("AI 审阅", status, statusText, statusTone)}
  </div>`;

  const objectiveCard = `<div class="card"><div class="card-head"><div><h2>给 Aladdin 的目标</h2><p>文字目标 + 明确策略 / 取向；Aladdin 据此生成 SAA/TAA。</p></div><div class="spacer"></div>${UI.pill("已发送", "green")}</div>
    <div class="card-body">
      <div class="note blue" style="margin-bottom:8px">${UI.esc(a.objective)}</div>
      <div class="row">${a.constraints.map(x => `<span class="pill gray">${x.id} · ${x.label}</span>`).join("")}</div>
      <div class="divider"></div>
      <div class="grid-2" style="gap:8px">
        <div><div class="tiny muted">目标发送</div><div class="strong">${a.asOf}</div></div>
        <div><div class="tiny muted">Aladdin Run</div><div class="strong mono">${variant.runId}</div></div>
      </div>
      <button class="btn sm" style="margin-top:8px" data-action="toast" data-msg="目标已重新发送给 Aladdin（demo）">重新发送给 Aladdin</button>
    </div></div>`;

  const csvCard = `<div class="card"><div class="card-head"><div><h2>Aladdin Proposal CSV</h2><p>BlackRock Aladdin 输出；本项目只接收 CSV，不接 Aladdin UI。</p></div><div class="spacer"></div>${UI.pill(variant.asOf, "gray")}${UI.pill(`${variant.rows.length} 行`, "green")}</div>
    <div class="card-body">
      <div class="code-block" style="max-height:220px;overflow:auto">${UI.esc(variant.csv)}</div>
      <div class="divider"></div>
      ${UI.table(["资产", "子类", "目标", "区间", "Benchmark", "工具", "Ccy", "久期"], variant.rows.map(r => [
        `<span class="strong">${r.asset}</span>`, r.sub, `<span class="num strong">${r.target}%</span>`, `${r.min}–${r.max}%`, `<span class="small">${r.benchmark}</span>`, `<span class="small">${r.instrument}</span>`, r.ccy, r.duration + "y"
      ]), { compact: true })}
      <div class="row" style="margin-top:8px"><button class="btn sm" data-action="import-aladdin-csv">重新导入 CSV</button><span class="tiny muted">CSV 是唯一输入；AI 不改写 Aladdin 输出。</span></div>
    </div></div>`;

  const reviewCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><h2>AI 审阅：Aladdin 提案 vs 目标 / 约束</h2><p>AI 只做核对与解释，不改写 Aladdin 的 SAA/TAA。</p></div><div class="spacer"></div>${UI.pill(status, statusTone)}</div>
    <div class="card-body">
      <div class="note ${reviewReject ? "" : status === "WARN" ? "amber" : "green"}"><b>${statusText}</b><br>${statusNote}</div>
      <div style="margin-top:8px">${UI.table(["检查", "目标 / 规则", "Aladdin 实际", "结果", "说明", "证据"], reviewRows, { compact: true })}</div>
      <div class="note blue" style="margin-top:8px"><b>AI 结论：</b>${variant.summary}</div>
      ${reviewReject && sel !== "P-ALADDIN" ? `<div class="note amber" style="margin-top:8px"><b>当前选择：</b>${sel}（AI 参考）。Aladdin 被 REJECT；继续将按 AI 参考方案执行，需 RM 记录理由。</div>` : ""}
      <div class="row" style="margin-top:8px">
        <button class="btn ${reviewReject ? "" : "primary"}" data-action="select-proposal" data-id="P-ALADDIN" ${reviewReject ? "disabled" : ""}>${reviewReject ? "REJECT：不可采用" : sel === "P-ALADDIN" ? "已采用 Aladdin 提案" : "采用 Aladdin 提案"}</button>
        <button class="btn" data-action="toast" data-msg="已退回 Aladdin；请修改目标或重新优化（demo）">退回 Aladdin</button>
        <button class="btn sm" data-action="aladdin-variant" data-id="${variant.id === "aligned" ? "conflict" : "aligned"}">${variant.id === "aligned" ? "载入不一致示例" : "载入一致示例"}</button>
        <span class="tiny muted" style="margin-left:auto">REJECT 是硬阻断；WARN 需附条件。</span>
      </div>
    </div></div>`;

  const aladdinProposalCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><div class="row"><span class="pill red">Aladdin 推荐</span><span class="tiny muted">${variant.runId}</span></div><h2 style="margin-top:5px">${aladdinOption.name}</h2><p>${reviewReject ? "Aladdin 本次输出与目标 / 约束不一致；不能采用，请退回 Aladdin 或选择 AI 参考方案。" : aladdinOption.thesis}</p></div><div class="spacer"></div>${UI.pill(reviewReject ? "REJECT · 不可用" : sel === "P-ALADDIN" ? "已选择" : "待选择", reviewReject ? "red" : sel === "P-ALADDIN" ? "green" : "gray")}</div>
    <div class="card-body tight">
      ${header}
      <div class="divider"></div>
      ${UI.table(["资产", "当前", "Aladdin 目标", "政策区间", "变化", "状态"], targetRows, { compact: true })}
      <div class="row" style="margin-top:9px">
        <button class="btn ${sel === "P-ALADDIN" ? "primary" : ""}" data-action="select-proposal" data-id="P-ALADDIN" ${reviewReject ? "disabled" : ""}>${reviewReject ? "REJECT：不可采用" : sel === "P-ALADDIN" ? "已采用" : "采用 Aladdin 提案"}</button>
        <button class="btn sm" data-action="continue-proposal" ${selectedBlocked ? "disabled" : ""}>查看执行蓝图</button>
        <span class="tiny muted" style="margin-left:auto">SAA/TAA 来自 Aladdin；执行层只做落地，不改目标。</span>
      </div>
    </div></div>`;

  const aiSection = `<div class="card" style="margin-top:10px"><div class="card-head"><div><div class="row"><span class="pill purple">AI 参考</span><span class="tiny muted">不替代 Aladdin SAA/TAA</span></div><h2 style="margin-top:5px">AI 参考方案</h2><p>保留为备选；若采用，需 RM 记录理由并重新走合规。</p></div><div class="spacer"></div><button class="btn sm" data-action="generate-proposals">${gen ? "重新生成" : "生成 AI 参考"}</button></div>
    <div class="card-body">${aiCards}</div></div>`;

  const tesCard = `<div class="card" style="margin-top:10px"><div class="card-head"><div><h2>TES 比较（仅 AI 参考之间）</h2><p>Aladdin 提案不参与 TES 排名；TES 只辅助 AI 备选比较。</p></div></div><div class="card-body">
    ${UI.bars(p.options.map(o => ({ label: o.name, value: App.tes(o.subs), display: App.tes(o.subs), color: o.id === "P-A" ? "var(--red)" : o.id === "P-B" ? "var(--blue)" : "var(--amber)" })), 100)}
    <div class="tiny muted" style="margin-top:6px">A 胜在成本/时间/冲击；B 胜在可执行性；C 只在票息与无冲击上占优。建议组合而不是三选一。</div>
    <div class="note amber" style="margin-top:7px"><b>实质持平：</b>P-A 86.9 vs P-B 86.4，差 0.5 < 2。TES 只辅助比较，不自动决定推荐；请由 RM 记录选择理由。</div>
  </div></div>`;

  const details = `<details class="card" style="margin-top:10px"><summary style="padding:12px 14px;cursor:pointer;font-weight:700">目标、资金结构与模板（已发送给 Aladdin）</summary><div class="card-body">
    <div class="grid-2">
      <div>${objectiveFormCard}</div>
      <div>${fundingCard}${constraintsCard}${templatesCard}</div>
    </div>
  </div></details>`;

  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · Aladdin 提案`,
    title: "提案工作室",
    sub: `${c.name} · SAA/TAA 来自 BlackRock Aladdin；AI 对照目标 / 约束审阅。Aladdin 推荐在上，AI 参考在下。`,
    actions: `${UI.pill(`Aladdin ${variant.runId}`, "blue")}${UI.pill(`Aladdin ${status}`, statusTone)}
      <button class="btn" data-action="run-aladdin-review">运行 AI 审阅</button>
      <button class="btn primary" data-action="continue-proposal" ${selectedBlocked ? "disabled" : ""}>送合规闸门</button>`
  }) + `
  <div class="stepper">
    <span class="step done"><b>1</b> 目标</span>
    <span class="step done"><b>2</b> Aladdin CSV</span>
    <span class="step ${reviewReject ? "on" : "done"}"><b>3</b> AI 审阅</span>
    <span class="step ${sel ? "done" : "on"}"><b>4</b> 选择</span>
    <span class="step"><b>5</b> 合规</span>
    <span class="step"><b>6</b> 签署</span>
  </div>
  <div class="grid-2-1">
    ${objectiveCard}
    ${csvCard}
  </div>
  ${reviewCard}
  ${aladdinProposalCard}
  ${aiSection}
  ${tesCard}
  ${details}
  `;
};

RENDER["m1-execution"] = () => {
  if (App.proposalBlocked()) {
    return UI.pageHead({
      crumb: `<b>M1</b> · Proposal Studio · 执行层`,
      title: "执行蓝图",
      sub: "Aladdin 提案被 AI REJECT，不能进入执行。",
      actions: `<button class="btn primary" data-action="go" data-page="m1-proposal">回到提案工作室</button>`
    }) + `<div class="card"><div class="empty" style="padding:36px 24px">
      <div class="strong" style="font-size:14px;color:var(--red)">REJECT — Aladdin 提案与目标 / 约束不一致</div>
      <div class="small muted" style="margin:6px auto 12px;max-width:440px">不能生成执行蓝图。请退回 Aladdin 重跑，或在提案页选择 AI 参考方案。</div>
      <button class="btn primary" data-action="go" data-page="m1-proposal">回到提案工作室</button>
    </div></div>`;
  }
  const sel = App.state.proposal.selected || "P-A";
  const lines = App.executionLines();
  const draft = App.isExecutionDraft();
  const v = App.currentVersion();
  const total = lines.reduce((a, l) => a + l.amt, 0);
  const wcost = total ? lines.reduce((a, l) => a + l.amt * l.cost, 0) / total : 0;
  const templated = lines.filter(l => l.tpl && l.tpl !== "—").length;
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · 执行层`,
    title: "执行蓝图",
    sub: `已选 ${sel} · 提案 v${v}。每一行都必须有模板、标的、资金账户与适当性记录；行级变化超阈值会回到提案层。`,
    actions: `${UI.pill(draft ? "草案 · 待交易台确认" : `${sel === "P-ALADDIN" ? "Aladdin 快照" : "P-A 快照"} · v${v}`, draft ? "amber" : "blue")}
      <button class="btn" data-action="toast" data-msg="交易前模拟已运行：预计滑点 6.4 bps，现金流 T+0 为 −$17.6m">运行交易前模拟</button>
      <button class="btn primary" data-action="go" data-page="m1-compliance">送合规闸门</button>`
  }) + `
  <div class="grid-4">
    ${UI.stat("组合金额", UI.money(total), lines.length + " 行", "")}
    ${UI.stat("预估全口径成本", wcost.toFixed(1) + " bps", "含佣金/点差/冲击/基金 OCF", "green")}
    ${UI.stat("相对提案层偏差", draft ? "待确认" : "0.0%", draft ? "草案未锁定" : "成本 +0.1 bps", draft ? "amber" : "green")}
    ${UI.stat("资金状态", draft ? "待校验" : "已校验", draft ? "草案需交易台确认" : "T+0 缺口 $0", draft ? "amber" : "green")}
  </div>
  ${draft ? `<div class="note amber" style="margin-top:10px"><b>草案：</b>${sel} 的逐行蓝图由提案腿生成；数量、venue、限价、税基待交易台确认。当前 demo 只有 P-A 提供完整执行快照。</div>` : ""}
  <div class="note ${templated === lines.length ? "green" : "amber"}" style="margin-top:10px"><b>完整性检查：</b>${templated}/${lines.length} 行有模板；${lines.length}/${lines.length} 行有资金账户；0 行触发 re-proposal；0 行命中限制名单。${draft ? "草案成本/权重待交易台确认。" : "成本 +0.1 bps、权重偏离 0.0pp，均在阈值内。"}</div>
  <div class="note blue" style="margin-top:10px"><b>层级：</b>SAA/TAA（提案层）→ 执行蓝图（工具/模板层，${lines.length} 行）→ 订单计划（${draft ? "待交易台确认" : "10 个母单 / 16 个子单"}）→ TCA。订单与 TCA 页展示实际拆单。</div>
  <div class="card" style="margin-top:10px">
    <div class="card-head"><div><h2>逐行蓝图</h2><p>点击任意行查看完整字段（TIF、结算、税基、适当性、审批）。</p></div><div class="spacer"></div><span class="pill ${draft ? "amber" : "blue"}">${draft ? "草案" : "版本"} v${v}</span></div>
    ${UI.table([
      "#", "模板", "标的 / ISIN", "动作", "数量", "金额", "权重", "venue", "类型", "限价", "时点", "成本 bps（首年/年化）", "税基", "资金", "状态"
    ], lines.map(l => [
      `<span class="mono">${l.no}</span>`,
      `<span class="mono">${l.tpl}</span>`,
      `<span class="strong">${l.inst}</span><span class="sub mono">${l.isin}</span>`,
      `<b>${l.act}</b>`, `<span class="num">${l.qty}</span>`, `<span class="num">${UI.money(l.amt)}</span>`, `<span class="num">${l.w}%</span>`,
      l.venue, l.type, l.limit, l.timing, `<span class="num">${l.cost} bps</span>`, l.taxLot, `<span class="mono">${l.funding}</span>`,
      UI.pill(l.status, l.status === "Ready" ? "green" : "amber")
    ]), { compact: true })}
    <div class="card-foot"><span class="tiny muted">行级变更规则：成本 +20bps / 权重 +2pp / 风险等级上升 → 回到提案层。</span><div style="flex:1"></div><button class="btn sm" data-action="toast" data-msg="已保存执行蓝图 v${v}">保存</button></div>
  </div>
  <div class="grid-3" style="margin-top:10px">
    <div class="card"><div class="card-body"><div class="tiny muted">提案层 → 执行层</div><div class="strong" style="margin:4px 0">${draft ? "草案：按提案腿展开" : "没有偏离，只有落地"}</div><div class="small muted">${draft ? `选 ${sel} 后，执行层按提案腿生成 ${lines.length} 行草案；数量、venue、限价、税基待交易台确认。` : sel === "P-ALADDIN" ? "Aladdin 提案：38% 债券阶梯拆成 6 个梯级；42% 全球综合债 UCITS 拆成 2 个基金订阅；黄金 8% 与现金 12% 各 1 行。下单时再拆成 10 个母单 / 16 个子单。" : "选 A 后，执行层把 38% 债券阶梯拆成 6 个梯级；UCITS 42% 拆成 2 个基金订阅；黄金 8% 与现金 12% 各 1 行。下单时再拆成 10 个母单 / 16 个子单。"}</div></div></div>
    <div class="card"><div class="card-body"><div class="tiny muted">成本</div><div class="strong" style="margin:4px 0">${wcost.toFixed(1)} bps</div><div class="small muted">${draft ? "按提案层成本估算；佣金/点差/冲击/OCF 未拆分。" : "佣金 3.1 / 点差 4.2 / 冲击 3.6 / 托管 1.5 / 基金 OCF 8.7。与提案层 21.0 bps 偏差 +0.1。"}</div></div></div>
    <div class="card"><div class="card-body"><div class="tiny muted">审批</div><div class="strong" style="margin:4px 0">RM → IC → Compliance</div><div class="small muted">${draft ? `${sel} 的合规快照未生成；demo 仅提供 P-A 的 10 项检查。` : "T2 双人复核；美国遗产税 WARN 需 Compliance 附条件通过。"}</div></div></div>
  </div>`;
};

RENDER["m1-compliance"] = () => {
  if (App.proposalBlocked()) {
    return UI.pageHead({
      crumb: `<b>M1</b> · Proposal Studio · 合规闸门`,
      title: "合规闸门",
      sub: "Aladdin 提案被 AI REJECT，不能进入合规 / 执行。",
      actions: `<button class="btn primary" data-action="go" data-page="m1-proposal">回到提案工作室</button>`
    }) + `<div class="card"><div class="empty" style="padding:36px 24px">
      <div class="strong" style="font-size:14px;color:var(--red)">REJECT — Aladdin 提案与目标 / 约束不一致</div>
      <div class="small muted" style="margin:6px auto 12px;max-width:440px">合规闸门不接收 REJECT 的 Aladdin 提案。请退回 Aladdin 重跑，或在提案页选择 AI 参考方案。</div>
      <button class="btn primary" data-action="go" data-page="m1-proposal">回到提案工作室</button>
    </div></div>`;
  }
  const s = App.state.compliance || {};
  const v = App.currentVersion();
  const p = App.currentProposal();
  const approved = !!s.approved && s.approvedVersion === v;
  const signed = !!s.esign && s.signedVersion === v;
  const ready = App.orderReady();
  const snapshotReady = App.complianceSnapshotReady();
  const warn = DB.checks.filter(x => x.sev === "WARN").length;
  const pass = DB.checks.filter(x => x.sev === "PASS").length;
  const head = UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · 合规闸门`,
    title: "合规闸门",
    sub: "四维规则在生成阶段就约束输出；BLOCK 不可覆盖，WARN 需指定审批人并附条件。",
    actions: `${UI.pill(`提案 ${p.id} · v${v}`, "blue")}
      <button class="btn" data-action="toast" data-msg="已导出检查底稿（PDF）">导出底稿</button>
      <button class="btn primary" data-action="create-order" ${ready ? "" : "disabled"} title="${ready ? "创建订单" : "需同时满足：审批、电子签、同一版本"}">创建订单</button>`
  });
  if (!snapshotReady) {
    return head + `<div class="card"><div class="empty" style="padding:36px 24px">
      <div class="strong" style="font-size:14px;color:var(--ink)">${p.id} 的合规快照尚未生成</div>
      <div class="small muted" style="margin:6px auto 12px;max-width:440px">demo 目前只提供 P-A 的完整合规快照。切换到 P-B / P-C 后，原审批与签署会失效；请回到 P-A 演示下单链路。</div>
      <button class="btn primary" data-action="select-proposal" data-id="P-A">切换回 P-A</button>
    </div></div>`;
  }
  return head + `
  <div class="grid-4">
    ${UI.stat("检查项", DB.checks.length, "10 项", "")}
    ${UI.stat("PASS", pass, "无阻断", "green")}
    ${UI.stat("WARN", warn, "需附条件审批", "amber")}
    ${UI.stat("BLOCK", 0, "无", "green")}
  </div>
  <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>放行条件</h2><p>三项必须同时满足；任一变化即失效。</p></div></div><div class="card-body">
    <div class="release-grid">
      <div class="release-item">${UI.pill(approved ? "已通过" : "待审批", approved ? "green" : "amber")}<div class="small strong" style="margin-top:4px">WARN 附条件审批</div><div class="tiny muted">v${v}</div></div>
      <div class="release-item">${UI.pill(signed ? "已签署" : "待客户", signed ? "green" : "amber")}<div class="small strong" style="margin-top:4px">客户电子签署</div><div class="tiny muted">v${v}</div></div>
      <div class="release-item">${UI.pill(approved && signed ? "版本一致" : "未锁定", approved && signed ? "green" : "gray")}<div class="small strong" style="margin-top:4px">提案版本</div><div class="tiny muted">当前 v${v}</div></div>
    </div>
    ${ready ? `<div class="note green" style="margin-top:8px">已满足放行条件，可创建订单。</div>` : `<div class="note amber" style="margin-top:8px">${!approved ? "先完成 WARN 附条件审批。" : !signed ? "等待客户电子签署。" : "提案版本已变化，审批/签署已失效。"}</div>`}
  </div></div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card">
      <div class="card-head"><div><h2>检查结果</h2><p>规则版本 2026.10.3 · 输入快照已锁定</p></div><div class="spacer"></div>${approved ? UI.pill("已附条件通过", "green") : UI.pill("待审批", "amber")}</div>
      ${UI.table(["检查", "结果", "规则", "说明", "证据", ""], DB.checks.map(k => [
        `<span class="strong">${k.name}</span><span class="sub">${k.id}</span>`,
        UI.pill(k.sev, k.sev === "PASS" ? "green" : k.sev === "WARN" ? "amber" : "red"),
        `<span class="mono">${k.rule}</span>`, `<span class="small">${k.msg}</span>`,
        `<span class="mono tiny">${k.evidence}</span>`,
        k.sev === "WARN" ? (approved ? `<span class="tiny green">已通过 v${v}</span>` : `<button class="btn sm" data-action="approve-warn">附条件通过</button>`) : `<span class="tiny muted">—</span>`
      ]), { compact: true })}
    </div>
    <div>
      <div class="card"><div class="card-head"><div><h2>审批链</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="when">09:04</div><div class="what">RM 提交提案 v${v}</div><div class="who">Alex Chan</div></div>
          <div class="tl-item"><div class="when">09:06</div><div class="what">IC 复核配置与假设</div><div class="who">Grace Lin · 已签</div></div>
          <div class="tl-item"><div class="when">09:08</div><div class="what">${approved ? "Compliance 附条件通过" : "Compliance 待审批"}</div><div class="who">${approved ? `Compliance · v${v} · 条件：美国税务顾问意见` : "Compliance"}</div></div>
          <div class="tl-item"><div class="when">${signed ? "09:12" : "—"}</div><div class="what">客户电子签署</div><div class="who">${signed ? `Client · 已签署 v${v}` : approved ? "待客户" : "未开始"}</div></div>
        </div>
        <div class="divider"></div>
        <button class="btn" style="width:100%" data-action="esign" ${signed ? "disabled" : ""}>${signed ? `已签署 v${v}` : `客户电子签署 v${v}`}</button>
        <div class="tiny muted" style="margin-top:6px">demo 由当前操作者模拟客户签署；生产环境应由 Client 角色/客户设备完成。</div>
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">附条件</div>
        <div class="small strong" style="margin:4px 0">美国遗产税暴露</div>
        <div class="small muted">美国国债为美国 situs 资产；非居民免税额仅 6 万美元。条件：客户在放款/下单前取得美国税务顾问书面意见；否则改用爱尔兰 UCITS。</div>
      </div></div>
    </div>
  </div>
  <div class="note" style="margin-top:10px"><b>红线：</b>BLOCK 不提供“强制通过”按钮；WARN 只能由 IC / Compliance 在授权范围内附条件批准，且带到期日。每次检查写 EvidenceEvent（规则版本 + 输入快照）。</div>`;
};

RENDER["m1-orders"] = () => {
  const parents = DB.orders;
  const children = DB.childOrders || [];
  const tradedParents = parents.filter(o => o.strategy !== "TIME DEPOSIT");
  const tradedQty = tradedParents.reduce((a, o) => a + o.qty, 0);
  const tradedFilled = tradedParents.reduce((a, o) => a + o.filled, 0);
  const fillRate = tradedQty ? tradedFilled / tradedQty * 100 : 0;
  const filledCount = parents.filter(o => o.status === "Filled").length;
  const partialCount = parents.filter(o => o.status === "Partial").length;
  const childPartial = children.filter(o => o.status === "Partial").length;
  const ready = App.orderReady();
  const blocked = App.proposalBlocked();
  return UI.pageHead({
    crumb: `<b>M1</b> · Proposal Studio · 订单`,
    title: "订单与 TCA",
    sub: "执行蓝图是工具/模板层；落到订单层会拆成多个母单与子单，再按 venue、币种、交收与 tax lot 分别执行。",
    actions: `${UI.pill(`提案 ${App.state.proposal.selected || "P-A"} · v${App.currentVersion()}`, "blue")}
      <button class="btn" data-action="toast" data-msg="TCA 已生成：IS 8.4 bps，优于预估 10 bps">生成 TCA</button>
      <button class="btn" data-action="toast" data-msg="客户成本报告已生成（watermarked PDF）">导出成本报告</button>`
  }) + `
  ${ready ? "" : `<div class="note amber" style="margin-top:10px"><b>demo 提示：</b>当前未满足放行条件（审批 / 签署 / 同一版本 / P-A 快照）；本页仍展示订单与 TCA，生产环境会阻断。</div>`}
  ${blocked ? `<div class="note" style="margin-top:10px"><b>REJECT：</b>当前 Aladdin 提案被 AI REJECT；以下为历史订单演示，不代表本提案可执行。</div>` : ""}
  <div class="grid-4">
    ${UI.stat("母单 / 子单", parents.length + " / " + children.length, filledCount + " 个母单已完成", "")}
    ${UI.stat("成交率", fillRate.toFixed(2) + "%", `${partialCount} 笔母单 / ${childPartial} 笔子单部分成交`, "amber")}
    ${UI.stat("Implementation Shortfall", DB.tca.is + " bps", "预估 10.0 bps", "green")}
    ${UI.stat("交易成本", "$24,800", "12.4 bps × $20m（不含 OCF）", "")}
  </div>
  <div class="note blue" style="margin-top:10px"><b>订单层级：</b>SAA/TAA → 执行蓝图 ${DB.execution.length} 行 → ${parents.length} 个母单 / ${children.length} 个子单 → TCA。产品名称为示例；ISIN/CUSIP 仅用于演示，实际以发行文件/交易确认书为准。</div>
  <div class="card" style="margin-top:10px">
    <div class="card-head"><div><h2>母单</h2><p>按执行蓝图逐行建单；RFQ / SUBSCRIBE / LIMIT / TIME DEPOSIT 分开。</p></div><div class="spacer"></div>${UI.pill(`${filledCount} 完成 / ${partialCount} 部分`, partialCount ? "amber" : "green")}</div>
    ${UI.table(["母单", "标的", "方向", "数量", "已成交", "均价", "基准", "滑点", "场所 / 策略", "交收", "状态"], parents.map(o => [
      `<span class="mono">${o.id}</span>`,
      `<span class="strong">${o.inst}</span>`,
      o.side,
      `<span class="num">${UI.num(o.qty)}</span>`, `<span class="num">${UI.num(o.filled)}</span>`,
      `<span class="num">${o.avg.toFixed(2)}</span>`, `<span class="num">${o.bench.toFixed(2)}</span>`,
      `<span class="num ${o.slip > 3 ? "amber" : "green"}">${o.slip.toFixed(1)} bps</span>`,
      `<span class="small">${o.venue}</span><span class="sub mono">${o.strategy}</span>`,
      o.settle,
      UI.pill(o.status, o.status === "Filled" ? "green" : "amber")
    ]), { compact: true })}
  </div>
  <div class="card" style="margin-top:10px">
    <div class="card-head"><div><h2>子单 / 成交</h2><p>母单按 venue、RFQ 对手方、基金 dealing 窗口与交收日拆成子单。</p></div><div class="spacer"></div><span class="pill amber">${childPartial} 笔部分成交</span></div>
    ${UI.table(["子单", "母单", "场所", "类型", "数量", "已成交", "均价", "滑点", "时间", "状态"], children.map(c => {
      const p = parents.find(x => x.id === c.parent);
      return [
        `<span class="mono">${c.id}</span>`, `<span class="mono">${c.parent}</span>`, c.venue,
        p ? p.strategy : "—",
        `<span class="num">${UI.num(c.qty)}</span>`, `<span class="num">${UI.num(c.filled)}</span>`,
        `<span class="num">${c.avg.toFixed(2)}</span>`,
        `<span class="num ${c.slip > 3 ? "amber" : "green"}">${c.slip.toFixed(1)} bps</span>`,
        `<span class="mono tiny">${c.time}</span>`,
        UI.pill(c.status, c.status === "Filled" ? "green" : "amber")
      ];
    }), { compact: true })}
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>成本瀑布</h2></div></div><div class="card-body">
      ${UI.bars([
        { label: "佣金", value: 31, display: DB.tca.commission.toFixed(1) + " bps", color: "var(--blue)" },
        { label: "点差", value: 42, display: DB.tca.spread.toFixed(1) + " bps", color: "var(--purple)" },
        { label: "冲击", value: 36, display: DB.tca.impact.toFixed(1) + " bps", color: "var(--amber)" },
        { label: "托管/平台", value: 15, display: DB.tca.custody.toFixed(1) + " bps", color: "var(--green)" }
      ], 60)}
      <div class="divider"></div><div class="row between"><span class="small muted">交易成本（不含基金 OCF）</span><span class="strong">${DB.tca.transactionCost.toFixed(1)} bps</span></div>
      <div class="row between"><span class="small muted">基金 OCF</span><span class="strong">${DB.tca.fundOcf.toFixed(1)} bps</span></div>
      <div class="row between"><span class="small muted">全口径（含 OCF）</span><span class="strong">${DB.tca.allIn.toFixed(1)} bps</span></div>
      <div class="tiny muted" style="margin-top:4px">21.1 bps × $20m ≈ $42.2k（含基金 OCF）</div>
    </div></div>
    <div class="card"><div class="card-head"><div><h2>交收 / 资金 / 回写</h2><p>交收状态、资金使用与 TCA 回写模板。</p></div></div><div class="card-body">
      <div class="grid-2" style="gap:8px">
        <div><div class="tiny muted">交收</div><div class="strong">${DB.tca.settled} 已完成 / ${DB.tca.pending} 待交收</div></div>
        <div><div class="tiny muted">失败</div><div class="strong">${DB.tca.failed} 笔</div></div>
        <div><div class="tiny muted">已用资金</div><div class="strong">${UI.money(DB.tca.cashUsed)}</div></div>
        <div><div class="tiny muted">剩余现金</div><div class="strong">${UI.money(DB.tca.cashResidual)}</div></div>
      </div>
      <div class="divider"></div>
      ${UI.table(["模板", "预估", "实际", "偏差"], [
        ["FI-LADDER-01", "4.0 bps", "4.4 bps", `<span class="amber">+0.4</span>`],
        ["FD-UCITS-01", "42.0 bps", "41.2 bps", `<span class="green">−0.8</span>`],
        ["EQ-CASH-01", "25.0 bps", "27.1 bps", `<span class="amber">+2.1</span>`],
        ["CASH-01", "0.0 bps", "0.0 bps", `<span class="green">0.0</span>`]
      ], { compact: true })}
      <div class="tiny muted" style="margin-top:6px">偏差 >15% 自动创建复盘任务；本次未触发。TCA 回写模板与下一次提案。</div>
    </div></div>
  </div>`;
};

/* ───────── M2 ───────── */

const M2_STEPS = [
  ["m2-allocation", "配置"],
  ["m2-stress", "压力"],
  ["m2-backtest", "回测"],
  ["m2-decision", "决策"]
];

const m2Nav = (active) => {
  const idx = M2_STEPS.findIndex(([id]) => id === active);
  return `<div class="stepper" style="margin-bottom:10px">${M2_STEPS.map(([id, label], i) =>
    `<a class="step ${i < idx ? "done" : i === idx ? "on" : ""}" href="#/${id}" data-action="go" data-page="${id}"><b>${i + 1}</b>${label}</a>`
  ).join("")}</div>`;
};

RENDER["m2-allocation"] = () => {
  const a = DB.allocation;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · 配置`,
    title: "配置工作室",
    sub: "IPS 政策区间是硬约束；优化器只找可行解，不承诺最优。",
    actions: `<button class="btn" data-action="toast" data-msg="已按 25% 换手上限再做一次约束求解">再平衡</button>
      <button class="btn" data-action="go" data-page="m2-backtest">打开回测实验室</button>
      <button class="btn primary" data-action="go" data-page="m2-stress">运行压力测试</button>`
  }) + `
  ${m2Nav("m2-allocation")}
  <div class="grid-4">
    ${UI.stat("预期年化", UI.pct(a.expected), "10 年 CMA v2026.10", "")}
    ${UI.stat("年化波动", UI.pct(a.vol), "目标 ≤ 10%", "green")}
    ${UI.stat("压力回撤", UI.pct(a.dd), "股 −30% 情景", "amber")}
    ${UI.stat("Sharpe（估）", a.sharpe.toFixed(2), "无风险 3.2%", "")}
  </div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>战略配置</h2><p>6 类资产；现金 8% 覆盖 18 个月支出。</p></div></div><div class="card-body">
      ${UI.donut(a.buckets, "Total", UI.money(a.total))}
    </div></div>
    <div class="card"><div class="card-head"><div><h2>政策区间</h2><p>越界即阻断。</p></div></div>
      ${UI.table(["资产", "当前", "区间", "状态"], a.buckets.map(b => [
        b.name, `<b class="mono">${b.w}%</b>`, `${b.min}–${b.max}%`,
        UI.pill(b.w >= b.min && b.w <= b.max ? "在区间" : "越界", b.w >= b.min && b.w <= b.max ? "green" : "red")
      ]), { compact: true })}
    </div>
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>约束与绑定项</h2></div></div><div class="card-body">
      <div class="two-col-list">
        <div>现金 ≥ 8% <span class="pill green">binding</span></div>
        <div>单一发行人 ≤ 15% <span class="pill green">ok</span></div>
        <div>非美元 ≤ 25% <span class="pill amber">binding</span></div>
        <div>换手 ≤ 25% <span class="pill green">ok</span></div>
        <div>私募 ≤ 15% <span class="pill green">ok</span></div>
        <div>波动 ≤ 10% <span class="pill green">ok</span></div>
      </div>
      <div class="note blue" style="margin-top:8px"><b>方法：</b>Black-Litterman + 约束求解；CMA v2026.10；重抽样 1,000 次。约束越硬，结果越像“可行解搜索”，不是“最优解”。</div>
    </div></div>
    <div class="card"><div class="card-head"><div><h2>与当前组合差异</h2></div></div><div class="card-body">
      ${UI.table(["资产", "当前", "目标", "变化"], [
        ["现金", "14%", "8%", `<span class="red">−6pp</span>`],
        ["投资级债", "22%", "35%", `<span class="green">+13pp</span>`],
        ["全球股票", "38%", "30%", `<span class="red">−8pp</span>`],
        ["另类", "12%", "15%", `<span class="green">+3pp</span>`],
        ["黄金", "2%", "5%", `<span class="green">+3pp</span>`],
        ["私募", "12%", "7%", `<span class="red">−5pp</span>`]
      ], { compact: true })}
      <div class="tiny muted" style="margin-top:6px">预估换手 18%；税负 $42k；实施成本 14 bps。</div>
    </div></div>
  </div>`;
};

RENDER["m2-stress"] = () => {
  const active = App.state.stressScenario || "eq";
  const s = DB.stress.find(x => x.id === active) || DB.stress[0];
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · 压力`,
    title: "压力测试",
    sub: "回答“最疼会疼到哪里”，而不是“最坏会怎样”。相关性在危机中上升。",
    actions: `${UI.pill("演示数据 · 非实时", "amber")}
      <button class="btn" data-action="toast" data-msg="已运行全部 6 个情景（异步，耗时 3.2s）">运行全部</button>
      <button class="btn" data-action="go" data-page="m2-backtest">查看回测</button>
      <button class="btn primary" data-action="go" data-page="m2-decision">生成决策卡</button>`
  }) + `
  ${m2Nav("m2-stress")}
  <div class="grid-4">
    ${UI.stat("组合损益", UI.pct(s.pnl), s.name, s.pnl < -15 ? "red" : "amber")}
    ${UI.stat("最大回撤", UI.pct(s.dd), "情景内", "amber")}
    ${UI.stat("T+7 可动用", s.t7 + "%", s.t7 < 10 ? "低于 10% 下限" : "高于下限", s.t7 < 10 ? "red" : "green")}
    ${UI.stat("追保估算", s.margin ? UI.money(s.margin) : "0", s.margin ? "需补保证金" : "无", s.margin ? "red" : "green")}
  </div>
  <div class="note amber" style="margin-top:10px"><b>演示：</b>以下 P&L / 回撤 / T+7 / 追保为静态情景数据；未接压力引擎，成本与税未建模。</div>
  <div class="grid-2-1" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>情景对比</h2><p>点击切换；情景为演示，成本/税未建模。</p></div></div><div class="card-body">
      ${UI.bars(DB.stress.map(x => ({ label: x.name, value: Math.abs(x.pnl), display: UI.pct(x.pnl), color: x.id === active ? "var(--red)" : "var(--amber)" })), 25)}
      <div class="divider"></div>
      ${UI.table(["情景", "损益", "回撤", "T+7", "追保", "说明"], DB.stress.map(x => [
        `<button class="btn ghost sm" data-action="stress" data-id="${x.id}" style="padding:0;color:${x.id === active ? "var(--red)" : "var(--ink)"}">${x.name}</button>`,
        `<span class="num ${x.pnl < -15 ? "red" : ""}">${UI.pct(x.pnl)}</span>`, UI.pct(x.dd), x.t7 + "%", x.margin ? UI.money(x.margin) : "—", `<span class="tiny muted">${x.note}</span>`
      ]), { compact: true })}
    </div></div>
    <div>
      <div class="card"><div class="card-head"><div><h2>传导路径</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="what">股票 beta 0.92</div><div class="who">全球股票 −30% → 组合 −9.2%</div></div>
          <div class="tl-item"><div class="what">信用利差 +80bp</div><div class="who">IG 债 −3.1% → 组合 −1.1%</div></div>
          <div class="tl-item"><div class="what">相关性上升</div><div class="who">黄金对冲失效 → 额外 −1.8%</div></div>
          <div class="tl-item"><div class="what">流动性折价</div><div class="who">私募 gate → T+7 降至 21%</div></div>
        </div>
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">假设与局限</div>
        <div class="small muted" style="margin-top:4px">历史情景用实际价格；假设情景用因子映射；相关性在危机中可能高于模型。结果不是“最坏情况”，只是“如果这样”。</div>
      </div></div>
    </div>
  </div>`;
};

RENDER["m2-backtest"] = () => {
  const b = DB.backtest;
  const inc = App.state.includeCosts;
  const grossPoints = b.points;
  const netPoints = App.backtestSeries(true);
  const gross = App.backtestMetrics(grossPoints);
  const net = App.backtestMetrics(netPoints);
  const m = inc ? net : gross;
  const pts = inc ? netPoints : grossPoints;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · 回测`,
    title: "回测实验室",
    sub: "策略规则可复述；含成本（简化）、含样本外；不把回测当预测。",
    actions: `${UI.pill("演示 · 曲线与指标同源", "amber")}<button class="btn" data-action="go" data-page="m2-allocation">调整配置</button><div class="btn-group"><button class="${inc ? "on" : ""}" data-action="set-cost" data-id="1">含成本</button><button class="${inc ? "" : "on"}" data-action="set-cost" data-id="0">理论值</button></div>
      <button class="btn primary" data-action="go" data-page="m2-decision">生成决策卡</button>`
  }) + `
  ${m2Nav("m2-backtest")}
  <div class="grid-4">
    ${UI.stat("CAGR", UI.pct(m.cagr), inc ? "净（含成本）" : "毛（不含成本）", "")}
    ${UI.stat("Sharpe", m.sharpe.toFixed(2), "OOS " + b.oos.toFixed(2) + " · rf " + (b.rf * 100).toFixed(1) + "%", "")}
    ${UI.stat("最大回撤", UI.pct(m.dd), "2018–2026", "amber")}
    ${UI.stat("Deflated Sharpe", b.deflated.toFixed(2), "多重检验调整", "amber")}
  </div>
  <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>净值曲线</h2><p>60/40 + 10% 黄金 + 5% 趋势 overlay；季度再平衡。</p></div><div class="spacer"></div>${UI.pill(inc ? "含成本" : "理论值", inc ? "green" : "amber")}</div>
    <div class="card-body chart">
      ${UI.lineChart([{ name: inc ? "净" : "毛", color: "var(--red)", points: pts }], { height: 230, min: 80, max: 190, xLabels: ["2018", "2020", "2022", "2024", "2026"] })}
      <div class="tiny muted" style="margin-top:6px">曲线与指标同源：CAGR、年化波动、最大回撤、Sharpe 均由所选序列计算；含成本 = 毛序列扣除 ${(b.costDrag * 10000).toFixed(0)} bps/年成本；回测不是收益预测。</div>
    </div>
  </div>
  <div class="grid-2" style="margin-top:10px">
    <div class="card"><div class="card-head"><div><h2>指标</h2><p>毛 / 净两列同源；不是“设计值 + 另一条曲线”。</p></div></div><div class="card-body">
      ${UI.table(["指标", "毛（不含成本）", "净（含成本）", "门槛"], [
        ["CAGR", UI.pct(gross.cagr), UI.pct(net.cagr), "≥ 5%"],
        ["Sharpe", gross.sharpe.toFixed(2), net.sharpe.toFixed(2), "≥ 0.4"],
        ["年化波动", UI.pct(gross.vol), UI.pct(net.vol), "—"],
        ["Max DD", UI.pct(gross.dd), UI.pct(net.dd), "≥ −20%"],
        ["Turnover", b.turnover + "%", "—", "≤ 30%"],
        ["Hit rate", b.hit + "%", "—", "—"]
      ], { compact: true })}
    </div></div>
    <div class="card"><div class="card-head"><div><h2>局限与红旗</h2></div></div><div class="card-body">
      <div class="note amber"><b>过拟合检查：</b>参数扫描 24 组，Deflated Sharpe 0.43；样本内毛 Sharpe 0.65、净 0.48；OOS 0.51，未崩坏。</div>
      <div class="note" style="margin-top:7px"><b>数据：</b>PIT 财务/指数成分；退市标的保留；价格口径 split-adjusted；缺失值不 forward-fill。</div>
      <div class="tiny muted" style="margin-top:7px">样本期 ${b.period}；${b.points.length} 个季度点；Sharpe 按样本期平均无风险利率 ${(b.rf * 100).toFixed(1)}% 计算。</div>
      <div class="tiny muted" style="margin-top:4px">容量估算：按 20% ADV，策略容量约 $180m；超过后冲击成本非线性上升。</div>
    </div></div>
  </div>`;
};

RENDER["m2-decision"] = () => {
  const d = App.state.decision;
  return UI.pageHead({
    crumb: `<b>M2</b> · Quant Lab · 决策卡`,
    title: "RM 决策卡",
    sub: "把 20 页分析压缩成 RM 能在客户面前讲的 1 页；RM 决定怎么交付。",
    actions: `<button class="btn" data-action="go" data-page="m2-allocation">回到配置</button>
      <button class="btn" data-action="toast" data-msg="已生成客户版 PDF（watermarked）">生成客户版</button>
      <button class="btn primary" data-action="save-decision">保存决策</button>`
  }) + `
  ${m2Nav("m2-decision")}
  <div class="grid-2-1">
    <div class="card"><div class="card-head"><div><h2>客户问题</h2><p>“我不想卖太多股票，但需要分散，还要留现金。”— 陈志远，2026-10-20</p></div></div><div class="card-body">
      <div class="note green"><b>建议：</b>用 3 年把单一股票从 42% 降到 30%；每年减持不超过 7%；减持资金进入“债券阶梯 + 全球基金”；同时用 Lombard 覆盖前 18 个月流动性，避免在低点卖。</div>
      <div class="grid-3" style="margin-top:10px">
        ${UI.stat("方案 A", "快速降仓", "2 年 · 税负集中", "")}
        ${UI.stat("方案 B", "均衡（推荐）", "3 年 · 税负平滑", "green")}
        ${UI.stat("方案 C", "最小行动", "5 年 · 集中度仍在", "amber")}
      </div>
      ${UI.table(["", "方案 A", "方案 B", "方案 C"], [
        ["单一股票（3 年后）", "22%", "<b>30%</b>", "38%"],
        ["压力回撤（股 −30%）", "−22%", "<b>−15%</b>", "−19%"],
        ["税负（5 年累计）", "高", "<b>中</b>", "低"],
        ["流动性（T+7）", "24%", "<b>18%</b>", "14%"]
      ], { compact: true })}
      <div class="divider"></div>
      <div class="grid-2">
        <div><div class="tiny muted">什么会改变建议</div><div class="small">锁定期/窗口期、质押覆盖率 < 150%、估值下调 40%、税务居民身份变化。</div></div>
        <div><div class="tiny muted">主要风险</div><div class="small">估值下行、减持规则、税务居民身份变化、流动性。</div></div>
      </div>
      <div class="tiny muted" style="margin-top:7px">假设：CMA v2026.10；税率 20%；成本含佣金/点差/冲击；压力相关性上升。非收益预测。</div>
    </div></div>
    <div>
      <div class="card"><div class="card-head"><div><h2>RM 决策</h2><p>不采纳需写理由；交付方式由 RM 决定。</p></div></div><div class="card-body">
        <div class="stack">
          <label class="check"><input type="radio" name="decision" value="adopt" ${d === "adopt" ? "checked" : ""}> <span><b>采纳</b><small>按建议交付客户</small></span></label>
          <label class="check"><input type="radio" name="decision" value="modify" ${d === "modify" ? "checked" : ""}> <span><b>修改</b><small>调整后重新计算</small></span></label>
          <label class="check"><input type="radio" name="decision" value="reject" ${d === "reject" ? "checked" : ""}> <span><b>不采纳</b><small>仅内部参考，不生成客户材料</small></span></label>
        </div>
        <div class="divider"></div>
        ${UI.field({ label: "理由 / 保留意见", type: "textarea", rows: 3, value: "客户对锁定期敏感；建议先做 12 个月现金缓冲，再启动减持。", help: "不采纳时必填" })}
        ${UI.field({ label: "交付方式", type: "select", value: "面谈 + 摘要 PDF", options: ["面谈 + 完整 PDF", "面谈 + 摘要 PDF", "App 推送", "仅内部参考"] })}
      </div></div>
      <div class="card"><div class="card-body">
        <div class="tiny muted">信心</div><div class="strong" style="margin:3px 0">中</div>
        <div class="small muted">依赖估值与减持规则假设；税务居民身份变化会显著改变结论。</div>
      </div></div>
    </div>
  </div>`;
};
