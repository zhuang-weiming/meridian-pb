# 12 — 失能/身故、税务、Pre-IPO：Avaloq / UBS / Citi / SCB 的业务与系统机制

> 性质：公开资料与行业机制研究，不是法律/税务/投资建议；不主张任何机构的服务一定适用于 HSBC 或任何辖区。
> 目的：回答三个问题——(1) 主客户病重/身故时，RM 与银行到底能做什么、不能做什么；(2) 银行如何帮客户整理个人财务收入报税；(3) 银行如何处理 Pre-IPO 股票。
> 原则：把“法律权限”“银行角色”“系统对象”“商业产品”分开写；不用营销语言替代机制。

---

## 0. 一张表看懂

| 场景 | 客户真正需要的 | 银行的真实角色 | 关键对象 | Avaloq 的位置 | UBS | Citi | SCB |
|---|---|---|---|---|---|---|---|
| **失能** | 谁现在能替我决策、能付哪些钱、依据什么 | POA/EPA/LPA/deputy 的登记与执行；不是法院 | `Authority`/`CapacityEvent`/`Payment` | 账户/授权/支付强；法律授权图谱弱 | estate planning 框架（will/trust/DPOA） | trust/estate planning + 独立法律顾问 | legacy planning/trust/philanthropy |
| **身故** | 谁有权处理遗产、何时能拿到钱、税/债/受益 | executor/administrator 的银行接口；trustee 的信托管理 | `DeathEvent`/`EstateCase`/`ProbateCase`/`TrustCase` | 账户/文档/支付强；probate/证据编排弱 | estate planning + trust services（第三方） | trust/estate + family office | legacy/trust/estate planning |
| **税务** | 我在哪交、交什么、谁来报、证据在哪 | 数据/预扣/CRS/FATCA/报告；通常不代客报税 | `TaxResidency`/`IncomeStream`/`TaxLot`/`ReportingPack` | TAX2/预扣/CRS/FATCA 强；全球个人申报弱 | tax reporting/transparency | tax reporting + 独立顾问 | tax reporting/CRS |
| **Pre-IPO** | 不卖股怎么拿钱、估值/质押/退出怎么算 | 信贷/质押/对冲/二级/资本市场 | `PrivateAsset`/`Valuation`/`Pledge`/`Obligation`/`Exit` | 标准信贷/抵押强；私股生命周期弱 | Lombard/bespoke/concentrated stock | margin lending + Private Capital Group | wealth lending + succession 差异化 |

> 一句话：**三家大行都不是“没有服务”，而是“服务由人、邮件、Excel、外部律师/估值师拼起来”；Avaloq 不是“没有能力”，而是“能力围绕账户/组合，不围绕法律事件/授权/证据”。**

---

# 1. 失能/身故：RM 到底能做什么？

## 1.1 先分清两条法律链

这是现有 D1 最大的问题：把“失能”和“身故”混在一起。两者法律链完全不同。

### A. 失能（在世但失去心智能力）

| 阶段 | 触发 | 谁有权 | 关键文件 | 银行动作 | 系统对象 | 常见失败 |
|---|---|---|---|---|---|---|
| 能力尚存 | 客户想预先安排 | 客户 + 律师 | POA / EPA / LPA（视辖区） | 见证/登记/教育；不替代律师 | `AuthorityDraft` | 客户拖延、文件没登记 |
| 能力下降 | 医疗/家属/银行怀疑 | 仍为客户；必要时法院 | 医疗证明、能力评估 | 限制异常交易；提示家属/律师；不擅自披露 | `CapacityConcern` | 银行“假装没看见”或“过度冻结” |
| 能力丧失 | 法院/医生/登记机构确认 | 代理人/ deputy / committee | 已登记的 POA/EPA/LPA；法院命令 | 登记代理人；设置权限；支付 | `Authority`/`Scope`/`Registration` | 文件范围不清、joint attorney 冲突、银行系统不支持 |
| 争议 | 家属/受益人/银行冲突 | 法院 | 监护/ deputyship/禁令 | 遵守法院命令；必要时冻结/申请指示 | `CourtOrder`/`Dispute` | 银行自行判断“谁更适合” |

**关键点**：

- **没有 probate**。Probate 是死亡后的遗产认证。
- **POA 不是无限授权**。权限受文书、辖区、银行政策限制；例如 HSBC UK 的权限矩阵明确：general POA 不能在客户丧失能力后管理账户；jointly appointed attorneys 不能使用 debit card/internet/mobile/telephone banking；**arrange an overdraft 对所有 POA 都是 No**。
- **银行可以拒绝/限制**。如果怀疑欺诈、胁迫、能力争议、文件伪造，银行应升级/查询，甚至申请法院指示；这不是“刁难”，是义务。

### B. 身故

