# 01 — Vision：为什么、为谁、什么算好

> 本文件把原来的 5 份愿景文档合并为一份：一页愿景、执行答复、Ida playbook、家族生命周期、正向案例。
> 先看 A；B 是“七个问题的结论”；C–E 是论证与案例，不需要一次读完。

## 本文件结构

| 节 | 回答什么 | 原文件（已合并） |
|---|---|---|
| A | 为什么换核心、为谁、什么算好 | `01-vision/README.md` |
| B | 七个高频问题的直接答复 | `01-vision/00-executive-answer.md` |
| C | Ida Liu 的七个转变与十个系统要求 | `01-vision/01-ida-liu-playbook.md` |
| D | 家族财富生命周期：S1–S5 / X1–X5 | `01-vision/02-family-wealth-lifecycle.md` |
| E | 正向案例：谁做成了什么 | `01-vision/03-success-cases.md` |

---

## A. 一页愿景：从“账户中心”到“家族生命周期”

<!-- source: 01-user-journey/01-vision/README.md -->

> 这一章只回答三个问题：**为谁、为什么现在、什么算成功。**
> 不写功能清单；功能在 `02-functional-architecture/`，旅程在 `01-user-journey/`。

---

### 1. 一句话愿景

> **HSBC Private Bank 要成为“跨代家族财富的操作系统”：把投资、流动性、传承、治理、税务与跨境复杂度，装进一个以家族为单位、以事件为驱动、以证据为底座的长期关系里。**

不是“更大的 AUM”，不是“更多产品”，也不是“只服务一个家族旅程”。Ida 的家族/下一代是 **J1 旗舰**；完整旅程组合见 [`00-journey-catalog.md`](00-journey-catalog.md)。

---

### 2. 三个转变

| 从 | 到 | 对核心系统的含义 |
|---|---|---|
| **单一大客户** | **家族星座**：创始人、配偶、子女、孙辈、家族办公室、信托/基金会 | 客户主数据从 `client_id` 变成 `family + legal entity + role + consent` 的图 |
| **投资组合** | **家族目标与生命周期**：教育、创业、搬迁、退出、传承、慈善 | 目标/事件/义务成为一等对象，而不是营销标签 |
| **交易与产品** | **治理、证据与信任** | 授权、同意、决策、披露、审计可重放；压力时刻能证明 |

---

### 3. 为什么是现在

#### 3.1 业务锚点

- HSBC 2025 年财富余额 **US$2.1tn**，其中亚洲 **US$1.2tn**；净新增投资资产 **US$80bn**（亚洲 US$39bn）；财富费收 **US$9.4bn（+24%）**。
- HSBC 2026 年 6 月末总资产 **US$3,438bn**，覆盖 **56** 个国家和地区。
- HSBC Trust and Fiduciary Services（TFS）1946 年进入香港/新加坡，2026 年 **80 年**；亚洲 **300+** 员工；过去五年 AUA **+40%**；2025 年 Prism Advisory 覆盖的信托 AUM **+50% YoY**；慈善信托每年捐出约 **US$75m**。
- HSBC Private Bank 2026 年 9 月新设 **Global Head of Family Offices**（Hannes Hofmann，来自 Citi），并同时在香港/新加坡推出/扩展 Institutional Family Office 服务。

#### 3.2 客户结构锚点

- Capgemini 2025：未来几十年 **US$83.5tn** 将传给下一代（HSBC MIT 项目新闻稿引用）。
- HSBC 2026 女性财富报告：未来五年约 **40%** 全球可投资财富由女性控制，约 **US$113tn**；女性比男性更倾向于退休/子女教育/慈善，且 **9 个百分点**更可能支持慈善。
- HSBC 2025《Harmony through succession planning》：**1,798** 位企业家、10 个市场；**78%** 想保留家族企业，但 **52%** 没有接班计划；中国大陆/香港/台湾约 **2/3** 没有计划；**75%** 的多代企业家感到被支持去探索家族企业之外的路径。
- UBS GFO 2025：**317** 家 family offices，平均 **US$1.1bn**；**53%** 有传承计划；**43%** 认为培养下一代是最大挑战；只有 **26%** 从最初就咨询下一代。
- Citi 2026：服务 **1,800+** family offices；连续多年发布 Global Family Office Report；Family Office Leadership Program。
- SCB《The Great Repositioning》：**74%** 的 family office 专业人士观察到家族冲突上升；**87%** 认为更好的 succession planning 可节省数百万；**84%** 认为需要下一代参与。

#### 3.3 竞争锚点

- UBS：Wealth Way（Liquidity / Longevity / Legacy）+ GFO 报告 + 全球家族办公室覆盖。
- Citi：Family Office Advisory + Private Capital Group + Global Family Office Report + Leadership Program。
- SCB：`Celebrating Life's Work` 系列（Dr Sun Huaiqing、William Heinecke、Wallapa Traisorat、Dr David Harilela 等）+ 170 年历史 + 50+ 市场。
- Avaloq：LGT（10 年 AUM +370%）、CMB Monaco（Avaloq + Aladdin Wealth 首家全集成）、BT Panorama（10+ 年 consolidation）、UnionBank、RBC Wealth Management Asia 等平台案例。

> 结论：**竞争已经从“谁的产品收益高”转向“谁能理解家族、跨代服务、跨境 orchestrate、并把信任证明出来”。**

---

### 4. 五条设计原则

1. **Family first, client second.** 先理解家族结构、角色、目标、治理，再谈账户与产品。Household 是服务视图，不是法律主体；信托/公司/受益人要分开。
2. **Sunny first, stress later.** Demo 与客户叙事先讲“教育、复利、创业、传承、慈善”的好结果；失能/身故/诉讼/监狱是第二幕的“信任证明”，不是开场。
3. **Advice, not advice-like.** 银行不做税务/法律意见；做数据、协调、证据、转介。每一句“建议”都要有责任边界。
4. **Evidence by design.** 授权、同意、决策、披露、支付、分配，全部可回答“谁、何时、依据什么、谁批准、给谁看”。
5. **Avaloq as reference, not as platform.** 参考它的交易/账本/单据/税务事件/抵押领域模型与源码审计结论；**自研重写为自有核心，不再续订 Avaloq**；目标是自有平台单核运行，不是永久双核。

---

### 5. 什么算成功（12–36 个月）

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

### 6. 这一版不做什么

- 不把“家族办公室”当成“更富的私人客户”；它是不同的 operating model。
- 不把“下一代”当成营销名单；它需要独立 consent、独立账户、独立旅程。
- 不把“税务优化”做成“藏钱”；税务透明是底线。
- 不把“身故/失能”做成开场恐怖故事；它是压力测试，不是销售钩子。
- 不把“替换 Avaloq”当成目标；目标是客户生命周期能力，Avaloq 只是其中一层。

---

### 7. 往下读

- Ida Liu 的公开动作与核心系统含义：本文件 C 节
- 家族财富生命周期与旅程组合：本文件 D 节
- 正向成功案例：本文件 E 节
- 新核心能力模型：[`../02-functional-architecture/01-capability-and-data-model.md`](../02-functional-architecture/01-capability-and-data-model.md)

---

## B. 执行答复：七个问题

<!-- source: 01-user-journey/01-vision/00-executive-answer.md -->

> 这是本轮工作的“一页纸答案”。详细论证见各链接。

---

### 1. 按 Ida 的思路，user journey 应该怎么改？

**结论：Ida 的“家族 + 代际 + 治理 + 跨境 + 好结果”是 J1 旗舰；但不是全部。需要 7 条客户旅程 + 3 条横向/使能旅程。**

