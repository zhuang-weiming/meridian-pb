# 01 — 用例 1：从提案到订单（Proposal → Orders）

> **一句话**：客户说"我想把这笔钱放到美元债里"，系统要回答的不是"买哪只债"，而是"在你今天的账户、税务身份、流动性需求与市场条件下，**哪条路径的综合效率最高**，以及**为什么**"。

---

## 1. 范围与目标

> **展业范围（本版）**：香港 + 新加坡。内地不作为销售/招揽市场；文档中出现的 A 股/内地产品字段，仅用于客户税务居民身份、跨境架构与信托税务的输入，不作为本版销售货架。


### 1.1 覆盖什么
- 从**触发**（事件 / 客户请求 / 定期回顾）到**成交后复盘**的完整链路。
- 覆盖私行常见的 11 类交易模板：二级股票、大宗/询价、单只债券、债券阶梯、UCITS 基金、结构性票据、FX 即期/远期/NDF、私募 capital call、证券质押融资、信托分配。
- 覆盖三类客户：T1（>5 亿，家办级）、T2（5,000 万–5 亿，私行级）、T3（1,000 万–5,000 万，富裕级）——模板与审批矩阵按层级不同，流程相同。

### 1.2 不覆盖什么
- 不替代 OMS/EMS 的撮合与清算；本方案生成**订单计划**并路由到既有 OMS。
- 不替代投行的承销、簿记与定价。
- 不生成税务/法律意见；只做情景测算与持牌转介。

### 1.3 成功标准
| 指标 | 定义 | 目标 |
|---|---|---|
| 提案周期 | 创建 → 客户可看 | T2 客户 ≤ 4 小时（人工复核后） |
| 全口径成本可见率 | 提案含成本/税/汇兑/托管 | 100% |
| 首次提案采纳率 | 客户签署 / 提交 | 基线 +10 个百分点【目标值】 |
| 交易成本偏差 | 实际 TCA vs 提案预估 | ≤ 15% |
| 合规返工率 | 因规则问题退回 | < 5% |
| 模板复用率 | 使用标准模板的订单占比 | > 80% |

---

## 2. 角色与页面地图

```
RM ── PB-100 收件箱 ──► PB-110 目标约束 ──► PB-120 模板库
                                              │
                                              ▼
                                     PB-130 提案层（三套方案）
                                              │
                                              ▼
                                     PB-135 执行层（逐行蓝图）
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                        PB-140 效率打分  PB-150 交易前模拟  PB-160 合规闸门
                              └───────────────┼───────────────┘
                                              ▼
                                        PB-170 客户包/签署
                                              ▼
                                        PB-180 订单计划/簿记
                                              ▼
                                        PB-190 成交后/TCA
```

| 角色 | 主要页面 | 关键动作 |
|---|---|---|
| RM | 100 / 110 / 130 / 140 / 170 | 发起、编辑、选择、交付 |
| IC（投资顾问） | 130 / 140 / 150 | 校准假设、挑战结论、签字 |
| Product Specialist | 120 / 180 | 维护模板与条款、处理复杂结构 |
| Compliance | 160 | 规则例外、跨墙审批 |
| Trading / Ops | 180 / 190 | 执行、分配、确认、TCA |
| Client | 170 | 阅读、提问、签署 |

---

## 3. 端到端 13 步（业务步骤到系统动作）

> **双层结构**：**提案层**只回答"选哪条路"（三套方案，各有配置、收益区间、TES、风险）；**执行层**才回答"每一行怎么下单"（模板、标的、数量、venue、时点、成本、税基）。两层分开，避免"用一张漂亮的提案图掩盖执行细节"，也避免"一上来就陷进逐行报价，失去全局取舍"。

| # | 步骤 | 角色 | 系统/页面 | 输入 | 输出 | SLA / 规则 |
|---|---|---|---|---|---|---|
| 1 | **触发** | 系统 / RM / 客户 | PB-100 | 事件（解禁、IPO、质押到期、税率变化）、客户请求、定期回顾 | 待办卡片、优先级 | 事件 T+0 进收件箱；T1 客户 24h 内认领 |
| 2 | **准入复核** | RM + Ops | PB-100 | KYC/KYB、AML、制裁、税务居民、适当性有效期 | 准入状态（绿/黄/红） | 黄灯需补件；红灯不得生成提案 |
| 3 | **目标与约束** | RM + 客户 | PB-110 | 目标、期限、流动性、币种、集中度、ESG、限制名单 | 结构化 `Objective` 对象 | 必须至少一个可量化目标 + 一个硬约束 |
| 4 | **模板选择** | RM / IC | PB-120 | 资产类别、客户类别、法域、币种、最低门槛 | `template_id` + 必填字段 | 模板不在客户法域白名单内则不可选 |
| 5 | **方案生成（提案层）** | AI + RM | PB-130 | 目标、约束、模板、产品池、CMA | **3 套方案**（推荐/稳健/进取） | 只能引用规则放行产品；每套必须可执行 |
| 6 | **效率打分** | 系统 | PB-140 | 候选 legs、成本/税/时间/冲击/易用参数 | TES + 五维明细 + 排名 | 任一项数据缺失 → 标黄，不得默认最优 |
| 7 | **选择 + 执行蓝图（执行层）** | RM / IC / Trading | PB-135 | 选定方案、模板、市场快照 | **逐行执行蓝图**（instrument/qty/venue/timing） | 任一行不可执行 → 回到方案层 |
| 8 | **交易前模拟** | RM / IC | PB-150 | 执行蓝图、资金、FX、执行参数 | 成交价区间、现金流、组合前后、税基、压力 | 模拟必须含成本与税；不含则不得提交 |
| 9 | **合规闸门** | 系统 + Compliance | PB-160 | 方案 + 执行蓝图、客户、产品、法域 | PASS/WARN/BLOCK + 规则 ID | BLOCK 不可覆盖；WARN 需指定审批人 |
| 10 | **RM/IC 复核** | RM + IC | PB-130/135/160 | 全部材料 | 签字、修改意见 | T2 双人复核；T1 加 IC 负责人 |
| 11 | **客户确认** | RM + Client | PB-170 | 提案书、披露、KFS、订单表 | 电子签/双录、版本号 | 披露版本必须与提案版本一致 |
| 12 | **订单计划** | Trading | PB-180 | 已签执行蓝图 | 母单 + 子单 + FX 腿 + 资金校验 | 资金不足/超限 → 退回，不得部分放行 |
| 13 | **执行与复盘** | Trading / Ops | PB-180/190 | 子单 | 成交、分配、确认、TCA、模板校准 | T+1 出 TCA；偏差 > 15% 触发复盘 |