| 阶段 | 触发 | 谁有权 | 关键文件 | 银行动作 | 系统对象 | 常见失败 |
|---|---|---|---|---|---|---|
| 死亡通知 | 家属/律师/ funeral director | 无人“自动”取得账户控制 | 死亡证明 | 记录死亡、停止营销、保护资产、告知流程 | `DeathEvent` | 信息泄露给无权家属 |
| POA 终止 | 死亡 | 代理人权限自动终止 | — | 停用 POA/第三方授权 | `AuthorityRevocation` | 系统仍显示 POA 有效 |
| 遗产管理 | 死亡后 | executor（遗嘱） / administrator（无遗嘱） | will / grant of probate / letters of administration | 验证、冻结/限制、披露给授权人 | `EstateCase`/`ProbateCase` | 家属以为“有遗嘱就能取钱” |
| 遗产账户 | grant 后 | executor/administrator | grant + ID + 账户文件 | 开 estate account、收款、付债/税/费用 | `EstateAccount` | 跨境 grant 不被承认 |
| 信托 | 死亡（视信托） | trustee | 信托契约、意愿书、死亡证明 | 信托继续/终止、分配、受益支付 | `TrustCase`/`BenefitPayment` | 把信托资产当遗产 |
| 跨境 | 多辖区资产 | 各地 executor/administrator/trustee | 本地 grant/reseal/法律意见 | 本地承认/执行；可能需要本地律师 | `CrossBorderCase`/`OrderConflict` | 一个 grant 想管全球 |

**关键点**：

- **死亡时 POA 自动终止**；executor 的完整权限通常要等 grant（少数辖区/小额/ funeral 例外）。
- **joint account 不一定进遗产**：可能转给 survivor，但取决于账户受益权/当地法；银行不能只看“联名”。
- **信托资产不是遗产**：trustee 按信托契约/意愿书/法院命令处理；executor 不能直接拿走。
- **跨境不是“翻译+公证”**：需要 local grant/reseal/承认/执行；一个法院命令可能在另一个辖区无效。
- **银行不是法院**：银行只能按授权文件/法院命令执行；有争议时，申请指示/冻结/升级，而不是“谁看起来更像继承人就给谁”。

## 1.2 HSBC：已经有服务，缺口在“跨实体/跨境/证据/时效”

### HSBC UK 的公开流程

- **Bereavement portal**：在线通知、上传死亡证明/遗嘱/probate； dedicated bereavement support team 审核；电话 0800 085 1992。
- **账户处理**：sole accounts 通常冻结（可收款）；joint account 视情况转 survivor；ey 可开 Executor Bank Account；需要 will 或 grant of probate；无遗嘱则按法定规则，可能要 Letters of Administration。
- **金额门槛**：英国居民，有 will/grant of probate £50,000；无 will/letters of administration £25,000；但银行仍可要求 grant，即使低于门槛。
- **POA**：可在线/分行登记；最长 **10 个工作日**；需要全部页面、认证、ID；登记后发 debit card/电话银行（在权限允许时）；donor 有 capacity 时通知 donor，否则通知主 attorney/deputy。
- **POA 权限矩阵**（节选）：general POA 不能管理“丧失能力后”的账户；EPA/LPA 可以；jointly appointed attorneys 不能使用 debit card/internet/mobile/telephone banking；**arrange an overdraft：No（所有类型）**；open/close accounts：general POA No，EPA/LPA Yes。
- **死亡后**：POA/第三方授权自动取消；银行只与有法律权限的人沟通。

### HSBC Private Bank 的公开服务

- **Estate administration**：可担任 executor；强调大型、多辖区遗产，可能“many months or even years”；专业 executor 收集资产、清债、分配；可接 trust administration。
- **Liquidity planning**：为遗产税/传承/家庭分配准备流动性；custom lending。
- **Planning for the future / family governance / philanthropy / trust administration**：说明 HSBC 不是“没有身故/传承服务”。
- **Private Bank 免责声明**：不构成法律/税务/投资建议；服务由不同 HSBC 实体提供。

### 真实投诉/操作证据

- **FOS DRN-4737924**：grant of probate 2023-08-16 签发；executor 2023-08-21 向 HSBC 登记并提交关闭表格；2023-08-24 HSBC 确认并做受益人是非/来源检查；2023-08-31 款项转给 executor 指定账户；次日账户关闭。HSBC 的 deceased account closure guideline 是 **up to 15 working days**；本案 10 天，FOS 认为没有不合理延迟。  
  → 说明“银行等 3–30 天”不是空穴来风，但也不是“银行故意拖”；**grant + KYC + 受益人是非/来源检查**需要时间。真正可压缩的是“信息/证据/编排”，不是法律程序。
- **FOS DRN6866791**：法院 Court of Protection 命令优先于 POA；银行必须遵守法院命令；死亡后 executor 权限要等 probate；此前的 POA 已撤销。  
  → 说明“系统里谁有权”必须能表达“法院命令 > POA > 家属期待”，而不是一张静态授权表。