- **J1 家族/下一代**（Ida 旗舰）：家族图、治理、下一代、家办、跨境。
- **J2 创始人财富事件**：Pre-IPO/退出/流动性/税后/信托。
- **J3 创作者/媒体/体育**：IP/版税/短收入窗口/长期资产负债表。
- **J4 女性与财富**：配偶/寡妇/女创始人；独立决策。
- **J5 跨境家庭与迁徙**：多实体/税务/安顿/consent。
- **J6 家族办公室**：合并/投资治理/CIB/运营。
- **J7 核心高净值人生目标**：教育/退休/复利/数字/成本-to-serve。
- **J8 信任与连续性**（横向）：失能/身故/离婚/制裁/欺诈/税务补救。
- **J9 RM/顾问工作流**（使能）、**J10 专业伙伴/生态**（使能）。

**优先级（2026-10-26 确认）**：**P0 = J1/J2/J6（客户）+ J8（横向）**；**P0 使能 = J9/J10**；P1 = J5/J4/J3；P2 = J7。
J2/J3/J4 一页 blueprint：[J2](03-blueprints.md)｜[J3](03-blueprints.md)｜[J4](03-blueprints.md)。

详见 [`00-journey-catalog.md`](00-journey-catalog.md)、本文件 C 节、本文件 D 节。

---

### 2. POA / CRS / FATCA / trustee / PCG 等术语

**结论：已建统一术语表，含 80+ 词、12 组易混词、英文/中文/解释/为什么重要。**

- POA：授权书；EPA/LPA：持久/永久授权；probate：遗产认证；trustee：受托人；executor：遗嘱执行人。
- CRS：OECD 多边金融账户信息自动交换；FATCA：美国海外账户合规；withholding：预扣；tax filing：申报。
- PCG：在 Citi 指 Private Capital Group；换机构可能指 Private Client Group，必须看上下文。
- LTV/Haircut/Lendable Value：三个不同分母；不要混。
- SFO/MFO：单一家族/多家族办公室；不是“更富的客户”。

详见 [`02-evidence.md`](02-evidence.md)。

---

### 3. Avaloq 的 TAX2/报告，上一版说错了吗？

**结论：上一版把“交易税/预扣”说成“个人税务申报”，过宽；已修正。**

- `TAX2_EVT#CALC` 在 Avaloq 自己的交易/事件/持仓上，按 tax type、日期、BU、object、direction、currency 等选规则，计算/预扣/记录。
- 它看不到客户行外收入、私股、信托分配、海外实体；不是 UK/HK 个人综合所得税申报平台。
- EasyTax 是瑞士各州申报生态；CRS/FATCA 是账户报告，不是个人税表。
- 正确：Avaloq = 银行侧交易税/预扣/报告引擎；银行 = tax data pack + 预扣 + 报告 + 顾问协同。
- 同时：Avaloq 的目标是**替换**；参考其能力，自研重写为自有核心；**不续订 Avaloq**；迁移期只做数据抽取/对照，不作为长期平台。

详见 [`../02-functional-architecture/02-avaloq-boundary-and-business-case.md`](../02-functional-architecture/02-avaloq-boundary-and-business-case.md)、[`../02-functional-architecture/02-avaloq-boundary-and-business-case.md`](../02-functional-architecture/02-avaloq-boundary-and-business-case.md)。

---

### 4. 失能/身故/监狱是否应该在 Demo 后面？

**结论：对。压力旅程放在第二/第三幕；但不要删。**

- 亚洲客户对身故/失能/监狱敏感；开场讲会防御。
- 私行卖“家族更好”，不是“出事收尸”。
- 压力能力是信任底座：合法、快速、有证据。
- 阳光旅程先讲教育/复利/创业/跨境/家办；压力旅程后讲失能/身故/离婚/制裁/税务/欺诈。

详见 本文件 D 节、[`../04-video-and-movie/20-minute-demo-narration-cn.md`](../04-video-and-movie/20-minute-demo-narration-cn.md)。

---

### 5. 正向成功案例：谁做成了什么？

**结论：有，但要区分“银行公开案例/公开家族/平台/设计假设”。**

- **HSBC**：MIT Sloan Future Family Leaders（23–30 岁，6 周）、Athens 论坛 60+ 客户、Global Head of Family Offices、TFS 80 年（AUA 5 年 +40%、Prism 信托 AUM +50% YoY、慈善年捐约 US$75m）、HSBC Access、女性财富报告。
- **UBS**：Wealth Way（Liquidity/Longevity/Legacy）、GFO 2025（317 家、53% 有传承计划、43% 下一代挑战）。
- **Citi**：Family Office Advisory 1,800+ 家办、Global Family Office Report、Leadership Program、Private Capital Group 1,400/77 国。
- **SCB**：`Celebrating Life's Work`（Dr Sun Huaiqing、William Heinecke、Wallapa Traisorat、Dr David Harilela、Guru）；The Great Repositioning（74% 冲突、87% 传承规划省数百万、84% 下一代）。
- **Avaloq**：LGT（10 年 AUM +370%）、CMB Monaco（Avaloq+Aladdin 首家全集成）、BT Panorama（10+ 年整合）、UnionBank、RBC Asia、Emirates Investment Bank。
- **公开家族模式**：Hermès、Lego/KIRKBI、Tata（长期治理/家族办公室/信托），但不是银行客户。

详见 本文件 E 节。

---

### 6. HSBC 新版本 core banking 能力/功能是什么？

**结论：不是一个 ledger，而是“一个主键 + 六个事实 + 十二个能力域”。**

- 主键：`Family`。
- 六个事实：`Party`、`Authority`、`Goal`、`Event`、`Asset`、`Evidence`。
- 十二域：家族/法律主体、角色/授权/同意、目标/事件、治理/下一代、家办、投资/顾问、交易/托管/账本、流动性/信贷/私股、信托/遗产/保险、税务/跨境/监管、慈善、服务/生态/渠道；加数据/证据/AI、商业衡量。
- 分层：自研核心 L0–L2（参考 Avaloq 能力）；体验 L3；生态 L4；Avaloq 仅参考/迁移来源，不续订。
- 不建：全量替换 Avaloq、全球个人报税、通用 AI、生活方式商城、绕过法律的体验。

详见 [`../02-functional-architecture/01-capability-and-data-model.md`](../02-functional-architecture/01-capability-and-data-model.md)。

---

### 7. 文档结构（2026-10-26 重组后）

**结论：四个交付物不变；01/02 由“多目录小文件”收敛为少数主文档，旧的逐篇文件已合并，不再并行维护。**

- `01-user-journey/`：9 份文档（含 `PAGE-MAP.md`）；先看 `00-journey-catalog.md`，再看 `01-vision.md`、`03-blueprints.md`、`05-scenarios.md`。
- `02-functional-architecture/`：5 份文档；`README.md` 看架构图，`01-capability-and-data-model.md` 看能力/数据，`02-avaloq-boundary-and-business-case.md` 看替换，`03-solution-map.md` 看页面/Workbench。
- `03-web-page/`：客户旅程 `client-journey.html` + 运营工作台 `rm-workbench.html`。
- `04-video-and-movie/`：12 分钟主版、5 分钟电梯版、18–20 分钟中文讲解稿。
- `archive/2026-10_v1/`：旧架构图、旧视频计划、roadmap、中文 Demo、旧 README。

详见 [`../README.md`](../README.md)、[`../archive/2026-10_v1/README.md`](../archive/2026-10_v1/README.md)。

---

### 一句话

> **先把“家族”做成系统，再把“好结果”讲成旅程，最后用“压力旅程”证明信任；以 Avaloq 为参考，重写为自有核心，不续订 Avaloq。**

---

## C. Ida Liu playbook：七个转变与十个系统要求

<!-- source: 01-user-journey/01-vision/01-ida-liu-playbook.md -->

