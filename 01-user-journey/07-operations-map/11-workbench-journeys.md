# 11 — Workbench 与 J1–J10 的关系：不是替换，是运营层

> 结论：**不要用 `rm-workbench.html` 替换 User journey 文档。**  
> `01-user-journey/` 是“为什么、为谁、什么结果”的旅程组合；`03-web-page/workbench/` 是“谁在什么步骤、看什么字段、做什么动作、用什么数据证明”的运营层；`03-web-page/client-journey.html` 是客户叙事层。
> 三层关系：**Journey（战略）→ Client journey（叙事）→ Workbench（运营）**。

> 数据 as of **2026-10-26**；公开案例复核周期**季度**（梅艳芳信托案 2026-08 结案，说明公开案例会过期）。  
> 编号说明：文件名 "11" 是原 `03_journeys/` 的**文档序号**，不代表第 11 条客户旅程；Workbench 不是旅程，是运营层。

---

## 一、三层结构

| 层 | 目录 | 回答的问题 | 主要读者 |
|---|---|---|---|
| **Journey** | `01-user-journey/` | 客户为什么需要、旅程有哪些、优先级是什么 | CEO/业务负责人/产品 |
| **Client journey** | `03-web-page/client-journey.html` | 客户/领导看到的体验是什么 | 客户/领导/RM |
| **Workbench** | `03-web-page/workbench/` | 运营步骤、字段、状态、证据、指标是什么 | RM/COO/Finance/Operations/Compliance |

所以：

- **J1–J10 保留**：家族/下一代、创始人、创作者、女性、跨境、家办、核心 HNW、信任、RM、伙伴。
- **Workbench 不是第 11 条客户旅程**；它是 J2/J6/J8/J1/J4/J3/J7/J9 的**运营实现**。
- **Client journey 不是过期版本**；它保留客户叙事，Workbench 负责把叙事接到业务字段和数据。

---

## 二、Workbench 五个模块对应的旅程

| Workbench 模块 | 主要旅程 | 客户时刻 | 运营结果 |
|---|---|---|---|
| **1 · IPO & PB** | **J2 创始人** + **J6 家办** | 公司 IPO/H 股/老股/M&A，管理层财富事件 | CIB 识别 → consent/wall → PB KYC → 估值/信贷/信托/家办 |
| **2 · Estate & Continuity** | **J8 信任** | 死亡、probate、遗产分配、信托继续 | 时间线、授权、estate account、12 个月结果 |
| **3 · Family Onboarding** | **J1 家族** + **J3 创作者** + **J4 女性** + **J7 核心 HNW** | 新客户、二代、配偶首次投资；创作者家庭（演示：UK creator / cross-border creator family） | family map、consent、suitability、template、first investment |
| **4 · Revenue & Margin** | **J9 RM** + **J6 家办** | 客户/产品/RM 收入与成本 | client P&L、product P&L、RM scorecard |
| **5 · Order Trust** | **J9 RM** + **J8 信任** | 订单失败、市场关闭、系统异常 | failed trade %、reason code、recovery、RM KPI |

---

## 三、五个运营旅程

### 3.1 IPO & PB（J2 + J6）

**改造前：**

CIB 有 IPO/并购关系，PB 只在事后听到“某创始人上市了”；管理层持股、锁定期、老股、税务、信托、家办分散在投行、律师、税务、私行；Pre-IPO 估值靠邮件和最近一轮融资价；高管被“介绍”给 PB，但没有 consent/wall/KYC 的正式链路。

> **基线锚点（公开层）：** 财富事件量级可验证——DeepSeek 2026-07 融资约 ¥51bn（媒体投后约 US$49–56bn）、Unruly £58m 首付 + £56m earn-out、Riverford EOT —— 上市/出售后个人财富事件是确定发生的；"consent/wall 链路缺失"是流程断言，需用内部留痕复扫，本节数字为演示假设。

**改造后：**

