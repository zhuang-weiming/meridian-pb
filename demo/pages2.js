/* M3 / M4 renderers */
(() => {
  const founder = DB.clients.find(c => c.id === "C-88421");

  /* ───────── M3 ───────── */

  const personById = (id) => DB.persons.find(p => p.id === id);
  const consentFor = (householdId, personId) => DB.consents.find(c => c.householdId === householdId && c.personId === personId);
  const peopleNames = (ids) => (ids || []).map(id => personById(id)).filter(Boolean).map(p => p.name).join("、") || "—";

  RENDER["m3-family"] = () => {
    const c = App.client();
    const h = App.household();
    if (!h) {
      return UI.pageHead({
        crumb: `<b>M3</b> · RM Copilot · 家庭工作台`,
        title: "家庭工作台",
        sub: "当前客户尚未建立 Household 视图。"
      }) + `<div class="card"><div class="empty">该客户没有家庭视图；demo 仅为陈志远、何启明、林哲、王女士提供示例。</div></div>`;
    }
    const persons = DB.persons.filter(p => p.householdId === h.id);
    const rels = DB.relationships.filter(r => r.householdId === h.id);
    const goals = DB.familyGoals.filter(g => g.householdId === h.id);
    const cases = DB.cases.filter(x => x.householdId === h.id);
    const consents = DB.consents.filter(x => x.householdId === h.id);
    const pending = consents.filter(x => !x.status.startsWith("已授权"));
    const activeGoals = goals.filter(g => g.status === "进行中").length;
    const openCases = cases.filter(x => x.status !== "已完成").length;
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · 家庭工作台`,
      title: `${h.name} · 家庭工作台`,
      sub: "客户与家庭：当前服务对象、关系与核实、家庭目标、授权缺口和可执行事项。默认示例为何启明家族（4 个目标）；可用顶部 Client 切换其他家庭。",
      actions: `<button class="btn" data-action="dictionary">业务词典</button>
        ${App.state.role === "RM" ? `<button class="btn primary" data-action="family-goal-new">新增家庭目标</button>` : UI.pill("只读", "gray")}`
    }) + `
    <div class="grid-4">
      ${UI.stat("家庭成员", persons.length, "含主客户与受抚养成员", "")}
      ${UI.stat("家庭目标", goals.length, activeGoals + " 个进行中", activeGoals ? "green" : "")}
      ${UI.stat("待授权", pending.length, "本人/监护人确认", pending.length ? "amber" : "green")}
      ${UI.stat("进行中案件", openCases, "跨 M3/M4/M5", "")}
    </div>
    <div class="note blue" style="margin-top:10px"><b>${UI.term("Household", "Household")}</b>：家庭关系与服务视图，不是法律主体；账户持有人 ≠ 受益人 ≠ 决策人。法律主体仍用 Client / Person / Legal Entity / Trust。</div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>家庭关系与服务授权</h2><p>关系有效期、核实状态与同意状态分开看。</p></div></div>
        ${UI.table(["成员", "关系", "年龄", "服务市场", "账户持有人", "授权 / 同意", "关系核验"], persons.map(p => {
          const con = consentFor(h.id, p.id);
          const rel = rels.find(r => r.from === p.id || r.to === p.id);
          return [
            `<span class="strong">${p.name}</span><span class="sub">${p.role}</span>`,
            p.isClient ? "主客户" : rel ? rel.type : "—",
            p.age,
            p.serviceMarket,
            p.accountHolder ? `<span class="pill green">是</span>` : `<span class="pill gray">否</span>`,
            con ? UI.pill(con.status, con.status.startsWith("已授权") ? "green" : "amber") : `<span class="pill gray">未记录</span>`,
            rel ? UI.pill(rel.verified, rel.verified === "已核验" ? "green" : "amber") : "—"
          ];
        }), { compact: true })}
      </div>
      <div class="card"><div class="card-head"><div><h2>当前服务对象</h2><p>不是“家长代理全家”。</p></div></div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">主客户</div><div class="strong">${c.name}</div></div>
          <div><div class="tiny muted">Household</div><div class="strong mono">${h.id}</div></div>
          <div><div class="tiny muted">负责 RM</div><div class="strong">${h.rm}</div></div>
          <div><div class="tiny muted">簿记中心</div><div class="strong">${h.booking.join(" / ")}</div></div>
          <div><div class="tiny muted">报告币种</div><div class="strong">${h.reportingCurrency}</div></div>
          <div><div class="tiny muted">同意记录</div><div class="strong mono">${h.consentRef}</div></div>
        </div>
        <div class="divider"></div>
        <div class="small muted">${h.note}</div>
        <div class="note amber" style="margin-top:8px"><b>授权缺口：</b>${pending.length ? pending.map(x => `${(personById(x.personId) || {}).name || x.personId} · ${x.purpose}`).join("；") : "无"}</div>
      </div></div>
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>家庭目标</h2><p>先确认谁提出、谁受益、谁出资、谁决定；目标不是产品。</p></div><div class="spacer"></div><span class="pill blue">${goals.length} 个</span></div><div class="card-body">
      <div class="goal-grid">${goals.map(g => {
        const owner = personById(g.ownerPersonId);
        const decider = personById(g.decisionMakerId);
        const gc = DB.cases.find(x => x.id === g.caseId);
        return `<div class="goal-card">
          <div class="row between"><div><div class="tiny muted">${g.id} · ${g.category}</div><div class="strong" style="font-size:12.5px">${g.title}</div></div>${UI.pill(g.status, g.status === "进行中" ? "green" : g.status.includes("待") ? "amber" : "gray")}</div>
          <div class="grid-2" style="margin-top:7px;gap:5px 10px">
            <div><div class="tiny muted">目标金额</div><div class="strong">${g.targetAmount ? UI.money(g.targetAmount) : "—"}</div></div>
            <div><div class="tiny muted">目标日期</div><div class="strong">${g.targetDate}</div></div>
            <div><div class="tiny muted">提出人</div><div class="strong">${owner ? owner.name : "—"}</div></div>
            <div><div class="tiny muted">受益人</div><div class="strong">${peopleNames(g.beneficiaryPersonIds)}</div></div>
            <div><div class="tiny muted">出资方</div><div class="strong">${peopleNames(g.fundingPartyIds)}</div></div>
            <div><div class="tiny muted">决策人</div><div class="strong">${g.decisionMaker || (decider ? decider.name : "—")}</div></div>
          </div>
          <div class="row" style="margin-top:7px"><span class="pill gray">优先级 ${g.priority}</span><span class="pill gray">可调整 ${g.flexibility}</span><span class="pill gray">${g.visibilityScope}</span></div>
          <div class="tiny muted" style="margin-top:6px">缺口：${g.gap}</div>
          <div class="row" style="margin-top:7px"><span class="pill ${g.fundingCommitmentStatus.includes("已安排") ? "green" : "amber"}">出资：${g.fundingCommitmentStatus}</span>${g.caseId ? `<button class="btn sm" data-action="case-detail" data-id="${g.caseId}">查看关联案件</button>` : `<span class="tiny muted">尚未建案</span>`}${gc && gc.link ? `<button class="btn sm primary" data-action="go" data-page="${gc.link}">${gc.linkLabel}</button>` : ""}</div>
        </div>`;
      }).join("")}</div>
    </div></div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>可执行事项</h2><p>目标缺口、待确认事项、专业任务、授权缺口。</p></div><div class="spacer"></div><button class="btn sm" data-action="go" data-page="m3-cases">打开案件工作台</button></div>
      ${UI.table(["案件", "模块", "负责人", "依赖", "期限", "交付物", "客户待办", "状态"], cases.map(x => [
        `<span class="strong">${x.title}</span><span class="sub mono">${x.id}</span>`,
        x.module, x.owner, `<span class="small">${x.dependencies}</span>`, x.due,
        `<span class="small">${x.deliverable}</span>`, `<span class="small">${x.clientTodo}</span>`,
        UI.pill(x.status, x.status === "进行中" ? "blue" : x.status.includes("等待") ? "amber" : "gray")
      ]), { compact: true })}
    </div>`;
  };

  RENDER["m3-cases"] = () => {
    const h = App.household();
    const all = h ? DB.cases.filter(x => x.householdId === h.id) : DB.cases;
    const filter = App.state.caseFilter || "all";
    const cases = filter === "all" ? all : all.filter(x => x.module.includes(filter));
    const today = DB.asOf.slice(0, 10);
    const overdue = cases.filter(x => x.due < today && x.status !== "已完成").length;
    const waitingClient = cases.filter(x => x.status.includes("客户") || x.status.includes("授权")).length;
    const waitingInternal = cases.filter(x => x.status.includes("内部")).length;
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · 案件工作台`,
      title: "案件工作台",
      sub: "融资、税务、信托、服务不再各自建案；统一显示负责人、依赖、期限、交付物与客户待办。",
      actions: `<button class="btn" data-action="dictionary">业务词典</button>
        <button class="btn primary" data-action="go" data-page="m3-family">回到家庭工作台</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("案件", cases.length, h ? h.name : "全部", "")}
      ${UI.stat("逾期", overdue, "按 demo 基准日", overdue ? "red" : "green")}
      ${UI.stat("等待客户", waitingClient, "授权/资料/确认", waitingClient ? "amber" : "green")}
      ${UI.stat("等待内部", waitingInternal, "专业团队/委员会", waitingInternal ? "amber" : "green")}
    </div>
    <div class="tabs" style="margin-top:10px">
      ${[["all", "全部"], ["M3", "M3 服务/融资"], ["M4", "M4 创始人/信托"], ["M5", "M5 税务"]].map(([id, label]) => `<button class="tab ${filter === id ? "on" : ""}" data-action="case-filter" data-id="${id}">${label}</button>`).join("")}
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>任务视图</h2><p>一个案件可以跨 M3/M4/M5；以目标和交付物组织，而不是以系统模块组织。</p></div></div>
      ${UI.table(["案件", "模块", "类型", "关联目标", "负责人", "依赖", "期限", "交付物", "客户待办", "状态", "优先级", "入口", ""], cases.map(x => {
        const g = DB.familyGoals.find(y => y.id === x.goalId);
        return [
          `<span class="strong">${x.title}</span><span class="sub mono">${x.id}</span>`,
          x.module, x.type, g ? `<span class="small">${g.title}</span>` : "—",
          x.owner, `<span class="small">${x.dependencies}</span>`, x.due,
          `<span class="small">${x.deliverable}</span>`, `<span class="small">${x.clientTodo}</span>`,
          UI.pill(x.status, x.status === "进行中" ? "blue" : x.status.includes("等待") ? "amber" : "gray"),
          x.priority,
          x.link ? `<button class="btn sm primary" data-action="go" data-page="${x.link}">${x.linkLabel || "打开"}</button>` : `<span class="tiny muted">—</span>`,
          `<button class="btn sm" data-action="case-detail" data-id="${x.id}">查看</button>`
        ];
      }), { compact: true })}
    </div>`;
  };

  RENDER["m3-financing"] = () => {
    const f = DB.financing;
    const stress = App.state.facilityStress || "base";
    const coll = stress === "base" ? f.facility.collateral : stress === "-30" ? f.facility.collateral * .7 : f.facility.collateral * .5;
    const lend = coll * (1 - f.facility.haircut / 100);
    const cov = (lend / f.facility.drawn) * 100;
    const status = cov >= f.facility.warning ? "正常" : cov >= f.facility.call ? "预警" : cov >= f.facility.forced ? "追保" : "平仓";
    const tone = status === "正常" ? "green" : status === "预警" ? "amber" : "red";
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · 融资`,
      title: "融资驾驶舱",
      sub: `${App.client().name} · 2027 年 3 月需支付约 1,000 万美元税负；不希望卖出股票。`,
      actions: `<button class="btn" data-action="toast" data-msg="Term sheet 草稿已生成（v0.3）">生成 term sheet</button>
        <button class="btn primary" data-action="toast" data-msg="已提交授信预审（SLA 5–15 个工作日）">提交授信</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("资金缺口", UI.money(f.need), f.needDate, "red")}
      ${UI.stat("推荐方案", `${UI.term("Lombard", "Lombard")} 1,000 万`, "6.1% / 年 · 2–4 周", "green")}
      ${UI.stat("抵押覆盖率", Math.round(cov) + "%", "预警 250% / 追保 200%", tone)}
      ${UI.stat("年度利息", UI.money(f.need * .061), "仅付息 · 24 个月", "")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>12 个月现金流</h2><p>缺口在 M3 出现；M6 前需要流动性。</p></div></div><div class="card-body">
        ${UI.table(["月份", "流入", "流出", "净额", "累计"], f.cashflow.map(r => [
          r.m, `<span class="num green">${UI.money(r.inflow)}</span>`, `<span class="num red">${UI.money(r.outflow)}</span>`,
          `<span class="num">${UI.money(r.net)}</span>`, `<span class="num ${r.cum < 0 ? "red" : "green"}">${UI.money(r.cum)}</span>`
        ]), { compact: true })}
        <div class="note amber" style="margin-top:8px"><b>结论：</b>最大累计缺口约 590 万美元；建议 1,000 万循环额度 + 300 万现金缓冲，避免在 M3 被迫减持。</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>方案比较</h2></div></div><div class="card-body">
        ${UI.table(["方案", "金额", "成本", "税", "时效", "LTV 上限", "风险"], f.options.map(o => [
          `<span class="${o.rec ? "strong red" : ""}">${o.name}</span>`, UI.money(o.amount), o.cost,
          o.tax ? UI.money(o.tax) : "—", o.time, o.ltv, `<span class="tiny muted">${o.risk}</span>`
        ]), { compact: true })}
        <div class="note green" style="margin-top:8px"><b>推荐：</b>Lombard 1,000 万；LTV 上限 45%，实际 37%（已用额度 ÷ 可贷值）；先质押、后减持，保留上涨期权。</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>额度结构</h2><p>抵押品：上市股票 + 债券；Haircut（抵押折扣）55%；估值日 ${f.facility.valuationDate}。</p></div><div class="spacer"></div>
        <div class="btn-group"><button class="${stress === "base" ? "on" : ""}" data-action="facility-stress" data-id="base">基准</button><button class="${stress === "-30" ? "on" : ""}" data-action="facility-stress" data-id="-30">−30%</button><button class="${stress === "-50" ? "on" : ""}" data-action="facility-stress" data-id="-50">−50%</button></div>
      </div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">抵押市值</div><div class="strong">${UI.money(coll)}</div></div>
          <div><div class="tiny muted">${UI.term("可贷值（Lendable Value）", "Lendable Value")}（55% 折扣）</div><div class="strong">${UI.money(lend)}</div></div>
          <div><div class="tiny muted">已用额度</div><div class="strong">${UI.money(f.facility.drawn)}</div></div>
          <div><div class="tiny muted">覆盖率（可贷值/已用）</div><div class="strong ${tone}">${Math.round(cov)}%</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:5px">追保阶梯</div>
        ${UI.bars([
          { label: "预警 250%", value: 250, display: "250%", color: "var(--amber)" },
          { label: "追保 200%", value: 200, display: "200%", color: "var(--amber)" },
          { label: "平仓 175%", value: 175, display: "175%", color: "var(--red)" },
          { label: "当前 " + Math.round(cov) + "%", value: Math.min(300, cov), display: Math.round(cov) + "%", color: cov > 250 ? "var(--green)" : "var(--red)" }
        ], 300)}
      </div></div>
      <div class="card"><div class="card-head"><div><h2>条款与契约</h2></div></div><div class="card-body">
        ${UI.table(["项目", "值"], [
          ["额度", UI.money(f.facility.amount)],
          ["已用", UI.money(f.facility.drawn)],
          ["利率", f.facility.rate + "% / 年"],
          ["期限", f.facility.tenor],
          ["Haircut（抵押折扣）", f.facility.haircut + "%"],
          ["LTV（已用额度 ÷ 可贷值）", f.facility.ltv + "%"],
          ["估值日", f.facility.valuationDate],
          ["估值来源", f.facility.valuationSource],
          ["契约", "维持覆盖率 ≥ 200%；不得新增质押；控制权不变"]
        ], { compact: true })}
        <div class="tiny muted" style="margin-top:6px">定价为演示值；LTV 分母是可贷值，不是抵押市值。实际以授信政策与抵押品为准。</div>
      </div></div>
    </div>`;
  };

  RENDER["m3-taxlegal"] = () => {
    const tab = App.state.m3tab || "tax";
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · 税务 / 法律`,
      title: "税务 / 法律驾驶舱",
      sub: "M3 只做场景识别、持牌转介、资金承接；M5 税务优化由 HSBC 内部团队另行立项；M3 不出税务/法律意见。",
      actions: `<button class="btn" data-action="toast" data-msg="已创建转介工单（SLA 1 个工作日）">转介专家</button>`
    }) + `
    <div class="tabs">
      <button class="tab ${tab === "tax" ? "on" : ""}" data-action="m3tab" data-id="tax">税务</button>
      <button class="tab ${tab === "legal" ? "on" : ""}" data-action="m3tab" data-id="legal">法律</button>
    </div>
    ${tab === "tax" ? `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>义务日历</h2><p>按客户税务居民身份生成；不是销售话术。</p></div></div>
          ${UI.table(["事项", "法域", "截止", "状态"], [
            ["个人所得税年度汇算", "中国内地", "2027-03-01 – 06-30", UI.pill("待准备", "amber")],
            ["限售股转让 20%", "中国内地", "减持时", UI.pill("待测算", "amber")],
            ["CRS / FATCA", "香港/新加坡", "按年", UI.pill("已申报", "green")],
            ["离岸信托存续 20%", "中国内地", "按年", UI.pill("需意见", "red")],
            ["股权激励单独计税", "中国内地", "2027-12-31 前", UI.pill("窗口", "blue")]
          ], { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>卖 / 押 / 信托</h2><p>仅情景，不是意见。</p></div></div><div class="card-body">
          ${UI.table(["路径", "时点税负", "后续", "流动性"], [
            ["直接减持 1,000 万", "约 180 万", "无", "高"],
            ["质押 1,000 万", "0", "利息 6.1%", "中"],
            ["注入信托", "视同转让 20%", "存续 20%/年", "低"]
          ], { compact: true })}
          <div class="note amber" style="margin-top:8px"><b>边界：</b>美国遗产税、21 号公告、7 号公告需持牌税务师确认；银行不承诺税负。</div>
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>持牌转介</h2><p>客户授权后才共享案件字段；专家只看案件，不看持仓。</p></div></div><div class="card-body">
        <div class="grid-3">
          <div><div class="tiny muted">税务师</div><div class="strong">某国际税务师事务所</div><div class="small muted">范围：跨境、21 号公告、7 号公告；SLA 1 个工作日</div></div>
          <div><div class="tiny muted">律师</div><div class="strong">某香港家事/信托律所</div><div class="small muted">范围：信托、继承、婚姻；SLA 1 个工作日</div></div>
          <div><div class="tiny muted">授权</div><div class="strong">字段级、可撤回</div><div class="small muted">只传需求类别与必要文件；不传交易明细</div></div>
        </div>
      </div></div>
    ` : `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>法律事项</h2></div></div>
          ${UI.table(["事项", "法域", "时限", "状态", "负责"], [
            ["大宗交易披露", "香港", "交易前 / T+2", UI.pill("进行中", "blue"), "外部律师"],
            ["婚姻财产协议", "香港/内地", "事前", UI.pill("待启动", "amber"), "家事律师"],
            ["继承 / 遗嘱", "香港", "事前", UI.pill("已复核", "green"), "遗产律师"],
            ["信托契约", "香港", "设立前", UI.pill("待意见", "amber"), "信托律师"],
            ["37 号文 / 跨境架构", "内地/香港", "架构前", UI.pill("不适用", "gray"), "跨境律师"]
          ], { compact: true })}
        </div>
        <div class="card"><div class="card-head"><div><h2>文件清单</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div>✅ 股东名册</div><div>✅ 公司章程</div><div>✅ 董事会决议</div><div>✅ SHA</div>
            <div>⚠️ 婚姻协议（缺）</div><div>⚠️ 遗嘱（缺）</div><div>✅ 信托意愿书</div><div>✅ KYC / SoW</div>
          </div>
          <div class="note blue" style="margin-top:8px"><b>银行边界：</b>不做架构设计、不出法律意见；只做清单、转介、文件承接。</div>
        </div></div>
      </div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>转介与特权</h2><p>B 方案：免费范围只签 HSBC；超出范围客户直接签 vendor。</p></div></div><div class="card-body">
        ${UI.table(["范围", "合同", "客户付费", "法律特权"], [
          ["免费咨询点", "HSBC ↔ vendor", "0", "可能无法形成"],
          ["深度实施 / 诉讼 / 长期顾问", "客户 ↔ vendor（与 HSBC 无关）", "客户自付", "可形成"]
        ], { compact: true })}
      </div></div>
    `}`;
  };

  const serviceCard = (s) => `<div class="card">
    <div class="card-head"><div><div class="row"><span class="pill blue">${s.cat}</span><span class="pill ${s.status === "邀请中" ? "amber" : "green"}">${s.status}</span></div><h2 style="margin-top:5px">${s.title}</h2><p>${s.desc}</p></div><div class="spacer"></div><span class="tiny muted">${s.id}</span></div>
    <div class="card-body">
      <div class="grid-2" style="gap:9px">
        <div><div class="tiny muted">谁适合</div><div class="strong">${s.who}</div></div>
        <div><div class="tiny muted">交付方</div><div class="strong">${s.provider}</div></div>
        <div><div class="tiny muted">时间</div><div class="strong">${s.date}</div></div>
        <div><div class="tiny muted">地点 / 形式</div><div class="strong">${s.loc}</div></div>
        <div><div class="tiny muted">名额</div><div class="strong">${s.seats}</div></div>
        <div><div class="tiny muted">标签</div><div class="row">${s.tags.map(t => `<span class="pill gray">${t}</span>`).join("")}</div></div>
      </div>
      <div class="divider"></div>
      <div class="row" style="margin-top:2px"><span class="pill gray">邀请对象：${s.who}</span><span class="pill amber">发送前需本人/监护人同意</span></div>
      <div class="row" style="margin-top:7px">
        ${App.state.role === "RM" ? `<button class="btn primary sm" data-action="invite-service" data-id="${s.id}">发送邀请</button>
        <button class="btn sm" data-action="toast" data-msg="已记录：暂不邀请">暂不邀请</button>
        <button class="btn ghost sm" data-action="toast" data-msg="反馈已记录（demo）">反馈</button>` : `<span class="tiny muted">只读：由 RM 发起邀请/记录反馈</span>`}
        <span class="tiny muted" style="margin-left:auto">客户不支付 · 不显示价格/评分</span>
      </div>
    </div>
  </div>`;

  const invitationCard = () => {
    const s = DB.services[0];
    return `<div class="card"><div class="card-head"><div><div class="row"><span class="pill blue">${s.cat}</span><span class="pill green">HSBC 邀请</span></div><h2 style="margin-top:5px">${s.title}</h2><p>HSBC 私行客户专属 · 不对外售票</p></div></div><div class="card-body">
      <div class="grid-2">
        <div><div class="tiny muted">交付方</div><div class="strong">${s.provider}</div>
          <div class="tiny muted" style="margin-top:8px">时间</div><div class="strong">${s.date}</div>
          <div class="tiny muted" style="margin-top:8px">地点 / 形式</div><div class="strong">${s.loc}</div>
        </div>
        <div><div class="tiny muted">适合</div><div class="strong">${s.who}</div>
          <div class="tiny muted" style="margin-top:8px">内容</div><div class="strong">${s.desc}</div>
          <div class="tiny muted" style="margin-top:8px">名额</div><div class="strong">${s.seats}</div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="small muted">由 HSBC 提供/协调，客户无需支付费用；交付由上方机构完成。客户不参与采购与评标。邀请仅由香港/新加坡团队发出。</div>
      <div class="row" style="margin-top:10px">
        <button class="btn primary" data-action="toast" data-msg="已接受邀请；确认函将发送至客户邮箱">接受邀请</button>
        <button class="btn" data-action="toast" data-msg="已记录：暂不参加">暂不参加</button>
        <button class="btn ghost" data-action="toast" data-msg="反馈已记录（demo）">反馈</button>
        <span class="tiny muted" style="margin-left:auto">不显示价格/评分/招标过程</span>
      </div>
    </div></div>`;
  };

  RENDER["m3-hub"] = () => {
    const cats = ["全部", ...Array.from(new Set(DB.services.map(s => s.cat)))];
    const filter = App.state.serviceFilter || "全部";
    const list = filter === "全部" ? DB.services : DB.services.filter(s => s.cat === filter);
    const h = App.household();
    const persons = h ? DB.persons.filter(p => p.householdId === h.id) : [];
    const family = persons.map(p => {
      const goal = DB.familyGoals.find(g => g.householdId === h.id && g.ownerPersonId === p.id);
      const con = DB.consents.find(c => c.householdId === h.id && c.personId === p.id);
      return { name: p.name, role: p.role, age: p.age, need: goal ? goal.category : "待确认", auth: con ? con.status : "未记录" };
    });
    return UI.pageHead({
      crumb: `<b>M3</b> · RM Copilot · 服务 / 邀请`,
      title: "服务 / 邀请",
      sub: "示例家族：何启明（示例）· 仅由香港/新加坡团队邀请；客户不支付、不签约；只看邀请、项目、交付方。",
      actions: `<button class="btn" data-action="dictionary">业务词典</button>
        <button class="btn" data-action="toast" data-msg="邀请清单已导出（watermarked PDF）">导出邀请</button>`
    }) + `
      <div class="card"><div class="card-body">
        <div class="row between"><div><div class="tiny muted">同一家族，不同需求</div><div class="strong">不要只服务一个决策者</div></div><span class="pill purple">Family lens</span></div>
        <div class="grid-4" style="margin-top:8px">
          ${family.map(f => `<div class="stat"><div class="stat-label">${f.name} · ${f.age}</div><div class="stat-value sm">${f.role}</div><div class="stat-sub">${f.need} · ${f.auth}</div></div>`).join("")}
        </div>
      </div></div>
      <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>邀请与同意</h2><p>家长可以表达资助意愿，但成年子女自行决定是否参加、是否分享反馈。</p></div></div>
        ${UI.table(["成员", "关系", "同意状态", "可分享范围", "证据"], persons.map(p => {
          const con = DB.consents.find(c => c.householdId === h.id && c.personId === p.id);
          return [`<span class="strong">${p.name}</span><span class="sub">${p.role}</span>`, p.authorization, con ? UI.pill(con.status, con.status.startsWith("已授权") ? "green" : "amber") : "—", con ? con.scope : "—", con ? con.evidenceRef : "—"];
        }), { compact: true })}
      </div>
      <div class="tabs" style="margin-top:10px">
        ${cats.map(c => `<button class="tab ${filter === c ? "on" : ""}" data-action="service-filter" data-id="${c}">${c}</button>`).join("")}
      </div>
      <div class="grid-2">
        ${list.map(serviceCard).join("")}
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>为什么是“家族”而不是“一个人”</h2></div></div><div class="card-body">
          <div class="note blue"><b>Ida Liu（刘宏敏，公开报道）：</b>私人银行需要从服务单一决策者，转向理解配偶、成年子女乃至孙辈的不同需求；家族办公室兴起与跨代财富转移，是需求变化的重要来源。</div>
          <div class="note" style="margin-top:7px"><b>家族治理：</b>创始人希望子女接班，子女未必愿意回到家族企业；不同成员对风险、慈善、控制权与分配有不同看法。传承不只是法律文件，而是关系协调。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>服务旅程</h2></div></div><div class="card-body"><div class="timeline">
          <div class="tl-item"><div class="what">家族对话</div><div class="who">创始人 / 配偶 / 子女：先分开谈，再一起谈</div></div>
          <div class="tl-item"><div class="what">治理工作坊</div><div class="who">家族宪章、决策权、受益规则</div></div>
          <div class="tl-item"><div class="what">二代课程 / 论坛</div><div class="who">MIT Sloan · Future Family Leaders；Athens Forum</div></div>
          <div class="tl-item"><div class="what">家办 / 信托</div><div class="who">架构、投资治理、受托与合规</div></div>
          <div class="tl-item"><div class="what">慈善 / 影响力</div><div class="who">家族基金会、影响力投资、下一代参与</div></div>
        </div><div class="tiny muted" style="margin-top:7px">以上服务与日期为 demo 示例，参考公开报道；所有邀请由香港/新加坡团队发出，不构成在中国内地或其他法域的销售/招揽；实际以 HSBC 正式发布为准。</div></div></div>
      </div>`;
  };

  /* ───────── M4 ───────── */

  RENDER["m4-founder"] = () => {
    const c = founder;
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · 360`,
      title: `${c.name} · 创始人 360`,
      sub: "纸面财富 → 可管理资产：股权 intake、独立估值、托管/质押、变现、信托。",
      actions: `<button class="btn" data-action="toast" data-msg="资产 intake 已打开（demo）">资产 intake</button>
        <button class="btn" data-action="go" data-page="m4-valuation">估值委员会</button>
        <button class="btn primary" data-action="go" data-page="m4-pledge">质押 vs 卖出</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("股权账面值", UI.money(DB.valuation.gross), "30% × $30bn", "")}
      ${UI.stat("调整后价值", UI.money(DB.valuation.adjusted), "DLOM 30% + 少数 10%", "")}
      ${UI.stat("可贷值", UI.money(DB.valuation.lendable), "Haircut 60% · 估值日 " + DB.valuation.valuationDate, "")}
      ${UI.stat("审批额度（目标）", UI.money(DB.valuation.facility), "按 22% LTV 计算 " + UI.money(DB.valuation.lendable * 22 / 100), "green")}
    </div>
    <div class="grid-2-1" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>持股结构</h2><p>穿透至 ${UI.term("最终受益所有人（BO）", "Beneficial Owner")}；质押/信托前必须完成。</p></div></div><div class="card-body">
        <div class="code-block">林哲（中国税务居民）
  └─ 100%  BVI Holdco（持股平台）
        └─ 30%  DeepThink（开曼）
              ├─ 普通股 28%
              ├─ 期权池 2%
              └─ 限制：锁定期 / ROFR / 董事会同意</div>
        <div class="grid-3" style="margin-top:10px">
          ${UI.stat("持股", "30%", "账面 $9.0bn", "")}
          ${UI.stat("税基", "$1.5m", "极低 → 卖出税负重", "amber")}
          ${UI.stat("质押状态", "未质押", "可质押 8,000 万股", "green")}
        </div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>事件雷达</h2></div></div><div class="card-body"><div class="timeline">
        <div class="tl-item"><div class="when">2026-06</div><div class="what">最近一轮融资：投后 $30bn</div><div class="who">公开信息</div></div>
        <div class="tl-item"><div class="when">2026-10</div><div class="what">Pre-IPO 架构评估</div><div class="who">Lead RM / 律师</div></div>
        <div class="tl-item"><div class="when">2027-03</div><div class="what">港股 IPO 预期窗口</div><div class="who">投行 / 港私行</div></div>
        <div class="tl-item"><div class="when">2028-03</div><div class="what">首批解禁（假设）</div><div class="who">Lead RM</div></div>
      </div></div></div>
    </div>
    <div class="card" style="margin-top:10px"><div class="card-head"><div><h2>资产与权利</h2></div></div>
      ${UI.table(["资产", "类别", "股数", "权利", "限制", "质押", "估值"], [
        ["DeepThink 普通股", "Pre-IPO 股权", "80,000,000", "投票 / 分红 / 优先认购", "锁定期 / ROFR / 董事会同意", "未质押", `<span class="num">${UI.money(9000000000)}</span>`],
        ["BVI Holdco", "控股实体", "100%", "控制", "经济实质待补", "—", "—"],
        ["香港现金", "流动性", "—", "—", "—", "—", `<span class="num">${UI.money(52000000)}</span>`]
      ], { compact: true })}
    </div>
    <div class="grid-3" style="margin-top:10px">
      <div class="card"><div class="card-body"><div class="tiny muted">估值</div><div class="strong" style="margin:4px 0">$5.67bn 调整后</div><div class="small muted">最近一轮 50% / 可比 30% / DCF 20%；委员会 4:0 通过。</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-valuation">查看决议</button></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">流动性</div><div class="strong" style="margin:4px 0">$500m 额度</div><div class="small muted">LTV 22%（额度 ÷ 可贷值）；−40% 触发追保；利息 6.5%。</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-pledge">押 or 卖</button></div></div>
      <div class="card"><div class="card-body"><div class="tiny muted">传承</div><div class="strong" style="margin:4px 0">香港全权信托</div><div class="small muted">预算 $5m/年；注入税约 $90m；税务台账 C1–C6。</div><button class="btn sm" style="margin-top:7px" data-action="go" data-page="m4-trust">信托与消费</button></div></div>
    </div>`;
  };

  RENDER["m4-valuation"] = () => {
    const v = DB.valuation;
    const ltv = App.state.valuationLtv || 22;
    const facility = v.lendable * ltv / 100;
    const cov = v.lendable / facility;
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · 估值委员会`,
      title: "独立估值委员会",
      sub: "LTV 由委员会决定，不由系统一刀切；40% 下跌触发追保写入放款前置条件。",
      actions: `<button class="btn" data-action="toast" data-msg="已提交委员会（4 票赞成 / 0 反对）">提交决议</button>
        <button class="btn primary" data-action="approve-ltv">批准 LTV</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("账面值", UI.money(v.gross), "30% × $30bn", "")}
      ${UI.stat("调整后价值", UI.money(v.adjusted), "DLOM 30% + 少数 10%", "")}
      ${UI.stat("可贷值", UI.money(v.lendable), "Haircut 60% · 估值日 " + v.valuationDate, "")}
      ${UI.stat("建议 LTV（额度 ÷ 可贷值）", ltv + "%", "区间 10%–30%", "green")}
    </div>
    <div class="grid-1-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>估值输入</h2><p>独立估值机构 + 委员会挑战。</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ label: "最近一轮投后", value: "30,000,000,000", suffix: "USD" })}
          ${UI.field({ label: "持股比例", value: "30", suffix: "%" })}
          ${UI.field({ label: "DLOM", value: "30", suffix: "%" })}
          ${UI.field({ label: "少数/非上市", value: "10", suffix: "%" })}
          ${UI.field({ label: "抵押折扣", value: "60", suffix: "%" })}
          ${UI.field({ id: "ltv-value", label: "LTV 建议", value: ltv + "%", disabled: true, help: "range slider 在右侧" })}
        </div>
        <div class="divider"></div>
        <div class="row"><span class="tiny muted">LTV 10%</span><input type="range" min="10" max="30" value="${ltv}" step="1" data-ltv style="flex:1"><span class="tiny muted">30%</span></div>
        <div class="tiny muted" style="margin-top:6px">拖动后：额度 = 可贷值 × LTV；覆盖率 = 可贷值 ÷ 额度。</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>决议输出</h2><p>系统只记录委员会决议与理由，不自动定 LTV。</p></div><div class="spacer"></div>${UI.pill("4:0 通过", "green")}</div><div class="card-body">
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">额度</div><div class="strong" id="ltv-facility">${UI.money(facility)}</div></div>
          <div><div class="tiny muted">覆盖率（可贷值/额度）</div><div class="strong" id="ltv-cov">${cov.toFixed(2)}x</div></div>
          <div><div class="tiny muted">40% 触发</div><div class="strong red">是</div></div>
          <div><div class="tiny muted">估值有效期</div><div class="strong">6 个月</div></div>
        </div>
        <div class="divider"></div>
        <div class="tiny muted" style="margin-bottom:4px">估值方法</div>
        ${UI.table(["方法", "价值", "权重"], v.methods.map(m => [m.name, `<span class="num">${UI.money(m.value)}</span>`, m.weight + "%"]), { compact: true })}
        <div class="note" style="margin-top:8px"><b>40% 触发：</b>估值较发放日下跌 40% → 无论覆盖率如何，触发追保/补充担保谈判。写入 Term Sheet 与授信批复。</div>
        <div class="note blue" style="margin-top:8px"><b>口径：</b>${UI.term("Haircut", "Haircut")} 60% → 可贷值 = 调整后价值 × 40%；${UI.term("LTV", "LTV")} = 额度 ÷ 可贷值；估值日 ${v.valuationDate}；估值有效期 6 个月。</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>LTV 敏感性</h2></div></div>
        ${UI.table(["LTV（额度 ÷ 可贷值）", "额度", "覆盖率（可贷值/额度）", "适用"], [10, 15, 20, 22, 30].map(x => {
          const f = v.lendable * x / 100; const cv = v.lendable / f;
          return [`<b>${x}%</b>`, `<span class="num">${UI.money(f)}</span>`, cv.toFixed(2) + "x", x === ltv ? `<span class="red">当前</span>` : x <= 15 ? "保守" : x >= 30 ? "上限" : "稳健"];
        }), { compact: true })}
      </div>
      <div class="card"><div class="card-head"><div><h2>委员会</h2></div></div><div class="card-body">
        <div class="two-col-list">
          <div>✅ 独立估值主席</div><div>✅ 外部估值机构</div><div>✅ 信贷风险</div><div>✅ 私行产品</div>
          <div>👁 合规（观察）</div><div>👁 法务（观察）</div><div>🚫 RM 不参与</div><div>🚫 客户不参与</div>
        </div>
        <div class="note amber" style="margin-top:8px"><b>反对意见：</b>无。会议记录：估值报告 2026-10-18；DLOM 30% 经三档可比验证；LTV 22% 对应 −50% 情景覆盖率 227%。</div>
      </div></div>
    </div>`;
  };

  RENDER["m4-pledge"] = () => {
    const p = App.state.pledge;
    const calc = App.pledgeCalc(p);
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · 变现`,
      title: "质押 vs 卖出",
      sub: "同样拿到 C 现金：比税后终端财富、盈亏平衡、−40% 下行，而不是只比税率。",
      actions: `<button class="btn" data-action="toast" data-msg="已生成客户版对比（含假设与披露）">生成客户版</button>`
    }) + `
    <div class="grid-4">
      ${UI.stat("卖出立即税负", UI.money(calc.tax), "卖出 " + UI.money(calc.sellAmt), "red")}
      ${UI.stat("质押 5 年利息", UI.money(calc.interest), "本金 " + UI.money(p.C), "")}
      ${UI.stat("盈亏平衡回报", UI.pct(calc.breakeven * 100, 2), "r*", "amber")}
      ${UI.stat("−40% 差距", UI.money(calc.downsideGap), "卖出多留", "red")}
    </div>
    <div class="grid-1-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>输入</h2><p>所有字段可改；数字实时重算。</p></div></div><div class="card-body">
        <div class="form-grid">
          ${UI.field({ id: "pv-V", label: "持股价值", value: "100,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-B", label: "税基", value: "1,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-t", label: "处置税率", value: "20", suffix: "%" })}
          ${UI.field({ id: "pv-C", label: "所需现金", value: "25,000,000", suffix: "USD" })}
          ${UI.field({ id: "pv-i", label: "质押利率", value: "6.5", suffix: "%" })}
          ${UI.field({ id: "pv-n", label: "期限", value: "5", suffix: "年" })}
          ${UI.field({ id: "pv-r", label: "股票年化回报", value: "8", suffix: "%" })}
          ${UI.field({ id: "pv-d", label: "分红率", value: "0", suffix: "%" })}
        </div>
        <button class="btn primary" style="margin-top:10px;width:100%" data-action="calc-pledge">重新计算</button>
        <div class="tiny muted" style="margin-top:6px">假设：利息每年付、无分红、无交易成本；税率按中国税务居民 20%。</div>
      </div></div>
      <div class="card"><div class="card-head"><div><h2>终端财富</h2><p>5 年后；卖出 vs 质押。</p></div><div class="spacer"></div><span class="pill ${calc.recommend === "Pledge" ? "green" : calc.recommend === "Sell" ? "blue" : "amber"}">${calc.recommend}</span></div><div class="card-body">
        <div class="chart" id="pledge-chart">${UI.lineChart([
          { name: "卖出", color: "var(--blue)", points: calc.sellSeries },
          { name: "质押", color: "var(--green)", points: calc.pledgeSeries }
        ], { height: 220, min: 0, max: 190, xLabels: ["−20%", "−10%", "0%", "8%", "15%"] })}</div>
        <div class="legend" style="margin-top:6px"><span><i style="background:var(--blue)"></i>卖出后剩余股票</span><span><i style="background:var(--green)"></i>质押后股票 − 借款 − 利息</span></div>
        <div class="divider"></div>
        <div class="grid-2" style="gap:8px">
          <div><div class="tiny muted">年化 8% 卖出</div><div class="strong">${UI.money(calc.sellAt8)}</div></div>
          <div><div class="tiny muted">年化 8% 质押</div><div class="strong green">${UI.money(calc.pledgeAt8)}</div></div>
          <div><div class="tiny muted">一次性 −40% 卖出</div><div class="strong">${UI.money(calc.sellDown)}</div></div>
          <div><div class="tiny muted">一次性 −40% 质押</div><div class="strong red">${UI.money(calc.pledgeDown)}</div></div>
        </div>
        <div class="note ${calc.recommend === "Sell" ? "amber" : "green"}" style="margin-top:8px"><b>结论：</b>${calc.rationale}</div>
      </div></div>
    </div>
    <div class="grid-2" style="margin-top:10px">
      <div class="card"><div class="card-head"><div><h2>决策矩阵</h2></div></div><div class="card-body">
        ${UI.table(["条件", "质押", "卖出"], [
          ["预期回报 vs 融资成本", "r > i + 3%", "r ≤ i + 2%"],
          ["税基 / 税负", "低税基、税负重", "高税基、税负轻"],
          ["集中度", "< 60%", "> 60%"],
          ["期限", "≥ 3–5 年", "需要永久流动性"],
          ["−40% 情景", "可补仓", "无法补仓"],
          ["控制权", "想保留", "愿意降低"]
        ], { compact: true })}
      </div></div>
      <div class="card"><div class="card-head"><div><h2>税制差异</h2></div></div><div class="card-body">
        ${UI.table(["客户", "卖出税负", "质押意义"], [
          ["香港居民 / 港股", "资本利得通常不征税", "递延价值小；看利率 vs 回报"],
          ["中国居民 / 境外股", "20% 财产转让", "递延价值大；CRS/7 号/21 号"],
          ["美国居民", "LTCG + NIIT", "递延中等；遗产税另一层"],
          ["信托持有", "视法域/受益人", "受托人权力/利益冲突"]
        ], { compact: true })}
      </div></div>
    </div>`;
  };

  window.invitationCard = invitationCard;

  RENDER["m4-trust"] = () => {
    const t = DB.trust;
    const tab = App.state.trustTab || "structure";
    const total = t.budget.reduce((a, b) => a + b.amt, 0);
    return UI.pageHead({
      crumb: `<b>M4</b> · Founder Desk · 信托`,
      title: "信托 / 预算 / 税务台账",
      sub: "信托持有 + 使用协议 + 受托人直付 + 小额现金；不做“随便花”。",
      actions: `<button class="btn" data-action="toast" data-msg="已提交受托人委员会（SLA 5 个工作日）">提交分配</button>`
    }) + `
    <div class="tabs">
      <button class="tab ${tab === "structure" ? "on" : ""}" data-action="trust-tab" data-id="structure">结构</button>
      <button class="tab ${tab === "budget" ? "on" : ""}" data-action="trust-tab" data-id="budget">预算</button>
      <button class="tab ${tab === "tax" ? "on" : ""}" data-action="trust-tab" data-id="tax">税务台账</button>
    </div>
    ${tab === "structure" ? `
      <div class="grid-2">
        <div class="card"><div class="card-head"><div><h2>信托结构</h2><p>示例：HSBC TFS 担任受托人。</p></div></div><div class="card-body">
          <div class="grid-2" style="gap:9px">
            <div><div class="tiny muted">类型</div><div class="strong">${t.type}</div></div>
            <div><div class="tiny muted">法域</div><div class="strong">${t.jurisdiction}</div></div>
            <div><div class="tiny muted">受托人</div><div class="strong">${t.trustee}</div></div>
            <div><div class="tiny muted">保护人</div><div class="strong">${t.protector}</div></div>
            <div><div class="tiny muted">委托人</div><div class="strong">${t.settlor}</div></div>
            <div><div class="tiny muted">${UI.term("受益人（Trust Beneficiary）", "Trust Beneficiary")}</div><div class="strong">${t.beneficiaries}</div></div>
            <div><div class="tiny muted">保留权力</div><div class="strong">${t.reserved}</div></div>
            <div><div class="tiny muted">注入</div><div class="strong">${UI.money(t.injection)}</div></div>
          </div>
          <div class="note amber" style="margin-top:9px"><b>控制权 vs 保护：</b>保留权力越多，资产保护越弱。若委托人仍是受益人且可单方分配，债权人/税务机关可能穿透。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>注入税负（示例）</h2></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">注入价值</div><div class="strong">${UI.money(t.injection)}</div></div>
            <div><div class="tiny muted">视同转让税 20%</div><div class="strong red">${UI.money(t.injectionTax)}</div></div>
            <div><div class="tiny muted">存续税</div><div class="strong">${t.annualTax * 100}% / 年</div></div>
            <div><div class="tiny muted">费用抵扣</div><div class="strong red">不可抵</div></div>
          </div>
          <div class="note" style="margin-top:8px"><b>21 号公告：</b>装入按市价 − 原值 − 费用 20%；存续收益按年 20%；终止按市价清算；转非居民当日视同清算。过渡期至 2026-10-22（以官方最新为准）。</div>
        </div></div>
      </div>` : tab === "budget" ? `
      <div class="grid-2-1">
        <div class="card"><div class="card-head"><div><h2>年度预算</h2><p>合计 ${UI.money(total)}；受托人裁量，非客户直接指令。</p></div></div>
          ${UI.table(["类别", "年度预算", "支付方式"], t.budget.map(b => [
            `<span class="strong">${b.cat}</span>`, `<span class="num">${UI.money(b.amt)}</span>`, b.pay
          ]), { compact: true })}
          <div class="card-foot"><span class="tiny muted">预算外支出需单独审批；不做现金；供应商过 KYC/制裁/关联方。</span><div style="flex:1"></div><button class="btn sm" data-action="toast" data-msg="预算已保存（v2027）">保存</button></div>
        </div>
        <div class="card"><div class="card-head"><div><h2>税务准备金</h2></div></div><div class="card-body">
          <div class="grid-2" style="gap:8px">
            <div><div class="tiny muted">最低</div><div class="strong">${UI.money(t.reserve.min)}</div></div>
            <div><div class="tiny muted">目标</div><div class="strong">${UI.money(t.reserve.target)}</div></div>
            <div><div class="tiny muted">当前</div><div class="strong green">${UI.money(t.reserve.actual)}</div></div>
            <div><div class="tiny muted">覆盖率</div><div class="strong">${Math.round(t.reserve.actual / t.reserve.min * 100)}%</div></div>
          </div>
          <div class="tiny muted" style="margin-top:8px">政策：${t.reserve.policy}</div>
          <div class="note green" style="margin-top:8px"><b>硬规则：</b>低于最低值 → 暂停非必需分配；季度复核；年度受托人委员会 + 税务师签字。</div>
        </div></div>
      </div>` : `
      <div class="card"><div class="card-head"><div><h2>分配税务台账</h2><p>来源层 C1–C6；谁申报、税额抵扣、申报状态。</p></div><div class="spacer"></div><button class="btn sm" data-action="add-distribution">新增分配</button></div>
        ${UI.table(["ID", "项目", "金额", "来源层", "收款人（Payee）", "申报人 / 纳税人", "税额", "抵扣", "申报", "状态"], t.taxRows.map(r => [
          `<span class="mono">${r.id}</span>`, r.item, `<span class="num">${UI.money(r.amt)}</span>`, r.layer, r.payee || "—", r.person,
          `<span class="num">${r.due ? UI.money(r.due) : "0"}</span>`, `<span class="num">${r.credit ? UI.money(r.credit) : "—"}</span>`,
          r.filing, UI.pill(r.status, r.status === "已支付" ? "green" : r.status === "待意见" ? "amber" : "blue")
        ]), { compact: true })}
        <div class="tiny muted" style="margin-top:6px">${UI.term("受益人", "Trust Beneficiary")} ≠ ${UI.term("收款人", "Payee")} ≠ ${UI.term("纳税人", "Taxpayer")}；三者必须分别记录。</div>
      </div>
      <div class="grid-2" style="margin-top:10px">
        <div class="card"><div class="card-head"><div><h2>来源层</h2></div></div><div class="card-body">
          <div class="two-col-list">
            <div><b>C1</b> 本金 / corpus</div><div><b>C2</b> 当年已税</div><div><b>C3</b> 累计已税</div>
            <div><b>C4</b> 未税</div><div><b>C5</b> 资本利得</div><div><b>C6</b> 借款/垫款</div>
          </div>
          <div class="note" style="margin-top:8px"><b>无来源，不分配：</b>标记不了 C1–C6 → 阻断；无完税/计提 → 阻断；无估值 → 不做实物受益。</div>
        </div></div>
        <div class="card"><div class="card-head"><div><h2>谁申报</h2></div></div><div class="card-body">
          ${UI.table(["事项", "受托人", "委托人", "受益人"], [
            ["年度所得税", "R/A", "C", "I"],
            ["分配", "R/A", "C", "A"],
            ["实物受益", "R", "I", "A"],
            ["CRS/FATCA", "R/A", "I", "I"]
          ], { compact: true })}
          <div class="tiny muted" style="margin-top:6px">R=执行，A=最终责任，C=被咨询，I=被告知。受托人决议 ≠ 付款复核。</div>
        </div></div>
      </div>`}`;
  };

  globalThis.invitationCard = invitationCard;
})();
