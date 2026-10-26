# PAGE-MAP — 页面、旅程、文档、影片的总对应表

> **用途：** 回答两个高频问题——“这个 HTML 对应哪份文档？”“这条旅程在哪个页面能看到？”
>
> **先说结论：文档和 HTML 不是一一对应。** 一条旅程横跨多个页面；一个页面服务多条旅程；证据文档不对应页面。下表是唯一的权威映射，页面本身不重复维护这套关系。

---

## 1. 客户与顾问旅程（34 条路由）

入口：[`../03-web-page/client-journey.html`](../03-web-page/client-journey.html)

| # | 路由 | 页面 | 主旅程 | 也服务 | 依据文档 | 影片 |
|---|---|---|---|---|---|---|
| 1 | `m1-dashboard` | Proposal Inbox | J9 RM | J7 | [S1](05-scenarios.md) | — |
| 2 | `m1-proposal` | Proposal Studio | J7 | J2 | [S1](05-scenarios.md) | — |
| 3 | `m1-execution` | Execution Blueprint | J7 | J9 | [S1](05-scenarios.md) | — |
| 4 | `m1-compliance` | Compliance Gate | J9 | J7 | [S1](05-scenarios.md) | — |
| 5 | `m1-orders` | Orders & TCA | J9 | J7 | [S1](05-scenarios.md) | — |
| 6 | `m2-allocation` | Allocation Studio | J7 | J2 | [S1](05-scenarios.md) | — |
| 7 | `m2-stress` | Stress Test | J7 | J8 | [S1](05-scenarios.md) | — |
| 8 | `m2-backtest` | Backtest Lab | J7 | — | [S1](05-scenarios.md) | — |
| 9 | `m2-decision` | RM Decision Card | J9 | J7 | [S1](05-scenarios.md) | — |
| 10 | `m3-financing` | Financing Cockpit | J2 | J8 | [J2](03-blueprints.md) · [J8](03-blueprints.md) | — |
| 11 | `m3-taxlegal` | Tax / Legal Cockpit | J5 | J10 | [Portfolio](00-journey-catalog.md) · [RM tax guide](../02-functional-architecture/04-rm-tax-guide.md) | — |
| 12 | `m3-hub` | Services / Invitations | J1 | J3/J4/J6 | [J3](03-blueprints.md) · [J4](03-blueprints.md) · [J6](03-blueprints.md) | — |
| 13 | `m3-journeys` | Journey blueprints | J2 | J3/J4 | [J2](03-blueprints.md) · [J3](03-blueprints.md) · [J4](03-blueprints.md) | **S2b** |
| 14 | `m3-family` | Family Cockpit | J1 | J4/J8 | [J8](03-blueprints.md) · [Portfolio](00-journey-catalog.md) | — |
| 15 | `m3-cases` | Case Workbench | J8 | J9 | [J8](03-blueprints.md) | — |
| 16 | `m3-family-office` | Family Office Dashboard | J6 | J1 | [J6](03-blueprints.md) | — |
| 17 | `m4-founder` | Founder 360 | J2 | J6 | [J2](03-blueprints.md) · [J2 cases](04-j2-deep-dive.md) | — |
| 18 | `m4-valuation` | Independent Valuation Committee | J2 | J8 | [J2 cases](04-j2-deep-dive.md) | — |
| 19 | `m4-pledge` | Pledge vs Sell | J2 | J8 | [J2 cases](04-j2-deep-dive.md) | — |
| 20 | `m4-trust` | Trust / Budget / Tax Ledger | J8 | J2 | [J8](03-blueprints.md) | — |
| 21 | `m4-private-assets` | Private Asset Lifecycle | J2 | J8 | [J2 cases](04-j2-deep-dive.md) | **S3** |
| 22 | `m5-intake` | Tax Optimisation Case | J5 | J10 | [Portfolio](00-journey-catalog.md) · [RM tax guide](../02-functional-architecture/04-rm-tax-guide.md) | — |
| 23 | `m5-profile` | Tax Profile / Nexus | J5 | J10 | 同上 | — |
| 24 | `m5-baseline` | Baseline Tax Map | J5 | J10 | 同上 | — |
| 25 | `m5-levers` | Lever Library | J5 | J10 | 同上 | — |
| 26 | `m5-booking` | Booking / Entity Comparison | J5 | J10 | 同上 | — |
| 27 | `m5-scenarios` | Scenario Comparison | J5 | J10 | 同上 | — |
| 28 | `m5-substance` | Anti-Avoidance Check | J5 | J10 | 同上 | — |
| 29 | `m5-advisor` | HSBC Internal Review / RM Decision | J5 | J10 | 同上 | — |
| 30 | `m5-delivery` | Client Delivery / Implementation | J5 | J10 | 同上 | — |
| 31 | `m5-review` | Annual Review | J5 | J10 | 同上 | — |
| 32 | `client-portal` | Client Portal | J1 | J7 | [Portfolio](00-journey-catalog.md) | — |
| 33 | `vendor-portal` | Vendor Bidding | J10 | — | [Portfolio](00-journey-catalog.md) | — |
| 34 | `audit` | Audit & Evidence | J9 | J10 | [Portfolio](00-journey-catalog.md) | — |

