# 07_architecture — 需求驱动的 HSBC 下一代 Private Bank 功能架构

本目录保存 **v1.1《HSBC 下一代 Private Bank Core System：需求驱动的功能架构》**。

- 主文件（中文）：[`nextgen-pb-demand-driven-architecture.html`](nextgen-pb-demand-driven-architecture.html)
- **English version**：[`nextgen-pb-demand-driven-architecture-en.html`](nextgen-pb-demand-driven-architecture-en.html)
- 需求依据：[`../01_personas/nextgen-pb-real-people-cases.html`](../01_personas/nextgen-pb-real-people-cases.html)（17 组人物）
- 外部核对：16 份机构报告（引证出处与页码见主文件 §0.5；交叉核对文档已移除，待决策清单 C5–C8 内联于主文件）
- 能力对照：《独有能力判定：HSBC 新一代 PB 系统相对 Avaloq 与 Aladdin》v1.0
- 性质：**内部架构提案，非营销材料**，不构成税务、法律或投资建议。

## 这份文档做什么

从 17 组客户痛点出发，而不是从竞品功能清单出发，回答三个问题：

1. **客户为什么痛？** 17 组人物 → 8 个 Job（看见 / 行动 / 归属 / 合规 / 变现 / 传承 / 证明 / 服务）。
2. **客户愿意为哪个痛付钱？** 区分 T1 客户付溢价/信贷、T2 打包/留存、T3 必须有但不能单列收费、T4 纯基础设施。
3. **系统应该长什么样、先建什么？** 7 层、18 个模块、3 个建设波次。

## 核心结论

- **需求强度 ≠ 付费意愿。** 最痛的是授权、合规、证据、数据一致性；最愿意付钱的是流动性、家族治理、税务协调、私人股权。
- **三个差异化簇，不是一个。** 旧版只识别了“跨辖区身份/税务”；需求证据显示“家族/授权/权利”和“私人股权/流动性”的付费意愿更高。
- **六个收入模块：** M02 家族治理、M03 授权/争议、M05 权利矩阵、M06 私人股权、M10 信贷与流动性、M13 税务计算。
- **十二个成本/地基模块：** 客户主数据、实体结构、资产登记、IBOR、交易、支付、身份状态、义务披露、案件、证据、数据平台、AI。
- **不建：** 自建风险分析（买 Aladdin）、全量 held-away 聚合（合作 Addepar）、数字资产平台（买 Avaloq）、通用 AI Copilot（买 Agent Connect）。

## v1.1 变更（相对 v1.0）

- 新增 **§0.5 三处外部原文背书**：BCG 2026 p.19（system architects）、McKinsey CEO 季刊 2021 p.80（端到端企业家包）、McKinsey Technology Trends 2026 p.27（agentic AI 仍在试点）。
- **报告术语对齐**（仅改措辞、不改判断）：`system architects`、`cross-border tax and legal navigation`、`liquidity solutions`、`AI-first`、`structurally underserved`、`decoupled data layer`。
- **簇 1 表述修正**：从“空白”改为“把现有家族顾问能力产品化、证据化、可定价化”（HSBC 已有 Family Office Advisory / Family Advisory）。
- **M06/M10 增补** liquidity solutions（secondaries / continuation vehicles / NAV lending）；**原则 7** 改为“人在回路 + AI-first 流程”。
- **实质分歧未改动**：C5–C8（数字资产读侧、香港零售承接、内地中段案例、中段定价降级）仍待决策。

## 18 个模块

| 层 | 模块 |
|---|---|
| L1 客户与家庭 | M01 客户/家庭主数据、M02 家族图谱与治理、M03 同意/授权/争议 |
| L2 结构、权利与资产 | M04 实体与结构图、M05 权利与所有权、M06 私人股权与 Pre-IPO、M07 资产/负债登记 |
| L3 产品与流动性 | M08 组合与 IBOR、M09 交易/执行/预检、M10 信贷与流动性、M11 支付与外汇 |
| L4 税务、监管与义务 | M12 多辖区身份状态、M13 税务计算与申报、M14 义务/披露/报告 |
| L5 运营与证据 | M15 案件与工作流、M16 文件/契约/证据 |
| L6 数据、AI 与集成 | M17 客户数据平台与集成、M18 AI Copilot 与监督 |

## 三个波次

- **Wave 1（0–12 个月）信任与流动性核心：** M01/M03/M04/M05/M06/M10/M12/M13（CN/HK）/M14/M16/M17；集成 M08/M09/M11；试点 M02。
- **Wave 2（12–24 个月）家族与规模化：** M02 全量、M07、M15、M18。
- **Wave 3（24–36 个月）体验与生态：** X1/X3/X4、Aladdin/Addepar 类分析、外部服务网络。

## 使用边界

- 评分为序数（1–5），用于排序，不用于报价；所有金额、比例均为示意假设。
- 正式立项前须用 10–15 个客户访谈、5 场 RM 工作坊、3 个辖区税务/法律验收校准。
- 不构成税务、法律或投资建议；税务模块只做计算与协调，不做税务意见。

## 如何查看

```bash
open /Users/weimingzhuang/Documents/source_code/meridian-pb/02_architecture/nextgen-pb-demand-driven-architecture.html        # 中文
open /Users/weimingzhuang/Documents/source_code/meridian-pb/02_architecture/nextgen-pb-demand-driven-architecture-en.html     # English
```
