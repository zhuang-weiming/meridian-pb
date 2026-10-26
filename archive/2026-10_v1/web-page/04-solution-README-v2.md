# 04 — 解决方案：模块、页面、Demo

> 这一层把 `02_architecture` 的能力，映射到可演示/可开发的模块与页面。
> 现有 Demo 是 **v1 原型**（5 个 use case、28+ 路由）；它已经包含 MIT/Athens/女性/慈善/搬迁等服务，但**叙事顺序**要按 `03_journeys/03-demo-script.md` 重排。

---

## 1. 模块

| 模块 | 对应能力 | 现有 demo | 状态 |
|---|---|---|---|
| **Family Cockpit** | C01/C02/C03/C04 | `m3-family` | 有；需加 family graph/governance/next-gen |
| **Service & Invitations** | C12/C04 | `m3-hub` | 有；已含 MIT/Athens/女性/慈善/搬迁 |
| **Proposal & Execution** | C06/C07 | `m1-*` | 有；强 |
| **Quant & Stress** | C06 | `m2-*` | 有；强 |
| **Founder / Private Asset** | C08 | `m4-*`、`m4-private-assets` | 有；已加 Capital Calls / Earn-Outs / Obligation Calendar / Valuation Governance |
| **Tax / Cross-border** | C10 | `m5-*`, `m3-taxlegal` | 有；需把“税务优化”改为“tax data pack + 责任矩阵” |
| **Trust / Estate / Philanthropy** | C09/C11 | `m4-trust` 部分 | 需新建 X1/X2/Trust/Philanthropy 页面 |
| **Family Office** | C05 | 无独立页 | 需新建 SFO dashboard/consolidation/governance |
| **NextGen** | C04 | `m3-hub` 课程 | 需新建学习/独立账户/首投/创业 |
| **Evidence / Audit** | X1 | `audit` | 有；需扩为 Decision/Evidence/Conflict |
| **Client Portal** | C12 | `client-portal` | 有；需家庭/下一代/家办视图 |

---

## 2. 页面原则

1. **一个页面一个决策**：不是“信息展示”，是“下一步做什么”。
2. **每个数字有来源/日期/证据**。
3. **每个动作有权限/责任/边界**。
4. **每个旅程有“好结果”与“不能做什么”**。
5. **角色切换**：Client / RM / IC / Compliance / Credit / Trustee / Vendor / NextGen。

---

## 3. 与旧 48 页规格的关系

- 旧 `03_webpage_design` 已归档到 `archive/2026-10_v1/03_webpage_design/`；它仍是现有 demo 的规格来源。
- 新架构不要求重写 48 页；先补 **Family Cockpit / Family Office / NextGen / Trust-Estate / Evidence** 五组页面，其他复用。
- 旧页面的“M5 税务优化”要改名/改叙事：从“省税”转为“tax data pack + 责任矩阵 + 顾问协同”，避免越界。

---

## 4. 往下读

- 模块/页面映射：[`01-module-map.md`](01-module-map.md)
- Demo 运行与演示：[`02-demo.md`](02-demo.md)
- RM 税务指引/会计师伙伴：[`03-rm-tax-guide.md`](03-rm-tax-guide.md)
- 五个新思路验证：[`04-five-initiatives-validation.md`](04-five-initiatives-validation.md)
- 21 页 Operating Workbench：[`05-workbench.md`](05-workbench.md)
- 演示脚本：[`../03_journeys/03-demo-script.md`](../03_journeys/03-demo-script.md)
