# 06 — Pilot & Operations：真实家族验证与 Workbench 运营层

> 本文件把“怎么用真实家族验证”和“旅程如何落到 Workbench 运营层”合并为一份。
> **A 是 Pilot 设计**（23 组公开真实家族 + 20–30 个已同意客户家族）；**B 是运营层映射**（J1–J10 → 五个 Workbench 模块）。
> 两条轨道不要混：公开家族用于设计与 demo；客户家族用于试点，必须 consent。

## 本文件结构

| 节 | 回答什么 | 原文件（已合并） |
|---|---|---|
| A | 用谁、什么数据、怎么访谈、指标、法务/隐私/伦理 | `06-pilot/04-real-family-pilot.md` |
| B | 五个运营旅程、21 页工作台、验收标准、与客户页边界 | `07-operations-map/11-workbench-journeys.md` |

---

## A. 真实家族 Pilot：真人不等于真客户

<!-- source: 01-user-journey/06-pilot/04-real-family-pilot.md -->

> 用户要求：pilot 一定要使用真实的人物、家族、家庭的信息和数据。
> 执行原则：**设计/演示用 23 组公开真实家族；实际试点用 20–30 个已同意客户家族；不使用合成画像替代，不碰非公开数据。**
> 性质：内部设计/试点方案，不是客户营销，不构成法律/税务/投资建议。

---

### 0. 两条轨道，不要混

| 轨道 | 用谁 | 用什么数据 | 目的 | 合规 |
|---|---|---|---|---|
| **A. 公开真实家族设计实验室** | 23 组公开人物/家族（CSV） | 上市公告、招股书、法院/监管文件、公开报道 | 验证结构/对象/旅程；做 demo/workshop | 只用公开事实；不主张客户关系；法务逐案预审 |
| **B. 客户真实家族 Pilot** | 20–30 个已同意客户家族 | 客户授权字段/账户/信托/目标/事件 | 验证可用性/价值/ROI | 客户 consent；数据最小化；PIA/DPIA；可撤回 |

> **A 是“真家族、公开数据”；B 是“真客户、授权数据”。**  
> 不能用 A 的公开信息去推断 B 的私人安排；也不能把 A 的人说成 HSBC 客户。

---

### 1. 23 组公开真实家族池

完整字段见 [`personas/real-families.csv`](personas/real-families.csv)。这里给主旅程映射：

| 旅程 | 家族/人物（公开） | 用来验证什么 |
|---|---|---|
| **S1 / J1 / J7 教育/复利** | Nadiya Hussain、Jamie Vardy、李嘉诚家族（教育/基金会） | 家庭现金流、教育金、短收入窗口、长期复利 |
| **S2 / J1 / J3 二代创业** | 张勇/舒萍、Hawker Chan、Ali Abdaal、Lego/KIRKBI | 下一代独立、创业/品牌/加盟、家族办公室 |
| **S3 / J5 跨境** | 李西廷、Poonawalla、Mittal、Ali Abdaal、郭鹤年 | 多辖区/多登记/税务居民/实体/房产 |
| **S4 / J2 退出/流动性** | 周群飞、Guy Singh-Watson、Sarah Wood、Neame、梁文锋、Alvin Leung | A+H、EOT、earn-out、薄市场、Pre-IPO、多实体 |
| **S5 / J1 / J6 家办/治理** | 李嘉诚、郑裕彤、郭鹤年、Premji、Murdoch、Hermès、Tata、张勇/舒萍 | 控制权/信托/基金会/家办/传承/争议 |
| **X1/X2 / J8 压力** | 郑裕彤、Majid Al Futtaim、Murdoch、李嘉诚（分家） | 授权/争议/继承/信托/法院命令 |

#### 1.1 为什么是这 23 组

- 覆盖 **A/H 双登记、四个证券制度、家族办公室、信托/基金会、政府董事、跨境迁移、EOT/earn-out、薄市场、Pre-IPO、创作者、餐饮/加盟、女性/家庭**。
- 每组至少有 **两个公开来源**（公司披露/法院/监管/主流媒体）；报道类事实标注“报道/估计”。
- 不包含匿名案例；何氏家族（旧 demo）不进“真实家族”池，只做压力场景的合成补充。

