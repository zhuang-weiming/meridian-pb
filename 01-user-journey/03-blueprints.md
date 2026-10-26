# 03 — Blueprints：J2 / J3 / J4 / J6 / J8 一页蓝图

> 本文件是 J2 / J3 / J4 / J6 / J8 的**一页蓝图**，统一回答：客户与触发、核心 Job、好结果、阶段、关键时刻、对象、指标、边界。
> J1 / J5 / J7 的“为什么独立/赢点/缺口”见 [`00-journey-catalog.md`](00-journey-catalog.md)；
> J2 的真实案例、同业方案、改造前后流程与四页设计见 [`04-j2-deep-dive.md`](04-j2-deep-dive.md)。

## 五条蓝图一览

| ID | 客户单位 / persona | 入口事件 | 核心 Job | 好结果 | 关键对象 | 主要页面 |
|---|---|---|---|---|---|---|
| **J2** | 创始人/企业家 | 融资、IPO、lock-up 到期、卖公司、老股、capital call | 不卖控制权也能拿到流动性；卖/押/信托/税后怎么选 | 流动性、税后分散、控制权、信托/家办、下一代 | `PrivateAsset`/`Valuation`/`Pledge`/`CreditFacility`/`Obligation`/`TaxPack` | `m4-founder`、`m4-valuation`、`m4-pledge`、`m4-private-assets`、`ipo-*` |
| **J3** | 创作者/艺人/运动员/IP 持有者 | 合约、巡演、出版、代言、版税、退役/转型 | 把短收入窗口 + IP/版税变成长期资产负债表 | 收入平滑、IP 保护、税/保险/投资、转型、传承 | `IPAsset`/`RoyaltyStream`/`Contract`/`ImageRight`/`IncomeStream`/`Policy` | `m3-hub`、`m1-*`、`m2-*`、`onboarding-*` |
| **J4** | 配偶/寡妇/女创始人/继承女性 | 继承、离婚、丧偶、创业、首次财富、子女教育 | 从“别人帮我决定”到“我能决定”，保护自己/孩子 | 信心/控制、独立账户/consent、家庭保护、下一代 | `Role`/`Consent`/`Goal`/`LearningRecord`/`Account`/`Authority` | `m3-family`、`m3-hub`、`onboarding-*`、`m1-proposal` |
| **J6** | SFO/MFO 的 CEO/CIO/COO；家族理事会 | 企业退出、继承、下一代接班、家办专业化、跨境 | 从多个账户/顾问变成合并、治理、投资、运营、传承 | 合并报表、IPS、风险/信贷/信托/税务/CIB、治理 | `FamilyOffice`/`ConsolidatedView`/`InvestmentPolicy`/`FOReport` | `m3-family-office`、`m3-family`、`revenue-*` |
| **J8** | 任何 J1–J7 客户/家族 | 失能、身故、离婚、制裁、欺诈、税务调查 | 谁现在有权、哪些钱能付/不能付、依据什么、谁做、证据在哪 | 合法、及时、可证据；0 无权支付/越权披露；关系守住 | `Event`/`Authority`/`AuthorityScope`/`Estate`/`Trust`/`Evidence` | `estate-*`、`m3-cases`、`m4-trust`、`order-*` |

> **读法：** 先看每一节 §1–§3（客户与触发、五/六阶段、关键时刻），再看 §4（系统与对象）、§5（指标）、§6（边界）。J2 的深度案例另看 `04-j2-deep-dive.md`。

---

## A. J2 创始人财富事件

<!-- source: 01-user-journey/04-blueprints/05-j2-founder.md -->

> 定位：P0 客户旅程。把“纸面财富”变成“可花、可押、可传、可控”的家族财富。
> 案例锚点：梁文锋、周群飞、李西廷、Guy Singh-Watson、Sarah Wood、Neame。
> 对标：Citi Private Capital / HSBC Access & Innovation Banking / UBS financing。
> 人物/金额为设计假设；不构成投资/税务/法律建议。

---

