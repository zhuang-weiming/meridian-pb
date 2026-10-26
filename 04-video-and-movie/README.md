# 04 — Video and Movie：两部片，一套素材

> 这里放**可拍摄的成片脚本**，不是分镜计划。两版共用同一批录屏 take、同一套合规角标、同一套数据口径。
>
> - **12 分钟主版** → [`12-minute-master-script.md`](12-minute-master-script.md)（19 段 / 1,566 词 / 12:00）
> - **5 分钟电梯版** → [`5-minute-elevator-script.md`](5-minute-elevator-script.md)（9 镜 / 668 词 / 5:00）
>
> **词数口径：** 英文口播按空白分词，排除独立标点；`T+0`、`US$400–600m` 这类数字/技术串算一个 token。
>
> 原始 18–20 分钟中文 Demo 讲稿保留在 [`20-minute-demo-narration-cn.md`](20-minute-demo-narration-cn.md)，用于现场演示，不是成片口播。
>
> **视频 demo 的旅程总表**（名称、痛点、persona、解决方案、IT 功能提升、镜头/页面）：[`../01-user-journey/00-journey-catalog.md`](../01-user-journey/00-journey-catalog.md)。

---

## 1. 两部片的分工

| | 12 分钟主版 | 5 分钟电梯版 |
|---|---|---|
| 观众 | CEO、董事会、ExCo、业务负责人 | 只有一次转发机会的高管/董事 |
| 任务 | 让观众同意“旧核心回答不了五个经营问题”，并看到新核心的差异 | 用五个问题各一个最强锚点，换三个决定 |
| 结构 | 开场（五个问题 + 蓝图）→ 私股 → 五个问题（顺向 → 逆向）→ 三个请求 | 开场 → 五个问题（顺向 → 逆向，各一锚点）→ 三个请求 |
| 是否独立 | 是 | 是；不是主版的随机剪短 |
| 素材 | 19 段独立 take | 复用主版 9 段素材：7 段直用 + 2 段摘句 |
| 结尾 | 三行 ask + 5 秒停帧 | 三行 ask + 3 秒停帧 + 10 秒缓冲 |

**五个问题在两版中都不缺：** IPO/CIB→PB、家族 onboarding、身故与传承、收入与毛利、失败交易。5 分钟版删掉的是论证细节（蓝图、估值/交接、授权矩阵、12 个月 cohort、RM 产能），不是问题本身。

**叙事顺序：** 先把顺向旅程讲完（IPO、家族 onboarding），再进入逆向旅程（身故与传承），最后看银行自身的经营与失败（收入、失败交易）。这样“身故”不会打断“新客户/二代/配偶”的进入路径；20 分钟现场版同序。

---

## 2. 录制规格

| 项 | 规格 |
|---|---|
| 录制画幅 | **1440×900** 浏览器窗口；输出 1920×1080，16:9 |
| 浏览器 | Chrome / Edge；100% 缩放；隐藏书签栏、扩展栏、下载栏 |
| 页面入口 | 客户旅程：`http://localhost:8791/03-web-page/client-journey.html`；工作台：`http://localhost:8791/03-web-page/rm-workbench.html` |
| 录屏参数 | 客户旅程加 `?wipe=1`；工作台加 `?record=1`（隐藏台词按钮/侧栏文档链/toast，字号提级） |
| 帧率 | 30 fps；静态页面镜头可用 60 fps 录后降 30 |
| 音频 | 48 kHz / 24-bit；旁白单独轨；房间底噪 ≤ −60 dBFS |
| 响度 | 成片 −16 LUFS（±1）；峰值 ≤ −1 dBTP |
| 字幕 | 英文硬字幕 + 英/中 SRT；每行 ≤42 字符；数字不缩写 |
| 角标 | 左下常驻：`Illustrative demo · public cases are not clients · bank figures are demo data` |
| 片头/片尾 | 同一套模板；片尾不滚动字幕 |

**启动：**

```bash
cd /Users/weimingzhuang/Documents/source_code/meridian-pb
python3 -m http.server 8791
```

**录前清场：**

1. 关闭通知、微信、Slack、系统更新弹窗。
2. 浏览器只留一个窗口，1440×900；地址栏只显示端口，不显示个人路径。
3. 打开 `?wipe=1` / `?record=1`；确认没有弹窗和 toast。
4. 页面滚到镜头起点，光标移到画面外；开始录 5 秒静止再说话。
5. 每镜单独一条 take，开头用 2 秒场记板（手写 `S04 take 1`）或拍手；不要一条录到底。

---

## 3. 镜头与素材清单

> 下表按最终播放顺序排列；S 编号是素材/take 编号，不是播放序号。

### 12 分钟主版（19 段）

| 段 | 时长 | 页面/素材 | 录制 | 备注 |
|---|---|---|---|---|
| S0 | 13s | 标题卡 | 剪辑 | 合规声明 |
| S1 | 50s | `rm-workbench#/overview` | `?record=1` | 五个问题 |
| S2a | 8s | J1–J10 静态卡 | 剪辑 | 3 客户 + 1 横向 + 2 使能 P0 |
| S2b | 40s | `client-journey#/m3-journeys` | `?wipe=1` | 三张蓝图 |
| S3 | 43s | `client-journey#/m4-private-assets` | `?wipe=1` | 私股生命周期 |
| S4 | 45s | `rm-workbench#/ipo-pipeline` | `?record=1` | IPO 管道 |
| S5 | 47s | `rm-workbench#/ipo-valuation` | `?record=1` | 估值治理 |
| S6 | 37s | `rm-workbench#/ipo-handoff` | `?record=1` | CIB→PB 交接 |
| S11 | 40s | `rm-workbench#/onboarding-family` | `?record=1` | 家族 onboarding |
| S12 | 38s | `rm-workbench#/onboarding-first` | `?record=1` | 第一次投资 |
| S7 | 15s | `rm-workbench#/estate-portfolio` | `?record=1` | 时间/金额/结果 |
| S8 | 45s | `rm-workbench#/estate-case` | `?record=1` | 单个案件时间线 |
| S9 | 46s | `rm-workbench#/estate-authority` | `?record=1` | 授权矩阵 |
| S10 | 39s | `rm-workbench#/estate-outcomes` | `?record=1` | 12 个月 cohort |
| S13a | 28s | `rm-workbench#/revenue-cockpit` | `?record=1` | 收入与毛利 |
| S13b | 61s | `rm-workbench#/revenue-rm` | `?record=1` | RM 产能 |
| S14a | 44s | `rm-workbench#/order-failure` | `?record=1` | 失败交易 |
| S14b | 39s | `rm-workbench#/order-kpi` | `?record=1` | KPI 与信任 |
| S15 | 37s+5s | End card | 剪辑 | 三个请求 |

