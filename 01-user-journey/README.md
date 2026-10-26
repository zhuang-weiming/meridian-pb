# 01 — User journey：客户为什么需要、我们要做成什么

> 这是四件套的第 ① 件：**旅程、痛点与验收**。
> 它不逐页解释 HTML；它回答“为谁、为什么、什么算好、先做哪条”。
> 页面在 [`../03-web-page/`](../03-web-page/README.md)；能力在 [`../02-functional-architecture/`](../02-functional-architecture/README.md)；影片在 [`../04-video-and-movie/`](../04-video-and-movie/README.md)。

---

## 0. 先读哪一个（15 分钟路线）

| 顺序 | 读什么 | 得到什么 |
|---|---|---|
| 1 | [`01-vision/00-executive-answer.md`](01-vision/00-executive-answer.md) | 一页答案：为什么换核心、为什么是现在 |
| 2 | [`03-portfolio/00-journey-portfolio.md`](03-portfolio/00-journey-portfolio.md) | J1–J10 组合、P0 决策、每条靠什么赢 |
| 3 | [`04-blueprints/05-j2-founder.md`](04-blueprints/05-j2-founder.md) → J3 → J4 → J6 → J8 | P0/P1 的一页蓝图：触发、失败链、对象、指标、边界 |
| 4 | [`05-scenarios/01-sunny-journeys.md`](05-scenarios/01-sunny-journeys.md) → [`02-stress-journeys.md`](05-scenarios/02-stress-journeys.md) | 阳光 S1–S5 / 压力 X1–X5 的具体场景 |
| 5 | [`02-evidence/README.md`](02-evidence/README.md) | 证据：真实人物、判例、行业机制（含 `personas/`） |
| 6 | [`06-pilot/04-real-family-pilot.md`](06-pilot/04-real-family-pilot.md) → [`07-operations-map/11-workbench-journeys.md`](07-operations-map/11-workbench-journeys.md) | 怎么用真实家族验证；旅程如何落到运营步骤 |
| 7 | [`PAGE-MAP.md`](PAGE-MAP.md) | 34 条客户路由 + 21 页工作台分别服务哪条旅程 |

---

## 1. 这里有什么

```
01-user-journey/
├─ README.md                 ← 你在这里
├─ PAGE-MAP.md               ← 页面 ↔ 旅程 ↔ 文档 ↔ 影片镜头（总表）
├─ 01-vision/                ← 为什么、为谁、成功案例
├─ 02-evidence/              ← personas、术语、判例、行业机制
├─ 03-portfolio/             ← J1–J10 组合与 P0/P1/P2 决策
├─ 04-blueprints/            ← J2/J3/J4/J6/J8 一页蓝图 + J2 真实案例/同业
├─ 05-scenarios/             ← S1–S5 阳光 / X1–X5 压力
├─ 06-pilot/                 ← 23 组公开家族 + 20–26 个已同意客户家族
└─ 07-operations-map/        ← 旅程 → Workbench 的运营层映射
```

**痛点在三个层次，不在同一页：**

| 层次 | 在哪里 | 长什么样 |
|---|---|---|
| 结构性痛点 | [`03-portfolio/`](03-portfolio/00-journey-portfolio.md) | 为什么旧核心/旧服务模式在某个旅程上系统性失败 |
| 旅程痛点 | [`04-blueprints/`](04-blueprints/05-j2-founder.md) | 一个客户在触发、决策、执行、交接上的具体卡点 |
| 失败链 | [`05-scenarios/`](05-scenarios/01-sunny-journeys.md) | 今天用哪些系统/人/Excel，哪一步断，代价是什么 |

---

## 2. 十条旅程与优先级