### 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 创始人/企业家；股权集中；公司未上市/刚上市；可能有 lock-up、ROFR、board consent |
| **触发** | 融资轮、IPO 受理、lock-up 到期、卖公司、老股转让、capital call、个人流动性需求 |
| **核心 Job** | “不卖控制权也能拿到流动性；卖/押/信托/家办/税后，怎么选？” |
| **好结果** | 流动性、税后分散、控制权、信托/家办、下一代；不因一次退出失去家族财富 |

---

### 2. 五阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 财富地图** | 我到底有多少“纸面/可质押/可花费”？ | 三层财富、集中度、现金流、义务 | `PrivateAsset`/`Concentration`/`LiquidityPlan` |
| **2. 估值与结构** | 值多少、凭什么、怎么押/卖？ | 估值治理、LTV/折扣、质押/信托/税结构 | `Valuation`/`ValuationGovernance`/`Pledge` |
| **3. 流动性** | 不卖股怎么拿钱？ | Lombard/私股质押/资本调用贷款/forward/secondary | `CreditFacility`/`Covenant`/`ExitScenario` |
| **4. 税与传承** | 卖了/押了/信托后税怎么算？ | tax data pack、信托/遗产、跨境 | `TaxPack`/`Trust`/`Estate` |
| **5. 家办/再投资** | 钱怎么变成长期家族财富？ | 家办、投资政策、下一代、慈善 | `FamilyOffice`/`IPS`/`NextGenPlan` |

---

### 3. 关键时刻（必须设计）

1. **融资轮**：cap table、投资人权利、员工期权、估值。
2. **Pre-IPO**：lock-up、静默期、insider/trading window、质押可行性。
3. **IPO/锁定期到期**：卖/押/forward/secondary、税、控制权。
4. **卖公司/老股**：earn-out、vendor loan、escrow、税、信托。
5. **资本调用/义务**：PE/VC capital call、earn-out、跨期现金流。
6. **家族传承**：信托/家办/下一代；控制权 vs 受益权。

---

### 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/持仓/交易/支付/信贷余额 | 自研新核心（参考 Avaloq 能力） |
| 标准信贷/抵押/额度/追保 | 自研新核心（参考 Avaloq 能力） |
| 私股估值治理/质押/义务/退出 | **新建** |
| 税包/预扣/CRS/FATCA | Avaloq TAX2 + 新核心 tax pack |
| 信托/遗产/保险 | TFS/合作 + 新核心 |
| 估值/法律/投行执行 | 合作/CIB |

**关键对象：** `PrivateAsset`、`Valuation`、`ValuationGovernance`、`Pledge`、`CreditFacility`、`Covenant`、`Obligation`、`ExitScenario`、`TaxPack`、`Trust`、`FamilyOffice`。

---

### 5. 指标

- 3 天形成“可决策包”（不是 3 天批贷）；
- 估值复核及时率、质押登记完成率；
- 追保准确率/通知及时率；
- 义务日历覆盖 100%；
- 税后财富/控制权保留；
- 家办/信托渗透；
- 创始人 NPS/留存。

---

### 6. 负向需求

- 不承诺 IPO 价格/时间；
- 不协助 insider trading/绕过窗口；
- 不把纸面估值当市值；
- 不做未登记/不可执行的质押；
- 不隐瞒追保/集中度/锁定期；
- 不替代法律/税务/估值意见；
- 不把“质押”说成“免税”。

---

### 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m4-founder` | 持股/事件雷达/三层财富 |
| `m4-valuation` | 估值/LTV/40% 触发/委员会 |
| `m4-pledge` | 押 vs 卖/税后/下行 |
| `m4-trust` | 信托/预算/税务台账 |
| `m3-financing` | 融资驾驶舱/额度/追保 |
| `m5-*` | 税务数据包/情景（边界） |
| `m4-private-assets` | Asset Intake / Valuation Governance / Pledge & Credit / Capital Calls / Earn-Outs / Obligation Calendar（native English fields） |
| 新增 `m3-journeys` | J2 一页 blueprint + 跳转 |

---

### 8. 案例与对标

