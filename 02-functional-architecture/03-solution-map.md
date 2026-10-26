# 03 — Solution Map：能力、页面、验证与 Workbench

> 本文件把“模块/页面映射”“五个新思路验证”“21 页 Workbench”合并为一份，回答：**能力如何落到页面、运营步骤、字段与指标。**
> 视频实际 demo 的旅程表见 [`../01-user-journey/00-journey-catalog.md`](../01-user-journey/00-journey-catalog.md)。
> RM 税务指引是单独规格：[`04-rm-tax-guide.md`](04-rm-tax-guide.md)。

## 视频 demo → 能力域 → 页面（先看这张）

| 影片问题 | Demo journey | 能力域 | 主要页面 | 运营结果 |
|---|---|---|---|---|
| IPO / CIB→PB | J2 | C03/C08/C02/C10/X1 | `ipo-*`、`m4-*` | 事件→consent→估值→质押/退出→handoff |
| 新客户/二代/配偶 | J1/J4/J7 | C01/C02/C03/C04/C06 | `onboarding-*`、`m3-family`、`m1-*` | 家庭图→独立 consent→适当性→首投→复盘 |
| 身故与传承 | J8 | C09/C02/C03/X1/C12 | `estate-*`、`m4-trust` | 授权→probate→estate/trust→12 个月结果 |
| PB 经营 / RM 产能 | J9（J6 为读者） | X2/C12/C05 | `revenue-*` | AUM→收入→客户佣金→毛利→净利→CIR→RM 产能 |
| 失败交易与信任 | J9/J8 | C07/X1/X2/C12 | `order-*` | 失败→primary/contributing cause→IT flag→knowledge→恢复→KPI |

## 本文件结构

| 节 | 回答什么 | 原文件（已合并） |
|---|---|---|
| A | 能力 → 模块 → 页面；缺口与优先级 | `solution/01-module-map.md` |
| B | 五个新思路是否成立、案例、数据要求 | `solution/04-five-initiatives-validation.md` |
| C | 21 页 Workbench 的五个模块与运营步骤 | `solution/05-workbench.md` |

---

## A. 模块 / 页面映射：现有 Demo 有什么、缺什么

<!-- source: 02-functional-architecture/solution/01-module-map.md -->

> 目的：不重写 34 条路由，先把 J1–J10 旅程组合需要的页面补上。
> 现有客户旅程路由来自 [`../03-web-page/client/pages.js`](../03-web-page/client/pages.js)（入口 `client-journey.html`）；`m3-hub` 已包含 MIT/Athens/女性/慈善/搬迁。
> 旅程组合见 [`../01-user-journey/00-journey-catalog.md`](../01-user-journey/00-journey-catalog.md)；S1–S5/X1–X5 是场景实例。

---

### 1. 能力 → 模块 → 页面

| 能力 | 模块 | 现有页面 | 缺口 | 优先级 |
|---|---|---|---|---|
| **C01 家族/法律主体** | Family Cockpit | `m3-family` | 家族图/实体图/UBO/控制权/分支 | P0 |
| **C02 角色/授权/同意** | Family Cockpit | `m3-family` 授权缺口 | Authority graph/consent/POA/LPA/deputy/conflict | P0 |
| **C03 目标/事件/旅程** | Family Cockpit | `m3-family` goals | LifeEvent/Journey/Milestone/Review | P0 |
| **C04 治理/下一代** | NextGen + Governance | `m3-hub` MIT/Athens/女性 | 学习记录/独立账户/首投/创业/家族宪章/ council | P1 |
| **C05 家办** | Family Office | 无独立页 | SFO dashboard/consolidation/IPS/运营/CIB | P1 |
| **C06 投资/顾问** | Proposal/Quant | `m1-*`, `m2-*` | 家族目标/下一代/家办视图 | P1 |
| **C07 交易/托管/账本** | Avaloq | 无（后台） | 不需要新页面；API/数据 | 保留 |
| **C08 流动性/私股** | Founder Desk | `m4-*`, `m3-financing` | IPO lifecycle/capital call/earn-out/obligation/insider | P1 |
| **C09 信托/遗产/保险** | Trust/Estate | `m4-trust` 部分 | Trust/Estate/Probate/Will/Beneficiary/Letter/Insurance | P1 |
| **C10 税务/跨境/监管** | Tax/Cross-border | `m5-*`, `m3-taxlegal` | TaxPack/责任矩阵/行外收入/CRS/FATCA/remediation | P1 |
| **C11 慈善** | Philanthropy | `m3-hub` 慈善入口 | Foundation/Grant/Impact | P2 |
| **C12 服务/生态/渠道** | Service Hub | `m3-hub`, `m3-cases` | Partner/SLA/Referral/Invitation tracking | P1 |
| **X1 证据/AI** | Audit | `audit` | Decision/Evidence/Conflict/as-of | P0 |
| **X2 商业衡量** | Dashboard | 无 | FamilyValue/WalletShare/NextGenActivation | P2 |

