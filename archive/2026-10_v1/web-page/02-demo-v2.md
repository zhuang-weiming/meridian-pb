# 02 — Demo 说明：怎么跑、怎么点、哪些是真的

> 代码在根目录 `demo/`（中文，source of truth）与 `demo-en/`（英文镜像）。
> 演示数据；不构成投资/税务/法律建议。

---

## 1. 运行

```bash
cd /Users/weimingzhuang/Documents/source_code/meridian-pb/demo
python3 -m http.server 8766
# open http://localhost:8766/index.html
```

英文：

```bash
cd ../demo-en
python3 -m http.server 8767
# open http://localhost:8767/index.html
```

校验：

```bash
node check.js
node render-check.js
```

> 中英对齐（2026-10-26 审阅修正后）：`demo/` 与 `demo-en/` 均为 **34 条路由**（demo-en 补齐 `m3-family` 家庭工作台与 `m3-cases` 案件工作台英文化，并植入 households/persons/relationships/consents/familyGoals/cases 数据层）。两国 `check.js` 均含 household 数据闭环、页面引用图（页内所有跳转必须解析到已注册路由）与虚构发行人守护（质押/估值页只允许 AI Terra Ltd (illustrative)，禁止绑定真实公司数据）。

---

## 2. 角色

顶部 `Role`：

- **Client**：自己的提案/邀请/信托报告；看不到内部笔记/评分/价格。
- **RM**：自己客户；税号掩码；发起提案/融资/税务。
- **IC**：配置/压力/决策卡；不释放订单。
- **Compliance**：全量只读+审批/解密；不改订单。
- **Credit**：融资/估值；不看信托分配。
- **Trustee**：信托结构/预算/税务台账。
- **Vendor**：只看 RFP 与自己的投标；看不到客户姓名/持仓/其他报价。

---

## 3. 关键路由

| 路由 | 用途 | 旅程 |
|---|---|---|
| `#/m3-family` | 家庭工作台：关系/目标/授权/可执行 | S1/S2/X1/X2 |
| `#/m3-hub` | 服务/邀请：MIT/Athens/女性/慈善/搬迁 | S2/S5 |
| `#/m1-dashboard` | 提案收件箱/客户 360 | S1/S4 |
| `#/m1-proposal` | 目标→约束→三套方案→TES | S1/S4 |
| `#/m1-execution` | 逐行执行蓝图 | S1/S4 |
| `#/m1-compliance` | 四维合规/适当性/披露 | S1/S4 |
| `#/m1-orders` | 母单/子单/成交/TCA | S1/S4 |
| `#/m2-allocation` | 配置/IPS | S1/S5 |
| `#/m2-stress` | 压力测试 | 韧性 |
| `#/m2-backtest` | 含成本/样本外 | 韧性 |
| `#/m2-decision` | RM 决策卡 | 韧性 |
| `#/m3-cases` | 案件工作台 | S3/X1–X5 |
| `#/m3-financing` | 融资驾驶舱 | S2/S4 |
| `#/m3-taxlegal` | 税务/法律义务日历；第三个 tab「RM 指引/合作伙伴」 | S3/X4 |
| `#/m3-journeys` | J2 创始人 / J3 创作者 / J4 女性 一页 blueprint；可跳转现有页面 | J2/J3/J4 |
| `#/m3-family-office` | Family Office Dashboard：合并/IPS/服务/治理 | J6 |
| `#/m4-founder` | 创始人 360 | S4 |
| `#/m4-valuation` | 估值/LTV/40% 触发 | S4 |
| `#/m4-pledge` | 押 vs 卖 | S4 |
| `#/m4-trust` | 信托/预算/税务台账 | S4/S5 |
| `#/m4-private-assets` | Private Asset Lifecycle：Asset Intake / Valuation Governance / Pledge & Credit / Capital Calls / Earn-Outs / Obligation Calendar（native English fields） | J2 |
| `#/m5-intake` | 税务案件 | S4/X4 |
| `#/m5-profile` | 税务画像/Nexus | S4/X4 |
| `#/m5-scenarios` | 情景比较 | S4 |
| `#/m5-substance` | 反避税/实质/CRS | S4/X4 |
| `#/m5-advisor` | 内部复核/RM 决策 | S4 |
| `#/client-portal` | 客户门户 | 全部 |
| `#/vendor-portal` | Vendor 投标 | 服务 |
| `#/audit` | 审计/证据/模型/访问 | X1–X5 |

---

## 4. 哪些是“真计算”

| 功能 | 说明 |
|---|---|
| TES | `0.25 cost + 0.20 tax + 0.20 time + 0.20 impact + 0.15 ease` |
| 押 vs 卖 | `S = C/[1−t(1−B/V)]`、终端财富、盈亏平衡、−40% |
| LTV/覆盖率 | `额度=可贷值×LTV`、`覆盖率=可贷值/额度` |
| Haircut/Lendable Value | `可贷值=市值×(1−haircut)` |
| 订单拆单 | 执行蓝图 → 母单/子单；check.js 断言 |
| 回测指标 | CAGR/波动/最大回撤/Sharpe；含成本 |
| 放行条件 | 审批+电子签+同一版本 |
| 信托预算 | 合计/准备金覆盖率 |

其他（压力/回测/订单/税务）为演示数据，不是实时行情/真实模型。

---

## 5. 已知缺口

- 无后端；localStorage；刷新保留。
- FamilyGoal/Consent/Relationship/Case 为演示对象。
- M1 放行是前台演示，不是后台工作流。
- X1/X2（失能/身故）完整页面未建；当前用 `m3-cases`/`m3-family` 模拟。
- 家办 dashboard/next-gen 独立账户/trust-estate 页面需新建。
- 金额/税率/机构均为演示。

---

## 6. 演示顺序

见 [`../03_journeys/03-demo-script.md`](../03_journeys/03-demo-script.md)：

> 家族肖像 → 教育/复利 → 二代/MIT → 跨境 → 退出/家办 → 韧性 → 压力（失能/身故/欺诈）→ 收尾。

**不要**按旧的“失能/身故开场”讲。
