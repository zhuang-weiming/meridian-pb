# 11 — 用例 5：税务优化工作室（Tax Optimization Studio）

> **定位**：给 **UHNW 家族**的"同一笔交易，怎么安排更省税"提供**结构化、可解释、可辩护**的方案；服务对象是 **RM**，由 RM 审核后向客户交付。**由 HSBC PB 内部 Tax & Wealth Structuring 团队主导**（画像、杠杆、情景、反避税、客户交付）；在需要正式税务/法律意见的法域，由内部持牌团队或外部律师出具支持意见。系统做事实底稿、情景测算、反避税校验与材料准备。
>
> **Demo 客户**：香港税务居民何启明（示例，虚构），资产/家办/信托主要在香港与新加坡；本文第 5 节的中国税务居民示例仅用于对比，不代表 Demo 客户。
>
> **边界**：这是**合法税务优化**（tax optimization），不是**逃税**（tax evasion），也不是"藏钱"。任何方案必须能通过：经济实质、受益所有权、商业目的、CRS/申报、GAAR/PPT、CFC、转让定价、7 号公告、21 号公告。做不到，就不做。

---

## 1. 客户真正在问什么

一位拥有跨境资产、公司、信托、房产、艺术品的家族，通常会问：

> "同样一笔 5,000 万美元的分红/减持/股权转让，我是用个人账户、香港公司、新加坡公司，还是开曼公司？  
> 是一次性做，还是分几笔、分几年？  
> 用股权转让还是资产转让？用基金、保险还是信托？  
> 年底前要不要做亏损收割、推迟确认、提前确认？  
> 开曼账户到底有没有用？  
> 怎么能合法地少交，而不是被稽查？"

这不是一个"税率查询"，而是**五层结构叠加**的结果：

```
L1 身份与居民     → 谁是纳税人？居民/非居民？协定？退出税？
L2 簿记与实体     → 账户开在哪？公司/信托/基金在哪？经济实质？
L3 交易形式       → 股权 vs 资产；债权 vs 股权；衍生品 vs 现货；基金/保险
L4 时点与拆分     → 年度、分期、亏损收割、递延、分拆（必须有商业目的）
L5 传承与合规     → 信托、保险、慈善、CFC、CRS、7 号/21 号、GAAR/PPT
```

**一个关键事实**：**账户所在地 ≠ 公司税务居民地 ≠ 资产所在地 ≠ 客户税务居民地**。开曼账户不会改变客户的税务居民身份；把公司设在低税地，也不等于公司就是低税地居民。税务结果由四者共同决定。

---

## 2. 十条优化杠杆（每条都带约束）

| # | 杠杆 | 做什么 | 适合谁 | 关键约束 / 红旗 |
|---|---|---|---|---|
| 1 | **居民身份与协定** | 真实迁居、协定居民、加比规则、天数管理 | 有真实跨境生活/工作安排的家庭 | 假移居、经济重心仍在原地、退出税 |
| 2 | **簿记中心/账户** | 香港/新加坡/瑞士/开曼等账户与簿记地 | 多币种、多市场、跨境收付 | CRS 申报、银行开户实质、制裁 |
| 3 | **实体/载体** | 个人 vs 公司 vs 合伙 vs 基金 vs 信托 vs 保险 | 有经营、投资、传承多重目标 | CFC、经济实质、受益所有权、PPT |
| 4 | **交易形式** | 股权 vs 资产；合并/换股；分拆；回购 | 并购、重组、退出 | 7 号公告、间接转让、印花税、披露 |
| 5 | **工具选择** | 债权 vs 股权；ETF vs 基金；衍生品 vs 现货；保险 | 收益/风险/流动性不同 | 预提税、资本 vs 收入、复杂性 |
| 6 | **时点** | 年度确认、分期收款、亏损收割、递延 | 有年度税负波动的家庭 | 反避税、洗售规则、实质 |
| 7 | **拆分** | 多笔、多主体、多买家、多年度 | 大额退出、集中持仓 | 必须有商业目的；反拆分条款 |
| 8 | **条约/预提** | 利用协定降低股息/利息/特许权预提 | 跨境持股/融资 | 受益所有权、LOB/PPT、导管公司 |
| 9 | **信托/保险/慈善** | 隔离、传承、递延、扣除 | 传承优先、慈善意愿 | 21 号公告、CRS、控制权穿透 |
| 10 | **融资/费用** | 债务下推、利息扣除、资本弱化 | 有经营/投资杠杆 | 转让定价、资本弱化、反避税 |