> 依据：HSBC 官方新闻稿、公开报道、HSBC 2025/2026 年报与报告；不评价个人，只分析可观察的动作与对核心系统的含义。
> 事实等级：A=法院/监管；B=公司官方/年报；C=媒体/访谈；D=设计假设。本文以 B/C 为主。

---

### 0. 一句话

> Ida Liu 做的不是“换一批产品”，而是把私行的经营单位从 **单一客户** 改成 **家族**，把服务周期从 **季度 AUM** 改成 **代际**，把竞争点从 **收益** 改成 **治理、跨境与信任**。
> 这对核心系统的要求是：**家族图、角色/授权、目标/事件、治理/下一代、家族办公室、跨境、证据**——而不是再做一个产品货架。

---

### 1. 时间线：她上任后到底做了什么

| 时间 | 事件 | 事实 | 对核心系统的含义 |
|---|---|---|---|
| **2025-12-22** | HSBC 宣布任命 Ida Liu 为 CEO | 2026-01-05 生效；此前 Citi Private Bank 全球主管；25+ 年；重点：UHNW、跨境、全球增长 | 战略从“区域私行”转向“全球 UHNW 家族” |
| **2026-02-18** | 女性财富报告 | 未来五年约 40% 全球可投资财富由女性控制（约 US$113tn）；女性更关注退休/子女教育/慈善；女性创业者少 6pp 有导师 | 女性/配偶不是“附属”，是独立决策者与客户 |
| **2026-05** | Athens Future Family Leaders Forum | 60+ 客户参加；Family Leaders 项目旗舰活动 | 下一代是“关系入口”，不是 marketing event |
| **2026-09-09** | 新设 Global Head of Family Offices | Hannes Hofmann（前 Citi Family Office Group 全球主管）9/10 上任；同时任命 Head of US Private Bank（Cayman Wills，前 Citi） | 家族办公室成为独立业务线，不再是 UHNW 的子标签 |
| **2026-06-09 / 09-15** | HSBC Access | UHNW/家办可投科技/初创、direct/co-invest/VC；HK 首发、9 月扩展至新加坡；连接 HSBC Innovation Banking（约 70% 全球 VC 流量） | 私行 + 投行 + 创新银行的产品编排 |
| **2026-09-21** | TFS 80 年 | 1946 年香港/新加坡；亚洲 300+ 员工；5 年 AUA +40%；2025 年 Prism 覆盖信托 AUM +50% YoY；慈善信托年捐约 US$75m | 信托/遗产/慈善是“传承操作系统”，不是后台 |
| **2026-09-23** | MIT Sloan 下一代课程 | 23–30 岁；6 周；2 次直播 + 4 次异步；11/3–12/8；家族企业、owner mindset、家族团结、困难对话、未来路径；引用 US$83.5tn 代际转移 | 学习/治理/下一代需要被记录、被衡量、被接入客户旅程 |
| **2026-10-14** | 用户提供的文章 | 将上述动作概括为“客户关系代际化、服务内容治理化、获客方式长期化” | 与我们的判断一致；但需要 core system 才能规模化 |

> 这些动作的共同点：**都不是“提高收益率”，而是“加深关系、延长时间、扩大服务面”。**

---

### 2. 七个转变

#### 2.1 从“一个决策者”到“家族星座”

Ida 公开谈过：私行要从服务单一决策者，转向理解配偶、成年子女、孙辈的不同需求。  
含义：

- 一个家族里至少有 **创始人 / 配偶 / 子女 / 孙辈 / 家族办公室 CEO/CIO / 信托受托人 / 保护人 / 律师/税务顾问** 等角色。
- 每个角色的 **权利、同意、隐私、风险偏好、目标** 不同。
- 系统不能再用一个 `client_id` 代表全部；需要 `Family`（服务视图）+ `Party`（法律主体）+ `Role` + `Consent` + `Authority`。

#### 2.2 从“资产规模”到“家族生命周期”

- 关注点从“你有多少钱”转向“你的家族处在什么阶段、下一步是什么”。
- 典型阶段：创富 → 增长 → 流动性事件 → 家族办公室 → 下一代 → 传承 → 慈善。
- 系统需要 `Goal`、`LifeEvent`、`Obligation`、`Milestone`，而不是只有 `Portfolio`。

#### 2.3 从“产品”到“治理”

- MIT 课程的内容不是投资，而是 **family enterprise dynamics、owner mindset、family unity、difficult conversations、future pathway**。
- 这说明客户买的不是“产品”，是 **家族如何一起做决定**。
- 系统需要 `FamilyCharter`、`GovernancePolicy`、`FamilyCouncil`、`NextGenPlan`、`LearningRecord`、`DecisionRecord`。

#### 2.4 从“泛 UHNW”到“垂直客群”

Ida 在 Citi 的经历：先做 fashion/retail/entertainment 垂直团队，再做北美亚裔客户团队。  
含义：

- 垂直客群不是标签，而是 **不同的收入结构、资产结构、风险、税务、保险、品牌/IP、传承方式**。
- HSBC 已有： Entrepreneurs、Sports/Media/Entertainment、Collectibles、Family Office、Women & Wealth、Global India、Taiwan/China corridors。
- 系统需要 `SegmentProfile` + `IndustryAsset`（品牌、版税、IP、股权、收藏品）+ `SegmentRisk`。

#### 2.5 从“银行”到“生态 orchestration”

- MIT Sloan、Athens 论坛、TFS、HSBC Access、Innovation Banking、CIB、外部律师/税务/信托/估值。
- 银行不一定自己交付所有服务；但要做 **入口、编排、质量、责任边界、证据**。
- 系统需要 `Partner`、`Referral`、`ServiceInvitation`、`Consent`、`SLA`、`EvidencePack`。

#### 2.6 从“交易”到“信任证明”

- 家族越复杂，越需要证明：谁有权、谁同意、为什么这样做、钱去了哪里。
- 这不是“合规负担”，是 **产品差异化**：在失能/身故/争议/监管时，能快速、合法、可证据地处理。
- 系统需要 `Authority`、`Consent`、`Decision`、`Audit`、`as-of snapshot`。

#### 2.7 从“短期收入”到“长期关系价值”

- 下一代课程、家族治理、慈善，短期不一定产生收入。
- 但它们是 **下一代激活、钱包份额、家族办公室 AUM、转介、留存** 的领先指标。
- 系统需要 `FamilyValue` 指标：跨代客户数、下一代激活率、家族办公室渗透、跨境覆盖、治理里程碑。

---

### 3. 对核心系统的十个要求

| # | 要求 | 不是什么 | 关键对象 |
|---|---|---|---|
| 1 | **家族图**：人、公司、信托、基金、基金会、家族办公室 | 不是一个 household 字段 | `Family`/`Party`/`EntityGraph` |
| 2 | **角色与权利**：创始人、配偶、子女、受托人、保护人、 attorney、executor、家办 CEO/CIO | 不是“主联系人” | `Role`/`Authority`/`Consent` |
| 3 | **目标与事件**：教育、创业、搬迁、退出、传承、慈善 | 不是“风险等级” | `Goal`/`LifeEvent`/`Milestone` |
| 4 | **治理与下一代**：宪章、家族 council、课程、导师、接班 | 不是“客户活动” | `FamilyCharter`/`NextGenPlan`/`LearningRecord` |
| 5 | **家族办公室**：合并报表、实体/信托、投资、信贷、税务、慈善 | 不是“更富的私行客户” | `FamilyOffice`/`ConsolidatedView` |
| 6 | **跨境**：居留/税务/法律/货币/语言/时区 | 不是“多开几个账户” | `Jurisdiction`/`TaxResidency`/`CrossBorderCase` |
| 7 | **流动性/私股**：IPO、质押、二级、capital call、信托分配 | 不是“Lombard 一个产品” | `PrivateAsset`/`Pledge`/`Obligation` |
| 8 | **税务/合规数据**：CRS/FATCA、预扣、tax pack、顾问协同 | 不是“代客报税” | `TaxProfile`/`TaxLot`/`TaxPack` |
| 9 | **证据**：授权、同意、决策、披露、支付、分配 | 不是“PDF 归档” | `Evidence`/`Decision`/`Audit` |
| 10 | **体验**：RM cockpit、家族 portal、下一代 app、家办 dashboard | 不是“一个万能 App” | `Channel`/`Journey`/`AI` |