- **FOS DRN-6406571**：HSBC/First Direct 的 LPA 注册后，客户仍被锁在网银外；验证码发到 donor 手机； attorney 无法及时取得；银行流程/系统限制导致体验失败。  
  → 说明“授权登记”≠“授权可用”；系统必须支持 attorney 的独立凭证/权限，而不是借用 donor 的登录。
- **Which? 2023**：2,906 名 attorney 调查；HSBC 的 POA 注册体验被 27% 评为差；超过 1/5 对沟通评分低于平均。  
  → 说明这是**行业性运营痛点**，不是单个客户抱怨；对 HSBC 尤其相关。

### 判断

> HSBC 已经不缺“身故/遗产/信托”的服务菜单；缺的是**跨实体、跨辖区、跨系统地把这些服务变成可编排、可证明、可承诺时效的体验**。  
> 这不是“再做一个 portal”能解决的；需要 authority/event/evidence 的对象模型。

## 1.3 UBS：estate planning 框架 + Wealth Way + GFO 数据

UBS 公开的 estate planning 框架（美国市场页面）包括：

- **Will**：指定 executor、监护人、分配；
- **Revocable living trust**：避免 probate、隐私、失能后的 continuity；
- **Durable power of attorney**：财务决策；
- **Health care directive / HIPAA**：医疗决策与信息授权；
- **Irrevocable trusts**：税务/资产保护/慈善；
- **Insurance**：流动性；
- **Communication**：与家人沟通计划。

UBS 明确：**UBS Financial Services / its employees do not provide tax or legal advice**；trust services 由 UBS 关联信托实体或第三方提供（视辖区）；客户应与自己的律师/税务顾问合作。

**Wealth Way**：Liquidity / Longevity / Legacy 三个“账户/目标”框架；把“今天能花、未来够花、身后怎么传”分开。这是很好的**客户语言**，但不是法律授权系统。

**GFO 2025**（UBS Global Family Office Report）：

- 317 家 family offices，平均财富 US$1.1bn；
- 53% 有财富传承计划；
- 43% 认为“培养下一代负责任地接管财富”是最大挑战；
- 只有 26% 从最初就咨询下一代。

**判断**：UBS 的强项是**规划框架/家族办公室洞察/全球平台**；具体 estate administration/POA 执行仍依赖当地法律、第三方 trustee、客户顾问。它的“系统”更多是顾问工具/报告，不是法院级 evidence engine。

## 1.4 Citi：trust/estate planning + 独立顾问 + family office

Citi Private Bank 公开材料：

- **Trust/estate planning**：与客户及其独立法律/税务顾问合作；不替代律师；Citi Trust 实体在部分辖区提供 trustee 服务。
- **Family office advisory**：只服务 AUM >US$100m 的单一家族办公室；治理、继任、下一代教育、运营。
- **Private Capital Group**：服务 family offices/private investment companies/private holding companies；1,400 客户、77 国（截至 2021-01）；estate/inheritance/succession/pre-IPO/liquidity planning、跨 border structuring、pre-immigration。
- **Lending**：margin lending、concentrated stock、private equity capital call、art/aircraft 等。

**判断**：Citi 的强项是**把投资银行、资本市场、私行、family office 组合起来**；对“身故/失能”的具体操作，公开信息不如 HSBC UK 的 bereavement/POA 流程细；更多是“顾问+信托实体+法律顾问”的模式。

## 1.5 SCB：legacy planning + trust/philanthropy + next-gen

SCB 公开材料：

- **Legacy planning**：family office setup、wealth planning、trust、philanthropy advice；与下一代一起规划；RM/专家团队；one-bank 能力。
- **The Great Repositioning**（最新一期）：74% family office 专业人士观察到家族冲突上升；54% 考虑迁移/重组；87% 认为更好的 succession planning 可节省数百万；84% 认为需要下一代参与；76% 认为 AI 重要。
- **Online estate planning**（肯尼亚等市场）：数字遗嘱/信托创建；说明 SCB 在新兴市场用数字工具做 estate planning，而不是只靠 RM。
- **Trust/estate planning**：在部分市场有 local trust company/partner；跨境能力取决于辖区。

**判断**：SCB 的差异化是**新兴市场+跨境+下一代+信托/慈善**；不是“pre-IPO 信贷”的公开强项。它的 estate planning 数字化尝试值得关注，但深度/辖区覆盖不如 HSBC/UBS/Citi 的成熟市场体系。

## 1.6 Avaloq：账户/授权/文档强，法律事件/证据编排弱

**公开能力**：

- Client management：front office 一站式、client lifecycle、contacts/portfolios、tasks、compliance items、timeline。
- Trust/portfolio：账户、授权、受益人、决策人、信托产品、文档版本（HSBC 同事口径；需供应商确认）。
- Payments/credit/accounting：强。
- Treasury/risk/compliance：多辖区监管、风险限额、报告。

