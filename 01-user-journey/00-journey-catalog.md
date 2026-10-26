# 00 — Journey Catalog：视频 demo 旅程 × J1–J10

> **这是 01 的总表。** 它回答四个问题：
>
> 1. 视频电影里实际 demo 了哪几条 user journey？
> 2. 每条旅程服务谁的什么痛点、怎么解决？
> 3. 对应哪些 IT 功能提升与页面？
> 4. 哪些旅程只在总览卡出现，正片没有展开？
>
> 页面级映射见 [`PAGE-MAP.md`](PAGE-MAP.md)；能力与系统见 [`../02-functional-architecture/03-solution-map.md`](../02-functional-architecture/03-solution-map.md)。

---

## 0. 先分清四个词

| 词 | 含义 | 例子 |
|---|---|---|
| **Journey（J1–J10）** | 客户单位 + 核心 Job + 入口事件 + 可验收结果 | J2 创始人财富事件 |
| **Scenario（S1–S5 / X1–X5）** | 一条 journey 的具体家族实例 | 场景 S4 企业家退出 |
| **Operating journey（Workbench）** | 银行内部把一条 journey 跑完的运营链 | IPO & PB、Estate & Continuity |
| **Film scene（影片 S1–S15）** | 影片镜号/段落 | 影片 S4 = IPO pipeline 镜头 |

> **注意：影片 S1–S15 与阳光场景 S1–S5 同名不同义。**
> 本文写“影片 S4”指镜头；“场景 S4”指企业家退出。
> 影片口播用页名，不念 Workbench 页序号；页面位置见每镜的“页面 / 路由”。
> 镜号是素材/take 编号，不是播放顺序；下表按最终叙事排序（onboarding 在 estate 之前）。

---

## 1. 视频电影实际 demo 的旅程（权威表）

**范围：** 12 分钟主版 + 5 分钟电梯版；只列真正出现页面/操作/蓝图的旅程。  
**不把 S2a 静态总览卡算作功能 demo。**