- **梁文锋**：Pre-IPO、纸面财富、lock-up、质押/流动性。
- **周群飞**：A+H 双登记、控制权、减持/披露。
- **李西廷**：四个证券制度、二十年历史、退市不等于消失。
- **Guy Singh-Watson**：EOT、卖方贷款、分期流动性。
- **Sarah Wood**：earn-out、留任、headline ≠ 到账。
- **Neame**：薄市场、控制权重、流动性轻。

**对标：** Citi Private Capital（1,400/77 国、capital call、concentrated stock、art/aircraft）；HSBC Access/Innovation Banking；UBS Lombard/structured/concentrated stock。

---

### 9. 边界

- 不是“贷款产品”，是“私有资产生命周期”。
- 不承诺估值/融资/退出；估值/信贷/法律逐案审批。
- 客户/金额为设计假设；公开人物只引用公开事实。

---

## B. J3 创作者 / 媒体 / 体育

<!-- source: 01-user-journey/04-blueprints/06-j3-creator.md -->

> 定位：P1 客户旅程；垂直增量。把“短收入窗口 + IP/版税”变成“长期资产负债表”。
> 案例锚点：Ali Abdaal、Nadiya Hussain、Jamie Vardy、Alvin Leung、Hawker Chan。
> 对标：Ida 的 Citi fashion/retail/entertainment 垂直；HSBC Sports, Media & Entertainment；SCB `Celebrating Life's Work`。
> 人物/金额为设计假设；不构成投资/税务/法律建议。

---

### 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 创作者、艺人、运动员、媒体/时尚/零售企业家、IP 持有者 |
| **触发** | 合约、巡演、出版、品牌代言、股权/版税、退役/转型 |
| **核心 Job** | “收入波动大、职业窗口短；怎么把今天的钱变成未来 30 年的资产负债表？” |
| **好结果** | 收入平滑、IP 保护、税/保险/投资、职业转型、家庭传承 |

---

### 2. 五阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 职业/IP 盘点** | 我有哪些收入/IP/合约？ | 收入流、版权/商标/形象权、合约期限 | `IP`/`Royalty`/`Contract` |
| **2. 收入地图** | 钱从哪来、什么时候来、税在哪？ | 多来源收入、预扣/税、币种/辖区 | `IncomeStream`/`TaxProfile` |
| **3. 现金流/保障** | 收入断了怎么办？ | 储备金、保险、预算、债务 | `CashflowPlan`/`Policy`/`Reserve` |
| **4. 多元化** | 怎么把短期收入变长期资产？ | 组合、房产、私股、信托、慈善 | `Portfolio`/`Trust`/`Foundation` |
| **5. 转型/传承** | 退役/转型后做什么？ | 创业/投资/慈善、下一代、遗产 | `NextGenPlan`/`Estate`/`Philanthropy` |

---

### 3. 关键时刻

1. **合约/续约**：独家/期限/地域/分成/终止。
2. **峰值收入**：巡演/代言/出版/品牌；税/现金流/保险。
3. **收入中断**：伤病/争议/平台变化/退役。
4. **IP 变现**：版权/商标/形象权/联名/授权。
5. **转型**：创业/投资/媒体/慈善。
6. **家庭/传承**：配偶/子女/教育/信托。

---

### 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/支付/外汇/组合 | 自研新核心（参考 Avaloq 能力） |
| IP/版税/合约/形象权 | **新建** |
| 收入流/税包/预扣 | 自研新核心 |
| 保险/储备/现金流 | 新核心 + 合作 |
| 信托/遗产/慈善 | TFS/合作 + 新核心 |
| 品牌/娱乐/体育生态 | 合作/HSBC 垂直团队 |

**关键对象：** `IPAsset`、`RoyaltyStream`、`Contract`、`ImageRight`、`IncomeStream`、`CashflowPlan`、`Policy`、`Reserve`、`Portfolio`、`Trust`。

---

### 5. 指标

- 收入波动/ runway（月）；
- IP 注册/续约/侵权处理；
- 税包/预扣准确；
- 储备金/保险覆盖；
- 长期资产/退休金；
- 转型成功率/客户留存；
- 垂直 NPS。