> **"拆分"是红旗最多的一条**：如果拆分的唯一目的是避开某个门槛/税率，而没有商业目的、独立对手方、真实交割与文档，税务机关可以重新定性。系统必须把"商业目的"作为必填字段，而不是事后解释。

---

## 3. 端到端 12 步

| # | 步骤 | 角色 | 页面 | 输出 | 规则 |
|---|---|---|---|---|---|
| 1 | **触发** | RM / 系统 | PB-500 | 事件卡（分红/减持/重组/迁居/年结/法规变化） | 事件驱动 |
| 2 | **范围与准入** | RM + 税务优化专员 | PB-500 | 范围、法域、预算、内部复核 | 客户授权 + 数据合规 |
| 3 | **税务画像** | RM + 客户 | PB-510 | 居民、住所、天数、家庭、实体、账户、资产、flow | 必须可验证 |
| 4 | **基线税图** | 系统 | PB-520 | 每个事件的税种/税基/税率/时点/申报/有效税率 | 不含优化 |
| 5 | **杠杆筛选** | 税务优化专员 | PB-530 | 3–5 个可行杠杆 | 每个杠杆有约束/红旗 |
| 6 | **簿记/实体比较** | 专员 + 内部复核 | PB-540 | 账户/实体/法域对比 | 实质/CRS/成本 |
| 7 | **情景测算** | 系统 | PB-550 | 基线 + 3 套方案；税后现金/有效税率/成本/风险 | 含成本、含申报 |
| 8 | **反避税校验** | 系统 + 合规 | PB-560 | GAAR/PPT/CFC/ES/受益所有权/7 号/21 号/CRS | 红灯即停 |
| 9 | **HSBC 内部复核** | HSBC PB 税务团队（必要时外部律师） | PB-570 | 复核意见、范围、成本、保留 | 每案一份 |
| 10 | **RM 决策** | RM + IC | PB-570 | 选哪套、是否给客户、怎么讲 | RM 签字；AI 不签 |
| 11 | **客户交付** | RM | PB-580 | 客户包、披露、签署 | 不承诺税负 |
| 12 | **实施与年度复盘** | Ops + 内部团队 + RM | PB-580/590 | 开户/设实体/交易/申报/年度复盘 | 变更即重算 |

---

## 4. 页面规格（10 页）

### PB-500 Tax Optimization Home / Case Intake

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `case_id` | string | Y | 案件 |
| `client_id` | string | Y | 客户 |
| `trigger_type` | enum | Y | 分红/减持/重组/迁居/年结/法规变化/新投资 |
| `transaction_amount` | decimal | Y | 交易金额 |
| `currency` | string | Y | 币种 |
| `scope_jurisdictions[]` | array | Y | 涉及法域（HK/SG/CN/US/Cayman/BVI/LU/IE/CH） |
| `complexity` | enum | Y | 低/中/高 |
| `advisor_panel[]` | array | N | 拟用税务师/律师 |
| `budget` | range | N | 内部预算 / 外部律师费 |
| `target_tax_outcome` | text | Y | 客户目标（合法优化，不是"零税"） |
| `status` | enum | Y |  intake/画像/测算/校验/内部复核/RM/交付/复盘 |