#### 1.2 公开数据 vs 需要同意的数据

| 数据类型 | 公开实验室（A） | 客户 Pilot（B） |
|---|---|---|
| 公司/股权/董事 | 公开披露 | 客户授权/银行 KYC |
| 家族关系/角色 | 公开报道（谨慎） | 客户确认 |
| 信托/受益人 | 公开文件/报道（有限） | 信托契约/客户授权 |
| 账户/持仓/余额 | 不可得 | 银行系统 + consent |
| 税务居民/TIN | 公开报道（有限） | 税务 self-cert + consent |
| 健康/失能 | 不可得 | 医疗/法律文件 + 严格 consent |
| 家庭目标/治理 | 不可得/推测禁止 | 访谈 + 客户确认 |

> 关键：**公开实验室不能“猜”私人数据；客户 Pilot 不能“绕过” consent。**

---

### 2. Pilot 设计

#### 2.1 规模与分组

| 组 | 数量 | 对象 | 重点 | 周期 |
|---|---|---|---|---|
| **A 公开设计实验室** | 23 组 | 公开真实家族 | 对象/旅程/证据/页面 | 4–6 周 |
| **B1 阳光组** | 8–10 家族 | 已同意客户 | S1 教育/复利、S2 二代、S5 家办 | 8–12 周 |
| **B2 跨境/退出组** | 8–10 家族 | 已同意客户 | S3 跨境、S4 退出/私股 | 8–12 周 |
| **B3 压力组** | 4–6 家族 | 已同意客户/近期事件 | X1 失能、X2 身故/遗产 | 8–12 周 |

合计 **20–26 个客户家族** + 23 组公开实验室。

#### 2.2 参与条件

- 客户/家族 **书面同意**；可撤回；明确用途/字段/共享方。
- 至少一位家族成员是主客户；配偶/成年子女/家办可分别同意。
- 不强制未成年人参与；未成年人数据去标识化。
- 近期压力事件（失能/身故）只在客户主动愿意时纳入；不主动营销。
- 公开家族只做设计，不联系、不暗示客户关系。

#### 2.3 数据包（每个家族）

| 对象 | 字段 | 来源 |
|---|---|---|
| `Family` | 成员、分支、代际、角色 | 客户访谈 + KYC |
| `Entity` | 公司/信托/基金/家办/保险 | KYC/客户文件 |
| `Ownership/Control` | 持股/投票/罢免/保护人 | 公司文件/信托契约 |
| `Authority/Consent` | POA/LPA/EPA/deputy/trustee/executor；范围/生效/失效/辖区 | 法律文件/客户 |
| `Goal` | 教育/创业/搬迁/退出/传承/慈善；金额/时间/币种/四元组 | 客户访谈 |
| `Event` | 过去 24 个月/未来 24 个月 | 客户/RM/系统 |
| `Asset` | 账户/持仓/私股/房产/收藏品 | 银行/客户授权 |
| `Tax` | 居民/实体/收入/预扣/CRS/FATCA | 客户/税务顾问 |
| `Evidence` | 文件/决策/批准/送达 | 银行/客户/律师 |
| `NextGen` | 课程/导师/独立账户/首投/创业/慈善 | 客户/课程 |

---

### 3. 访谈/工作坊

#### 3.1 家族访谈（90 分钟）

1. 家族地图：谁是谁、谁决定、谁受益、谁被忽略。
2. 目标：未来 3/10 年；教育/创业/搬迁/退出/传承/慈善。
3. 痛点：过去 24 个月最糟糕的银行体验；重复 KYC/文件/等待。
4. 授权：谁在失能/身故/争议时能做什么；文件在哪；银行是否知道。
5. 下一代：他们想要什么/不想要什么；是否愿意独立 consent/账户。
6. 成功：什么算“好结果”；愿不愿意付费/推荐。

#### 3.2 RM/专家工作坊（半天）

