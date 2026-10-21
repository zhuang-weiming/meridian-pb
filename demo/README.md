# HSBC Private Bank · Demo

一个**可点击、可输入、可切换角色**的前端演示，覆盖 5 个 use case、31 条路由（28 个关键页 + 客户/供应商/审计门户），对应规格里的 48 页主路径。

> 所有客户、金额、机构、税率均为**演示数据**，不构成投资、税务或法律建议。
>
> **范围**：本 Demo 演示的是 **HSBC Private Bank 核心系统**中**超越 Avaloq 既有标准能力**的部分，即下面五个用例。Avaloq 标准功能将沿用同一套数据模型、权限矩阵与证据底座逐步纳入。

---

## 1. 运行

```bash
cd meridian-pb/demo
python3 -m http.server 8766
# 打开 http://localhost:8766/index.html
```

也可以直接双击 `index.html`（纯静态，无构建、无依赖）。

**校验脚本**：`node check.js` 检查提案/执行层权重与金额、成本、M3/M4 的 LTV 与覆盖率、31 条路由和角色注册；`node render-check.js` 渲染全部路由 + 客户门户三种标签，检查页面异常与 div 平衡。

**深链示例**
- RM 视角：`index.html#/m1-dashboard`
- 客户视角：`index.html?role=Client#/client-portal`
- Vendor 视角：`index.html?role=Vendor#/vendor-portal`
- 合规视角：`index.html?role=Compliance#/m1-compliance`
- 创始人案例：`index.html#/m4-founder`
- 税务优化：`index.html#/m5-scenarios`

**重置**：侧边栏「重置演示」清空 localStorage。

---

## 2. 五个 use case 怎么点

### M1 提案 → 订单
1. `#/m1-dashboard` 看事件与 Client 360（RM 税号掩码）。
2. `#/m1-proposal` 顶部是「给 Aladdin 的目标」+「Aladdin Proposal CSV」+「AI 审阅」：AI 对照目标/约束逐项给 PASS/WARN/REJECT。**Aladdin 推荐在上，AI 参考在下**；Aladdin 与目标不一致时显示 **REJECT**，不能采用/进入执行。点「载入不一致示例」可演示硬阻断。
3. 采用 Aladdin 提案，或在下方选择 AI 参考方案 → `#/m1-execution` 看逐行蓝图（模板、数量、venue、限价、税基、资金、状态）。
4. `#/m1-compliance` 看 10 项检查，1 个 WARN（美国遗产税）→「附条件通过」→「客户电子签署」→「创建订单」。**创建订单要求：审批 + 签署 + 同一提案版本**；切换方案或重新生成会重置审批/签署。右侧「继续」始终进入「订单与 TCA」；未满足放行条件时会显示 demo 提示，生产环境会阻断。
5. `#/m1-orders` 看执行蓝图如何落到 **10 个母单 / 16 个子单**：RFQ、基金订阅、LSE/OTC、定存；看子单成交、TCA、交收与成本瀑布（订单簿为静态演示数据，创建订单不写后台 OMS）。

**要说服业务人员的点**：Aladdin CSV 是唯一输入，AI 只做审阅、不改写；**REJECT 是硬阻断，不是 WARN**；SAA/TAA → 执行蓝图 → 母单/子单 → TCA；拆单不是“多几张表”，而是 venue、币种、交收、tax lot 与对手方的实际约束；TES 五维；WARN 不能静默通过；TCA 回写模板。

**Avaloq / Aladdin 结合方式**：Aladdin 出 SAA/TAA CSV，Avaloq 侧做规则校验与例外处理；M1 的 AI 审阅表沿用“规则 → 实际 → 结果 → 证据”的结构，但 Proposal 步骤仍是“目标 → Aladdin CSV → AI 审阅 → 选择”，不把 Pre-Trade Check 直接搬进 Proposal。

### M2 量化实验室
1. `#/m2-allocation` 看配置、政策区间、donut、换手。
2. `#/m2-stress` 点击 6 个情景，看 P&L/回撤/T+7/追保。
3. `#/m2-backtest` 切换「含成本/理论值」，看 CAGR/Sharpe/年化波动/最大回撤/Deflated Sharpe；**曲线与指标同源**（净 = 毛序列扣 90 bps/年），不是“设计值 + 另一条曲线”。
4. `#/m2-decision` 看 RM 决策卡，选采纳/修改/不采纳，写理由。