---

## 2. 运营工作台（21 页）

入口：[`../03-web-page/rm-workbench.html`](../03-web-page/rm-workbench.html)

| # | 路由 | 页面 | 主旅程 | 模块 | 影片 |
|---|---|---|---|---|---|
| 1 | `overview` | Operating Workbench | J9/J10 | 总览 | **S1** |
| 2 | `ipo-pipeline` | IPO & Wealth Event Pipeline | J2 | IPO & PB | **S4** |
| 3 | `ipo-company` | Company & Management | J2 | IPO & PB | — |
| 4 | `ipo-valuation` | Pre-IPO Valuation | J2 | IPO & PB | **S5** |
| 5 | `ipo-handoff` | CIB → PB Handoff | J2/J9 | IPO & PB | **S6** |
| 6 | `estate-portfolio` | Estate Case Portfolio | J8 | Estate & Continuity | **S7** |
| 7 | `estate-case` | Estate Case Timeline | J8 | Estate & Continuity | **S8** |
| 8 | `estate-authority` | Authority & Probate | J8 | Estate & Continuity | **S9** |
| 9 | `estate-outcomes` | 12-Month Outcomes | J8 | Estate & Continuity | **S10** |
| 10 | `onboarding-family` | Family Onboarding | J1 | Family Onboarding | **S11** |
| 11 | `onboarding-suitability` | Suitability & Risk | J1/J7 | Family Onboarding | — |
| 12 | `onboarding-templates` | Portfolio Templates | J7 | Family Onboarding | — |
| 13 | `onboarding-first` | First Investment | J1/J7 | Family Onboarding | **S12** |
| 14 | `revenue-cockpit` | Revenue & Margin Cockpit | J9 | Revenue & Margin | **S13a** |
| 15 | `revenue-client` | Client P&L | J9 | Revenue & Margin | — |
| 16 | `revenue-product` | Product P&L | J9 | Revenue & Margin | — |
| 17 | `revenue-rm` | RM Scorecard | J9 | Revenue & Margin | **S13b** |
| 18 | `order-monitor` | Order Monitor | J9 | Order Trust | — |
| 19 | `order-failure` | Failure Detail | J8/J9 | Order Trust | **S14a** |
| 20 | `order-recovery` | Recovery Workflow | J8/J9 | Order Trust | — |
| 21 | `order-kpi` | Order KPI & Trust | J9 | Order Trust | **S14b** |

> 本表按工作台页面顺序排列；“影片”列只标锚点。影片播放顺序见 04：S11–S12（onboarding）在 S7–S10（estate）之前。

---

## 3. 三条使用规则

1. **先看旅程，再看页面。** 先读 [`00-journey-catalog.md`](00-journey-catalog.md)，确定你在看 J1–J10 的哪一条；再用本表找页面。
2. **文档是决策记录，不是页面说明书。** 页面字段会变；文档里的失败链、对象、指标、边界才是稳定内容。
3. **影片只选锚点。** 12 分钟片只使用 16 个页面/场景锚点（14 个工作台页 + 2 个客户页，见两张表的“影片”列），不追求覆盖全部 55 个路由；未入片的页面仍可在现场演示中使用。
