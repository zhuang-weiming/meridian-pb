# 10 — 为什么替换 Avaloq：先证明“哪一层”，再证明“换”

> 性质：内部架构论证 / 投委会与供应商尽调输入，不是对外宣传，不构成法律、税务或投资建议。
> 结论日期：2026-10-26。
> 关联：`02_architecture/README.md`、`02_architecture/nextgen-pb-demand-driven-architecture.html` §2/§6、`02.1_user_jounery/01–08`。

---

## 0. 三句话结论

1. **现有 `02.1` 能证明的是：客户生命周期需要一个以“人—授权—事件—证据”为主键的新核心；它还不能证明“整包 Avaloq 应该被替换”。** 这是体裁错位，不是研究不够。
2. **最可辩护的方案是“双核 / strangler”：新建客户生命周期核心（L1+L2），Avaloq 保留为账本与交易事实源（L0）。** 全量替换 ledger 是另一个决策，需要单独过 T5（经济性）闸门。
3. **如果领导坚持“平替 Avaloq”，必须补三张表：失败经济、架构因果、反事实 TCO。** 否则这句话在投委会、供应商尽调、监管沟通中会被击穿；而“继承 Avaloq 的强项”本身并不丢人，丢人的是层次没讲清。

---

## 1. 现有材料的五个错位

| # | 错位 | 在材料里的表现 | 后果 | 修正 |
|---|---|---|---|---|
| 1 | **体裁错位** | 用“客户旅程”直接推导“替换 Avaloq” | 旅程回答“客户要什么”，不回答“为什么现有系统做不到、为什么扩展不行、为什么现在换” | 每条旅程增加“现状失败链 → 架构根因 → 失败经济 → 反事实 → 决策”五段 |
| 2 | **层次错位** | 把 Avaloq 当成一个不可分割的“核心” | 一会儿说“继承 Avaloq 的账户/授权/信托/文档”，一会儿说“平替 Avaloq”，读者自然觉得自相矛盾 | 先分层：L0 账本 / L1 法律主体与授权 / L2 生命周期编排 / L3 体验与建议；逐层判定 |
| 3 | **证据错位** | 用名人传记与家族纠纷证明“富人痛点” | 只能证明“这类事会发生”，不能证明“银行当前交付失败”，更不能证明“客户会为此付费” | 三类证据分开：需求证据、失败证据、反事实证据（见 §6） |
| 4 | **法律错位** | D1 把“失能”和“身故”混成一条 72 小时故事；失能第 7 天开始跑 probate | 法务/合规一眼看出硬伤：人在世时没有 probate；POA/EPA/LPA/监护令与遗产管理是两条完全不同的法律链 | 拆成 D1a 失能、D1b 身故；把“72 小时”改为“合法授权下的时间压缩” |
| 5 | **叙事错位** | 文档大量写“继承/扩展 Avaloq”，标题却要“平替 Avaloq” | 领导会问：到底换什么？如果大部分继承，为什么还要换？ | 明确回答：换的是“主键与编排层”，不是“账本”；Avaloq 被“降级为 ledger”，不是“被全量替换” |

---

## 2. D1 / D2 / D3 的具体硬伤（必须先修）

### 2.1 D1：失能与身故是两条法律链，不能合并

现有 D1 的时间线是：

- T0 何启明心脏手术后**失能**；
- T+3 家庭要付医疗欠款、护工费、工资、贷款利息，**账户开始冻结**；
- T+7 银行等律师/公证/法院文件，**香港/新加坡/内地 2–3 个 probate 同时跑**。

这里至少有四个问题：