**M2 步骤条**：配置 → 压力 → 回测 → 决策。配置页可直接「打开回测实验室」；回测页「调整配置」回到配置；决策页「回到配置」闭环。

**要说服业务人员的点**：压力不是“最坏情况”；回测含成本/税/样本外；RM 决定怎么交付。

### M3 RM 副驾 / 家庭 / 案件 / 服务
1. `#/m3-family` 默认进入何启明家族（4 个家庭目标）：当前服务对象、家庭关系与核实、FamilyGoal（提出人/受益人/出资方/决策人）、授权缺口、可执行事项。点「新增家庭目标」可创建（仅当前会话）；可用顶部 Client 切换其他家庭。
2. `#/m3-cases` 看统一 Case Workspace：融资/税务/信托/服务同一视图，显示负责人、依赖、期限、交付物、客户待办；点「查看」打开详情。
3. `#/m3-financing` 从侧边栏、家庭目标 `FG-7701-01`、案件 `CASE-7701-LIQ` 的「入口」或案件详情「打开融资驾驶舱」进入；页面固定何启明案例，显示正确的客户与融资数据，不再出现“陈志远 + 何启明融资数据”的错配。
4. `#/m3-taxlegal` 切换税务/法律 tab，看义务日历、卖/押/信托情景、转介。
5. `#/m3-hub` 看“服务 / 邀请”：家族成员 × 10 个服务。发送邀请前需选择邀请对象、同意状态与可分享范围；未取得本人/监护人同意不能发送；**没有价格、评分或采购步骤**。

**要说服业务人员的点**：家庭不是一个人；目标/授权/案件跨模块；邀请对象≠关系客户；客户不付费、不签约；服务按“家族成员的不同需求”组织。

**右侧「下一步 / 继续」**：始终推进到下一个页面（M1→M2、M3→案件工作台、M4→M5、M5→复盘）；业务动作仍由页面按钮完成。未满足放行条件时，M1 仍可进入订单页，但会显示 demo 提示。

### M4 创始人（示例：林哲）
1. `#/m4-founder` 看持股结构、事件雷达、$9bn → $5.67bn → $2.268bn → $500m。
2. `#/m4-valuation` 拖动 LTV 10%–30%，看额度/覆盖率；看 40% 触发与委员会 4:0。
3. `#/m4-pledge` 改输入（V/B/t/C/i/n/r）→「重新计算」；看盈亏平衡、终端财富、−40% 差距、押/卖建议。
4. `#/m4-trust` 切换结构/预算/税务台账；「新增分配」→ 来源层 C1–C6、申报人、抵扣。

**要说服业务人员的点**：LTV 不是系统参数；40% 触发写前置；质押≠免税；信托消费有来源层。

### M5 税务优化（UHNW，香港家族）
> Demo 客户：**何启明（示例）**，香港税务居民；BVI 控股 + 香港家办 + 香港信托。不是 M4 的林哲，也不是真实人物。

1. `#/m5-intake` 看案件、五层结构、边界。
2. `#/m5-profile` 看居民/实体/账户/资产“四者分离”的 Nexus 地图。
3. `#/m5-baseline` 看事件级税图与有效税率。
4. `#/m5-levers` 勾选 10 条杠杆（拆分/条约/信托有红旗）。
5. `#/m5-booking` 比较香港/新加坡/开曼/卢森堡；开曼不是“免税”。
6. `#/m5-scenarios` 看 4 套情景（基线/A/B/C），C 为 REJECT；基线有效税率约 1.26%（HK 无 CGT/股息税，主要是印花税 + 家办利得税），A 约 0.35%。
7. `#/m5-substance` 看 HK s.61A / FSIE / 实质 / 受益所有权 / 印花税 / CRS；WARN 需补证，REJECT 不进入内部复核。
8. `#/m5-advisor` 看 HSBC PB 内部税务意见、RM 决策；`#/m5-delivery` 客户包/实施；`#/m5-review` 年度复盘。

**要说服业务人员的点**：不是“避税技巧库”；每条杠杆有商业目的/实质/申报；HSBC PB 内部税务团队复核后才交付；外部律师只在需要正式法律意见时支持。