### 3.1 关键决策点
- **D1（步骤 2）**：客户是否可在该法域购买该复杂度产品？——由规则引擎回答，RM 不解释、不承诺。
- **D2（步骤 5）**：是否存在满足全部硬约束的方案？——无解时回到 PB-110 放宽约束，必须客户书面同意。
- **D3（步骤 8）**：黄灯是否可批？——只有预定义角色可批，且附条件与到期日。
- **D4（步骤 11）**：执行策略选"速度"还是"成本"？——由 TES 的 Time vs Impact 权衡，RM 确认。

---

## 4. 页面规格（11 页）

> 字段表约定：**必填** = 无值不能进入下一状态；**来源** = `CRM` / `CORE` / `CUSTODY` / `PRODUCT` / `MARKET` / `CALC` / `AI` / `USER`；**AI** 字段一律可编辑、需复核。

### PB-100 Proposal Inbox / Client 360

**页面目标**：让 RM 在 30 秒内判断"今天先打哪个电话、为什么"。

**布局**：左 = 待办列表；中 = 客户 360 摘要；右 = 事件与建议动作。

| 字段 | 类型 | 必填 | 来源 | 说明 |
|---|---|---|---|---|
| `client_id` | string | Y | CRM | 客户主键 |
| `client_name` | string | Y | CRM | 显示名 |
| `segment` | enum(T1/T2/T3) | Y | CRM | 按可投资资产分层；T1 >5 亿 |
| `rm_id` | string | Y | CRM | 单一责任点 |
| `booking_centres` | array | Y | CORE | 香港/新加坡/瑞士/内地等 |
| `total_wealth` | decimal | Y | CDP | 含托管 + 非托管（授权字段） |
| `liquid_assets` | decimal | Y | CDP | T+7 可动用 |
| `liabilities` | decimal | N | CORE | 贷款、透支、保证金 |
| `concentration_top1` | percent | Y | CALC | 单一标的占净值 |
| `risk_profile` | enum | Y | CRM | 保守/稳健/平衡/成长/进取 |
| `risk_profile_expiry` | date | Y | CRM | 过期则提案前须重评 |
| `trigger_type` | enum | Y | EVENT | 解禁/IPO/质押到期/税率变化/婚姻/继承/客户请求/定期回顾 |
| `trigger_date` | date | Y | EVENT | 事件日 |
| `days_to_event` | int | Y | CALC | 负数表示已发生 |
| `opportunity_type` | enum | Y | AI | 流动性/配置/传承/跨境/融资 |
| `estimated_value` | decimal | N | AI | 机会规模（标注"估算"） |
| `priority_score` | 0–100 | Y | CALC | 事件紧迫度 40% + 价值 30% + 关系 20% + 合规 10% |
| `last_action` | string | N | CRM | 上次触达 |
| `status` | enum | Y | CRM | 新建/处理中/已预约/已关闭 |
| `consent_flags` | object | Y | CDP | 数据使用授权（字段级） |

**动作**：`创建提案` / `稍后提醒` / `转交` / `查看事件` / `查看 360`。
**校验**：`risk_profile_expiry < today` → 禁止进入 PB-130，提示重评。
**异常**：同一客户已有 `DRAFT` 提案 → 提示合并，不新建。

---

### PB-110 Objective & Constraints

**页面目标**：把"稳健一点、留点现金、别太集中"翻译成机器可执行的约束，并在冲突时明确取舍。

**布局**：上 = 目标卡；中 = 约束表单；下 = 冲突检查与"约束编译器"解释。

