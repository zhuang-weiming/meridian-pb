# 02 — Evidence：证据、判例、行业机制与 personas

> 本文件把原来的证据文档合并为一份：证据规则、术语、判例、行业机制、personas。
> **personas 的完整公开人物/家族资料保留在 [`personas/`](personas/)：**
> [`personas/nextgen-pb-real-people-cases.html`](personas/nextgen-pb-real-people-cases.html)（可视化）与
> [`personas/real-families.csv`](personas/real-families.csv)（结构化字段）。
> 公开人物只作结构参考；不表示是本行客户。

## 本文件结构

| 节 | 回答什么 | 原文件（已合并） |
|---|---|---|
| A | 什么算证据、A/B/C/D 级怎么用 | `02-evidence/README.md` |
| B | POA/CRS/FATCA/trust/PCG 等术语 | `02-evidence/05-glossary.md` |
| C | 真实判例：授权、信托、遗产 | `02-evidence/06-case-law.md` |
| D | 失能/身故、税务、Pre-IPO 的行业机制 | `02-evidence/07-industry-mechanics.md` |
| E | 21 组 HTML 核心案例 + 23 行 CSV 家族池 | `02-evidence/personas/README.md` + `personas/` |

---

## A. 证据规则：什么能证明，什么不能

<!-- source: 01-user-journey/02-evidence/README.md -->

> 这一层只放“可核验的事实/案例/机制”，不放观点。观点在 `01-vision` 与 `02-functional-architecture`。
> 证据等级：**A** 法院/监管；**B** 公司官方/年报/产品文档；**C** 媒体/访谈/行业报告；**D** 设计假设。

---

### 1. 文件

| 内容 | 在本文件的位置 | 主要用途 |
|---|---|---|
| 21 个 HTML 核心案例 + 23 行 CSV 家族池（v3.5） | [`personas/`](personas/) + §E | 需求原型的“人” |
| POA/CRS/FATCA/trustee/PCG 等术语 | §B | 统一语言 |
| 公开法律卷宗（HSBC 相关 + 全球标准） | §C | 压力旅程/授权/证据 |
| HSBC/UBS/Citi/SCB/Avaloq 的业务/系统机制 | §D | 能力边界/对标 |

---

### 2. 三层证据

| 层 | 回答 | 例子 |
|---|---|---|
| **需求证据** | 富人真正在争什么/怕什么/要什么 | 法院案件、家族企业报告、客户故事 |
| **失败证据** | 现有服务/系统在哪些环节失败 | 投诉、判决时间线、监管处罚、手工流程 |
| **系统证据** | 需要什么对象/能力才能避免 | 源码审计、产品文档、数据模型 |

> 不要把“需求证据”直接当“替换理由”；也不要把“一个案例”当“普遍统计”。

---

### 3. 重要限定

- **案例是极端样本**：能证明需求强度/失败成本，不证明普遍失职/付费意愿。
- **HSBC 角色不同**：trustee / executor / private bank / 非 HSBC；不能混。
- **判决≠银行全责**：很多是家族争议；法院未必认定银行有错。
- **程序性判决**：如 Tao 2018 主要处理 amendment/split trial；事实背景是当事人陈述。
- **隐私**：公开判决中的金额/家庭关系只用于研究，不用于营销。
- **不是法律/税务意见**：具体适用须当地律师/税务顾问确认。

---

### 4. 引用规则

1. 先写“事实”，再写“来源”，再写“证据等级”。
2. 区分“法院认定”“监管认定”“当事人主张”“媒体叙述”。
3. 任何“Avaloq 不能”必须能指到源码/产品文档；否则写“待验证”。
4. 任何“客户成功案例”必须区分银行公开/公开家族/平台/设计假设。
5. 对外材料前过法务；客户姓名/家庭信息一律去标识化。

---

## B. 术语表：POA / CRS / FATCA / trust / PCG

<!-- source: 01-user-journey/02-evidence/05-glossary.md -->

> 用法：内部设计/汇报/需求评审的统一语言。不是法律/税务意见；具体适用须由当地律师/税务顾问确认。
> 原则：**英文缩写 → 中文 → 一句话解释 → 为什么在私行/核心系统里重要。**

---

### 0. 最容易混淆的 12 组词

| 组 | 不要混为 | 区别 |
|---|---|---|
| **Client / Person / Legal Entity / Household** | “客户就是一个 ID” | 客户是关系；Person 是自然人；Legal Entity 是公司/信托/基金；Household 是服务视图，不是法律主体 |
| **Beneficial Owner / Trustee / Beneficiary / Executor** | “都是老板/受益人要给钱” | 受益所有人（控制/利益）、受托人（管理）、受益人（受益）、遗嘱执行人（遗产管理）四个不同法律角色 |
| **POA / Will / Trust** | “都是传承文件” | POA 是生前授权；Will 是死亡后生效；Trust 是独立法律安排，死亡不一定终止 |
| **Probate / Estate Administration** | “死亡后银行直接给家属” | Probate 是法院认证遗嘱/任命 executor；estate administration 是管理遗产的过程 |
| **Tax Residency / Citizenship / Domicile** | “护照=税务居民” | 税务居民看居住/天数/住所/协定；国籍≠税务居民；domicile 是普通法概念 |
| **CRS / FATCA** | “都是税务申报” | CRS 是 OECD 多边金融账户信息自动交换；FATCA 是美国单边海外账户合规 |
| **Withholding / Tax Filing** | “银行帮我报税” | Withholding 是支付时代扣；tax filing 是纳税人/顾问申报 |
| **Lombard / Mortgage / Private Share Pledge** | “都是贷款” | Lombard 是证券质押；mortgage 是房产抵押；私股质押是未上市股权，估值/执行不同 |
| **LTV / Haircut / Lendable Value** | “能贷多少=市值×LTV” | LTV 是额度/可贷值；haircut 是抵押折扣；lendable value=市值×(1−haircut) |
| **SFO / MFO / Family Office** | “家办=更富的客户” | SFO 单一家族；MFO 多家族；Family Office 是 operating model，不是客户等级 |
| **PCG / PB / CIB** | “都是私行部门” | PCG 在不同机构含义不同：Citi Private Capital Group；PB 私人银行；CIB 企业与投资银行 |
| **Authority / Consent / Mandate** | “客户同意=有权” | Authority 是法律权限；Consent 是数据/服务同意；Mandate 是投资/交易授权，三者不同 |

---

### 1. 法律、传承与授权