1. **失能不等于身故。** 人在世但失去心智能力时，走的是 POA / EPA / LPA / 法院任命的 deputy / 监护令；**没有 probate**。Probate 只在死亡后发生。
2. **失能后账户不会自动“冻结”。** 如果存在有效且已登记的持久授权书（EPA/LPA）或法院命令，受托代理人可以操作；银行可能因怀疑失能、欺诈、争议而限制交易，但“冻结”不是法律默认。
3. **死亡时 POA 自动终止。** 死亡后，代理人权限消失；遗嘱执行人/遗产管理人只有在**授予 probate / letters of administration** 后才取得完整管理权（少数辖区/小额遗产/ funeral expenses 有例外）。银行不能把“家属”直接切换成“控制人”。
4. **“72 小时拿到钱”如果指资产转移，是违规设计。** 可以做到的是：72 小时内完成**通知受理、授权图谱、紧急支付裁决、证据包、时间承诺**；不是绕过 probate 把资产转给家属。

**正确的 D1 设计目标**：

> 在失能/身故后的 72 小时内，银行能回答“谁现在有权做什么、依据哪份文件、哪些钱可以合法支付、下一步由谁在哪个辖区做什么”，并把这件事变成可审计的证据链；而不是“72 小时把遗产分完”。

这也更符合 HSBC 已公开的真实流程：HSBC UK 的 bereavement portal 要求死亡证明、遗嘱/ probate， sole account 通常冻结， joint account 转给 survivor， executor account 需要 will 或 grant of probate；英国居民有 will 的 £50,000 / 无 will 的 £25,000 门槛，但银行仍可要求 grant。HSBC 的 POA 页面还明确：POA 注册最长 **10 个工作日**；general POA 不能管理“丧失心智能力后”的账户；jointly appointed attorneys 不能使用 debit card / internet / mobile / telephone banking；**arrange an overdraft 对所有 POA 都是 No**。这些不是“银行落后”，而是**权限矩阵与法律边界**，设计必须尊重。

> 结论：D1 的“Wow”不应是“系统知道谁能签字”这一句空话，而应是“系统把法律权限、账户影响、可支付清单、证据缺口和下一步在 15 分钟内拼出来”；同时明确“不能做什么”。

### 2.2 D2：不要把“税务申报”写成银行代客报税

现有 D2 有一句关键判断：

> “Avaloq 的真实能力（同事口径）：TAX2 能算税、能生成申报；EasyTax 只做申报；Avaloq 也有扣税/缴税能力。”

这句话风险很高，原因是：

- **TAX2 是证券/利息/股息的税务计算与预扣引擎，不是英国/香港个人综合所得税申报平台。** 它可以支持 withholding、tax reporting、cost basis、CRS/FATCA 相关数据，但不能据此说“能生成 UK/HK 个人报税表”。
- **EasyTax 是瑞士各州税务申报生态的产品/集成**，不是全球个人税务申报引擎。把它写成“只做申报”，会让读者以为 Avaloq 自带全球申报能力。
- 私人银行通常**不代客报税**，也不出税务意见；它提供数据、凭证、预扣、CRS/FATCA 分类与报告，由客户/外部会计师申报。HSBC、UBS、Citi 的公开材料都反复强调“not tax or legal advice”“work with your independent tax/legal advisers”。

**正确的 D2 定位**：

> 银行不做“报税代理”，做“**adviser-ready 的税务数据包 + 预扣/申报接口 + 责任边界 + 证据链**”。客户/会计师用这个包去申报；银行对“数据完整、分类、预扣、时限提醒”负责，不对“税务结论”负责。

这样既专业，又能形成差异化：真正的痛点是“跨辖区、跨实体、跨资产类别的数据拼接”，不是“银行替我填表”。

### 2.3 D3：Avaloq 不是“没有抵押/折价/风险判断”

现有 D3 写：

> “Avaloq 缺的是折价率、实际价值、抵押金额、风险判断；这些判断在估值/信贷/外部评估系统。”

这句话**过宽**。Avaloq 官方 lending & credit 能力明确覆盖 securities-based lending、exotic collateral（艺术品、汽车等）、credit risk、collateral appraisal、complex loans。它缺的不是“折价率/抵押金额”这类基础信贷字段，而是：