| 字段 | 类型 | 必填 | 来源 | 说明 |
|---|---|---|---|---|
| `proposal_id` | string | Y | CALC | 提案主键 |
| `objective_type` | enum | Y | USER | 流动性/收益/增长/对冲/过渡/传承 |
| `primary_goal` | text | Y | USER | 一句话，客户原话优先 |
| `target_amount` | decimal | N | USER | 目标金额 |
| `horizon_months` | int | Y | USER | 投资期限 |
| `liquidity_need_T0` | decimal | Y | USER | 今日可动用 |
| `liquidity_need_T7` | decimal | N | USER | 7 日内 |
| `liquidity_need_T90` | decimal | N | USER | 90 日内 |
| `income_target` | decimal | N | USER | 年化收入目标 |
| `return_target_low/high` | decimal | N | USER | 用区间，不用单点 |
| `max_drawdown` | percent | N | USER | 客户可承受最大回撤 |
| `volatility_target` | percent | N | USER | 年化波动上限 |
| `base_ccy` | string | Y | CRM | 基准币种 |
| `funding_source` | enum | Y | USER | 现金/到期/质押/减持/分红 |
| `funding_date` | date | N | USER | 资金到位日 |
| `min_cash_reserve` | decimal | Y | USER | 最低现金留存 |
| `max_single_issuer` | percent | Y | USER | 单一发行人上限 |
| `max_single_name` | percent | Y | USER | 单一标的上限 |
| `max_asset_class` | object | N | USER | 各类资产上限 |
| `excluded_sectors` | array | N | USER | 排除行业 |
| `esg_preference` | enum | N | USER | 无/排除/优先/影响力 |
| `restricted_list_check` | bool | Y | RULES | 是否已过限制名单 |
| `leverage_allowed` | bool | Y | USER | 是否允许杠杆 |
| `derivatives_allowed` | bool | Y | USER | 是否允许衍生品 |
| `tax_residency` | string | Y | CRM | 税务居民地 |
| `holding_entity` | enum | Y | CRM | 个人/公司/信托 |
| `client_category` | enum | Y | RULES | 专业投资者/零售/机构 |
| `jurisdiction` | string | Y | RULES | 销售发生地 |
| `qualitative_notes` | text | N | USER | 客户偏好、禁忌 |
| `constraint_conflicts` | array | N | CALC | 冲突项 + 建议解法 |
| `client_consent_ref` | string | Y | CDP | 授权记录 |

**约束编译器**：例如"别太集中" → `max_single_name = 10%`；"留点现金" → `min_cash_reserve = 12 个月支出`。每条转换显示**假设**与**可修改**。
**校验**：`return_target_low >` 组合可实现上限 → 提示"目标与约束冲突"，要求调整或书面确认。
**异常**：无解 → 输出"最小让步集"（哪条约束放宽最有效），不擅自放宽。

---

### PB-120 Template Gallery

**页面目标**：让 RM 选"交易方式"，而不是被产品货架牵着走。

**布局**：筛选栏 + 模板卡片 + 对比抽屉。

| 字段 | 类型 | 必填 | 来源 | 说明 |
|---|---|---|---|---|
| `template_id` | string | Y | PRODUCT | 如 `FI-LADDER-01` |
| `template_name` | string | Y | PRODUCT | 显示名 |
| `asset_class` | enum | Y | PRODUCT | 股票/固收/基金/结构/外汇/私募/融资/信托 |
| `wrapper` | enum | Y | PRODUCT | 直接持有/基金/票据/保险/信托 |
| `description` | text | Y | PRODUCT | 一句话 |
| `typical_use` | text | Y | PRODUCT | 典型场景 |
| `jurisdictions` | array | Y | PRODUCT | 适用法域 |
| `client_categories` | array | Y | PRODUCT | 适用客户类别 |
| `currencies` | array | Y | PRODUCT | 币种 |
| `min_ticket` | decimal | Y | PRODUCT | 最低门槛 |
| `liquidity` | enum | Y | PRODUCT | T+0/T+1/T+2/周/月/锁定 |
| `complexity_score` | 1–5 | Y | PRODUCT | 1 简单，5 复杂 |
| `cost_range_bps` | range | Y | CALC | 典型全口径成本 |
| `settlement` | string | Y | PRODUCT | 结算周期/地点 |
| `doc_requirements` | array | Y | PRODUCT | 所需文件 |
| `tax_treatment_ref` | string | Y | TAX | 税务处理规则 ID |
| `eligibility_rules` | array | Y | RULES | 准入规则 |
| `restricted_flag` | bool | Y | RULES | 是否受限 |
| `status` | enum | Y | PRODUCT | 可用/暂停/下架 |

**动作**：`选择` / `加入对比` / `查看条款` / `查看历史成本`。
**校验**：`client_category` 不在 `client_categories` → 灰显并说明原因；不得"先选再补合规"。

---

### PB-130 AI Proposal Composer（提案层：三套方案）

**页面目标**：一次给出三套**可执行**方案，并解释"为什么是这套、什么情况下会换"。

**布局**：左 = 生成参数；中 = 三张方案卡；右 = 解释与假设。

**生成参数**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `objective_weights` | object | Y | 成本/税/时间/冲击/易用 的权重（默认 25/20/20/20/15） |
| `candidate_count` | int | Y | 固定 3（推荐/稳健/进取） |
| `max_turnover` | percent | N | 换手上限 |
| `tax_optimize` | bool | Y | 是否做税基优化 |
| `liquidity_floor` | decimal | Y | 流动性下限 |
| `exclude_restricted` | bool | Y | 默认 true，不可关 |
| `model_version` | string | Y | 生成模型/规则版本 |

**每套方案卡字段**

| 字段 | 类型 | 说明 |
|---|---|---|
| `proposal_name` | string | 如"核心债券阶梯 + 卫星基金" |
| `thesis` | text | 一句话逻辑（≤60 字） |
| `legs[]` | array | 每条腿：动作、标的、模板、金额、目标权重、时点 |
| `expected_return_range` | range | 年化区间，标注假设 |
| `expected_vol` | percent | 年化波动 |
| `max_drawdown_est` | percent | 压力下估算 |
| `all_in_cost_bps` | decimal | 全口径 |
| `tax_drag_bps` | decimal | 年化税负拖累 |
| `time_to_invest_days` | int | 资金到位→建仓完成 |
| `market_impact_bps` | decimal | 预估冲击 |
| `liquidity_profile` | object | T+0/7/90/365 可动用比例 |
| `concentration_after` | object | 前五大标的/发行人 |
| `constraints_satisfied` | array | 逐条硬约束 |
| `confidence` | enum | 高/中/低（基于数据完整度与模型稳定性） |
| `why_this` | text | 相对另外两套的优势 |
| `why_not` | text | 主要代价/风险 |
| `what_would_change` | text | 触发换方案的条件 |
| `assumptions` | array | 关键假设 |
| `data_freshness` | object | 行情/持仓/规则的时间戳 |

