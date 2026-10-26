# 00 — 愿景：从“服务一个富人”到“服务一个家族的生命周期”

> 这一章只回答三个问题：**为谁、为什么现在、什么算成功。**
> 不写功能清单；功能在 `02-functional-architecture/`，旅程在 `01-user-journey/`。

---

## 1. 一句话愿景

> **HSBC Private Bank 要成为“跨代家族财富的操作系统”：把投资、流动性、传承、治理、税务与跨境复杂度，装进一个以家族为单位、以事件为驱动、以证据为底座的长期关系里。**

不是“更大的 AUM”，不是“更多产品”，也不是“只服务一个家族旅程”。Ida 的家族/下一代是 **J1 旗舰**；完整旅程组合见 [`../03-portfolio/00-journey-portfolio.md`](../03-portfolio/00-journey-portfolio.md)。

---

## 2. 三个转变

| 从 | 到 | 对核心系统的含义 |
|---|---|---|
| **单一大客户** | **家族星座**：创始人、配偶、子女、孙辈、家族办公室、信托/基金会 | 客户主数据从 `client_id` 变成 `family + legal entity + role + consent` 的图 |
| **投资组合** | **家族目标与生命周期**：教育、创业、搬迁、退出、传承、慈善 | 目标/事件/义务成为一等对象，而不是营销标签 |
| **交易与产品** | **治理、证据与信任** | 授权、同意、决策、披露、审计可重放；压力时刻能证明 |

---

## 3. 为什么是现在

### 3.1 业务锚点

- HSBC 2025 年财富余额 **US$2.1tn**，其中亚洲 **US$1.2tn**；净新增投资资产 **US$80bn**（亚洲 US$39bn）；财富费收 **US$9.4bn（+24%）**。
- HSBC 2026 年 6 月末总资产 **US$3,438bn**，覆盖 **56** 个国家和地区。
- HSBC Trust and Fiduciary Services（TFS）1946 年进入香港/新加坡，2026 年 **80 年**；亚洲 **300+** 员工；过去五年 AUA **+40%**；2025 年 Prism Advisory 覆盖的信托 AUM **+50% YoY**；慈善信托每年捐出约 **US$75m**。
- HSBC Private Bank 2026 年 9 月新设 **Global Head of Family Offices**（Hannes Hofmann，来自 Citi），并同时在香港/新加坡推出/扩展 Institutional Family Office 服务。

### 3.2 客户结构锚点

- Capgemini 2025：未来几十年 **US$83.5tn** 将传给下一代（HSBC MIT 项目新闻稿引用）。
- HSBC 2026 女性财富报告：未来五年约 **40%** 全球可投资财富由女性控制，约 **US$113tn**；女性比男性更倾向于退休/子女教育/慈善，且 **9 个百分点**更可能支持慈善。
- HSBC 2025《Harmony through succession planning》：**1,798** 位企业家、10 个市场；**78%** 想保留家族企业，但 **52%** 没有接班计划；中国大陆/香港/台湾约 **2/3** 没有计划；**75%** 的多代企业家感到被支持去探索家族企业之外的路径。
- UBS GFO 2025：**317** 家 family offices，平均 **US$1.1bn**；**53%** 有传承计划；**43%** 认为培养下一代是最大挑战；只有 **26%** 从最初就咨询下一代。
- Citi 2026：服务 **1,800+** family offices；连续多年发布 Global Family Office Report；Family Office Leadership Program。
- SCB《The Great Repositioning》：**74%** 的 family office 专业人士观察到家族冲突上升；**87%** 认为更好的 succession planning 可节省数百万；**84%** 认为需要下一代参与。

### 3.3 竞争锚点

- UBS：Wealth Way（Liquidity / Longevity / Legacy）+ GFO 报告 + 全球家族办公室覆盖。
- Citi：Family Office Advisory + Private Capital Group + Global Family Office Report + Leadership Program。
- SCB：`Celebrating Life's Work` 系列（Dr Sun Huaiqing、William Heinecke、Wallapa Traisorat、Dr David Harilela 等）+ 170 年历史 + 50+ 市场。
- Avaloq：LGT（10 年 AUM +370%）、CMB Monaco（Avaloq + Aladdin Wealth 首家全集成）、BT Panorama（10+ 年 consolidation）、UnionBank、RBC Wealth Management Asia 等平台案例。

> 结论：**竞争已经从“谁的产品收益高”转向“谁能理解家族、跨代服务、跨境 orchestrate、并把信任证明出来”。**

---

## 4. 五条设计原则

1. **Family first, client second.** 先理解家族结构、角色、目标、治理，再谈账户与产品。Household 是服务视图，不是法律主体；信托/公司/受益人要分开。
2. **Sunny first, stress later.** Demo 与客户叙事先讲“教育、复利、创业、传承、慈善”的好结果；失能/身故/诉讼/监狱是第二幕的“信任证明”，不是开场。
3. **Advice, not advice-like.** 银行不做税务/法律意见；做数据、协调、证据、转介。每一句“建议”都要有责任边界。
4. **Evidence by design.** 授权、同意、决策、披露、支付、分配，全部可回答“谁、何时、依据什么、谁批准、给谁看”。
5. **Avaloq as reference, not as platform.** 参考它的交易/账本/单据/税务事件/抵押领域模型与源码审计结论；**自研重写为自有核心，不再续订 Avaloq**；目标是自有平台单核运行，不是永久双核。

---

## 5. 什么算成功（12–36 个月）

| 维度 | 指标 | 说明 |
|---|---|---|
| **家族关系** | 家族客户数、跨代客户数（≥2 代）、下一代激活率 | 不是单客户 AUM |
| **钱包份额** | 家族可投资资产覆盖率、跨实体产品渗透 | 需要客户授权数据 |
| **传承准备** | 完成家族宪章/治理工作坊/接班计划的比例 | 与 MIT/Athens/TFS 联动 |
| **下一代** | 23–30 岁课程完成率、独立账户开立、首次投资/慈善/创业 | 课程不是终点 |
| **家族办公室** | SFO 客户数、AUA、服务渗透（投资/信贷/信托/税务） | 与 Global Head of Family Offices 联动 |
| **跨境** | 跨 2+ 辖区的家族比例、跨境事件完成时间 | HK/SG/UK/CH/UAE/US |
| **信任** | 授权核验时间、0 无权支付、证据包完整率、投诉率 | 压力旅程的 KPI |
| **商业** | 家族层收入、留存率、转介率、下一代钱包份额 | 长期，不看单季 |

> 这些指标是设计目标，不是对外承诺；需要以内部数据校准。

---

## 6. 这一版不做什么

- 不把“家族办公室”当成“更富的私人客户”；它是不同的 operating model。
- 不把“下一代”当成营销名单；它需要独立 consent、独立账户、独立旅程。
- 不把“税务优化”做成“藏钱”；税务透明是底线。
- 不把“身故/失能”做成开场恐怖故事；它是压力测试，不是销售钩子。
- 不把“替换 Avaloq”当成目标；目标是客户生命周期能力，Avaloq 只是其中一层。

---

## 7. 往下读

- Ida Liu 的公开动作与核心系统含义：[`01-ida-liu-playbook.md`](01-ida-liu-playbook.md)
- 家族财富生命周期与旅程组合：[`02-family-wealth-lifecycle.md`](02-family-wealth-lifecycle.md)
- 正向成功案例：[`03-success-cases.md`](03-success-cases.md)
- 新核心能力模型：[`../../02-functional-architecture/01-core-capability-model.md`](../../02-functional-architecture/01-core-capability-model.md)