| 影片问题 | 镜头（12 分钟 / 5 分钟） | Demo journey | 客户痛点 | 适用用户（persona） | 解决方案（片子里看到什么） | IT 系统对应的功能提升 | 页面 / 路由 |
|---|---|---|---|---|---|---|---|
| **1 · IPO / CIB→PB** | 影片 S3–S6 / S4 | **J2 创始人财富事件**（主）；J6 家办为后续机构化承接（S2a only） | 投行认识创始人 ≠ PB 可以接触；事件、consent、Chinese Wall、KYC、估值、信贷分散在邮件/Excel；私股没有估值治理、义务日历；handoff 变成“数据转移” | 创始人/企业家（Pre-IPO、A+H、EOT、老股）；CIB coverage、RM；家办 CIO/COO（后续） | 财富事件 pipeline；consent-based introduction；独立估值委员会（方法/权重/折扣/区间/LTV）；CIB→PB 六步交接；私股生命周期（intake→valuation→pledge→capital call→earn-out→obligation） | **C03** LifeEvent/Journey/Case；**C08** PrivateAsset/Valuation/ValuationGovernance/Pledge/CreditFacility/CapitalCall/EarnOut/Obligation/ExitScenario；**C02** Consent/Authority；**C10** TaxPack；**X1** Evidence/Decision | `rm-workbench#/ipo-pipeline`、`#/ipo-valuation`、`#/ipo-handoff`；`client-journey#/m4-founder`、`#/m4-valuation`、`#/m4-pledge`、`#/m4-private-assets` |
| **2 · 新客户 / 二代 / 配偶** | 影片 S11–S12 / S11 | **J1 家族传承与下一代** + **J4 女性与财富** + **J7 核心高净值人生目标** | 客户不是一个 client ID，而是家庭图谱；父母替成年子女同意；配偶活在家庭授权里；未成年人需要监护/信托；适当性、模板、首投流程太重；首投后没有复盘 | 主客户、配偶、成年子女、未成年子女、受托人/律师/家办；演示 He family、二代/配偶 | Family graph（role/consent/goal/entitlement）；三条红线（parent ≠ adult child；minor → guardian/trust；spouse → own consent/legal instrument）；suitability→education→template→consent→order→post-trade review；小额首投 | **C01** Family/Party/Relationship；**C02** Role/Consent/Authority；**C03** Goal/LifeEvent；**C04** NextGenPlan/LearningRecord；**C06** Suitability/Portfolio/Proposal；**X1** Evidence | `rm-workbench#/onboarding-family`、`#/onboarding-first`；`client-journey#/m3-family`、`#/m3-hub`、`#/m1-proposal`、`#/m2-allocation` |
| **3 · 身故与传承** | 影片 S7–S10 / S7 + S8 | **J8 信任与连续性** | 死亡不是一个时点；POA 自动终止，executor/trustee/attorney/beneficiary 权限混在一起；probate/trust/estate 混账；家属重复提交；12 个月后的结果无人测量 | 遗孀/家属、executor、trustee、beneficiary、RM/Compliance；公开锚点 Mui estate、FOS 15 days；演示 He family | Estate portfolio + T+0…T+365 案件时间线；四角色授权矩阵；probate 清单与负向规则；12 个月 cohort（首笔合法支付、分配、法律成本、留存、NPS） | **C09** Trust/Estate/Probate/Will/Beneficiary/Letter/Policy；**C02** Authority/AuthorityScope/Status；**C03** LifeEvent/Case/Task；**X1** Evidence；**C12** Service | `rm-workbench#/estate-portfolio`、`#/estate-case`、`#/estate-authority`、`#/estate-outcomes`；`client-journey#/m4-trust`、`#/m3-cases` |
| **4 · PB 经营 / RM 产能** | 影片 S13a–S13b / S13a' | **J9 RM/顾问工作流**（主）；J6 家办 CFO/COO 为读者 | AUM、收入、客户佣金、毛利/净利/CIR 分散；公式与成本分摊不透明；客户数被当成产能；缺 support_ratio/segment_mix/service_intensity；RM KPI 只看收入 | CFO、COO、RM、家办 CFO/COO；演示 James（RM） | PB Operating Dashboard（AUM / revenue / client commission / GM / NM / CIR + formulas + revenue lines）；按 client/product/RM/entity 分解；RM scorecard（51 relationships、0.7 support_ratio、97.4 workload）；KPI 加入毛利/失败交易/NPS/可控风险 | **X2** FamilyValue/Revenue/Retention；**C12** Service/Case/Channel；**C03** Case/Task；**C05** FamilyOffice（家办口径） | `rm-workbench#/revenue-cockpit`、`#/revenue-rm` |
| **5 · 失败交易与信任** | 影片 S14a–S14b / S14a | **J9 RM/顾问工作流**（主）；**J8 信任与连续性**（支持） | 失败交易只有一个 reason code；缺 primary/contributing cause、owner、evidence；IT/system 与市场/流程混在一起；RM 无法把失败沉淀成知识；客户只听到道歉 | 客户（演示 UK creator family）、RM、COO/Ops、Compliance | Failure attribution：primary/contributing cause、owner、evidence；IT/system 单独标记；RM knowledge card；recovery；失败率、repeat causes、trust | **C07** Order/Trade/Event；**X1** Evidence；**X2** KPI/Trust；**C12** Service | `rm-workbench#/order-failure`、`#/order-kpi`；`client-journey#/m1-orders`、`#/m1-compliance` |

**五个问题的共同点：** 都不是“缺一个页面”，而是缺 **事件、授权/同意、证据、责任人、时点** 的对象化。  
**五个问题的区别：** J2 是“钱怎么从纸面变成可花”；J1/J4/J7 是“谁可以独立决定”；J8 是“人走了/失能后谁有权”；J9 是“银行自己能不能解释收入和失败”。

---

## 2. J1–J10 逐条：视频覆盖、persona、痛点、方案、IT 提升

> 这是“按 journey”看的表；§1 是“按影片问题”看的表。两张表互补，不是两套口径。