- **未上市股权的估值治理**（方法、独立估值、折扣、复核频率、审批、异常值）；
- **Pre-IPO 生命周期**（融资轮、锁定期、IPO 窗口、静默期、老股转让、secondary、forward sale）；
- **质押执行与跨辖区证券法**（质押登记、公司同意、 change-of-control、insider/trading window、10b5-1、跨境执行）；
- **私有资产的义务日历**（capital call、distribution、earn-out、vendor loan、NAV）。
- **集中度/退出情景/税后比较**的一体化视图。

另外，“term sheet 从数周 → 3 天”也不现实。信贷、估值、法律、质押登记、跨境合规不可能 3 天全部完成。可辩护的目标是：

> **3 天内形成“可决策包”**（估值方法、LTV/折价、质押结构、先决条件、风险与退出路径），而不是“3 天批贷”。

---

## 3. 分层：Avaloq 到底是哪一层

先把“核心银行”拆开，否则“替换 Avaloq”永远吵不清。

| 层 | 内容 | 典型对象 | Avaloq 位置 | 本项目的需求 |
|---|---|---|---|---|
| **L0 账本 / 交易事实** | 持仓、现金、交易、结算、会计、公司行动、支付、托管、信贷余额 | Position / Transaction / Journal / Payment / Collateral | **强项**：统一数据模型、前中后台、证券/支付/信贷/会计 | 保留，作为 book of record |
| **L1 法律主体与授权** | 自然人/公司/信托/遗产、受益所有人、授权文书、能力、辖区、关系 | Party / LegalEntity / Trust / Estate / Authority / Capacity / Jurisdiction | **有 BP/REL/CRM/信托产品**，但原生主键仍是客户/账户/关系；不是“法律授权图谱” | 新建/替换客户核心 |
| **L2 生命周期编排** | 事件、任务、文件、决策、跨实体交接、时限、证据 | Event / Case / Task / Document / Decision / Evidence / Obligation | **有 workflow/client lifecycle/文档**，但偏 CRM/产品/组合生命周期，不是法律事件/证据原生 | 新建编排层 |
| **L3 体验与建议** | RM cockpit、客户 portal、AI、规划、报告 | Insight / Proposal / Journey / Communication | 不是 Avaloq 的主战场；HSBC 已在做（Wealth Intelligence） | 复用/合作/自建 |

**关键判断**：

- Avaloq 官方确实宣称“client lifecycle management”“complex clients”“multi-jurisdiction risk & compliance”。所以不能说“Avaloq 没有客户生命周期”。要说的是：**它的生命周期是“客户—产品—组合—交易”的生命周期；本项目要的是“法律主体—授权—事件—证据”的生命周期。**
- 这不是功能清单能解决的。功能可以加，但**主键、时点、证据语义**加不进去；加进去也会变成“shadow core”（影子核心）。
- 因此，“替换 Avaloq”应被精确表述为：**替换 L1+L2 的客户生命周期核心，保留 L0 的 Avaloq 账本；L3 独立演进。**

> 一句话：**Avaloq 继续做“账”，新核心做“权、事、证、编排”。**

---

## 4. 五个替换测试（T1–T5）

每条旅程打分 0/1/2，总分 10。不是精确科学，是把争论从“感觉”拉到“可验证”。

| 测试 | 问题 | 2 分意味着 | 需要的证据 |
|---|---|---|---|
| **T1 语义主键** | 旅程是否要求一个 Avaloq 没有的主键（人—授权—事件—证据），而不是账户/组合的字段扩展？ | 必须新建对象模型，字段扩展会形成 shadow core | 对象图、数据血缘、供应商确认 |
| **T2 事件与时点** | 是否要求“as-of 某日谁有权/什么有效”，而不是 end-of-day 余额？ | 必须事件溯源/双时态，批处理不够 | 事件清单、重放需求、审计要求 |
| **T3 跨实体/跨境** | 是否要求多法律实体、多辖区、多法院命令的排序与交接？ | 必须跨实体编排与法律冲突裁决 | 辖区清单、实体清单、法律意见 |
| **T4 证据级** | 是否要求法院/监管可采信的决策链（谁、何时、依据、批准、送达）？ | 必须证据模型与不可篡改日志 | 诉讼/监管样本、法务要求 |
| **T5 经济性** | 扩展 Avaloq 的 3 年 TCO/变更速度/升级风险，是否明显劣于替换？ | 有量化模型，且替换 NPV 更优 | 内部工时、供应商报价、升级记录、迁移成本 |