---

### 4. 哪些是“新”，哪些不是

#### 4.1 真正的新意

1. **家族作为经营单位**：从“客户关系”到“家族关系网”。
2. **下一代作为独立客户**：不是“附属受益人”，有独立 consent、账户、学习、创业、慈善。
3. **家族办公室作为独立业务线**：全球主管、机构级服务、CIB 联动。
4. **治理/教育作为产品**：MIT 课程、Athens 论坛、家族宪章、接班工作坊。
5. **正向叙事**：从“传承=死亡/争产”转为“传承=教育、创业、复利、慈善”。
6. **长期指标**：下一代激活、钱包份额、家族办公室渗透，而不是单季 AUM。

#### 4.2 不是新意（不要包装成创新）

- 私行服务家族办公室不是新事；UBS/Citi/JPM 都有。
- 下一代课程/论坛不是新事；很多私行都有。
- 家族治理/信托/慈善不是新事；HSBC TFS 做了 80 年。
- 真正的难点是：**把这些服务装进一个可规模化、可授权、可证据、可衡量的核心系统**，而不是靠 RM 个人英雄。

> 判断：**Ida 的 playbook 是“关系/segment 战略”，不是“core banking 战略”。**  
> 如果核心系统不跟上，它会变成“更多活动、更多头衔、更多 content”，但无法量化、无法复制、无法跨代。
>
> 另外：**Ida 是 J1 旗舰，不是全部。** HSBC 还需要 J2 创始人、J3 创作者、J4 女性、J5 跨境、J6 家办、J7 核心 HNW，以及 J8 信任/J9 RM/J10 伙伴；见 [`00-journey-catalog.md`](00-journey-catalog.md)。

---

### 5. 风险与反面

| 风险 | 表现 | 对策 |
|---|---|---|
| **长期回报** | 课程/论坛/治理短期不产收入 | 用领先指标（下一代激活、家办渗透、钱包份额）管理；不承诺短期 ROI |
| **“生活方式俱乐部”化** | 活动多、产品少、收入弱 | 每个服务必须挂到客户旅程/对象/指标；不做无对象的活动 |
| **下一代不买账** | 被父母带来，没兴趣 | 独立 consent、独立账户、创业/慈善/学习入口；不强行卖产品 |
| **家族办公室已有 provider** | 客户已有 MFO/律师/信托 | 做“补充/编排”，不替代；用 CIB/global network 差异化 |
| **亚洲父权结构** | 创始人控制，配偶/子女无授权 | 先做家族地图/治理，不强行“去中心化”；尊重控制权 |
| **跨境合规** | 数据/税务/制裁/隐私 | 辖区级 consent、数据最小化、Chinese Wall、法律意见 |
| **隐私** | 家庭成员数据敏感 | 角色级、字段级、目的级 consent；未成年人特别保护 |

---

### 6. 给 HSBC 的五个“应该做”

1. **把“家族”做成系统对象**，不是 CRM 标签；先做 20–30 个家族的 pilot，跑通 family map、roles、goals、consent。
2. **把 MIT/Athens/TFS/HSBC Access 接进客户旅程**：课程完成 → 下一代独立账户 → 首笔投资/慈善/创业 → 家族治理里程碑；每一步有记录、有 consent、有指标。
3. **把家族办公室做成独立 operating model**：合并报表、实体/信托、投资/信贷/税务/慈善、CIB 接入；不要用私行页面硬套。
4. **把压力能力做成“信任证明”**：失能/身故/争议/制裁/欺诈放在第二幕；用“合法授权 + 证据 + 时间”证明银行可靠。
5. **把 Avaloq 放在正确位置**：把它当作能力参考与迁移来源，而不是长期平台；参考它的交易/账本/单据/税务事件/抵押领域模型，**自研重写为自有核心，不再续订 Avaloq**。

---

### 7. 主要来源

- HSBC, *Ida Liu Appointed as Chief Executive Officer of HSBC Private Bank*, 2025-12-22.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/ida-liu-appointed-ceo-hsbc-private-bank/
- HSBC, *HSBC Private Bank launches Next Gen educational programme with MIT Sloan*, 2026-09-23.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-launches-next-gen-educational-programme/
- HSBC, *HSBC Private Bank appoints Global Head of Family Offices and Head of US Private Bank*, 2026-09-09.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-appoints-global-head-of-family-offices/
- HSBC, *Private banks risk missing USD100 trillion opportunity as women’s wealth soars*, 2026-02-18.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/private-banks-missing-opportunity-womens-wealth/
- HSBC, *HSBC Trust and Fiduciary Services marks 80 years in Asia*, 2026-09-21.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-trust-and-fiduciary-services-marks-80-years-in-asia/
- HSBC, *HSBC Private Bank launches HSBC Access*, 2026.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-launches-hsbc-access-connecting-uhnw-and-family-office-clients-with-the-innovation-economy/
- HSBC, *Harmony through succession planning 2025*（1,798 位企业家；78%/52%/75% 等）.  
  https://www.privatebanking.hsbc.com/entrepreneurs/global-entrepreneurial-wealth-report/harmony-through-succession-planning/
- UBS, *Global Family Office Report 2025*.  
  https://www.ubs.com/global/en/media/display-page-ndp/en-20250521-global-family-office-report-2025.html
- Citi Private Bank, *Family Office Advisory*（1,800+ family offices）.  
  https://www.privatebank.citibank.com/we-offer/family-office-advisory
- SCB, *Celebrating Life’s Work*.  
  https://www.sc.com/en/wealth-retail-banking/private-banking/celebrating-lifes-work/
- SCB, *The Great Repositioning*.  
  https://www.sc.com/en/uploads/sites/66/content/docs/SCB2-GPBBrochure-EN.pdf
- 用户提供的《汇丰私行新打法曝光》文章（2026-10-14）作为二手综述；关键事实已回到 HSBC 官方新闻稿核对。

---

## D. 家族财富生命周期：阳光在前，压力在后

<!-- source: 01-user-journey/01-vision/02-family-wealth-lifecycle.md -->

> 这一章回答两个问题：**客户一生到底经历什么？Demo 先讲什么、后讲什么？**
> 结论：**先讲“家族目标如何实现”，再讲“出了事银行如何守住”。** 压力能力不是主菜，但它是信任的底座。
> 注意：这一章是 **J1 家族旅程** 的生命周期视角；完整旅程组合（J1–J10）见 [`00-journey-catalog.md`](00-journey-catalog.md)。

---

### 1. 家族财富生命周期