### PB-510 Tax Profile & Nexus Map

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `residency[]` | array | Y | 税务居民地（可多国） |
| `domicile` | string | N | 住所/永久居所 |
| `days_by_jurisdiction` | object | Y | 183 天/协定判定 |
| `family_members[]` | array | N | 配偶/子女/父母（S5） |
| `entities[]` | array | Y | 公司/信托/合伙/基金 |
| `accounts[]` | array | Y | 账户/簿记地/币种 |
| `assets[]` | array | Y | 股权/房产/金融/艺术/游艇 |
| `income_flows[]` | array | Y | 股息/利息/租金/薪酬/资本利得 |
| `treaties[]` | array | N | 适用协定 |
| `filings[]` | array | Y | CRS/FATCA/年度申报 |
| `estate_plan` | object | N | 遗嘱/信托/保险 |
| `data_consent_ref` | string | Y | 数据使用/内部团队与外部律师共享授权 |

### PB-520 Baseline Tax Map

| 字段 | 类型 | 说明 |
|---|---|---|
| `event_id` | string | 交易/事件 |
| `taxpayer` | enum | 个人/公司/信托/合伙 |
| `tax_type` | enum | 所得税/资本利得/预提/印花/遗产/赠与/增值税 |
| `tax_base` | decimal | 税基 |
| `rate` | percent | 税率 |
| `timing` | enum | 实现时/年度/分配时/处置时 |
| `withholding` | percent | 预提 |
| `filing_form` | string | 申报表 |
| `cash_tax` | decimal | 现金税负 |
| `effective_rate` | percent | 有效税率 |
| `compliance_cost` | decimal | 合规成本 |
| `notes` | text | 假设/不确定 |

### PB-530 Optimization Lever Library

| 字段 | 类型 | 说明 |
|---|---|---|
| `lever_id` | string | 杠杆 |
| `category` | enum | 居民/簿记/实体/交易/工具/时点/拆分/条约/信托/融资 |
| `description` | text | 做法 |
| `jurisdictions[]` | array | 适用法域 |
| `fit` | text | 适合谁 |
| `expected_impact` | range | 税负/现金流影响（区间） |
| `cost` | decimal | 实施/维持成本 |
| `risk` | enum | 低/中/高 |
| `evidence_required[]` | array | 商业目的/合同/独立方/实质 |
| `advisor_required` | bool | 是否必须内部复核/外部律师 |
| `red_flags[]` | array | 反避税红旗 |

### PB-540 Booking & Entity Comparator

| 字段 | 类型 | 说明 |
|---|---|---|
| `option_id` | string | 方案 |
| `booking_centre` | enum | HK/SG/CH/Cayman/BVI/LU/IE |
| `entity_type` | enum | 个人/公司/合伙/基金/信托 |
| `tax_residence` | string | 实体税务居民 |
| `treaty_access` | array | 协定网络 |
| `cfo_flag` | bool | CFC 风险 |
| `substance` | enum | 强/中/弱 |
| `crs_reportable` | bool | CRS 申报 |
| `banking_access` | enum | 强/中/弱 |
| `cost` | decimal | 设立/年维持 |
| `reputation` | enum | 高/中/低 |
| `score` | 0–100 | 综合 |
| `notes` | text | 需内部复核确认 |

> **"开曼账户"单独说明**：开曼是**簿记/基金设立地**，不是"免税账户"。是否申报、是否应税，取决于客户居民身份、实体居民身份、资产所在地、CRS 与实质。系统不得把"开曼"作为"避税"标签。

### PB-550 Scenario Comparator

| 字段 | 类型 | 说明 |
|---|---|---|
| `scenario_id` | string | 情景 |
| `name` | string | 基线/方案 A/B/C |
| `levers[]` | array | 使用哪些杠杆 |
| `gross_income` | decimal | 税前 |
| `tax_cost` | decimal | 税负 |
| `after_tax_cash` | decimal | 税后现金 |
| `effective_rate` | percent | 有效税率 |
| `implementation_cost` | decimal | 实施成本 |
| `annual_cost` | decimal | 年维持 |
| `net_benefit` | decimal | 税省 − 成本 |
| `liquidity` | enum | 高/中/低 |
| `control` | enum | 强/中/弱 |
| `compliance_burden` | enum | 低/中/高 |
| `risk_rating` | enum | 低/中/高 |
| `score` | 0–100 | 综合 |
| `rank` | int | 排名 |

