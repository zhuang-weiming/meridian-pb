# HSBC Private Bank — Family Lifetime Core（v3.0）

> 四个交付物，一条主线：**从“以账户为中心的私行核心”转向“以家族生命周期为中心的私行核心”；以 Avaloq 为能力参考与迁移来源，自研重写，不续订。**
>
> 性质：内部设计输入，不构成法律、税务或投资建议。

---

## 0. 先看哪里

| 交付物 | 目录 | 先读 | 回答什么 |
|---|---|---|---|
| **① User journey** | [`01-user-journey/`](01-user-journey/README.md) | [旅程组合](01-user-journey/03-portfolio/00-journey-portfolio.md) · [页面总映射](01-user-journey/PAGE-MAP.md) | 为谁、为什么、什么算好、先做哪条 |
| **② Functional architecture** | [`02-functional-architecture/`](02-functional-architecture/README.md) | [功能架构图](02-functional-architecture/functional-architecture.html) · [能力模型](02-functional-architecture/01-core-capability-model.md) | 一主键 / 六层 / 十二域；Avaloq 边界与替换论证 |
| **③ Web page** | [`03-web-page/`](03-web-page/README.md) | [客户旅程](http://localhost:8791/03-web-page/client-journey.html) · [运营工作台](http://localhost:8791/03-web-page/rm-workbench.html) | 客户看到什么；RM/COO 怎么运营、字段/状态/证据是什么 |
| **④ Video and Movie** | [`04-video-and-movie/`](04-video-and-movie/README.md) | [12 分钟主版脚本](04-video-and-movie/12-minute-master-script.md) · [5 分钟版](04-video-and-movie/5-minute-elevator-script.md) | 19 镜/9 镜的完整口播、运镜、人物内心与制作规格 |

旧版与中文 Demo 已归档：[`archive/2026-10_v1/`](archive/2026-10_v1/README.md)。

---

## 1. 一句话

> **Avaloq 不续订。** 参考它的账本、交易、支付、抵押与 TAX2 事件能力，迁移历史；新核心自研，主键不是 `client_id`，而是 **Family × Party × Role × Authority × Event × Evidence**。

**为什么不是“换一个供应商”：**

- 旧核心能回答“账户里有什么”，回答不了“这个家族谁有权、依据什么、到何时、在哪个辖区、下一步谁做、证据在哪”。
- 五个经营问题（IPO→PB、身故 12 个月、家族 onboarding、客户毛利、失败交易）都卡在同一个地方：**事件、授权、证据没有对象化**。
- 新核心的差异化在 **L2 生命周期层**；L0 账本自研重写，不长期双核。

---

## 2. 三分钟路线

1. **看一张图**：[Functional architecture](02-functional-architecture/functional-architecture.html)（一主键 / 六层 / 十二域）。
2. **看一张表**：[PAGE-MAP](01-user-journey/PAGE-MAP.md)（34 条客户路由 + 21 页工作台 ↔ 旅程 ↔ 文档 ↔ 影片镜头）。
3. **看两部片**：[12 分钟](04-video-and-movie/12-minute-master-script.md) / [5 分钟](04-video-and-movie/5-minute-elevator-script.md)（完整台词，不是分镜计划）。

---

## 3. 运行 Web 原型

```bash
cd /Users/weimingzhuang/Documents/source_code/meridian-pb
python3 -m http.server 8791
```

- 客户 / 顾问旅程：<http://localhost:8791/03-web-page/client-journey.html>（34 路由，`?wipe=1` 清场）
- RM / COO 运营工作台：<http://localhost:8791/03-web-page/rm-workbench.html>（21 页，`?record=1` 录屏模式）

校验：

```bash
cd 03-web-page/client && node check.js && node render-check.js
cd ../workbench && node check.js
```

当前基线：client 34 routes / 52 renders；workbench 21 pages / 21 组双语台词 / 5 个客户 P&L 对账。

---

## 4. 这一版解决了什么

| 旧问题 | v3.0 的答案 |
|---|---|
| **视频只有“计划”，没有完整台词** | 12 分钟 19 镜、5 分钟 9 镜，每镜写死画面、运镜、屏幕动作、完整英文口播、中文对照、人物内心、转场；附提词器版与录制清单 |
| **demo 和 workbench 为什么分开** | 合并到 `03-web-page/`：`client-journey.html`（客户/顾问）与 `rm-workbench.html`（RM/COO），两个角色、一个文件夹、一套口径 |
| **journeys 文档和 HTML 对不上** | 重排为 User journey 四层（vision / evidence / portfolio / blueprints / scenarios / pilot / ops map），新增 `PAGE-MAP.md` 明确“不是一一对应” |
| **功能架构图被删了** | 恢复并升级为矢量图：`functional-architecture.svg` + 可浏览/打印页；旧 7 层/18 模块图保留在 archive，并附能力对照 |
| **中文 demo 两套路由漂移** | 中文版归档；英文 `client-journey.html` 为唯一维护版本 |
| **roadmap 干扰当前判断** | 归档，不在主目录 |

---

## 5. 命名与证据政策

- **公众人物**只在公开案例叙述层出现，只引用公开事实；**不表示是本行客户**。
- **账户级记录全部虚构**：workbench 使用 He family / UK creator family / AI founder family / Ashworth family；demo 使用 Chen / He / Lin / Wang 四组家庭。
- **公开案例复核周期**：季度；当前 as of **2026-10-26**。
- **金额**：按当地货币展示；决策前提供目标货币折算；客户时间按 **Asia/Hong_Kong**。
- **税务口径**：不“代客报税/替客户申报”；只做 tax data pack、预扣、CRS/FATCA、顾问责任矩阵。
- **证据等级**：A 法院/监管；B 官方/年报/产品文档；C 媒体/访谈/行业报告；D 设计假设。

---

## 6. 目录树

```text
.
├─ README.md
├─ 01-user-journey/
│  ├─ README.md
│  ├─ PAGE-MAP.md
│  ├─ 01-vision/
│  ├─ 02-evidence/            ← personas 保留
│  ├─ 03-portfolio/
│  ├─ 04-blueprints/
│  ├─ 05-scenarios/
│  ├─ 06-pilot/
│  └─ 07-operations-map/
├─ 02-functional-architecture/
│  ├─ README.md
│  ├─ functional-architecture.svg / .html
│  ├─ 01-core-capability-model.md
│  ├─ 02-avaloq-boundary.md
│  ├─ 03-data-model.md
│  ├─ 05-avaloq-replacement-business-case.md
│  └─ solution/
├─ 03-web-page/
│  ├─ README.md
│  ├─ client-journey.html
│  ├─ rm-workbench.html
│  ├─ client/
│  └─ workbench/
├─ 04-video-and-movie/
│  ├─ README.md
│  ├─ 12-minute-master-script.md
│  ├─ 5-minute-elevator-script.md
│  └─ 20-minute-demo-narration-cn.md
└─ archive/
```

---

## 7. 边界

- 无后端；状态在 localStorage；无实时行情/核心系统/OMS。
- 银行数字（收入、成本、订单、失败率、estate cohort）为演示，需内部财务/运营校准；成本分摊、转移定价、收入确认需 Finance 签字。
- 公开案例只作结构参考；判例与监管事实以原文为准。
- 不构成法律、税务或投资建议；具体适用须当地律师/税务顾问确认。
