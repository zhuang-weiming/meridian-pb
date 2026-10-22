# 05 — 数据模型与接口

> 目标：让四个模块共用一套"客户—资产—规则—交易—证据"的语言，避免每个页面各建一套表。

---

## 1. 实体关系（鸟瞰）

```
Party ──< Relationship >── LegalEntity
  │                           │
  ├──< Household              ├──< Account ──< Position ──< TaxLot
  │                           │
  └──< ClientProfile          └──< Trust ──< Beneficiary
                                   │
                                   └──< Distribution ──< DistributionTaxLot

Product ──< Template ──< Proposal ──< ProposalLeg ──< Assessment
                                  │
                                  ├──< RuleCheck
                                  └──< Order ──< Execution

Collateral ──< Facility ──< Order (资金)
Valuation ──< Facility
RFP ──< Bid ──< Award ──< Contract
EvidenceEvent 关联以上所有对象（不可变日志）
Entitlement 控制以上所有对象的访问
TaxProfile ──< TaxEvent ──< TaxScenario ──< SubstanceCheck
TaxLever 被 TaxScenario 引用
```

---

## 2. 33 个核心实体（22 个业务 + 6 个治理/财务 + 5 个税务优化）

### 2.1 Party（主体）
| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `party_id` | string | Y | 主键 |
| `party_type` | enum | Y | 个人/公司/信托/基金/合伙 |
| `legal_name` | string | Y | 法定名称 |
| `aliases[]` | array | N | 别名/曾用名 |
| `identifiers[]` | array | Y | 证件类型/号码/签发地（加密） |
| `nationality[]` | array | N | 国籍 |
| `residency[]` | array | N | 税务居民地 |
| `dob/incorporation_date` | date | N | 出生/成立 |
| `pep_flag` | bool | Y | PEP |
| `sanctions_status` | enum | Y | 通过/命中/待查 |
| `source_of_wealth_ref` | string | N | SoW |
| `status` | enum | Y | 活跃/冻结/关闭 |

### 2.2 Household（家庭）
`household_id`、`name`、`primary_client_id`、`members[]`、`family_tree{}`、`reporting_currency`、`relationship_manager_id`、`consent_ref`。

### 2.3 ClientProfile（客户画像）
`client_id`、`party_id`、`segment`（T1/T2/T3）、`risk_profile`、`risk_capacity`、`investment_experience`、`objectives[]`、`restrictions[]`、`liquidity_needs{}`、`tax_profile_ref`、`ips_ref`、`last_review`、`next_review`、`status`。

### 2.4 LegalEntity（法律实体）
`entity_id`、`type`（BVI/开曼/HK/境内/信托）、`name`、`jurisdiction`、`registration_no`、`parent_id`、`ownership_pct`、`directors[]`、`shareholders[]`、`tax_residency`、`purpose`、`documents[]`。

### 2.5 Relationship（关系）
`relationship_id`、`from_party`、`to_party`、`type`（实控/受益/授权/董事/保护人/受托人）、`percentage`、`effective_from`、`effective_to`、`evidence_ref`。

### 2.6 Account（账户）
`account_id`、`client_id`、`entity_id`、`booking_centre`、`account_type`（托管/现金/保证金/贷款/信托）、`currency`、`iban/mask`、`status`、`opened_date`、`restrictions[]`、`signatories[]`。

### 2.7 Instrument（工具）
`instrument_id`（ISIN/CUSIP/内部码）、`asset_class`、`sub_class`、`name`、`issuer_id`、`currency`、`domicile`、`listing_venue`、`maturity`、`coupon`、`rating[]`、`liquidity_score`、`complexity_score`、`tax_treatment_ref`、`restricted_flag`、`status`。

### 2.8 Position（持仓）
`position_id`、`account_id`、`instrument_id`、`quantity`、`market_value`、`currency`、`price_ref`、`price_ts`、`cost_basis`、`accrued_interest`、`pledged_qty`、`lockup_until`、`valuation_source`、`valuation_quality`。

### 2.9 TaxLot（税基批次）
`lot_id`、`position_id`、`acquisition_date`、`quantity`、`cost_basis`、`currency`、`adjustment[]`、`jurisdiction`、`holding_period_days`、`tax_status`、`disposal_method`（FIFO/LIFO/specific）。

### 2.10 Product（产品）
`product_id`、`instrument_id`、`wrapper`（直接/基金/票据/保险/信托）、`issuer`、`domicile`、`distribution_status`、`min_ticket`、`tenor`、`liquidity`、`fees{}`、`risk_rating`、`kiid_ref`、`suitability_tags[]`、`jurisdictions[]`、`status`。

