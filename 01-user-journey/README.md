# 01 — User Journey：客户为什么需要、我们要做成什么

> 四件套的第 ① 件：**旅程、痛点与验收**。
> 这里不逐页解释 HTML；它回答“为谁、为什么、什么算好、先做哪条、影片里 demo 什么”。

---

## 0. 先看哪里（15 分钟路线）

| 顺序 | 读什么 | 得到什么 |
|---|---|---|
| 1 | **本文 §2** | J1–J10 一页总览、优先级、执行顺序 |
| 2 | [`00-journey-catalog.md`](00-journey-catalog.md) | **视频电影实际 demo 的旅程表** + J1–J10 覆盖 + 缺口 |
| 3 | [`01-vision.md`](01-vision.md) | 为什么换核心、Ida 的七个转变、成功案例 |
| 4 | [`03-blueprints.md`](03-blueprints.md) | J2/J3/J4/J6/J8 的触发、阶段、对象、指标、边界 |
| 5 | [`04-j2-deep-dive.md`](04-j2-deep-dive.md) | J2 的真实案例、同业、七步流程、四页设计 |
| 6 | [`05-scenarios.md`](05-scenarios.md) | S1–S5 阳光 / X1–X5 压力的具体家族场景 |
| 7 | [`02-evidence.md`](02-evidence.md) | 证据等级、术语、判例、行业机制、personas |
| 8 | [`06-pilot-and-operations.md`](06-pilot-and-operations.md) | 怎么用真实家族验证；旅程如何落到 Workbench |
| 9 | [`PAGE-MAP.md`](PAGE-MAP.md) | 34 条客户路由 + 21 页工作台 ↔ 旅程 ↔ 文档 ↔ 影片镜头 |

**如果只读一份：** [`00-journey-catalog.md`](00-journey-catalog.md)。它是视频、旅程、页面、能力的汇编入口。

---

## 1. 这里有什么（9 份文档，不再按旧目录分散）

```
01-user-journey/
├─ README.md                         ← 你在这里
├─ 00-journey-catalog.md             ← 视频 demo 旅程总表 + J1–J10 覆盖
├─ 01-vision.md                      ← 为什么、为谁、Ida、生命周期、成功案例
├─ 02-evidence.md                    ← 证据规则、术语、判例、行业机制、personas
├─ 03-blueprints.md                  ← J2/J3/J4/J6/J8 一页蓝图
├─ 04-j2-deep-dive.md                ← J2 真实案例、同业、七步流程、四页设计
├─ 05-scenarios.md                   ← S1–S5 阳光 / X1–X5 压力
├─ 06-pilot-and-operations.md        ← 真实家族 Pilot + Workbench 运营映射
├─ PAGE-MAP.md                       ← 页面 ↔ 旅程 ↔ 文档 ↔ 影片
└─ personas/                         ← 21 组 HTML 核心案例 + 23 行 CSV 家族池
```

**合并规则：** 同类内容只保留一份主文档；旧的 `01-vision/`、`02-evidence/`、`03-portfolio/`、`04-blueprints/`、`05-scenarios/`、`06-pilot/`、`07-operations-map/` 目录已合并到上述文件，`personas/` 证据保留，不再并行维护。

---

## 2. 十条旅程与优先级

| ID | 旅程 | 客户单位 / persona | 核心 Job | 优先级 |
|---|---|---|---|---|
| **J1** | 家族传承与下一代 | 多代 UHNW 家族 | 家族对齐、下一代 ready、治理、家办 | **P0 客户** |
| **J2** | 创始人财富事件 | 创始人/企业家 | 纸面财富 → 可花/可押/可传的财富 | **P0 客户** |
| **J3** | 创作者/媒体/体育 | 创作者/艺人/运动员/IP 持有者 | 短收入窗口 + IP/版税 → 长期资产负债表 | P1 客户 |
| **J4** | 女性与财富 | 配偶/寡妇/女创始人/继承女性 | 从“附属”到独立决策者 | P1 客户 |
| **J5** | 跨境家庭与迁徙 | 跨国家族/个人 | 搬迁/多实体/税务/家庭安顿 | P1 客户 |
| **J6** | 家族办公室 | SFO/MFO 的 CEO/CIO/COO | 合并、治理、投资、运营、传承 | **P0 客户** |
| **J7** | 核心高净值人生目标 | 个人/家庭 | 教育、退休、住房、复利 | P2 客户 |
| **J8** | 信任与连续性 | 所有客户/家族 | 失能/身故/离婚/制裁/欺诈/补救 | **P0 横向** |
| **J9** | RM/顾问工作流 | RM/IC/合规/COO | 家族 360/授权/证据/handoff/产能 | **P0 使能** |
| **J10** | 专业伙伴/生态 | RM/客户/税务/法律/信托/估值 | 转介、consent、SLA、证据 | **P0 使能** |

**执行顺序：** J1 + J8 + J9 → J2 + J6 → J5 + J4 → J3 + J7；J10 全程并行。

**P0 决策（2026-10-26）：** 3 条客户 P0（J1/J2/J6）+ 1 条横向 P0（J8）+ 2 条使能 P0（J9/J10）。J3/J4/J5 为 P1，J7 为 P2。

