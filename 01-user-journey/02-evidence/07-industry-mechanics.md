# 07 — 行业机制：失能/身故、税务、Pre-IPO 到底怎么做

> 目的：把“银行能做什么/不能做什么”写清楚，避免把营销语言当机制。
> 范围：HSBC、UBS、Citi、SCB、Avaloq；公开资料为主，标注“待验证”的为供应商/内部确认项。
> 不是法律/税务/投资建议。

---

## 0. 一张表

| 场景 | 客户真正需要的 | 银行角色 | 关键对象 | Avaloq 的位置 |
|---|---|---|---|---|
| **失能** | 谁现在能决策、能付哪些钱、依据什么 | POA/EPA/LPA/deputy 的登记与执行 | `Authority`/`CapacityEvent`/`Payment` | 账户/支付/授权记录强；法律授权图谱弱 |
| **身故** | 谁有权处理遗产、何时拿钱、税/债/受益 | executor/administrator 的银行接口；trustee 的信托管理 | `DeathEvent`/`EstateCase`/`ProbateCase`/`TrustCase` | 账户/文档/支付强；probate/证据编排弱 |
| **税务** | 我在哪交、交什么、谁报、证据在哪 | 数据/预扣/CRS/FATCA/报告；通常不代报 | `TaxProfile`/`TaxLot`/`TaxPack` | TAX2 交易税/预扣强；全球个人申报/行外收入弱 |
| **Pre-IPO** | 不卖股怎么拿钱、估值/质押/退出 | 信贷/质押/对冲/二级/资本市场 | `PrivateAsset`/`Valuation`/`Pledge`/`Exit` | 标准信贷/抵押强；私股生命周期弱 |

> 一句话：**三家大行不是“没有服务”，而是“服务由人、邮件、Excel、外部律师/估值师拼起来”；Avaloq 不是“没有能力”，而是“能力围绕账户/交易/单据，不围绕家族/授权/证据”。**

---

# 1. 失能/身故

## 1.1 两条法律链（必须先分清）

### A. 失能（在世）

| 阶段 | 谁有权 | 文件 | 银行动作 | 常见失败 |
|---|---|---|---|---|
| 能力尚存 | 客户 | POA/EPA/LPA | 见证/登记/教育 | 拖延/没登记 |
| 能力下降 | 仍为客户；必要时法院 | 医疗证明/能力评估 | 限制异常交易；提示家属/律师；不擅自披露 | 银行假装没看见/过度冻结 |
| 能力丧失 | attorney/deputy/committee | 已登记 POA/法院命令 | 登记代理人；设权限；支付 | 文件范围不清/joint attorney 冲突/系统不支持 |
| 争议 | 法院 | 监护/ deputyship/禁令 | 遵守法院命令；必要时冻结/申请指示 | 银行自行判断“谁更适合” |

**关键：没有 probate。** Probate 是死亡后的遗产认证。

### B. 身故

| 阶段 | 谁有权 | 文件 | 银行动作 | 常见失败 |
|---|---|---|---|---|
| 死亡通知 | 无人自动取得账户控制 | 死亡证明 | 记录死亡、停止营销、保护资产 | 信息泄露给无权家属 |
| POA 终止 | 死亡即终止 | — | 停用 POA/第三方授权 | 系统仍显示 POA 有效 |
| 遗产管理 | executor/administrator | will/grant/letters | 验证、冻结/限制、披露给授权人 | 家属以为“有遗嘱就能取钱” |
| 遗产账户 | executor/administrator | grant+ID | 开 estate account、收款、付债/税/费用 | 跨境 grant 不被承认 |
| 信托 | trustee | 信托契约/意愿书/死亡证明 | 信托继续/终止/分配 | 把信托资产当遗产 |
| 跨境 | 各地 executor/trustee | 本地 grant/reseal | 本地承认/执行 | 一个 grant 想管全球 |

**关键：**

- 死亡时 POA 自动终止；executor 完整权限通常等 grant（少数例外）。
- joint account 不一定进遗产；信托资产不是遗产。
- 跨境不是“翻译+公证”；需要 local grant/reseal/承认。
- 银行不是法院；有争议时申请指示/冻结/升级。

## 1.2 HSBC 的公开机制

