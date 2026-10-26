# 05 — Operating Workbench：五个真实业务问题的 21 页工作台

> 目的：把“五个新思路”从观点变成可点击的业务步骤、字段、状态和指标。
> 位置：[`../../03-web-page/rm-workbench.html`](../../03-web-page/rm-workbench.html)；与客户旅程入口 [`../../03-web-page/client-journey.html`](../../03-web-page/client-journey.html) 分开：一个讲客户故事，一个做运营流程。
> 数据：公开案例只作结构参考；银行数字为演示；每页有 Data note。

---

## 1. 运行

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

每一页右上角有 **Speaker notes**，可打开中英文台词、屏幕动作和转场。离线版：[`../../03-web-page/workbench/SPEAKER_NOTES.md`](../../03-web-page/workbench/SPEAKER_NOTES.md)；源数据：[`../../03-web-page/workbench/scripts.js`](../../03-web-page/workbench/scripts.js)。

---

## 2. 五个模块

| 模块 | 页面 | 证明什么 |
|---|---|---|
| **1 · IPO & PB** | IPO & Wealth Event Pipeline · Company & Management · Pre-IPO Valuation · CIB → PB Handoff | CIB/MSS 识别财富事件；PB 在 consent/wall/KYC 后承接 |
| **2 · Estate & Continuity** | Estate Case Portfolio · Estate Case Timeline · Authority & Probate · 12-Month Outcomes | 身故是多年流程；授权、probate、资金和结果可测量 |
| **3 · Family Onboarding** | Family Onboarding · Suitability & Risk · Portfolio Templates · First Investment | 二代/配偶低门槛 onboarding，但不绕过适当性 |
| **4 · Revenue & Margin** | Revenue & Margin Cockpit · Client P&L · Product P&L · RM Scorecard | 客户佣金不是毛利；收入/成本/服务成本一起看 |
| **5 · Order Trust** | Order Monitor · Failure Detail · Recovery Workflow · Order KPI & Trust | 失败交易按原因/客户影响/RM KPI 可测量 |

---

## 3. 数据来源与边界

- 公开案例（仅作结构参考，as of 2026-10-26）：DeepSeek 2026 融资轮、Mindray/李西廷、Lens/周群飞、Riverford EOT、Unruly、梅艳芳遗产信托（2026-08-30 闭环）、FOS DRN-4737924、Lo 家族信托 / Tao Soh Ngun [2018] HKCFI 380。
- 命名政策：公众人物只出现在"公开案例"叙述里；账户级记录（订单、onboarding、客户 P&L）一律使用虚构演示家族（He family、UK creator family、AI founder family、Ashworth family）。
- 银行数字（收入、成本、订单、失败率、estate cohort）为演示数据，需内部财务/运营校准。
- 不主张任何公开人物是 HSBC 客户；不使用非公开客户数据。
- 每页 Data note 写清“哪些需要内部数据、哪些需要 consent、哪些只是演示”。

---

## 4. 与客户旅程入口的关系

| | `client-journey.html` | `rm-workbench.html` |
|---|---|---|
| 目的 | 客户旅程叙事、页面原型 | 运营步骤、字段、状态、指标 |
| 用户 | 客户/领导 | RM/COO/Finance/Operations/Compliance |
| 内容 | 教育/复利/二代/退出/信托/税务 | IPO→PB、estate 12 个月、onboarding、毛利、失败交易 |
| 数据 | 演示人物/金额 | 公开案例 + 演示银行数据 |

两者共用同一套设计输入，不互相替代；都放在 [`03-web-page/`](../../03-web-page/README.md)。