**方案卡示例（文字版）**

> **方案 A｜核心债券阶梯 + 货币基金缓冲**
> 逻辑：用 6 档美国国债/投资级债券锁定 4.3%–4.8% 到期收益率，保留 12 个月现金。
> 代价：美国 situs 资产的遗产税暴露（非居民免税额仅 6 万美元），需美国税务顾问确认。
> 换方案条件：若客户确认将长期居留美国，改用爱尔兰 UCITS 基金。
>
> **方案 B｜爱尔兰 UCITS 多资产基金**
> 逻辑：一只基金解决分散、再平衡与报告；无美国遗产税暴露。
> 代价：年费 35–45bps，长期复利拖累；底层不透明。
>
> **方案 C｜结构性票据增强**
> 逻辑：用 5 年期 autocall 票据把票息提高到 6%–7%。
> 代价：发行人信用风险、复杂性高、二级市场流动性弱；不适合超过净值 10%。

**AI 生成硬约束**（写进系统，不是提示词）
1. 只能从 `PRODUCT` 池中选，且 `status = 可用`、`restricted_flag = false`。
2. 每条 leg 必须有 `template_id`，且字段完整。
3. 不得生成价格、收益率、税率数字；所有数字来自 `CALC`。
4. 不得引用 MNPI；检索源白名单 = 公开信息 + 客户授权字段。
5. 输出 JSON schema 校验失败 → 重试 1 次 → 仍失败则返回"无法生成"，不降级为自由文本。

---

### PB-135 Execution Blueprint（执行层：逐行）

**页面目标**：把选定的那套方案，翻译成**每一行都能下单**的蓝图；同时保证"执行层的变化"不会悄悄改变"提案层的经济结果"。

**两层关系**

| 层 | 回答的问题 | 粒度 | 变更影响 |
|---|---|---|---|
| **提案层（PB-130）** | 选哪条路？ | 3 套方案，资产类别/权重/区间 | 换方案 = 重新走 TES 与合规 |
| **执行层（PB-135）** | 每一行怎么下单？ | 逐行：instrument/template/qty/venue/timing | 行级变更超阈值 → 回到提案层 |

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `blueprint_id` | string | Y | 执行蓝图 |
| `proposal_id` | string | Y | 来源方案（锁定版本） |
| `version` | string | Y | 蓝图版本 |
| `line_no` | int | Y | 行号 |
| `template_id` | string | Y | 交易模板 |
| `instrument_id` | string | Y | ISIN/Ticker |
| `action` | enum | Y | BUY/SELL/SUBSCRIBE/REDEEM/PLEDGE |
| `quantity` | decimal | Y | 数量 |
| `amount` | decimal | Y | 金额 |
| `target_weight` | percent | Y | 目标权重 |
| `venue` | string | Y | 交易所/OTC/一级 |
| `order_type` | enum | Y | MARKET/LIMIT/BLOCK/ISSUE |
| `limit_price` | decimal | N | 限价 |
| `timing` | enum | Y | T+0/T+1/窗口 |
| `settlement` | string | Y | T+1/T+2/T+3 |
| `cost_est_bps` | decimal | Y | 该行预估成本 |
| `tax_lot_policy` | enum | N | FIFO/LIFO/specific |
| `funding_account` | string | Y | 资金账户 |
| `dependency[]` | array | N | 依赖行（如 FX 腿） |
| `approval_ref` | string | Y | 审批 |
| `exec_status` | enum | Y | 草稿/待批/就绪/已下单/完成 |
| `proposal_economics_delta` | object | Y | 相对提案层的成本/风险/权重变化 |
| `deviation_reason` | text | N | 偏离原因 |
| `requires_reproposal` | bool | Y | 是否需回到 PB-130 |

**硬规则**
1. 没有 `template_id` 的行，不得进入 PB-180。
2. 没有 `funding_account` 或资金不足的行，不得进入 PB-180。
3. 行级变更导致**成本 +20bps 以上 / 权重偏离 +2pp 以上 / 风险等级上升** → `requires_reproposal = true`，回到 PB-130。
4. 执行蓝图在客户签署时**冻结版本**；任何后续变更重新走审批。
5. 每行必须有 `suitability_ref`（产品适当性记录），否则阻断。

**示例（节选）**

| 行 | 模板 | 标的 | 动作 | 金额 | 权重 | venue | 时点 | 成本 |
|---|---|---|---|---|---|---|---|---|
| 1 | `FI-LADDER-01` | UST 2Y/5Y/10Y | BUY | 400 万 | 40% | OTC | T+0 | 4bps |
| 2 | `FD-UCITS-01` | IE00B4L5Y983 | SUBSCRIBE | 500 万 | 50% | 一级 | T+0 | 42bps |
| 3 | `SP-NOTE-01` | HSBC 5Y autocall | BUY | 100 万 | 10% | 一级 | T+5 | 120bps |

---

### PB-140 Efficiency Scorecard

**页面目标**：把"哪个更好"变成可讨论的取舍，而不是立场。

**布局**：上 = 排名表；中 = 五维雷达 + 成本瀑布；下 = 敏感性。