- **HSBC UK bereavement**：在线 portal、死亡证明/遗嘱/probate、 dedicated team；sole accounts 通常冻结；joint account 视情况转 survivor；Executor Bank Account；有 will £50k / 无 will £25k 门槛；仍可要求 grant。
- **POA**：可在线/分行登记；最长 **10 个工作日**；需要全部页面/认证/ID；donor 有 capacity 时通知 donor，否则通知主 attorney/deputy。
- **POA 权限矩阵**：general POA 不能管理失能后账户；EPA/LPA 可以；jointly appointed attorneys 不能用 debit card/internet/mobile/telephone banking；**arrange an overdraft 对所有 POA 都是 No**。
- **HSBC Private Bank**：Estate Administration（可做 executor；多辖区；可能“many months or even years”）；Liquidity Planning；Trust Administration；Family Governance；Philanthropy。
- **TFS**：1946 年香港/新加坡；80 年；亚洲 300+ 员工；trust/charitable trust/probate/estate/family governance/family office/philanthropy；5 年 AUA +40%；Prism 信托 AUM 2025 +50% YoY。
- **真实投诉/操作**：
  - FOS DRN-4737924：grant 2023-08-16；executor 08-21 登记；08-31 放款；次日关户；HSBC guideline up to 15 working days；本案 10 天。
  - FOS DRN6866791：Court of Protection 命令优先于 POA；死亡后 POA 失效，executor 权限按遗产程序。
  - FOS DRN-6406571：LPA 注册后仍被锁在网银外；验证码发 donor 手机；attorney 无法及时取得。
  - Which? 2023：2,906 名 attorney；HSBC POA 注册体验 27% 评差。

**判断**：HSBC 不缺服务菜单；缺的是**跨实体、跨辖区、跨系统的授权/证据/时效编排**。FOS 的 10 天说明“法律程序 + KYC + 受益人是非/来源检查”需要时间；可压缩的是信息/证据/编排，不是法律。

## 1.3 UBS / Citi / SCB

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **UBS** | estate planning 框架（will/revocable trust/DPOA/health care/trust/insurance/communication）；明确不提供税务/法律意见；trust 由关联/第三方实体；Wealth Way（Liquidity/Longevity/Legacy）；GFO 2025 | 强在规划框架/全球平台/研究；具体 estate/POA 执行依赖当地法律/第三方 |
| **Citi** | trust/estate planning 与独立法律/税务顾问合作；Family Office Advisory 1,800+ 家办；Private Capital Group；Family Office Leadership Program | 强在家办/信托/CIB 联动；公开 bereavement/POA 操作细节不如 HSBC UK |
| **SCB** | Legacy planning、family office setup、trust/philanthropy、next-gen；`Celebrating Life's Work`；The Great Repositioning；肯尼亚 online estate planning | 强在新兴市场/跨境/传承/下一代；estate 数字化有尝试，深度取决于辖区 |

## 1.4 RM 的角色

| 能做 | 不能做 |
|---|---|
| 表达哀悼/稳定客户 | 自行判断“谁有权” |
| 解释流程/收集文件/引荐团队 | 向无权家属披露 |
| 协调内部（ops/legal/compliance/tax/credit） | 承诺“几天拿钱” |
| 维护家族关系/下一代 onboarding | 替代律师/法院/executor |
| 识别冲突/异常/欺诈并升级 | “看在客户面子上”破例 |

---

# 2. 税务：银行不代客报税

## 2.1 正确边界

银行通常：

- 收集 self-cert/TIN/地址/indicia；
- 分类个人/实体/控制人；
- 计算/预扣交易税、利息/股息税；
- 生成 CRS/FATCA/1042-S/1099/本地报告；
- 提供年度 tax pack/凭证；
- 与客户/会计师/律师协同。

银行通常不：

- 代客户签个人报税表；
- 出税务/法律意见；
- 保证“零漏报/零双重征税”；
- 看到客户在行外的收入/实体/信托/资产（除非客户提供/授权）。

> 正确表述：**adviser-ready tax data pack + 预扣/申报接口 + 责任矩阵 + 证据链**。

## 2.2 Avaloq TAX2 的真实边界（重要修正）

**对上一版的修正：不要把 Avaloq 说成“能生成 UK/HK 个人报税表”。**

源码审计显示：

- `TAX2_EVT#CALC` / `TAX2_EVT#` 是**事件驱动的交易税计算/结果记录**：按 tax type、日期、BU、object、direction、settlement plan、currency、classification 等选择规则；计算/换算/记入 `TAX2_EVT_SERPIL`。
- `TAX2_EVT_RULE#GET_RULE` 按 `SEQ_NR, PRIO` 选规则；`COND` 动态条件；`VALUE_AC#VAL` 计算金额；`TAX2_EVT#REVS` 反向；`TAX2_EVT_SERPIL#` PUT。
- 它处理的是 **Avaloq 自己系统内的事件/交易/持仓**；它不会自动知道客户在行外的工资、版税、私股、信托分配、海外实体。
- EasyTax 是瑞士各州税务申报生态的集成/产品，不是全球个人税务申报引擎。
- CRS/FATCA 是账户分类/报告，不是个人报税表。

**所以：**

