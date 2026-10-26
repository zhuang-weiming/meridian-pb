# 02 — Avaloq 能力边界：它到底强在哪、弱在哪、该不该换

> 依据：外部源码审计目录 `/Users/weimingzhuang/Documents/source_code/avaloq/doc`（K/AFS、package/procedure、table/column/constraint、配置基线）与 Avaloq 官方产品页。
> 重要：**本文分析 Avaloq 的能力，是为了“自研重写”的需求基线，不是保留/续订计划。** 目标是用自有系统替换 Avaloq，Avaloq 仅作能力参考与迁移来源。
> 重要：**“未找到”不等于“没有”**；本文把“源码/产品证据”与“待验证假设”分开。
> 证据等级：A 源码/表结构直接证据；B 官方产品文档；C 行业/同事口径；D 待验证。

---

## 0. 先修正上一版的三个错误

### 错误 1：“Avaloq 的强项是 TAX2/报告，所以它能做个人税务申报”

**不对。**

- `TAX2_EVT#CALC` / `TAX2_EVT#` 是 **Avaloq 自己系统内的事件/交易税计算与结果记录**：按 tax type、日期、BU、object、direction、settlement plan、currency、classification 等选规则，计算/换算/记入 `TAX2_EVT_SERPIL`。
- 它处理的是 **Avaloq 账本内的交易/持仓/事件**；它不会自动知道客户在行外的工资、版税、私股、信托分配、海外实体。
- EasyTax 是瑞士各州税务申报生态的集成/产品，不是全球个人税务申报引擎。
- CRS/FATCA 是账户分类/报告，不是个人报税表。

**正确说法：**

> Avaloq 是“银行侧交易税/预扣/报告引擎”；不是“全球个人综合所得税申报平台”。

### 错误 2：“Avaloq 没有工作流/客户生命周期”

**不对。**

- 源码审计：22,455 个存储过程；**58.4%** 是 `TASK_*`/`TQ_*`/`WFC_*` 工作流/任务；**26.7%** 是 `NETW_*` 集成；**14.9%** 是核心业务。
- 有 `DOC` 通用单据、`WFC_STATUS/ACTION/RULE`、`DOC_CLT` 客户生命周期、`TASK_DOC_CLT` 工作台。
- 所以它有“单据/任务/客户生命周期”，但**不是“法律事件/授权/证据”的生命周期**。

### 错误 3：“Avaloq 没有税务/抵押/信贷能力”

**不对。**

- `TAX2` 有真实的税事件/规则/金额/反向/持久化。
- `COLLAT_LOT_DISTR#CMPL`、`LIHI`、`CRED_CRIT_DSP#AGGR_PROC`、`HS$CREDIT_PD_PROC` 等有抵押/额度/信用风险。
- 它缺的是 **私股估值治理/IPO 生命周期/跨境质押执行/义务日历**，不是“折价率/抵押金额”这类基础字段。

---

## 1. 证据基线

| 维度 | 数量/事实 | 含义 |
|---|---|---|
| 索引文件 | 189,648 | 源码审计基线 |
| K 核心 schema | 14,993 表、355,994 列、40,599 约束 | 交易/账本/单据/主数据 |
| AFS 前台 | 584 表（305 业务只读 + 279 `ERR$_`） | 前台展示/查询隔离 |
| 存储过程 | 22,455 | 工作流 58.4% / 集成 26.7% / 核心 14.9% |
| HSBC 定制层 | 544 表、335 存储过程、155 函数、1,298 网络适配器 | `HS$`/`NETW_HS$`；升级/替换成本高 |
| 配置基线 | 93 表、276,014 行 | 税规则 11,853、费用 tariff 15,321、支付规则 4、结算计划 1,052 等 |

> 这些数字说明：Avaloq 不是“一个简单核心”，而是**深度定制、工作流密集、集成密集**的平台。全量替换的迁移/并行/监管风险很高。

---

## 2. 能力矩阵