### 4.1 打分（假设，待验证）

| 旅程 | T1 | T2 | T3 | T4 | T5 | 合计 | 判定 |
|---|---:|---:|---:|---:|---:|---:|---|
| **D1 失能/身故** | 2 | 2 | 2 | 2 | ? | **8+** | 新客户核心；Avaloq 做账本 |
| **D2 跨境税务** | 2 | 1 | 2 | 1 | ? | **6+** | 编排层 + 税务数据包；不必换账本 |
| **D3 Pre-IPO/私股** | 2 | 1 | 2 | 2 | ? | **7+** | 私有资产生命周期；Avaloq 做信贷/持仓 |
| **D4 集团/Chinese Wall** | 0 | 0 | 1 | 1 | ? | **2+** | **保留 Avaloq**，它是强项 |
| **D5 PB 入门/创作者** | 1 | 1 | 1 | 1 | ? | **4+** | 渠道/体验层扩展 |
| **D6 餐饮/加盟传承** | 1 | 1 | 1 | 1 | ? | **4+** | 体验/合作层扩展 |
| **D7 APP 欺诈** | 1 | 1 | 0 | 2 | ? | **4+** | 风控/证据层扩展 |

**读法**：

- **D1、D3 是“换客户核心”的最强候选**：它们同时要求语义、时点、跨境、证据。
- **D2 是“编排 + 数据”**：税本身有大量外部顾问与本地规则，换账本收益小。
- **D4 明确不换**：集团客户、账户、授权、额度、Chinese Wall 是 Avaloq 的强项；把它写进“替换”会自伤论证。
- **D5–D7 是“体验/风控扩展”**：不要拿来当“换核心”的证据。

> T5 全部是问号，这是故意的：**没有 T5，就没有“替换”结论，只有“新建客户核心”的结论。**

### 4.2 判定规则

| 条件 | 结论 |
|---|---|
| T1–T4 ≥ 7，且 T5 证明扩展更差 | 替换 L1+L2 客户核心；评估 L0 |
| T1–T4 ≥ 7，T5 未证明 | 新建 L1+L2；Avaloq 保留 L0；**不要宣布“平替 Avaloq”** |
| T1–T4 4–6 | 扩展/编排；不换核心 |
| T1–T4 ≤ 3 | 保留 Avaloq；做渠道/流程优化 |

---

## 5. 反事实：扩展、双核、全量替换

| 方案 | 范围 | 优点 | 缺点 | 典型周期 | 风险 | 何时选 |
|---|---|---|---|---|---|---|
| **A. 扩展 Avaloq** | 在 Avaloq 上加自定义对象、工作流、文档、API | 迁移风险低；复用账本/信贷/支付；上线快 | 影子核心；双份数据；升级更贵；每加一条旅程多一层定制；供应商锁定 | 6–12 个月/条 | 中 | T1–T4 ≤ 6；或 T5 未证明 |
| **B. 双核 / strangler** | 新 L1+L2 客户核心；Avaloq 保留 L0；API/事件集成 | 语义正确；可渐进；Avaloq 继续稳定记账；失败可回退 | 双跑/集成复杂；数据 ownership 要定；组织要改 | 18–36 个月 | 中高 | **推荐**：D1/D3 强、D2 中、D4 保留 |
| **C. 全量替换** | L0–L2 全换 | 单平台；长期简单 | 迁移/并行/监管/供应商退出风险最高；Avaloq 的功能广度很难短期复制 | 36–60 个月 | 高 | T5 明确证明；且有强监管/供应商理由 |

**推荐：B。** 理由不是“B 最便宜”，而是“B 把不可逆决策推迟到证据足够时”：