---

## 3. 视频电影要 demo 的 user journey：看这张表

**权威表在 [`00-journey-catalog.md`](00-journey-catalog.md) §1**，列包括：

| 影片问题 | Demo journey | 镜头 | 客户痛点 | Persona | 解决方案 | IT 功能提升 |
|---|---|---|---|---|---|---|
| IPO / CIB→PB | J2 | 影片 S3–S6 / S4 | 纸面财富、event≠lead、估值/质押/义务分散 | 创始人、CIB、RM、家办 | 事件 pipeline + consent + 估值委员会 + CIB→PB handoff + 私股生命周期 | C03/C08/C02/C10/X1；`ipo-*`、`m4-*` |
| 新客户/二代/配偶 | J1/J4/J7 | 影片 S11–S12 / S11 | client ID ≠ family；父母替成年子女；配偶无独立 consent | 主客户、配偶、成年子女、未成年子女 | family graph + 三条红线 + suitability→首投→复盘 | C01/C02/C03/C04/C06；`onboarding-*` |
| 身故与传承 | J8 | 影片 S7–S10 / S7+S8 | POA 终止、executor/trustee 混权、probate 混账、12 个月无结果 | 遗孀、executor、trustee、beneficiary | estate 案件时间线 + 授权矩阵 + probate + 12 个月 cohort | C09/C02/C03/X1/C12；`estate-*` |
| PB 经营 / RM 产能 | J9（J6 为读者） | 影片 S13a–S13b / S13a' | AUM/收入/佣金/毛利/净利/CIR 不在一张 dashboard；成本与公式不透明；客户数当产能 | CFO/COO/RM/家办 CFO | PB operating dashboard（AUM→收入→客户佣金→毛利→净利→CIR）+ RM scorecard（support_ratio/segment_mix/service_intensity） | X2/C12/C05；`revenue-*` |
| 失败交易与信任 | J9/J8 | 影片 S14a–S14b / S14a | 失败无原因/影响/下一步；KPI 不区分可控性 | 客户、RM、COO/Ops | failure detail + recovery + reason code + trust KPI | C07/X1/X2/C12；`order-*` |

> **注意：** 影片 S2a 的 J1–J10 静态卡只是总览，不是功能 demo。J6（客户 P0）与 J10（使能 P0）只在总览卡出现；J5（P1）只在 30 分钟可选版展开。完整覆盖与缺口见 `00-journey-catalog.md` §2。

---

## 4. 文档和 HTML 不是一一对应（重要）

```
Journey（战略层）   ── 为什么、为谁、什么算好
      │  一对多
      ▼
Page（体验层）      ── 客户看到什么、点什么、看到哪些字段
      │  一对多
      ▼
Workbench（运营层） ── 谁做、什么状态、什么证据、什么指标
```

- **一条旅程对应多个页面。** J2 = `m4-founder` + `m4-valuation` + `m4-pledge` + `m4-trust` + `m4-private-assets` + Workbench `ipo-*`。
- **一个页面服务多条旅程。** `m3-family` 同时服务 J1（家族）、J4（女性/配偶）、J8（授权缺口）。
- **文档与页面不存在 1:1。** 证据文档（personas、判例）不对应任何页面；它们证明“为什么值得做”。
- **唯一接近 1:1 的，是“P0 蓝图 → 一个运营时刻”。** J2 蓝图 → IPO/退出运营链；J8 蓝图 → 身故/授权运营链。

完整 **34 条客户路由 + 21 页工作台** 映射见 [`PAGE-MAP.md`](PAGE-MAP.md)。

---

## 5. 每份文档回答什么

| 文档 | 回答的问题 | 不回答什么 |
|---|---|---|
| `00-journey-catalog.md` | 视频 demo 哪几条；J1–J10 覆盖；痛点/persona/方案/IT | 字段级页面规格 |
| `01-vision.md` | 为什么现在、Ida 的方向、成功案例 | 具体功能与页面 |
| `02-evidence.md` | 哪些是事实、哪些是主张、证据等级；判例/术语/personas | 产品方案 |
| `03-blueprints.md` | 一条旅程的触发、失败链、对象、指标、边界 | 全量页面规格 |
| `04-j2-deep-dive.md` | J2 的真实案例、同业、七步流程、四页设计 | J3–J8 的细节 |
| `05-scenarios.md` | 一个具体家族在阳光/压力下发生什么 | 通用能力清单 |
| `06-pilot-and-operations.md` | 怎么用真实家族验证；旅程如何落到 Workbench | 技术实现 |
| `PAGE-MAP.md` | 每条路由服务哪条旅程、哪份文档、哪个镜头 | 战略论证 |

---

## 6. 边界

- 所有人物、金额、课程、税率、时间线为设计假设；公开人物只引用公开事实，不主张其为本行客户。
- 不构成法律、税务或投资建议；具体适用须当地律师/税务顾问确认。
- `personas/` 保留为公开证据库（21 组 HTML 核心案例 + 23 行 CSV 家族池），不进入营销材料；对外引用前过法务。
- 证据等级：A 法院/监管；B 官方/年报/产品文档；C 媒体/访谈/行业报告；D 设计假设。