---

### 2. 需要新增的页面（最小集）

| 页面 | 能力 | 内容 | 对 Ida 的作用 |
|---|---|---|---|
| **PB-F01 Family Map** | C01 | 家族图/分支/实体/信托/UBO/控制权 | “家族”成为一等对象 |
| **PB-F02 Authority & Consent** | C02 | 角色/授权/范围/生效/失效/辖区/consent/冲突 | 压力旅程的底座 |
| **PB-F03 Goals & Events** | C03 | 教育/创业/搬迁/退出/传承；事件/里程碑 | 阳光旅程 |
| **PB-N01 NextGen Home** | C04 | MIT/Athens/学习/导师/独立账户/首投/创业 | “下一代”独立客户 |
| **PB-N02 Family Governance** | C04 | 宪章/ council/会议/接班/冲突 | 家族治理 |
| **PB-O01 Family Office Dashboard** | C05 | 合并/IPS/风险/成本/CIB/Access | 家办 operating model |
| **PB-P01 Private Asset Lifecycle** | C08 | 估值/质押/义务/追索/退出/insider | Pre-IPO 生命周期 |
| **PB-T01 Trust & Estate** | C09 | trust/estate/probate/will/beneficiary/letter | TFS 数字化 |
| **PB-X01 Tax Data Pack** | C10 | 身份/实体/收入/成本/预扣/CRS/FATCA/顾问 | 替代“代客报税” |
| **RM Tax Guide** | C10 | `m3-taxlegal` 第三 tab：能说/不能说、六问、数据包、场景卡、Approved Accountant Panel | RM 给事实/边界/转介，不给税务意见 |
| **J2/J3/J4 Blueprints** | C01/C02/C03/C08/C12 | `m3-journeys`：创始人/创作者/女性一页 blueprint + 跳转 | 让旅程组合可演示/可评审 |
| **Private Asset Lifecycle** | C08/C10/X1 | `m4-private-assets`：Asset Intake / Valuation Governance / Pledge & Credit / Capital Calls / Earn-Outs / Obligation Calendar | J2 的深挖页面；native English fields |
| **Family Office Dashboard** | C05/C06/C09/C12 | `m3-family-office`：合并/IPS/服务/治理 | J6 的 P0 看板 |
| **PB-E01 Evidence & Decisions** | X1 | 事件/证据/决策/冲突/审计/as-of | 信任证明 |
| **PB-C01 Family Value** | X2 | 收入/钱包/下一代/留存/转介 | 长期回报 |

> 现有 `m3-family` 可以升级为 PB-F01/02/03；`m3-hub` 升级为 PB-N01；`m4-trust` 扩展为 PB-T01；`m5-*` 改造为 PB-X01。

---

### 3. 现有页面的改造

