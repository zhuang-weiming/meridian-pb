# 03 — Web page：两个入口，一个产品

> 这里放同一套私人银行原型的两个**角色入口**。它们共用一套设计语言、同一套演示数据口径和同一条生命周期主线，但服务不同读者：
>
> - **`client-journey.html`** — 客户 / 顾问旅程（34 条路由）
> - **`rm-workbench.html`** — RM / COO 运营工作台（21 页）
>
> 所有客户、金额、机构、税率均为演示数据；公开人物只作结构参考，不表示是本行客户。

---

## 1. 为什么放在一个文件夹

| 问题 | 处理 |
|---|---|
| 为什么要分两个 HTML？ | **读者不同**：客户旅程回答“体验是什么样”；运营工作台回答“业务步骤、字段、状态、证据是什么”。一个入口无法同时服务这两种阅读方式。 |
| 为什么不放两个文件夹？ | 它们是同一个产品的两面，共用同一套对象（family / authority / event / evidence）与同一套数字口径；放一起才能保证一起改、一起校验。 |
| 为什么中文 demo 不在这里？ | 中文版已归档到 [`archive/2026-10_v1/demo-cn/`](../archive/2026-10_v1/demo-cn/README.md)；当前发布版以英文为唯一维护版本，避免两套路由漂移。 |

**角色分配：**

```
03-web-page/
├─ client-journey.html      # 客户 + 顾问：提案、压力测试、家族、私股、税务、门户
├─ rm-workbench.html        # RM + COO：IPO→PB、onboarding、身故、毛利、失败交易
├─ assets/                  # 两个入口共用：HSBC logo（SVG）
├─ client/                  # client-journey 的 JS / CSS / check（34 路由）
└─ workbench/               # rm-workbench 的 JS / CSS / check / 台词本（21 页）
```

---

## 2. 运行

在**仓库根目录**启动一次服务器，两个入口都可访问：

```bash
cd /Users/weimingzhuang/Documents/source_code/meridian-pb
python3 -m http.server 8791
```

- 客户旅程：<http://localhost:8791/03-web-page/client-journey.html>
- 运营工作台：<http://localhost:8791/03-web-page/rm-workbench.html>

也可以直接双击 HTML（纯静态，无构建、无依赖）。

### 录屏模式

| 入口 | 参数 | 效果 |
|---|---|---|
| `client-journey.html` | `?wipe=1` | 清空本地状态，回到干净演示 |
| `rm-workbench.html` | `?record=1` | 隐藏台词按钮/侧栏文档链/toast，字号提级 |
| 两个入口 | 1440×900 浏览器窗口 | 与分镜的构图一致 |

---

## 3. 客户旅程（34 条路由）

| 模块 | 路由 | 证明什么 |
|---|---|---|
| M1 提案 → 订单 | `m1-dashboard` … `m1-orders` | 提案层与执行层分离；WARN 不能静默通过；TCA 回写模板 |
| M2 量化实验室 | `m2-allocation` … `m2-decision` | 压力不是“最坏情况”；回测含成本/税/样本外；RM 做决定 |
| M3 服务与家族 | `m3-financing` … `m3-family-office` | 家庭成员各自同意；服务不是卖给一个人；家办是独立 operating model |
| M4 创始人与私股 | `m4-founder` … `m4-private-assets` | LTV 不是参数；质押≠免税；私股有估值—质押—退出生命周期 |
| M5 税务与跨境 | `m5-intake` … `m5-review` | 税务是数据包 + 责任矩阵 + 顾问协同，不是“代客报税” |
| 门户 | `client-portal` / `vendor-portal` / `audit` | 客户、供应商、审计三个视角看到的是不同的字段与证据 |

深链示例：

- RM 视角：`client-journey.html#/m1-dashboard`
- 客户视角：`client-journey.html?role=Client#/client-portal`
- 创始人案例：`client-journey.html#/m4-founder`
- 私股生命周期：`client-journey.html#/m4-private-assets`
- 家族工作台：`client-journey.html#/m3-family`

页面与旅程、文档、影片镜头的完整对应见 [`../01-user-journey/PAGE-MAP.md`](../01-user-journey/PAGE-MAP.md)。

视频电影实际 demo 的旅程（名称、痛点、persona、方案、IT 功能提升）见 [`../01-user-journey/00-journey-catalog.md`](../01-user-journey/00-journey-catalog.md)。

---

## 4. 运营工作台（21 页）

| 模块 | 页面 | 证明什么 |
|---|---|---|
| IPO & PB | `ipo-pipeline` / `ipo-company` / `ipo-valuation` / `ipo-handoff` | CIB 识别事件；PB 凭同意与合规墙承接；估值可解释 |
| Estate & Continuity | `estate-portfolio` / `estate-case` / `estate-authority` / `estate-outcomes` | 身故是多年流程；授权先于动作；结果可测 |
| Family Onboarding | `onboarding-family` / `-suitability` / `-templates` / `-first` | 配偶/二代独立同意，不绕过适当性 |
| Revenue & Margin | `revenue-cockpit` / `-client` / `-product` / `-rm` | 客户佣金不是毛利；RM 产能可解释 |
| Order Trust | `order-monitor` / `-failure` / `-recovery` / `-kpi` | 失败交易按原因、客户影响、RM KPI 计量 |

> 上表按**工作台导航顺序**排列；影片按“顺向 → 逆向”剪辑，所以 onboarding 镜头在 estate 之前，见 [`../04-video-and-movie/README.md`](../04-video-and-movie/README.md)。

每页有 **Speaker notes**（中英双语台词 + 屏幕动作 + 转场）。离线版：[`workbench/SPEAKER_NOTES.md`](workbench/SPEAKER_NOTES.md)。

---

## 5. 校验

```bash
cd 03-web-page/client && node check.js && node render-check.js
cd ../workbench && node check.js
```

当前基线：

- client：34 routes、52 次渲染、家庭/授权/引用图/虚构发行人断言全通过；
- workbench：21 pages、21 组双语台词、5 个客户 P&L 对账、订单/遗产事实一致。

---

## 6. 边界

- 无后端；状态保存在 localStorage，可重置。
- 金额、税率、课程、机构为演示；无实时行情、核心系统或 OMS。
- X1/X2（失能/身故）当前以 `m3-cases` + `m3-family` 预演；完整独立页面不在本版范围。
- 公开案例（DeepSeek、迈瑞、蓝思、Riverford、Unruly、梅艳芳遗产、FOS DRN-4737924、Lo 家族信托）只作结构参考，账户级记录全部为虚构家族。
- 不构成法律、税务或投资建议。