| 说法 | 是否正确 |
|---|---|
| “Avaloq 有税务计算/预扣能力” | ✅ 对（在其账本/事件范围内） |
| “Avaloq 能生成 UK/HK 个人综合所得税申报” | ❌ 过度 |
| “Avaloq 能看到客户行外收入并自动算税” | ❌ 过度 |
| “Avaloq 的 CRS/FATCA 报告 = 个人报税” | ❌ 混淆 |
| “Avaloq 可作为银行侧税务数据/预扣/报告引擎” | ✅ 合理 |

## 2.3 各家的公开机制

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **HSBC** | 全球 CRS/FATCA；预扣/报告；历史 DOJ 补救经验；私行/零售 tax reporting | 强在全球网络/预扣/历史补救；弱在“一个客户一个跨实体 tax pack” |
| **UBS** | 全球 tax reporting/transparency；税务报表/凭证；独立顾问 | 强在报告标准/跨境规划；申报本地化 |
| **Citi** | 全球托管/报告；tax reporting 与独立顾问；Private Capital 跨 border structuring | 强在机构级报告/家办；个人申报依赖顾问 |
| **SCB** | CRS/FATCA/本地 tax reporting；wealth planning 与顾问 | 强在本地市场/跨境；深度取决于辖区 |
| **Avaloq** | TAX2 交易税/预扣；CRS/FATCA；组合会计/成本基础；报告 | 强在托管资产/上市证券；弱在全球个人税/私股/跨实体 |

## 2.4 D2 的正确目标

1. **不做“代客报税”**；做“adviser-ready tax data pack”。
2. **责任矩阵**：银行/客户/顾问/信托/雇主各负责什么。
3. **字段**：身份/居民、实体、收入分类、tax lot/cost basis、预扣、CRS/FATCA、私股分配、FX、费用。
4. **顾问 portal**：客户授权后可下载/核对；访问留痕。
5. **历史补救**：未申报/错报/罚金；HSBC 的真实经验。
6. **指标**：数据包完整率、顾问退回率、预扣准确率、CRS/FATCA 及时率、补救周期。

---

# 3. Pre-IPO：不是贷款产品，是私有资产生命周期

## 3.1 生命周期

| 阶段 | 客户问题 | 银行角色 | 对象 | 风险 |
|---|---|---|---|---|
| 识别 | 纸面/可质押/可花费 | 财富诊断/集中度 | `PrivateAsset`/`Concentration` | 纸面财富幻觉 |
| 估值 | 值多少/凭什么/多久更新 | 估值委员会/外部估值师 | `Valuation`/`ValuationGovernance` | 估值过高/过低 |
| 结构 | 押股/卖老股/对冲/融资 | 投行/信贷/法律/税务 | `Structure`/`Pledge` | 控制权/税/证券法 |
| 授信 | 能借多少/利率/期限/追保 | 信贷委员会 | `CreditFacility`/`LTV`/`Covenant` | 集中度/流动性 |
| 文件 | 质押登记/公司同意/跨境 | 法律/ops | `SecurityDocument`/`PledgeRegistration` | 不可执行 |
| 监控 | 估值跌/锁定期/IPO 窗口 | 风险/ops | `CollateralMonitor`/`CovenantCalendar` | 追保/违约 |
| 事件 | IPO/锁定期到期/老股转让 | 投行/资本市场 | `LiquidityEvent`/`Exit` | 窗口/披露 |
| 退出 | 卖/押/等/对冲 | 投行/资管 | `ExitScenario` | 税/控制权 |

## 3.2 五条路径

| 路径 | 做什么 | 优点 | 缺点 | 适用 |
|---|---|---|---|---|
| **持有** | 不融资，等 IPO/分红 | 保留上行/控制权 | 无流动性；集中度 | 现金流充足 |
| **卖老股/ secondary** | 二级/tender/老股转让 | 真流动性；分散 | 折价；税；控制权；锁定期 | 有买家/窗口 |
| **质押/贷款** | Lombard/私股质押/资本调用贷款 | 不卖股；保留上行 | 追保；利息；质押执行；跨境 | 有稳定估值/现金流 |
| **对冲** | collar/forward/variable prepaid forward/exchange fund | 降低下行；延迟税 | 复杂；对手方/抵押；上行 capped | 上市/流动性较好 |
| **结构化** | 接续基金/结构化 secondary/bridge | 定制；大额 | 费用；利益冲突；监管 | 大额/复杂 |

## 3.3 信贷机制