| 字段 | 类型 | 说明 |
|---|---|---|
| `proposal_id` | string | 方案 |
| `cost_bps` | decimal | 全口径一次性 + 年化，分列 |
| `cost_breakdown` | object | 佣金/点差/冲击/税/托管/平台/汇兑/结构 |
| `tax_drag_bps` | decimal | 年化 |
| `after_tax_return` | percent | 税后，区间 |
| `time_to_cash_days` | int | 从决策到可再投资 |
| `impact_bps` | decimal | 预估市场冲击 |
| `days_to_liquidate` | decimal | 按 20% ADV |
| `ease_score` | 0–100 | 可执行性 |
| `tes` | 0–100 | 综合 |
| `rank` | int | 本次比较内 |
| `data_quality` | enum | 高/中/低 |
| `penalty` | decimal | 数据缺失扣分 |
| `override_reason` | text | RM 改排名时必填 |
| `sensitivity` | object | ADV 减半 / 利率 +100bp / FX −5% 下的 TES 变化 |

**TES 公式**（详见第 6 节）：

```
TES = 0.25·C + 0.20·T + 0.20·M + 0.20·L + 0.15·E − penalty
```

**交互**：拖动权重 → 实时重排；点击任一维度 → 下钻到计算明细与数据源。
**校验**：`data_quality = 低` → 排名仅供讨论，不得直接进入 PB-170。
**异常**：两方案 TES 差 < 2 分 → 标记"实质持平"，建议按客户偏好/关系因素决定，并记录理由。

---

### PB-150 Pre-trade Simulator

**页面目标**：下单前先看"成交后世界长什么样"。

| 字段 | 类型 | 说明 |
|---|---|---|
| `sim_id` | string | 模拟主键 |
| `market_snapshot_ts` | timestamp | 行情时点 |
| `execution_params` | object | 算法、参与率、venue、时限 |
| `expected_fill_price` | decimal | 含滑点区间 |
| `slippage_range_bps` | range | P10–P90 |
| `cash_flow` | object | T0/T+1/T+2 现金流 |
| `fx_rate_used` | decimal | 汇率与来源 |
| `post_trade_weights` | object | 交易后权重 |
| `exposure_delta` | object | 行业/区域/因子/久期变化 |
| `concentration_after` | object | 单名/发行人/币种 |
| `liquidity_buckets_after` | object | T+0/7/90/365 |
| `tax_lots_consumed` | array | 税基批次与成本 |
| `realized_gain_loss` | decimal | 已实现盈亏（如卖） |
| `margin_impact` | decimal | 保证金/抵押影响 |
| `stress_results` | object | 利率 +100bp、股 −20%、FX −5% |
| `warnings` | array | 流动性/集中度/资金缺口 |

**校验**：`cash_flow.T0 < 0` → 必须指定融资或缩减规模；不得"先下单后补钱"。
**异常**：行情延迟 > 15 分钟 → 标黄，需刷新或说明。

---

### PB-160 Suitability & Compliance Gate

**页面目标**：把所有"不能做"的理由，在客户看到之前说清楚。

| 检查项 | 规则示例 | 结果 | 可覆盖 |
|---|---|---|---|
| KYC/AML | 身份、受益所有人、制裁、PEP | PASS/WARN/BLOCK | 否 |
| 适当性 | 风险等级、产品复杂度、投资经验 | PASS/WARN/BLOCK | WARN 需合规 |
| 法域/牌照 | 销售发生地、产品注册地、跨境招揽 | PASS/BLOCK | 否 |
| 客户类别 | 专业投资者认定、零售限制 | PASS/BLOCK | 否 |
| 集中度 | 单名/发行人/行业/币种上限 | PASS/WARN | WARN 需 IC |
| 限制名单 | 投行项目、MNPI、观察名单 | PASS/BLOCK | 否 |
| 资金来源 | 反洗钱、资金来源证明 | PASS/WARN | WARN 需合规 |
| 披露 | KFS/KIID、风险揭示、成本披露 | PASS/WARN | 否 |
| 税务报告 | CRS/FATCA 声明 | PASS/WARN | WARN 需补件 |
| 跨墙 | 是否使用未授权信息 | PASS/BLOCK | 否 |

**字段**：`check_id`、`rule_id`、`severity`、`message`、`evidence_ref`、`override_allowed`、`approver_id`、`override_expiry`、`conditions`。
**动作**：`提交审批` / `附条件通过` / `退回修改` / `终止`。
**留痕**：每次检查写 `EvidenceEvent`，含规则版本与输入快照。
**红线**：BLOCK 不可被任何人覆盖；系统不提供"强制通过"按钮。

---

### PB-170 Client Pack & E-sign

**页面目标**：客户看到的那一版，必须是 RM 签字的那一版。

| 字段 | 类型 | 说明 |
|---|---|---|
| `pack_id` | string | 客户包 |
| `proposal_version` | string | 与提案版本绑定 |
| `language` | enum | 中/英/双语 |
| `documents[]` | array | 提案摘要、配置、成本、风险、情景、KFS、订单表 |
| `disclosure_version` | string | 披露模板版本 |
| `personalization` | object | 客户称谓、币种、金额 |
| `client_questions` | array | 客户提问与回答（留痕） |
| `esign_status` | enum | 未发送/已发送/已查看/已签署/拒绝 |
| `signatory` | string | 签署人 |
| `signature_timestamp` | datetime | 时间戳 |
| `audit_certificate` | string | 审计证书 ID |
| `delivery_channel` | enum | 面签/视频/App/邮件（按属地） |

**校验**：文档中的数字必须与 `proposal_version` 快照一致；不一致 → 禁止发送。
**异常**：客户拒绝签署 → 记录原因码，回到 PB-130，不自动重发。

---

### PB-180 Order Plan & Blotter