1. CIB/MSS 在 pipeline 中标记 IPO/H 股/老股/M&A 事件；
2. 公司/管理层 profile：股权、期权、锁定期、转让限制、跨境；
3. Pre-IPO valuation：方法/权重/折扣/区间/委员会；
4. CIB→PB handoff：客户 consent、合规墙、KYC、家族发现、服务激活；
5. PB 接手：信贷、质押、信托、家办、下一代、HSBC Access。

**页面：** `ipo-pipeline`、`ipo-company`、`ipo-valuation`、`ipo-handoff`。

### 3.2 Estate & Continuity（J8）

**改造前：**

死亡后家属找 RM；不同实体重复要死亡证明/遗嘱/probate；estate/trust 混在一起；月度支付/法律费用/受益人结果没有 cohort；案件关闭即结束。

> **基线锚点（公开层，可测）：** FOS DRN-4737924 公开裁定 grant（2023-08-16）后 **15 天**放款——"快"是可测的；Mui 遗嘱信托执行 23 年并于 2026-08 按遗嘱终止（防败家、支付精确）；Tao Soh Ngun [2018] HKCFI 380 展示意愿书/受托人职责冲突。本节 cohort 数字（15/18 天等）为演示假设，公开锚点用于对照。

**改造后：**

1. Estate portfolio：案件、天数、资产、已分配、法律成本；
2. Timeline：T+0 死亡、POA 终止、executor、probate、estate account、分配；
3. Authority matrix：executor/trustee/attorney/beneficiary 能做什么/不能做什么；
4. 12-month outcomes：首笔支付、分配率、法律成本、留存、NPS。

**页面：** `estate-portfolio`、`estate-case`、`estate-authority`、`estate-outcomes`。

### 3.3 Family Onboarding（J1 + J4 + J7）

**改造前：**

新客户/二代/配偶被当成“附属”；产品模板缺失；适当性靠 RM 口头；首次投资门槛高；配偶/子女权限靠“家长说了算”。

> **基线锚点：** 无公开行业基线；此段是运营断言（演示假设）——需内部抽样“家族建立→首笔投资天数”“appropriateness 记录完整率”后建立真基线，再引用本表目标值。

**改造后：**

1. Family onboarding：人/角色/consent/目标/权限；
2. Suitability：目标/风险承受/能力/知识/流动性/限制；
3. Templates：保本/收益/平衡/增长/流动性/ESG；
4. First investment：小票、教育、确认、下单、post-trade review。

**页面：** `onboarding-family`、`onboarding-suitability`、`onboarding-templates`、`onboarding-first`。

### 3.4 Revenue & Margin（J9 + J6）

**改造前：**

“客户佣金”被当成“毛利”；收入按产品/客户/RM 对不上；成本（RM 时间、运营、法律、技术、资金）没有分摊；RM KPI 只看收入。

> **基线锚点（公开层，产能侧）：** Accenture 2025（私行 RM 50–70 客户；affluent 200+）、GS PWM 1:25、Asian Private Banker 2025（AUM/RM ≈ US$473m）——"一个 RM 服务多少关系"可公开对照；收入-成本口径（分摊、转移定价、确认）需内部 Finance 校准，本节金额为演示。

**改造后：**

1. Revenue cockpit：收入/毛利/净利/成本收入比；
2. Client P&L：客户收入/直接成本/分摊成本/净利/钱包；
3. Product P&L：顾问/托管/经纪/贷款/外汇/信托；
4. RM scorecard：relationships/households/AUM/revenue/margin/failed trades/NPS，加 `support_ratio`、`segment_mix`、`service_intensity` 三个产能字段（workload index 校准）。

**页面：** `revenue-cockpit`、`revenue-client`、`revenue-product`、`revenue-rm`。

### 3.5 Order Trust（J9 + J8）

**改造前：**

订单失败只记“失败”；不区分市场关闭/系统/资金/合规；RM 被原始失败率误伤；客户不知道下一步。

