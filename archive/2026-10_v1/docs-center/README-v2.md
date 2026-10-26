# HSBC Private Bank — 文档中心（v2.0）

> 本目录是 **2026-10 之后唯一“当前有效”的文档树**。
> 旧版 `01_personas`、`02_architecture`、`03_webpage_design` 已迁入 `archive/2026-10_v1/`；可查，但不再作为设计依据。
> 性质：内部设计输入，不构成法律、税务或投资建议。

---

## 0. 这一版为什么重写

上一版（v1.5）回答的是“Avaloq 缺什么、我们要补什么”；这一版要回答的是：

1. **Ida Liu 上任后，HSBC Private Bank 到底想成为什么样的私行？**
2. **这个方向需要什么样的 core banking 能力，而不只是“更多页面/更多功能”？**
3. **如何用“好结果”的旅程打动人，而不是用失能、身故、诉讼、监狱这些“坏结果”开场？**
4. **Avaloq 的真实能力边界是什么？哪些必须保留、哪些必须新建、哪些根本不该由银行做？**

一句话：

> **从“以账户为中心的私行核心”转向“以家族生命周期为中心的私行核心”；以 Avaloq 为参考，重写为自有核心，不续订 Avaloq。**

---

## 1. 阅读路径

| 你是谁 | 先读 | 再读 |
|---|---|---|
| **CEO / 战略 / 董事会** | [`00_vision/00-executive-answer.md`](00_vision/00-executive-answer.md) | [`00_vision/01-ida-liu-playbook.md`](00_vision/01-ida-liu-playbook.md)、[`02_architecture/01-core-capability-model.md`](02_architecture/01-core-capability-model.md) |
| **业务负责人 / RM** | [`03_journeys/00-journey-portfolio.md`](03_journeys/00-journey-portfolio.md) | [`03_journeys/01-sunny-journeys.md`](03_journeys/01-sunny-journeys.md)、[`03_journeys/03-demo-script.md`](03_journeys/03-demo-script.md) |
| **产品 / 科技 / 架构** | [`02_architecture/01-core-capability-model.md`](02_architecture/01-core-capability-model.md) | [`02_architecture/02-avaloq-boundary.md`](02_architecture/02-avaloq-boundary.md)、[`02_architecture/03-data-model.md`](02_architecture/03-data-model.md) |
| **合规 / 法务 / 风险** | [`03_journeys/02-stress-journeys.md`](03_journeys/02-stress-journeys.md) | [`02_architecture/02-avaloq-boundary.md`](02_architecture/02-avaloq-boundary.md)、[`01_evidence/05-glossary.md`](01_evidence/05-glossary.md) |
| **做 Demo / 汇报** | [`03_journeys/03-demo-script.md`](03_journeys/03-demo-script.md) | [`04_solution/02-demo.md`](04_solution/02-demo.md)、[`04_solution/05-workbench.md`](04_solution/05-workbench.md)、[`03_journeys/11-workbench-journeys.md`](03_journeys/11-workbench-journeys.md) |
| **查术语** | [`01_evidence/05-glossary.md`](01_evidence/05-glossary.md) | — |

---

## 2. 目录

```
docs/
├─ 00_vision/                     # 为什么、为谁、什么算成功
│  ├─ README.md
│  ├─ 01-ida-liu-playbook.md      # Ida Liu 的公开动作 → 核心系统含义
│  ├─ 02-family-wealth-lifecycle.md
│  └─ 03-success-cases.md         # HSBC / UBS / Citi / SCB / Avaloq 的正向案例
├─ 01_evidence/                   # 证据，不是观点
│  ├─ README.md
│  ├─ personas/                   # 21 个公开人物/家族案例（v3.5）
│  ├─ 05-glossary.md              # POA/CRS/FATCA/trustee/PCG…
│  ├─ 06-case-law.md              # 公开法律卷宗（压力证据）
│  └─ 07-industry-mechanics.md    # 五大机构的产品/运营机制
├─ 02_architecture/               # 新核心长什么样
│  ├─ README.md
│  ├─ 01-core-capability-model.md
│  ├─ 02-avaloq-boundary.md
│  ├─ 03-data-model.md
│  ├─ 04-roadmap.md
│  └─ 05-avaloq-replacement-business-case.md
├─ 03_journeys/                   # J1–J10 旅程组合；S/X 场景；Pilot
│  ├─ README.md
│  ├─ 00-journey-portfolio.md
│  ├─ 01-sunny-journeys.md
│  ├─ 02-stress-journeys.md
│  ├─ 03-demo-script.md
│  ├─ 04-real-family-pilot.md
│  ├─ 05-j2-founder.md
│  ├─ 06-j3-creator.md
│  ├─ 07-j4-women.md
│  ├─ 08-j2-real-cases-and-peer-solutions.md
│  ├─ 09-j6-family-office.md
│  ├─ 10-j8-trust-continuity.md
│  └─ 11-workbench-journeys.md
└─ 04_solution/                   # 模块、页面、Demo、Workbench
   ├─ README.md
   ├─ 01-module-map.md
   ├─ 02-demo.md
   ├─ 03-rm-tax-guide.md
   ├─ 04-five-initiatives-validation.md
   └─ 05-workbench.md
```