| 缩写/英文 | 中文 | 解释 | 为什么重要 |
|---|---|---|---|
| **Capacity** | 行为能力/心智能力 | 一个人理解并做出某类决定的能力；不同决定（遗嘱、信托、合同、医疗）标准不同 | 失能旅程的起点；银行不能自行判断，需要医疗/法律证据 |
| **POA (Power of Attorney)** | 授权书 | 本人在有 capacity 时授权他人代为处理事务 | 失能时最常用；但权限、登记、辖区、银行政策限制很多 |
| **General POA** | 一般授权书 | 通常只在本人有 capacity 时有效，权限较窄 | 很多银行不允许 general POA 管理“丧失能力后”的账户 |
| **EPA (Enduring Power of Attorney)** | 持久授权书（旧制） | 在本人失去 capacity 后继续有效；英国/香港等旧制 | 需要登记/法院/银行接受；新制多为 LPA |
| **LPA (Lasting Power of Attorney)** | 永久授权书（英国/新加坡等） | 本人指定 attorney，失去 capacity 后继续有效；分财产/健康两类 | HSBC UK 可登记 LPA；jointly appointed attorneys 有网银/借记卡限制 |
| **Deputy / Deputyship** | 法院任命的代理人/监护 | 没有有效 POA 时，法院任命某人管理事务 | 失能但没有 POA 的“最后路径”；耗时/费用高 |
| **Court of Protection** | 保护法院（英国） | 处理失能人士财产/福利的法院 | 法院命令优先于 POA；银行必须遵守 |
| **Attorney** | 代理人/受托代理人 | 依 POA/LPA 行事的人 | 不是“律师”的同义词；不要与 lawyer 混用 |
| **Donor** | 授权人 | 设立 POA/LPA 的人 | 银行注册时要验证 donor/attorney 身份 |
| **Guardian** | 监护人 | 对未成年人/失能者的监护 | 与 attorney/deputy 不同；涉及未成年人账户/受益 |
| **Executor** | 遗嘱执行人 | 遗嘱指定、负责管理遗产的人 | 死亡后 POA 终止；executor 权限通常等 probate |
| **Administrator** | 遗产管理人 | 无遗嘱/遗嘱未指定时，由法院/法律规则任命 | 需要 Letters of Administration |
| **Probate** | 遗产认证 | 法院确认遗嘱/executor 的程序 | 银行通常要 grant 才释放较大金额 |
| **Grant of Probate** | 遗嘱认证授予书 | 法院给 executor 的正式文件 | 银行/资产持有人据以释放资产 |
| **Letters of Administration** | 遗产管理授予书 | 无遗嘱时给 administrator 的文件 | 与 probate 不同但作用类似 |
| **Estate** | 遗产 | 死亡时留下的资产/负债（信托资产通常不算） | Estate 与 Trust 是两条账 |
| **Will** | 遗嘱 | 死亡后生效的分配/监护人/executor 指定 | 需要 capacity/形式要求；可能被挑战 |
| **Intestacy** | 无遗嘱继承 | 没有有效遗嘱时按法定规则分配 | 跨境/配偶/子女/依赖人复杂 |
| **Trust** | 信托 | 受托人持有资产，为受益人利益管理 | 不是“避税工具”；有法律/税务/披露义务 |
| **Settlor / Grantor** | 设立人 | 设立信托的人 | 可能保留权力；控制权会影响“是否算其资源” |
| **Trustee** | 受托人 | 法律上持有信托资产、按信托契约管理的人 | HSBC International Trustee 是典型；有 fid duty |
| **Beneficiary** | 受益人 | 信托/遗产/保险的受益对象 | 不等于账户持有人/控制人/纳税人 |
| **Protector** | 保护人 | 信托契约中监督/否决/任免受托人的角色 | 控制权图谱的一部分；Kan 案关键 |
| **Letter of Wishes** | 意愿书 | 设立人给受托人的非约束性意愿 | 多版本/冲突/撤回是诉讼常见焦点 |
| **Discretionary Trust** | 全权信托 | 受托人有裁量权决定分配 | 受益人没有固定权利；控制权/意愿书很关键 |
| **Bare Trust** | 固定权益信托 | 受益人拥有固定权益 | 税务/披露不同 |
| **Irrevocable Trust** | 不可撤销信托 | 设立人一般不能单方撤销 | 不是绝对“资产隔离”；控制/保留权力仍可能被击穿 |
| **Family Charter / Constitution** | 家族宪章/家族宪法 | 家族价值观、决策规则、接班、 employment、慈善等 | 家族治理的核心文件；不是法律合同 |
| **Family Council** | 家族理事会 | 家族代表/分支的治理机构 | 与董事会/家族办公室不同 |
| **TFS** | 信托与 fiduciary 服务 | HSBC Trust and Fiduciary Services | 信托、遗产、慈善、家族治理、家办咨询 |
| **Estate Administration** | 遗产管理 | 收集资产、清债、税、分配 | 可能数月/数年；跨境更复杂 |
| **Resealing** | 遗产授予书异地再加盖/承认 | 在一个辖区取得的 grant 在另一辖区承认 | 跨境遗产的关键；不是“翻译+公证” |

---

### 2. 税务与监管

| 缩写/英文 | 中文 | 解释 | 为什么重要 |
|---|---|---|---|
| **Tax Residency** | 税务居民 | 按居住天数/住所/永久居所/协定等判定 | 决定全球/本地纳税义务；不是国籍 |
| **Domicile** | 住所（普通法） | 长期归属的法律概念；与 residence 不同 | 遗产税/信托/跨境结构常用 |
| **TIN** | 纳税人识别号 | 税务居民国的纳税人编号 | CRS/FATCA 申报核心字段 |
| **CRS (Common Reporting Standard)** | 共同申报准则 | OECD 多边金融账户信息自动交换标准 | 银行要识别/申报/交换；不是“个人报税表” |
| **AEOI** | 金融账户信息自动交换 | CRS/FATCA 的上位概念 | 跨境税务透明 |
| **FATCA** | 海外账户税收合规法（美国） | 美国要求外国金融机构识别/报告美国账户 | 美国纳税人/实体穿透/预扣 |
| **W-8BEN / W-8BEN-E** | 非美国受益人/实体身份表 | 声明外国身份/协定优惠 | 决定美国预扣税率 |
| **W-9** | 美国纳税人信息表 | 美国人的 TIN/身份 | 美国预扣/报告 |
| **1042-S** | 美国对非居民的年度预扣/收入表 | 银行给非美国人的税务表 | 客户报税/抵扣 |
| **1099** | 美国年度信息表 | 银行给美国人的收入/利息/股息等 | 美国报税 |
| **QI (Qualified Intermediary)** | 合格中介 | 与美国 IRS 签约、代扣代缴的金融机构 | 美国预扣/报告链条 |
| **Withholding** | 预提税/代扣 | 支付时扣下税款 | 银行做；不等于客户完成申报 |
| **Treaty / DTA** | 税收协定 | 两国避免双重征税的协定 | 预扣税率/居民身份/争议解决 |
| **Split-year** | 拆分年度 | 英国等税制下，迁入/迁出年度按日期拆分 | 跨境搬迁的关键规则 |
| **CFC** | 受控外国公司 | 居民控制的外国公司，利润可能被归属征税 | 家族公司/信托/离岸结构 |
| **GAAR / PPT** | 一般反避税规则/主要目的测试 | 没有商业目的、主要为了避税的 arrangements 可被否定 | 税务优化不能“藏钱” |
| **FSIE** | 外地收入豁免（香港） | 香港对某些外地收入的经济实质/关联要求 | 家办/控股公司/利息/股息 |
| **FIHV** | 家族投资控权工具（香港） | 香港家族办公室税务优惠载体 | 家办设立/税务/实质 |
| **Tax Lot** | 税务批次 | 同一证券不同买入批次，成本/持有期不同 | 资本利得/亏损计算 |
| **Cost Basis** | 成本基础 | 资产原始成本（含调整） | 资本利得/税 |
| **PFIC** | 被动外国投资公司 | 美国税法下的外国基金/公司分类 | 美国纳税人复杂申报 |
| **871(m)** | 美国股息等价物预扣 | 某些衍生品视为支付股息 | 结构化产品/衍生品 |
| **10b5-1** | 美国内幕交易安全港计划 | 预先设定交易计划，避免 insider 风险 | 集中股/Pre-IPO 后减持 |
| **CRS/FATCA Classification** | CRS/FATCA 分类 | 个人/实体/被动 NFE/控制人 | 账户申报/穿透 |
| **Controlling Person** | 控制人 | 对实体有控制权的自然人 | 信托/公司穿透 |
| **Passive NFE** | 被动非金融实体 | 主要收入为被动收入/资产 | CRS/FATCA 穿透 |
| **Beneficial Owner (UBO)** | 受益所有人 | 最终拥有/控制/受益的自然人 | AML/CRS/制裁/信托 |
| **PEP** | 政治公众人物 | 高风险政治/政府关联人物 | 加强尽调；FINMA/AML |
| **Sanctions** | 制裁 | 对个人/实体/国家/行业的限制 | 开户/支付/资产冻结 |
| **AML** | 反洗钱 | 识别/监测/报告洗钱风险 | KYC/交易监测/MROS |
| **KYC / KYB** | 了解你的客户/业务 | 身份/受益所有人/目的/风险 | 开户/持续尽调 |
| **Suitability** | 适当性 | 产品/服务与客户目标/风险/经验匹配 | 投资建议/销售 |
| **Chinese Wall** | 信息隔离墙 | 投行/研究/私行/自营之间的信息隔离 | MNPI/利益冲突 |
| **MNPI** | 重大非公开信息 | 可能影响价格、未公开的信息 | 交易/研究/客户服务红线 |
| **Consent** | 同意 | 客户对数据/服务/披露的授权 | 家族成员/跨境数据/营销 |
| **Data Minimization** | 数据最小化 | 只收集/使用必要数据 | 隐私/跨境 |
| **DPIA** | 数据保护影响评估 | 高风险处理的评估 | 家族/健康/未成年人数据 |

