# 06 — 公开法律卷宗：富人真实痛点与压力证据

> 性质：公开判例/监管文件研究，不是法律意见；不主张任何案件当事人是本行客户。
> 用途：为 [`../05-scenarios/02-stress-journeys.md`](../05-scenarios/02-stress-journeys.md) 提供事实锚点；为 [`../../02-functional-architecture/03-data-model.md`](../../02-functional-architecture/03-data-model.md) 提供对象需求。
> 证据等级：A 法院/监管；B 官方/年报；C 媒体/当事人主张。

---

## 0. 结论

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

## 1. 案件矩阵

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

## 2. 深读：六个 HSBC 相关案件

### 2.1 Tao：控制权、意愿书版本、受托人冲突

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

### 2.2 Tam：20 年遗产/信托、月度现金流、家庭供养

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

### 2.3 Kan：84.63% 控制权、6 封意愿书、“great deference”

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

### 2.4 Tan：中风、三地法院、受托人交出裁量权

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

### 2.5 Otto Poon：受托人决定需要“法院级”证据

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

### 2.6 DOJ / FINMA：税务与 AML 不是“报表”，是“证据与控制”

- **DOJ 2019**：HSBC Private Bank (Suisse) SA 承认与美国人合谋逃税；未申报账户/离岸结构/美国纳税人；US$192.35m；DPA+整改。
- **FINMA 2024**：2002–15 两段高风险 PEP 关系，>US$300m 黎巴嫩资金；未充分核实来源/目的/背景；未充分记录；未及时向 MROS 报告；禁止新开 PEP 关系。

**含义**

- 税务透明/CRS/FATCA/美国 nexus 不是“年底一张表”，是开户分类、实体穿透、受益所有人、历史 remediation、文档保留、顾问协同。
- PEP/AML 的核心是资金来源/目的/受益所有人/交易链的证据，不是“勾选高风险”。

**系统含义**

`TaxProfile`/`Residency`/`Indicia`/`BeneficialOwner`/`EntityGraph`/`RemediationCase`/`PEPStatus`/`SanctionsHit`/`SourceOfFunds`/`MROS`/`EvidencePack`。

---

## 3. 跨案件七个需求

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

## 4. 这些案件不证明什么

1. 不证明 HSBC 服务差；很多是家族争议，法院未必认定银行有错。
2. 不证明 Avaloq 是原因；案件在法律/信托/家族层面。
3. 不证明客户愿意付费；需求强度≠付费意愿。
4. 不证明新系统能防止家族冲突；系统只能让权限/证据更清楚。
5. 不证明“72 小时”可行；法律程序/跨境承认/法院命令需要时间。
6. 不证明所有富人都这样；极端样本定义失败成本上限。

---

## 5. 来源

- Tao: https://legalref.judiciary.hk/lrs/common/ju/ju_body.jsp?DIS=113766
- Tam: https://www.trusts.it/admincp/UploadedPDF/201008121309150.Tam%20Mei%20Kam%20v.%20HSBC%20International%20Trustees%20Ltd%20and%20others,%20HKCA%20197,%202%20July%202010.pdf
- Kan: https://legalref.judiciary.hk/lrs/common/ju/ju_body.jsp?DIS=93918
- Tan: https://www.stewartslaw.com/news/cayman-islands-grand-court-accepts-surrender-of-discretion-of-a-trustee/
- Otto Poon: https://www.viberts.com/news-insights/case-note-court-decision-2015-jca109-rep-of-otto-poon-trust/
- DOJ: https://www.justice.gov/archives/opa/pr/justice-department-announces-deferred-prosecution-agreement-hsbc-private-bank-suisse-sa
- FINMA: https://www.finma.ch/en/news/2024/06/20240618-mm-hsbc/
- Zhang / Prest / Ilott / Philipp / Singularis: UKSC/HKCFA official reports.