---

### 6. 负向需求

- 不做“明星生活方式”营销；
- 不未经 consent 使用姓名/肖像/IP；
- 不承诺收入/代言/比赛；
- 不替代经纪/律师/税务；
- 不把短期收入当永久收入；
- 不忽略伤病/退役/家庭。

---

### 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m3-hub` | 创作者/体育/媒体服务与邀请（MIT/Athens/导师/慈善） |
| `m3-family` | 家庭/目标/授权（教育/信托/下一代） |
| `m1-*` | 收入→组合/提案/执行 |
| `m3-taxlegal` | 税务数据包/预扣/顾问 |
| 新增 `m3-journeys` | J3 一页 blueprint + 跳转 |

---

### 8. 案例与对标

- **Ali Abdaal**：UK→HK、YouTube/课程/书/App、三条收入、两套税制。
- **Nadiya Hussain**：版税/电视/三个孩子/没有信托；教育金/监护。
- **Jamie Vardy**：十年收入撑五十年；形象权/非现金股权；媒体估计 £37m。
- **Alvin Leung**：餐饮多实体/个人担保/品牌。
- **Hawker Chan**：档口/品牌/加盟/跨境继承。

**对标：** Ida 在 Citi 的 fashion/retail/entertainment 垂直；HSBC Sports, Media & Entertainment；SCB 的客户故事系列。

---

### 9. 边界

- 不是“更小的 UHNW”；收入/IP/保险/职业周期不同。
- 经纪/律师/税务/保险由专业伙伴；银行做账户/数据/协调/证据。
- 公开人物只引用公开事实；金额为媒体估计/设计假设。

---

## C. J4 女性与财富

<!-- source: 01-user-journey/04-blueprints/07-j4-women.md -->

> 定位：P1 客户旅程；增量与独立决策。不是“女性版产品”，而是“从附属到独立决策者”的旅程。
> 案例锚点：Nadiya Hussain、Tam Mei Kam（判例）、HSBC Women & Wealth。
> 对标：HSBC Women & Wealth；UBS/Citi/SCB 女性倡议。
> 人物/金额为设计假设；不构成投资/税务/法律建议。

---

### 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 配偶、寡妇、女创始人、继承女性、家庭 CFO |
| **触发** | 继承、离婚、丧偶、创业、首次财富、子女教育 |
| **核心 Job** | “从‘别人帮我决定’到‘我能决定’；保护自己/孩子/家庭。” |
| **好结果** | 信心/控制、独立账户/consent、家庭保护、下一代教育、慈善 |

---

### 2. 五阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 倾听** | 我现在是什么角色？我想要什么？ | 家庭图、角色、决策权、隐私 | `Family`/`Role`/`Consent` |
| **2. 教育** | 这些产品/风险/税是什么？ | 金融教育、风险、费用、税务基础 | `LearningRecord`/`Goal` |
| **3. 独立** | 我能不能有自己的账户/顾问？ | 独立 consent/账户、联合/单独授权 | `Consent`/`Account`/`Authority` |
| **4. 规划** | 教育/退休/传承/慈善怎么安排？ | 目标、组合、保险、信托/遗产 | `Goal`/`Portfolio`/`Trust`/`Estate` |
| **5. 长期** | 家庭/事业/慈善怎么继续？ | 年度 review、下一代、女性社群/导师 | `AnnualReview`/`NextGenPlan`/`Philanthropy` |

---

### 3. 关键时刻

1. **继承/丧偶**：遗嘱/信托/受益权/现金流；避免“被排除”。
2. **离婚**：披露/资产/信托/子女；独立法律/财务。
3. **创业**：融资/担保/股权/导师；女性创始人少 6pp 有导师。
4. **子女教育**：教育金/监护/信托。
5. **慈善**：女性更可能支持慈善（HSBC 报告 +9pp）。

---

### 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/支付/组合 | 自研新核心（参考 Avaloq 能力） |
| 家庭角色/consent/独立授权 | **新建** |
| 教育/目标/年度 review | 新核心 |
| 信托/遗产/保险 | TFS/合作 + 新核心 |
| 女性社群/导师/课程 | 合作/HSBC Women & Wealth |