| 现有 | 改造 | 原因 |
|---|---|---|
| `m3-family` | 加 Family Map/Authority/Consent/Goals/Events | 家族不是一个人 |
| `m3-hub` | 加 NextGen 学习记录/独立账户/首投/创业；活动后 30/90 天 | 课程不是终点 |
| `m4-founder` | 加 IPO lifecycle/capital call/earn-out/insider window | 私股不是贷款 |
| `m4-trust` | 加 Trust/Estate/Probate/Beneficiary/Letter | 信托/遗产分开 |
| `m5-*` | 从“税务优化”改为“tax data pack + 责任矩阵 + 顾问” | 不越界/不夸张 |
| `m3-cases` | 加 X1/X2/X3/X4/X5 case types/authority/evidence | 压力旅程 |
| `client-portal` | 加 family/next-gen/FO 视图；角色/consent | 家族体验 |
| `audit` | 加 Decision/Evidence/Conflict/as-of | 法院/监管级 |

---

### 4. 页面与旅程映射

| 旅程 | 页面 |
|---|---|
| **S1 教育/复利（J1/J7）** | `m3-family` → `m1-*` → `m2-*` → `m4-trust` |
| **S2 二代创业（J1/J3）** | `m3-hub` → `m3-family` → `m3-financing`/M4 |
| **S3 跨境搬迁（J5）** | `m3-cases` → `m3-taxlegal` → `m3-family` |
| **S4 退出（J2）** | `m4-*` → `m5-*` → `m3-family` |
| **S5 家办（J1/J6）** | PB-O01 → `m2-*` → `m4-trust` → PB-N02 |
| **X1 失能（J8）** | PB-F02 → PB-E01 → `m3-cases` |
| **X2 身故（J8）** | PB-T01 → PB-E01 → `m3-cases` |
| **X3 离婚/监狱/制裁（J8）** | PB-F01/02 → PB-E01 → `audit` |
| **X4 税务补救（J8）** | PB-X01 → PB-E01 → `audit` |
| **X5 欺诈（J8）** | `m3-cases` → `audit` → 风控页 |

---

### 5. 不做什么页面

- 不做“通用 AI 聊天”首页；
- 不做“生活方式商城”；
- 不做“客户看不到价值”的活动页；
- 不做“绕过授权/ probate/制裁”的快捷按钮；
- 不做“收益承诺/税务隐身”的页面。

---

### 6. 交付顺序

| 阶段 | 页面 |
|---|---|
| **P1** | PB-F01/02/03、PB-N01、PB-E01、`m3-family` 升级 |
| **P2** | PB-O01、PB-P01、PB-T01、PB-X01 |
| **P3** | X1–X5、PB-C01、`audit` 升级 |
| **P4** | 规模化/多语言/多辖区 |

---

## B. 五个新思路的验证与数据要求

<!-- source: 02-functional-architecture/solution/04-five-initiatives-validation.md -->

> 目的：先判断这五个思路是否成立、哪些有真实案例支撑、需要什么数据才能证明，再决定页面怎么建。
> 原则：公开案例只引用公开事实；不主张任何人是 HSBC 客户；银行数据为演示/待内部校准。
> 结论：五个思路都成立，但优先级、合规边界和“能证明什么”不同。

---

### 一、总体判断

| 思路 | 判断 | 优先级 | 最大风险 |
|---|---|---|---|
| **1. CIB 辅导 IPO + PB 承接高管/创始人** | 成立，且是 HSBC 的独特优势；但“把高管一窝端”必须改成“基于客户同意的协同承接” | **P0** | 信息隔离、利益冲突、不得捆绑销售、不得使用重大非公开信息 |
| **2. 从 use case 到数据：身故 1 年后家族资金如何** | 成立，是私行最缺的“结果数据”；但需要客户/受益人授权与长期追踪 | **P0** | 隐私、受益人数据、跨境数据、不要把“资金流向”做成监控 |
| **3. 产品组合模板 + 二代/妻子首次投资 + 更大权限** | 成立，是规模化和代际激活的关键；但不能用“模板”替代适当性 | **P1** | 适当性、风险承受、未成年人/监护人、权限滥用 |
| **4. PB 经营 dashboard：AUM → revenue → client commission → margin** | 成立，但“实时”要考虑收入确认、权责发生、内部转移定价 | **P0 使能** | 财务口径、成本分摊、RM 激励扭曲 |
| **5. 失败交易比例 + RM KPI + 客户信任** | 成立，且是最容易量化的信任指标；但必须区分“可控/不可控”失败 | **P0 使能** | 市场/系统/合规原因混合、KPI 误伤、客户沟通 |