**待验证的缺口（不要写成公开事实）**：

| 缺口假设 | 为什么重要 | 验证方法 |
|---|---|---|
| 没有原生 `Authority` 对象（文书/范围/生效/失效/辖区/登记） | 失能/身故/POA 的核心 | 供应商 demo + 数据模型审查 |
| 没有原生 `DeathEvent`/`CapacityEvent` 事件 | 无法 as-of 重放“当时谁有权” | 事件模型/审计日志审查 |
| 没有 `ProbateCase`/`EstateCase`/`CrossBorderCase` | 跨境遗产是 D1 的核心 | 产品 roadmap/参考客户 |
| 没有 `EvidencePack`/`DecisionRecord` 法院级证据 | 受托人/银行决定要能证明 | 审计/法务需求 |
| 没有 `PrivateAsset` 生命周期/估值治理 | Pre-IPO/私股是 D3 的核心 | 信贷/估值模块审查 |
| 没有“角色冲突/家族分支/受托人冲突”图谱 | Tao/Kan 的核心 | 关系模型/Chinese Wall |

> 结论：Avaloq 可以做“账户/支付/文档/信贷”的事实源；但 D1/D3 需要的新对象，**大概率要在 Avaloq 之外建**。这不等于“Avaloq 不好”，而是“主键不同”。

## 1.7 RM 的角色：关系连续性，不是法律权限

| RM 能做 | RM 不能做 |
|---|---|
| 第一时间表达哀悼/稳定客户 | 不能自行判断“谁有权” |
| 解释流程、收集文件、引荐 bereavement/estate/trust 团队 | 不能向无权家属披露账户/余额/受益信息 |
| 协调内部（ops/legal/compliance/tax/credit） | 不能承诺“几天内拿到钱” |
| 维护家族关系、下一代 onboarding | 不能替代律师/法院/ executor |
| 记录客户意愿/家庭结构（在合规范围内） | 不能绕过 POA/probate/trust deed |
| 识别冲突/异常/欺诈并升级 | 不能“看在客户面子上”破例 |

**系统要求**：

- `ClientStatus`：active / capacity concern / incapacitated / deceased / estate / trust；
- `AuthorityRegister`：文书、范围、生效/失效、辖区、登记、法院命令；
- `DocumentVault`：版本、认证、翻译、送达；
- `CaseOrchestration`：任务、SLA、责任方、跨实体；
- `EstateLedger`/`TrustLedger`：资产、负债、费用、受益支付；
- `EvidencePack`：谁、何时、依据、批准、披露；
- `ConflictRegister`：家族分支、受托人角色、商业关系；
- `CommunicationLog`：对谁说了什么、依据什么。

## 1.8 对 D1 的设计含义

1. **拆成 D1a（失能）与 D1b（身故）**；不要用同一条 72 小时。
2. **72 小时 = 授权清晰 + 紧急支付裁决 + 证据缺口 + 下一步/时限**；不是资产转移。
3. **加“负向需求”**：不得在授权前披露/支付；不得绕过 probate；不得把信托资产当遗产；不得对家属做口头承诺；不得未经批准跨境传输。
4. **加“权限矩阵”**：像 HSBC POA 表一样，明确“谁能做什么/不能做什么”；joint attorney、general POA、overdraft 等限制要进系统。
5. **加“跨境命令冲突”**：法院命令/禁令/本地 grant 的优先级；不是文件清单。
6. **加“长期账本”**：72 小时 → 90 天 → 3 年 → 20 年；estate/trust 双账本。

---

# 2. 税务：银行到底能帮到什么程度？

## 2.1 先划线：银行通常不代客报税

公开材料里，HSBC Private Bank、UBS、Citi 都明确或隐含：

- 银行提供**数据、凭证、预扣、报告、协调**；
- **不提供**个人税务/法律意见（除非有独立持牌实体）；
- 客户/外部会计师负责**申报/签字**；
- 银行对“数据准确/分类/预扣/时限”负责，不对“税务结论”负责。

所以 D2 的正确表述不是“银行帮客户报税”，而是：

> **银行把客户在银行体系内的收入、成本、预扣、身份、实体、交易，整理成“adviser-ready 的税务数据包”，并负责 CRS/FATCA/预扣/报告；客户与顾问用它去申报。**

## 2.2 税务运营链