- 先用 D1/D3 证明新核心的语义价值；
- 用 D2 证明编排/数据价值；
- 用 D4 证明 Avaloq 在账本/集团客户上的不可替代性；
- 12–18 个月后再决定 L0 是否替换。

---

## 6. 失败经济：把“痛”变成钱

“替换”不是靠“客户体验更好”说服 CFO 的，而是靠**现状的失败成本**。建议建一张 12 项基线表：

| 类别 | 指标 | 数据源 | 用途 |
|---|---|---|---|
| 时间 | 授权核验时长；首笔合法支付时长；资产释放时长；estate 关闭时长 | 工单/日志/访谈 | 体验与风险 |
| 人工 | 每个事件的 RM/ops/legal/compliance 小时；手工录入次数；邮件/Excel 轮次 | 时间研究 | 自动化收益 |
| 质量 | 返工率；错付/漏付；文件缺失；跨实体不一致 | 事件复盘 | 风险成本 |
| 法律 | 外部律师费；诉讼/调解；法院命令响应 | 财务/法务 | 失败经济 |
| 监管 | 投诉/补偿；罚款/ remediation；审计发现 | 合规 | 风险成本 |
| 收入 | 事件期间 AUM 流失；未做的信贷/流动性；客户转介下降 | CRM/财务 | 机会成本 |
| 变更 | 每次监管/产品变更的 IT 人天；Avaloq 升级/定制成本 | IT/供应商 | T5 |
| 资本 | 双跑/迁移/并行成本 | 项目财务 | 反事实 |

**模板公式**（示例数字仅用于说明，不是 HSBC 数据）：

> 现状年成本 ≈ 事件数 × 每事件人工小时 × 全载成本 + 外部法律/专业费 + 投诉/补偿 + 返工 + 流失 AUM × 利润率 + 变更人天 × 费率。

如果一年 500 个高净值事件、每件 20 小时、全载 $150/小时，仅人工就是 **$1.5m**；再加上法律、投诉、流失与变更，才可能形成“替换/新建”的正 NPV。**没有这张表，就不要在投委会说“TCO 更低”。**

---

## 7. 分阶段路径与闸门

| 阶段 | 时间 | 交付 | 闸门 |
|---|---|---|---|
| **P0 证据基线** | 0–3 月 | 事件 taxonomy；授权图谱 v0；12 项基线；Avaloq 定制/升级清单；供应商 TCO RFI | G0：T5 数据可用 |
| **P1 编排 MVP** | 3–9 月 | D1a/D1b、D2、D3 的 case/authority/evidence 对象；Avaloq API 适配；文档 vault；RM cockpit | G1：D1 合法时间压缩 ≥30%；D3 可决策包 ≤3 天 |
| **P2 客户核心** | 9–18 月 | L1/L2 生产化；多实体/多辖区；证据包；权限矩阵；合作伙伴 | G2：T1–T4 验收；无重大监管发现 |
| **P3 账本决策** | 18–36 月 | Avaloq 作为 L0 稳定运行；或启动 L0 替换论证 | G3：T5 3 年 NPV/迁移/退出条款 |

**闸门规则**：

- G0 不过，不准写“替换 Avaloq”；
- G1 不过，不准扩 scope 到全量；
- G2 不过，不准迁移客户核心；
- G3 不过，不准动 ledger。

---

## 8. 对 `02.1` 的具体修改清单