---

### 3. 私行、投资与流动性

| 缩写/英文 | 中文 | 解释 | 为什么重要 |
|---|---|---|---|
| **HNW / UHNW** | 高净值/超高净值 | 通常按可投资资产划分；口径各异 | 客群分层；不是法律定义 |
| **AUM / AUA** | 管理资产/管理/托管资产 | AUM 通常投资管理；AUA 更广（含托管/信托） | 不要混用；TFS 用 AUA |
| **RM** | 客户关系经理 | 客户主关系人 | 不是法律授权人；不能代替律师/受托人 |
| **IC** | 投资顾问 | 配置/产品建议 | 与 RM 分工 |
| **IPS** | 投资政策声明 | 目标/约束/风险/配置 | 投资决策的“宪法” |
| **SAA / TAA** | 战略/战术资产配置 | 长期/短期配置 | 提案/组合管理 |
| **IBOR** | 投资账本 | 持仓/交易/现金/成本的记录 | 与 Avaloq 账本关系 |
| **OMS / EMS** | 订单/执行管理系统 | 下单/路由/执行 | 交易链 |
| **Lombard** | 证券质押融资 | 以证券/基金等抵押借款 | 私行常见流动性工具 |
| **LTV** | 贷款价值比 | 额度/可贷值 | 不是“市值×固定比例” |
| **Haircut** | 抵押折扣 | 市值中不能贷的部分 | 与 LTV 不同 |
| **Lendable Value** | 可贷值 | 抵押市值×(1−haircut) | 额度计算基础 |
| **Collateral** | 抵押品 | 担保贷款的资产 | 估值/登记/执行 |
| **Pledge** | 质押 | 以资产设定担保 | 私股质押需要公司同意/登记/跨境执行 |
| **Margin Call** | 追保 | 抵押价值下跌，要求补仓/还款 | 风险/客户沟通 |
| **Pre-IPO** | 上市前 | 公司未上市阶段的股权/融资 | 纸面财富/流动性/估值 |
| **Lock-up** | 锁定期 | IPO/融资后不能卖的时间 | 授信期限/退出要匹配 |
| **Secondary** | 二级/老股转让 | 上市前/后的老股交易 | 流动性路径 |
| **Forward Sale / Prepaid Forward** | 远期/预付远期 | 锁定未来卖出价格，提前拿钱 | 对冲/税/控制权 |
| **Capital Call** | 资本调用 | PE/VC 基金要求 LP 出资 | 家族流动性/义务日历 |
| **Distribution** | 分配 | 基金/信托向投资者/受益人分配 | 税务/现金流 |
| **NAV** | 净值 | 基金/组合资产减负债 | 估值/申购赎回 |
| **GP / LP** | 普通合伙人/有限合伙人 | 基金管理人/出资人 | 私募结构 |
| **SPV** | 特殊目的载体 | 为投资/融资设立的公司/合伙 | 风险隔离/披露 |
| **Co-invest** | 共同投资 | 与基金/机构一起直投 | 家办/下一代 |
| **SFO / MFO** | 单一家族办公室/多家族办公室 | 服务一个/多个家族 | 不同 operating model |
| **Family Office** | 家族办公室 | 家族财富/投资/治理/行政的专业组织 | 不是“更富的客户” |
| **PCG** | 私人资本集团（Citi Private Capital Group） | Citi 服务家办/私人投资公司的团队 | 在别的机构也可能指 Private Client Group；看上下文 |
| **PB / CIB** | 私人银行/企业与投资银行 | 私行/投行 | HSBC 的跨境/家办联动 |
| **DCM / ECM** | 债务/股权资本市场 | 发债/发股 | 企业家退出/融资 |
| **Custody** | 托管 | 资产保管/结算/公司行动 | 私行基础 |
| **TES** | 交易效率分（本项目定义） | 成本/税/时间/冲击/可执行性 | 本项目的比较框架，不是行业标准 |
| **RFP / SLA** | 需求建议书/服务级别协议 | 采购/服务管理 | 生态合作 |

---

### 4. 家族治理与下一代

| 英文/中文 | 解释 | 为什么重要 |
|---|---|---|
| **Family Governance** | 家族治理：价值观、决策权、沟通、冲突、接班 | 家族长期稳定的“软基础设施” |
| **Family Charter / Constitution** | 家族宪章/宪法：原则/规则/政策 | 不是法律合同；需要家族共识 |
| **Family Council** | 家族理事会 | 代表家族分支/下一代 |
| **Family Assembly** | 家族大会 | 全体/分支沟通 |
| **NextGen** | 下一代 | 不是“受益人”同义词；有独立需求/ consent |
| **NextGen Plan** | 下一代计划 | 教育/导师/独立账户/接班/创业 |
| **Learning Record** | 学习记录 | MIT/Athens/内部课程完成/主题 |
| **Mentorship** | 导师制 | 家族/行业/银行专家 |
| **Succession Plan** | 接班计划 | 谁接、何时、怎么接、失败怎么办 |
| **Family Employment Policy** | 家族就业政策 | 家族成员进入企业的规则 |
| **Philanthropy** | 慈善 | 捐赠/基金会/影响力投资 |
| **Charitable Trust** | 慈善信托 | 以慈善为目的的信托 |
| **Impact Investing** | 影响力投资 | 财务回报+社会/环境影响 |
| **Family Office CEO / CIO** | 家办首席执行官/投资总监 | 家办的专业角色；与家族成员/银行 RM 区分 |

---

### 5. 系统、数据与证据