### 5 分钟电梯版（9 镜）

直接复用：S0、S4、S11、S8、S13a、S14a、S15 的主版 take；S1' 从 S1 取前 80 词；S7' 从 S7 取 29 词。剪辑表见 5 分钟脚本 §4。

---

## 4. 后期规则

- **运镜**：只允许固定、缓推（≤125%）、横移、下摇；禁止旋转、抖动、手持感。
- **切点**：同一幕内硬切；幕与幕之间最多 12 帧白闪/黑场；不加转场音效。
- **光标**：说话时不动光标；需要指向时用 300ms 线性移动；停住后不再微抖。
- **高亮**：只用 2px HSBC 红描边或 8% 红色底；不用箭头贴纸、不用表情包。
- **字幕**：英文逐句；中文 SRT 不烧录；专有名词保留英文（Avaloq、CIB、POA、probate、LTV）。
- **数字**：每个数字镜头至少保留一个可见的 as-of 日期或 `demo data` 标签；估值镜头保留 valuation date 与 committee。
- **音乐**：低频铺底 −24 LUFS；旁白出现时不压字；数字段落不加鼓点。
- **片尾**：end card 停 5 秒（5 分钟版 3 秒）后黑场。

---

## 5. 录制与验收清单

**录前**

- [ ] 服务器在 8791；两个入口均 200。
- [ ] 客户旅程 `?wipe=1`；工作台 `?record=1`。
- [ ] 1440×900；100% 缩放；书签栏隐藏。
- [ ] 通知关闭；浏览器只有一个窗口；无个人路径。
- [ ] 合规角标已叠加；`public cases are not clients` 可见。
- [ ] 每镜的起点滚动位置已记下；光标在画面外。

**录后**

- [ ] 每镜有独立 take；场记板可读；无系统提示音。
- [ ] 口播与脚本逐字一致；没有即兴加词。
- [ ] 数字与页面一致：8,279 天、15 天、97.4、5.5%、480m/65%/32.5%/67.5%、US$26.7–29.0bn。
- [ ] 公开案例只作结构参考；账户级记录为演示家族。
- [ ] 英文硬字幕无断词；中文 SRT 与英文一致。
- [ ] 响度 −16 LUFS；峰值 ≤ −1 dBTP；无爆音。
- [ ] 成片 12:00 / 5:00；片尾停帧足够。

**发前**

- [ ] 法务/合规过目：公开人物、判例、税务口径、估值口径。
- [ ] 数据 owner 过目：五个数据集口径与数字。
- [ ] 版本号、日期、片尾 ask 与最新文档一致。

---

## 6. 可选：30 分钟深度版

不与 12 分钟版并列发布；用于工作坊或董事会 pre-read。做法是 **12 分钟主版 + 9 个补充段落**，不重录主版：

| 补充段 | 内容 | 页面 |
|---|---|---|
| D1 | J1 家族治理与下一代 | `client-journey#/m3-family`、`#/m3-family-office` |
| D2 | J2 创始人 360 与信托 | `#/m4-founder`、`#/m4-trust` |
| D3 | J3/J4 蓝图与女性财富 | `#/m3-journeys`、`#/m3-hub` |
| D4 | J5 跨境税务数据包 | `#/m5-profile` … `#/m5-delivery` |
| D5 | IPO 公司画像与估值方法 | `rm-workbench#/ipo-company`、`#/ipo-valuation` |
| D6 | Onboarding 适当性与模板 | `#/onboarding-suitability`、`#/onboarding-templates` |
| D7 | 客户/产品 P&L | `#/revenue-client`、`#/revenue-product` |
| D8 | 订单监控与恢复工作流 | `#/order-monitor`、`#/order-recovery` |
| D9 | 证据、审计与权限矩阵 | `client-journey#/audit`、`#/m3-cases` |

每个补充段 90–120 秒，沿用同一套运镜、角标与字幕规范；不改变主版的三个 ask。

---

## 7. 与其他交付物的关系

- 页面与旅程的完整映射：[`../01-user-journey/PAGE-MAP.md`](../01-user-journey/PAGE-MAP.md)
- 21 页的中英台词与屏幕动作：[`../03-web-page/workbench/SPEAKER_NOTES.md`](../03-web-page/workbench/SPEAKER_NOTES.md)
- 页面运行与录屏参数：[`../03-web-page/README.md`](../03-web-page/README.md)
- 旧版分镜计划（已被本目录取代）：[`../archive/2026-10_v1/video/12-leadership-video-plan-v2.1.md`](../archive/2026-10_v1/video/12-leadership-video-plan-v2.1.md)

**边界：** 演示数据；公开案例只作结构参考，不表示是本行客户；不构成法律、税务或投资建议。