- 用公开家族做 case：S1/S2/S5；画 Family Map/Authority/Goals/Events。
- 用压力家族做 case：X1/X2；画授权缺口/证据缺口。
- 输出：页面/字段/规则/证据需求。

#### 3.3 公开实验室（2 天）

- 23 组家族分 5 组；每组选 4–5 个，画对象/旅程。
- 产出：`FamilyMap`/`AuthorityGraph`/`GoalEvent`/`Evidence` 模板；差异清单。
- 法务逐案审：公开事实/来源/不能说的话。

---

### 4. 交付物

| 交付 | 内容 | 验收 |
|---|---|---|
| **Family Map v0** | 20–26 客户家族 + 23 公开家族 | 成员/实体/角色/控制/受益完整率 ≥80% |
| **Authority/Consent v0** | 文书/范围/生效/失效/辖区/consent | 能回答“谁现在能做什么/不能做什么” |
| **Goals/Events v0** | 教育/创业/搬迁/退出/传承/慈善 | 每个家族 ≥3 个目标/事件 |
| **Evidence v0** | 文件/决策/批准/送达 | E2+ ≥80%；关键决策 E3 |
| **S1/S2/S5 原型** | 教育/二代/家办 | 8–10 家族可用；NPS/任务完成 |
| **S3/S4 原型** | 跨境/退出/私股 | 8–10 家族可用；时间/完整性 |
| **X1/X2 原型** | 失能/身故 | 4–6 家族；0 无权支付/披露 |
| **Pilot 报告** | 价值/问题/ROI/下一步 | 投委会/董事会 |

---

### 5. 指标

| 维度 | 指标 | 目标（示意） |
|---|---|---|
| 覆盖 | 客户家族数/跨代家族数 | 20–26 / ≥50% 跨 2 代 |
| 数据 | Family Map/Authority/Goals/Evidence 完整率 | ≥80% |
| 体验 | 任务完成时间、重复 KYC、NPS | 时间 −30%、重复 −50%、NPS +10 |
| 信任 | 0 无权支付/越权披露；证据完整 | 0 / ≥80% E2+ |
| 商业 | 钱包份额、下一代激活、家办 AUA | 基线 +10–20% |
| 组织 | RM 可用性、培训、反馈 | ≥80% RM 认为可用 |

> 目标值是设计假设，需基线校准；不对外承诺。

---

### 6. 法务/隐私/伦理

1. **公开实验室**：只引用公开来源；不联系当事人；不主张客户关系；法务逐案审。
2. **客户 Pilot**：书面 consent；字段/目的/共享方/期限；可撤回；PIA/DPIA。
3. **未成年人**：不主动收集；去标识化；监护人同意。
4. **压力事件**：不主动营销；客户主动愿意才纳入；心理支持/退出机制。
5. **跨境**：数据驻留/传输协议；当地法律意见。
6. **税务/法律**：银行不做意见；只做数据/协调/转介。
7. **公开报道**：标注“报道/估计”；不升级为“已核实”；不引用社交媒体二次解读。
8. **不使用非公开数据**：不在公开实验室中推断/填充客户私人数据。

---

### 7. 不能做什么

- 不能把公开人物说成 HSBC 客户。
- 不能用公开信息推断其税务/健康/家庭矛盾。
- 不能未经 consent 使用客户账户/信托/家庭数据。
- 不能把“课程参与”当“传承成功”。
- 不能把 pilot 目标值当对外承诺。
- 不能把压力家族当营销素材。

---

### 8. 与 Ida 战略的对应

| Ida 主题 | Pilot 验证 |
|---|---|
| 家族关系 | Family Map / 跨代访谈 |
| 下一代 | S2 + MIT/Athens 课程 → 独立账户/首投/创业 |
| 家办 | S5 + 合并报表/治理/CIB |
| 跨境 | S3 + 多辖区/税务/实体 |
| 女性/配偶 | S1 + Nadiya/女性财富报告 |
| 治理 | Family Charter/Council/Decision |
| 长期价值 | 钱包份额/下一代激活/留存 |

---

### 9. 来源