| 阶段 | 家族在做什么 | 典型事件 | 银行能提供 | 核心系统对象 |
|---|---|---|---|---|
| **创富** | 创业、融资、股权集中 | 成立公司、融资、员工期权、首套房 | 公司银行、创始人服务、基本账户、保险 | `Party`/`Entity`/`PrivateAsset` |
| **增长** | 业务扩张、跨境、投资 | 新市场、并购、分红、家庭形成 | 投资、信贷、跨境、外汇、托管 | `Portfolio`/`Credit`/`Jurisdiction` |
| **流动性事件** | 卖公司/IPO/老股/分红 | 退出、lock-up、capital call、税 | Pre-IPO、质押、二级、信托、税务数据 | `LiquidityEvent`/`Pledge`/`TaxPack` |
| **家族办公室** | 专业化管理家族财富 | 设 SFO、选 CIO、合并报表、治理 | 家办 advisory、consolidation、投资/信贷/信托 | `FamilyOffice`/`ConsolidatedView` |
| **下一代** | 教育、接班、创业、慈善 | 23–30 课程、独立账户、首投、创业 | MIT/Athens、导师、独立账户、创业融资 | `NextGenPlan`/`LearningRecord` |
| **传承** | 宪章、信托、遗嘱、治理 | 家族宪章、信托设立、受益人安排 | TFS、家族治理、信托/遗产、慈善 | `FamilyCharter`/`Trust`/`Estate` |
| **跨代** | 多代共存、家族分支 | 婚姻、子女、搬迁、代际冲突 | 家族 map、调解、跨代投资、慈善 | `Family`/`Role`/`Conflict` |
| **压力时刻** | 失能、身故、离婚、制裁、欺诈、税务调查 | POA/监护、probate、诉讼、监管 | 授权、遗产、争议、合规、证据 | `Authority`/`Case`/`Evidence` |

> 关键：**压力时刻不是“另一个客户”，而是同一个家族生命周期的极端段。** 如果阳光旅程做不好，压力时刻也没有信任基础；如果压力时刻做不好，阳光旅程的承诺就不可信。

---

### 2. 五条阳光旅程（S1–S5，J1/J2/J5/J6/J7 的实例）

| ID | 旅程 | 主角 | 好结果 | 核心能力 |
|---|---|---|---|---|
| **S1** | **教育目标与复利** | 三代家族，孙辈教育金 | 教育金按时到位、组合穿越周期、家庭每年一次“同一张图” | 家族目标、投资政策、信托预算、年度回顾 |
| **S2** | **二代创业** | 创始人女儿，时尚/科技创业 | 独立账户、种子融资、导师、家族治理；不靠父母担保也能起步 | 下一代、创业融资、担保、导师、独立 consent |
| **S3** | **跨境家庭搬迁** | UK→HK/新加坡家庭 | 账户/税务/房产/学校/医疗/传承一次规划；无合规断裂 | 跨境、税务居民、实体、搬迁、家庭安顿 |
| **S4** | **企业家退出** | 创始人卖公司/IPO | 税后财富分散、信托/家办、下一代/慈善；控制权与流动性平衡 | Pre-IPO、估值、质押/卖出、信托、税务 |
| **S5** | **家族办公室与治理** | 多代家族设 SFO | 合并报表、投资政策、家族宪章、下一代接班、慈善 | 家办、治理、consolidation、TFS、慈善 |

#### 2.1 S1 教育目标与复利（阳光旅程的主开场）

**为什么先讲它：**

- 亚洲家庭最愿意谈“子女教育”，不忌讳。
- 它能自然展示“长期投资、复利、风险承受、年度回顾、信托预算、跨代目标”。
- 它把“银行”从“卖产品”变成“帮家族实现一个 10–20 年的目标”。

**故事线：**

1. 女儿 8 岁，家族设立教育目标：英国/香港/美国三条路径，目标金额、币种、时间。
2. 银行做 10 年现金流/复利/风险情景；不是“保本”，而是“区间 + 回撤 + 补足计划”。
3. 每年回顾：实际 vs 目标、费用、税、信托分配；祖父母/父母/孩子各自看到不同视图。
4. 孩子 18 岁：教育金到位；同时开独立账户、第一次投资、第一笔慈善；下一代正式成为客户。

**系统对象：** `FamilyGoal`（教育）、`FundingRatio`、`Portfolio`、`TrustBudget`、`BenefitPayment`、`AnnualReview`、`NextGenAccount`。

**成功指标：** 目标达成率、补充率、回撤后恢复、家庭会议出席、下一代独立账户开立。

#### 2.2 S2 二代创业

**为什么重要：**

- Ida 的“下一代”不是“等接班”，而是“自己闯”。
- HSBC 有 Innovation Banking、HSBC Access、CIB；可以把“家族资本 + 创业”接起来。
- 这也是“二代成功闯出新事业”的正向案例。

**故事线：**

1. 创始人女儿 28 岁，做时尚/消费科技；不愿直接接家族企业。
2. 银行帮她：独立账户、股权结构、种子轮、供应商融资、品牌/IP 保护、导师（家族办公室/CIB/行业专家）。
3. 家族层面：用家族宪章/投资政策决定“投不投、投多少、谁来管、失败了怎么办”；不把“家族钱”与“创业钱”混在一起。
4. 结果：公司拿到首轮、进入 HSBC Access/Innovation Banking 生态；二代与家族关系更好；银行获得下一代主关系。

**系统对象：** `NextGenProfile`、`Venture`、`CapTable`、`Guarantee`、`Mentor`、`FamilyInvestmentPolicy`、`Consent`。

**成功指标：** 首轮融资、独立账户、家族投资决策记录、导师匹配、下一代 NPS。

#### 2.3 S3 跨境家庭搬迁

**为什么重要：**

- HSBC 的差异化是“跨境连接”；但今天跨境靠人、邮件、重复 KYC。
- 亚洲家庭常见：UK/US 教育、HK/SG 家办、UAE 居留、CH 账户。
- 搬迁是“阳光事件”，但处理不好会变成税务/合规压力。

**故事线：**

1. 家庭从伦敦搬到香港；孩子转学、配偶工作、房产、账户、保险、信托。
2. 银行做“家庭搬迁地图”：居留/税务/银行/学校/医疗/传承；哪些必须做、先后顺序、谁负责。
3. 账户/实体/信托/税务数据一次整理；不重复 KYC；不违反数据出境。
4. 结果：6 个月内安顿；没有税务/合规断裂；家族把主关系留在 HSBC。

**系统对象：** `RelocationCase`、`Jurisdiction`、`TaxResidency`、`Entity`、`Consent`、`ServiceTask`、`Partner`。

**成功指标：** 搬迁完成时间、重复 KYC 次数、合规事件 0、客户留存。

#### 2.4 S4 企业家退出

**为什么重要：**

- 这是私行最赚钱的时刻之一：流动性、税、信托、家办、下一代。
- 也是“控制权/税/传承”最复杂的时刻。
- HSBC 有 CIB、HSBC Access、TFS、Lombard；可以把“公司银行 → 私行”接起来。

**故事线：**

1. 创始人 58 岁，准备卖公司/IPO；家庭、员工、税务、慈善、下一代都在场。
2. 银行做“退出全景”：估值、税后、信托、家办、质押/卖出、下一代创业/慈善。
3. 结果：财富分散、税负可控、家族治理建立、下一代有角色；银行获得家办/信托/投资关系。

**系统对象：** `ExitEvent`、`Valuation`、`TaxScenario`、`Trust`、`FamilyOffice`、`Liquidity`、`NextGenPlan`。

**成功指标：** 退出完成、税后财富、家办设立、信托 AUM、下一代参与。

#### 2.5 S5 家族办公室与治理

**为什么重要：**

- Ida 新设 Global Head of Family Offices；Citi/UBS 都在抢。
- 家办不是“更富的客户”，是“机构化运营 + 家族治理”。
- HSBC 有 TFS 80 年、CIB、HSBC Access、Prism Advisory。

**故事线：**

1. 家族有 3 个分支、5 个实体、2 个信托、跨 4 个辖区；现有 MFO/律师/会计师各自为政。
2. 银行做“家族办公室操作系统”：合并报表、投资政策、风险、信贷、信托、税务数据、慈善、下一代。
3. 家族宪章/家族 council/接班计划落地；下一代进入投资委员会观察员/慈善委员会。
4. 结果：家办专业化、决策更快、下一代 ready；HSBC 成为家办的主银行/主托管/主信贷。