| 英文/中文 | 解释 | 为什么重要 |
|---|---|---|
| **System of Record** | 记录系统/事实源 | 哪个系统对哪个字段负责 |
| **System of Engagement** | 交互系统 | 客户/RM 的界面 |
| **System of Intelligence** | 智能系统 | 分析/AI/建议 |
| **Event** | 事件 | 死亡/失能/IPO/搬迁/交易等 |
| **Event Sourcing** | 事件溯源 | 用事件序列重建状态 |
| **As-of / Point-in-time** | 时点/截至某日 | 回答“当时谁有权/什么有效” |
| **Snapshot** | 快照 | 某时点的状态 |
| **Authority Graph** | 授权图谱 | 谁对谁/什么资产/在什么范围有权 |
| **Consent** | 同意 | 数据/服务/披露的授权 |
| **Evidence Pack** | 证据包 | 可对法院/监管出示的材料 |
| **Decision Record** | 决策记录 | 谁/何时/依据/批准/理由 |
| **Audit Trail** | 审计轨迹 | 不可篡改的操作记录 |
| **Chinese Wall** | 信息隔离墙 | 防利益冲突/MNPI |
| **API** | 应用接口 | 系统集成 |
| **SaaS** | 软件即服务 | 云交付 |
| **Data Residency** | 数据驻留 | 数据存放在哪个辖区 |
| **Data Sharing Agreement** | 数据共享协议 | 跨境/第三方共享 |
| **Tokenization** | 令牌化 | 敏感字段替换 |
| **Model Governance** | 模型治理 | AI/风险模型的责任/验证 |
| **Human-in-the-loop** | 人在环中 | AI 不签字/不最终决策 |

---

### 6. 机构与角色

| 缩写/英文 | 中文 | 解释 |
|---|---|---|
| **HSBC PB** | 汇丰全球私人银行 | HSBC Private Bank |
| **HSBC TFS** | 汇丰信托与 fiduciary 服务 | Trust and Fiduciary Services |
| **HSBC CIB** | 汇丰企业与投资银行 | Corporate and Institutional Banking |
| **HSBC Innovation Banking** | 汇丰创新银行 | 服务科技/生命科学/创投生态 |
| **MIT Sloan** | 麻省理工斯隆管理学院 | HSBC 下一代课程合作方 |
| **Family Office** | 家族办公室 | SFO/MFO |
| **Trust Company** | 信托公司 | 受托/信托行政 |
| **Custodian** | 托管行 | 资产保管/结算 |
| **Private Capital Group (PCG)** | 私人资本集团 | Citi 的团队名；不是通用缩写 |
| **RM / IC / Product Specialist** | 关系经理/投资顾问/产品专家 | 私行前台角色 |
| **Compliance / Risk / Legal** | 合规/风险/法务 | 控制职能 |
| **Trustee / Executor / Attorney / Deputy** | 受托人/遗嘱执行人/代理人/法院代理人 | 四个不同法律角色 |
| **Protector / Beneficiary / Settlor** | 保护人/受益人/设立人 | 信托角色 |
| **PEP / Sanctions** | 政治公众人物/制裁 | 高风险客户/交易 |

---

### 7. 一句话记忆

- **POA 是生前授权，Will 是死后生效，Trust 是独立法律安排。**
- **Probate 是法院认证，不是银行流程；POA 在死亡时自动终止。**
- **CRS 是多边信息交换，FATCA 是美国合规；都不是“个人报税表”。**
- **Withholding 是代扣，tax filing 是申报；银行通常只做前者+数据。**
- **Trustee 管信托，Executor 管遗产，Beneficiary 受益，UBO 是最终受益所有人。**
- **PCG 在 Citi 指 Private Capital Group；换一家机构可能指 Private Client Group，必须看上下文。**
- **LTV 不是“市值×固定比例”；haircut、lendable value、估值日、集中度、锁定期都要写清。**
- **Avaloq 的 TAX2 是在自己系统内的交易/事件上算税/预扣；它看不到行外收入，也不是全球个人报税平台。**

---

### 8. 参考

- HSBC UK, *Power of Attorney* / *Bereavement* 官方页面（POA/ probate 流程与权限矩阵）。
- OECD, *Common Reporting Standard (CRS)* / *AEOI*.
- IRS, *FATCA* / *QI* / *W-8BEN* / *1042-S*.
- HMRC, *Tax on savings and investments*.
- HSBC, *Trust and Fiduciary Services 80 years in Asia*（TFS 服务范围）。
- 本项目 [`../02-functional-architecture/02-avaloq-boundary-and-business-case.md`](../02-functional-architecture/02-avaloq-boundary-and-business-case.md)（Avaloq TAX2 的真实边界）。

---

## C. 公开法律卷宗：授权、信托、遗产

<!-- source: 01-user-journey/02-evidence/06-case-law.md -->

> 性质：公开判例/监管文件研究，不是法律意见；不主张任何案件当事人是本行客户。
> 用途：为 [`05-scenarios.md`](05-scenarios.md) 提供事实锚点；为 [`../02-functional-architecture/01-capability-and-data-model.md`](../02-functional-architecture/01-capability-and-data-model.md) 提供对象需求。
> 证据等级：A 法院/监管；B 官方/年报；C 媒体/当事人主张。

---

### 0. 结论

公开卷宗里的富人痛点，不是“账户不够多”，而是七件事：

1. **控制权**：股权、投票权、受托人任免、保护人权力。
2. **意愿版本**：遗嘱、信托契约、letter of wishes、家族协议。
3. **授权与能力**：失能/身故后谁有权、依据什么、在哪个辖区、从何时。
4. **跨境/跨实体**：信托、公司、基金、保险、房产分布在不同辖区。
5. **证据**：受托人/银行的决定能否在法院面前解释清楚。
6. **流动性**：财富是股权/信托/私股，不是现金。
7. **家族冲突**：赡养、受益权、控制权、葬礼、慈善剩余。

> 这些是“极端样本”，不是“普遍统计”；能证明需求强度/失败成本，不能证明银行普遍失职或客户愿付费。

---

### 1. 案件矩阵