- [`personas/`](personas/)（21 组 HTML 核心案例；v3.5）
- [`personas/real-families.csv`](personas/real-families.csv)（23 组公开家族池）
- HSBC 2025/2026 新闻稿/年报；UBS GFO 2025；Citi Family Office Advisory；SCB `Celebrating Life's Work`；Avaloq clients。
- 具体公开事实来源以 personas HTML 文末来源清单为准；对外引用前法务逐案复核。

---

## B. Workbench 与 J1–J10：运营层映射

<!-- source: 01-user-journey/07-operations-map/11-workbench-journeys.md -->

> 结论：**不要用 `rm-workbench.html` 替换 User journey 文档。**  
> `01-user-journey/` 是“为什么、为谁、什么结果”的旅程组合；`03-web-page/workbench/` 是“谁在什么步骤、看什么字段、做什么动作、用什么数据证明”的运营层；`03-web-page/client-journey.html` 是客户叙事层。
> 三层关系：**Journey（战略）→ Client journey（叙事）→ Workbench（运营）**。

> 数据 as of **2026-10-26**；公开案例复核周期**季度**（梅艳芳信托案 2026-08 结案，说明公开案例会过期）。  
> 编号说明：文件名 "11" 是原 `03_journeys/` 的**文档序号**，不代表第 11 条客户旅程；Workbench 不是旅程，是运营层。

---

### 一、三层结构

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

### 二、Workbench 五个模块对应的旅程

| Workbench 模块 | 主要旅程 | 客户时刻 | 运营结果 |
|---|---|---|---|
| **1 · IPO & PB** | **J2 创始人** + **J6 家办** | 公司 IPO/H 股/老股/M&A，管理层财富事件 | CIB 识别 → consent/wall → PB KYC → 估值/信贷/信托/家办 |
| **2 · Estate & Continuity** | **J8 信任** | 死亡、probate、遗产分配、信托继续 | 时间线、授权、estate account、12 个月结果 |
| **3 · Family Onboarding** | **J1 家族** + **J3 创作者** + **J4 女性** + **J7 核心 HNW** | 新客户、二代、配偶首次投资；创作者家庭（演示：UK creator / cross-border creator family） | family map、consent、suitability、template、first investment |
| **4 · Revenue & Margin** | **J9 RM** + **J6 家办** | AUM/收入/客户佣金/毛利/净利/CIR + RM 产能 | PB Operating Dashboard、client P&L、product P&L、RM scorecard |
| **5 · Order Trust** | **J9 RM** + **J8 信任** | 订单失败、市场关闭、系统异常 | failed trade %、reason code、recovery、RM KPI |

---

### 三、五个运营旅程

#### 3.1 IPO & PB（J2 + J6）

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

#### 3.2 Estate & Continuity（J8）

**改造前：**

死亡后家属找 RM；不同实体重复要死亡证明/遗嘱/probate；estate/trust 混在一起；月度支付/法律费用/受益人结果没有 cohort；案件关闭即结束。

> **基线锚点（公开层，可测）：** FOS DRN-4737924 公开裁定 grant（2023-08-16）后 **15 天**放款——"快"是可测的；Mui 遗嘱信托执行 23 年并于 2026-08 按遗嘱终止（防败家、支付精确）；Tao Soh Ngun [2019] HKCFI 1268 展示意愿书/受托人职责冲突（2018 为程序裁定）。本节 cohort 数字（15/18 天等）为演示假设，公开锚点用于对照。

**改造后：**

1. Estate portfolio：案件、天数、资产、已分配、法律成本；
2. Timeline：T+0 死亡、POA 终止、executor、probate、estate account、分配；
3. Authority matrix：executor/trustee/attorney/beneficiary 能做什么/不能做什么；
4. 12-month outcomes：首笔支付、分配率、法律成本、留存、NPS。

**页面：** `estate-portfolio`、`estate-case`、`estate-authority`、`estate-outcomes`。

#### 3.3 Family Onboarding（J1 + J4 + J7）

**改造前：**

新客户/二代/配偶被当成“附属”；产品模板缺失；适当性靠 RM 口头；首次投资门槛高；配偶/子女权限靠“家长说了算”。