**页面目标**：把已签提案翻译成可执行、可监控、可追责的订单。

**母单字段**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `parent_order_id` | string | Y | 母单 |
| `proposal_id` | string | Y | 来源提案 |
| `client_account_id` | string | Y | 账户 |
| `instrument_id` | string | Y | ISIN/Ticker |
| `asset_class` | enum | Y | |
| `side` | enum | Y | BUY/SELL/SUBSCRIBE/REDEEM |
| `total_qty` | decimal | Y | |
| `total_notional` | decimal | Y | |
| `currency` | string | Y | |
| `order_type` | enum | Y | MARKET/LIMIT/BLOCK/ISSUE |
| `limit_price` | decimal | N | |
| `execution_strategy` | enum | Y | TWAP/VWAP/POV/IS/BLOCK |
| `participation_cap` | percent | Y | 默认 20% ADV |
| `start_time/end_time` | datetime | Y | 执行窗口 |
| `benchmark` | enum | Y | ARRIVAL/VWAP/CLOSE |
| `fx_leg` | object | N | 币种转换 |
| `funding_account` | string | Y | 资金账户 |
| `suitability_ref` | string | Y | 适当性记录 |
| `approval_ref` | string | Y | 审批链 |
| `status` | enum | Y | 待执行/执行中/部分成交/完成/取消 |

**子单字段**：`child_id`、`venue`、`qty`、`price_limit`、`algo`、`filled_qty`、`avg_price`、`slippage_bps`、`status`、`timestamp`。
**簿记列**：时间、客户、标的、方向、数量、均价、成交额、基准、滑点、状态、交易员。
**校验**：`total_notional > approval_limit` → 阻断；`funding < notional + fees` → 阻断；`restricted_list` 命中 → 阻断。
**异常**：部分成交超时 → 按策略撤单/续单，通知 RM；不得静默改价。

---

### PB-190 Post-trade & TCA

**页面目标**：把"实际发生了什么"回写给下一次提案。

| 字段 | 类型 | 说明 |
|---|---|---|
| `execution_id` | string | 成交 |
| `parent_order_id` | string | 母单 |
| `filled_qty/avg_price` | decimal | 成交 |
| `arrival_price` | decimal | 决策时价格 |
| `vwap_benchmark` | decimal | 基准 |
| `implementation_shortfall_bps` | decimal | IS |
| `slippage_vs_estimate_bps` | decimal | 实际 − 预估 |
| `commission` | decimal | 佣金 |
| `taxes_paid` | object | 印花税/预提/其他 |
| `fx_cost_bps` | decimal | 汇兑成本 |
| `settlement_status` | enum | 待交收/已交收/失败 |
| `allocation` | array | 多账户分配 |
| `tax_lot_update` | object | 税基更新 |
| `cost_report_sent` | bool | 客户成本报告 |
| `template_calibration` | object | 回写模板的实际成本/时长 |
| `exception_code` | string | 异常码 |

**动作**：`生成客户成本报告` / `发起复盘` / `更新模板基准`。
**校验**：`|slippage_vs_estimate| > 15%` → 自动创建复盘任务，指派交易台 + IC。
**异常**：交收失败 → 升级 Ops + RM，记录根因，不重复扣款。

---

## 5. 交易模板库（11 类）

### 5.1 模板公共头

| 字段 | 说明 |
|---|---|
| `template_id` / `version` | 唯一标识与版本 |
| `asset_class` / `wrapper` | 资产类别/载体 |
| `jurisdictions` | 允许销售/执行的法域 |
| `client_categories` | 专业投资者/零售/机构 |
| `license_required` | 所需牌照（如 SFC Type 1/4/9） |
| `order_style` | 市价/限价/大宗/询价/一级申购 |
| `settlement_cycle` | T+1/T+2/T+3/周/月 |
| `dealing_cutoff` | 每日截止时间（含时区） |
| `min_ticket` | 最低金额/数量 |
| `cost_components[]` | 成本项清单 |
| `tax_treatment_ref` | 税务规则 ID |
| `doc_requirements[]` | 文件清单 |
| `approval_matrix` | 金额/风险对应的审批人 |
| `status` | 可用/暂停/下架 |

### 5.2 十一类模板与特有字段