| 能力 | 证据 | 判定 | 说明 |
|---|---|---|---|
| **客户/业务伙伴/合同** | `OBJ_BP`/`OBJ_PERSON`/`OBJ_CONT`/`OBJ_PERSON_REL2` | **强** | 人/公司/合同/关系/参与/代表/授权字段 |
| **账户/持仓/交易/结算** | `DOC_STEX`/`DOC_SETTLE`/`POS`/`BALSTRU` | **强** | 交易/结算/估值/会计 |
| **总账/会计** | `BE_BOOK#PUT`/`CODE_COA` | **强** | 复式记账/多币种 |
| **绩效/费用** | `PERF_CALC#TWRR/MWRR`/`TASK_FEE` | **强** | GIPS/费用 |
| **支付/现金** | `DOC_SETTLE`/`PAY_CHAN_RULE`/`NETW_SWIFT` | **强** | 支付/清算/SWIFT |
| **信贷/抵押/额度** | `COLLAT_LOT_DISTR#CMPL`/`LIHI`/`CRED_CRIT_DSP` | **强** | 抵押编译/额度/信用风险 |
| **交易税/预扣** | `TAX2_EVT#CALC`/`TAX2_EVT_RULE#`/`TAX2_EVT#` | **强（账本内）** | 交易/事件税；不是个人报税 |
| **CRS/FATCA 报告** | `NETW_*`/TAX2/合规 | **中强** | 账户分类/报告；不是税包 |
| **单据/工作流/任务** | `DOC`/`WFC`/`TASK_*`/`DOC_CLT` | **强** | 通用单据/任务/客户生命周期 |
| **文档/版本** | `DOC`/`DOC_CLT` | **中强** | 版本/归档；不是法院级证据模型 |
| **集团/Chinese Wall** | 集团/授权/额度/审计 | **强** | 账户/授权/额度/墙 |
| **前台/AFS** | 584 表 | **强** | 查询/展示 |
| **法律授权图谱** | `OBJ_BP_PERS_REL_AUTH` 有字段，但无通用授权算法/UBO/家庭继承签字权 | **弱/待验证** | 字段≠法律判断 |
| **遗产/probate** | 未找到原生 `EstateCase`/`ProbateCase` | **弱/待验证** | 可能配置/定制 |
| **信托/受益人图** | 有 BP/REL/信托产品线索；无通用 UBO/受益权算法 | **弱/待验证** | 需新核心 |
| **私股估值治理/IPO 生命周期** | 有信贷/抵押；无 `PrivateAsset` 生命周期 | **弱/待验证** | D3 缺口 |
| **家族治理/下一代** | 无原生对象 | **弱** | 新核心 |
| **跨境法院命令/承认执行** | 未找到原生对象 | **弱/待验证** | 新核心 |
| **证据包/决策记录** | 有审计/日志/文档；无法院级证据模型 | **中/待验证** | 新核心 |
| **全球个人税务申报** | TAX2 是账本内交易税；EasyTax 瑞士 | **不在范围** | 合作/外部 |
| **税务/法律意见** | 不提供 | **不在范围** | 合作 |
| **通用 AI/聊天** | 无/合作 | **不在范围** | 买/合作 |

**读法：**

- **强**：保留/复用，别重写。
- **弱/待验证**：先做供应商 demo/数据模型审查；不要直接写成“没有”。
- **不在范围**：银行本来就不该做，或应合作。

---

## 3. TAX2 深读：它到底做什么

### 3.1 调用链

```
TAX2_EVT#CALC
  → TAX2_EVT#.VAL
    → TAX2_EVT_RULE#.GET_RULE   (选规则)
    → TAX2_EVT_VAL#.TAX2_EVT#VAL (算金额)
    → TAX2_EVT_SERPIL#.ADD_REC   (结果)
  → TAX2_EVT#REVS                (反向)
  → TAX2_EVT_SERPIL#.PUT         (持久化)
```

### 3.2 规则选择

- 按 `TAX_TYPE`、日期、BU、object、direction、settlement plan、currency、classification 等过滤。
- 候选按 `SEQ_NR, PRIO DESC`；同一 sequence 第一个通过 post-query checks 的候选被接受。
- `COND` 是动态 SQL/表达式；返回 `+` 才通过。
- 汇率按事件/ posting sequence/ cost key 的最近 sequence 选；不是“执行时间最近”。

### 3.3 金额