---

### 二、思路 1：CIB 辅导 IPO，PB 承接高管与创始人

#### 2.1 真实案例

- **梁文锋 / DeepSeek**：未上市，媒体与富豪榜估计数百亿美元；股权集中、锁定期、转让限制、控制权。IPO/融资事件会把“公司银行关系”瞬间变成“创始人个人财富事件”。
- **周群飞 / 蓝思科技**：深圳与香港两地上市；同一经济权益、两个登记系统；创始人/高管在 A/H 两地都有持股、披露、窗口期、质押和税务问题。
- **李西廷 / 迈瑞医疗**：纽约上市、退市、深圳上市、申请香港 H 股；四个证券制度、二十年历史；高管/创始人的财富跨制度、跨辖区。
- **HSBC 自身**：HSBC Access 连接创新经济；HSBC Innovation Banking 覆盖全球创新 hub；HSBC 有 CIB、MSS、Private Bank、TFS。CIB 做 IPO/资本市场，PB 做个人/家族财富，天然可以协同。

#### 2.2 业务逻辑

IPO/资本市场事件会同时产生：

- 创始人/高管的 **股权流动性**；
- **锁定期/窗口期/披露**；
- **税**（资本利得、股权激励、跨境）；
- **信托/家办/下一代**；
- **质押/信贷/外汇/托管**；
- **员工/管理层激励**。

CIB 有企业关系、交易信息、资本市场能力；PB 有个人/家族关系、信托、投资、信贷。两者协同，可以把“一次性 IPO 收入”变成“长期家族关系”。

#### 2.3 合规边界

“把高管一窝端到 PB”不能按字面执行。正确表述是：

> **在客户明确同意、信息隔离墙允许、且不利用重大非公开信息的前提下，CIB 向 PB 做合规引荐；PB 独立完成 KYC、适当性、税务与家族需求评估。**

必须做到：

- 不共享 MNPI；
- 不把 IPO 承销与 PB 产品捆绑；
- 不向未同意的高管推销；
- 不利用企业客户信息做个人营销；
- 高管/创始人可拒绝、可只使用部分服务；
- 跨境数据/税务/制裁逐案审查。

#### 2.4 需要的数据

| 数据 | 用途 |
|---|---|
| IPO/增发/老股/并购 pipeline | 识别财富事件 |
| 公司、交易所、行业、预计时间、承销角色 | 判断 CIB 关系与事件窗口 |
| 管理层/创始人持股、期权、锁定期、转让限制 | 估算财富与流动性 |
| 个人/家族 PB 关系、现有钱包份额 | 判断协同空间 |
| 客户 consent/拒绝记录 | 合规引荐 |
| 估值方法/折扣/委员会 | Pre-IPO 估值 |
| 交叉销售转化、收入、留存 | 证明协同有效 |

#### 2.5 需要的页面

1. **IPO & Wealth Event Pipeline**：CIB 事件、公司、管理层、预计时间、PB 状态。
2. **Company & Management Profile**：股权、期权、锁定期、跨境、家族结构。
3. **Pre-IPO Valuation**：方法、可比、DCF、折扣、估值区间、委员会。
4. **CIB→PB Handoff**：consent、KYC 复用、PB 团队、任务、证据。

---

### 三、思路 2：身故 1 年后，家族资金如何

#### 3.1 真实案例