### 2.11 Template（交易模板）
`template_id`、`version`、`asset_class`、`wrapper`、`order_style`、`settlement_cycle`、`dealing_cutoff`、`min_ticket`、`cost_components[]`、`tax_treatment_ref`、`doc_requirements[]`、`approval_matrix`、`jurisdictions[]`、`client_categories[]`、`status`。

### 2.12 Proposal（提案）
`proposal_id`、`client_id`、`household_id`、`objective{}`、`constraints{}`、`funding{}`、`template_ids[]`、`legs[]`、`status`、`version`、`created_by`、`created_at`、`approved_by[]`、`signed_at`、`expires_at`、`rule_version`、`model_version`。

### 2.13 ProposalLeg（提案腿）
`leg_id`、`proposal_id`、`sequence`、`action`（BUY/SELL/SUBSCRIBE/REDEEM/PLEDGE/TRUST）、`instrument_id`、`template_id`、`amount`、`quantity`、`target_weight`、`timing`、`venue`、`order_type`、`limit_price`、`fx_pair`、`tax_lot_policy`、`status`。

### 2.14 Assessment（评估）
`assessment_id`、`proposal_id`、`type`（TES/stress/backtest/impact）、`inputs_hash`、`outputs{}`、`data_quality`、`penalty`、`model_version`、`created_at`、`confidence`。

### 2.15 RuleCheck（规则检查）
`check_id`、`proposal_id`、`rule_id`、`rule_version`、`dimension`（法域/牌照/客户/复杂度）、`severity`（PASS/WARN/BLOCK）、`message`、`evidence_ref`、`override_allowed`、`approver_id`、`override_expiry`。

### 2.16 Order（订单）
`order_id`、`parent_order_id`、`proposal_id`、`account_id`、`instrument_id`、`side`、`quantity`、`notional`、`currency`、`order_type`、`limit_price`、`execution_strategy`、`participation_cap`、`venue`、`start_time`、`end_time`、`benchmark`、`funding_account`、`status`、`created_by`。

### 2.17 Execution（成交）
`execution_id`、`order_id`、`venue`、`filled_qty`、`avg_price`、`commission`、`taxes{}`、`fx_rate`、`slippage_bps`、`arrival_price`、`vwap_benchmark`、`settlement_date`、`status`、`counterparty`。

### 2.18 Collateral（抵押品）
`collateral_id`、`client_id`、`instrument_id`、`quantity`、`market_value`、`haircut`、`lendable_value`、`valuation_date`、`valuation_source`、`pledge_status`、`restrictions[]`、`concentration_limit`。

### 2.19 Facility（融资额度）
`facility_id`、`client_id`、`lender_entity`、`type`、`amount`、`currency`、`tenor`、`pricing{}`、`collateral_ids[]`、`ltv`、`covenants[]`、`margin_ladder{}`、`conditions_precedent[]`、`status`、`approval_ref`、`maturity`。

### 2.20 Trust（信托）
`trust_id`、`type`、`jurisdiction`、`trustee_id`、`settlor_id`、`protector_id`、`beneficiaries[]`、`letter_of_wishes_ref`、`reserved_powers[]`、`assets[]`、`distribution_policy`、`tax_ref`、`status`、`established_date`。

### 2.21 Distribution（分配）
`distribution_id`、`trust_id`、`beneficiary_id`、`purpose`、`amount`、`currency`、`payment_type`（cash/in-kind/service）、`payee_id`、`approval_ref`、`tax_treatment`、`status`、`paid_at`、`audit_ref`。

### 2.22 EvidenceEvent（证据事件）
`event_id`、`object_type`、`object_id`、`action`、`actor`、`timestamp`、`before_hash`、`after_hash`、`rule_version`、`model_version`、`prompt_version`、`ip/device`、`immutable`。

### 2.23 Valuation（独立估值）
`valuation_id`、`client_id`、`instrument_id`、`panel_ref`、`valuer_id`、`method`、`last_round`、`dlom`、`minority_discount`、`adjusted_value`、`lendable_value`、`ltv_range`、`ltv_recommended`、`drop_trigger`（40%）、`dissent[]`、`report_ref`、`next_review`、`status`。

### 2.24 RFP（集采需求）
`rfp_id`、`demand_id`、`category`、`scope`、`volume`、`budget_range`、`evaluation_weights`、`shortlist[]`、`qa_log[]`、`timeline`、`status`。