| 步骤 | 银行做什么 | 数据/对象 | 谁负责 | 系统 |
|---|---|---|---|---|
| 1. 身份/居民 | 收集 self-cert、TIN、地址、停留天数、indicia | `TaxResidency`/`Indicia` | 客户/银行 KYC | 税务引擎/CRS |
| 2. 实体分类 | 公司/信托/合伙/基金；被动/主动 NFE；控制人 | `EntityTaxClass`/`ControllingPerson` | 银行 + 法律顾问 | 实体图谱 |
| 3. 收入分类 | 利息/股息/资本利得/公司行动/FX/私股分配 | `IncomeStream`/`TaxLot`/`CostBasis` | 银行 | 税务/组合会计 |
| 4. 预扣 | 美国 NRA/backup withholding、瑞士/英国等 | `Withholding`/`TreatyClaim` | 银行 | 支付/税务 |
| 5. 报告 | 1042-S/1099、CRS XML、FATCA XML、本地税表 | `TaxReport`/`CRSReport` | 银行 | 报告引擎 |
| 6. 客户包 | 年度汇总、实现/未实现、收入/预扣、成本 | `TaxPack` | 银行 | 报表/portal |
| 7. 申报/缴纳 | 通常客户/会计师；银行可代扣/代缴 | `FilingPackage`/`TaxPayment` | 客户/顾问 | 外部 |
| 8. 历史补救 | 未申报/错报/罚款/罚金 | `RemediationCase` | 银行 + 顾问 | 案件/证据 |

**关键数据**：

- **Tax lot/cost basis**：没有它，资本利得/亏损无法算；跨账户/跨实体更难。
- **Income classification**：利息/股息/资本利得/return of capital/ PFIC/871(m) 等；不同辖区不同。
- **Entity look-through**：信托/公司/合伙的受益所有人/控制人；CRS/FATCA 的核心。
- **Withholding/treaty**：W-8BEN/W-9、treaty claim、QI/Chapter 3/4。
- **Private assets**：capital call/distribution/NAV/估值日；税务基础与上市证券完全不同。
- **Multi-entity aggregation**：同一客户在多个 HSBC 实体的账户；年度包要合并，但法律实体/隐私/数据出境要合规。

## 2.3 各家的公开机制

### HSBC

- 全球 CRS/FATCA 合规；美国纳税人/离岸账户历史问题导致 2019 DOJ DPA（HSBC Private Bank (Suisse) SA，US$192.35m）。
- 私行/零售提供 tax reporting、年度利息/股息凭证、资本利得/预扣信息；具体包因辖区而异。
- 明确不构成税务/法律建议；复杂税务由客户顾问处理。
- **判断**：HSBC 的强项是**全球网络+预扣/报告+历史补救经验**；弱项是**跨实体/跨资产/跨辖区的“一个客户一个税务数据包”**。

### UBS

- 全球 tax reporting/transparency；提供税务报表/凭证；强调客户应与独立税务顾问合作。
- 私行/财富管理有 tax planning 支持，但通常不是“代客报税”。
- **判断**：UBS 的强项是**全球报告标准/跨境财富规划**；具体申报仍本地化。

### Citi

- 全球托管/报告；tax reporting 与独立顾问协作；Private Capital Group 提供跨 border structuring/pre-immigration 等。
- **判断**：Citi 的强项是**机构级报告+跨境结构+family office**；个人税务申报依赖顾问。

### SCB

- CRS/FATCA、本地 tax reporting；wealth planning 与税务顾问协作；新兴市场本地化强。
- **判断**：SCB 的强项是**本地市场+跨境网络**；税务深度取决于辖区。

### Avaloq

- TAX2/预扣/CRS/FATCA、EasyTax（瑞士；业内口径，需供应商确认）；组合会计/成本基础；报告。
- **强项**：托管资产、上市证券、预扣、监管报告。
- **弱项（待验证）**：全球个人综合所得税申报；私股/信托/跨实体税务基础；多辖区规则包；客户/顾问协同界面。
- **判断**：Avaloq 适合做“银行侧税务数据/预扣/报告引擎”，不适合被当成“全球个人报税平台”。

## 2.4 对 D2 的设计含义

1. **改口号**：从“帮客户报税”改为“**adviser-ready tax data pack**”。
2. **加责任矩阵**：银行/客户/顾问/信托/雇主各负责什么；每个字段标“银行责任/客户责任/顾问责任”。
3. **加数据包字段**：身份/居民、账户/实体、收入分类、成本基础、实现/未实现、预扣、CRS/FATCA、私股分配、外汇、费用。
4. **加“不可做”**：不代签、不出税务意见、不保证“零漏报/零双重征税”；不把 CRS 报告当个人报税表。
5. **加顾问 portal**：客户授权后，会计师/律师可下载/核对；所有访问留痕。
6. **加历史补救**：未申报/错报/罚款；这是 HSBC 的真实经验，也是高净值客户最怕的。
7. **指标**：数据包完整率、顾问退回率、预扣准确率、CRS/FATCA 及时率、补救周期；不是“报税 0 错误”。

---

# 3. Pre-IPO：不是“贷款产品”，是“私有资产生命周期”

## 3.1 生命周期