**关键对象：** `Role`、`Consent`、`Goal`、`LearningRecord`、`Account`、`Authority`、`Portfolio`、`Trust`、`Estate`、`Philanthropy`。

---

### 5. 指标

- 独立账户/独立 consent 比例；
- 金融教育完成/信心评分；
- 目标达成/教育金；
- 留存/钱包份额；
- 下一代教育/慈善参与；
- 女性创始人融资/导师匹配；
- NPS/转介。

---

### 6. 负向需求

- 不做“粉色产品”/“女性版”；
- 不 paternalistic/不替她做决定；
- 不未经 consent 向配偶/家属披露；
- 不把“家庭一致”当授权；
- 不忽略寡妇/离婚/继承的法律风险；
- 不承诺收益/税务结果。

---

### 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m3-family` | 家庭角色/目标/授权缺口 |
| `m3-hub` | 女性/配偶/教育/慈善/导师服务 |
| `m4-trust` | 信托/预算/受益 |
| `client-portal` | 独立视图/教育/目标 |
| 新增 `m3-journeys` | J4 一页 blueprint + 跳转 |

---

### 8. 案例与对标

- **Nadiya Hussain**：版税/电视/三个孩子/没有信托；教育金/监护/独立收入。
- **Tam Mei Kam**：寡妇/遗产/信托/家庭供养；20 年争议；说明“受益人不等于决策人”。
- **HSBC Women & Wealth**：未来五年约 40% 全球可投资财富由女性控制（约 US$113tn）；女性更关注退休/子女教育/慈善；女性创业者少 6pp 有导师。

**对标：** HSBC Women & Wealth；UBS/Citi/SCB 女性倡议；但不要把“女性”做成单一产品线。

---

### 9. 边界

- 女性不是“一个客群”；配偶/寡妇/女创始人/继承人需求不同。
- 法律/税务/信托由专业顾问；银行做教育/账户/协调/证据。
- 公开人物只引用公开事实；金额为设计假设/媒体估计。

---

## D. J6 家族办公室

<!-- source: 01-user-journey/04-blueprints/09-j6-family-office.md -->

> 定位：P0 客户旅程；竞争焦点。家族办公室不是“更富的私人客户”，而是一套独立的运营模式。
> 案例锚点：张勇/舒萍、李嘉诚、Premji、Murdoch。
> 对标：Citi Family Office Advisory（1,800+ 家办）、UBS Global Family Office Report（317 家）、HSBC Global Head of Family Offices、SCB 家族传承。
> 人物/金额为设计假设；不构成投资/税务/法律建议。

---

### 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 单一家族办公室（SFO）/多家族办公室（MFO）；家办 CEO/CIO/COO；家族理事会 |
| **触发** | 企业退出、继承、下一代接班、家办专业化、跨辖区扩张 |
| **核心 Job** | 把家族财富从“多个账户/多个顾问”变成“合并、治理、投资、运营、传承”的机构化能力 |
| **好结果** | 合并报表、投资政策、风险/信贷/信托/税务/慈善/CIB 一体化；家族治理与下一代 ready |

---

### 2. 六阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 评估** | 我们真的需要家办吗？ | 家办画像、成本/收益、服务模式 | `FamilyOffice`/`FOServiceModel` |
| **2. 运营模型** | 谁做什么、怎么收费？ | 组织/人员/预算/供应商/cyber | `FOStaff`/`FOBudget`/`FOVendor` |
| **3. 合并** | 我们到底有多少钱？ | 银行/外部/信托/私股/房产/收藏品合并 | `ConsolidatedView` |
| **4. 投资治理** | 投资政策/风险/流动性怎么定？ | IPS/SAA/TAA/风险/压力/成本 | `InvestmentPolicy`/`Portfolio` |
| **5. 银行/CIB/信托** | 谁能给我们机构级服务？ | 托管/信贷/外汇/私股/信托/慈善/CIB/Access | `CreditFacility`/`Trust`/`CIB` |
| **6. 复盘** | 家办有效吗？下一代 ready 吗？ | 年度 review、治理、下一代、成本 | `FOReport`/`NextGenPlan` |