**系统对象：** `FamilyOffice`、`ConsolidatedView`、`InvestmentPolicy`、`FamilyCharter`、`Council`、`NextGenPlan`、`Philanthropy`。

**成功指标：** 家办 AUA、合并报表覆盖率、投资政策合规、治理里程碑、下一代参与。

---

### 3. 五条压力旅程（X1–X5，J8 的实例，放在第二幕）

| ID | 旅程 | 触发 | 银行要证明什么 | 关键对象 |
|---|---|---|---|---|
| **X1** | **失能** | 中风/认知衰退 | 谁现在能签字、哪些钱能付、依据什么 | `CapacityEvent`/`Authority`/`CareExpense` |
| **X2** | **身故/遗产** | 死亡 | POA 终止、executor/probate、estate/trust 双账 | `DeathEvent`/`EstateCase`/`ProbateCase`/`TrustCase` |
| **X3** | **离婚/监狱/制裁** | 离婚、刑事、制裁/PEP | 资产/控制权/披露/Chinese Wall/声誉 | `Dispute`/`Sanctions`/`Control`/`Evidence` |
| **X4** | **税务补救** | CRS/FATCA/DOJ/历史账户 | 数据、实体穿透、预扣、 remediation | `TaxProfile`/`EntityGraph`/`RemediationCase` |
| **X5** | **欺诈/深伪** | APP 欺诈、视频深伪 | 授权、异常、拦截、赔付/证据 | `FraudCase`/`Authorization`/`Evidence` |

**压力旅程的设计原则：**

- 不绕过法律：POA/ probate/法院命令/制裁，该等就等。
- 不承诺“72 小时拿钱”：72 小时是“授权清晰 + 紧急支付裁决 + 证据缺口 + 下一步”，不是资产转移。
- 不把“家属一致同意”当授权；不把“信托”当遗产；不把“客户关系”当披露依据。
- 每个压力旅程必须有一个“阳光回照”：比如 X2 之后，家族治理/信托/下一代教育做得更好；不是纯悲剧。

---

### 4. Demo 顺序：为什么压力放在后面

#### 4.1 亚洲语境

- 很多亚洲客户认为谈身故/失能/监狱“不吉利”；开场讲这些，会让客户/领导进入“防御”而不是“想象”。
- 私行卖的是“家族更好”，不是“你出事了我帮你收尸”。
- 压力能力仍然重要，但它是 **信任证明**，不是 **需求钩子**。

#### 4.2 销售逻辑

| 幕 | 时间 | 讲什么 | 目的 |
|---|---|---|---|
| **第一幕：阳光** | 0–10 min | 家族肖像 → 教育目标 → 下一代课程/创业 → 跨境 → 退出/家办 | 让客户看到“我的家族可以更好” |
| **第二幕：韧性** | 10–14 min | 压力测试/市场下跌/流动性/税务 | 让客户看到“方案经得起坏时候” |
| **第三幕：信任** | 14–18 min | 失能/身故/争议/制裁/欺诈 | 让客户看到“真出事时，银行能合法、快速、有证据地守住” |
| **收尾** | 18–20 min | 家族 10 年路线图 + 下一代激活 + 慈善 | 把“信任”转成“长期关系” |

#### 4.3 页面顺序（现有 demo 路由）

1. `#/m3-family`：家族目标/角色/授权缺口（阳光版：教育、创业、慈善）。
2. `#/m3-hub`：MIT Sloan、Athens、女性/配偶、家族治理、家办、教育、健康、慈善、搬迁。
3. `#/m1-dashboard` → `#/m1-proposal` → `#/m1-execution` → `#/m1-compliance` → `#/m1-orders`：教育金/流动性方案、成本/税、执行。
4. `#/m2-allocation` → `#/m2-stress` → `#/m2-backtest` → `#/m2-decision`：复利与韧性。
5. `#/m4-founder` → `#/m4-valuation` → `#/m4-pledge` → `#/m4-trust`：企业家退出/质押/信托。
6. `#/m5-intake` → `#/m5-scenarios` → `#/m5-substance` → `#/m5-advisor`：跨境税务数据/责任边界。
7. **第二幕/第三幕**：`#/m3-cases`（授权/案件）→ `m3-cases`/`m3-family` 预演失能/身故 → X5 欺诈。
8. 收尾：家族 10 年路线图/下一代激活（可用 `#/m3-family` + `#/m3-hub` 回看）。

> X1/X2 独立页面不在本版范围；当前用 `m3-cases` + `m3-family` 的授权缺口做“压力预览”。

---

### 5. 旅程组合的衡量

| 层次 | 指标 | 用途 |
|---|---|---|
| **阳光** | 目标达成率、教育金到位、下一代独立账户、创业融资、家办设立、跨境完成 | 证明“关系价值” |
| **韧性** | 压力测试覆盖、流动性覆盖率、追保准确、税后情景 | 证明“方案可靠” |
| **信任** | 授权核验时间、0 无权支付、证据包完整率、投诉率、监管发现 | 证明“出事能守住” |
| **商业** | 家族层收入、钱包份额、下一代激活、留存、转介 | 证明“长期回报” |

---

### 6. 一句话

> **先用“你希望家族变成什么样”打开对话，再用“如果坏事情发生，我们怎么守住”完成信任。**  
> 压力旅程不是主菜，但它是这家银行能不能被称为“家族银行”的试金石。

---

## E. 正向案例：谁做成了什么

<!-- source: 01-user-journey/01-vision/03-success-cases.md -->

> 目的：回答“不要只讲悲剧；从家庭目标、投资复利、教育、二代创业、家族治理、慈善等好结果出发，HSBC/UBS/Citi/SCB/Avaloq 有哪些成功案例？”
> 映射：S1 = J1/J7；S2 = J1/J3；S3 = J5；S4 = J2；S5 = J1/J6；X = J8。完整旅程组合见 [`00-journey-catalog.md`](00-journey-catalog.md)。
> 方法：只使用公开、可核验的材料；严格区分 **银行公开案例**、**公开家族案例**、**平台案例**、**设计假设**。
> 重要限定：客户隐私意味着“银行不会公开客户姓名+收益+家庭结果”；不要编造“某家族是某行客户”。

---

### 0. 先定义：什么叫“成功案例”

| 类型 | 定义 | 示例 | 能证明 | 不能证明 |
|---|---|---|---|---|
| **A. 银行公开案例** | 银行官方发布、有客户/项目/结果 | HSBC MIT 课程、SCB `Celebrating Life's Work`、Avaloq LGT | 服务/项目真实存在，有参与/结果 | 不能证明收益/客户满意度 |
| **B. 公开家族案例** | 公开报道的家族企业/家族治理 | Hermès、Lego/KIRKBI、Tata | 长期治理/传承模式可行 | 不是银行客户，不能归因银行 |
| **C. 平台案例** | 技术平台公开的客户/转型结果 | Avaloq LGT、CMB Monaco、BT Panorama | 平台可支撑增长/多国/整合 | 不是家族结果，不能证明财富传承 |
| **D. 设计假设** | 我们为 HSBC 设计的旅程/数字 | S1–S5 | 用于设计与 demo | 不是事实，不能对外说“已发生” |

> 下面以 A/C 为主，B 作为“模式证据”，D 只在旅程文件里出现。

---

### 1. 一张表：五家机构的“好结果”证据