### 2.25 Bid（投标）
`bid_id`、`rfp_id`、`vendor_id`、`price`、`assumptions[]`、`quality_score`、`compliance_score`、`price_score`、`total_score`、`validity`、`conflict_declaration`、`documents[]`、`status`。

### 2.26 Award / Contract（定标与合同）
`award_id`、`rfp_id`、`vendor_id`、`contract_ref`、`fee_model`、`sla`、`dp_agreement_ref`、`insurance_ref`、`start/end`、`status`。

### 2.27 DistributionTaxLot（分配税务批次）
`distribution_id`、`source_layer`（C1–C6）、`taxable_person`、`tax_base`、`tax_rate`、`tax_due`、`tax_paid`、`tax_credit`、`tax_reserve`、`filing_form`、`filing_deadline`、`advisor_opinion_ref`、`status`。

### 2.28 Entitlement（权限授权）
`entitlement_id`、`role`、`page_id`、`field_group`、`action`、`scope`、`jurisdiction`、`consent_required`、`effective_from/to`、`approved_by`、`review_due`。

### 2.29 TaxProfile（税务画像）
`tax_profile_id`、`client_id`、`residency[]`、`domicile`、`days_by_jurisdiction`、`entities[]`、`accounts[]`、`assets[]`、`income_flows[]`、`treaties[]`、`filings[]`、`estate_plan`、`consent_ref`。

### 2.30 TaxEvent（应税事件）
`event_id`、`client_id`、`type`（分红/减持/重组/迁居/年结）、`amount`、`currency`、`jurisdiction`、`taxpayer`、`tax_type`、`tax_base`、`rate`、`timing`、`withholding`、`cash_tax`、`effective_rate`。

### 2.31 TaxLever（优化杠杆）
`lever_id`、`category`、`description`、`jurisdictions[]`、`fit`、`expected_impact`、`cost`、`risk`、`evidence_required[]`、`advisor_required`、`red_flags[]`。

### 2.32 TaxScenario（税务情景）
`scenario_id`、`case_id`、`levers[]`、`gross_income`、`tax_cost`、`after_tax_cash`、`effective_rate`、`implementation_cost`、`annual_cost`、`net_benefit`、`liquidity`、`control`、`compliance_burden`、`risk_rating`、`score`、`rank`。

### 2.33 SubstanceCheck（反避税校验）
`check_id`、`scenario_id`、`gaar`、`ppt`、`cfo`、`economic_substance`、`beneficial_ownership`、`transfer_pricing`、`indirect_transfer_7`、`trust_21`、`crs_fatca`、`red_flags[]`、`result`、`conditions[]`、`reviewer`。

> **支撑实体**（不计入 28）：`Partner`、`ServiceRequest`、`Case`、`Consent`、`Document`、`MarketData`、`Benchmark`、`Notification`。

---

## 3. 三个规范 JSON（直接可用于接口设计）

### 3.1 Proposal
```json
{
  "proposal_id": "P-2026-000123",
  "client_id": "C-8891",
  "household_id": "H-2210",
  "objective": {
    "type": "income",
    "amount": 10000000,
    "currency": "USD",
    "horizon_months": 36,
    "liquidity": {"T0": 500000, "T7": 1000000, "T90": 2000000},
    "max_drawdown": 0.10
  },
  "constraints": {
    "max_single_issuer": 0.10,
    "max_single_name": 0.05,
    "leverage": false,
    "derivatives": false,
    "restricted_list_checked": true
  },
  "legs": [
    {"leg_id": "L1", "action": "BUY", "instrument_id": "US912828Z123",
     "template_id": "FI-LADDER-01", "amount": 4000000, "target_weight": 0.40,
     "timing": "T+0", "order_type": "LIMIT"},
    {"leg_id": "L2", "action": "SUBSCRIBE", "instrument_id": "IE00B4L5Y983",
     "template_id": "FD-UCITS-01", "amount": 5000000, "target_weight": 0.50,
     "timing": "T+0"}
  ],
  "status": "PENDING_REVIEW",
  "version": "3",
  "rule_version": "2026.10.3",
  "model_version": "proposal-gen-3.2"
}
```

### 3.2 Order
```json
{
  "order_id": "O-2026-778812",
  "parent_order_id": "PO-2026-001",
  "proposal_id": "P-2026-000123",
  "account_id": "ACC-HK-0091",
  "instrument_id": "US912828Z123",
  "side": "BUY",
  "quantity": 40000,
  "notional": 4000000,
  "currency": "USD",
  "order_type": "LIMIT",
  "limit_price": 99.85,
  "execution_strategy": "TWAP",
  "participation_cap": 0.20,
  "venue": "OTC",
  "start_time": "2026-10-21T01:30:00Z",
  "end_time": "2026-10-21T08:00:00Z",
  "benchmark": "ARRIVAL",
  "funding_account": "ACC-HK-CASH-USD",
  "status": "PENDING_APPROVAL"
}
```