| 阶段 | 客户问题 | 银行角色 | 对象 | 风险 |
|---|---|---|---|---|
| 识别 | 我到底有多少“可质押/可花费” | 财富诊断、集中度 | `PrivateAsset`/`Concentration` | 纸面财富幻觉 |
| 估值 | 值多少、凭什么、多久更新 | 估值委员会/外部估值师 | `Valuation`/`ValuationGovernance` | 估值过高/过低 |
| 结构 | 押股/卖老股/对冲/融资 | 投行/信贷/法律/税务 | `Structure`/`Pledge` | 控制权/税/证券法 |
| 授信 | 能借多少、利率/期限/追保 | 信贷委员会 | `CreditFacility`/`LTV`/`Covenant` | 集中度/流动性 |
| 文件 | 质押登记/公司同意/跨境 | 法律/ops | `SecurityDocument`/`PledgeRegistration` | 不可执行 |
| 监控 | 估值跌/锁定期/IPO 窗口 | 风险/ops | `CollateralMonitor`/`CovenantCalendar` | 追保/违约 |
| 事件 | IPO/锁定期到期/老股转让 | 投行/资本市场 | `LiquidityEvent`/`Exit` | 窗口/披露 |
| 退出 | 卖/押/等/对冲 | 投行/资管 | `ExitScenario` | 税/控制权 |

## 3.2 五种路径

| 路径 | 做什么 | 优点 | 缺点 | 适用 |
|---|---|---|---|---|
| **持有** | 不融资，等 IPO/分红 | 保留上行/控制权 | 无流动性；集中度风险 | 现金流充足 |
| **卖老股/ secondary** | 二级/ tender/老股转让 | 真流动性；分散 | 折价；税；控制权；锁定期 | 有买家/窗口 |
| **质押/贷款** | Lombard/私股质押/资本调用贷款 | 不卖股；保留上行 | 追保；利息；质押执行；跨境 | 有稳定估值/现金流 |
| **对冲** | collar/forward/variable prepaid forward/exchange fund | 降低下行；延迟税 | 复杂；对手方/抵押；上行 capped | 上市/流动性较好 |
| **结构化** | 接续基金/结构化 secondary/ bridge | 定制；大额 | 费用；利益冲突；监管 | 大额/复杂 |

## 3.3 信贷机制（银行真正看什么）

| 维度 | 问题 | 典型做法 |
|---|---|---|
| **估值** | 最近一轮/可比/DCF/独立估值 | 估值委员会；折扣（流动性/集中度/管辖）；定期复核 |
| **LTV/ haircut** | 能借多少 | 上市股票可能 50–70%；私股通常更低（20–50% 或更保守）；不是固定公式 |
| **集中度** | 单一股票/行业/集团 | 限额；超额需批准/分散/对冲 |
| **锁定期** | 什么时候能卖 | 授信期限/追保/退出要匹配 lock-up |
| **质押** | 能否执行 | 质押登记、公司同意、股东协议、跨境承认 |
| **现金流** | 客户怎么还息 | 分红/工资/其他资产；利息储备 |
| **契约** | 什么会触发违约 | 估值下跌、控制权变更、IPO 失败、交叉违约 |
| **追保** | 跌多少要补 | 通知、补仓期、强制处置；客户确认 |
| **监管** | 证券法/披露/ insider | 10b5-1、trading window、pre-clearance、公告 |
| **税务** | 卖/押/重组的税 | 资本利得/预扣/跨境；需顾问 |

## 3.4 各家的公开机制

### HSBC

- **Marketable securities backed finance**：HK/US stocks/ETFs 质押，最高约 70% advance（公开页面）。
- **Tailored Lending / Specialized Asset Finance**：定制信贷、另类资产；私行借贷。
- **Liquidity planning**：遗产税/传承/家庭分配流动性。
- **Alternative investments/private equity**：产品与洞察。
- **判断**：HSBC 有标准证券质押/定制信贷/流动性规划；**Pre-IPO 私股质押的公开细节少**，需要逐案信贷/估值/法律；这正是“私有资产 lifecycle”缺口。

### UBS

- **Financing solutions/Lombard**：多币种、只付使用部分利息、透明成本；证券质押。
- **Concentrated stock strategies**：对冲/分散/融资；pre-IPO liquidity 线索。
- **Wealth Way**：Liquidity/Longevity/Legacy。
- **GFO 2025**：private markets 配置、家族办公室需求。
- **判断**：UBS 的强项是**全球资本市场+结构化融资+concentrated stock**；私股仍逐案。

### Citi