- 方法 1：`VALUE_AC = TO_NUMBER(VALUE1) * AMOUNT / 100`（百分比）。
- 方法 2：汇率方法。
- 其他：复用事件金额/方法。
- `VALUE_TC = MP_CURRY.RD(DEST_SGN * VALUE_AC * XRATE, TaxCurrency, TRUE)`（简化）。
- NULL 不会被自动当 0；缺百分比可能产生 NULL，不是“零税”。

### 3.4 它不做什么

| 不做 | 说明 |
|---|---|
| 不看行外收入 | 只处理 Avaloq 内的事件/持仓 |
| 不判断税务居民身份 | 身份是输入/分类，不是 TAX2 自动判定 |
| 不做个人综合所得税申报 | 无 UK/HK 个人报税表 |
| 不做税务建议 | 规则/配置，不是法律意见 |
| 不做跨境协定筹划 | 可配置预扣/协定，但不是顾问 |
| 不做 CRS/FATCA 个人申报 | 报告是账户分类/交换，不是个人税表 |

### 3.5 正确使用

- 银行侧：交易税/预扣/税务事件/报告。
- 客户侧：tax data pack（来自自研核心/迁移数据 + 行外 + 实体 + 顾问）。
- 责任：银行对数据/预扣/报告负责；客户/顾问对申报/结论负责。

---

## 4. 其他能力的真实边界

### 4.1 客户/关系

- `OBJ_BP`/`OBJ_PERSON`/`OBJ_CONT`/`OBJ_PERSON_REL2`/`OBJ_BP_PERS_REL_AUTH` 能记录人/公司/合同/关系/代表/参与/授权字段。
- 但源码审计明确：
  - 没有通用 25% UBO 阈值；
  - 没有自动最终自然人穿透；
  - 没有家庭继承签字权；
  - `AUTH_ROLE`/`LIMIT`/`SIGN_LIST` 是记录，不是完整授权算法。
- 所以：Avaloq 可作为“人员/关系/授权字段”的输入，不是“法律授权图谱”的事实源。

### 4.2 文档/工作流

- `DOC` 有 `META_TYP_ID`/`WFC_STATUS_ID`/`WFC_ACTION_ID`/dates/BP/CONT；`WFC` 有状态/动作/规则缓存；`DOC_CLT` 有客户生命周期/工作项/FDM。
- 但它是“单据/任务”模型，不是“法律事件/授权/证据”模型；没有 `Authority`/`EstateCase`/`ProbateCase`/`EvidencePack` 的原生语义（待验证）。
- 可作为文档/任务/审批的执行端；新核心做法律/证据/编排。

### 4.3 信贷/抵押

- `COLLAT_LOT_DISTR#CMPL` 编译累计百分比/分段；`LIHI` 额度层级；`CRED_CRIT_DSP`/`HS$CREDIT_PD_PROC` 信用风险。
- 但源码审计：抵押分段/额度节点不等于“已批准授信”；估值/折扣/LTV/执行仍需信贷/估值委员会。
- 所以：Avaloq 做“额度/抵押/风险”的记录与计算；新核心做“私股估值治理/质押执行/生命周期”。

### 4.4 私股/Pre-IPO

- Avaloq 的信贷/抵押能记录抵押品/额度/追保；但没有 `PrivateAsset` 生命周期、融资轮、lock-up、IPO 窗口、secondary、forward、义务日历（待验证）。
- 所以：Avaloq 做“账/额度”；新核心做“生命周期/治理/证据”。

### 4.5 税务/合规

- TAX2/CRS/FATCA/报告强；个人税包/行外/多实体/私股弱。
- 制裁/PEP/AML 有监测/审计线索；但高风险判断/来源/目的/上报仍是人+规则+证据。

---

## 5. 替换 vs 扩展：三种方案

| 方案 | 范围 | 优点 | 缺点 | 适用 |
|---|---|---|---|---|
| **A. 扩展 Avaloq** | 在 Avaloq 上加家族/授权/案件/私股对象/工作流 | 迁移低；复用账本/信贷/支付 | shadow core；双份数据；升级更贵；每加一条旅程多一层定制 | T5 未证明；短期 |
| **B. 分阶段自研替换** | 自研 L1/L2；自研 L0 按产品/辖区替换；Avaloq 仅参考/迁移 | 语义正确；渐进；可回退；业务见效快 | 双跑/集成/数据 ownership/组织；需要明确不续订时间表 | **推荐（目标：不续订 Avaloq）** |
| **C. 全量替换** | L0–L2 全换 | 单平台；长期简单 | 迁移 544 表/1,298 适配器/并行/监管/供应商退出；最高风险 | T5 明确证明 |