> **基线锚点：** 无公开行业基线；此段是运营断言（演示假设）——需内部抽样“家族建立→首笔投资天数”“appropriateness 记录完整率”后建立真基线，再引用本表目标值。

**改造后：**

1. Family onboarding：人/角色/consent/目标/权限；
2. Suitability：目标/风险承受/能力/知识/流动性/限制；
3. Templates：保本/收益/平衡/增长/流动性/ESG；
4. First investment：小票、教育、确认、下单、post-trade review。

**页面：** `onboarding-family`、`onboarding-suitability`、`onboarding-templates`、`onboarding-first`。

#### 3.4 PB Operating Dashboard & RM（J9 + J6）

**改造前：**

AUM、收入、客户佣金、毛利/净利/CIR 分散；公式与成本分摊不透明；收入按产品/客户/RM 对不上；成本（RM 时间、运营、法律、技术、资金）没有分摊；RM KPI 只看收入。

> **基线锚点（公开层，产能侧）：** Accenture 2025（私行 RM 50–70 客户；affluent 200+）、GS PWM 1:25、Asian Private Banker 2025（AUM/RM ≈ US$473m）——"一个 RM 服务多少关系"可公开对照；收入-成本口径（分摊、转移定价、确认）需内部 Finance 校准，本节金额为演示。

**改造后：**

1. PB Operating Dashboard：AUM/收入/客户佣金/毛利/净利/CIR + 公式；
2. Client P&L：客户收入/直接成本/分摊成本/净利/钱包；
3. Product P&L：顾问/托管/经纪/贷款/外汇/信托；
4. RM scorecard：relationships/households/AUM/revenue/margin/failed trades/NPS，加 `support_ratio`、`segment_mix`、`service_intensity` 三个产能字段（workload index 校准）。

**页面：** `revenue-cockpit`、`revenue-client`、`revenue-product`、`revenue-rm`。

#### 3.5 Order Trust（J9 + J8）

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

### 四、为什么不是“替换旧 journey”

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

### 五、演讲台词在哪里

`03-web-page/workbench/` 每一页都有 **Speaker notes** 按钮，打开当前页的中英文台词、屏幕动作和转场。

台词源文件：[`03-web-page/workbench/scripts.js`](../03-web-page/workbench/scripts.js)。

领导层视频的完整分镜与英文解说（含客户旅程三镜、开场/收尾、录制模式）：[`../04-video-and-movie/12-minute-master-script.md`](../04-video-and-movie/12-minute-master-script.md)。

每一页的台词包含：

1. **中文台词**：完整句子，专业词 + 解释；
2. **English script**：使用 Avaloq 同类的 native English 术语（authorization, entitlement, settlement, collateral, valuation governance, capital call, earn-out, obligation, suitability, cost-to-serve, failed trade, reason code）；
3. **On screen**：这一页点什么/看什么字段；
4. **Transition**：下一页怎么接。

---

### 六、验收标准表（用 Workbench 字段反推 Journey）

对每个模块给出可验收的指标、基线、目标、责任人与测量频率。**基线目前是演示假设或公开锚点**（见表内标注）；上线前用内部数据置换基线，目标值经业务负责人确认后生效。

#### 6.1 IPO & PB（J2 + J6）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| consent/wall 留痕率（CIB 财富事件 → PB 介绍） | 无留痕（演示假设；流程断言） | 100%（consent ref + 时间戳 + wall check ref，见 workbench `consentRecord` 结构） | COO / Compliance | 每事件 |
| Pre-IPO 估值治理覆盖率 | 未测（演示假设） | 100%：方法/权重/折扣/区间/委员会留痕后才出可贷参考值 | 估值委员会 | 每估值 |
| consent 到 PB KYC 启动的天数 | 未测（演示假设） | ≤ 10 个工作日 | PB Onboarding | 季度 |

#### 6.2 Estate & Continuity（J8）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| grant → 首笔合法支付中位天数 | 公开锚点：FOS 案例 15 天（单案）；cohort 未测 | 中位 ≤ 20 天 | Estate Ops / COO | 季度 cohort |
| 12 个月内分配完成率 | 72%（演示假设） | ≥ 70% | Estate Ops | 季度 cohort |
| 法律成本占遗产比例 | 2.1%–4.8%（演示假设；跨境最差） | ≤ 2.5% | Legal / Estate Ops | 季度 cohort |