---

## 3. 角色切换（权限演示）

顶部 `Role` 选择（左侧导航可用 ☰ 收起/展开）：
- **RM**：自己客户；税号掩码；可发起提案/融资/税务优化。
- **IC**：配置/压力/决策卡；不释放订单。
- **Compliance**：全量只读 + 审批/解密；不改订单。
- **Credit**：融资/估值；不看信托分配。
- **Trustee**：信托结构/预算/税务台账。
- **Vendor**：只看 RFP 与自己的投标；看不到客户姓名/持仓/其他报价。
- **Client**：客户门户；提案/邀请；林哲/何启明案例含信托报告；看不到内部笔记/评分/价格。

### 业务词典（侧边栏「业务词典」）
- **Lombard**：证券质押融资（securities-backed lending）；**SLB**：证券借贷（securities lending & borrowing），两者不合并。
- **Household**：家庭关系与服务视图，不是法律主体；法律主体仍用 Client / Person / Legal Entity / Trust。
- **Beneficial Owner / Trust Beneficiary / Payee / Taxpayer**：受益所有人 / 信托受益人 / 收款人 / 纳税人，四个不同主体。
- **Client / Person / BP / Account**：客户关系、自然人、法律主体/业务伙伴、账户；不要用一个 `client_id` 代表全部。
- **LTV = 额度 ÷ 可贷值**；**Haircut = 抵押折扣**；**Lendable Value = 可贷值**；三者都要写清分母与估值日。

---

## 4. 哪些是“真计算”

| 功能 | 说明 |
|---|---|
| TES | `0.25 cost + 0.20 tax + 0.20 time + 0.20 impact + 0.15 ease`，实时计算 |
| 质押 vs 卖出 | `S = C/[1−t(1−B/V)]`、终端财富、盈亏平衡 `r*`、−40% 情景，实时计算 |
| LTV / 覆盖率 | `额度 = 可贷值 × LTV`、`覆盖率 = 可贷值 / 额度`，滑块实时更新 |
| Haircut / Lendable Value | `可贷值 = 抵押市值 × (1 − haircut)`；页面同时显示估值日与来源 |
| 订单拆单 | 执行蓝图 10 行 → 10 个母单 / 16 个子单；子单按 venue / RFQ / 基金 dealing / 交收拆分；`check.js` 断言 qty / fill 汇总 |
| 回测指标 | CAGR / 年化波动 / Max DD / Sharpe 由净值序列计算；含成本 = 毛序列扣 90 bps/年；`check.js` 断言曲线与指标一致 |
| 放行条件 | `create-order` 要求 `审批 + 电子签 + 同一提案版本`；切换方案/重新生成会重置 |
| 信托预算 | 合计、准备金覆盖率 |
| 其他 | 情景/压力/回测/订单/税务为**演示数据**，不是实时行情/真实模型 |

---

## 5. 文件

| 文件 | 内容 |
|---|---|
| `index.html` | 入口 |
| `styles.css` | 设计系统（HSBC red / navy / 数据密度） |
| `data.js` | 演示数据（客户、家庭/关系/同意/目标、案件、提案、压力、回测、融资、vendor、估值、信托、税务、业务词典） |
| `ui.js` | 组件与图表（table/field/donut/bars/lineChart/toast/drawer/modal） |
| `pages.js` | M1 + M2 |
| `pages2.js` | M3 + M4 |
| `pages3.js` | M5 + Client/Vendor/Audit |
| `app.js` | 状态、路由、外壳、事件、计算 |

---

## 6. 已知边界

- 无后端；刷新后状态保存在 localStorage（可重置）。
- FamilyGoal / Consent / Relationship / Case 为演示对象；新增目标、发送邀请、创建订单均不写后台。
- M1 的“审批 + 签署 + 版本一致”是前台放行演示，不是后台工作流引擎；生产环境需接流程/电子签/权限服务。
- 金额/税率/机构均为演示；不接真实行情、核心系统、OMS。
- 客户/供应商名称与课程为虚构；林哲 / DeepThink 为假设情景；何启明为虚构个人。
- 图表是 SVG 轻量实现，不是生产级图表库。
- 移动端支持到 390px；复杂表格横向滚动。