| # | 案件 | 引用 | HSBC 角色 | 核心事实 | 证明什么 | 系统含义 |
|---|---|---|---|---|---|---|
| 1 | **Tao Soh Ngun v HSBC International Trustee** | [2018] HKCFI 380；HCA 3246/2016；背景见 [2018] HKCFI 33 | 受托人 | 1988 信托；1988 letter of wishes vs 2016–17 多封信（买 Great Eagle 至 40%、排除家族成员、分配全部信托）；受托人同时是 KS 所设信托的受托人，被指冲突 | 控制权+意愿书版本+受托人冲突+家族分支 | `LetterOfWishes`/`ControlRight`/`ConflictRegister`/`TrusteeDecision` |
| 2 | **Tam Mei Kam v HSBC International Trustee** | [2010] HKCA 197；[2017] HKCU 348；2024/2026 公开报道 | 遗嘱执行人+受托人 | 梅艳芳 2003-12-30 去世；同日立遗嘱+设 Karen Trust；母亲每月 HK$70k、侄辈教育 HK$1.7m、剩余慈善；母亲挑战遗嘱/信托，20 年争议；2024 母亲去世，2026 葬礼/遗产再争 | 身故后授权、遗产现金流、家庭供养、信托 vs 遗产、长期管理 | `EstateCase`/`TrustCase`/`BenefitPayment`/`CourtOrder` |
| 3 | **Kan Lai Kwan v Poon Lok To Otto** | [2014] HKCFA 66 | 受托人 | Jersey 信托持 84.63% Analogue（HK$1.56bn）；丈夫 settlor/protector/受益人，可罢免受托人；6+ 封意愿书；法院认定受托人“great deference”、把丈夫当“valued customer”；CFA 认定整个信托基金都是丈夫资源 | 控制权≠受益权；意愿书权重；受托人独立性/冲突；商业关系污染治理 | `ProtectorPower`/`LetterOfWishes`/`ConflictRegister`/`DecisionRecord` |
| 4 | **HSBC v Tan Poh Lee** | FSD 175/2019 (IKJ)，Cayman | 受托人 | 2002 信托；设托人 2018 去世，此前中风 3 年；新加坡诉讼、马来西亚禁令、Cayman 信托；受托人向法院交出裁量权 | 跨境失能/身故；三地命令冲突；受托人 conflict；法院 blessing | `CrossBorderCase`/`OrderConflict`/`SurrenderDecision` |
| 5 | **Re Otto Poon Trust** | [2015] JCA 109 | 受托人 | 离婚后把前妻排除出受益人类别；法院要求善意/合理受托人/无冲突；讨论 affidavit vs skeleton 的证据标准 | 重大受托人决定需要“法院级”证据 | `DecisionRecord`/`ConflictCheck`/`EvidenceGrade` |
| 6 | **HSBC Private Bank (Suisse) — DOJ DPA** | 2019-12-10；US$192.35m | 私行 | 承认与美国人合谋逃税；未申报账户/离岸结构/美国纳税人；罚金+整改 | 税务透明是控制/证据/历史补救，不是报表功能 | `TaxProfile`/`EntityGraph`/`RemediationCase` |
| 7 | **FINMA — HSBC Private Bank (Suisse)** | 2024-06-18 | 私行 | 2002–15 两段高风险 PEP 关系，>US$300m 黎巴嫩资金；未充分核实/记录/上报；禁止新开 PEP 关系 | PEP/AML/受益所有人/资金来源/上报 | `PEPStatus`/`SanctionsHit`/`SourceOfFunds`/`MROS` |
| 8 | **Zhang Hong Li v DBS Bank (HK)** | [2019] HKCFA 37 | 受托人（DBS，非 HSBC） | 设托人保留投资/保护人权力；破产；信托资产是否可被债权人取得；reserved powers/anti-Bartlett | 控制权/保留权力/破产/信托边界 | `ControlRight`/`BankruptcyEvent`/`TrustIndependence` |
| 9 | **Prest v Petrodel** | [2013] UKSC 34 | 无 | 离婚；公司持有房产；受益所有权/公司面纱 | 资产 tracing/跨境结构/形式持有 vs 实际控制 | `BeneficialOwner`/`EntityGraph` |
| 10 | **Ilott v The Blue Cross** | [2017] UKSC 17 | 无 | 遗嘱自由 vs 家庭供养； estranged 女儿 | 依赖人/家庭供养/遗嘱自由边界 | `DependantClaim`/`BeneficiaryClass` |
| 11 | **Philipp v Barclays** | [2023] UKSC 4 | 无 | APP 欺诈；客户授权付款；Quincecare 边界 | 授权 vs 欺诈；银行何时应查询 | `FraudCase`/`Authorization`/`Evidence` |
| 12 | **Singularis v Daiwa** | [2019] UKSC 50 | 无 | 董事欺诈；银行执行可疑支付；Quincecare | 银行“照指令执行”不等于免责 | `Anomaly`/`Escalation`/`Decision` |

> 第 8–12 项不是 HSBC 案件，只作全球法律标准；不要写成 HSBC 事实。

---

### 2. 深读：六个 HSBC 相关案件

#### 2.1 Tao：控制权、意愿书版本、受托人冲突

**事实**

- 信托 1988 年设立，1999 年更换受托人为 HSBC International Trustee；Lo Ying Shek 2006 年去世。
- 原告 Tao Soh Ngun 是遗孀/唯一遗嘱执行人；依据 1988 letter of wishes 与 2016–17 多封信，要求：
  - 把信托基金分为 1,000 股“投票 shares”，按分配表；
  - 以 51% 儿童投票权指示受托人；
  - 买 Great Eagle（20,000/日、200,000/日、300,000/日，直至 >40%）；
  - 把 KS 等加入 Excluded Class；
  - 分配全部信托。
- 受托人拒绝部分请求，理由是信托是全权信托、原告只是受益人之一、且受托人同时是 KS 信托的受托人，存在利益冲突；受托人提出重组，原告起诉。
- 2018 判决处理 amendment/split trial：**驳回 amendment、允许 split trial**；实体争议未决。

**为什么重要**

- 这不是“账户服务”，是“谁有权定义信托方向”。
- 一封 2016 信可以试图推翻 1988 意愿书；一封信可以要求买到大股东；一封信可以排除家族成员。
- 受托人同时服务家族不同分支，利益冲突会在“买哪只股、投什么票、分给谁”上具体化。
- 法院关心：哪一版有效、是否送达、是否撤回、是否在权限内、是否被不当目的污染。

**系统含义**

| 需求 | 对象 |
|---|---|
| 意愿书版本链 | `LetterOfWishes`：版本、签署、送达、撤回、生效、冲突 |
| 控制权图谱 | `ControlRight`：投票、罢免、保护人同意、Excluded Class |
| 受托人冲突 | `ConflictRegister`：其他信托/家族分支/商业关系 |
| 决策证据 | `TrusteeDecision`：请求、法律意见、会议、表决、理由、送达、法院命令 |
| 控制权块交易 | `BlockTrade`/`VotingInstruction` |

---

#### 2.2 Tam：20 年遗产/信托、月度现金流、家庭供养

**事实**

- 梅艳芳 2003-12-30 去世（40 岁）；2003-12-03 同日签遗嘱、设 Karen Trust；HSBC 为 executor/trustee；Karen Trust 是遗嘱剩余唯一受赠人。
- 信托：母亲每月 HK$70,000；侄辈教育 HK$1,700,000；两间私人公司股份给 Eddie Lau；母亲去世后剩余给 New Horizon Buddhist Association。
- 母亲挑战遗嘱/信托有效性（能力、知情/认可），18 天审讯、104 页判决；2010 上诉失败；2017 仍依 Cap 481 申请家庭供养；公开报道生活费后来提高到每月 HK$200,000。
- 母亲 2024-08-30 去世（102 岁）；2026 年长子与孙辈/遗产再起葬礼/遗嘱争议。

**为什么重要**

- 身故不是“一个时点”，是“20 年现金流”：月度支付、医疗、诉讼、通胀、家庭关系。
- 信托 vs 遗产是两条账；信托资产不是遗产；受托人不是 executor；但家属都当成“我家的钱”。
- 家庭供养是法律风险：即使遗嘱/信托有效，依赖人仍可能申请。
- 死亡后的第二次争议：受益人去世、剩余分配、葬礼、遗嘱有效性。

**系统含义**

`EstateCase` + `TrustCase` 双账本；`BenefitPayment`；`CourtOrder`/`DependantClaim`；`DeathEvent`；`EstateExpense`；`CaseTimeline`。

---

#### 2.3 Kan：84.63% 控制权、6 封意愿书、“great deference”

**事实**

- 1995 年设 Jersey 的 Otto Poon Family Trust；HSBC 受托人；信托持 Analogue 84.63%，估值 HK$1,560,686,000。
- H 是 settlor/protector/潜在受益人；可罢免受托人；部分受托人权力需 H 同意；信托契约让受托人只做被动股东。
- 1996–2013 至少 6 封 letter of wishes；受托人高度尊重 H：1996 年 H 想加香港理工大学，4 天内做 deed；2008 离婚后按 H 要求把 Twin Bay Villas 公司股份转给 W；2013 年新意愿书要求信托垫付离婚判决款。
- 法院原话：受托人对 H “great deference”，把 H 和 Analogue 当 HSBC 的 “valued customers”；H 有 “very powerful position” 因为可罢免受托人；受托人在诉讼中与 H 立场一致，主张只有 2/3 信托资产是 H 的资源。
- CFA 认定整个信托基金都是 H 的财务资源；CA 判 W HK$510.4m；CFA 计算起点 HK$840m；批评受托人立场，并就 costs 作 order nisi。