| ID | 旅程 | 视频覆盖（12 分钟 / 5 分钟） | 适用用户（persona） | 核心痛点 | 解决方案 | IT 功能提升 | 缺口 / 说明 |
|---|---|---|---|---|---|---|---|
| **J1** | 家族传承与下一代 | S2a + S2b + S11–S12 / S11 | 多代 UHNW 家族；主客户、配偶、成年子女 | 家族不是 client ID；角色/授权/治理/下一代分散；父母替成年子女同意 | family graph + roles/consent + goals/events + nextgen/governance + FO | C01/C02/C03/C04/C05/X1 | 正片只展开 onboarding 切片；治理/FO 未展开 |
| **J2** | 创始人财富事件 | S2a + S2b + S3–S6 / S4 | 创始人/企业家；CIB/RM；家办 CIO/COO | 纸面财富；event≠lead；估值/质押/义务分散；consent/wall 缺失 | private asset lifecycle + valuation committee + CIB→PB handoff + tax/trust | C08/C02/C03/C10/X1 | 最完整的一条 |
| **J3** | 创作者/媒体/体育 | S2a + S2b + S14a / S14a | 创作者、艺人、运动员、IP 持有者 | 收入波动大；IP/版税/形象权；职业窗口短 | IP/royalty objects + cashflow reserve + insurance + diversification + transition | C03/C06/C08/C10 | 有蓝图 + 失败案例；无独立 IP/版税页面镜头 |
| **J4** | 女性与财富 | S2a + S2b + S11–S12 / S11 | 配偶、寡妇、女创始人、继承女性 | 附属角色；无独立 consent/账户；信心/教育缺口 | independent consent/account + education + goals + trust/estate | C01/C02/C03/C06/C09 | onboarding 切片；继承/丧偶/创业未单独展开 |
| **J5** | 跨境家庭与迁徙 | S2a only | 跨国家族/个人 | 多辖区 KYC/税务/实体；重复 KYC；家庭安顿 | cross-border case + KYC reuse + tax residency + consent | C10/C01/C02/C12 | 12/5 分钟未 demo；30 分钟可选版 D4 |
| **J6** | 家族办公室 | S2a only | SFO/MFO 的 CEO/CIO/COO；家族理事会 | 多账户/多顾问；无合并/IPS/CIB；治理与运营碎片化 | FO dashboard + consolidation + IPS + CIB/trust/philanthropy | C05/C06/C09/C12 | **P0 缺口**；若董事会期待家办，需补 60–90 秒 |
| **J7** | 核心高净值人生目标 | S2a + S12 / — | 个人/家庭；核心 HNW | 教育/退休/住房目标不是对象；cost-to-serve 高 | goals + portfolio + digital + annual review | C03/C06/C12 | first investment 服务 core HNW；5 分钟版删掉 S12 |
| **J8** | 信任与连续性 | S2a + S7–S10 / S7 + S8 | 遗孀/家属、executor、trustee、beneficiary、RM/Compliance | 死亡不是一个时点；POA/trust/estate 混权；probate 混账；12 个月无结果 | event/authority/estate/trust case/evidence + negative rules | C02/C03/C09/X1/C12 | 失能/离婚/制裁/欺诈在场景文档，不在 12 分钟片 |
| **J9** | RM/顾问工作流 | S2a + S1 + S6 + S13a–b + S14b / S1' + S13a' + S14a' | RM/IC/合规/COO | family 360 碎片化；证据/handoff 弱；产能不可解释 | RM cockpit + next best action + case/evidence + revenue/KPI | X1/X2/C12/C03 | 使能主线；五个问题的运营都归这里 |
| **J10** | 专业伙伴/生态 | S2a only | RM/客户 + 税务/法律/信托/估值伙伴 | 伙伴 handoff/consent/SLA/证据不透明 | partner registry + referral + consent + SLA | C12/C10/C09/X1 | **P0 使能缺口**；无伙伴面板镜头 |

### 2.1 一句话结论

> **12 分钟片真正 demo 的是：J2、J1/J4/J7（onboarding 切片）、J8、J9（使能），加上 J3 的蓝图/失败案例。**
> **J6（客户 P0）与 J10（使能 P0）只在 S2a 静态卡出现；J5（P1）只在 30 分钟可选版展开。**
> 这不是“漏了页面”，而是影片选择“五个经营问题”作为叙事主线；如果董事会要按 J1–J10 逐条验收，需另拍补充段。

### 2.2 如果要把 P0 补全（可选，不改变主片）

| 补充 | 时长 | 页面 | 目的 |
|---|---|---|---|
| J6 家办 | 60–90s | `client-journey#/m3-family-office` + `rm-workbench#/overview` | 证明家办不是“更富的个人”，而是 consolidation/IPS/CIB/治理 |
| J10 伙伴 | 45–60s | `client-journey#/m3-taxlegal` + `rm-workbench#/overview` | 证明税务/法律/信托/估值是 consent/SLA/evidence 的生态，不是“银行代做” |
| J5 跨境 | 60–90s | `client-journey#/m5-profile` → `#/m5-delivery` | 复用 30 分钟版 D4；证明多辖区/税务数据包/责任矩阵 |

