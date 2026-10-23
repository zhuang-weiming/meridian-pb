# 02_architecture — 需求驱动的 HSBC 下一代 Private Bank 功能架构

本目录保存 **v1.2《HSBC 下一代 Private Bank Core System：需求驱动的功能架构》**。

- 主文件（中文）：[`nextgen-pb-demand-driven-architecture.html`](nextgen-pb-demand-driven-architecture.html)
- **English version**：[`nextgen-pb-demand-driven-architecture-en.html`](nextgen-pb-demand-driven-architecture-en.html)
- 需求依据：[`../01_personas/nextgen-pb-real-people-cases.html`](../01_personas/nextgen-pb-real-people-cases.html)（17 组人物）
- 外部核对：16 份机构报告（引证出处与页码见主文件 §0.5；交叉核对文档已移除，待决策清单 C5–C8 内联于主文件）
- 能力对照：本版 **§6 与 Avaloq / Aladdin / Addepar 的边界**（历史参考：《独有能力判定》v1.0）
- 延伸阅读：[`nextgen-pb-pain-deepdive-ubs-benchmark.html`](nextgen-pb-pain-deepdive-ubs-benchmark.html)（痛点五层拆解、15 条增量痛点、HSBC vs UBS 能力对标，v0.1）
- 性质：**内部架构提案，非营销材料**，不构成税务、法律或投资建议。

## 这份文档做什么

从 17 组客户痛点出发，而不是从竞品功能清单出发，回答三个问题：

1. **客户为什么痛？** 17 组人物 → 8 个 Job（看见 / 行动 / 归属 / 合规 / 变现 / 传承 / 证明 / 服务）。
2. **客户愿意为哪个痛付钱？** 区分 T1 客户付溢价/信贷、T2 打包/留存、T3 必须有但不能单列收费、T4 纯基础设施。
3. **系统应该长什么样？** 7 层、18 个模块；建设顺序与风险验证留待下一阶段。

## 核心结论

- **需求强度 ≠ 付费意愿。** 最痛的是授权、合规、证据、数据一致性；最愿意付钱的是流动性、家族治理、税务协调、私人股权。
- **Avaloq 必须被平替。** 它的强项是账务、结算、税表工程，恰好不是客户付费的地方；客户付费的五个时刻（授权、家族、私股、税务协调、证据）落在它的主键之外。平替的验收标准是：关掉 Avaloq 之后，8 个 Job 仍能交付。
- **六个收入模块：** M02 家族治理、M03 授权/争议、M05 权利矩阵、M06 私人股权、M10 信贷与流动性、M13 税务计算。
- **十二个成本/地基模块：** 客户主数据、实体结构、资产登记、IBOR、交易、支付、身份状态、义务披露、案件、证据、数据平台、AI。
- **不建：** 自建风险分析（买 Aladdin）、全量 held-away 聚合（合作 Addepar）、通用 AI Copilot 底座（买平台）、大众市场 onboarding；数字资产/加密暂不纳入（含读侧），如需外购。

## v1.2 变更（相对 v1.1）

- **§6 重写**：从“与旧版《独有能力判定》比较”改为“为什么 Avaloq 必须被平替”，加入源码级证据（`OBJ_BP`/`OBJ_REL` 主键、税表覆盖 CN 2 / HK 0）与 8 个 Job 的下线验收标准；Aladdin / Addepar 明确为组件而非替代品。
- **删除三个章节**：原 §6.1–6.3（旧版结论回顾、三个差异化簇、一处修正两处加强三处放弃）、原 §7（三个波次与最小可交付核心）、原 §9（风险与验证），留待下一阶段。
- **M13 改为全球税务方案**：全球引擎一次建成，辖区按规则包扩展（CN/HK 是首批包，不是范围边界），增补养老金/社保协定。
- **M02 增补家庭目标四元组**（教育/养老/慈善：提出人/受益人/出资方/决策人）；**M10 增补退休/回收现金流（decumulation）**；X1 视图增补家庭目标与长期现金流。
- **客群标签不是模块**：女性、二代、企业家由 X1/X2 与服务设计承载，不新增模块；“家族结构/下一代/教育/养老/慈善在一个视图里”是 M02 + M10 + X1 共同交付的客户结果。
- **实质分歧**：数字资产/加密已决策为**暂不纳入（含读侧）**，见 §6.3；香港零售承接、内地中段案例、中段定价降级（C6–C8）仍待决策。

## 18 个模块

| 层 | 模块 |
|---|---|
| L1 客户与家庭 | M01 客户/家庭主数据、M02 家族图谱与治理、M03 同意/授权/争议 |
| L2 结构、权利与资产 | M04 实体与结构图、M05 权利与所有权、M06 私人股权与 Pre-IPO、M07 资产/负债登记 |
| L3 产品与流动性 | M08 组合与 IBOR、M09 交易/执行/预检、M10 信贷与流动性、M11 支付与外汇 |
| L4 税务、监管与义务 | M12 多辖区身份状态、M13 税务计算与申报、M14 义务/披露/报告 |
| L5 运营与证据 | M15 案件与工作流、M16 文件/契约/证据 |
| L6 数据、AI 与集成 | M17 客户数据平台与集成、M18 AI Copilot 与监督 |

## 使用边界

- 评分为序数（1–5），用于排序，不用于报价；所有金额、比例均为示意假设。
- 正式立项前须用 10–15 个客户访谈、5 场 RM 工作坊、3 个辖区税务/法律验收校准。
- 不构成税务、法律或投资建议；税务模块只做计算与协调，不做税务意见。

## 如何查看

```bash
open /Users/weimingzhuang/Documents/source_code/meridian-pb/02_architecture/nextgen-pb-demand-driven-architecture.html        # 中文
open /Users/weimingzhuang/Documents/source_code/meridian-pb/02_architecture/nextgen-pb-demand-driven-architecture-en.html     # English
```