- **Tam Mei Kam / 梅艳芳遗产**：2003 年去世；遗嘱/信托争议持续 20 年；母亲每月生活费、侄辈教育金、剩余慈善；2024 年母亲去世后仍有葬礼/遗产争议。说明“身故不是时点，是多年现金流”。
- **FOS DRN-4737924**：grant of probate 2023-08-16；executor 2023-08-21 登记；2023-08-31 放款；次日关户；HSBC 指引最长 15 个工作日，本案 10 天。说明“时间”可以测量。
- **Tao Soh Ngun / Kan Lai Kwan**：信托/意愿书/控制权争议，说明“钱有没有到受益人”不等于“事情结束”。

#### 3.2 业务逻辑

大多数银行只记录“案件关闭”，不记录“家族 1 年后怎么样”。需要把 use case 变成结果数据：

- 死亡后 0–30 天：通知、授权、冻结、funeral/紧急支付；
- 30–180 天：probate/estate account/资产释放；
- 6–12 个月：债务/税/分配/信托继续；
- 12 个月后：受益人资金、家族关系、投诉、流失、二次服务。

#### 3.3 需要的数据

| 数据 | 用途 |
|---|---|
| 死亡日期、通知日期、grant 日期 | 时间线 |
| 资产/负债/税/费用 | 遗产规模与缺口 |
| 受益人/依赖人/信托 | 分配与争议 |
| 每笔支付/分配/关闭 | 资金流 |
| 法律/专业费用 | 成本 |
| 12 个月后的受益人账户/留存/投诉 | 结果 |
| consent/隐私 | 合法追踪 |

#### 3.4 需要的页面

1. **Estate Case Portfolio**：案件、天数、资产、分配、法律成本、状态。
2. **Estate Case Timeline**：死亡→POA 终止→executor→probate→estate account→分配→关闭。
3. **Authority & Probate**：POA/executor/跨境/法院命令。
4. **12-Month Outcomes**：资金流、分配率、时间、成本、受益人留存/投诉。

---

### 四、思路 3：产品组合模板 + 二代/妻子首次投资 + 更大权限

#### 4.1 真实案例

- **Nadiya Hussain**：版税/电视/三个孩子/没有信托；教育金、监护、家庭现金流是核心。
- **Ali Abdaal**：UK→HK、创作者收入、多条收入流、两套税制。
- **HSBC 女性财富报告**：未来五年约 40% 全球可投资财富由女性控制（约 US$113tn）；女性更关注退休、子女教育、慈善；女性创业者少 6 个百分点有导师。
- **HSBC MIT/Athens**：下一代 23–30 岁课程；课程后需要“第一次投资/独立账户/导师”，否则课程停在活动。

#### 4.2 业务逻辑

新客户/二代/配偶需要的不是“完整 UHNW 平台”，而是：

- 低门槛的 **组合模板**（保本/收益/平衡/增长/流动性/ESG）；
- 清晰的 **适当性/风险/费用**；
- 第一次投资的 **小额定投/基金/债券阶梯**；
- 家族成员的 **角色/consent/权限**；
- 课程/导师/反馈的 **闭环**。

#### 4.3 合规边界

- 模板不等于适当性；每个客户仍要做风险/知识/能力/期限评估；
- 未成年人/监护人/授权要单独处理；
- 配偶/子女的权限来自本人 consent/法律授权，不是“家长说了算”；
- 不承诺收益；模板要披露费用/风险/历史不是未来。

#### 4.4 需要的数据

| 数据 | 用途 |
|---|---|
| 客户/家庭成员/角色/consent | 权限 |
| 风险承受/能力/知识/期限/流动性 | 适当性 |
| 模板/产品/费用/最低认购 | 组合 |
| 首次投资金额/产品/日期 | 转化 |
| 课程/导师/学习记录 | 下一代激活 |
| 投诉/退出/NPS | 效果 |

#### 4.5 需要的页面

1. **Family Onboarding**：人/角色/consent/目标。
2. **Suitability & Risk**：风险/知识/能力/期限。
3. **Portfolio Templates**：保本/收益/平衡/增长/流动性/ESG。
4. **First Investment**：小额、模板、适当性、下单、确认、教育。

#### 4.6 RM 客户数量基准（为什么 35–51 是合理的）

公开基准：