**为什么重要**

- 控制权会击穿“形式上的信托”；受托人过度顺从，法院会把信托资产视为 settlor 资源。
- 意愿书不是“参考文件”；它影响决策、披露、资产归属。
- 商业关系会污染信托治理；银行把 H 当客户，受托人又在诉讼中与 H 一致。
- 成本真实：受托人参与诉讼、立场错误，可能承担 costs。

**系统含义**

`ProtectorPower`/`LetterOfWishes`/`ConflictRegister`/`TrusteeDecision`/`DisclosurePack`/`LegalCost`。

---

#### 2.4 Tan：中风、三地法院、受托人交出裁量权

**事实**

- 2002-10-21 设 Tan Kim Choo Family Scholarship Trust（Cayman）；设托人是第一至第四被告的父亲、第五至第十被告的祖父；全权信托。
- 意愿：信托分两个 sub-fund；第一个给孙辈，子女不得干预；第二个给长子，可用于建 T Tower（75% 信托资产 notionally 分配）。
- 设托人 2018-08-29 去世；此前中风 3 年；子女争产。
- 2019-10 第三被告（一名子女）在新加坡起诉，要求分配/终止/辞任；第一被告（另一名子女）取得马来西亚禁令，冻结信托资产/禁止处置。
- 受托人向 Cayman Grand Court 申请指示/交出裁量权；法院接受，认为没有合理受托人会答应；信托不终止、受托人不辞任。

**为什么重要**

- 跨境失能/身故不是“文件翻译”：新加坡诉讼、马来西亚禁令、Cayman 信托，三种程序同时跑。
- 受托人会被夹在中间；继续抗辩/答应/辞职都可能被指违反义务。
- 法院 blessing 是真实机制；需要完整证据/法律意见/成本预算。
- 诉讼成本会吃掉信托资产。

**系统含义**

`CrossBorderCase`/`OrderConflict`/`SurrenderDecision`/`BeneficiaryCommunication`/`LitigationBudget`/`CapacityEvent`/`DeathEvent`。

---

#### 2.5 Otto Poon：受托人决定需要“法院级”证据

**事实**

- 与 Kan 同一信托；离婚后受托人决定把前妻排除出受益人类别；向 Jersey Royal Court 申请 blessing。
- 法院测试：善意；合理、受适当指导的受托人能否作出；是否被实际/潜在冲突污染。
- 上诉法院讨论：Royal Court 依赖受托人的 skeleton argument 解释决定，而没有要求进一步 affidavit/affirmation；所需细节取决于案件；在受益人不熟悉的事项上可能需要更多证据。
- 上诉最终被驳回；但案例被广泛引用为“momentous decision + evidence standard”。

**为什么重要**

- “决定”不是一句“我们考虑过了”；法院要看谁、何时、依据什么、有没有独立意见、有没有冲突、是否送达。
- 文件/邮件/会议纪要在诉讼中就是证据；只存 PDF 无法证明“当时为什么这么决定”。

**系统含义**

`DecisionRecord`/`ConflictCheck`/`EvidenceGrade`/`BlessingCase`/`DocumentDelivery`。

---

#### 2.6 DOJ / FINMA：税务与 AML 不是“报表”，是“证据与控制”

- **DOJ 2019**：HSBC Private Bank (Suisse) SA 承认与美国人合谋逃税；未申报账户/离岸结构/美国纳税人；US$192.35m；DPA+整改。
- **FINMA 2024**：2002–15 两段高风险 PEP 关系，>US$300m 黎巴嫩资金；未充分核实来源/目的/背景；未充分记录；未及时向 MROS 报告；禁止新开 PEP 关系。

**含义**

- 税务透明/CRS/FATCA/美国 nexus 不是“年底一张表”，是开户分类、实体穿透、受益所有人、历史 remediation、文档保留、顾问协同。
- PEP/AML 的核心是资金来源/目的/受益所有人/交易链的证据，不是“勾选高风险”。

**系统含义**

`TaxProfile`/`Residency`/`Indicia`/`BeneficialOwner`/`EntityGraph`/`RemediationCase`/`PEPStatus`/`SanctionsHit`/`SourceOfFunds`/`MROS`/`EvidencePack`。

---

### 3. 跨案件七个需求

| 需求 | 案件证据 | 产品含义 | 一等对象 |
|---|---|---|---|
| **控制权** | Kan 84.63%、Tao 40% Great Eagle、Zhang reserved powers | 控制权图谱；投票/罢免/否决/同意 | `ControlRight`/`ProtectorPower`/`BlockTrade` |
| **意愿版本** | Tao 1988 vs 2016–17；Kan 6+ 封；Tam 遗嘱+信托同日 | 版本/送达/撤回/冲突/权重 | `LetterOfWishes`/`WillVersion`/`TrustDeed` |
| **授权/能力** | Tan 中风；Tam 身故；HSBC POA 流程 | 文书/能力/生效/失效/辖区/登记 | `Authority`/`CapacityEvent`/`DeathEvent` |
| **跨境/跨实体** | Tan 三地；Kan Jersey/HK | 实体图谱/法院命令/承认/执行 | `EntityGraph`/`CrossBorderCase`/`OrderConflict` |
| **证据** | Otto Poon；Kan “great deference”；Tao 信件 | 决策/冲突/证据等级/法院包 | `DecisionRecord`/`ConflictRegister`/`EvidencePack` |
| **流动性** | Tam 月度支付；Kan 离婚判决；D3 私股 | 现金流/受益支付/质押/义务 | `BenefitPayment`/`LiquidityPlan`/`ObligationCalendar` |
| **家族冲突** | Tam 母亲/长子/孙辈；Tao 家族分支；Tan 子女 | 角色/受益人类别/沟通/保密 | `FamilyRole`/`BeneficiaryClass`/`Communication` |

---

### 4. 这些案件不证明什么

1. 不证明 HSBC 服务差；很多是家族争议，法院未必认定银行有错。
2. 不证明 Avaloq 是原因；案件在法律/信托/家族层面。
3. 不证明客户愿意付费；需求强度≠付费意愿。
4. 不证明新系统能防止家族冲突；系统只能让权限/证据更清楚。
5. 不证明“72 小时”可行；法律程序/跨境承认/法院命令需要时间。
6. 不证明所有富人都这样；极端样本定义失败成本上限。

---

### 5. 来源

- Tao: https://legalref.judiciary.hk/lrs/common/ju/ju_body.jsp?DIS=113766
- Tam: https://www.trusts.it/admincp/UploadedPDF/201008121309150.Tam%20Mei%20Kam%20v.%20HSBC%20International%20Trustees%20Ltd%20and%20others,%20HKCA%20197,%202%20July%202010.pdf
- Kan: https://legalref.judiciary.hk/lrs/common/ju/ju_body.jsp?DIS=93918
- Tan: https://www.stewartslaw.com/news/cayman-islands-grand-court-accepts-surrender-of-discretion-of-a-trustee/
- Otto Poon: https://www.viberts.com/news-insights/case-note-court-decision-2015-jca109-rep-of-otto-poon-trust/
- DOJ: https://www.justice.gov/archives/opa/pr/justice-department-announces-deferred-prosecution-agreement-hsbc-private-bank-suisse-sa
- FINMA: https://www.finma.ch/en/news/2024/06/20240618-mm-hsbc/
- Zhang / Prest / Ilott / Philipp / Singularis: UKSC/HKCFA official reports.