| 模板 | 用途 | 特有字段（节选） | 主要成本项 | 典型时效 |
|---|---|---|---|---|
| **EQ-CASH-01** 二级股票 | 港股/美股/新加坡上市股票买卖（A 股不在本版销售范围） | `exchange`、`ticker`、`lot_size`、`order_type`、`limit_price`、`TIF`、`venue`、`algo`、`short_flag` | 佣金、点差、冲击、印花税（HK 0.1%/边；A 股卖出 0.05%）、过户费 | T+0 执行，T+1/T+2 交收 |
| **EQ-BLOCK-01** 大宗/询价 | 大额减持/建仓 | `block_type`、`price_range`、`discount_to_last`、`lockup_months`、`disclosure_flag`、`counterparty_kyc` | 折价、佣金、披露成本、锁定期机会成本 | 3–10 个工作日 |
| **FI-BOND-01** 单只债券 | 直接持债 | `ISIN`、`issuer`、`seniority`、`rating`、`coupon`、`maturity`、`YTM`、`duration`、`settlement_place`、`accrued_interest`、`callable` | 点差、佣金、托管、预提税 | T+1/T+2 |
| **FI-LADDER-01** 债券阶梯 | 锁定收益率/现金流 | `target_duration`、`rungs[]`、`weights[]`、`reinvestment_rule`、`credit_floor`、`max_issuer_concentration` | 多腿点差、再投资摩擦 | 1–3 周建仓 |
| **FD-UCITS-01** UCITS 基金 | 分散/专业管理 | `ISIN`、`domicile`、`share_class`、`dealing_cutoff`、`OCF`、`entry_fee`、`exit_fee`、`min_investment`、`liquidity`、`gate_flag` | OCF、申购费、平台费、汇兑 | T+2–T+5 |
| **SP-NOTE-01** 结构性票据 | 增强收益/对冲 | `issuer`、`structure`、`underlying[]`、`tenor`、`coupon`、`barrier[]`、`observation_dates`、`autocall_level`、`protection_level`、`issue_price`、`embedded_fee`、`complexity` | 内含结构费、发行人信用、二级市场折价 | 1–2 周发行 |
| **FX-SPOT-01** 即期外汇 | 币种转换 | `pair`、`side`、`amount`、`value_date`、`rate`、`venue`、`cutoff` | 点差、佣金、结算费 | T+0/T+2 |
| **FX-FWD-01 / NDF** 远期/无本金交割 | 对冲/期限匹配 | `pair`、`forward_date`、`fixing_source`、`settlement_ccy`、`collateral`、`credit_line` | 远期点、保证金、信用占用 | T+0 成交，远期交割 |
| **PM-CAPCALL-01** 私募 capital call | 履行出资义务 | `fund`、`commitment`、`called_amount`、`due_date`、`notice_date`、`funding_source`、`capital_call_line` | 机会成本、透支利息、汇兑 | 通知后 10–15 日 |
| **LOMBARD-01** 证券质押融资 | 不卖股拿现金 | `facility`、`collateral[]`、`haircut`、`lendable_value`、`LTV`、`pricing`、`margin_ladder`、`covenants` | 利息、安排费、承诺费、追保成本 | 2–6 周审批 |
| **TRUST-DIST-01** 信托分配 | 受益人分配/服务支付 | `trust_id`、`beneficiary`、`purpose`、`amount`、`payment_type`、`payee`、`supporting_docs`、`trustee_approval` | 受托费、支付费、税 | 5–15 个工作日 |

> **税率提示**：香港股票转让印花税自 2023 年 11 月起为 0.1%/边（此前 0.13%）；英国 SDRT 买入侧 0.5%；A 股卖出印花税 0.05%；美国非居民股息预提默认 30%、中美协定可至 10%（需 W-8BEN）；美国遗产税对非居民仅 6 万美元免税额，美国 situs 资产需单独评估。引擎参数化，以最新官方口径为准。

---

## 6. TES：交易效率评分模型

### 6.1 为什么需要它
同一个目标有无数条路径。没有统一标尺，讨论就会变成"我觉得 A 好"。TES 的作用不是替客户决定，而是**把取舍摆到桌面上**。

### 6.2 五个维度与计算

| 维度 | 权重 | 衡量 | 方向 | 数据来源 |
|---|---|---|---|---|
| **C 成本** | 25% | 全口径成本 bps（一次性 + 首年） | 越低越好 | 佣金表、点差、冲击模型、税率、托管费 |
| **T 税后** | 20% | 税后收益 / 税负拖累 bps | 越高越好 | 税务引擎、协定、实体类型 |
| **M 时间** | 20% | 决策 → 可再投资的天数 | 越短越好 | 模板结算周期、截止时间、审批 SLA |
| **L 流动性/冲击** | 20% | 预估冲击 bps + 按 20% ADV 的清仓天数 | 越低越好 | 行情、ADV、订单规模、波动率 |
| **E 可执行性** | 15% | 资格、文件、门槛、复杂度、渠道 | 越高越好 | 规则引擎、模板、客户档案 |

**归一化**（仅在本次比较的候选集内）：

```
C_i = 100 × (max_cost − cost_i) / (max_cost − min_cost)
T_i = 100 × (after_tax_i − min) / (max − min)
M_i = 100 × (max_days − days_i) / (max_days − min_days)
L_i = 100 × (max_impact − impact_i) / (max_impact − min_impact)   // 冲击与天数各占 60%/40%
E_i = ease_score_i                                                   // 0–100，绝对分
TES_i = 0.25C_i + 0.20T_i + 0.20M_i + 0.20L_i + 0.15E_i − penalty_i
```

- **penalty**：数据质量低扣 5–15 分；关键字段缺失扣 10 分；模型外推扣 5 分。
- **不跨提案比较**：TES 是"本次候选集内的相对排序"，不是绝对质量分；绝对值（bps、天数）必须同时展示。
- **实质持平**：前两名差 < 2 分 → 标记"持平"，由客户偏好与关系因素决定，记录理由。

### 6.3 算例：USD 1,000 万固收配置（香港专业投资者，中国税务居民）

| 维度 | A 美国国债阶梯 | B 爱尔兰 UCITS 综合债基金 | C 5 年期 Autocall 票据 |
|---|---|---|---|
| 全口径成本（首年） | 4 bps | 42 bps | 120 bps（内含） |
| 税负 | 利息预提 0；**美国遗产税暴露** | 0 预提；无美国 situs | 0 预提；发行人所在地 |
| 时间（决策→可再投资） | 1 天 | 3 天 | 7 天 |
| 冲击 | 1 bp | 3 bps | 0（一级发行） |
| 可执行性（0–100） | 60 | 100 | 80 |
| **C** | 100 | 67 | 0 |
| **T** | 40 | 100 | 100 |
| **M** | 100 | 67 | 0 |
| **L** | 67 | 0 | 100 |
| **E** | 60 | 100 | 80 |
| **TES** | **75.4** | **65.2** | **52.0** |