---

## 3. 十条旅程与优先级

| ID | 旅程 | 客户单位 | 核心 Job | 优先级 |
|---|---|---|---|---|
| **J1** | 家族传承与下一代 | 多代 UHNW 家族 | 家族对齐、下一代 ready、治理、家办 | **P0 客户** |
| **J2** | 创始人财富事件 | 创始人/企业家 | 纸面财富 → 可花/可传的财富 | **P0 客户** |
| **J3** | 创作者/媒体/体育 | 个人/小团队 | IP/版税/短收入窗口 → 长期资产负债表 | P1 客户 |
| **J4** | 女性与财富 | 女性/配偶/寡妇/女创始人 | 从“附属”到独立决策者 | P1 客户 |
| **J5** | 跨境家庭与迁徙 | 跨国家族/个人 | 搬迁/多实体/税务/家庭安顿 | P1 客户 |
| **J6** | 家族办公室 | SFO/MFO | 专业化、合并、投资治理、CIB | **P0 客户** |
| **J7** | 核心高净值人生目标 | 个人/家庭 | 教育、退休、住房、复利 | P2 客户 |
| **J8** | 信任与连续性 | 所有客户 | 失能/身故/离婚/制裁/欺诈/补救 | **P0 横向** |
| **J9** | RM/顾问工作流 | RM/IC/合规 | 家族 360/授权/证据/handoff/产能 | **P0 使能** |
| **J10** | 专业伙伴/生态 | RM/客户/伙伴 | 税务/法律/信托/估值/慈善 | **P0 使能** |

**执行顺序：** J1 + J8 + J9 → J2 + J6 → J5 + J4 → J3 + J7；J10 全程并行。

**P0 的验收标准：**

- J1：Family Map/Authority/Goals/NextGen/Governance 可用；8–10 家族。
- J2：PrivateAsset/Valuation/Pledge/Obligation/TaxPack 可用；8–10 创始人。
- J6：FO dashboard/Consolidation/IPS/CIB 可用；4–6 家办。
- J8：Authority/Event/Evidence/Estate/Trust 可用；4–6 压力案例；0 无权支付。
- J9：RM cockpit/NextBestAction/Evidence/Handoff 可用；RM 时间 −20%。
- J10：Partner/Referral/Consent/SLA 可用；税务/法律/信托/估值面板。

---

## 4. 每条旅程为什么独立（避免“一个客群标签”）

| ID | 为什么不是别人的子集 | HSBC 的赢点 | 当前缺口 |
|---|---|---|---|
| **J1** | 家族不是“更富的个人”；需要家族图、角色、治理、下一代、家办 | TFS 80 年、全球网络、MIT/Athens、Global Head of Family Offices、Access、CIB | Family Map/Authority/Consent/Goals/Evidence、下一代、FO dashboard |
| **J2** | 核心是私股/流动性/估值/质押/退出，不是家族治理 | CIB+PB+Innovation Banking、Access、全球网络、TFS | Private Asset Lifecycle、估值治理、质押执行、义务日历、insider window |
| **J3** | 收入结构、IP/版税/形象权、保险、职业周期不同 | Sports/Media/Entertainment、Access、品牌/收藏品 | IP/版税资产模型、短收入窗口现金流、保险/版税融资、转型 |
| **J4** | 独立决策/consent/账户与“家庭附属”不同 | Women & Wealth、TFS、全球网络 | 独立 consent/账户、教育、widow transition、女性社群 |
| **J5** | 多辖区/多实体/税务居民/家庭安顿是独立 Job | 56 国、HK/Asia、TFS | CrossBorderCase、KYC reuse、TaxResidency、Consent |
| **J6** | 家办是机构化客户单位，不是“更大的家庭” | Global Head of Family Offices、TFS、CIB、Access | FO dashboard、Consolidation、IPS、运营/供应商 |
| **J7** | 规模基本盘，不能用 UHNW 复杂度 | Premier/Wealth、数字、低成本 | Goal、Portfolio、Digital、Cost-to-serve |
| **J8** | 压力事件横跨所有客群；失能 ≠ 身故，trust ≠ estate | TFS、bereavement、estate、全球网络 | Authority、Event、Evidence、Estate/Trust、跨境命令 |
| **J9** | 没有它，J1–J7 交付不了；但它是内部旅程 | Wealth Intelligence、RM cockpit | Family360、NextBestAction、Case、Evidence、产能 |
| **J10** | 税务/法律/信托/估值不能自建；生态是交付层 | tax/legal/trust panel、CIB、TFS | Partner registry、Referral、Consent、SLA、Evidence |