- Accenture 2025：富裕客群 RM 常常管理 200+ 客户；私人银行 RM 通常服务 **50–70 位客户**。
- Goldman Sachs Private Wealth Management：**1:25** advisor-to-client ratio。
- Asian Private Banker 2025：平均每位 RM 的 AUM 约 **US$473m**。

因此：

- **35–51 位“关系”** 对私人银行是合理的，尤其是混合 HNW/UHNW book；
- **51 位** 属于偏高，通常需要团队/助理支持；
- 如果全是 UHNW 家族，**15–25 个家族**更常见；
- “客户数”必须区分 **relationships / households / legal entities / accounts**；一个家族可以有多个实体、账户和受益人。

Workbench 的 RM Scorecard 已改为同时显示 `relationships`、`households`、`AUM`，避免把“42 个关系”误读为“42 个独立富豪”。

并新增三个可校准字段：

- `support_ratio`：每个 RM 配多少助理/产品专家（support FTE per RM）；
- `segment_mix`：UHNW / HNW / family office 的占比；
- `service_intensity`：每个关系的年度会议、交易、信托/遗产案件、信贷额度工作量。

Workbench 用一个“workload index”把它们合成可解释指标：

> `relationships × (0.30 + meetings/20 + trades/50 + trust cases/30 + credit facilities/40) ÷ support_ratio`

阈值：低于 45 为 underloaded，45–65 为 balanced，65–85 为 watch，高于 85 为 overloaded。该公式是演示校准模型，不是 HR 政策；真实值必须用时间研究/内部产能基线替换。

---

### 五、思路 4：PB 经营 dashboard：AUM → revenue → client commission → margin

#### 5.1 业务逻辑

AUM 是规模，不是收入；客户贡献的收入也不只是“佣金”：

- **AUM**（客户资产规模，不是收入）；
- **收入**：顾问费/管理费；
- 托管费；
- **客户佣金**：交易/经纪，是收入的一行，不是毛利；
- 外汇点差；
- 贷款利差；
- 结构化产品/私募；
- 信托/税务/家办服务；
- 交叉销售。

“客户佣金 = PB 毛利”是错误等式；需要明确的是：

> **客户收入 − 直接服务成本 − 资金/风险成本 − 分摊成本 = 客户毛利。**

dashboard 要区分：

- **已实现收入**（已入账）；
- **应计收入**（权责发生）；
- **预测收入**（pipeline）；
- **成本**（RM 时间、ops、legal、tech、资金成本）；
- **风险调整**（资本/信用/流动性）。

#### 5.2 需要的数据

| 数据 | 用途 |
|---|---|
| 客户/产品/RM/实体 | 收入归属 |
| 费用类型/费率/期间 | 收入 |
| 成本（RM/ops/legal/tech/资金） | 毛利 |
| AUM/AUA/贷款/交易量 | 驱动 |
| 预算/预测 | 对比 |
| 收入确认/应计 | 实时口径 |

#### 5.3 需要的页面

1. **PB Operating Dashboard**：AUM、收入、客户佣金、毛利、净利、成本收入比、公式与趋势。
2. **Client P&L**：客户收入/成本/毛利/钱包份额。
3. **Product P&L**：产品收入/成本/毛利。
4. **RM Scorecard**：RM 收入/毛利/客户/成本/KPI。

---

### 六、思路 5：失败交易归因、知识沉淀与客户信任

#### 6.1 业务逻辑

一笔订单从创建到结算，可能失败在：

- 市场关闭/节假日；
- 标的不存在/停牌；
- 限价/流动性；
- 资金不足；
- 合规/适当性；
- 系统/网络；
- 对手方/结算。

客户感知是“RM 答应了但没做成”；RM KPI 如果只看成交，会被不可控失败误伤。每笔失败交易要记录：

- **primary cause**（主因）；
- **contributing cause**（次因）；
- **owner / evidence**（谁负责、依据什么）；
- **IT/system flag**（单独标记、可检索、可修，不记在 RM 头上）；
- **RM knowledge card**（发生了什么、为什么、下次检查什么、怎么跟客户说）。