1. **拆 D1**：`01a-incapacity.md`（失能）与 `01b-death-estate.md`（身故/遗产）；两条不同的法律链、不同的权限矩阵、不同的时间线。
2. **把“72 小时”改成“合法时间压缩”**：定义 72h 内必须完成的 5 件事（受理、授权图谱、紧急支付裁决、证据缺口、下一步/时限），并写明“不做资产转移”。
3. **D2 改成“税务数据包”**：删除“TAX2 能生成申报”的绝对化表述；增加“数据包字段、预扣、CRS/FATCA、责任矩阵、顾问接口”。
4. **D3 改成“私有资产生命周期”**：估值治理 → 质押 → 监控 → 退出；把“LTV/折价”从“Avaloq 没有”改为“Avaloq 有基础信贷能力，但缺私有资产治理与生命周期对象”。
5. **每条旅程加五段**：现状失败链、架构根因、失败经济、反事实、决策/闸门。
6. **建设决策按层写**：L0 继承 / L1 新建 / L2 新建 / L3 合作；不要用一个大“Avaloq 改造/重写”列。
7. **加“负向需求”**：不得代客报税/出法律意见；不得在授权前披露/支付；不得绕过 probate；不得未经批准跨境传输；不得对家属“口头承诺”。
8. **加“证据等级”**：每个系统步骤标注 E0（口头）/E1（文件）/E2（可验证文件）/E3（法院/监管可采信）。
9. **加“决策日志”**：谁在何时依据什么批准了架构例外；这是替换论据的一部分。
10. **改标题/口号**：从“平替 Avaloq”改为“**升级客户生命周期核心，Avaloq 保留为账本**”；如果必须保留“平替”，加副标题“替换的是 L1+L2，不是 L0”。

---

## 9. 给领导的一句话

> 我们不是要换掉 Avaloq 的账本；我们要换掉“以账户为中心”的主键。  
> Avaloq 继续做账、做交易、做信贷余额；新核心做“谁有权、发生了什么、依据什么、下一步谁做”。  
> 如果要做全量替换，请先批准 T5 的 3 年 TCO/迁移验证；在那之前，宣布“平替 Avaloq”是不负责任的。

---

## 10. 主要来源

- HSBC Holdings plc, *Annual Report and Accounts 2025*：wealth balances US$2.1tn（亚洲 US$1.2tn）、wealth fee & other income US$9.4bn（+24%）、IWPB revenue US$14.5bn、net new invested assets US$80bn。  
  https://www.hsbc.com/investors/results-and-announcements/annual-report
- HSBC Private Bank 部署 Avaloq Banking Suite（Switzerland 首发，亚洲 2–3 年 rollout）：  
  https://www.fintechfutures.com/core-banking-technology/hsbc-private-bank-live-with-new-core-banking-system-avaloq-banking-suite  
  https://asianprivatebanker.com/technology-digital-innovation/hsbc-pb-goes-live-avaloq-switzerland-asia-will-wait/
- Avaloq 官方能力：client management、investment management、lending & credit、treasury/risk/compliance。  
  https://www.avaloq.com/platform/client-management  
  https://www.avaloq.com/platform/lending-and-credit  
  https://www.avaloq.com/platform/treasury-risk-and-compliance
- Avaloq 官方博客：private equity 的 capital call、distribution、valuation、tax、reporting 是按上市证券设计的运营模式的“scaling challenge”。  
  https://www.avaloq.com/insights/blog/private-equity-the-real-scaling-challenge-for-banks
- Swisscom, *Core Banking Radar – Avaloq*：覆盖全面，但 implementation/upgrades “comparatively cost- and resource-intensive”，存在 customization layer，TCO 是客户关注点。  
  https://www.swisscom.ch/en/business/enterprise/themen/banking/systemarchitektur-bank-zukunft/avaloq.html
- HSBC UK bereavement / POA 官方流程与权限矩阵：  
  https://www.hsbc.co.uk/help/life-events/bereavement/what-to-do-when-someone-dies/  
  https://www.hsbc.co.uk/help/life-events/poa/registering-for-poa-with-hsbc/
- Financial Ombudsman Service（HSBC/First Direct）案例：LPA 注册、线上访问、法院命令优先于 POA、probate 后 executor 权限。  
  https://www.financial-ombudsman.org.uk/decision/DRN-6406571.pdf  
  https://www.financial-ombudsman.org.uk/decision/DRN6866791.pdf  
  https://www.financial-ombudsman.org.uk/decision/DRN-4737924.pdf
- Which?, *Banks bungling Power of Attorney registration*（2023-04-03）：HSBC 在 POA 注册体验上评分偏低（27%）。  
  https://www.which.co.uk/news/article/banks-bungling-power-of-attorney-registration-apQ3p0U8o13s
