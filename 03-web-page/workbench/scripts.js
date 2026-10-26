/* Bilingual speaker notes for the Operating Workbench.
   Public cases are illustrative; bank data is demo data. */
const SCRIPTS = {
  overview: {
    title: "Operating Workbench",
    cn: "今天我不讲一个抽象的架构，而是讲五个真实的经营问题：第一，CIB 做 IPO，PB 如何合规承接创始人和高管；第二，新客户、二代和配偶如何完成第一次投资；第三，一个客户身故一年以后，家族的钱到底走到了哪里；第四，客户佣金到底是不是私人银行的毛利；第五，一笔交易失败以后，客户信任和 RM 绩效如何被影响。这个工作台不是营销页面，而是把每个问题的业务步骤、字段、状态、责任人和证据拆开。所有公开人物只是结构参考，不表示他们是汇丰客户；所有银行数字都是演示数据。",
    en: "Today I will not present an abstract architecture. I will present five operating problems. First, how CIB originates an IPO and how Private Banking onboards founders and executives on a consent basis. Second, how a new client, a next-generation member or a spouse completes a first investment. Third, where the family’s money actually goes twelve months after a death. Fourth, whether client commission is actually Private Bank gross margin. Fifth, how a failed trade affects client trust and RM performance. This workbench is not a marketing site. It decomposes each problem into business steps, fields, status, ownership and evidence. The public names are structural references only, not HSBC clients. All bank figures are demo data.",
    screen: "Start at the five module cards; note that each module has four pages.",
    transition: "We start with the IPO-to-Private-Banking pipeline."
  },
  "ipo-pipeline": {
    title: "IPO & Wealth Event Pipeline",
    cn: "这一页是财富事件管道。我们不是只看 IPO，而是把 IPO、H 股、老股转让、并购、员工信托都放在一个 pipeline 里。每一行至少有这些字段：公司、交易所、阶段、预计时间、CIB 覆盖团队、创始人和管理层持股、估计财富、PB 状态、负责人。这里最关键的不是“拿到名单”，而是把事件、客户同意、合规墙和 PB 准备度放在同一张表上。公开案例包括 DeepSeek、迈瑞、蓝思、Riverford、Unruly，它们只是说明结构，不是客户关系。",
    en: "This is the wealth-event pipeline. We do not look only at IPOs. We include IPOs, H-share listings, secondary sell-downs, M&A and employee ownership trusts in one pipeline. Each row carries the company, exchange, stage, expected timing, CIB coverage, founder and management holdings, estimated wealth, Private Banking status and owner. The point is not to obtain a list of names. The point is to put the event, client consent, Chinese Wall clearance and Private Banking readiness on one page. The public cases — DeepSeek, Mindray, Lens Technology, Riverford and Unruly — illustrate the structure only. They are not client relationships.",
    screen: "Point to stage, expected timing, PB status and the consent-pending count.",
    transition: "The next page opens one event and shows the company and management structure."
  },
  "ipo-company": {
    title: "Company & Management",
    cn: "这一页是公司和核心管理层。这里要区分三件事：直接持股、经济权益（穿透后）、投票权。DeepSeek 的公开记录是：宁波程恩持股 60.19%、梁文锋直接持股 31.01%、穿透合计约 84.29%；媒体报道表决权约 99.7%；主体是杭州的 PRC 公司，不是开曼/HK 上层结构。我们还要看锁定期、优先购买权、董事会同意、跨境结构、家族成员和信托。右侧的任务不是“销售动作”，而是 CIB 确认关系、客户同意、独立估值、KYC 刷新和家族发现。没有这些前置条件，PB 不应该直接接触客户。",
    en: "This is the company and its key management. We separate three concepts: direct shareholding, economic rights after look-through, and voting rights. DeepSeek's public records show the Ningbo Chengen vehicle at 60.19%, Liang Wenfeng directly at 31.01%, approximately 84.29% beneficially combined; media report voting power of roughly 99.7%. The entity is domiciled in Hangzhou — a PRC company, not a Cayman or Hong Kong topco. We also capture lock-up, rights of first refusal, board consent, cross-border structure, family members and trusts. The tasks on the right are not sales actions. They are CIB relationship confirmation, client consent, independent valuation, KYC refresh and family discovery. Without these preconditions, Private Banking should not approach the client directly.",
    screen: "Show the cap table, restrictions and the task list with owners.",
    transition: "Once the event and people are clear, we need a governed valuation."
  },
  "ipo-valuation": {
    title: "Pre-IPO Valuation",
    cn: "这一页是 Pre-IPO 估值。估值不是给客户一个价格目标，而是给信贷、质押、信托和客户沟通一个可解释的区间。以 DeepSeek 为例：2026 年 7 月公开报道的投后约 US$49–56bn（约 490–560 亿美元；首轮融资约 ¥51bn / 510 亿元人民币）作 primary 输入，再加可比公司和 DCF；三种方法加权后，用同一套折扣栈（流动性 30%、少数股权 10%、集中度 10%）推到方法两端，得到 US$23.9–32.8bn（约 239–328 亿美元）；按 10–30% LTV 政策指引得出可贷参考值。控制权溢价不是折扣项，不予采用。最后提交独立估值委员会。每一个数字都要有估值日、方法、假设、审批人和证据。没有委员会批准，就不能作为可贷价值。",
    en: "This is pre-IPO valuation; a valuation is not a price target, it is an explainable range for credit, pledge, trust and client communication. For DeepSeek, the July 2026 reported post-money — roughly US$49–56bn — is the primary input, with comparable companies and DCF alongside; each method carries weight, inputs and a range. The same stack — marketability 30, minority 10, concentration 10 — is applied to both ends, giving US$23.9–32.8bn, and a 10–30% LTV guide turns it into indicative lendable value. Control premium is not a discount and is excluded. Every number carries valuation date, method, assumptions, approver and evidence — no committee approval, no lendable value.",
    screen: "Walk through the three methods, the discount table and the committee evidence list.",
    transition: "Valuation is only useful if the handoff from CIB to Private Banking is controlled."
  },
  "ipo-handoff": {
    title: "CIB → PB Handoff",
    cn: "这一页是 CIB 到 PB 的交接。这里最重要的一句话是：这是客户同意的引荐，不是数据转移。CIB 可以识别事件、确认关系、提出引荐；但 PB 必须独立完成 KYC、适当性、税务和家族需求评估。页面上的每一步都有负责人、状态和证据：CIB 识别、客户同意、合规墙检查、KYC、家族发现、估值/信贷准备。没有 consent 和 wall clearance，不能把投行项目信息传给 PB。",
    en: "This is the handoff from CIB to Private Banking. The key sentence is: this is a consent-based introduction, not a data transfer. CIB can identify the event, confirm the relationship and propose an introduction. Private Banking must independently complete KYC, suitability, tax and family-needs assessment. Every step on the page has an owner, status and evidence: CIB identification, client consent, Chinese Wall clearance, KYC, family discovery and valuation/credit readiness. Without consent and wall clearance, investment-banking deal information must not be passed to Private Banking.",
    screen: "Show the handoff task table and the service menu that only activates after onboarding.",
    transition: "From a wealth event, we move to the opposite end of the lifecycle: death and continuity."
  },
  "estate-portfolio": {
    title: "Estate Case Portfolio",
    cn: "这一页是遗产案件组合。身故不是一个时点，而是一条很长的时间线。组合里每个案件至少有：死亡日期、已过天数、遗产价值、已分配金额、法律成本、当前状态、受益人。我们刻意把公开案例和演示案例放在一起，并且区分结局：Anita Mui 遗嘱信托是“闭环案例”——2003 年身故后信托按遗嘱执行了 23 年，2026 年 8 月母亲（102 岁）离世，信托终止、余款按遗嘱捐给妙境佛学会，一个信托防住了败家、也走完了全程；FOS 案例说明 grant 之后 15 天放款是可测的公开基准；Lo 家族信托（Tao Soh Ngun [2018] HKCFI 380）说明 letter of wishes 与受托人职责冲突的争议路径；He 家族是演示。这个页面的价值是让管理层看到“时间、金额、成本、结果”，而不是只看“案件是否关闭”。",
    en: "This is the estate case portfolio. Death is not a point in time; it is a long timeline. Each case carries the date of death, days open, estate value, amount distributed, legal cost, current status and beneficiaries. We deliberately mix public cases and illustrative cases, and mark the endings. The Anita Mui testamentary trust is a closed case: the trust executed the will for twenty-three years after the 2003 death; in August 2026 the mother — aged 102 — passed away, the trust terminated per the will, and the residue went to the charity she named. The Financial Ombudsman case shows a measurable public benchmark: funds released fifteen days after the grant. The Lo Family Trust dispute (Tao Soh Ngun, [2018] HKCFI 380) shows how letters of wishes collide with trustee duties. The He family is illustrative. The value of this page is that management sees time, value, cost and outcome, not only whether the case is closed.",
    screen: "Compare the days-open column across cases and point to the 12-month outcome metrics below.",
    transition: "The next page opens one case and shows the legal sequence."
  },
  "estate-case": {
    title: "Estate Case Timeline",
    cn: "这一页是单个案件的时间线。顺序非常重要：T+0 死亡通知，POA 自动终止；T+1 家属联系，executor 还没有 grant；T+7 葬礼和紧急费用；T+30 probate 申请；T+60 grant；T+90 estate account 和分配；T+365 结果复盘。银行不能把“家属同意”当成授权，也不能在 grant 之前把资产转给家属。这个页面把法律动作、银行动作和证据放在同一条时间线上。",
    en: "This is the timeline of one case. The sequence matters. At T+0 the death is notified and the power of attorney ends automatically. At T+1 the family makes contact, but the executor has not yet been granted probate. At T+7 funeral and urgent expenses arise. At T+30 probate is filed. At T+60 the grant is issued. At T+90 the estate account and distributions are handled. At T+365 the outcome is reviewed. The bank cannot treat family consensus as authority, and cannot transfer assets to the family before the grant. This page puts the legal action, bank action and evidence on one timeline.",
    screen: "Read T+0, T+60 and T+365; point to the authority and evidence columns.",
    transition: "Authority is the most important control in this journey."
  },
  "estate-authority": {
    title: "Authority & Probate",
    cn: "这一页是授权与 probate。这里把四种角色分开：executor 管遗产，trustee 管信托，attorney 在死亡时终止，beneficiary 只有受益权、没有指示银行的权利。每一行都写清楚 instrument、scope、status、能付什么、不能做什么。右侧是 probate/estate 清单和负向规则：不要继续使用已故客户的 POA，不要把信托资产当遗产，不要向无权家属披露，不要承诺固定放款日，不要绕过 probate 或法院命令。",
    en: "This is authority and probate. We separate four roles. The executor administers the estate. The trustee administers the trust. The attorney’s authority terminates on death. The beneficiary has a beneficial interest but no authority to instruct the bank. Each row states the instrument, scope, status, what the role can pay and what it cannot do. The right side contains the probate and estate checklist plus negative rules: do not continue a deceased client’s power of attorney, do not treat trust assets as estate assets, do not disclose to unauthorized family members, do not promise a fixed release date and do not bypass probate or court orders.",
    screen: "Hover the authority matrix; read the negative rules aloud.",
    transition: "The final estate page answers the question the client actually asks: what happened after twelve months?"
  },
  "estate-outcomes": {
    title: "12-Month Outcomes",
    cn: "这一页是十二个月结果。我们不只问“案件有没有关闭”，而是问：第一笔合法支付用了多少天？十二个月分配了多少？法律成本占遗产多少？家族有没有留下来？NPS 是多少？跨境案件和本地案件的差距在哪里？这些指标让“身故体验”从感觉变成 cohort 数据。下一步要接真实案件、受益人口径、跨境数据，并且做隐私评估。",
    en: "This is the twelve-month outcome. We do not only ask whether the case is closed. We ask how many days it took to make the first lawful payment, how much was distributed at twelve months, what legal cost was as a percentage of the estate, whether the family stayed, what the NPS was and where the cross-border gap sits. These metrics turn the bereavement experience from an opinion into cohort data. The next step is to connect real cases, beneficiary definitions and cross-border data, with a privacy impact assessment.",
    screen: "Compare domestic and cross-border cohorts; point to first-payment days and retention.",
    transition: "We now move from continuity to growth: how a new family member starts."
  },
  "onboarding-family": {
    title: "Family Onboarding",
    cn: "这一页是家庭 onboarding。私人银行的客户不是一个 client ID，而是一个家庭图谱：主客户、配偶、成年子女、未成年子女、受托人、律师、家族办公室。每个人有自己的角色、同意状态、目标和权限。这里特别要强调：父母不能替成年子女同意；未成年人的权限来自监护或信托；配偶的权限来自本人同意或法律授权。页面下面的权限模型，就是防止“家长说了算”的系统边界。",
    en: "This is family onboarding. A private-banking client is not a single client ID. It is a family graph: principal, spouse, adult children, minor children, trustees, lawyers and the family office. Each person has a role, consent status, goals and entitlements. Three points are critical. A parent cannot consent on behalf of an adult child. A minor’s authority comes from guardianship or a trust. A spouse’s authority comes from their own consent or a valid legal instrument. The permission model below is the hard system boundary that prevents “the parent decides everything”.",
    screen: "Point to the consent column and the permission table.",
    transition: "Before any product, we need a suitability assessment."
  },
  "onboarding-suitability": {
    title: "Suitability & Risk",
    cn: "这一页是适当性与风险。组合模板不能替代适当性。每个客户至少要有：投资目标、风险承受、风险能力、知识与经验、流动性需求、集中度、限制、税务居民。页面上的结论不是“买这个产品”，而是“适合哪类模板、首次投资上限是多少、需要什么教育”。如果客户知识有限，就不能直接进入私募或杠杆产品。",
    en: "This is suitability and risk. A portfolio template does not replace a suitability assessment. Every client needs an investment objective, risk tolerance, risk capacity, knowledge and experience, liquidity needs, concentration, restrictions and tax residence. The output is not “buy this product”. The output is which template is suitable, what the first-investment limit is and what education is required. If the client has limited knowledge, private markets or leverage should not be the first step.",
    screen: "Read the suitability fields and the outcome; point to the negative rules.",
    transition: "Once suitability is clear, we can choose a template."
  },
  "onboarding-templates": {
    title: "Portfolio Templates",
    cn: "这一页是组合模板。我们提供六类起点：保本、收益、平衡、增长、流动性、ESG。每一类都有风险、期限、目标、最低认购、费用、流动性。模板的价值是降低新客户、二代、配偶的决策难度；但模板不是建议，也不是收益承诺。客户仍然要经过适当性、费用披露和确认。页面上的最低认购和费用都是演示，真实值要按实体、辖区和客户协议确认。",
    en: "This is portfolio templates. We offer six starting points: capital preservation, income, balanced, growth, liquidity and ESG. Each template has a risk level, horizon, objective, minimum subscription, fee and liquidity. The value of a template is that it lowers the decision burden for a new client, a next-generation member or a spouse. But a template is not advice and not a return promise. The client still goes through suitability, fee disclosure and confirmation. Minimums and fees are illustrative; actual terms depend on the entity, jurisdiction and client agreement.",
    screen: "Compare Income, Balanced and Growth; point to minimum, fee and liquidity.",
    transition: "The first investment is where trust is won or lost."
  },
  "onboarding-first": {
    title: "First Investment",
    cn: "这一页是首次投资。目标不是卖一个产品，而是创造一个客户能理解、能承受、能复盘的第一次体验。步骤是：适当性通过、教育完成、选择模板、客户确认、下单、post-trade review。金额可以很小，但流程要完整。交易完成后要有确认、复盘、下一次回顾和反馈。对二代/配偶来说，这次体验决定他们以后是否愿意继续用银行。",
    en: "This is the first investment. The objective is not to sell a product. It is to create a first experience the client understands, can tolerate and can review. The steps are: suitability passed, education completed, template selected, client confirmation, order execution and post-trade review. The amount can be small, but the process must be complete. After execution there must be a confirmation, a review, a next review date and feedback. For a next-generation member or a spouse, this experience determines whether they stay with the bank.",
    screen: "Walk the checklist from suitability to post-trade review; point to the evidence column.",
    transition: "From the client experience, we move to the economics."
  },
  "revenue-cockpit": {
    title: "Revenue & Margin Cockpit",
    cn: "这一页是收入与毛利驾驶舱。客户佣金不是毛利。毛利要扣除直接服务成本、资金成本、分摊成本。页面上的收入、毛利、净利、成本收入比要能按客户、产品、RM 和实体拆开。月度趋势要区分已实现、应计和预测收入。真实上线前，必须由财务、资金、产品控制和内部转移定价签字。",
    en: "This is the revenue and margin cockpit. Client commission is not gross margin. Gross margin must deduct direct cost-to-serve, funding cost and allocated cost. Revenue, gross margin, net margin and cost/income must be decomposable by client, product, RM and legal entity. The monthly trend must distinguish realised, accrued and forecast revenue. Before production, Finance, Treasury, Product Control and transfer pricing must sign off.",
    screen: "Point to the four summary metrics and the monthly trend; then the client economics table.",
    transition: "The next page opens one client’s P&L."
  },
  "revenue-client": {
    title: "Client P&L",
    cn: "这一页是客户损益。一个客户的收入可能来自顾问费、贷款利差、外汇、信托和家办；成本包括 RM 时间、运营、法律、技术和资金。把这些放在一张表上，才能回答“这个客户到底赚不赚钱”。钱包份额是另一个维度：客户总财富和银行实际管理资产的比例。客户毛利不是佣金，是收入减去直接和分摊成本后的贡献。",
    en: "This is the client P&L. A client’s revenue may come from advisory fees, lending spread, foreign exchange, trust and family-office services. Cost includes RM time, operations, legal, technology and funding. Only when these sit on one page can we answer whether the client is profitable. Wallet share is a separate dimension: the client’s total wealth versus the assets the bank actually manages. Client margin is not commission; it is contribution after direct and allocated cost.",
    screen: "Read the revenue lines, direct cost, allocated cost and net margin.",
    transition: "The same logic applies at product level."
  },
  "revenue-product": {
    title: "Product P&L",
    cn: "这一页是产品损益。顾问、托管、经纪、贷款、外汇、信托的收入、成本和毛利放在一起。这样可以看到：哪些产品是规模产品、哪些是利润产品、哪些是战略产品但需要补贴。产品毛利不能只看费率，还要看资金成本、运营成本和风险资本。",
    en: "This is product P&L. Advisory, custody, brokerage, lending, foreign exchange and trust are shown with revenue, cost and margin. This makes visible which products are scale products, which are profit products and which are strategic but require subsidy. Product margin is not just a fee rate. It must include funding cost, operating cost and risk capital.",
    screen: "Compare advisory, lending and trust margins; point to the margin percentage column.",
    transition: "Finally, we bring revenue and trust together in the RM scorecard."
  },
  "revenue-rm": {
    title: "RM Scorecard",
    cn: "这一页是 RM 计分卡。这里特别要说明：51 是客户关系数，不是 51 位独立富豪。一个 RM 可能管理 35 到 51 个关系，对应 15 到 25 个家庭，AUM 四到六亿美元。为了把“客户数”变成可解释的产能，我们再加三个字段：support_ratio，表示每个 RM 配多少助理/产品专家；segment_mix，表示 UHNW、HNW、家族办公室的占比；service_intensity，表示每个关系的年度会议、交易、信托/遗产案件和信贷额度工作量。公开基准是：私人银行 RM 通常服务 50 到 70 位客户；高盛 PWM 公开 1:25；亚洲私人银行平均 AUM/RM 约 4.73 亿美元。51 个关系属于偏高：屏幕上的 workload index 是 97.4，进入 overloaded 区，主因是 0.7 的 support ratio。RM KPI 不能只看收入，还要看毛利、失败交易、NPS 和可控风险。",
    en: "This is the RM scorecard. One clarification: 51 is the number of client relationships, not 51 independent wealthy individuals. An RM may manage 35 to 51 relationships, corresponding to 15 to 25 households, with US$400–600m AUM. To turn a raw client count into an explainable capacity measure, we add three fields: support_ratio, the number of assistants or product specialists per RM; segment_mix, the UHNW, HNW and family-office share; and service_intensity, the annual meetings, trades, trust/estate cases and credit facilities per relationship. Public benchmarks: private-banking RMs typically serve 50–70 clients; Goldman Sachs PWM cites 1:25; Asian Private Banker reports average AUM per RM of about US$473m. Fifty-one relationships is at the upper end: on screen, the workload index is 97.4 — overloaded — driven mainly by a 0.7 support ratio. RM KPIs must include gross margin, failed trades, NPS and controllable risk, not revenue alone.",
    screen: "Point to Relationships, Households and AUM; read the capacity benchmark note.",
    transition: "We now move to the moment that most directly affects trust: a failed order."
  },
  "order-monitor": {
    title: "Order Monitor",
    cn: "这一页是订单监控。订单不是只有“成功/失败”，而是有完整生命周期：created、validated、sent、acknowledged、filled、settled，或者 failed/rejected。失败原因要编码：市场关闭/节假日、限价/流动性、资金/持仓不足、系统超时、对手方、合规/适当性。页面把客户、RM、市场、金额、状态、原因放在一张表上，让运营和 RM 看到同一事实。",
    en: "This is order monitoring. An order is not simply successful or failed. It has a lifecycle: created, validated, sent, acknowledged, filled, settled, or failed/rejected. Failure reasons must be coded: market closed or holiday, limit price or liquidity, insufficient cash or holdings, system timeout, counterparty and compliance or suitability. The page puts client, RM, market, amount, status and reason on one blotter, so Operations and the RM see the same facts.",
    screen: "Point to the Failed rows, reason column and the failed-trade percentage.",
    transition: "The next page explains one failure in detail."
  },
  "order-failure": {
    title: "Failure Detail",
    cn: "这一页是失败详情。以 ORD-1002 为例：客户是一个演示家族（UK creator family），市场是伦敦，时间是伦敦 16:44——收盘之后下单，原因是 market closed（out-of-hours）。这个页面要回答四件事：发生了什么、为什么发生、谁受影响、下一步是什么。Root cause 是下单时没有检查市场日历；Control 是 pre-trade market-calendar check；Recovery 是下一个交易日重新下单并通知客户。每一步要留证据。",
    en: "This is failure detail. Take ORD-1002: the client is a fictional demo family — the UK creator family — the market is London, and the order was submitted at 16:44 London time, after the close; the reason is market closed, out of hours. The page answers four questions: what happened, why it happened, who is affected and what happens next. The root cause is that the market calendar was not checked at order entry. The control is a pre-trade market-calendar check. Recovery is to rebook at the next trading session and inform the client. Every step must leave evidence.",
    screen: "Read the root cause, control and recovery; then the recovery queue.",
    transition: "Recovery is a workflow, not a single apology."
  },
  "order-recovery": {
    title: "Recovery Workflow",
    cn: "这一页是恢复流程。五步：detect、explain、rebook、compensate、root cause。Detect 由运营标记失败并分类；Explain 由 RM 当天联系客户，解释原因和下一步；Rebook 是重新下单或替代市场；Compensate 是在适当情况下减免费用；Root cause 是由 COO 修复日历/系统/流程。每一步有 owner、SLA、status 和 evidence。客户信任不是“没有失败”，而是“失败以后你怎么处理”。",
    en: "This is the recovery workflow. Five steps: detect, explain, rebook, compensate and root cause. Operations detects and classifies the failure. The RM contacts the client the same day to explain the reason and the next step. Rebook means re-entering the order or using an alternative venue. Compensate means a fee waiver or gesture where appropriate. Root cause means the COO fixes the calendar, system or process. Every step has an owner, SLA, status and evidence. Client trust is not the absence of failure; it is how the failure is handled.",
    screen: "Walk the five steps; point to owner, status and SLA.",
    transition: "The last page turns failures into a KPI and a trust measure."
  },
  "order-kpi": {
    title: "Order KPI & Trust",
    cn: "这一页是订单 KPI 与信任。核心指标：失败交易比例、首次成交率、平均恢复时间、受影响客户数、RM KPI 调整、信任分。关键原则是区分可控失败、外部失败和系统失败；RM 只对可控失败和恢复质量负责。要 instrument 的数据包括：订单事件、原因码、市场日历、系统 incident、客户沟通、补偿、TCA、NPS。这样“失败交易”才不是一句抱怨，而是可归因、可改善、可考核的经营指标。",
    en: "This is order KPI and trust. The core metrics are failed-trade percentage, first-time fill rate, average recovery time, number of affected clients, RM KPI adjustment and trust score. The key principle is to separate controllable failures, external failures and system failures. The RM is accountable for controllable failures and recovery quality. The data to instrument includes order events, reason codes, market calendars, system incidents, client communication, compensation, TCA and NPS. Only then does “failed trade” become an attributable, improvable and measurable operating metric rather than a complaint.",
    screen: "Read the KPI table and the instrument list; point to the KPI principle.",
    transition: "That completes the five modules. The next step is to connect real data and run the pilots."
  }
};

if (typeof module !== "undefined") module.exports = SCRIPTS;