| 机构 | 公开正向证据 | 好结果 | HSBC 该学什么 | 不能说什么 |
|---|---|---|---|---|
| **HSBC** | MIT Sloan Future Family Leaders（23–30 岁，6 周，2 直播+4 异步，11/3–12/8）；Athens 论坛 60+ 客户；Global Head of Family Offices；TFS 80 年；HSBC Access；女性财富报告；Harmony 报告 | 下一代有课程/社群/论坛；家办有全球主管；TFS AUA 5 年 +40%、Prism 信托 AUM +50% YoY；慈善信托年捐约 US$75m；HSBC Access 连接创新经济 | 把“家族/下一代/家办/信托/慈善”做成连续旅程，不是单次活动；用指标衡量 | 不能把课程参与等同于“传承成功”；不能把 AUA 增长全归因于战略 |
| **UBS** | Wealth Way（Liquidity/Longevity/Legacy）；GFO 2025（317 家、平均 US$1.1bn、53% 有传承计划、43% 下一代挑战、26% 最初咨询下一代）；全球家办覆盖 | 家族用三账户框架做长期规划；家办有研究/基准/社群 | 用简单框架把“今天/未来/身后”讲清楚；用 GFO 研究建立思想领导力 | 没有公开“某家族成功”的姓名/收益；不能编造 |
| **Citi** | Family Office Advisory 1,800+ 家办；Global Family Office Report；Family Office Leadership Program；Private Capital Group 1,400 客户/77 国；2025 PWM Best Global Private Bank for Family Offices | 家办有教育/领导力项目/同侪网络；Private Capital 做 pre-IPO/liquidity/集中股/资本调用 | 家办是独立业务线；教育/领导力/同侪网络是产品的一部分；CIB 联动 | 1,800 是家办数量，不是“成功率”；奖项不是客户结果 |
| **SCB** | `Celebrating Life's Work`：Dr Sun Huaiqing（中国美妆品牌）、William Heinecke（Minor International）、Wallapa Traisorat（AWC）、Dr David Harilela（慈善）、Guru（肯尼亚）；The Great Repositioning（74% 冲突、87% 传承规划省数百万、84% 下一代参与）；170+ 年、50+ 市场 | 企业家/家族把自己的故事讲出来；品牌/企业/慈善/下一代；跨市场 | 用“客户故事”讲正向结果，而不是功能；把“下一代/慈善/家族企业”做成内容系列 | 这些是品牌故事，不是收益/传承成功率；不能把个人故事当统计 |
| **Avaloq** | LGT（同一平台、5 国、10 年 AUM +370%）；CMB Monaco（Avaloq + Aladdin Wealth 首家全集成，顾问效率）；BT Panorama（10+ 年，整合多系统）；UnionBank（财富管理扩张）；RBC Wealth Management Asia（AWS SaaS，灵活扩展）；Emirates Investment Bank（统一数据/AI） | 平台支撑多国/多实体/增长/整合；顾问效率/数据一致性 | 平台价值是“可扩展、可整合、数据一致”，不是“功能最多” | 这些是银行/平台结果，不是家族传承结果；不能直接推到 HSBC 客户 |

---

### 2. 深读：HSBC 的正向动作

#### 2.1 MIT Sloan Future Family Leaders

- 对象：23–30 岁，UHNW 客户 heirs，early leadership journey。
- 形式：6 周，2 次直播 + 4 次异步；11/3–12/8；6 个模块。
- 内容：family enterprise dynamics、owner mindset、family unity、managing difficult conversations、future pathway。
- 规模：first cohort from around the world；Athens 2026 有 60+ 客户。
- 引用：Capgemini 2025，未来几十年 **US$83.5tn** 传给下一代。
- Ida 原话：客户说希望孩子在“接班前”就获得管理复杂性的经验，而不是“接班后”。

**为什么是成功案例：**

- 它把“下一代”从“受益人”变成“学习者/未来决策者”。
- 它把“家族治理”从“文件”变成“对话/能力”。
- 它给银行一个 **长期接触点**：课程 → 社群 → 独立账户 → 首投 → 创业/慈善 → 家族治理。

**HSBC 该做什么：**

- 课程完成记录进入 `NextGenPlan`/`LearningRecord`；
- 课程后的 90 天：独立账户/首投/导师/慈善/创业入口；
- 家族层面：父母/子女/银行三方 review；
- 指标：完成率、独立账户开立、首投、家族会议、5 年留存。

#### 2.2 Athens Future Family Leaders Forum

- 2026 年 5 月，60+ 客户；旗舰活动；后续区域论坛。
- 功能：同侪网络、家族对话、下一代社群。
- 成功点：把“家族”从单客户变成“跨代社群”。

**HSBC 该做什么：**

- 活动前后有 `FamilyProfile`/`NextGenPlan`/`Consent`；
- 活动后 30/90/180 天跟进；
- 不让活动变成“拍照+吃饭”；每个参与者有下一步。

#### 2.3 TFS 80 年：信托/遗产/慈善的“正向”表达

- 1946 年香港/新加坡；亚洲 300+ 员工；5 年 AUA +40%；2025 年 Prism 信托 AUM +50% YoY。
- 慈善信托每年捐约 **US$75m**；Project Futurus 软餐 14,000 份/1,000+ 老人。
- 服务：trust administration、charitable trust、probate/estate administration、family governance、family office、philanthropy advisory。

**为什么是正向：**

- 不是“死亡/争产”，而是“把 life's work 延续下去”：慈善、教育、老人、艺术、青年创业。
- 信托/遗产是“传承工具”，不是“富人的秘密”。

**HSBC 该做什么：**

- 把 TFS 的信托/慈善/治理接入家族旅程；
- 用“影响力报告”（捐款、受益人数、项目）而不是“税务优势”讲故事；
- 证据：信托分配、慈善 grant、受益人反馈。

#### 2.4 HSBC Access：下一代/家办的“增长入口”

- UHNW/家办可投科技/初创、direct/co-invest/VC；HK 首发；连接 Innovation Banking（约 70% 全球 VC 流量）；5,000 trade specialists、900 innovation experts。
- 与 CIB/Innovation Banking 联动。

**为什么是正向：**

- 给家族“增长/创业/创新”的机会，而不是只卖二级市场产品。
- 与下一代创业旅程（S2）天然契合。

**HSBC 该做什么：**

- 把 Access 的机会与家族投资政策/风险/集中度/流动性匹配；
- 不把“稀缺机会”变成“FOMO 销售”；要有适当性/证据。

#### 2.5 女性财富：被忽视的正向增量

- 未来五年约 40% 全球可投资财富由女性控制（约 US$113tn）。
- 女性更关注退休/子女教育/慈善；女性创业者少 6pp 有导师。
- 含义：配偶/女性客户不是“附属”，是独立决策者；教育/慈善/创业是入口。

**HSBC 该做什么：**

- 女性/配偶独立旅程（不是“女性版产品”）；
- 教育、慈善、创业、家办治理；
- 导师/社群（与 MIT/Athens 结合）。

---

### 3. UBS / Citi / SCB 的正向模式

#### 3.1 UBS：用框架和研究降低复杂度

- **Wealth Way**：Liquidity（今天能花）/ Longevity（未来够花）/ Legacy（身后怎么传）。
- **GFO 2025**：317 家、平均 US$1.1bn；53% 有传承计划；43% 下一代挑战；26% 最初咨询下一代。
- **Estate planning**：will/revocable trust/DPOA/health care/trust/insurance/communication；明确不提供税务/法律意见。

**成功逻辑：**

- 把复杂问题变成三个账户/三个问题，客户容易懂。
- 用 GFO 研究建立“家族办公室思想领导力”。
- 用外部律师/信托合作，不越界。

**HSBC 该学：**

- 用“三账户/三问题”做客户语言，而不是 18 个模块；
- 用研究/报告做 RM 的“开场白”；
- 家族办公室客户需要“同侪/研究/基准”，不只是产品。