---

## 5. 场景 S/X 与旅程的对应

| 场景 | 属于 | 说明 |
|---|---|---|
| S1 教育/复利 | J1/J7 | 阳光开场；目标/现金流/年度 review |
| S2 二代创业 | J1/J3 | 独立账户、家族投资政策、导师 |
| S3 跨境搬迁 | J5 | 伦敦→香港/新加坡；KYC/税务/实体 |
| S4 企业家退出 | J2 | 纸面财富、估值、质押/卖出、信托 |
| S5 家办/治理 | J1/J6 | 合并、IPS、CIB、治理 |
| X1 失能 | J8 | 人在世、没有 probate；POA/deputy |
| X2 身故/遗产 | J8 | probate/estate/trust；12 个月 |
| X3 离婚/制裁/监狱 | J8 | 法律与声誉冲击 |
| X4 税务补救 | J8 | 历史账户/罚金/remediation |
| X5 欺诈/深伪 | J8 | 付款控制/证据 |

> S/X 是“旅程实例”，不是另外十条 journey。不要用 S1–S5 代表全部客户旅程。

---

## 6. 旅程组合：矩阵、竞品、最小能力集

### 6.1 客户单位 × 财富阶段

|  | 个人/创作者 | 家庭 | 机构化（家办） |
|---|---|---|---|
| **创富/增长** | J3、J7 | J1、J5 | J6 |
| **流动性/退出** | J2、J3 | J1、J2 | J6 |
| **传承/治理** | J4、J8 | J1、J8 | J6、J10 |
| **压力/连续性** | J8 | J8 | J8、J10 |

**读法：** 同一个人可以在不同阶段进入不同旅程：创作者 → J3 → J2（退出）→ J1（家庭）→ J6（家办）；家族可以从 J1 分叉到 J5（跨境）、J6（家办）、J8（压力）。J7 是核心高净值入口，不是 UHNW 的缩小版。

### 6.2 竞品对标：每条旅程谁强、HSBC 靠什么赢

| 旅程 | UBS | Citi | SCB | HSBC | Avaloq |
|---|---|---|---|---|---|
| **J1 家族/下一代** | GFO、Wealth Way | FO Advisory、Leadership Program | Succession、Great Repositioning | MIT/Athens、TFS 80 年、Global Head FO | 弱（非家族） |
| **J2 创始人** | Lombard、structured | Private Capital、1,400/77 | wealth lending | CIB+PB+Innovation Banking、Access | 中（信贷/抵押强，私股弱） |
| **J3 创作者** | 全球平台 | Ida 的垂直团队 | Celebrating Life's Work | Sports/Media/Entertainment、Access | 弱（无 IP/版税模型） |
| **J4 女性** | 全球品牌 | 女性倡议 | 新兴市场 | Women & Wealth 报告/网络 | 弱 |
| **J5 跨境** | 全球 | 77 国 | 50+ 市场 | 56 国、HK/Asia、TFS | 中（多实体，跨实体编排弱） |
| **J6 家办** | GFO 317 | 1,800 家办、Leadership | 亚洲家办 | Global Head、TFS、CIB、Access | 弱（非家办） |
| **J7 核心 HNW** | Wealth Way | 全球平台 | 零售/财富 | Premier/Wealth、数字 | 强（账本/交易） |
| **J8 信任** | estate planning | trust/estate | legacy/trust | TFS/bereavement/estate | 中（账户/文档，非案件） |
| **J9 RM** | advisor tools | advisor tools | RM | Wealth Intelligence | 中（工作流/客户生命周期） |
| **J10 伙伴** | 生态 | FO advisory | trust/philanthropy | tax/legal/trust panel | 中（生态） |

> **读法：** HSBC 的独特性不在每条都最强，而在 **J1/J5/J8 的组合**：全球网络 + TFS + 家族/下一代 + 跨境 + 信任。J2/J6 是增长战场；J3/J4 是垂直增量；J7 是规模基本盘；J9/J10 是使能。