> **基线锚点：** 无同业公开的失败率同口径数据；演示口径 5.5%（trailing 30 天，128 单当天 7 失败）为演示假设——“可控失败 < 3%”目标需运营先发布 reason code 分类定义再校准。

**改造后：**

1. Order monitor：订单/客户/RM/市场/金额/状态/原因；
2. Failure detail：root cause、control、client impact；
3. Recovery：detect → explain → rebook → compensate → root cause；
4. KPI：failed trade %、first-time fill、recovery time、client impact、RM KPI、trust。

**页面：** `order-monitor`、`order-failure`、`order-recovery`、`order-kpi`。

---

## 四、为什么不是“替换旧 journey”

1. **抽象层级不同**：J1–J10 是战略组合；Workbench 是运营步骤。
2. **读者不同**：J1–J10 给 CEO/业务负责人；Workbench 给 RM/COO/Finance/Operations。
3. **数据不同**：J1–J10 用公开案例/需求证据；Workbench 用内部字段/状态/指标。
4. **演示不同**：Client journey 讲客户故事；Workbench 讲“今天谁做什么、看什么字段、怎么证明”。
5. **如果强行替换**：会失去“为什么做/先做哪条”的战略层，也会把 Workbench 的运营细节误当成客户旅程。

**正确做法：**

- 保留 `01-user-journey/`；
- 在 J2/J6/J8/J1/J4/J7/J9 页面加“Workbench execution”链接；
- 用 Workbench 的字段/指标反推 Journey 的验收标准；
- 用 Journey 的优先级决定 Workbench 的建设顺序。

---

## 五、演讲台词在哪里

`03-web-page/workbench/` 每一页都有 **Speaker notes** 按钮，打开当前页的中英文台词、屏幕动作和转场。

台词源文件：[`03-web-page/workbench/scripts.js`](../../03-web-page/workbench/scripts.js)。

领导层视频的完整分镜与英文解说（含客户旅程三镜、开场/收尾、录制模式）：[`../../04-video-and-movie/12-minute-master-script.md`](../../04-video-and-movie/12-minute-master-script.md)。

每一页的台词包含：

1. **中文台词**：完整句子，专业词 + 解释；
2. **English script**：使用 Avaloq 同类的 native English 术语（authorization, entitlement, settlement, collateral, valuation governance, capital call, earn-out, obligation, suitability, cost-to-serve, failed trade, reason code）；
3. **On screen**：这一页点什么/看什么字段；
4. **Transition**：下一页怎么接。

---

## 六、验收标准表（用 Workbench 字段反推 Journey）

对每个模块给出可验收的指标、基线、目标、责任人与测量频率。**基线目前是演示假设或公开锚点**（见表内标注）；上线前用内部数据置换基线，目标值经业务负责人确认后生效。

### 6.1 IPO & PB（J2 + J6）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| consent/wall 留痕率（CIB 财富事件 → PB 介绍） | 无留痕（演示假设；流程断言） | 100%（consent ref + 时间戳 + wall check ref，见 workbench `consentRecord` 结构） | COO / Compliance | 每事件 |
| Pre-IPO 估值治理覆盖率 | 未测（演示假设） | 100%：方法/权重/折扣/区间/委员会留痕后才出可贷参考值 | 估值委员会 | 每估值 |
| consent 到 PB KYC 启动的天数 | 未测（演示假设） | ≤ 10 个工作日 | PB Onboarding | 季度 |

### 6.2 Estate & Continuity（J8）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| grant → 首笔合法支付中位天数 | 公开锚点：FOS 案例 15 天（单案）；cohort 未测 | 中位 ≤ 20 天 | Estate Ops / COO | 季度 cohort |
| 12 个月内分配完成率 | 72%（演示假设） | ≥ 70% | Estate Ops | 季度 cohort |
| 法律成本占遗产比例 | 2.1%–4.8%（演示假设；跨境最差） | ≤ 2.5% | Legal / Estate Ops | 季度 cohort |