---

### 3. 关键时刻

1. **企业退出/继承**：家办设立、资产注入、税务/信托。
2. **合并报表**：第一次看清家族总资产/负债/风险。
3. **投资政策**：IPS、风险、流动性、集中度。
4. **CIB/私股**：机构级交易、共同投资、信贷。
5. **下一代/治理**：家族宪章、理事会、接班。
6. **年度复盘**：成本、绩效、治理、下一代。

---

### 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/持仓/交易/托管 | 自研新核心（参考 Avaloq 能力） |
| 合并报表/held-away | Addepar/合作 + 新核心 |
| 投资政策/风险/压力 | Aladdin + 新核心 |
| 家办运营/预算/供应商 | **新建** |
| 信托/慈善/治理 | TFS/合作 + 新核心 |
| CIB/Access | 合作/CIB |

**关键对象：** `FamilyOffice`、`FOServiceModel`、`ConsolidatedView`、`InvestmentPolicy`、`FOStaff`、`FOBudget`、`FOVendor`、`FOReport`、`NextGenPlan`。

---

### 5. 指标

- 家办 AUA/合并覆盖率；
- IPS 合规/风险/流动性；
- 成本/收入比；
- 服务渗透（托管/信贷/信托/私股/慈善）；
- 下一代参与/治理里程碑；
- 家办 NPS/留存。

---

### 6. 负向需求

- 不把家办当“更富的私行客户”；
- 不强行卖产品；
- 不替代家办 CEO/CIO 的决策；
- 不未经 consent 共享家族成员数据；
- 不做税务/法律意见；
- 不承诺收益/成本节省。

---

### 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m3-family` | 家族/角色/目标/治理 |
| `m3-hub` | 家办/下一代/慈善服务 |
| `m4-trust` | 信托/预算/分配 |
| `m2-*` | 投资政策/风险/压力 |
| `m3-family-office` | Family Office Dashboard：合并资产负债表、IPS 目标/实际/区间、银行/CIB/信托服务、治理/下一代 |

---

### 8. 案例与对标

- **张勇/舒萍**：家族办公室 + 两个信托 + 三家上市公司；客户是“客户群”，不是单一自然人。
- **李嘉诚**：三十年分家、三种权利、基金会。
- **Premji**：约 67% 经济权益捐入基金会/信托，家族保留投票权。
- **Murdoch**：不可撤销信托打到法院；治理/投票权/受益人争议。

**对标：** Citi 1,800+ 家办、Family Office Leadership Program；UBS GFO 317；HSBC Global Head of Family Offices/TFS/CIB/Access；SCB 家族传承。

---

### 9. 边界

- 家办可能有现有 MFO/律师/信托/托管；HSBC 做补充/编排，不强行替代。
- 投资/法律/税务责任边界清楚；银行不做家办的全部决策。
- 公开人物只引用公开事实；金额为设计假设。

---

## E. J8 信任与连续性

<!-- source: 01-user-journey/04-blueprints/10-j8-trust-continuity.md -->

> 定位：P0 横向旅程；不是客群，是所有客户在压力时刻的底座。
> 案例锚点：Tam Mei Kam（梅艳芳遗产）、Tao Soh Ngun、Tan Poh Lee、Kan Lai Kwan、HSBC DOJ/FINMA。
> 对标：HSBC TFS/bereavement/estate、UBS estate planning、Citi trust/estate、SCB legacy。
> 人物/金额为设计假设；不构成法律/税务/投资建议。

---

### 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 任何 J1–J7 客户/家族，在失能、身故、离婚、制裁、欺诈、税务调查等时刻 |
| **触发** | 中风/认知衰退、死亡、离婚、刑事/制裁、APP 欺诈、税务问询 |
| **核心 Job** | “谁现在有权、哪些钱能付/不能付、依据什么、下一步谁做、证据在哪” |
| **好结果** | 合法、及时、可证据；0 无权支付/越权披露；家族关系守住 |