### 6.3 每条旅程的最小能力集

| 旅程 | 必须有 | 可以后补 |
|---|---|---|
| **J1** | Family Graph、Role、Goal、NextGen、Governance、FO | 慈善/艺术 |
| **J2** | PrivateAsset、Valuation、Pledge、Obligation、TaxPack | 二级/forward |
| **J3** | IP/Royalty 资产、现金流、保险、税务 | 品牌融资 |
| **J4** | 独立 consent/账户、教育、widow transition | 女性社群 |
| **J5** | CrossBorderCase、KYC reuse、TaxResidency、Consent | 学校/医疗 |
| **J6** | FO dashboard、Consolidation、IPS、CIB | 家办运营外包 |
| **J7** | Goal、Portfolio、Digital、Cost-to-serve | 复杂结构 |
| **J8** | Authority、Event、Evidence、Estate/Trust | 争议调解 |
| **J9** | RM cockpit、NextBestAction、Evidence、Handoff | AI |
| **J10** | Partner registry、Referral、Consent、SLA | 评分/市场 |


---

## 7. 附录：每条旅程的完整理由（原 03-portfolio §4）

#### J1 家族传承与下一代（Ida 旗舰）

**客户：** 多代 UHNW 家族；创始人/配偶/子女/孙辈/家办。

**Job：** “让家族在代际、跨境、治理上保持对齐；下一代能接/能闯；家办能专业运营。”

**为什么独立：** 家族不是“更富的个人”；它需要家族图、角色、治理、下一代、家办。Ida 的 MIT/Athens/Global Head of Family Offices/TFS 都指向这里。

**HSBC 的赢点：** TFS 80 年、全球网络、MIT/Athens、Global Head of Family Offices、HSBC Access、CIB。

**缺口：** Family Map/Authority/Consent/Goals/Events/Evidence、下一代学习/独立账户、家办 dashboard。

#### J2 创始人财富事件

**客户：** 创始人/企业家；股权集中、Pre-IPO/退出、资本调用。

**Job：** “不卖控制权也能拿到流动性；卖/押/信托/家办/税后，怎么选？”

**为什么独立：** 它与 J1 的“家族治理”不同，核心是 **私股/流动性/估值/质押/退出**；Citi Private Capital、HSBC Access/Innovation Banking、UBS financing 都在这条线上。

**HSBC 的赢点：** CIB+PB+Innovation Banking、HSBC Access、global network、TFS。

**缺口：** Private Asset Lifecycle、估值治理、质押执行、义务日历、insider/trading window。

#### J3 创作者/媒体/体育

**客户：** 创作者、艺人、运动员、媒体/时尚/零售企业家。

**Job：** “收入波动大、IP/版税/形象权、职业窗口短；怎么把短期收入变成长期资产负债表？”

**为什么独立：** 这不是“更小的 UHNW”；收入结构、资产（IP/版税/形象权）、保险、税务、职业周期都不同。Ida 在 Citi 就是从 fashion/retail/entertainment 垂直起家；HSBC 有 Sports/Media/Entertainment。

**HSBC 的赢点：** 垂直客群、全球网络、HSBC Access、品牌/收藏品/娱乐资源。

**缺口：** IP/版税资产模型、短收入窗口现金流、保险/版税融资、职业转型。

#### J4 女性与财富

**客户：** 配偶、寡妇、女创始人、继承女性。

**Job：** “从附属到独立决策；信心、控制、家庭保护、下一代教育。”

**为什么独立：** HSBC 2026 报告：未来五年约 40% 全球可投资财富由女性控制（约 US$113tn）；女性更关注退休/子女教育/慈善；女性创业者少 6pp 有导师。把女性做成“女性版产品”是错的；需要独立旅程/consent/教育/社群。

**HSBC 的赢点：** Women & Wealth 报告、全球网络、MIT/Athens、TFS。

**缺口：** 配偶/寡妇 transition、独立 consent/账户、女性创始人导师/融资。

#### J5 跨境家庭与迁徙

**客户：** 跨国家族/个人；UK/HK/SG/UAE/CH/US。

**Job：** “搬家/多实体/税务/学校/医疗/传承，一次规划，不要重复 KYC/合规断裂。”

**为什么独立：** HSBC 的差异化是跨境连接（56 国）；但今天靠人/邮件/重复 KYC。Citi 77 国、SCB 50+、UBS global 都在抢。