这样可以区分 **可控失败**、**外部失败**、**IT/system 失败** 和 **可恢复失败**，并把每一次失败变成可复用的检查清单。

#### 6.2 需要的数据

| 数据 | 用途 |
|---|---|
| 订单/客户/RM/市场/产品 | 归属 |
| 订单状态/primary cause/contributing cause/时间 | 失败率与归因 |
| 市场日历/交易时段 | 预防 |
| IT/system incident ID / 路由 / 延迟 | 归因，不误伤 RM |
| 客户沟通/补偿/knowledge card | 信任与学习 |
| 成交/TCA | 质量 |
| RM KPI | 激励 |

#### 6.3 需要的页面

1. **Order Monitor**：实时订单、失败率、reason、attribution、市场/系统状态。
2. **Failure Detail**：primary/contributing cause、owner、evidence、客户影响、IT flag、knowledge card。
3. **Recovery Workflow**：沟通、重下单、补偿、根因、证据。
4. **Failure Attribution & Learning**：归因 taxonomy、失败率、repeat causes、RM/客户影响、信任指标。

---

### 七、五个思路与原 J1–J10 的整合

| 新思路 | 对应旅程 | 新增能力 |
|---|---|---|
| CIB IPO + PB | J2 创始人 + J6 家办 | IPO pipeline、pre-IPO valuation、CIB→PB handoff |
| 身故 1 年数据 | J8 信任 | estate outcome tracking、12-month cohort |
| 产品模板/首次投资 | J1/J4/J7 | onboarding、suitability、templates、first investment |
| 客户毛利/收入大屏 | J9 RM + J6 家办 | client P&L、revenue cockpit、RM scorecard |
| 失败交易/RM KPI | J9 RM + J8 信任 | order monitoring、failure reasons、recovery |

---

### 八、数据采集清单（优先级）

#### P0：先采

1. IPO/并购/老股 pipeline、管理层持股、锁定期、PB 关系；
2. 身故案件时间线、资产/分配/费用、12 个月受益人结果；
3. 客户/产品/RM 收入、直接成本、资金成本、分摊成本；
4. 订单状态、失败原因码、市场日历、系统 incident；
5. 客户 consent/权限/适当性。

#### P1：再采

1. 课程/导师/下一代激活；
2. 组合模板使用/首次投资转化；
3. 客户投诉/NPS/留存；
4. 跨境数据/税务/信托。

#### P2：长期

1. 家族钱包份额；
2. 家办 AUA/服务渗透；
3. 失败交易与客户信任的因果；
4. 收入与留存的长期关系。

---

### 九、结论

这五个思路不是“五个孤立功能”，而是同一条主线：

> **用真实事件（IPO/身故/首次投资/收入/失败交易）驱动数据，再用数据证明服务有效，最后把结果反馈到 RM、产品、权限和 KPI。**

优先级：

1. **CIB IPO→PB**（收入/差异化）
2. **身故 12 个月结果**（信任/证据）
3. **失败交易与 RM KPI**（可量化/快速见效）
4. **客户毛利/收入大屏**（经营）
5. **组合模板/首次投资**（规模化/下一代）

---

### 十、来源

- HSBC Access、HSBC Innovation Banking、HSBC TFS 80 年、HSBC 2025 年报、HSBC 女性财富报告、HSBC MIT/Athens。
- Citi Private Capital Group、UBS GFO 2025、SCB The Great Repositioning。
- Tam Mei Kam、Tao Soh Ngun、Kan Lai Kwan、Tan Poh Lee 判例；FOS DRN-4737924。
- 公开人物：梁文锋、周群飞、李西廷、Guy Singh-Watson、Sarah Wood、Neame、Nadiya Hussain、Ali Abdaal。
- Avaloq 源码审计：`DOC_STEX`、`DOC_SETTLE`、`BALSTRU_CALC#MV`、`TAX2_EVT`、`COLLAT_LOT_DISTR#CMPL`、`LIHI`。

---