- **Margin lending**：全球 US$25.3bn 流动性；collateral 包括 equities/bonds/REITs/mutual funds/ETFs/structured notes/hedge funds；跨境（如 HK 证券融资伦敦房产）；压力测试/追保。
- **Concentrated stock**：定义（如 >10% 财富）、风险、四种策略（reduce/hedge/retain/monetize）；私股难卖、锁定期、税/监管。
- **Private Capital Group**：1,400 family offices/77 国；pre-IPO/liquidity planning、cross-border structuring、pre-immigration；lending 包括 private equity capital call、concentrated stock、hedge funds、art/aircraft。
- **判断**：Citi 的公开机制最接近“私有资产+集中股+family office”的完整拼图；但仍是“团队+产品”，不是“一个系统对象”。

### SCB

- **Wealth lending/structured lending**：公开信息较少；私行有 tailored lending。
- **Legacy/trust/succession**：差异化更强；pre-IPO 信贷不是公开主打。
- **判断**：SCB 的强项是**新兴市场+跨境+传承**；Pre-IPO 需要逐案/合作。

### Avaloq

- **Lending & credit**：securities-based lending、exotic collateral（艺术/汽车）、credit risk、collateral appraisal、complex loans。
- **强项**：标准信贷/抵押/额度/风险/会计。
- **弱项（待验证）**：私股估值治理、IPO 生命周期、insider/trading window、跨境质押执行、义务日历、税后情景。
- **判断**：Avaloq 能做“信贷账本/抵押记录”，不能单独承担“Pre-IPO 生命周期”。

## 3.5 对 D3 的设计含义

1. **改定位**：从“Pre-IPO 贷款”改为“**私有资产生命周期**”：估值→质押→监控→事件→退出。
2. **改目标**：不是“3 天批贷”，而是“**3 天形成可决策包**”（估值方法/LTV/质押/先决条件/风险/退出）。
3. **加治理**：估值委员会、独立估值、折扣、复核、异常值、审批；每个数字有方法/日期/审批。
4. **加生命周期**：融资轮、lock-up、IPO 窗口、静默期、老股转让、secondary、forward sale、10b5-1。
5. **加质押执行**：质押登记、公司同意、股东协议、跨境承认、执行路径；不是“签个 pledge 文件”。
6. **加义务日历**：capital call、distribution、earn-out、vendor loan、NAV、税。
7. **加负向需求**：不做未披露的 insider trading；不绕过预清算/窗口；不承诺 IPO 价格；不把纸面估值当市值。
8. **指标**：可决策包时长、估值复核及时率、质押登记完成率、追保准确率、退出执行时间；不是“放款额”。

---

# 4. 跨机构对比：谁强在哪

| 能力 | HSBC | UBS | Citi | SCB | Avaloq |
|---|---|---|---|---|---|
| 身故 bereavement/estate admin | **强**（UK portal/team；PB estate administration） | 中（规划+第三方 trustee） | 中（trust/estate+顾问） | 中（legacy/trust） | 弱（账户/文档，非 probate） |
| POA/失能登记 | **强但碎片**（UK 10 天；权限矩阵） | 中（规划框架） | 中（顾问） | 中 | 弱（授权对象） |
| 跨境遗产/信托 | 中（多实体/多辖区，但手工） | **强**（全球平台/trust） | **强**（trust/family office） | 中（新兴市场） | 弱（跨实体编排） |
| 税务报告/CRS/FATCA | **强**（全球网络/历史补救） | **强** | **强** | 中 | **强**（TAX2/报告） |
| 个人税务申报 | 弱（不代报） | 弱（不代报） | 弱（不代报） | 弱 | 弱（非全球个人申报） |
| Pre-IPO/私股融资 | 中（标准质押/定制） | **强**（Lombard/structured） | **强**（margin/PCG） | 中 | 中（信贷/抵押） |
| 私股估值治理 | 中（逐案） | **强**（团队） | **强**（PCG/估值） | 中 | 弱（对象/治理） |
| 家族治理/下一代 | **强**（family governance） | **强**（GFO） | **强**（family office） | **强**（succession） | 弱（非核心） |
| 证据/审计 | 中（文档/流程） | 中 | 中 | 中 | 中（审计/日志，非法律证据） |

> 注意：这是“公开能力”对比，不是“内部系统”对比；真正的差异在**数据模型/编排/证据**，不是菜单。

---

# 5. HSBC 的独特优势与真实短板

## 5.1 独特优势

1. **全球网络+本地实体**：HK/Asia 强，UK/CH/Lux/Singapore/UAE/US 都有实体；跨境客户天然需求。
2. **trust/executor 实体**：HSBC International Trustee、HSBC Private Bank estate administration；不是所有私行都有。
3. **私行+商业银行+投行**：企业家客户从公司银行到私行到资本市场；Pre-IPO/传承一站式潜力。
4. **Avaloq + Wealth Intelligence**：账本/交易/信贷+AI/顾问工具；不是从零开始。
5. **亚洲财富增长**：2025 年 wealth balances US$2.1tn，亚洲 US$1.2tn；net new invested assets US$80bn（亚洲 US$39bn）。