**HSBC 的赢点：** 全球网络、HK/Asia、TFS、CIB。

**缺口：** CrossBorderCase、OrderConflict、KYC reuse、consent/data residency。

#### J6 家族办公室

**客户：** SFO/MFO；家办 CEO/CIO/COO。

**Job：** “合并/投资治理/风险/信贷/信托/税务/慈善/CIB，专业化运营。”

**为什么独立：** 家办不是“更富的私行客户”；它是 operating model。Citi 1,800 家办、UBS GFO 317、HSBC 新设 Global Head of Family Offices 都说明这是独立战场。

**HSBC 的赢点：** Global Head of Family Offices、TFS、CIB、HSBC Access、Prism。

**缺口：** FO dashboard/consolidation/IPS/运营/CIB 集成。

#### J7 核心高净值人生目标

**客户：** 核心 HNW/ Premier/富裕家庭；US$2–10m。

**Job：** “教育/退休/住房/复利；简单、透明、低成本。”

**为什么独立：** 不能用 UHNW 的复杂度服务核心 HNW；成本-to-serve 会崩。HSBC Premier/Wealth、UBS Wealth Way、SCB 都在这条线。

**HSBC 的赢点：** 零售/财富平台、数字渠道、规模。

**缺口：** 不要把 J7 做成“简化版 J1”；需要产品化/数字/成本控制。

#### J8 信任与连续性（横向）

**客户：** 所有 J1–J7 客户在压力时刻。

**Job：** “失能/身故/离婚/制裁/欺诈/税务补救时，合法、快速、有证据。”

**为什么横向：** 它不是客群，是事件；每个旅程都会遇到。HSBC TFS/bereavement、UBS estate、Citi trust、SCB legacy 都在这里。

**HSBC 的赢点：** TFS 80 年、bereavement/estate、trust/executor、全球网络。

**缺口：** Authority/Consent/Event/Evidence、probate/estate/trust 双账、X1–X5 页面。

#### J9 RM/顾问工作流（使能）

**用户：** RM/IC/合规/信托/信贷。

**Job：** “一个家族 360、授权/证据、下一步、handoff、伙伴。”

**为什么使能：** 如果 RM 仍在 Excel/邮件/多个 portal 之间搬运，J1–J7 都交付不了。HSBC Wealth Intelligence 是起点，但不够。

**缺口：** RM cockpit、Evidence/Decision、PartnerRegistry/Referral、NextBestAction。

#### J10 专业伙伴/生态交付（使能）

**用户：** RM/客户/伙伴。

**Job：** “税务/法律/信托/估值/慈善/艺术/航空，质量/consent/SLA/证据。”

**为什么使能：** 银行不自己做所有事；但要做入口、编排、质量、责任边界。Citi FO advisory、HSBC tax panel、Avaloq ecosystem 都是参考。

**缺口：** Partner registry、RFP/SLA、consent、data sharing、evidence、fee disclosure。

---

## 8. 资料与维护

| 需要 | 去哪里 |
|---|---|
| 视频逐镜台词/运镜 | [`../04-video-and-movie/12-minute-master-script.md`](../04-video-and-movie/12-minute-master-script.md)、[`../04-video-and-movie/5-minute-elevator-script.md`](../04-video-and-movie/5-minute-elevator-script.md) |
| 34 客户路由 + 21 工作台页面 | [`PAGE-MAP.md`](PAGE-MAP.md) |
| 一条旅程的阶段/对象/指标/边界 | [`03-blueprints.md`](03-blueprints.md) |
| J2 真实案例/同业/七步流程 | [`04-j2-deep-dive.md`](04-j2-deep-dive.md) |
| S1–S5 / X1–X5 具体家族 | [`05-scenarios.md`](05-scenarios.md) |
| 能力域/系统/页面映射 | [`../02-functional-architecture/03-solution-map.md`](../02-functional-architecture/03-solution-map.md) |
| 证据与 personas | [`02-evidence.md`](02-evidence.md) |

**维护规则：** 影片镜头、页面或旅程变化时，先改本表，再改 `PAGE-MAP.md` 与相关蓝图；不要让视频脚本、页面和文档各自维护一套“旅程列表”。

---

**边界：** 公开人物只作结构参考，不表示是本行客户；账户级数据为演示；不构成法律、税务或投资建议。