---

## D. 行业机制：失能/身故、税务、Pre-IPO

<!-- source: 01-user-journey/02-evidence/07-industry-mechanics.md -->

> 目的：把“银行能做什么/不能做什么”写清楚，避免把营销语言当机制。
> 范围：HSBC、UBS、Citi、SCB、Avaloq；公开资料为主，标注“待验证”的为供应商/内部确认项。
> 不是法律/税务/投资建议。

---

### 0. 一张表

| 场景 | 客户真正需要的 | 银行角色 | 关键对象 | Avaloq 的位置 |
|---|---|---|---|---|
| **失能** | 谁现在能决策、能付哪些钱、依据什么 | POA/EPA/LPA/deputy 的登记与执行 | `Authority`/`CapacityEvent`/`Payment` | 账户/支付/授权记录强；法律授权图谱弱 |
| **身故** | 谁有权处理遗产、何时拿钱、税/债/受益 | executor/administrator 的银行接口；trustee 的信托管理 | `DeathEvent`/`EstateCase`/`ProbateCase`/`TrustCase` | 账户/文档/支付强；probate/证据编排弱 |
| **税务** | 我在哪交、交什么、谁报、证据在哪 | 数据/预扣/CRS/FATCA/报告；通常不代报 | `TaxProfile`/`TaxLot`/`TaxPack` | TAX2 交易税/预扣强；全球个人申报/行外收入弱 |
| **Pre-IPO** | 不卖股怎么拿钱、估值/质押/退出 | 信贷/质押/对冲/二级/资本市场 | `PrivateAsset`/`Valuation`/`Pledge`/`Exit` | 标准信贷/抵押强；私股生命周期弱 |

> 一句话：**三家大行不是“没有服务”，而是“服务由人、邮件、Excel、外部律师/估值师拼起来”；Avaloq 不是“没有能力”，而是“能力围绕账户/交易/单据，不围绕家族/授权/证据”。**

---

### 1. 失能/身故

### 1.1 两条法律链（必须先分清）

#### A. 失能（在世）

| 阶段 | 谁有权 | 文件 | 银行动作 | 常见失败 |
|---|---|---|---|---|
| 能力尚存 | 客户 | POA/EPA/LPA | 见证/登记/教育 | 拖延/没登记 |
| 能力下降 | 仍为客户；必要时法院 | 医疗证明/能力评估 | 限制异常交易；提示家属/律师；不擅自披露 | 银行假装没看见/过度冻结 |
| 能力丧失 | attorney/deputy/committee | 已登记 POA/法院命令 | 登记代理人；设权限；支付 | 文件范围不清/joint attorney 冲突/系统不支持 |
| 争议 | 法院 | 监护/ deputyship/禁令 | 遵守法院命令；必要时冻结/申请指示 | 银行自行判断“谁更适合” |

**关键：没有 probate。** Probate 是死亡后的遗产认证。

#### B. 身故

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

### 1.2 HSBC 的公开机制

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

### 1.3 UBS / Citi / SCB

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **UBS** | estate planning 框架（will/revocable trust/DPOA/health care/trust/insurance/communication）；明确不提供税务/法律意见；trust 由关联/第三方实体；Wealth Way（Liquidity/Longevity/Legacy）；GFO 2025 | 强在规划框架/全球平台/研究；具体 estate/POA 执行依赖当地法律/第三方 |
| **Citi** | trust/estate planning 与独立法律/税务顾问合作；Family Office Advisory 1,800+ 家办；Private Capital Group；Family Office Leadership Program | 强在家办/信托/CIB 联动；公开 bereavement/POA 操作细节不如 HSBC UK |
| **SCB** | Legacy planning、family office setup、trust/philanthropy、next-gen；`Celebrating Life's Work`；The Great Repositioning；肯尼亚 online estate planning | 强在新兴市场/跨境/传承/下一代；estate 数字化有尝试，深度取决于辖区 |

### 1.4 RM 的角色

| 能做 | 不能做 |
|---|---|
| 表达哀悼/稳定客户 | 自行判断“谁有权” |
| 解释流程/收集文件/引荐团队 | 向无权家属披露 |
| 协调内部（ops/legal/compliance/tax/credit） | 承诺“几天拿钱” |
| 维护家族关系/下一代 onboarding | 替代律师/法院/executor |
| 识别冲突/异常/欺诈并升级 | “看在客户面子上”破例 |

---

### 2. 税务：银行不代客报税

### 2.1 正确边界

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

### 2.2 Avaloq TAX2 的真实边界（重要修正）

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

### 2.3 各家的公开机制

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **HSBC** | 全球 CRS/FATCA；预扣/报告；历史 DOJ 补救经验；私行/零售 tax reporting | 强在全球网络/预扣/历史补救；弱在“一个客户一个跨实体 tax pack” |
| **UBS** | 全球 tax reporting/transparency；税务报表/凭证；独立顾问 | 强在报告标准/跨境规划；申报本地化 |
| **Citi** | 全球托管/报告；tax reporting 与独立顾问；Private Capital 跨 border structuring | 强在机构级报告/家办；个人申报依赖顾问 |
| **SCB** | CRS/FATCA/本地 tax reporting；wealth planning 与顾问 | 强在本地市场/跨境；深度取决于辖区 |
| **Avaloq** | TAX2 交易税/预扣；CRS/FATCA；组合会计/成本基础；报告 | 强在托管资产/上市证券；弱在全球个人税/私股/跨实体 |

### 2.4 D2 的正确目标

1. **不做“代客报税”**；做“adviser-ready tax data pack”。
2. **责任矩阵**：银行/客户/顾问/信托/雇主各负责什么。
3. **字段**：身份/居民、实体、收入分类、tax lot/cost basis、预扣、CRS/FATCA、私股分配、FX、费用。
4. **顾问 portal**：客户授权后可下载/核对；访问留痕。
5. **历史补救**：未申报/错报/罚金；HSBC 的真实经验。
6. **指标**：数据包完整率、顾问退回率、预扣准确率、CRS/FATCA 及时率、补救周期。

---

### 3. Pre-IPO：不是贷款产品，是私有资产生命周期

### 3.1 生命周期

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

### 3.2 五条路径

| 路径 | 做什么 | 优点 | 缺点 | 适用 |
|---|---|---|---|---|
| **持有** | 不融资，等 IPO/分红 | 保留上行/控制权 | 无流动性；集中度 | 现金流充足 |
| **卖老股/ secondary** | 二级/tender/老股转让 | 真流动性；分散 | 折价；税；控制权；锁定期 | 有买家/窗口 |
| **质押/贷款** | Lombard/私股质押/资本调用贷款 | 不卖股；保留上行 | 追保；利息；质押执行；跨境 | 有稳定估值/现金流 |
| **对冲** | collar/forward/variable prepaid forward/exchange fund | 降低下行；延迟税 | 复杂；对手方/抵押；上行 capped | 上市/流动性较好 |
| **结构化** | 接续基金/结构化 secondary/bridge | 定制；大额 | 费用；利益冲突；监管 | 大额/复杂 |

### 3.3 信贷机制

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

### 3.4 各家的公开机制