### 6.3 Family Onboarding（J1 + J3 + J4 + J7）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| 家族建立 → 首笔投资天数 | 未测（演示假设：≤ 30 天流程） | ≤ 30 天 | PB RM / Onboarding | 季度 |
| suitability 记录完整率 | 未测（演示假设） | 100%（首笔投资前） | Compliance | 每笔 |
| 成年子女/配偶 consent 覆盖率 | 未测（演示假设；家长不能代成年子女同意） | 100% | Compliance | 季度 |

### 6.4 Revenue & Margin（J9 + J6）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| top-100 关系的 client P&L 覆盖率 | 0（未建） | 100%（收入行 + 直接成本 + 分摊） | Finance / PB COO | 月度 |
| 财务签核（口径：分摊/转移定价/确认） | 无 | 每版数字有 Finance 签核标记才可对外 | Finance | 每版 |
| workload index 再校准 | 未做时间研究（公式为校准演示） | 半年一次以时间研究校准权重 | HR / PB COO | 半年 |

### 6.5 Order Trust（J9 + J8）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| 可控失败占失败比例 | 5.5% 总失败率（演示假设，30 天窗口） | 可控失败 < 3% | COO | 周 |
| 平均恢复时长 | 42 分钟（演示假设） | ≤ 30 分钟 | Operations | 周 |
| 当日已告知客户占比 | 4/4（演示假设） | 100%（当日） | RM / Service | 周 |

> 复核机制：公开案例数字每季度复核一次并更新 as-of；演示基线在接入真实数据层（IPO pipeline、estate cohort、收入/成本、订单事件、onboarding 闭环）后整体置换。

---

## 七、与 `client-journey.html` 的重叠边界（m4-founder / m4-valuation / m3-family）

`client-journey.html` 已含与 Workbench 模块 1、3 主题重叠的页面。**不删除、不双写**：叙事与规则演示留在客户旅程，运营字段与治理记录在 workbench；规则冲突时以 [`../../02-functional-architecture/`](../../02-functional-architecture/README.md)（估值/信贷治理）为准。

| 主题 | Client journey 位置 | Workbench 位置 | 谁作准 | 处理 |
|---|---|---|---|---|
| Pre-IPO 估值规则（DLOM/少数股权/haircut→LTV→可贷值/40% 触发） | `client-journey.html#/m4-valuation`（交互规则演示） | `rm-workbench.html#/ipo-valuation`（方法/权重/折扣/委员会/lendable 参考） | 规则=architecture；执行字段=workbench；教学=client | workbench 的 lendable 参考值注明“规则集在 client m4-valuation”；P1 将规则合并到 workbench 后在 client 页提示单项来源 |
| 创始人财富 360 | `client-journey.html#/m4-founder`（客户面叙事） | `rm-workbench.html#/ipo-company`、`#/ipo-handoff`（内部股权/移交字段） | 面客户=client；内部 profile=workbench | 互链；客户资料字段不进客户叙事页 |
| 家族 onboarding | `client-journey.html#/m3-family`（叙事） | `rm-workbench.html#/onboarding-family`、`#/onboarding-suitability`、`#/onboarding-templates`、`#/onboarding-first` | 叙事=client；字段/权限/consent=workbench | client 引用 workbench 模板清单 |
| 事实一致性 | client 的 PA/pledge 演示使用虚构发行人（AI Terra，illustrative）；DeepSeek/公开案只作叙述参照 | workbench 同一套命名政策 | workbench | `check.js` 断言账户级行无公众人物名 |

---

## 八、一句话

> **J1–J10 是“为什么做、先做哪条”；Client journey 是“客户看到什么”；Workbench 是“银行内部谁在什么步骤、看什么字段、怎么证明”。三者是层次关系，不是替代关系。**
