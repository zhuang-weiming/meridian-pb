# 00 — 执行答复：七个问题的结论

> 这是本轮工作的“一页纸答案”。详细论证见各链接。

---

## 1. 按 Ida 的思路，user journey 应该怎么改？

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

**优先级（2026-10-26 确认）**：**P0 = J1/J2/J6/J8**；**P0 使能 = J9/J10**；P1 = J5/J4/J3；P2 = J7。  
J2/J3/J4 一页 blueprint：[J2](../04-blueprints/05-j2-founder.md)｜[J3](../04-blueprints/06-j3-creator.md)｜[J4](../04-blueprints/07-j4-women.md)。

详见 [`../03-portfolio/00-journey-portfolio.md`](../03-portfolio/00-journey-portfolio.md)、[`01-ida-liu-playbook.md`](01-ida-liu-playbook.md)、[`02-family-wealth-lifecycle.md`](02-family-wealth-lifecycle.md)。

---

## 2. POA / CRS / FATCA / trustee / PCG 等术语

**结论：已建统一术语表，含 80+ 词、12 组易混词、英文/中文/解释/为什么重要。**

- POA：授权书；EPA/LPA：持久/永久授权；probate：遗产认证；trustee：受托人；executor：遗嘱执行人。
- CRS：OECD 多边金融账户信息自动交换；FATCA：美国海外账户合规；withholding：预扣；tax filing：申报。
- PCG：在 Citi 指 Private Capital Group；换机构可能指 Private Client Group，必须看上下文。
- LTV/Haircut/Lendable Value：三个不同分母；不要混。
- SFO/MFO：单一家族/多家族办公室；不是“更富的客户”。

详见 [`../02-evidence/05-glossary.md`](../02-evidence/05-glossary.md)。

---

## 3. Avaloq 的 TAX2/报告，上一版说错了吗？

**结论：上一版把“交易税/预扣”说成“个人税务申报”，过宽；已修正。**

- `TAX2_EVT#CALC` 在 Avaloq 自己的交易/事件/持仓上，按 tax type、日期、BU、object、direction、currency 等选规则，计算/预扣/记录。
- 它看不到客户行外收入、私股、信托分配、海外实体；不是 UK/HK 个人综合所得税申报平台。
- EasyTax 是瑞士各州申报生态；CRS/FATCA 是账户报告，不是个人税表。
- 正确：Avaloq = 银行侧交易税/预扣/报告引擎；银行 = tax data pack + 预扣 + 报告 + 顾问协同。
- 同时：Avaloq 的目标是**替换**；参考其能力，自研重写为自有核心；**不续订 Avaloq**；迁移期只做数据抽取/对照，不作为长期平台。

详见 [`../../02-functional-architecture/02-avaloq-boundary.md`](../../02-functional-architecture/02-avaloq-boundary.md)、[`../../02-functional-architecture/05-avaloq-replacement-business-case.md`](../../02-functional-architecture/05-avaloq-replacement-business-case.md)。

---

## 4. 失能/身故/监狱是否应该在 Demo 后面？

**结论：对。压力旅程放在第二/第三幕；但不要删。**

- 亚洲客户对身故/失能/监狱敏感；开场讲会防御。
- 私行卖“家族更好”，不是“出事收尸”。
- 压力能力是信任底座：合法、快速、有证据。
- 阳光旅程先讲教育/复利/创业/跨境/家办；压力旅程后讲失能/身故/离婚/制裁/税务/欺诈。

详见 [`02-family-wealth-lifecycle.md`](02-family-wealth-lifecycle.md)、[`../../04-video-and-movie/20-minute-demo-narration-cn.md`](../../04-video-and-movie/20-minute-demo-narration-cn.md)。

---

## 5. 正向成功案例：谁做成了什么？

**结论：有，但要区分“银行公开案例/公开家族/平台/设计假设”。**

- **HSBC**：MIT Sloan Future Family Leaders（23–30 岁，6 周）、Athens 论坛 60+ 客户、Global Head of Family Offices、TFS 80 年（AUA 5 年 +40%、Prism 信托 AUM +50% YoY、慈善年捐约 US$75m）、HSBC Access、女性财富报告。
- **UBS**：Wealth Way（Liquidity/Longevity/Legacy）、GFO 2025（317 家、53% 有传承计划、43% 下一代挑战）。
- **Citi**：Family Office Advisory 1,800+ 家办、Global Family Office Report、Leadership Program、Private Capital Group 1,400/77 国。
- **SCB**：`Celebrating Life's Work`（Dr Sun Huaiqing、William Heinecke、Wallapa Traisorat、Dr David Harilela、Guru）；The Great Repositioning（74% 冲突、87% 传承规划省数百万、84% 下一代）。
- **Avaloq**：LGT（10 年 AUM +370%）、CMB Monaco（Avaloq+Aladdin 首家全集成）、BT Panorama（10+ 年整合）、UnionBank、RBC Asia、Emirates Investment Bank。
- **公开家族模式**：Hermès、Lego/KIRKBI、Tata（长期治理/家族办公室/信托），但不是银行客户。

详见 [`03-success-cases.md`](03-success-cases.md)。

---

## 6. HSBC 新版本 core banking 能力/功能是什么？

**结论：不是一个 ledger，而是“一个主键 + 六个事实 + 十二个能力域”。**

- 主键：`Family`。
- 六个事实：`Party`、`Authority`、`Goal`、`Event`、`Asset`、`Evidence`。
- 十二域：家族/法律主体、角色/授权/同意、目标/事件、治理/下一代、家办、投资/顾问、交易/托管/账本、流动性/信贷/私股、信托/遗产/保险、税务/跨境/监管、慈善、服务/生态/渠道；加数据/证据/AI、商业衡量。
- 分层：自研核心 L0–L2（参考 Avaloq 能力）；体验 L3；生态 L4；Avaloq 仅参考/迁移来源，不续订。
- 不建：全量替换 Avaloq、全球个人报税、通用 AI、生活方式商城、绕过法律的体验。

详见 [`../../02-functional-architecture/01-core-capability-model.md`](../../02-functional-architecture/01-core-capability-model.md)、[`../../02-functional-architecture/03-data-model.md`](../../02-functional-architecture/03-data-model.md)。

---

## 7. 文档结构怎么整理？

**结论：当前文档树按四个交付物组织；旧版与中文 Demo 进 `archive/2026-10_v1/`。**

- `01-user-journey`：愿景、证据、旅程组合、蓝图、场景、pilot、运营层。
- `02-functional-architecture`：能力模型、Avaloq 边界、数据模型、替换商业论证、solution 层。
- `03-web-page`：客户旅程 `client-journey.html` + 运营工作台 `rm-workbench.html`。
- `04-video-and-movie`：12 分钟主版、5 分钟电梯版、18–20 分钟中文讲解稿。
- `archive/2026-10_v1`：旧架构图、旧视频计划、roadmap、中文 Demo、旧 README。

详见 [`../README.md`](../README.md)、[`../../archive/2026-10_v1/README.md`](../../archive/2026-10_v1/README.md)。

---

## 一句话

> **先把“家族”做成系统，再把“好结果”讲成旅程，最后用“压力旅程”证明信任；以 Avaloq 为参考，重写为自有核心，不续订 Avaloq。**