| 机构 | 公开机制 | 判断 |
|---|---|---|
| **HSBC** | Marketable securities backed finance（HK/US stocks/ETFs 最高约 70%）；Tailored Lending/Specialized Asset Finance；Liquidity Planning；HSBC Access（科技/初创/co-invest/VC） | 标准证券质押/定制信贷强；私股质押公开细节少，逐案 |
| **UBS** | Lombard/多币种；concentrated stock；pre-IPO liquidity；Wealth Way | 强在全球资本市场/结构化融资 |
| **Citi** | margin lending 全球 US$25.3bn；collateral 广；cross-border；Private Capital Group 1,400/77 国；pre-IPO/liquidity、capital call、concentrated stock/PE/art/aircraft | 公开机制最完整；仍是团队+产品，不是单一系统对象 |
| **SCB** | wealth lending/structured lending；legacy/trust/succession 差异化 | 强在新兴市场/跨境/传承；Pre-IPO 公开细节较少 |
| **Avaloq** | lending & credit：securities-based lending、exotic collateral、credit risk、collateral appraisal、complex loans；`COLLAT_LOT_DISTR#CMPL` | 标准信贷/抵押强；私股估值治理/IPO 生命周期/insider window/跨境执行弱 |

### 3.5 D3 的正确目标

1. **不是“Pre-IPO 贷款”**，是“私有资产生命周期”。
2. **3 天形成可决策包**（估值方法/LTV/质押/先决条件/风险/退出），不是 3 天批贷。
3. **估值治理**：方法/折扣/日期/审批/复核；每个数字有依据。
4. **生命周期**：融资轮、lock-up、IPO 窗口、静默期、老股转让、secondary、forward sale、10b5-1。
5. **质押执行**：登记/公司同意/股东协议/跨境承认。
6. **义务日历**：capital call/distribution/earn-out/vendor loan/NAV/税。
7. **负向需求**：不做 insider trading；不绕过预清算/窗口；不承诺 IPO 价格；不把纸面估值当市值。

---

### 4. 主要来源

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

---

## E. Personas：21 组 HTML 核心案例 + 23 行 CSV 家族池

<!-- source: 01-user-journey/02-evidence/personas/README.md -->

`personas/` 保存 **v3.5《下一代私行核心：17 组核心人物 + 4 个财富带案例的结构性场景》**。HTML 为 21 个核心案例；CSV 为 23 行家族池（含 2 个补充公开家族模式：Lego/KIRKBI、Tata）。

> v3.5（2026-10-23）：公开事实校准——Ali 行医年份、Alvin 书出版年、Hawker Chan 年龄与 Bib Gourmand、梁文锋双榜单口径与 2026-06 融资结构、Nadiya 2018 年英国法定登记；页头元数据同步为 20 组公开 + 1 匿名。

- 主文件：[`personas/nextgen-pb-real-people-cases.html`](personas/nextgen-pb-real-people-cases.html)
- 替代：v2.1《跨境私行案例集：CN·HK / CN·SG / IN·UK / 欧洲投美》
- 性质：**内部设计输入，非营销材料**，不构成税务、法律或投资建议。

### 这份文档做什么

用 20 组**公开可核验**的真实人物与家族、加 1 组匿名化家庭结构作为原型，反推下一代私行核心系统必须承载的对象与判定：

1. **方法论**：五条硬规则——只用公开事实、不指称客户关系、不评价合规、推演与事实分层、匿名结构例外（R5）。
2. **17 组核心案例 + 4 个财富带案例**：前 11 组为超高净值结构，§12–§15 为 US$5m–100m 中段结构，§16 为 Pre-IPO，§17 为匿名家庭，§18–§21 为 US$2–5m / US$5–10m 的四个真实人物；每组命中一种其他案例没有的结构。
3. **12 个一等对象**：自然人、经济权益、法律实体、家族图谱、权利矩阵、义务、授权、争议状态、时点、承诺、客户群、资产—制度栈。
4. **与 v2.1 的对照**：哪些结论被加强、哪些被推翻、哪四类只能保留为合成案例。
5. **验证动作**：法务预审、向 Avaloq 新增 10 问、规则治理、可推翻条件。

### 17 组核心人物 + 4 个财富带案例

| # | 人物 / 家族 | 唯一测试的结构 |
|---|---|---|
| 1 | 周群飞 | A+H 两个登记系统、同一经济权益 |
| 2 | 李西廷 | 四个证券制度、二十年历史仍有效 |
| 3 | 张勇 · 舒萍 | 家族办公室作为客户主体、信托交易触发董事窗口 |
| 4 | 李嘉诚家族 | 受益人类别、三权分离、三十年的分家 |
| 5 | 郑裕彤家族 | 十个月四种授权身份、企行/私行/信托冲突 |
| 6 | 郭鹤年家族 | 家族是图不是树、堂侄分支 |
| 7 | Poonawalla 家族 | 一栋房子、三个制度、三个申报主体 |
| 8 | Majid Al Futtaim 家族 | 授权矩阵与争议状态、伊斯兰继承 |
| 9 | Mittal 家族 | 辖区迁移的十年影子期 |
| 10 | Premji 家族 | 经济权/投票权/处分权三权分离 |
| 11 | Murdoch 家族 | 契约版本、法院命令、受托人决议的效力排序 |
| 12 | Guy Singh-Watson | 没有市场价的 EOT 退出、卖方贷款、分期流动性 |
| 13 | Sarah Wood | 或有对价、股权瀑布、留任锁定 |
| 14 | Jamie Vardy | 短收入窗口、形象权、非现金股权 |
| 15 | Neame 家族 | 家族控制上市公司、薄市场、经营型物业 |
| 16 | 梁文锋 | Pre-IPO 纸面财富、私人股权质押、可花费财富 |
| 17 | 何氏家族（匿名） | 女性/家庭/子女、主客户失能、五种角色与四种权利 |

#### 财富带补充（§18–§21，真实人物）

| # | 人物 | 档位（HSBC AUM，设计假设） | 唯一测试的结构 |
|---|---|---|---|
| 18 | Ali Abdaal | US$2–5m | UK→HK 迁移、创作者收入/版税、数字优先成本-to-serve |
| 19 | Nadiya Hussain | US$2–5m | 女性独立客户、版税/形象权、教育金与监护 |
| 20 | Alvin Leung | US$5–10m | 香港餐饮多实体、个人担保、品牌与传承（不是制造业） |
| 21 | Chan Hon Meng（Hawker Chan） | US$5–10m | 加盟/版税、薄利、品牌生命周期、SG/MY 跨境继承 |

### 使用边界

- 不进任何客户营销物料、不在客户活动中使用、不写进任何「税务优化」话术。
- 不表示上述人物是本行客户，不表示其与本行有任何业务关系。
- 不涉及任何非公开的账户、金额、税务安排、信托条款或家庭内部信息。
- 正式引用前须经法务逐案预审；报道类事实不得升级为「已核实」。
- §17 是全文唯一的匿名案例（R5 匿名结构例外），不得伪装成公开人物；§18–§21 是真实人物，但其 HSBC AUM/总财富/钱包份额/费率均为设计假设，不构成公开财富或客户关系陈述。
- 媒体估计的财富数字（如 Vardy 的 £37m、Neame 家族的 US$50m–75m）只能作为量级参考，不得写成披露数据。
- 未成年人一律匿名；在世人物只引用已公开内容。

### 如何查看

直接用浏览器打开 HTML 文件即可。文档自带目录、锚点与响应式布局，无外部依赖。

```bash
open /Users/weimingzhuang/Documents/source_code/meridian-pb/01-user-journey/personas/nextgen-pb-real-people-cases.html
```

---
