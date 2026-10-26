# 05 — 专业名词解释表（POA / CRS / FATCA / Trustee / PCG …）

> 用法：内部设计/汇报/需求评审的统一语言。不是法律/税务意见；具体适用须由当地律师/税务顾问确认。
> 原则：**英文缩写 → 中文 → 一句话解释 → 为什么在私行/核心系统里重要。**

---

## 0. 最容易混淆的 12 组词

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

## 1. 法律、传承与授权

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

## 2. 税务与监管

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

## 3. 私行、投资与流动性

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

## 4. 家族治理与下一代

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
| **Family Office CEO / CIO** | 家办首席执行官/投资总监 | 家办的专业角色 | 与家族成员/银行 RM 区分 |

---

## 5. 系统、数据与证据

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

## 6. 机构与角色

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

## 7. 一句话记忆

- **POA 是生前授权，Will 是死后生效，Trust 是独立法律安排。**
- **Probate 是法院认证，不是银行流程；POA 在死亡时自动终止。**
- **CRS 是多边信息交换，FATCA 是美国合规；都不是“个人报税表”。**
- **Withholding 是代扣，tax filing 是申报；银行通常只做前者+数据。**
- **Trustee 管信托，Executor 管遗产，Beneficiary 受益，UBO 是最终受益所有人。**
- **PCG 在 Citi 指 Private Capital Group；换一家机构可能指 Private Client Group，必须看上下文。**
- **LTV 不是“市值×固定比例”；haircut、lendable value、估值日、集中度、锁定期都要写清。**
- **Avaloq 的 TAX2 是在自己系统内的交易/事件上算税/预扣；它看不到行外收入，也不是全球个人报税平台。**

---

## 8. 参考

- HSBC UK, *Power of Attorney* / *Bereavement* 官方页面（POA/ probate 流程与权限矩阵）。
- OECD, *Common Reporting Standard (CRS)* / *AEOI*.
- IRS, *FATCA* / *QI* / *W-8BEN* / *1042-S*.
- HMRC, *Tax on savings and investments*.
- HSBC, *Trust and Fiduciary Services 80 years in Asia*（TFS 服务范围）。
- 本项目 [`../../02-functional-architecture/02-avaloq-boundary.md`](../../02-functional-architecture/02-avaloq-boundary.md)（Avaloq TAX2 的真实边界）。