### 5.1 为什么推荐 B

1. **Avaloq 的强项是 L0**：交易/账本/支付/信贷/税务事件；把它作为能力参考和迁移来源，而不是长期平台；风险通过分阶段自研/双跑管理，目标是不续订。
2. **新核心的差异化是 L1/L2**：家族/授权/事件/证据/私股生命周期；这些 Avaloq 不擅长。
3. **HSBC 定制层巨大**：544 表/335 存储过程/155 函数/1,298 适配器；全量替换的迁移/并行/监管成本极高。
4. **分阶段**：先建 L1/L2，用 D1/D3/D2 证明价值；12–18 个月后开始 L0 迁移，而不是决定“是否保留”。
5. **供应商路线**：Avaloq 在云/API/PE/信贷上持续投入；替换必须跑赢 roadmap，而不只是“功能更多”。

### 5.2 什么时候才考虑 C

- T5 量化证明：扩展的 3 年 TCO/变更速度/升级风险明显劣于替换；
- 供应商退出/合同/监管压力；
- 有可参考的同类私行全量迁移成功案例；
- 有 36–60 个月的预算/组织/并行能力；
- 监管/客户/董事会接受迁移风险。

> 没有这五个条件，宣布“全量替换 Avaloq”是不负责任的。

---

## 6. 给供应商/架构团队的 12 个问题

1. `OBJ_BP_PERS_REL_AUTH` 能否表达“文书类型/范围/生效/失效/辖区/登记”？还是只是字段？
2. `DOC_CLT`/`WFC` 能否表达“死亡/失能/IPO/搬迁”事件，并 as-of 重放？
3. 是否有 `EstateCase`/`ProbateCase`/`TrustCase` 原生对象？还是定制？
4. 是否有 `EvidencePack`/`DecisionRecord`/法院级审计？还是日志？
5. 私股/Pre-IPO 是否有 `PrivateAsset`/`ValuationGovernance`/`Pledge`/`Obligation`/`Exit`？
6. TAX2 能否接收行外收入/实体/信托分配？还是只处理 Avaloq 事件？
7. CRS/FATCA 报告能否生成“客户税包”，还是只有监管 XML？
8. 多实体/多辖区/多币种/多语言/多时区如何支持？
9. API/事件/Webhook 的覆盖/延迟/幂等/权限？
10. 升级/定制/云/退出条款？HSBC 定制层如何迁移？
11. 数据模型是否支持 consent/目的/角色/字段级权限？
12. 参考客户中，是否有“家族办公室/多代/跨境”成功案例？结果如何衡量？

---

## 7. 主要来源

- `avaloq/doc/02_system_architecture/README.md`（22,455 procedures/58.4%/26.7%/14.9%；HSBC 定制层）
- `avaloq/doc/03_data_architecture/01_MASTER_DATA_CATALOG.md`（3,950 CODE_* tables；参考数据边界）
- `avaloq/doc/03_data_architecture/03_CONFIGURATION_BUSINESS_BASELINE.md`（93 表/276,014 行；税规则 11,853）
- `avaloq/doc/04_business_domains/pillar_6_compliance_regulatory/01_TAXATION_FRAMEWORK.md`（TAX2 调用链/规则/金额/反向/边界）
- `avaloq/doc/04_business_domains/pillar_1_wealth_client_master/05_PRIVATE_BANKING_ACCOUNT_STRUCTURE.md`（BP/REL/AUTH 边界）
- `avaloq/doc/04_business_domains/pillar_5_financing_credit_risk/01_CREDIT_COLLATERAL_LOMBARD.md`（COLLAT/LIHI/信用）
- `avaloq/doc/04_business_domains/pillar_7_framework_integration/01_WORKFLOW_TASK_FRAMEWORK.md`（DOC/WFC）
- Avaloq 官方产品页：client management / lending & credit / treasury risk & compliance / private equity blog.
- Swisscom Core Banking Radar – Avaloq（customization/upgrade/TCO）。