**读法**：
- A 在成本、时间、冲击上占优，但美国遗产税是**尾部风险**，不能只看 TES。
- B 在税后与可执行性上占优，适合作为核心。
- C 只在"无冲击 + 高票息"上占优，适合小比例卫星。
- **建议组合**：A 40% + B 50% + C 10%，而不是三选一。TES 支持"组合优化"，不是"选美"。

> 说明：上表为演示算例，税率、成本、收益均为假设；美国遗产税适用需美国税务顾问确认。实际计算以引擎参数与最新法规为准。

### 6.4 权重的治理
- 默认权重 25/20/20/20/15；客户/IC 可调整，但必须记录理由。
- T1 客户可由 IC 设定"客户偏好权重"（如更重视流动性），版本化保存。
- 权重变更不影响历史提案的评分快照。

---

## 7. AI 生成器设计（工程视角）

### 7.1 输入
```json
{
  "client": {"segment":"T2","risk":"balanced","tax_residency":"CN","entity":"individual",
             "jurisdiction":"HK","category":"PI","consents":["holdings","tax_status"]},
  "objective": {"type":"income","amount":10000000,"ccy":"USD","horizon_months":36,
                "liquidity":{"T0":500000,"T7":1000000,"T90":2000000},
                "max_drawdown":0.10,"min_cash":0.08},
  "constraints": {"max_single_issuer":0.10,"max_single_name":0.05,
                  "leverage":false,"derivatives":false,"restricted":["..."],"esg":"none"},
  "templates": ["FI-LADDER-01","FD-UCITS-01","SP-NOTE-01"],
  "market": {"as_of":"2026-10-20T09:00:00Z","source":"MARKET"},
  "rules_version": "2026.10.3",
  "model_version": "proposal-gen-3.2"
}
```

### 7.2 输出（受 schema 约束）
```json
{
  "proposals": [
    {"proposal_id":"P-...","name":"...","thesis":"...",
     "legs":[{"action":"BUY","instrument_id":"...","template_id":"FI-LADDER-01",
              "amount":4000000,"weight":0.40,"timing":"T+0"}],
     "calc_ref":"CALC-...", "confidence":"high",
     "why_this":"...", "why_not":"...", "what_would_change":"..."}
  ],
  "assumptions": ["..."],
  "data_freshness": {"market":"...","holdings":"...","rules":"..."}
}
```

### 7.3 五道工程护栏
1. **产品白名单**：只允许 `PRODUCT` 池中 `status=可用` 且通过规则的产品；生成器无权新增标的。
2. **数字只读**：收益率、成本、税率、价格一律来自 `CALC` 服务，生成器只能引用 `calc_ref`，不能自算。
3. **Schema 校验**：输出不符合 schema → 重试 1 次 → 仍失败返回"无法生成"，不降级为自由文本。
4. **越界拦截**：出现"保证""稳赚""避税""内部消息"等词 → 拦截并记录；出现未授权字段 → 拦截。
5. **可解释**：每套方案必须能回答"用了哪些数据、哪条规则、哪个模型、哪些假设"。

### 7.4 质量评估（上线前）
| 指标 | 定义 | 门槛 |
|---|---|---|
| 可执行率 | 生成的 leg 能直接进入 PB-180 的比例 | ≥ 95% |
| 约束满足率 | 硬约束全部满足的提案比例 | 100% |
| RM 修改率 | RM 对 AI 稿的实质修改比例 | 首年 ≤ 40%，逐年下降 |
| 数字错误率 | 与 CALC 不一致的数字比例 | 0 |
| 越界拦截率 | 违规内容被拦截比例 | 100% |
| 解释采纳率 | RM 认为"why/why not"有用的比例 | ≥ 70% |

---

## 8. 异常与边界场景

| 场景 | 系统行为 | 人工动作 |
|---|---|---|
| 资金不足 | PB-150 阻断，提示缺口与融资选项 | RM 选择缩减/融资/改期 |
| 标的中途停牌 | 冻结子单，重算 TES，通知 RM | 决定撤单/等待 |
| 超过集中度上限 | WARN + 需 IC 审批 | IC 附条件通过或调整 |
| 适当性不匹配 | BLOCK（零售）/WARN（PI，需披露） | 合规审批，不得由 RM 单独放行 |
| 限制名单命中 | BLOCK，不显示原因细节（防信息泄露） | 合规处理 |
| 部分成交超时 | 按策略撤单/续单，记录 | 交易员确认 |
| 汇率剧烈波动 | 重算 FX 腿，超阈值暂停 | 交易台决定 |
| 客户临时改目标 | 回到 PB-110，旧提案标记 `EXPIRED` | RM 重新生成 |
| 规则版本更新 | 已签提案用快照，不回溯 | 新提案用新规则 |

---

## 9. KPI 与治理

| KPI | 定义 | 目标 | 责任人 |
|---|---|---|---|
| 提案周期 | 创建→客户可看 | ≤ 4h（T2） | RM 主管 |
| TES 覆盖率 | 有完整 TES 的提案比例 | 100% | 产品 |
| 成本偏差 | 实际 vs 预估 | ≤ 15% | 交易台 |
| 首次采纳率 | 签署/提交 | +10pp | RM |
| 合规返工率 | 因规则退回 | < 5% | 合规 |
| 模板复用率 | 标准模板订单占比 | > 80% | 产品 |
| 客户成本透明度 | 收到成本报告的客户比例 | 100% | Ops |

**治理节奏**：月度看模板实际成本与 TCA；季度校准 TES 权重与冲击模型；年度重审模板与规则版本。

---

*下一份：`02_uc2_quant_lab.md` — 配置、压力测试、回测与 RM 交付决策卡。*