**综合评分（建议）**：税后结果 40%、可辩护性 25%、成本 15%、流动性与控制 10%、声誉 10%。**可辩护性低于阈值 → 直接淘汰，不参与排名。**

### PB-560 Substance & Anti-Avoidance Check

| 字段 | 类型 | 说明 |
|---|---|---|
| `gaar_check` | enum | PASS/WARN/FAIL |
| `ppt_check` | enum | 主要目的测试 |
| `cfo_check` | enum | 受控外国企业 |
| `economic_substance` | enum | 经济实质 |
| `beneficial_ownership` | enum | 受益所有权 |
| `transfer_pricing` | enum | 转让定价 |
| `indirect_transfer_7` | enum | 7 号公告 |
| `trust_21` | enum | 21 号公告 |
| `crs_fatca` | enum | 申报 |
| `red_flags[]` | array | 具体红旗 |
| `result` | enum | PASS/CONDITIONAL/REJECT |
| `conditions[]` | array | 通过条件 |
| `reviewer` | string | 合规/税务师 |

**红灯示例**：无商业目的的分拆、壳公司无实质、导管公司、假移居、循环资金、阴阳合同、隐瞒境外收入、不申报 CRS。**红灯 → REJECT，不进入 PB-570。**

### PB-570 HSBC Internal Review & RM Decision

| 字段 | 类型 | 说明 |
|---|---|---|
| `reviewer_id` | string | HSBC PB 内部税务团队 / 外部律师 |
| `jurisdiction` | string | 法域 |
| `scope` | text | 意见范围 |
| `internal_opinion` | text | 内部复核结论/保留 |
| `opinion_ref` | string | 内部复核记录；外部意见另附 |
| `internal_cost` | decimal | 内部成本；外部律师费另列 |
| `conflict_check` | bool | 利益冲突 |
| `rm_decision` | enum | 采纳/修改/不采纳 |
| `rm_rationale` | text | 理由 |
| `client_suitability` | enum | 适当性 |
| `conditions[]` | array | 前提 |
| `status` | enum | 待意见/已意见/已决策/已交付 |

### PB-580 Client Delivery & Implementation

| 字段 | 类型 | 说明 |
|---|---|---|
| `pack_id` | string | 客户包 |
| `scenario_id` | string | 选定方案 |
| `disclosures` | text | 非税务意见/假设/风险 |
| `client_decision` | enum | 接受/拒绝/暂缓 |
| `esign_ref` | string | 签署 |
| `implementation_tasks[]` | array | 开户/设实体/交易/申报 |
| `owner` | string | 负责人 |
| `timeline` | range | 时间 |
| `documents[]` | array | 合同/决议/申报 |
| `status` | enum | 未开始/进行中/完成/暂停 |

### PB-590 Annual Review & Monitoring

| 字段 | 类型 | 说明 |
|---|---|---|
| `review_year` | int | 年度 |
| `law_changes[]` | array | 法规变化（21 号/7 号/CRS/全球最低税） |
| `residency_days` | object | 天数变化 |
| `structure_changes[]` | array | 实体/信托/账户变化 |
| `tax_filings[]` | array | 申报状态 |
| `tax_paid` | decimal | 实缴 |
| `effective_rate` | percent | 实际有效税率 |
| `next_actions[]` | array | 下一步 |
| `review_date` | date | 下次复盘 |

---

## 5. "同一笔交易"的三套示例（演示，非意见）

假设：中国税务居民个人，持有境外公司股权，拟处置 5,000 万美元，税基 500 万；涉及 HK/SG/Cayman。