## 5.2 真实短板

1. **实体/系统碎片**：不同辖区不同 portal/流程/团队；客户体验不一致；跨实体数据拼接靠人。
2. **跨辖区遗产/POA**：本地流程成熟，但跨境承认/执行/命令冲突靠律师/邮件；没有统一 case/evidence。
3. **税务数据**：CRS/FATCA/预扣强；但“一个客户一个跨实体 tax pack”弱；私股/信托税务基础弱。
4. **私股 lifecycle**：标准信贷/质押有；估值治理/IPO 窗口/质押执行/义务日历弱。
5. **证据级**：文档/审计有；但“谁在何时依据什么批准”不能一键重放；诉讼/监管成本高。
6. **变更速度**：Avaloq 定制/升级成本；新监管/新产品上线慢；这正是 T5 要量化的。

---

# 6. 主要来源

- HSBC UK Bereavement：  
  https://www.hsbc.co.uk/help/life-events/bereavement/what-to-do-when-someone-dies/
- HSBC UK Power of Attorney（含权限矩阵、10 个工作日）：  
  https://www.hsbc.co.uk/help/life-events/poa/registering-for-poa-with-hsbc/
- HSBC Private Bank Estate Administration：  
  https://www.privatebanking.hsbc.com/wealth-planning/estate-administration/
- HSBC Private Bank Liquidity Planning：  
  https://www.privatebanking.hsbc.com/wealth-planning/liquidity-planning/
- HSBC HK Marketable Securities Backed Finance（最高约 70%）：  
  https://www.asia.privatebanking.hsbc.com.hk/lending/marketable-securities-backed-finance/
- HSBC 2025 Annual Report（wealth balances US$2.1tn / Asia US$1.2tn / net new US$80bn）：  
  https://www.hsbc.com/investors/results-and-announcements/annual-report
- UBS Estate Planning（will/RLT/DPOA/health care/trust/insurance；not tax/legal advice）：  
  https://www.ubs.com/us/en/wealth-management/our-solutions/planning/estate-planning.html
- UBS Financing Solutions / Lombard：  
  https://www.ubs.com/hk/en/wealthmanagement/what-we-offer/financing/financing-solutions.html
- UBS Global Family Office Report 2025（317 FOs / avg US$1.1bn / 53% succession plans / 43% next-gen / 26% consult next gen）：  
  https://www.ubs.com/global/en/media/display-page-ndp/en-20250521-global-family-office-report-2025.html
- Citi Private Bank Margin Lending（US$25.3bn；collateral；cross-border；stress test）：  
  https://www.privatebank.citibank.com/we-offer/margin-lending
- Citi Private Bank Concentrated Stock：  
  https://www.privatebank.citibank.com/insights/concentrated-stock-positions
- Citi Private Capital Group（1,400 clients / 77 countries；pre-IPO/liquidity；capital call；concentrated stock/PE/art/aircraft）：  
  https://www.privatebank.citibank.com/ivc/docs/Citi-Private-Capital-Group-At-a-glance.pdf
- Citi Private Bank Trust/Estate Planning（与独立法律/税务顾问合作）：  
  https://www.privatebank.citibank.com/we-offer/trust
- SCB Legacy Planning：  
  https://www.sc.com/en/wealth-retail-banking/private-banking/legacy-planning/
- SCB *The Great Repositioning*（74% conflict / 87% succession savings / 84% next-gen）：  
  https://www.sc.com/en/uploads/sites/66/content/docs/SCB2-GPBBrochure-EN.pdf
- SCB Online Estate Planning（Kenya）：  
  https://www.sc.com/ke/promotions/online-estate-planning-proposition/
- Avaloq Client Management / Lending & Credit / Treasury Risk & Compliance：  
  https://www.avaloq.com/platform/client-management  
  https://www.avaloq.com/platform/lending-and-credit  
  https://www.avaloq.com/platform/treasury-risk-and-compliance
- Avaloq Private Equity scaling challenge：  
  https://www.avaloq.com/insights/blog/private-equity-the-real-scaling-challenge-for-banks
- Swisscom Core Banking Radar – Avaloq（customization/upgrade/TCO）：  
  https://www.swisscom.ch/en/business/enterprise/themen/banking/systemarchitektur-bank-zukunft/avaloq.html
- OECD CRS/AEOI：  
  https://www.oecd.org/tax/automatic-exchange/
- IRS FATCA/QI/W-8/1042-S：  
  https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca
- HMRC tax on savings/investments：  
  https://www.gov.uk/tax-on-savings-and-investments
- FOS 案例：  
  https://www.financial-ombudsman.org.uk/decision/DRN-6406571.pdf  
  https://www.financial-ombudsman.org.uk/decision/DRN6866791.pdf  
  https://www.financial-ombudsman.org.uk/decision/DRN-4737924.pdf
