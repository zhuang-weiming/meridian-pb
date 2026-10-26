# 01 — 模块 / 页面映射：现有 Demo 有什么、缺什么

> 目的：不重写 34 条路由，先把 J1–J10 旅程组合需要的页面补上。
> 现有客户旅程路由来自 [`../../03-web-page/client/pages.js`](../../03-web-page/client/pages.js)（入口 `client-journey.html`）；`m3-hub` 已包含 MIT/Athens/女性/慈善/搬迁。
> 旅程组合见 [`../../01-user-journey/03-portfolio/00-journey-portfolio.md`](../../01-user-journey/03-portfolio/00-journey-portfolio.md)；S1–S5/X1–X5 是场景实例。

---

## 1. 能力 → 模块 → 页面

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

## 2. 需要新增的页面（最小集）

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

## 3. 现有页面的改造

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

## 4. 页面与旅程映射

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

## 5. 不做什么页面

- 不做“通用 AI 聊天”首页；
- 不做“生活方式商城”；
- 不做“客户看不到价值”的活动页；
- 不做“绕过授权/ probate/制裁”的快捷按钮；
- 不做“收益承诺/税务隐身”的页面。

---

## 6. 交付顺序

| 阶段 | 页面 |
|---|---|
| **P1** | PB-F01/02/03、PB-N01、PB-E01、`m3-family` 升级 |
| **P2** | PB-O01、PB-P01、PB-T01、PB-X01 |
| **P3** | X1–X5、PB-C01、`audit` 升级 |
| **P4** | 规模化/多语言/多辖区 |