| 方案 | 结构 | 税负（演示） | 成本 | 风险 | 结论 |
|---|---|---|---|---|---|
| **基线** | 个人直接持有、直接转让 | 20% 财产转让所得 ≈ 900 万 | 低 | 低 | 简单，但税负集中 |
| **A** | 香港公司持有 + 协定/预提安排 | 若符合受益所有权/实质，可能降低预提；但 7 号公告/CFC 风险 | 中 | 中高 | 需税务师意见；不能只看税率 |
| **B** | 新加坡家族办公室/基金 + 信托 | 可能递延/豁免（视 13O/13X 与实质） | 高 | 高 | 适合长期传承，不适合短期套利 |
| **C** | 开曼控股 + HK 簿记 | 开曼不自动免税；CRS/实质/受益所有权 | 中 | 高 | **不是"避税方案"**；仅作为基金/持股载体 |

**系统输出不是"选 C 最省税"，而是：**
- 基线有效税率；
- 每套方案的税后现金、成本、风险、合规负担；
- 反避税结论（PASS/CONDITIONAL/REJECT）；
- HSBC 内部复核意见；
- RM 建议（含"不建议"）。

---

## 6. 反避税红线（写进系统）

| 红线 | 说明 | 系统动作 |
|---|---|---|
| **无商业目的** | 拆分/架构只为避税 | REJECT |
| **无经济实质** | 壳公司、无人员/办公/决策 | REJECT |
| **导管/条约滥用** | 导管公司、受益所有权不符 | REJECT |
| **假移居** | 天数/经济重心/家庭未迁移 | REJECT |
| **隐瞒/不申报** | CRS/境外收入/信托 | REJECT + 合规升级 |
| **循环资金/阴阳合同** | 虚构交易 | REJECT + 合规升级 |
| **违反资本弱化/转让定价** | 利息/关联交易 | REJECT/调整 |
| **21 号/7 号公告规避** | 信托/间接转让 | REJECT/专业意见 |

---

## 7. RM 交付：一页决策卡

| 项目 | 内容 |
|---|---|
| 客户问题 | "同一笔交易，怎么安排更省税？" |
| 基线 | 有效税率、现金税负 |
| 三套方案 | 税后现金、成本、风险、合规 |
| 反避税 | PASS/CONDITIONAL/REJECT |
| 内部复核 | 谁复核、范围、保留 |
| 建议 | 采纳/修改/不建议 |
| 什么会改变建议 | 居民身份、法规、估值、交易对手 |
| 披露 | 非税务意见、假设、风险、无保证 |

**话术**："我们不是在帮您'不交税'，而是在**合法、可申报、可解释**的前提下，比较不同身份、账户、实体、交易形式与时点的税后结果；方案由 HSBC PB 内部税务团队复核，必要时由外部律师出具法律意见。"

---

## 8. 治理与 KPI

| 治理 | 要求 |
|---|---|
| 复核团队 | HSBC PB 内部税务团队；外部律师按需、轮换/回避 |
| 意见 | 每套方案必须有内部复核记录；无复核不交付 |
| 合规 | 反避税校验由内部税务团队 + 合规双签 |
| 数据 | 客户授权；内部团队/外部律师只看案件字段；CRS/隐私 |
| 记录 | 方案、假设、意见、客户披露、签署 ≥ 7 年 |
| 复盘 | 年度 + 法规变化触发 |

| KPI | 目标 |
|---|---|
| 税务优化案件周期 | 画像→决策 ≤ 20 个工作日 |
| 方案可辩护率 | 100%（PASS/CONDITIONAL） |
| 内部复核覆盖率 | 100% |
| 客户接受率 | 基线 +15% |
| 合规事件 | 0 |
| 年度复盘完成率 | 100% |

---

*配套：`09_trust_tax_mapping.md`（信托分配）、`10_pledge_vs_sell.md`（质押 vs 卖出）、`08_permission_matrix.md`（RM/内部团队权限）。*
