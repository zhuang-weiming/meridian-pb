/* M5 + client / vendor / audit renderers */
(() => {
  const t = DB.tax;

  RENDER["m5-intake"] = () => UI.pageHead({
    crumb: `<b>M5</b> · Tax Optimization · 案件`,
    title: "税务优化案件",
    sub: "同一笔交易，怎么安排更省税；合法、可申报、可解释。RM 审核后交付。",
    actions: `<button class="btn" data-action="toast" data-msg="案件已创建；已锁定客户授权与数据范围">保存草稿</button>
      <button class="btn primary" data-action="go" data-page="m5-profile">开始画像</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("交易金额", UI.money(t.amount), t.trigger, "")}
      ${UI.stat("涉及法域", t.jurisdictions.length + " 个", t.jurisdictions.join(" / "), "")}
      ${UI.stat("复杂度", t.complexity, "多层实体 + 跨境", "amber")}
      ${UI.stat("目标", "合法优化", "不接受无实质结构", "green")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>案件范围</h2><p>不是“零税”，而是“税后结果 + 可辩护性”。</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "案件 ID", value: t.caseId, disabled: true })}
          ${UI.field({ label: "触发", type: "select", value: "港股减持 + 家办利润", options: ["港股减持 + 家办利润", "股权转让 + 分红", "减持", "重组", "迁居", "年结"] })}
          ${UI.field({ label: "交易金额", value: t.amount.toLocaleString("en-US"), suffix: "USD" })}
          ${UI.field({ label: "法域", value: "香港 / 新加坡 / BVI", help: "可多选；内部团队主导，外部律师按需" })}
          ${UI.field({ label: "客户目标", type: "textarea", rows: 2, value: t.target })}
          ${UI.field({ label: "内部预算 / 成本", value: "150,000", suffix: "USD" })}
          ${UI.field({ label: "主导团队", type: "select", value: "HSBC PB · Tax & Wealth Structuring", options: ["HSBC PB · Tax & Wealth Structuring", "未分配"] })}
          ${UI.field({ label: "复核 / 支持", type: "select", value: "HSBC 内部复核（如需外部律师，由 HSBC 协调）", options: ["HSBC 内部复核（如需外部律师，由 HSBC 协调）", "待定"] })}
        </div>
        <div class="note" style="margin-top:9px"><b>边界：</b>不做隐瞒收入、虚假信托、代持、伪造身份、虚假拆分；所有方案必须过 PB-560 反避税校验与内部复核。</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>五层结构</h2></div></div><div class="card-body">
        <div class="timeline">
          <div class="tl-item"><div class="what">L1 身份与居民</div><div class="who">谁是纳税人？协定？退出税？</div></div>
          <div class="tl-item"><div class="what">L2 簿记与实体</div><div class="who">账户/公司/信托在哪？实质？</div></div>
          <div class="tl-item"><div class="what">L3 交易形式</div><div class="who">股权 vs 资产；债权 vs 股权</div></div>
          <div class="tl-item"><div class="what">L4 时点与拆分</div><div class="who">年度/分期/亏损收割/商业目的</div></div>
          <div class="tl-item"><div class="what">L5 传承与合规</div><div class="who">信托/保险/FSIE/CRS/印花税</div></div>
        </div>
      </div></div>
    </div>`;

  RENDER["m5-profile"] = () => {
    const p = t.profile;
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 画像`,
      title: "税务画像 / Nexus",
      sub: "居民、实体、账户、资产不是一回事；BVI 账户不会改变客户居民身份。",
      actions: `<button class="btn" data-action="toast" data-msg="画像已保存；已校验 4 个居民身份字段">保存画像</button>
        <button class="btn primary" data-action="go" data-page="m5-baseline">生成基线税图</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("税务居民", p.residency.join(" / "), "住所：" + p.domicile, "")}
        ${UI.stat("在港天数", p.days["香港"] + " 天", "通常居住", "amber")}
        ${UI.stat("实体", p.entities.length, p.entities.map(e => e.jurisdiction).join(" / "), "")}
        ${UI.stat("账户", p.accounts.length, p.accounts.map(a => a.centre).join(" / "), "")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>Nexus 地图</h2><p>四者分离：客户 / 实体 / 账户 / 资产。</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div class="note blue"><b>客户居民</b><br>${p.residency.join(" / ")}<br><span class="tiny">300 天在香港</span></div>
            <div class="note"><b>实体居民</b><br>BVI / 香港 / 香港<br><span class="tiny">BVI 实质弱；HK 有人员</span></div>
            <div class="note amber"><b>账户所在地</b><br>香港 / 新加坡 / BVI<br><span class="tiny">CRS 可申报</span></div>
            <div class="note green"><b>资产所在地</b><br>BVI 股权 / 香港现金<br><span class="tiny">股权转让在香港交割</span></div>
          </div>
          <div class="tiny muted" style="margin-top:8px">结论：账户地不是税务居民地；BVI 不是“免税”标签。税务结果由四者共同决定。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>实体与实质</h2></div></div>
          ${UI.table(["实体", "法域", "角色", "实质", "备注"], p.entities.map(e => [
            `<b>${e.name}</b>`, e.jurisdiction, e.role, UI.pill(e.substance, e.substance === "强" ? "green" : e.substance === "中" ? "amber" : "red"), "需补文件/人员"
          ]), { compact: true })}
        </div></div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>账户</h2></div></div>
          ${UI.table(["中心", "银行", "类型", "币种", "市值"], p.accounts.map(a => [
            a.centre, a.bank, a.type, a.ccy, `<span class="num">${UI.money(a.value)}</span>`
          ]), { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>申报与 flow</h2></div></div><div class="card-body">
          <div class="row">${p.filings.map(f => `<span class="pill blue">${f}</span>`).join("")}</div>
          <div class="divider"></div>
          ${UI.table(["类型", "金额", "年度"], p.flows.map(f => [f.type, `<span class="num">${UI.money(f.amount)}</span>`, f.year]), { compact: true })}
        </div></div>
      </div>`;
  };

  RENDER["m5-baseline"] = () => {
    const b = t.baseline;
    const totalBase = b.filter(x => x.type !== "香港股票印花税").reduce((a, x) => a + x.base, 0);
    const totalCash = b.reduce((a, x) => a + x.cash, 0);
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 基线`,
      title: "基线税图",
      sub: "不优化时，每个事件交什么税、什么时候交、谁申报。",
      actions: `<button class="btn" data-action="toast" data-msg="基线已锁定；假设与数据版本已留痕">锁定基线</button>
        <button class="btn primary" data-action="go" data-page="m5-levers">选择杠杆</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("应税基数", UI.money(totalBase), b.length + " 个事件", "")}
        ${UI.stat("现金税负", UI.money(totalCash), "基线", "red")}
        ${UI.stat("有效税率", UI.pct(totalCash / totalBase * 100, 2), "加权", "amber")}
        ${UI.stat("合规成本", "$100k", "申报/内部复核", "")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>事件级税图</h2><p>这是“不做优化”的对照，不是建议。</p></div></div>
        ${UI.table(["事件", "纳税人", "税种", "税基", "税率", "现金税", "时点"], b.map(x => [
          `<b>${x.event}</b>`, x.taxpayer, x.type, `<span class="num">${UI.money(x.base)}</span>`, x.rate + "%", `<span class="num red">${UI.money(x.cash)}</span>`, x.timing
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>税负构成</h2></div></div><div class="card-body">
          ${UI.bars(b.map(x => ({ label: x.event, value: x.cash / 1000000, display: UI.money(x.cash), color: "var(--red)" })), 10)}
          <div class="tiny muted" style="margin-top:6px">现金税负集中在印花税 $0.36m 与家办利得税 $2.475m；港股资本利得与股息在 HK 不征税。印花税按交易额 $180m × 0.2% 计，不计入上方“应税基数”。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>基线假设</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>香港税务居民，地域来源</div><div>个人持有 + 香港家办</div><div>港股资本利得通常不征税</div><div>股息不征税</div>
            <div>印花税 0.1%/边</div><div>家办利得税 16.5%</div><div>未申请 FIHV 优惠</div><div>CRS 申报</div>
          </div>
          <div class="note amber" style="margin-top:8px"><b>不要跳过基线：</b>没有基线，就无法证明“优化”省了多少，也无法向内部税务团队/监管解释。</div>
        </div></div>
      </div>`;
  };

  RENDER["m5-levers"] = () => {
    const sel = App.state.taxLevers || ["L3", "L4", "L8"];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 杠杆`,
      title: "杠杆库",
      sub: "十条杠杆，每条都有适用条件与红旗；拆分/条约/信托最容易被稽查。",
      actions: `<button class="btn" data-action="toast" data-msg="已保存杠杆组合（3 条）">保存组合</button>
        <button class="btn primary" data-action="go" data-page="m5-scenarios">生成情景</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("可选杠杆", t.levers.length, "身份/簿记/实体/交易/工具/时点/拆分/条约/信托/融资", "")}
        ${UI.stat("已选", sel.length, "建议 3–5 条", "green")}
        ${UI.stat("高红旗", t.levers.filter(l => l.risk.includes("高")).length, "需内部复核", "red")}
        ${UI.stat("内部复核", "必须", "每案一份", "")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        ${t.levers.map(l => `<div class="card"><div class="card-body">
          <div class="row between"><div><span class="pill gray">${l.cat}</span> <span class="tiny mono">${l.id}</span></div>
            <label class="check"><input type="checkbox" data-action="toggle-lever" data-id="${l.id}" ${sel.includes(l.id) ? "checked" : ""}><span></span></label></div>
          <div class="strong" style="margin:5px 0 2px">${l.name}</div>
          <div class="small muted">适合：${l.fit}</div>
          <div class="row" style="margin-top:6px"><span class="pill ${l.impact === "高" ? "green" : "gray"}">影响 ${l.impact}</span><span class="pill ${l.risk.includes("高") ? "red" : l.risk.includes("中") ? "amber" : "green"}">风险 ${l.risk}</span></div>
          <div class="note amber" style="margin-top:6px;padding:5px 7px;font-size:9.5px">${l.flag}</div>
        </div></div>`).join("")}
      </div>`;
  };

  RENDER["m5-booking"] = () => {
    const rows = [
      { c: "香港", tax: "地域来源；利得税 8.25/16.5%", treaty: "广泛", cfc: "中", es: "中", crs: "是", cost: "$35k/年", score: 82 },
      { c: "新加坡", tax: "属地 + 豁免；17%", treaty: "广泛", cfc: "中", es: "中高", crs: "是", cost: "$45k/年", score: 80 },
      { c: "开曼", tax: "无直接税", treaty: "少", cfc: "高", es: "弱", crs: "是", cost: "$25k/年", score: 58 },
      { c: "BVI", tax: "无直接税", treaty: "少", cfc: "高", es: "弱", crs: "是", cost: "$18k/年", score: 52 },
      { c: "卢森堡", tax: "公司税 + 预提", treaty: "很广", cfc: "低", es: "强", crs: "是", cost: "$80k/年", score: 74 },
      { c: "爱尔兰", tax: "12.5% / 基金", treaty: "很广", cfc: "低", es: "强", crs: "是", cost: "$70k/年", score: 76 }
    ];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 簿记`,
      title: "簿记 / 实体比较",
      sub: "开曼 ≠ 免税；账户所在地、实体居民、资产所在地、客户居民是四件事。",
      actions: `<button class="btn primary" data-action="go" data-page="m5-scenarios">用于情景</button>`
    }) + `
      <div class="card"><div class="card-head"><div><h2>法域对比</h2><p>分数不是税率；含实质、条约、CRS、成本、声誉。</p></div></div>
        ${UI.table(["法域", "税制", "协定", "CFC", "实质", "CRS", "年成本", "评分"], rows.map(r => [
          `<b>${r.c}</b>`, `<span class="small">${r.tax}</span>`, r.treaty, r.cfc, r.es, r.crs, r.cost, `<b class="${r.score < 60 ? "red" : "green"}">${r.score}</b>`
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-body"><div class="tiny muted">开曼特别说明</div><div class="strong" style="margin:4px 0">不是“免税账户”</div><div class="small muted">开曼是簿记/基金设立地；是否应税取决于客户居民、实体居民、资产所在地、CRS 与实质。无实质的控股公司容易被 CFC/受益所有权/经济实质规则击穿。</div></div></div>
        <div class="card"><div class="card-body"><div class="tiny muted">推荐</div><div class="strong" style="margin:4px 0">香港控股 + 实质（A 方案）</div><div class="small muted">有人员/办公/决策；条约可用；CRS 可申报；成本可控。开曼只作为基金/持股载体，不做“避税”卖点。</div></div></div>
      </div>`;
  };

  RENDER["m5-scenarios"] = () => {
    const sel = App.state.taxScenario || "A";
    const s = t.scenarios.find(x => x.id === sel) || t.scenarios[1];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 情景`,
      title: "情景比较",
      sub: "税后现金、有效税率、成本、风险、可辩护性；不是只按税率排序。",
      actions: `<button class="btn" data-action="toast" data-msg="已导出情景对比（含假设）">导出</button>
        <button class="btn primary" data-action="go" data-page="m5-substance">运行反避税校验</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("基线有效税率", t.scenarios[0].rate.toFixed(2) + "%", "个人持有 + 家办", "amber")}
        ${UI.stat("当前方案", s.id, s.name, "")}
        ${UI.stat("税后现金", UI.money(s.afterTax), "基线 " + UI.money(t.scenarios[0].afterTax), "green")}
        ${UI.stat("可辩护性", s.defend + "/100", s.result, s.result === "REJECT" ? "red" : "amber")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>四套情景</h2><p>点击选择；REJECT 不进入内部复核/RM。</p></div></div>
        ${UI.table(["", "方案", "杠杆", "税后现金", "有效税率", "成本", "风险", "可辩护", "评分", "结果"], t.scenarios.map(x => [
          `<input type="radio" name="scenario" ${x.id === sel ? "checked" : ""} data-action="select-scenario" data-id="${x.id}">`,
          `<b>${x.name}</b><span class="sub">${x.note}</span>`, x.levers.join(" / ") || "—",
          `<span class="num">${UI.money(x.afterTax)}</span>`, x.rate + "%", UI.money(x.cost), x.risk, x.defend, `<b>${x.score}</b>`,
          UI.pill(x.result, x.result === "PASS" ? "green" : x.result === "CONDITIONAL" ? "amber" : "red")
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>税后现金</h2></div></div><div class="card-body">
          ${UI.bars(t.scenarios.map(x => ({ label: x.id === "BASE" ? "基线" : x.id, value: x.afterTax / 1000000, display: UI.money(x.afterTax), color: x.id === sel ? "var(--red)" : x.result === "REJECT" ? "var(--muted-2)" : "var(--blue)" })), 230)}
          <div class="note blue" style="margin-top:8px">香港无资本利得税、无股息税，交易本身的税负很低；本案例的优化空间主要是家办利润税（16.5% → 0%）与印花税（0.1%/边），不是 20% 资本利得。若客户是中国税务居民，结论完全不同。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>${s.name}</h2><p>${s.note}</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">税后现金</div><div class="strong">${UI.money(s.afterTax)}</div></div>
            <div><div class="tiny muted">有效税率</div><div class="strong">${s.rate}%</div></div>
            <div><div class="tiny muted">成本</div><div class="strong">${UI.money(s.cost)}</div></div>
            <div><div class="tiny muted">可辩护</div><div class="strong">${s.defend}/100</div></div>
          </div>
          <div class="note ${s.result === "REJECT" ? "amber" : "green"}" style="margin-top:8px"><b>${s.result}：</b>${s.result === "REJECT" ? "无实质/不可辩护，不进入内部复核；建议放弃或重构。" : "需补齐条件后进入反避税校验与内部复核。"}</div>
        </div></div>
      </div>
      <div class="tiny muted" style="margin-top:8px">口径：税后现金 = 应税基数 − 现金税 − 实施成本；未计投资收益、时间价值与未实现税负。</div>`;
  };

  RENDER["m5-substance"] = () => {
    const fails = t.checks.filter(x => x.res === "FAIL").length;
    const warns = t.checks.filter(x => x.res === "WARN").length;
    const selected = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    const result = selected.result === "REJECT" ? "REJECT" : fails ? "REJECT" : warns ? "CONDITIONAL" : "PASS";
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 反避税`,
      title: "反避税校验",
      sub: "HK s.61A / FSIE / 实质 / 受益所有权 / 印花税 / CRS；红灯即停。",
      actions: `<button class="btn" data-action="toast" data-msg="已生成合规底稿（watermarked）">导出底稿</button>
        <button class="btn primary" data-action="go" data-page="m5-advisor" ${result === "REJECT" ? "disabled" : ""}>送内部税务团队</button>`
    }) + `
      <div class="grid-4">
        ${UI.stat("检查项", t.checks.length, "PASS/WARN/FAIL/N/A", "")}
        ${UI.stat("PASS", t.checks.filter(x => x.res === "PASS").length, "可继续", "green")}
        ${UI.stat("WARN", warns, "需附条件", "amber")}
        ${UI.stat("结果", result, result === "REJECT" ? "不进入复核" : "可进入复核", result === "REJECT" ? "red" : "amber")}
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>校验矩阵</h2><p>内部税务团队 + 合规双签；每次校验写 EvidenceEvent。</p></div></div>
        ${UI.table(["检查", "结果", "说明", ""], t.checks.map(x => [
          `<b>${x.name}</b>`, UI.pill(x.res, x.res === "PASS" ? "green" : x.res === "WARN" ? "amber" : x.res === "FAIL" ? "red" : "gray"), `<span class="small">${x.note}</span>`,
          x.res === "WARN" ? `<button class="btn sm" data-action="toast" data-msg="已记录补证任务：${x.id}">补证</button>` : ""
        ]), { compact: true })}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>红旗清单</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>❌ 无商业目的拆分</div><div>❌ 壳公司无实质</div><div>❌ 导管/条约滥用</div><div>❌ 假移居</div>
            <div>❌ 隐瞒/不申报</div><div>❌ 循环资金</div><div>❌ 阴阳合同</div><div>❌ 规避印花税/FSIE</div>
          </div>
          <div class="note amber" style="margin-top:8px"><b>本方案：</b>${selected.result === "REJECT" ? "已判定 REJECT（无实质/不可辩护），不进入复核；建议放弃或重构。" : "未命中硬红灯；但 FSIE/印花税为 WARN，需在内部复核意见中逐条回应。"}</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>通过条件</h2></div></div><div class="card-body">
          <div class="check"><input type="checkbox" checked> <span><b>香港实质</b><small>人员、办公、决策、董事会记录</small></span></div>
          <div class="check"><input type="checkbox" checked> <span><b>受益所有权</b><small>穿透至个人；与 CRS 一致</small></span></div>
          <div class="check"><input type="checkbox"> <span><b>FSIE 经济实质</b><small>外地收入豁免的实质/关联要求</small></span></div>
          <div class="check"><input type="checkbox"> <span><b>印花税/转让定价</b><small>0.1%/边；关联交易定价</small></span></div>
          <div class="tiny muted" style="margin-top:6px">未勾选项 → 内部复核意见附条件；不得直接实施。</div>
        </div></div>
      </div>`;
  };

  RENDER["m5-advisor"] = () => {
    const a = t.advisor;
    const s = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    const blocked = s.result === "REJECT";
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 内部复核 / RM`,
      title: "HSBC 内部税务意见 / RM 决策",
      sub: "HSBC PB 内部税务团队复核；RM 审核后交付；如需正式法律意见，由 HSBC 协调外部律师。AI 不签。",
      actions: `<button class="btn" data-action="toast" data-msg="已生成客户包草稿（含披露）">生成客户包</button>
        ${blocked ? `<button class="btn primary" disabled>RM 批准并交付</button>` : `<button class="btn primary" data-action="go" data-page="m5-delivery">RM 批准并交付</button>`}`
    }) + `${blocked ? `<div class="note amber"><b>当前选择 C 已判定 REJECT：</b>不进入内部复核/RM 交付；请返回情景比较选择 A/B。</div>` : ""}` + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>HSBC PB 内部税务意见</h2><p>${a.name} · ${a.jurisdiction}</p></div><div class="spacer"></div>${UI.pill("内部复核完成", "green")}</div><div class="card-body">
          <div class="note green"><b>结论：</b>${a.opinion}</div>
          <div class="grid-2" style="margin-top:9px;gap:8px">
            <div><div class="tiny muted">范围</div><div class="strong">${a.scope}</div></div>
            <div><div class="tiny muted">成本</div><div class="strong">${a.fees ? UI.money(a.fees) : (a.costLabel || "内部成本")}</div></div>
            <div><div class="tiny muted">利益冲突</div><div class="strong">${a.conflict ? "有" : "无"}</div></div>
            <div><div class="tiny muted">复核编号</div><div class="strong mono">IR-2026-1019</div></div>
          </div>
          <div class="divider"></div>
          <div class="tiny muted">附条件</div>
          <div class="small">① 香港实质补齐；② FSIE/印花税测算；③ 受益所有权披露；④ 不建议 C 方案。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>RM 决策</h2></div></div><div class="card-body">
          <div class="note blue"><b>选定：</b>${s.name} · 税后 ${UI.money(s.afterTax)} · 有效税率 ${s.rate}%</div>
          <div class="stack" style="margin-top:9px">
            <label class="check"><input type="radio" name="rmdec" checked> <span><b>采纳（附条件）</b><small>按内部复核意见补齐后实施</small></span></label>
            <label class="check"><input type="radio" name="rmdec"> <span><b>修改</b><small>调整杠杆/结构后重算</small></span></label>
            <label class="check"><input type="radio" name="rmdec"> <span><b>不采纳</b><small>仅内部参考</small></span></label>
          </div>
          ${UI.field({ label: "RM 理由 / 保留意见", type: "textarea", rows: 3, value: "客户接受附条件方案；优先补齐香港家办实质与 FSIE/印花税测算，暂不做信托注入。", help: "不采纳时必填" })}
          ${UI.field({ label: "交付方式", type: "select", value: "面谈 + 内部复核摘要", options: ["面谈 + 内部复核摘要", "面谈 + 完整包", "仅内部"] })}
        </div></div>
      </div>`;
  };

  RENDER["m5-delivery"] = () => {
    const s = t.scenarios.find(x => x.id === (App.state.taxScenario || "A")) || t.scenarios[1];
    return UI.pageHead({
      crumb: `<b>M5</b> · Tax Optimization · 交付`,
      title: "客户交付 / 实施",
      sub: "客户包、披露、开户/设实体/交易/申报；每一步有负责人。",
      actions: `<button class="btn" data-action="toast" data-msg="客户包已发送（watermarked PDF + App）">发送客户</button>
        <button class="btn primary" data-action="esign-tax">客户电子签署</button>`
    }) + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>客户包</h2><p>${s.name} · ${s.result}</p></div></div><div class="card-body">
          <div class="grid-4" style="gap:6px">
            ${UI.stat("税后现金", UI.money(s.afterTax), "基线 " + UI.money(t.scenarios[0].afterTax), "green")}
            ${UI.stat("有效税率", s.rate + "%", "基线 " + t.scenarios[0].rate + "%", "green")}
            ${UI.stat("实施成本", UI.money(s.cost), "一次性", "")}
            ${UI.stat("可辩护性", s.defend + "/100", s.result, "amber")}
          </div>
          <div class="divider"></div>
          <div class="tiny muted">披露三件套</div>
          <div class="two-col-list" style="margin-top:5px">
            <div>✅ 非税务意见声明</div><div>✅ 关键假设（税率/居民/实质）</div><div>✅ 主要风险（FSIE/印花税/CRS）</div>
            <div>✅ 内部团队范围与成本</div><div>✅ 客户不获保证</div><div>✅ 数据使用授权</div>
          </div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>实施任务</h2></div></div><div class="card-body"><div class="timeline">
          <div class="tl-item"><div class="when">W1</div><div class="what">补齐香港实质</div><div class="who">客户 / 律师 · Iris</div></div>
          <div class="tl-item"><div class="when">W2</div><div class="what">FSIE / 印花税测算</div><div class="who">HSBC 税务团队 · 待复核</div></div>
          <div class="tl-item"><div class="when">W3</div><div class="what">受益所有权披露</div><div class="who">合规 · David</div></div>
          <div class="tl-item"><div class="when">W4</div><div class="what">股权转让交割</div><div class="who">投行 / Ops</div></div>
          <div class="tl-item"><div class="when">W6</div><div class="what">申报与复盘</div><div class="who">HSBC 税务团队 / RM</div></div>
        </div></div></div>
      </div>
      <div class="note" style="margin-top:10px"><b>红线：</b>不得承诺税负；不得在内部复核前实施；不得把“客户直接签约”说成 HSBC 背书。所有文件 ≥7 年留存。</div>`;
  };

  RENDER["m5-review"] = () => UI.pageHead({
    crumb: `<b>M5</b> · Tax Optimization · 复盘`,
    title: "年度复盘",
    sub: "法规、天数、申报、结构变化；变更即重算。",
    actions: `<button class="btn primary" data-action="toast" data-msg="年度复盘已生成；3 项需跟进">运行复盘</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("年度", "2027", "复盘周期", "")}
      ${UI.stat("有效税率", "0.4%", "实际 vs 目标 0.35%", "amber")}
      ${UI.stat("申报", "3/4 完成", "1 项待补", "amber")}
      ${UI.stat("结构变化", "2", "HK 家办 / FSIE", "")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>复盘清单</h2></div></div>
      ${UI.table(["项目", "变化", "动作", "负责人", "状态"], [
        ["香港 FSIE / 家办合规", "年度复核", "FIHV 实质与关联", "HSBC 税务团队", UI.pill("待办", "red")],
        ["印花税 / 转让定价", "港股减持", "核对 0.1%/边与关联定价", "HSBC 税务团队", UI.pill("进行中", "amber")],
        ["香港实质", "新增 2 名员工", "更新董事会记录", "客户", UI.pill("完成", "green")],
        ["CRS", "账户信息", "年度申报", "合规", UI.pill("完成", "green")],
        ["居民天数", "在港 300 天", "维持香港税务居民", "RM", UI.pill("监控", "blue")]
      ], { compact: true })}
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">下一年动作</div><div class="strong" style="margin:4px 0">3 项</div><div class="small muted">FSIE/印花税测算、家办合规、实质复核。变更即重跑反避税。</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">证据</div><div class="strong" style="margin:4px 0">已归档</div><div class="small muted">意见、申报、董事会记录、CRS 回执；≥7 年。</div></div></div>
    </div>`;

  /* ───────── Client portal ───────── */
  RENDER["client-portal"] = () => {
    const tab = App.state.clientTab || "proposal";
    const c = App.client();
    const p = DB.proposals.options.find(x => x.id === (App.state.proposal.selected || "P-A")) || DB.proposals.options[0];

    const proposal = `<div class="grid-2-1">
      <div class="card"><div class="card-head"><div><h2>${p.name}</h2><p>${p.thesis}</p></div><div class="spacer"></div>${UI.pill("待您确认", "amber")}</div><div class="card-body">
        <div class="grid-4" style="gap:6px">${UI.stat("预期", p.exp, "年化区间", "")}${UI.stat("波动", p.vol, "年化", "")}${UI.stat("压力回撤", p.dd, "股 −30%", "amber")}${UI.stat("流动性", p.liquidity, "T+7", "green")}</div>
        <div class="divider"></div>
        ${UI.table(["配置", "权重", "金额"], p.legs.map(l => [l.i, l.w + "%", `<span class="num">${UI.money(l.amt)}</span>`]), { compact: true })}
        <div class="note green" style="margin-top:8px"><b>为什么适合您：</b>${p.why}</div>
        <div class="row" style="margin-top:9px"><button class="btn primary" data-action="toast" data-msg="已接受提案；RM 将与您确认执行时间">接受提案</button><button class="btn" data-action="toast" data-msg="已记录问题；RM 将回复">我有问题</button></div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>下一步</h2></div></div><div class="card-body"><div class="timeline"><div class="tl-item"><div class="what">确认提案</div><div class="who">今天</div></div><div class="tl-item"><div class="what">KYC/适当性复核</div><div class="who">1 个工作日</div></div><div class="tl-item"><div class="what">执行</div><div class="who">T+1</div></div><div class="tl-item"><div class="what">成交与成本报告</div><div class="who">T+2</div></div></div></div></div>
    </div>`;

    const tr = c.id === "C-88421" ? DB.trust : c.id === "C-7701" ? DB.trustHo : null;
    const trust = tr ? `<div class="grid-2-1">
      <div class="card"><div class="card-head"><div><h2>信托报告</h2><p>${tr.type} · ${tr.jurisdiction} · ${tr.trustee}</p></div></div><div class="card-body">
        <div class="grid-3" style="gap:7px">${UI.stat("信托资产", UI.money(tr.injection), "注入价值", "")}${UI.stat("年度预算", UI.money(tr.budget.reduce((a, b) => a + b.amt, 0)), tr.budget.length + " 类", "")}${UI.stat("税务准备金", UI.money(tr.reserve.actual), "≥ 最低值", "green")}</div>
        <div class="divider"></div>
        ${UI.table(["受益人", "年度分配", "用途"], [["配偶", UI.money(1200000), "住房/旅行"], ["子女 1", UI.money(900000), "教育"], ["子女 2", UI.money(600000), "教育/医疗"]], { compact: true })}
        <div class="note blue" style="margin-top:8px">信托分配由受托人裁量；您可提交意愿，但不能单方指令。税务处理以受托人/HSBC 税务团队意见为准。</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>近期分配</h2></div></div><div class="card-body"><div class="timeline">${tr.taxRows.slice(0,4).map(r => `<div class="tl-item"><div class="when">${r.id}</div><div class="what">${r.item} · ${UI.money(r.amt)}</div><div class="who">${r.status}</div></div>`).join("")}</div></div></div>
    </div>` : "";

    const hero = `<div class="portal-hero">
      <div class="row between"><div><div class="tiny" style="color:#f3b4bc;letter-spacing:.12em;text-transform:uppercase">HSBC Private Bank</div><h2>${c.name}，欢迎回来</h2><p>您的 RM：${c.rm} · 最后更新：${DB.asOf}</p></div><div class="pill">Client view</div></div>
      <div class="row"><span class="pill">组合 ${UI.money(c.totalWealth)}</span><span class="pill">流动性 ${UI.money(c.liquid)}</span><span class="pill">风险 ${c.risk}</span></div>
    </div>`;

    const showTrust = !!tr;
    const activeTab = tab === "trust" && !showTrust ? "proposal" : tab;
    const tabs = `<div class="tabs">
      <button class="tab ${activeTab === "proposal" ? "on" : ""}" data-action="client-tab" data-id="proposal">我的提案</button>
      <button class="tab ${activeTab === "invitation" ? "on" : ""}" data-action="client-tab" data-id="invitation">邀请</button>
      ${showTrust ? `<button class="tab ${activeTab === "trust" ? "on" : ""}" data-action="client-tab" data-id="trust">信托报告</button>` : ""}
    </div>`;

    let body = proposal;
    if (activeTab === "invitation") body = invitationCard();
    if (activeTab === "trust" && showTrust) body = trust;
    return hero + tabs + body;
  };

  RENDER["vendor-portal"] = () => {
    const v = DB.vendors[0];
    return UI.pageHead({ crumb: `<b>Vendor</b> · RFP Portal`, title: "投标", sub: "只看 RFP 规格与自己的投标；看不到客户姓名、持仓、其他投标。" }) + `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>${v.program}</h2><p>RFP-2026-018 · 截止 2026-11-03 17:00 HKT</p></div><div class="spacer"></div>${UI.pill("Shortlist", "blue")}</div><div class="card-body">
          <div class="form-grid">
            ${UI.field({ label: "课程方案", type: "textarea", rows: 3, value: "10 讲；含 2 次科创参访；结业展" })}
            ${UI.field({ label: "报价（USD）", value: "280000" })}
            ${UI.field({ label: "SLA / 取消条款", value: "开课前 30 天免费改期" })}
            ${UI.field({ label: "冲突声明", type: "select", value: "无", options: ["无", "有（需说明）"] })}
          </div>
          <div class="note blue" style="margin-top:8px">客户不参与评标；HSBC 评标后定标。你只会看到 cohort 规模（12 席），不会看到客户身份。</div>
          <button class="btn primary" style="margin-top:8px" data-action="toast" data-msg="投标已提交（sealed）；截止前可撤回">提交投标</button>
        </div></div>
        <div class="card"><div class="card-body"><div class="tiny muted">投标状态</div><div class="strong">已提交 · 密封</div><div class="small muted" style="margin-top:6px">HSBC 将在 5 个工作日内完成评标；未中标不披露其他报价。</div></div></div>
      </div>`;
  };

  RENDER["audit"] = () => UI.pageHead({
    crumb: `<b>Shared</b> · Evidence Ledger`,
    title: "审计与证据",
    sub: "每个建议都能回答：基于什么数据、什么规则版本、谁改了什么、客户何时同意。",
    actions: `<button class="btn" data-action="toast" data-msg="审计包已导出（watermarked ZIP）">导出审计包</button>`
  }) + `
    <div class="grid-4">
      ${UI.stat("事件", DB.audit.length + 18, "本项目", "")}
      ${UI.stat("模型", "v3.2", "proposal-gen", "")}
      ${UI.stat("规则", "2026.10.3", "四维引擎", "")}
      ${UI.stat("留存", "≥ 7 年", "按属地", "green")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>证据链</h2><p>不可变日志；监管可直接调取。</p></div></div>
      ${UI.table(["时间", "主体", "动作", "引用"], DB.audit.map(a => [
        `<span class="mono">${a.t}</span>`, a.who, a.what, `<span class="mono tiny">${a.ref}</span>`
      ]), { compact: true })}
    </div>
    <div class="grid-3" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">提案包</div><div class="strong">目标 / 约束 / 3 方案 / TES</div><div class="small muted">版本 v3；客户签署 v3。</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">规则包</div><div class="strong">规则 ID / 版本 / 命中</div><div class="small muted">BLOCK 不可覆盖；WARN 附条件。</div></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">AI 包</div><div class="strong">模型 / 提示词 / 输入快照</div><div class="small muted">数字 grounding；越界拦截。</div></div></div>
    </div>`;
})();