#### 6.3 Family Onboarding（J1 + J3 + J4 + J7）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| 家族建立 → 首笔投资天数 | 未测（演示假设：≤ 30 天流程） | ≤ 30 天 | PB RM / Onboarding | 季度 |
| suitability 记录完整率 | 未测（演示假设） | 100%（首笔投资前） | Compliance | 每笔 |
| 成年子女/配偶 consent 覆盖率 | 未测（演示假设；家长不能代成年子女同意） | 100% | Compliance | 季度 |

#### 6.4 PB Operating Dashboard & RM（J9 + J6）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| top-100 关系的 client P&L 覆盖率 | 0（未建） | 100%（收入行 + 直接成本 + 分摊） | Finance / PB COO | 月度 |
| 财务签核（口径：分摊/转移定价/确认） | 无 | 每版数字有 Finance 签核标记才可对外 | Finance | 每版 |
| workload index 再校准 | 未做时间研究（公式为校准演示） | 半年一次以时间研究校准权重 | HR / PB COO | 半年 |

#### 6.5 Order Trust（J9 + J8）

| 指标 | 基线 | 目标 | Owner | 频率 |
|---|---|---|---|---|
| 可控失败占失败比例 | 5.5% 总失败率（演示假设，30 天窗口） | 可控失败 < 3% | COO | 周 |
| 平均恢复时长 | 42 分钟（演示假设） | ≤ 30 分钟 | Operations | 周 |
| 当日已告知客户占比 | 4/4（演示假设） | 100%（当日） | RM / Service | 周 |

> 复核机制：公开案例数字每季度复核一次并更新 as-of；演示基线在接入真实数据层（IPO pipeline、estate cohort、收入/成本、订单事件、onboarding 闭环）后整体置换。

---

### 七、与 `client-journey.html` 的重叠边界（m4-founder / m4-valuation / m3-family）

`client-journey.html` 已含与 Workbench 模块 1、3 主题重叠的页面。**不删除、不双写**：叙事与规则演示留在客户旅程，运营字段与治理记录在 workbench；规则冲突时以 [`../../02-functional-architecture/`](../02-functional-architecture/README.md)（估值/信贷治理）为准。

| 主题 | Client journey 位置 | Workbench 位置 | 谁作准 | 处理 |
|---|---|---|---|---|
| Pre-IPO 估值规则（DLOM/少数股权/haircut→LTV→可贷值/40% 触发） | `client-journey.html#/m4-valuation`（交互规则演示） | `rm-workbench.html#/ipo-valuation`（方法/权重/折扣/委员会/lendable 参考） | 规则=architecture；执行字段=workbench；教学=client | workbench 的 lendable 参考值注明“规则集在 client m4-valuation”；P1 将规则合并到 workbench 后在 client 页提示单项来源 |
| 创始人财富 360 | `client-journey.html#/m4-founder`（客户面叙事） | `rm-workbench.html#/ipo-company`、`#/ipo-handoff`（内部股权/移交字段） | 面客户=client；内部 profile=workbench | 互链；客户资料字段不进客户叙事页 |
| 家族 onboarding | `client-journey.html#/m3-family`（叙事） | `rm-workbench.html#/onboarding-family`、`#/onboarding-suitability`、`#/onboarding-templates`、`#/onboarding-first` | 叙事=client；字段/权限/consent=workbench | client 引用 workbench 模板清单 |
| 事实一致性 | client 的 PA/pledge 演示使用虚构发行人（AI Terra，illustrative）；DeepSeek/公开案只作叙述参照 | workbench 同一套命名政策 | workbench | `check.js` 断言账户级行无公众人物名 |

---

### 八、一句话

> **J1–J10 是“为什么做、先做哪条”；Client journey 是“客户看到什么”；Workbench 是“银行内部谁在什么步骤、看什么字段、怎么证明”。三者是层次关系，不是替代关系。**

---