## C. Operating Workbench：五个业务问题的 21 页

<!-- source: 02-functional-architecture/solution/05-workbench.md -->

> 目的：把“五个新思路”从观点变成可点击的业务步骤、字段、状态和指标。
> 位置：[`../03-web-page/rm-workbench.html`](../03-web-page/rm-workbench.html)；与客户旅程入口 [`../03-web-page/client-journey.html`](../03-web-page/client-journey.html) 分开：一个讲客户故事，一个做运营流程。
> 数据：公开案例只作结构参考；银行数字为演示；每页有 Data note。

---

### 1. 运行

```bash
cd meridian-pb
python3 -m http.server 8791
# http://localhost:8791/03-web-page/rm-workbench.html
```

校验：

```bash
cd 03-web-page/workbench
node check.js
# OK — 21 pages rendered, balanced div stacks, 21 bilingual speaker scripts, RM capacity fields valid, 5 client P&Ls reconciled, order/estate facts coherent.
```

每一页右上角有 **Speaker notes**，可打开中英文台词、屏幕动作和转场。离线版：[`../03-web-page/workbench/SPEAKER_NOTES.md`](../03-web-page/workbench/SPEAKER_NOTES.md)；源数据：[`../03-web-page/workbench/scripts.js`](../03-web-page/workbench/scripts.js)。

---

### 2. 五个模块

| 模块 | 页面 | 证明什么 |
|---|---|---|
| **1 · IPO & PB** | IPO & Wealth Event Pipeline · Company & Management · Pre-IPO Valuation · CIB → PB Handoff | CIB/MSS 识别财富事件；PB 在 consent/wall/KYC 后承接 |
| **2 · Estate & Continuity** | Estate Case Portfolio · Estate Case Timeline · Authority & Probate · 12-Month Outcomes | 身故是多年流程；授权、probate、资金和结果可测量 |
| **3 · Family Onboarding** | Family Onboarding · Suitability & Risk · Portfolio Templates · First Investment | 二代/配偶低门槛 onboarding，但不绕过适当性 |
| **4 · Revenue & Margin** | PB Operating Dashboard · Client P&L · Product P&L · RM Scorecard | AUM→收入→客户佣金→毛利/净利/CIR；公式与 RM 产能一起看 |
| **5 · Order Trust** | Order Monitor · Failure Detail · Recovery Workflow · Failure Attribution & Learning | 失败归因（primary/contributing/owner/evidence）；IT/system 单列；RM knowledge card |

---

### 3. 数据来源与边界

- 公开案例（仅作结构参考，as of 2026-10-26）：DeepSeek 2026 融资轮、Mindray/李西廷、Lens/周群飞、Riverford EOT、Unruly、梅艳芳遗产信托（2026-08-30 闭环）、FOS DRN-4737924、Lo 家族信托 / Tao Soh Ngun [2019] HKCFI 1268。
- 命名政策：公众人物只出现在"公开案例"叙述里；账户级记录（订单、onboarding、客户 P&L）一律使用虚构演示家族（He family、UK creator family、AI founder family、Ashworth family）。
- 银行数字（收入、成本、订单、失败率、estate cohort）为演示数据，需内部财务/运营校准。
- 不主张任何公开人物是 HSBC 客户；不使用非公开客户数据。
- 每页 Data note 写清“哪些需要内部数据、哪些需要 consent、哪些只是演示”。

---

### 4. 与客户旅程入口的关系

| | `client-journey.html` | `rm-workbench.html` |
|---|---|---|
| 目的 | 客户旅程叙事、页面原型 | 运营步骤、字段、状态、指标 |
| 用户 | 客户/领导 | RM/COO/Finance/Operations/Compliance |
| 内容 | 教育/复利/二代/退出/信托/税务 | IPO→PB、estate 12 个月、onboarding、毛利、失败交易 |
| 数据 | 演示人物/金额 | 公开案例 + 演示银行数据 |

两者共用同一套设计输入，不互相替代；都放在 [`03-web-page/`](../03-web-page/README.md)。

---
