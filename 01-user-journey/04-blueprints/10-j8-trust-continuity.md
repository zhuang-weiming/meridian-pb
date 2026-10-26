# J8 — 信任与连续性：一页 blueprint

> 定位：P0 横向旅程；不是客群，是所有客户在压力时刻的底座。
> 案例锚点：Tam Mei Kam（梅艳芳遗产）、Tao Soh Ngun、Tan Poh Lee、Kan Lai Kwan、HSBC DOJ/FINMA。
> 对标：HSBC TFS/bereavement/estate、UBS estate planning、Citi trust/estate、SCB legacy。
> 人物/金额为设计假设；不构成法律/税务/投资建议。

---

## 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 任何 J1–J7 客户/家族，在失能、身故、离婚、制裁、欺诈、税务调查等时刻 |
| **触发** | 中风/认知衰退、死亡、离婚、刑事/制裁、APP 欺诈、税务问询 |
| **核心 Job** | “谁现在有权、哪些钱能付/不能付、依据什么、下一步谁做、证据在哪” |
| **好结果** | 合法、及时、可证据；0 无权支付/越权披露；家族关系守住 |

---

## 2. 六阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 事件 intake** | 发生了什么？ | 记录事件、证明、时间、辖区、受影响主体 | `Event`/`DeathEvent`/`CapacityEvent` |
| **2. 授权** | 谁现在能签字？ | POA/LPA/EPA/deputy/trustee/executor；范围/生效/失效/辖区 | `Authority`/`AuthorityScope`/`CourtOrder` |
| **3. 资产/义务图** | 哪些钱/资产/义务受影响？ | 账户/信托/遗产/债务/税/受益支付 | `Asset`/`Estate`/`Trust`/`Obligation` |
| **4. 法律/税务/监管** | 哪些必须等法院/律师/税务？ | probate/estate/trust/跨境/CRS/FATCA/制裁 | `ProbateCase`/`TrustCase`/`TaxPack` |
| **5. 执行** | 哪些能付/不能付？ | 紧急支付、estate account、分配、披露 | `Payment`/`EstateAccount`/`Distribution` |
| **6. 证据/关闭** | 怎么证明？ | 决策、批准、送达、支付、审计 | `Evidence`/`Decision`/`Audit` |

---

## 3. 关键时刻

1. **失能**：POA/EPA/LPA/deputy；**没有 probate**。
2. **身故**：POA 终止；executor/administrator；probate/letters；estate/trust 双账。
3. **离婚**：披露/资产/信托/子女；法院命令。
4. **制裁/刑事**：冻结/限制/上报；不歧视/不擅自判断。
5. **欺诈/深伪**：授权/异常/拦截/证据/赔付。
6. **税务补救**：CRS/FATCA/实体穿透/remediation。

---

## 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/支付/文档 | 自研新核心（参考 Avaloq 能力） |
| 事件/授权/同意/证据 | **新建** |
| estate/probate/trust | TFS/合作 + 新核心 |
| 跨境命令/承认 | **新建** |
| 制裁/PEP/AML | 新核心 + 现有合规 |
| 争议/法院 | 合作/律师 |

**关键对象：** `Event`、`Authority`、`AuthorityScope`、`CourtOrder`、`EstateCase`、`ProbateCase`、`TrustCase`、`EstateAccount`、`Evidence`、`Decision`、`Audit`。

---

## 5. 指标

- 事件通知确认时间；
- 授权核验时间；
- 首笔合法支付时间；
- 0 无权支付/越权披露；
- 证据包完整率/可采信；
- 家族 NPS/投诉；
- estate 关闭周期/成本。

---

## 6. 负向需求

- 不承诺“72 小时拿钱”；
- 不绕过 probate/法院/制裁；
- 不把信托当遗产；
- 不把“家属一致”当授权；
- 不向无权家属/媒体披露；
- 不做法律/税务意见；
- 不未经批准跨境传输。

---

## 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m3-family` | 家庭角色/授权缺口 |
| `m3-cases` | 案件/任务/责任方/证据 |
| `audit` | 证据/决策/访问 |
| 未来 X1/X2 | 失能/身故完整页面（待建） |

---

## 8. 案例与对标

- **Tam Mei Kam**：梅艳芳遗产/信托；20 年争议；月度支付/家庭供养/葬礼/剩余分配。
- **Tao Soh Ngun**：意愿书版本/受托人冲突/控制权。
- **Tan Poh Lee**：中风/三地法院/受托人交出裁量权。
- **Kan Lai Kwan**：控制权/意愿书/受托人“great deference”。
- **HSBC DOJ/FINMA**：税务/AML/历史补救。

**对标：** HSBC TFS 80 年/bereavement/estate；UBS estate planning；Citi trust/estate；SCB legacy/trust。

---

## 9. 边界

- 压力旅程不是“恐怖故事”，是“信任证明”。
- 法律程序需要时间；系统压缩的是信息/证据/编排，不是法律。
- 公开案件只引用公开事实；金额/时间线为设计假设。