### 3.3 Distribution
```json
{
  "distribution_id": "D-2026-0451",
  "trust_id": "T-HK-0012",
  "beneficiary_id": "B-0003",
  "purpose": "education",
  "amount": 120000,
  "currency": "USD",
  "payment_type": "service",
  "payee_id": "V-SCHOOL-UK-01",
  "supporting_docs": ["invoice_2026Q4.pdf", "enrollment_letter.pdf"],
  "approval_ref": "AP-2026-0912",
  "source_layer": "C2_accumulated_taxed",
  "taxable_person": "beneficiary",
  "tax_base": 120000,
  "tax_credit": 24000,
  "filing_ref": "TF-2026-0451",
  "tax_treatment": "benefit_in_kind_review",
  "status": "APPROVED",
  "audit_ref": "EV-2026-88123"
}
```

---

## 4. 接口与事件

### 4.1 同步 API（示例）
| 方法 | 路径 | 用途 |
|---|---|---|
| GET | `/clients/{id}/360` | 客户 360（字段级权限） |
| GET | `/products?jurisdiction=HK&category=PI` | 产品池 |
| POST | `/proposals` | 创建提案 |
| POST | `/proposals/{id}/generate` | 生成候选 |
| POST | `/proposals/{id}/assess` | TES/压力/回测 |
| POST | `/proposals/{id}/checks` | 四维校验 |
| POST | `/proposals/{id}/sign` | 客户签署 |
| POST | `/orders` | 创建母单 |
| POST | `/orders/{id}/children` | 拆子单 |
| GET | `/orders/{id}/tca` | TCA |
| POST | `/facilities/{id}/drawdown` | 放款 |
| POST | `/valuations/{id}/panel-decision` | 估值委员会决议 / LTV |
| POST | `/rfps` | 创建 RFP |
| POST | `/bids` | 提交投标 |
| POST | `/awards` | 定标 / 合同 |
| POST | `/trusts/{id}/distributions` | 分配 |
| POST | `/distributions/{id}/tax-lot` | 分配税务分类/申报 |

### 4.2 事件（异步）
| 事件 | 载荷要点 | 消费者 |
|---|---|---|
| `client.event.detected` | client_id, type, date, source | RM Copilot, Founder Desk |
| `holding.updated` | account_id, position_id, value | Quant Lab, Collateral |
| `price.updated` | instrument_id, price, ts | TES, Collateral |
| `proposal.approved` | proposal_id, version | OMS, DMS |
| `order.filled` | order_id, execution_id | TCA, TaxLot, CRM |
| `collateral.breach` | facility_id, coverage | RM, Risk |
| `trust.distribution.paid` | distribution_id | Reporting, Audit |
| `rule.version.published` | rule_id, version | All generators |

---

## 5. 数据质量规则（可执行）

| 规则 | 检查 | 失败动作 |
|---|---|---|
| 完整性 | 必填字段空值率 < 1% | 阻断提案 |
| 时效 | 行情 < 15 分钟；持仓 < T+1；估值 < 季度 | 标黄/降级 |
| 一致性 | 持仓市值 = 数量 × 价格（容差 0.1%） | 对账工单 |
| 唯一性 | ISIN/客户号唯一 | 阻断 |
| 血缘 | 每个数字可追溯到源系统字段 | 不可追溯则标"估算" |
| PIT | 回测数据带 `as_of` | 无 `as_of` 不得回测 |
| 复权 | 价格标注 split/dividend adjusted | 混用则阻断 |
| 缺失 | 不 forward-fill 收益 | 报告样本量 |
| 权限 | 字段级授权校验 | 越权返回 403 并记录 |

---

## 6. 权限与留存

| 维度 | 规则 |
|---|---|
| 角色 | RM 只看自己客户；IC 看授权范围；合规可审计只读；vendor 只看案件 |
| 法域 | 内地数据境内；跨境按 PIPL §38；字段级白名单 |
| 墙 | MNPI 项目成员名单；跨墙审批；访问留痕 |
| 留存 | 提案/订单/披露/签署 ≥ 7 年；录音 ≥ 5 年（按属地取更长） |
| 删除 | 客户注销后按法定留存，其他脱敏/删除 |
| 导出 | 水印、审批、日志 |

---

*下一份：`06_compliance_governance.md` — 规则、墙、AI 治理与隐私。*