| ID | 旅程 | 客户 | 核心 job | 优先级 |
|---|---|---|---|---|
| **J1** | 家族传承与下一代 | 多代 UHNW 家族 | 家族对齐、下一代 ready、治理、家办 | **P0** |
| **J2** | 创始人财富事件 | 创始人/企业家 | Pre-IPO/退出/流动性/税后/信托 | **P0** |
| **J3** | 创作者/媒体/体育 | 个人/小团队 | IP/版税/短收入窗口/长期资产负债表 | P1 |
| **J4** | 女性与财富 | 女性/配偶/寡妇/女创始人 | 独立决策、信心、家庭保护 | P1 |
| **J5** | 跨境家庭与迁徙 | 跨国家族/个人 | 搬迁/多实体/税务/安顿 | P1 |
| **J6** | 家族办公室 | SFO/MFO | 合并/投资治理/CIB/运营 | **P0** |
| **J7** | 核心高净值人生目标 | 个人/家庭 | 教育/退休/住房/复利 | P2 |
| **J8** | 信任与连续性 | 所有客户 | 失能/身故/离婚/制裁/欺诈/补救 | **P0 横向** |
| **J9** | RM/顾问工作流 | RM/IC/合规 | 家族 360/授权/证据/handoff | **P0 使能** |
| **J10** | 专业伙伴/生态 | RM/客户/伙伴 | 税务/法律/信托/估值/慈善 | **P0 使能** |

**执行顺序：** J1 + J8 + J9 → J2 + J6 → J5 + J4 → J3 + J7；J10 全程并行。

---

## 3. 文档和 HTML 不是一一对应（重要）

这是上一版最容易让读者误解的地方。正确的心智模型是：

```
Journey（战略层）   ── 为什么、为谁、什么算好
      │  一对多
      ▼
Page（体验层）      ── 客户看到什么、点什么、看到哪些字段
      │  一对多
      ▼
Workbench（运营层） ── 谁做、什么状态、什么证据、什么指标
```

- **一条旅程对应多个页面。** 例如 J2 创始人 = `m4-founder` + `m4-valuation` + `m4-pledge` + `m4-trust` + `m4-private-assets` + Workbench `ipo-*`。
- **一个页面服务多条旅程。** 例如 `m3-family` 同时服务 J1（家族）、J4（女性/配偶）、J8（授权缺口）。
- **文档与页面不存在 1:1。** 证据文档（personas、判例）甚至不对应任何页面；它们证明“为什么值得做”。
- **唯一接近 1:1 的，是“P0 蓝图 → 一个运营时刻”。** 例如 J2 蓝图 → IPO/退出运营链；J8 蓝图 → 身故/授权运营链。

完整的 **34 条客户路由 + 21 页工作台** 映射见 [`PAGE-MAP.md`](PAGE-MAP.md)。读页面之前先看那张表，就不会再问“这个 HTML 对应哪份文档”。

---

## 4. 每份文档怎么读

| 文档 | 回答的问题 | 不回答什么 |
|---|---|---|
| `01-vision/` | 为什么现在、Ida 的方向、成功案例 | 具体功能与页面 |
| `02-evidence/` | 哪些是事实、哪些是主张、证据等级 | 产品方案 |
| `03-portfolio/` | 为什么是这十条、先做哪条、怎么衡量 | 字段级流程 |
| `04-blueprints/` | 一条旅程的触发、失败链、对象、指标、边界 | 全量页面规格 |
| `05-scenarios/` | 一个具体家族在阳光/压力下发生什么 | 通用能力清单 |
| `06-pilot/` | 怎么用真实家族验证，不外泄什么 | 技术实现 |
| `07-operations-map/` | 旅程如何映射到 Workbench 的步骤/字段/证据 | 客户叙事 |

---

## 5. 边界

- 所有人物、金额、课程、税率、时间线为设计假设；公开人物只引用公开事实，不主张其为本行客户。
- 不构成法律、税务或投资建议；具体适用须当地律师/税务顾问确认。
- `personas/` 保留为公开证据库（21 组公开人物/家族），不进入营销材料；对外引用前过法务。
- 证据等级：A 法院/监管；B 官方/年报/产品文档；C 媒体/访谈/行业报告；D 设计假设。