---

## 3. 五个“先记住”的判断

1. **Ida 的方向是 J1 旗舰，但不是全部。** 家族关系/代际/治理/跨境是 J1；还需要 J2 创始人、J3 创作者、J4 女性、J5 跨境、J6 家办、J7 核心 HNW，以及 J8 信任/J9 RM/J10 伙伴。核心系统必须把“家族”和“多旅程”都变成可服务、可授权、可衡量的一等对象。
2. **阳光旅程先讲“家族目标如何实现”，压力旅程后讲“出了事银行如何守住”。** 亚洲客户不喜欢一上来讲身故/失能/监狱；但压力能力仍是信任的底座，只是放在第二幕。
3. **Avaloq 不是“没有能力”，而是“能力在交易/账本/单据层”。** 它有 DOC/WFC/TASK、BP/REL、TAX2、COLLAT、AFS；它不是家族治理、法律授权、遗产案件、私股生命周期平台。目标是替换 L0–L2；过渡期先用 Avaloq 做 L0。
4. **税务不要写成“银行代客报税”。** Avaloq TAX2 是在自己的交易/事件上做税计算、预扣与记录；它看不到客户在行外的收入、实体、信托与资产。银行应做“adviser-ready tax data pack”，不是报税代理。
5. **私行 core banking 的“核心”不是 ledger，而是“家族—授权—事件—证据”的主键。** 这是 HSBC 真正可能差异化、且 Avaloq 不擅长的地方。

---

## 4. 与旧版的关系

| 旧版 | 处理 | 原因 |
|---|---|---|
| `01_personas` v3.5 | 移至 [`01_evidence/personas/`](01_evidence/personas/) | 仍是最重要的公开人物/家族证据；保留原 HTML |
| `02_architecture` v1.5 | 移至 `archive/2026-10_v1/02_architecture/` | “Avaloq 必须平替”的叙事过强；税务/私股/Avaloq 能力判断需修正 |
| `02.1_user_jounery` v1 | 随 `02_architecture` 归档 | D1 把失能/身故混在一起；压力旅程开场不符合亚洲语境 |
| `03_webpage_design` v1.4 | 移至 `archive/2026-10_v1/03_webpage_design/` | 48 页旧规格仍可支撑现有 demo，但不再作为新架构依据 |
| `demo/`、`demo-en/` | 保留在根目录 | 现有可点击原型；新脚本按“阳光在前、压力在后”重排 |
| `.research/` | 移至 `archive/2026-10_v1/research/` | 39MB 原始取证；不进入当前文档树 |

> 归档说明见 `archive/2026-10_v1/README.md`。旧文档中的相对链接可能失效，以本目录为准。

---

## 5. 版本与维护

| 版本 | 日期 | 变更 |
|---|---|---|
| v2.0 | 2026-10-26 | 以 Ida Liu 的家族/代际/治理/跨境方向重写；Avaloq 能力按源码审计修正；阳光旅程前置；新增术语表、正向案例、核心能力模型 |
| v1.5 | 2026-10-23 | 旧版：25 痛点 / 9 类 / 18 模块 / 7 条旅程；已归档 |

维护规则：

- 新增事实必须带来源与“证据等级”（A 法院/监管、B 官方/年报、C 媒体/访谈、D 设计假设）。
- 任何“Avaloq 不能”必须能指到源码/产品文档；否则写“待验证”。
- 任何“客户成功案例”必须区分“银行公开案例”“公开家族案例”“设计假设”。
- 每季度复核一次：Ida 战略、Avaloq roadmap、监管变化、demo 脚本。
