# J2 — 创始人财富事件：一页 blueprint

> 定位：P0 客户旅程。把“纸面财富”变成“可花、可押、可传、可控”的家族财富。
> 案例锚点：梁文锋、周群飞、李西廷、Guy Singh-Watson、Sarah Wood、Neame。
> 对标：Citi Private Capital / HSBC Access & Innovation Banking / UBS financing。
> 人物/金额为设计假设；不构成投资/税务/法律建议。

---

## 1. 客户与触发

| 项 | 内容 |
|---|---|
| **客户** | 创始人/企业家；股权集中；公司未上市/刚上市；可能有 lock-up、ROFR、board consent |
| **触发** | 融资轮、IPO 受理、lock-up 到期、卖公司、老股转让、capital call、个人流动性需求 |
| **核心 Job** | “不卖控制权也能拿到流动性；卖/押/信托/家办/税后，怎么选？” |
| **好结果** | 流动性、税后分散、控制权、信托/家办、下一代；不因一次退出失去家族财富 |

---

## 2. 五阶段

| 阶段 | 客户问题 | 银行做什么 | 对象 |
|---|---|---|---|
| **1. 财富地图** | 我到底有多少“纸面/可质押/可花费”？ | 三层财富、集中度、现金流、义务 | `PrivateAsset`/`Concentration`/`LiquidityPlan` |
| **2. 估值与结构** | 值多少、凭什么、怎么押/卖？ | 估值治理、LTV/折扣、质押/信托/税结构 | `Valuation`/`ValuationGovernance`/`Pledge` |
| **3. 流动性** | 不卖股怎么拿钱？ | Lombard/私股质押/资本调用贷款/forward/secondary | `CreditFacility`/`Covenant`/`ExitScenario` |
| **4. 税与传承** | 卖了/押了/信托后税怎么算？ | tax data pack、信托/遗产、跨境 | `TaxPack`/`Trust`/`Estate` |
| **5. 家办/再投资** | 钱怎么变成长期家族财富？ | 家办、投资政策、下一代、慈善 | `FamilyOffice`/`IPS`/`NextGenPlan` |

---

## 3. 关键时刻（必须设计）

1. **融资轮**：cap table、投资人权利、员工期权、估值。
2. **Pre-IPO**：lock-up、静默期、insider/trading window、质押可行性。
3. **IPO/锁定期到期**：卖/押/forward/secondary、税、控制权。
4. **卖公司/老股**：earn-out、vendor loan、escrow、税、信托。
5. **资本调用/义务**：PE/VC capital call、earn-out、跨期现金流。
6. **家族传承**：信托/家办/下一代；控制权 vs 受益权。

---

## 4. 系统与建设决策

| 能力 | 决策 |
|---|---|
| 账户/持仓/交易/支付/信贷余额 | 自研新核心（参考 Avaloq 能力） |
| 标准信贷/抵押/额度/追保 | 自研新核心（参考 Avaloq 能力） |
| 私股估值治理/质押/义务/退出 | **新建** |
| 税包/预扣/CRS/FATCA | Avaloq TAX2 + 新核心 tax pack |
| 信托/遗产/保险 | TFS/合作 + 新核心 |
| 估值/法律/投行执行 | 合作/CIB |

**关键对象：** `PrivateAsset`、`Valuation`、`ValuationGovernance`、`Pledge`、`CreditFacility`、`Covenant`、`Obligation`、`ExitScenario`、`TaxPack`、`Trust`、`FamilyOffice`。

---

## 5. 指标

- 3 天形成“可决策包”（不是 3 天批贷）；
- 估值复核及时率、质押登记完成率；
- 追保准确率/通知及时率；
- 义务日历覆盖 100%；
- 税后财富/控制权保留；
- 家办/信托渗透；
- 创始人 NPS/留存。

---

## 6. 负向需求

- 不承诺 IPO 价格/时间；
- 不协助 insider trading/绕过窗口；
- 不把纸面估值当市值；
- 不做未登记/不可执行的质押；
- 不隐瞒追保/集中度/锁定期；
- 不替代法律/税务/估值意见；
- 不把“质押”说成“免税”。

---

## 7. 页面/Demo

| 页面 | 用途 |
|---|---|
| `m4-founder` | 持股/事件雷达/三层财富 |
| `m4-valuation` | 估值/LTV/40% 触发/委员会 |
| `m4-pledge` | 押 vs 卖/税后/下行 |
| `m4-trust` | 信托/预算/税务台账 |
| `m3-financing` | 融资驾驶舱/额度/追保 |
| `m5-*` | 税务数据包/情景（边界） |
| `m4-private-assets` | Asset Intake / Valuation Governance / Pledge & Credit / Capital Calls / Earn-Outs / Obligation Calendar（native English fields） |
| 新增 `m3-journeys` | J2 一页 blueprint + 跳转 |

---

## 8. 案例与对标

- **梁文锋**：Pre-IPO、纸面财富、lock-up、质押/流动性。
- **周群飞**：A+H 双登记、控制权、减持/披露。
- **李西廷**：四个证券制度、二十年历史、退市不等于消失。
- **Guy Singh-Watson**：EOT、卖方贷款、分期流动性。
- **Sarah Wood**：earn-out、留任、headline ≠ 到账。
- **Neame**：薄市场、控制权重、流动性轻。

**对标：** Citi Private Capital（1,400/77 国、capital call、concentrated stock、art/aircraft）；HSBC Access/Innovation Banking；UBS Lombard/structured/concentrated stock。

---

## 9. 边界

- 不是“贷款产品”，是“私有资产生命周期”。
- 不承诺估值/融资/退出；估值/信贷/法律逐案审批。
- 客户/金额为设计假设；公开人物只引用公开事实。