---

### 2. 六阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 事件 intake** | 发生了什么？ | 记录事件、证明、时间、辖区、受影响主体 | `Event`/`DeathEvent`/`CapacityEvent` |
| **2. 授权** | 谁现在能签字？ | POA/LPA/EPA/deputy/trustee/executor；范围/生效/失效/辖区 | `Authority`/`AuthorityScope`/`CourtOrder` |
| **3. 资产/义务图** | 哪些钱/资产/义务受影响？ | 账户/信托/遗产/债务/税/受益支付 | `Asset`/`Estate`/`Trust`/`Obligation` |
| **4. 法律/税务/监管** | 哪些必须等法院/律师/税务？ | probate/estate/trust/跨境/CRS/FATCA/制裁 | `ProbateCase`/`TrustCase`/`TaxPack` |
| **5. 执行** | 哪些能付/不能付？ | 紧急支付、estate account、分配、披露 | `Payment`/`EstateAccount`/`Distribution` |
| **6. 证据/关闭** | 怎么证明？ | 决策、批准、送达、支付、审计 | `Evidence`/`Decision`/`Audit` |

---

### 3. 关键时刻

1. **失能**：POA/EPA/LPA/deputy；**没有 probate**。
2. **身故**：POA 终止；executor/administrator；probate/letters；estate/trust 双账。
3. **离婚**：披露/资产/信托/子女；法院命令。
4. **制裁/刑事**：冻结/限制/上报；不歧视/不擅自判断。
5. **欺诈/深伪**：授权/异常/拦截/证据/赔付。
6. **税务补救**：CRS/FATCA/实体穿透/remediation。

---

### 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/支付/文档 | 自研新核心（参考 Avaloq 能力） |
| 事件/授权/同意/证据 | **新建** |
| estate/probate/trust | TFS/合作 + 新核心 |
| 跨境命令/承认 | **新建** |
| 制裁/PEP/AML | 新核心 + 现有合规 |
| 争议/法院 | 合作/律师 |

**关键对象：** `Event`、`Authority`、`AuthorityScope`、`CourtOrder`、`EstateCase`、`ProbateCase`、`TrustCase`、`EstateAccount`、`Evidence`、`Decision`、`Audit`。

---

### 5. 指标

- 事件通知确认时间；
- 授权核验时间；
- 首笔合法支付时间；
- 0 无权支付/越权披露；
- 证据包完整率/可采信；
- 家族 NPS/投诉；
- estate 关闭周期/成本。

---

### 6. 负向需求

- 不承诺“72 小时拿钱”；
- 不绕过 probate/法院/制裁；
- 不把信托当遗产；
- 不把“家属一致”当授权；
- 不向无权家属/媒体披露；
- 不做法律/税务意见；
- 不未经批准跨境传输。

---

### 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m3-family` | 家庭角色/授权缺口 |
| `m3-cases` | 案件/任务/责任方/证据 |
| `audit` | 证据/决策/访问 |
| X1/X2 独立页面 | 失能/身故完整页面不在本版范围；当前用 `m3-cases`/`m3-family` 预演 |

---

### 8. 案例与对标

- **Tam Mei Kam**：梅艳芳遗产/信托；20 年争议；月度支付/家庭供养/葬礼/剩余分配。
- **Tao Soh Ngun**：意愿书版本/受托人冲突/控制权。
- **Tan Poh Lee**：中风/三地法院/受托人交出裁量权。
- **Kan Lai Kwan**：控制权/意愿书/受托人“great deference”。
- **HSBC DOJ/FINMA**：税务/AML/历史补救。

**对标：** HSBC TFS 80 年/bereavement/estate；UBS estate planning；Citi trust/estate；SCB legacy/trust。

---

### 9. 边界

- 压力旅程不是“恐怖故事”，是“信任证明”。
- 法律程序需要时间；系统压缩的是信息/证据/编排，不是法律。
- 公开案件只引用公开事实；金额/时间线为设计假设。

---