| 维度 | 银行看什么 | 典型做法 |
|---|---|---|
| **估值** | 最近一轮/可比/DCF/独立估值 | 估值委员会；折扣（流动性/集中度/管辖）；定期复核 |
| **LTV/haircut** | 能借多少 | 上市股票可能 50–70%；私股通常更低（20–50% 或更保守）；不是固定公式 |
| **集中度** | 单一股票/行业/集团 | 限额；超额需批准/分散/对冲 |
| **锁定期** | 什么时候能卖 | 授信期限/追保/退出匹配 lock-up |
| **质押** | 能否执行 | 质押登记、公司同意、股东协议、跨境承认 |
| **现金流** | 怎么还息 | 分红/工资/其他资产；利息储备 |
| **契约** | 什么触发违约 | 估值下跌、控制权变更、IPO 失败、交叉违约 |
| **追保** | 跌多少补 | 通知、补仓期、强制处置、客户确认 |
| **监管** | 证券法/披露/insider | 10b5-1、trading window、pre-clearance、公告 |
| **税务** | 卖/押/重组的税 | 资本利得/预扣/跨境；需顾问 |

## 3.4 各家的公开机制

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **HSBC** | Marketable securities backed finance（HK/US stocks/ETFs 最高约 70%）；Tailored Lending/Specialized Asset Finance；Liquidity Planning；HSBC Access（科技/初创/co-invest/VC） | 标准证券质押/定制信贷强；私股质押公开细节少，逐案 |
| **UBS** | Lombard/多币种；concentrated stock；pre-IPO liquidity；Wealth Way | 强在全球资本市场/结构化融资 |
| **Citi** | margin lending 全球 US$25.3bn；collateral 广；cross-border；Private Capital Group 1,400/77 国；pre-IPO/liquidity、capital call、concentrated stock/PE/art/aircraft | 公开机制最完整；仍是团队+产品，不是单一系统对象 |
| **SCB** | wealth lending/structured lending；legacy/trust/succession 差异化 | 强在新兴市场/跨境/传承；Pre-IPO 公开细节较少 |
| **Avaloq** | lending & credit：securities-based lending、exotic collateral、credit risk、collateral appraisal、complex loans；`COLLAT_LOT_DISTR#CMPL` | 标准信贷/抵押强；私股估值治理/IPO 生命周期/insider window/跨境执行弱 |

## 3.5 D3 的正确目标

1. **不是“Pre-IPO 贷款”**，是“私有资产生命周期”。
2. **3 天形成可决策包**（估值方法/LTV/质押/先决条件/风险/退出），不是 3 天批贷。
3. **估值治理**：方法/折扣/日期/审批/复核；每个数字有依据。
4. **生命周期**：融资轮、lock-up、IPO 窗口、静默期、老股转让、secondary、forward sale、10b5-1。
5. **质押执行**：登记/公司同意/股东协议/跨境承认。
6. **义务日历**：capital call/distribution/earn-out/vendor loan/NAV/税。
7. **负向需求**：不做 insider trading；不绕过预清算/窗口；不承诺 IPO 价格；不把纸面估值当市值。

---

## 4. 主要来源

- HSBC UK Bereavement: https://www.hsbc.co.uk/help/life-events/bereavement/what-to-do-when-someone-dies/
- HSBC UK POA: https://www.hsbc.co.uk/help/life-events/poa/registering-for-poa-with-hsbc/
- HSBC Private Bank Estate Administration: https://www.privatebanking.hsbc.com/wealth-planning/estate-administration/
- HSBC TFS 80 years: https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-trust-and-fiduciary-services-marks-80-years-in-asia/
- HSBC Access: https://www.privatebanking.hsbc.com/media-releases-and-news/hsbc-private-bank-launches-hsbc-access-connecting-uhnw-and-family-office-clients-with-the-innovation-economy/
- FOS: https://www.financial-ombudsman.org.uk/decision/DRN-6406571.pdf / DRN6866791 / DRN-4737924
- Which?: https://www.which.co.uk/news/article/banks-bungling-power-of-attorney-registration-apQ3p0U8o13s
- UBS Estate Planning: https://www.ubs.com/us/en/wealth-management/our-solutions/planning/estate-planning.html
- UBS GFO 2025: https://www.ubs.com/global/en/media/display-page-ndp/en-20250521-global-family-office-report-2025.html
- Citi Family Office Advisory: https://www.privatebank.citibank.com/we-offer/family-office-advisory
- Citi Margin Lending: https://www.privatebank.citibank.com/we-offer/margin-lending
- Citi Private Capital Group: https://www.privatebank.citibank.com/ivc/docs/Citi-Private-Capital-Group-At-a-glance.pdf
- SCB Legacy Planning: https://www.sc.com/en/wealth-retail-banking/private-banking/legacy-planning/
- SCB The Great Repositioning: https://www.sc.com/en/uploads/sites/66/content/docs/SCB2-GPBBrochure-EN.pdf
- Avaloq clients: https://www.avaloq.com/about/clients
- Avaloq lending: https://www.avaloq.com/platform/lending-and-credit
- Avaloq TAX2 源码审计：`archive/2026-10_v1/02_architecture/...` 与 `avaloq/doc/04_business_domains/pillar_6_compliance_regulatory/01_TAXATION_FRAMEWORK.md`