#### 3.2 Citi：家办是独立业务线

- Family Office Advisory 1,800+ 家办；Global Family Office Report；Family Office Leadership Program；Regional Executive Forums；roundtables。
- Private Capital Group：1,400 客户/77 国；pre-IPO/liquidity、concentrated stock、capital call、art/aircraft。
- 2025 PWM Best Global Private Bank for Family Offices。

**成功逻辑：**

- 家办有独立团队、研究、教育、同侪网络；
- 与 CIB/Private Capital 联动，做“机构级”；
- 用年度报告/领导力项目建立关系。

**HSBC 该学：**

- Global Head of Family Offices 不是头衔，要有独立 P&L/团队/产品/指标；
- 家办教育/同侪/研究是“服务”，不是“营销”；
- 与 CIB/Innovation Banking 的联动要产品化。

#### 3.3 SCB：用“人的故事”讲正向结果

- `Celebrating Life's Work`：Dr Sun Huaiqing（中国美妆品牌）、William Heinecke（Minor International）、Wallapa Traisorat（AWC）、Dr David Harilela（慈善）、Guru（肯尼亚）。
- 主题：创业、家族企业、领导力、慈善、韧性。
- The Great Repositioning：74% 冲突、87% 传承规划省数百万、84% 下一代参与。

**成功逻辑：**

- 不卖“产品”，卖“人的故事/价值观”；
- 用视频/系列内容建立情感连接；
- 与家族企业/下一代/慈善主题绑定。

**HSBC 该学：**

- 用客户故事（合规、授权、去标识化）讲“好结果”；
- 故事必须落到“银行做了什么/客户做了什么/结果是什么”；
- 不要只拍“奢华生活方式”。

---

### 4. Avaloq 的平台正向案例

| 案例 | 公开结果 | 说明 | 对 HSBC 的含义 |
|---|---|---|---|
| **LGT** | 同一平台、5 国、10 年 AUM +370% | 多国/多实体标准化 | Avaloq 可支撑跨境增长；不要轻易全量替换 |
| **CMB Monaco** | 首家 Avaloq + Aladdin Wealth 全集成；顾问效率 | 核心 + 风险/组合分析整合 | HSBC 已有 Aladdin/Avaloq；关键是集成，不是换 |
| **BT Panorama** | 10+ 年；多系统整合到一个核心 | 整合/简化 | Avaloq 的整合价值 |
| **UnionBank** | 财富管理扩张 | 新兴市场增长 | 平台可扩展 |
| **RBC Wealth Management Asia** | AWS SaaS；灵活/规模 | 云化 | HSBC 的 cloud/API 路线要对齐 |
| **Emirates Investment Bank** | 单一平台/统一数据/AI | 数据一致性 | 统一数据模型是 AI 的前提 |

**判断：**

- Avaloq 的正向案例证明它是“可扩展的交易/账本平台”，不是“家族生命周期平台”。
- HSBC 不应该用“Avaloq 不好”来论证替换；应该用“Avaloq 很好，但它的主键是账户/交易，不是家族/授权/事件/证据”。

---

### 5. 公开家族案例：长期治理的“模式证据”

| 家族/企业 | 公开事实 | 证明什么 | 不能证明 |
|---|---|---|---|
| **Hermès** | 1837 年创立；家族控制；第六代；家族控股结构 | 家族控制 + 长期治理 + 品牌传承可行 | 不是银行客户；不证明银行服务 |
| **Lego / KIRKBI** | 家族控股/家族办公室 KIRKBI；跨代 ownership | 家族办公室/长期资本 + 下一代 | 不是银行客户；不证明 HSBC |
| **Tata** | Tata Sons 由 Tata Trusts 控制；跨代/慈善 | 信托/慈善/治理可以长期存在 | 不是银行客户；印度/集团特殊结构 |

> 这些案例只用于说明“好结果存在”，不能写成“HSBC 服务了这些家族”。

---

### 6. 把“好结果”映射到 S1–S5

| 旅程 | 好结果 | 最相关的公开证据 | 银行该做的 |
|---|---|---|---|
| **S1 教育/复利** | 教育金到位、组合穿越周期 | HSBC 女性报告（教育是女性首要目标之一）；UBS Wealth Way（Longevity/Legacy） | 目标/复利/年度 review/信托预算 |
| **S2 二代创业** | 二代做出新事业 | SCB Dr Sun Huaiqing/William Heinecke；HSBC Access/Innovation Banking；HSBC MIT 课程 | 独立账户、种子融资、导师、家族投资政策 |
| **S3 跨境搬迁** | 家庭安顿、无合规断裂 | HSBC 56 国/跨境；SCB 50+ 市场；Citi 77 国 | 搬迁地图、税务居民、实体、consent |
| **S4 企业家退出** | 税后财富分散、家办/信托 | HSBC TFS 80 年；Citi Private Capital；UBS GFO | 估值、质押/卖出、信托、家办 |
| **S5 家办/治理** | 家办专业化、下一代 ready | Citi 1,800 家办/Leadership Program；UBS GFO；HSBC Global Head of Family Offices | 合并报表、治理、下一代、慈善 |

---

### 7. 不要说什么

1. **不要说“某家族是 HSBC 客户”**，除非官方公开。
2. **不要把“课程参与”说成“传承成功”**；课程只是领先指标。
3. **不要把“AUM 增长”全归因于战略**；市场/汇率/并购都有影响。
4. **不要把“家办数量”说成“成功率”**；1,800 是覆盖，不是结果。
5. **不要把“客户故事”写成“收益故事”**；SCB 的故事是品牌/价值观，不是收益率。
6. **不要编造 UBS 的客户姓名**；UBS 公开的是研究与框架，不是客户名单。

---

### 8. 主要来源

- HSBC, *HSBC Private Bank launches Next Gen educational programme with MIT Sloan*, 2026-09-23.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-launches-next-gen-educational-programme/
- HSBC, *HSBC Trust and Fiduciary Services marks 80 years in Asia*, 2026-09-21.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-trust-and-fiduciary-services-marks-80-years-in-asia/
- HSBC, *HSBC Private Bank launches HSBC Access*, 2026.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-launches-hsbc-access-connecting-uhnw-and-family-office-clients-with-the-innovation-economy/
- HSBC, *Private banks risk missing USD100 trillion opportunity as women’s wealth soars*, 2026-02-18.  
  https://www.privatebanking.hsbc.com/media-releases-and-news/private-banks-missing-opportunity-womens-wealth/
- HSBC, *Harmony through succession planning 2025*.  
  https://www.privatebanking.hsbc.com/entrepreneurs/global-entrepreneurial-wealth-report/harmony-through-succession-planning/
- UBS, *Global Family Office Report 2025*.  
  https://www.ubs.com/global/en/media/display-page-ndp/en-20250521-global-family-office-report-2025.html
- UBS, *Estate planning*.  
  https://www.ubs.com/us/en/wealth-management/our-solutions/planning/estate-planning.html
- Citi Private Bank, *Family Office Advisory*.  
  https://www.privatebank.citibank.com/we-offer/family-office-advisory
- Citi Private Bank, *Private Capital Group at a glance*.  
  https://www.privatebank.citibank.com/ivc/docs/Citi-Private-Capital-Group-At-a-glance.pdf
- SCB, *Celebrating Life’s Work*.  
  https://www.sc.com/en/wealth-retail-banking/private-banking/celebrating-lifes-work/
- SCB, *The Great Repositioning*.  
  https://www.sc.com/en/uploads/sites/66/content/docs/SCB2-GPBBrochure-EN.pdf
- Avaloq, *Our clients*.  
  https://www.avaloq.com/about/clients

---
