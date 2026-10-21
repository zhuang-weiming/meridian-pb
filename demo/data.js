/* Demo data — all names, numbers and structures are fictional / illustrative. */
const DB = {
  asOf: "2026-10-20 09:00 HKT",
  clients: [
    {
      id: "C-1001", householdId: "H-1001", name: "陈志远", short: "陈先生", segment: "T2 高净值", rm: "Alex Chan",
      booking: ["香港", "新加坡"], totalWealth: 28000000, liquid: 6200000, liabilities: 0,
      concentration: 0.42, risk: "平衡", riskExpiry: "2026-12-31", taxResidency: "中国内地",
      entity: "个人 + 香港公司", family: "配偶 + 1 名子女", since: "2021",
      source: "科技创始人（已上市）", aum: 28000000, taxId: "CN-****-8821",
      accounts: [
        { id: "HK-0091", centre: "香港", type: "托管", ccy: "USD", value: 18400000 },
        { id: "HK-0092", centre: "香港", type: "现金", ccy: "USD", value: 4200000 },
        { id: "SG-0144", centre: "新加坡", type: "托管", ccy: "USD", value: 5400000 }
      ]
    },
    {
      id: "C-88421", householdId: "H-88421", name: "林哲（示例）", short: "林先生", segment: "T1 超高净值", rm: "Alex Chan",
      booking: ["香港", "新加坡"], totalWealth: 9250000000, liquid: 52000000, liabilities: 0,
      concentration: 0.96, risk: "进取", riskExpiry: "2026-12-31", taxResidency: "中国内地",
      entity: "BVI 控股 + 香港信托", family: "配偶 + 2 名子女", since: "2019",
      source: "Pre-IPO 创始人", aum: 9250000000, taxId: "CN-****-4417",
      accounts: [
        { id: "HK-8801", centre: "香港", type: "托管", ccy: "USD", value: 42000000 },
        { id: "SG-8802", centre: "新加坡", type: "现金", ccy: "USD", value: 10000000 }
      ]
    },
    {
      id: "C-2002", householdId: "H-2002", name: "王女士", short: "王女士", segment: "T3 富裕", rm: "Mia Wong",
      booking: ["香港"], totalWealth: 12000000, liquid: 4500000, liabilities: 1200000,
      concentration: 0.18, risk: "稳健", riskExpiry: "2027-03-31", taxResidency: "香港",
      entity: "个人", family: "配偶 + 2 名子女", since: "2023",
      source: "家族企业分红", aum: 12000000, taxId: "HK-****-2019",
      accounts: [
        { id: "HK-2201", centre: "香港", type: "托管", ccy: "HKD", value: 7500000 },
        { id: "HK-2202", centre: "香港", type: "现金", ccy: "USD", value: 4500000 }
      ]
    },
    {
      id: "C-7701", householdId: "H-7701", name: "何启明（示例）", short: "何先生", segment: "T1 超高净值", rm: "Alex Chan",
      booking: ["香港", "新加坡"], totalWealth: 1200000000, liquid: 90000000, liabilities: 0,
      concentration: 0.38, risk: "平衡", riskExpiry: "2027-06-30", taxResidency: "香港",
      entity: "BVI 控股 + 香港家办 + 香港信托", family: "配偶 + 2 名子女 + 母亲", since: "2016",
      source: "香港上市工业集团", aum: 1200000000, taxId: "HK-****-7701",
      familyDetail: [
        { name: "何启明", role: "创始人", age: 62 },
        { name: "陈雅仪", role: "配偶", age: 59 },
        { name: "何俊轩", role: "长子", age: 28 },
        { name: "何语晴", role: "次女", age: 25 },
        { name: "李淑贞", role: "母亲", age: 86 }
      ],
      accounts: [
        { id: "HK-7701", centre: "香港", type: "托管", ccy: "HKD", value: 420000000 },
        { id: "SG-7702", centre: "新加坡", type: "现金", ccy: "USD", value: 80000000 },
        { id: "BVI-7703", centre: "BVI", type: "基金账户", ccy: "USD", value: 30000000 }
      ]
    }
  ],

  households: [
    { id: "H-1001", name: "陈氏家庭", primaryClientId: "C-1001", rm: "Alex Chan", booking: ["香港", "新加坡"], reportingCurrency: "USD", consentRef: "CONSENT-H-1001-01", note: "跨境工作家庭；未成年子女教育目标。" },
    { id: "H-7701", name: "何氏家族", primaryClientId: "C-7701", rm: "Alex Chan", booking: ["香港", "新加坡"], reportingCurrency: "HKD", consentRef: "CONSENT-H-7701-01", note: "三代家庭；创始人、配偶、两名成年子女、母亲。" },
    { id: "H-88421", name: "林氏家庭", primaryClientId: "C-88421", rm: "Alex Chan", booking: ["香港", "新加坡"], reportingCurrency: "USD", consentRef: "CONSENT-H-88421-01", note: "Pre-IPO 创始人；配偶与两名未成年子女。" },
    { id: "H-2002", name: "王氏家庭", primaryClientId: "C-2002", rm: "Mia Wong", booking: ["香港"], reportingCurrency: "HKD", consentRef: "CONSENT-H-2002-01", note: "香港本地家庭；两名子女。" }
  ],

  persons: [
    { id: "P-1001-01", householdId: "H-1001", name: "陈志远", role: "主客户", age: 42, isClient: true, clientId: "C-1001", residency: "中国内地", serviceMarket: "香港 / 新加坡", accountHolder: true, authorization: "本人" },
    { id: "P-1001-02", householdId: "H-1001", name: "周敏", role: "配偶", age: 40, isClient: false, residency: "中国内地", serviceMarket: "香港", accountHolder: true, authorization: "家庭授权" },
    { id: "P-1001-03", householdId: "H-1001", name: "陈雨桐", role: "女儿（未成年）", age: 12, isClient: false, residency: "中国内地", serviceMarket: "香港 / 英国", accountHolder: false, authorization: "监护人授权" },
    { id: "P-7701-01", householdId: "H-7701", name: "何启明", role: "创始人 / 主客户", age: 62, isClient: true, clientId: "C-7701", residency: "香港", serviceMarket: "香港 / 新加坡", accountHolder: true, authorization: "本人" },
    { id: "P-7701-02", householdId: "H-7701", name: "陈雅仪", role: "配偶", age: 59, isClient: false, residency: "香港", serviceMarket: "香港", accountHolder: true, authorization: "家庭授权" },
    { id: "P-7701-03", householdId: "H-7701", name: "何俊轩", role: "长子（成年）", age: 28, isClient: false, residency: "香港", serviceMarket: "香港 / 新加坡", accountHolder: false, authorization: "待本人确认" },
    { id: "P-7701-04", householdId: "H-7701", name: "何语晴", role: "次女（成年）", age: 25, isClient: false, residency: "香港", serviceMarket: "香港 / 新加坡", accountHolder: false, authorization: "待本人确认" },
    { id: "P-7701-05", householdId: "H-7701", name: "李淑贞", role: "母亲", age: 86, isClient: false, residency: "香港", serviceMarket: "香港", accountHolder: false, authorization: "家庭授权" },
    { id: "P-88421-01", householdId: "H-88421", name: "林哲", role: "创始人 / 主客户", age: 47, isClient: true, clientId: "C-88421", residency: "中国内地", serviceMarket: "香港 / 新加坡", accountHolder: true, authorization: "本人" },
    { id: "P-88421-02", householdId: "H-88421", name: "叶青", role: "配偶", age: 45, isClient: false, residency: "中国内地", serviceMarket: "香港", accountHolder: true, authorization: "家庭授权" },
    { id: "P-88421-03", householdId: "H-88421", name: "林一", role: "长子（未成年）", age: 14, isClient: false, residency: "中国内地", serviceMarket: "香港 / 英国", accountHolder: false, authorization: "监护人授权" },
    { id: "P-88421-04", householdId: "H-88421", name: "林二", role: "次女（未成年）", age: 11, isClient: false, residency: "中国内地", serviceMarket: "香港 / 英国", accountHolder: false, authorization: "监护人授权" },
    { id: "P-2002-01", householdId: "H-2002", name: "王女士", role: "主客户", age: 46, isClient: true, clientId: "C-2002", residency: "香港", serviceMarket: "香港", accountHolder: true, authorization: "本人" },
    { id: "P-2002-02", householdId: "H-2002", name: "李先生", role: "配偶", age: 48, isClient: false, residency: "香港", serviceMarket: "香港", accountHolder: true, authorization: "家庭授权" },
    { id: "P-2002-03", householdId: "H-2002", name: "李同学（长子）", role: "长子（未成年）", age: 15, isClient: false, residency: "香港", serviceMarket: "香港 / 英国", accountHolder: false, authorization: "监护人授权" },
    { id: "P-2002-04", householdId: "H-2002", name: "李同学（次女）", role: "次女（未成年）", age: 10, isClient: false, residency: "香港", serviceMarket: "香港", accountHolder: false, authorization: "监护人授权" }
  ],

  relationships: [
    { id: "R-1001-01", householdId: "H-1001", from: "P-1001-01", to: "P-1001-02", type: "配偶", effectiveFrom: "2012-05-20", effectiveTo: null, verified: "已核验", evidence: "结婚证明（已归档）", consent: "家庭授权" },
    { id: "R-1001-02", householdId: "H-1001", from: "P-1001-01", to: "P-1001-03", type: "父女（未成年）", effectiveFrom: "2014-03-08", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" },
    { id: "R-1001-03", householdId: "H-1001", from: "P-1001-02", to: "P-1001-03", type: "母女（未成年）", effectiveFrom: "2014-03-08", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" },
    { id: "R-7701-01", householdId: "H-7701", from: "P-7701-01", to: "P-7701-02", type: "配偶", effectiveFrom: "1993-11-06", effectiveTo: null, verified: "已核验", evidence: "结婚证明（已归档）", consent: "家庭授权" },
    { id: "R-7701-02", householdId: "H-7701", from: "P-7701-01", to: "P-7701-03", type: "父子（成年）", effectiveFrom: "1998-04-12", effectiveTo: null, verified: "已核验", evidence: "出生证明", consent: "待本人确认" },
    { id: "R-7701-03", householdId: "H-7701", from: "P-7701-01", to: "P-7701-04", type: "父女（成年）", effectiveFrom: "2001-09-23", effectiveTo: null, verified: "已核验", evidence: "出生证明", consent: "待本人确认" },
    { id: "R-7701-04", householdId: "H-7701", from: "P-7701-01", to: "P-7701-05", type: "母子", effectiveFrom: "1940-02-15", effectiveTo: null, verified: "已核验", evidence: "出生证明（历史档案）", consent: "家庭授权" },
    { id: "R-88421-01", householdId: "H-88421", from: "P-88421-01", to: "P-88421-02", type: "配偶", effectiveFrom: "2008-10-01", effectiveTo: null, verified: "已核验", evidence: "结婚证明（已归档）", consent: "家庭授权" },
    { id: "R-88421-02", householdId: "H-88421", from: "P-88421-01", to: "P-88421-03", type: "父子（未成年）", effectiveFrom: "2012-06-18", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" },
    { id: "R-88421-03", householdId: "H-88421", from: "P-88421-01", to: "P-88421-04", type: "父女（未成年）", effectiveFrom: "2015-02-11", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" },
    { id: "R-2002-01", householdId: "H-2002", from: "P-2002-01", to: "P-2002-02", type: "配偶", effectiveFrom: "2004-12-12", effectiveTo: null, verified: "已核验", evidence: "结婚证明（已归档）", consent: "家庭授权" },
    { id: "R-2002-02", householdId: "H-2002", from: "P-2002-01", to: "P-2002-03", type: "母子（未成年）", effectiveFrom: "2011-08-30", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" },
    { id: "R-2002-03", householdId: "H-2002", from: "P-2002-01", to: "P-2002-04", type: "母女（未成年）", effectiveFrom: "2016-05-04", effectiveTo: null, verified: "已核验", evidence: "出生证明 + 监护关系", consent: "监护人授权" }
  ],

  consents: [
    { id: "CONSENT-H-1001-01", householdId: "H-1001", personId: "P-1001-01", purpose: "未成年子女教育规划", scope: "教育目标、支出计划、学校申请；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0210" },
    { id: "CONSENT-H-1001-02", householdId: "H-1001", personId: "P-1001-02", purpose: "家庭信息共享", scope: "家庭目标与教育支出；不含投资明细", status: "已授权", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0211" },
    { id: "CONSENT-H-1001-03", householdId: "H-1001", personId: "P-1001-03", purpose: "教育规划（监护人代行）", scope: "教育目标、学校申请；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0212" },
    { id: "CONSENT-H-7701-01", householdId: "H-7701", personId: "P-7701-01", purpose: "家庭服务与信息共享", scope: "本人 + 配偶 + 受抚养成员", status: "已授权", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0115" },
    { id: "CONSENT-H-7701-02", householdId: "H-7701", personId: "P-7701-03", purpose: "服务邀请与反馈分享", scope: "仅邀请；反馈需本人再次确认", status: "待本人确认", grantedAt: null, expiresAt: null, evidenceRef: "—" },
    { id: "CONSENT-H-7701-03", householdId: "H-7701", personId: "P-7701-04", purpose: "教育/服务邀请", scope: "仅邀请；不共享资产与投资信息", status: "待本人确认", grantedAt: null, expiresAt: null, evidenceRef: "—" },
    { id: "CONSENT-H-7701-04", householdId: "H-7701", personId: "P-7701-05", purpose: "健康养老服务", scope: "健康/养老事项；不含资产信息", status: "已授权（家庭）", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0116" },
    { id: "CONSENT-H-7701-05", householdId: "H-7701", personId: "P-7701-02", purpose: "家庭信息共享", scope: "家庭目标与服务邀请；不含投资明细", status: "已授权（家庭）", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0117" },
    { id: "CONSENT-H-88421-01", householdId: "H-88421", personId: "P-88421-01", purpose: "家庭服务与传承", scope: "本人 + 配偶 + 未成年子女", status: "已授权", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0301" },
    { id: "CONSENT-H-88421-02", householdId: "H-88421", personId: "P-88421-03", purpose: "教育规划（监护人代行）", scope: "教育目标、学校申请；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0302" },
    { id: "CONSENT-H-88421-03", householdId: "H-88421", personId: "P-88421-04", purpose: "教育规划（监护人代行）", scope: "教育目标、学校申请；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0303" },
    { id: "CONSENT-H-88421-04", householdId: "H-88421", personId: "P-88421-02", purpose: "家庭信息共享", scope: "家庭目标与服务邀请；不含投资明细", status: "已授权（家庭）", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0304" },
    { id: "CONSENT-H-2002-01", householdId: "H-2002", personId: "P-2002-01", purpose: "未成年子女教育规划", scope: "教育目标与支出；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0412" },
    { id: "CONSENT-H-2002-02", householdId: "H-2002", personId: "P-2002-03", purpose: "教育规划（监护人代行）", scope: "教育目标与支出；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0413" },
    { id: "CONSENT-H-2002-03", householdId: "H-2002", personId: "P-2002-04", purpose: "教育规划（监护人代行）", scope: "教育目标与支出；不含投资账户", status: "已授权（监护人）", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0414" },
    { id: "CONSENT-H-2002-04", householdId: "H-2002", personId: "P-2002-02", purpose: "家庭信息共享", scope: "家庭目标与服务邀请；不含投资明细", status: "已授权（家庭）", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0415" }
  ],

  familyGoals: [
    { id: "FG-1001-01", householdId: "H-1001", title: "女儿英国/香港教育资金", category: "教育", ownerPersonId: "P-1001-01", beneficiaryPersonIds: ["P-1001-03"], fundingPartyIds: ["P-1001-01"], decisionMakerId: "P-1001-01", decisionMaker: "陈志远 + 配偶", targetAmount: 1500000, currency: "USD", targetDate: "2030-09-01", priority: "高", flexibility: "中", visibilityScope: "父母 + RM", fundingCommitmentStatus: "未设专户", status: "待确认", gap: "未设教育专户；年度支出未锁定", caseId: "CASE-1001-EDU" },
    { id: "FG-7701-01", householdId: "H-7701", title: "2027 年 3 月税负流动性", category: "流动性 / 税务", ownerPersonId: "P-7701-01", beneficiaryPersonIds: ["P-7701-01", "P-7701-02", "P-7701-03", "P-7701-04", "P-7701-05"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-01", decisionMaker: "何启明", targetAmount: 10000000, currency: "USD", targetDate: "2027-03-15", priority: "高", flexibility: "低", visibilityScope: "核心家庭成员", fundingCommitmentStatus: "已安排 80%", status: "进行中", gap: "约 200 万美元缺口；依赖质押/减持", caseId: "CASE-7701-LIQ" },
    { id: "FG-7701-02", householdId: "H-7701", title: "次女何语晴教育资金", category: "教育", ownerPersonId: "P-7701-04", beneficiaryPersonIds: ["P-7701-04"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-04", decisionMaker: "何语晴本人", targetAmount: 1200000, currency: "USD", targetDate: "2028-09-01", priority: "中", flexibility: "中", visibilityScope: "本人 + 出资人", fundingCommitmentStatus: "意向", status: "待本人确认", gap: "本人授权与教育专户未设", caseId: "CASE-7701-EDU" },
    { id: "FG-7701-03", householdId: "H-7701", title: "长子何俊轩独立参与财富管理", category: "成年子女独立", ownerPersonId: "P-7701-03", beneficiaryPersonIds: ["P-7701-03"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-03", decisionMaker: "何俊轩本人", targetAmount: 5000000, currency: "USD", targetDate: "2027-06-30", priority: "中", flexibility: "高", visibilityScope: "本人 + 出资人", fundingCommitmentStatus: "未承诺", status: "待授权", gap: "本人同意与授权缺失；家长不得代决策", caseId: "CASE-7701-NEXT" },
    { id: "FG-7701-04", householdId: "H-7701", title: "家族治理与传承", category: "传承", ownerPersonId: "P-7701-01", beneficiaryPersonIds: ["P-7701-01", "P-7701-02", "P-7701-03", "P-7701-04", "P-7701-05"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-01", decisionMaker: "何启明 + 家族委员会", targetAmount: null, currency: "HKD", targetDate: "2027-12-31", priority: "高", flexibility: "低", visibilityScope: "家族成员", fundingCommitmentStatus: "进行中", status: "进行中", gap: "家族宪章与决策规则待定", caseId: "CASE-7701-GOV" },
    { id: "FG-88421-01", householdId: "H-88421", title: "Pre-IPO 流动性与集中度", category: "流动性", ownerPersonId: "P-88421-01", beneficiaryPersonIds: ["P-88421-01", "P-88421-02", "P-88421-03", "P-88421-04"], fundingPartyIds: ["P-88421-01"], decisionMakerId: "P-88421-01", decisionMaker: "林哲", targetAmount: 500000000, currency: "USD", targetDate: "2028-03-31", priority: "高", flexibility: "低", visibilityScope: "核心家庭成员", fundingCommitmentStatus: "未安排", status: "进行中", gap: "估值/锁定期/授信未定", caseId: "CASE-88421-LIQ" },
    { id: "FG-88421-02", householdId: "H-88421", title: "子女教育与信托预算", category: "教育 / 传承", ownerPersonId: "P-88421-01", beneficiaryPersonIds: ["P-88421-03", "P-88421-04"], fundingPartyIds: ["P-88421-01"], decisionMakerId: "P-88421-01", decisionMaker: "林哲 + 配偶", targetAmount: 2000000, currency: "USD", targetDate: "2032-09-01", priority: "中", flexibility: "中", visibilityScope: "父母 + 受托人", fundingCommitmentStatus: "未安排", status: "待确认", gap: "信托/教育专户未设", caseId: "CASE-88421-EDU" },
    { id: "FG-2002-01", householdId: "H-2002", title: "两名子女教育资金", category: "教育", ownerPersonId: "P-2002-01", beneficiaryPersonIds: ["P-2002-03", "P-2002-04"], fundingPartyIds: ["P-2002-01", "P-2002-02"], decisionMakerId: "P-2002-01", decisionMaker: "王女士 + 配偶", targetAmount: 800000, currency: "USD", targetDate: "2031-09-01", priority: "中", flexibility: "中", visibilityScope: "父母 + RM", fundingCommitmentStatus: "未设专户", status: "待确认", gap: "教育专户与年度预算未设", caseId: "CASE-2002-EDU" }
  ],

  cases: [
    { id: "CASE-1001-EDU", householdId: "H-1001", title: "女儿教育资金专户与年度预算", module: "M3 / M4", type: "教育 / 授权", owner: "Alex Chan", dependencies: "监护人授权 / 学校录取 / 年度预算", due: "2027-06-30", deliverable: "教育资金专户 + 年度预算表", clientTodo: "确认学校与年度支出", status: "进行中", priority: "P1", goalId: "FG-1001-01", link: "m3-family", linkLabel: "打开家庭目标" },
    { id: "CASE-7701-LIQ", householdId: "H-7701", title: "2027 年 3 月税负流动性", module: "M3", type: "融资", owner: "Alex Chan", dependencies: "抵押品估值 / 授信预审 / 税务测算", due: "2027-02-15", deliverable: "Term sheet + 授信批复", clientTodo: "确认抵押品与授权", status: "进行中", priority: "P0", goalId: "FG-7701-01", link: "m3-financing", linkLabel: "打开融资驾驶舱" },
    { id: "CASE-7701-TAX", householdId: "H-7701", title: "家办 FIHV 与印花税复核", module: "M5", type: "税务", owner: "HSBC PB Tax", dependencies: "税务画像 / 实质文件 / 反避税", due: "2027-01-31", deliverable: "内部税务意见 + 申报清单", clientTodo: "补齐香港实质文件", status: "等待客户", priority: "P1", goalId: "FG-7701-01", link: "m5-intake", linkLabel: "打开税务案件" },
    { id: "CASE-7701-EDU", householdId: "H-7701", title: "何语晴教育资金与授权", module: "M3 / M4", type: "教育 / 授权", owner: "Alex Chan", dependencies: "本人同意 / 出资人确认 / 专户", due: "2027-03-31", deliverable: "教育资金方案 + 授权记录", clientTodo: "何语晴本人确认", status: "等待客户", priority: "P2", goalId: "FG-7701-02", link: "m3-family", linkLabel: "打开家庭目标" },
    { id: "CASE-7701-NEXT", householdId: "H-7701", title: "何俊轩独立账户与二代课程", module: "M3", type: "服务 / 授权", owner: "Alex Chan", dependencies: "本人同意 / 适当性 / 课程名额", due: "2027-05-01", deliverable: "邀请 + 独立授权", clientTodo: "本人确认参加与分享范围", status: "待授权", priority: "P2", goalId: "FG-7701-03", link: "m3-hub", linkLabel: "打开服务邀请" },
    { id: "CASE-7701-GOV", householdId: "H-7701", title: "家族宪章与治理工作坊", module: "M3 / M4", type: "治理 / 传承", owner: "HSBC PB Family Advisory", dependencies: "家族成员时间 / 宪章草案", due: "2027-12-31", deliverable: "家族宪章草案 + 决策规则", clientTodo: "确认参加工作坊的成员", status: "等待内部", priority: "P1", goalId: "FG-7701-04", link: "m3-family", linkLabel: "打开家庭目标" },
    { id: "CASE-88421-LIQ", householdId: "H-88421", title: "Pre-IPO 质押与流动性", module: "M4", type: "融资 / 估值", owner: "Alex Chan", dependencies: "独立估值 / 委员会 / 授信", due: "2027-12-31", deliverable: "估值决议 + Term sheet", clientTodo: "提供股权文件", status: "进行中", priority: "P0", goalId: "FG-88421-01", link: "m4-valuation", linkLabel: "打开估值委员会" },
    { id: "CASE-88421-EDU", householdId: "H-88421", title: "子女教育与信托预算", module: "M4", type: "信托 / 教育", owner: "HSBC TFS", dependencies: "信托契约 / 预算 / 税务意见", due: "2028-06-30", deliverable: "信托预算 + 教育分配规则", clientTodo: "确认受益人与预算", status: "等待内部", priority: "P2", goalId: "FG-88421-02", link: "m4-trust", linkLabel: "打开信托预算" },
    { id: "CASE-2002-EDU", householdId: "H-2002", title: "两名子女教育资金", module: "M3 / M4", type: "教育", owner: "Mia Wong", dependencies: "学校录取 / 年度预算", due: "2028-09-01", deliverable: "教育资金方案", clientTodo: "确认学校与年度支出", status: "进行中", priority: "P2", goalId: "FG-2002-01", link: "m3-family", linkLabel: "打开家庭目标" }
  ],

  dictionary: [
    { term: "Lombard", en: "Lombard / securities-backed lending", definition: "以客户持有的上市股票、债券、基金作抵押的现金贷款；看抵押品、LTV、追保线。", avoid: "不要与 SLB（证券借贷）合并。" },
    { term: "SLB", en: "Securities Lending & Borrowing", definition: "借券/融券：借入或借出证券，收借券费、担保品、召回风险；不是现金贷款。", avoid: "不要把 Lombard 写成 SLB。" },
    { term: "Household", en: "Household", definition: "家庭关系与服务视图：成员、关系、目标、授权；不是法律主体。", avoid: "法律主体用 Client / Person / Legal Entity / Trust。" },
    { term: "Beneficial Owner", en: "Beneficial Owner (BO)", definition: "最终拥有或控制客户/资产的自然人；用于 KYC、CRS、受益所有权披露。", avoid: "不要与信托受益人/收款人混用。" },
    { term: "Trust Beneficiary", en: "Trust Beneficiary", definition: "信托契约下可接受分配的人/类别；不等于账户持有人或收款人。", avoid: "不要把受益人写成 Payee。" },
    { term: "Payee", en: "Payee", definition: "实际收到款项的收款人（学校、医院、房东、供应商等）。", avoid: "Payee ≠ 受益人 ≠ 纳税人。" },
    { term: "LTV", en: "Loan-to-Value", definition: "额度 ÷ 可贷值（本 demo 口径）；不是额度 ÷ 抵押市值。", avoid: "写清分母；M3 与 M4 的适用范围不同。" },
    { term: "Haircut", en: "Haircut", definition: "抵押品市值到可贷值的折扣；可贷值 = 抵押市值 × (1 − haircut)。", avoid: "不要与 LTV 混用。" },
    { term: "Lendable Value", en: "Lendable Value", definition: "银行按抵押品类型、折扣、估值日计算的可贷价值。", avoid: "不是市值，也不是授信额度。" },
    { term: "Client / Person / BP / Account", en: "Client / Person / Business Partner / Account", definition: "客户关系、自然人、法律主体/业务伙伴、账户是四个对象；一个 client_id 不能代表全部。", avoid: "不要用 client_id 代替 person_id / entity_id / account_id。" },
    { term: "Taxpayer", en: "Taxpayer", definition: "对某笔税负有申报/缴纳义务的主体；可能是个人、受托人、受益人或其他实体。", avoid: "Taxpayer ≠ Payee ≠ Beneficiary。" }
  ],

  events: [
    { id: "E-001", clientId: "C-1001", type: "解禁", date: "2026-11-15", days: 26, title: "第二批限售股解禁", detail: "约 420 万股，市值 1,860 万美元", value: 18600000, priority: 94, status: "待触达" },
    { id: "E-002", clientId: "C-1001", type: "税务", date: "2026-12-31", days: 72, title: "年度税务申报窗口", detail: "境外所得与股权激励单独计税", value: 0, priority: 81, status: "已排期" },
    { id: "E-003", clientId: "C-88421", type: "IPO", date: "2027-03-01", days: 132, title: "港股 IPO 预期窗口", detail: "Pre-IPO 架构与解禁日历待建立", value: 0, priority: 98, status: "进行中" },
    { id: "E-004", clientId: "C-2002", type: "质押", date: "2026-10-28", days: 8, title: "Lombard 额度年检", detail: "覆盖率 312%，需更新抵押品估值", value: 0, priority: 76, status: "待处理" },
    { id: "E-005", clientId: "C-7701", type: "税务", date: "2027-01-31", days: 103, title: "家办利得税与 FIHV 复核", detail: "年度申报窗口；核对 2.4 亿港元资产与实质要求", value: 0, priority: 88, status: "待排期" }
  ],

  templates: [
    { id: "FI-LADDER-01", name: "债券阶梯", cls: "固收", desc: "多腿债券锁定收益率与现金流", min: "500k", time: "T+1 / T+2", complexity: 2 },
    { id: "FD-UCITS-01", name: "UCITS 基金", cls: "基金", desc: "每日申赎、分散持仓、KFS 披露", min: "100k", time: "T+2–T+5", complexity: 2 },
    { id: "SP-NOTE-01", name: "结构性票据", cls: "结构", desc: "Autocall / 反向可转，票息增强", min: "250k", time: "T+5–T+10", complexity: 4 },
    { id: "EQ-CASH-01", name: "二级股票", cls: "股票", desc: "港股/美股/新加坡上市股票", min: "1 手", time: "T+0 / T+2", complexity: 1 },
    { id: "EQ-BLOCK-01", name: "大宗 / 询价", cls: "股票", desc: "大额减持、折价、锁定期", min: "5m", time: "3–10 日", complexity: 3 },
    { id: "FX-FWD-01", name: "外汇远期", cls: "外汇", desc: "币种对冲、期限匹配", min: "100k", time: "T+0 / 远期", complexity: 2 },
    { id: "LOMBARD-01", name: "证券质押融资", cls: "融资", desc: "不卖股拿流动性，LTV 10%–30%", min: "1m", time: "2–6 周", complexity: 3 },
    { id: "TRUST-DIST-01", name: "信托分配", cls: "信托", desc: "受益人分配/直付供应商", min: "—", time: "5–15 日", complexity: 3 },
    { id: "CASH-01", name: "现金 / 货币基金", cls: "现金", desc: "留存与流动性缓冲", min: "—", time: "T+0", complexity: 1 }
  ],

  proposals: {
    objective: "未来 24 个月需要 1,000 万美元流动性；降低单一股票集中度；税后收益优先。",
    funding: {
      source: "已上市股票减持 + 到期现金",
      payer: "陈志远（个人）",
      holder: "陈志远（个人）· HK-0091 / HK-0092",
      beneficiary: "陈志远及家庭（配偶 + 1 名子女）",
      riskBearer: "陈志远（个人）",
      decisionMaker: "陈志远",
      account: "HK-0091 / HK-0092",
      consentRef: "CONSENT-H-1001-01",
      note: "出资 ≠ 持有 ≠ 受益 ≠ 风险承担。为子女准备资金，不意味着订单属于子女账户；若受益人不是账户持有人，需单独授权与适当性记录。"
    },
    generated: false,
    options: [
      {
        id: "P-A", name: "核心债券阶梯 + 货币基金", tag: "推荐",
        thesis: "用 6 档美国国债搭建阶梯，锁定 4.3%–4.8% 到期收益率，保留 12 个月现金。",
        legs: [
          { t: "FI-LADDER-01", i: "UST 2Y / 3Y / 5Y / 7Y / 10Y / 30Y", a: "BUY", w: 38, amt: 7600000 },
          { t: "FD-UCITS-01", i: "IE00B4L5Y983", a: "SUBSCRIBE", w: 42, amt: 8400000 },
          { t: "EQ-CASH-01", i: "Gold ETC", a: "BUY", w: 8, amt: 1600000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 21, tax: 8, time: 2, impact: 3, ease: 88 },
        subs: { cost: 85, tax: 82, time: 92, impact: 88, ease: 88 },
        exp: "4.6%–5.2%", vol: "6.8%", dd: "−9.4%", liquidity: "T+7 18%",
        why: "成本最低、税后最稳；12% 现金缓冲覆盖 18 个月支出。",
        not: "美国国债的遗产税暴露；需要美国税务顾问确认。",
        change: "若客户确认长期居留美国，改用爱尔兰 UCITS 为主。",
        confidence: "高"
      },
      {
        id: "P-B", name: "全球多资产 UCITS", tag: "稳健",
        thesis: "一只基金解决分散、再平衡与报告；波动低于直接持股。",
        legs: [
          { t: "FD-UCITS-01", i: "IE00B4L5Y983", a: "SUBSCRIBE", w: 62, amt: 12400000 },
          { t: "FD-UCITS-01", i: "IE00BDBRDM35", a: "SUBSCRIBE", w: 26, amt: 5200000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 46, tax: 4, time: 3, impact: 2, ease: 96 },
        subs: { cost: 72, tax: 92, time: 84, impact: 94, ease: 96 },
        exp: "5.2%–6.0%", vol: "8.4%", dd: "−12.6%", liquidity: "T+7 22%",
        why: "可执行性最高；一只基金完成分散与再平衡。",
        not: "年费 35–45bps；底层不透明，客户可能质疑双重收费。",
        change: "若客户要求更高收入或税务优化，加入债券阶梯。",
        confidence: "高"
      },
      {
        id: "P-C", name: "收益增强（债券 + 票据）", tag: "进取",
        thesis: "用 5 年期 Autocall 把组合票息提高到 6%–7%。",
        legs: [
          { t: "FI-LADDER-01", i: "IG 债 5 档", a: "BUY", w: 50, amt: 10000000 },
          { t: "SP-NOTE-01", i: "HSBC 5Y Autocall", a: "BUY", w: 20, amt: 4000000 },
          { t: "FD-UCITS-01", i: "EM Debt UCITS", a: "SUBSCRIBE", w: 18, amt: 3600000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 68, tax: 12, time: 7, impact: 6, ease: 70 },
        subs: { cost: 48, tax: 62, time: 55, impact: 60, ease: 70 },
        exp: "6.2%–7.4%", vol: "11.8%", dd: "−18.2%", liquidity: "T+7 10%",
        why: "票息最高；适合作为卫星，不超过净值 15%。",
        not: "发行人信用、复杂性、二级市场流动性弱；不适合集中持有。",
        change: "若客户不能接受本金风险或 5 年锁定，降为 0–10%。",
        confidence: "中"
      }
    ],
    aladdinOption: {
      id: "P-ALADDIN", name: "Aladdin SAA/TAA · 债券阶梯 + 流动性", tag: "Aladdin 推荐",
      thesis: "BlackRock Aladdin 输出的 SAA/TAA：38% 美国国债阶梯、42% 全球综合债 UCITS、8% 黄金、12% 现金；与目标/约束一致。",
      legs: [
        { t: "FI-LADDER-01", i: "UST 2Y / 3Y / 5Y / 7Y / 10Y / 30Y", a: "BUY", w: 38, amt: 7600000 },
        { t: "FD-UCITS-01", i: "iShares Core Global Aggregate Bond UCITS ETF", a: "SUBSCRIBE", w: 42, amt: 8400000 },
        { t: "EQ-CASH-01", i: "iShares Physical Gold ETC", a: "BUY", w: 8, amt: 1600000 },
        { t: "CASH-01", i: "USD Cash — 1M Time Deposit (HSBC)", a: "HOLD", w: 12, amt: 2400000 }
      ],
      metrics: { cost: 21, tax: 8, time: 2, impact: 3, ease: 88 },
      subs: { cost: 85, tax: 82, time: 92, impact: 88, ease: 88 },
      exp: "4.6%–5.2%", vol: "6.8%", dd: "−9.4%", liquidity: "T+7 18%",
      why: "Aladdin 的 SAA/TAA 与目标一致：债券 80%、黄金 8%、现金 12%；单一发行人、现金下限、非美元与久期均在约束内。",
      not: "美国国债的遗产税暴露；需美国税务顾问书面意见。",
      change: "若 Aladdin 再平衡输出偏离目标 >2pp，退回 Aladdin 重跑。",
      confidence: "高", source: "Aladdin"
    }
  },

  aladdin: {
    runId: "ALADDIN-2026-10-20-0840",
    asOf: "2026-10-20 08:40 HKT",
    portfolio: "P-2026-000123",
    businessPartner: "陈志远",
    container: "HK-0091 / HK-0092",
    ips: "IPS-2026-03",
    mandate: "Balanced Growth & Liquidity",
    baseCcy: "USD",
    objective: "未来 24 个月需要 1,000 万美元流动性；降低单一股票集中度；税后收益优先。约束：权益 ≤ 50%；单一发行人 ≤ 15%；现金 ≥ 8%；非美元 ≤ 25%；组合久期 4.0–5.0 年；不允许杠杆/衍生品；美国 situs 资产需税务顾问意见。",
    constraints: [
      { id: "C-01", label: "权益 ≤ 50%" },
      { id: "C-02", label: "单一发行人 ≤ 15%" },
      { id: "C-03", label: "现金 ≥ 8%" },
      { id: "C-04", label: "非美元 ≤ 25%" },
      { id: "C-05", label: "久期 4.0–5.0 年" },
      { id: "C-06", label: "不允许杠杆 / 衍生品" }
    ],
    current: [
      { asset: "Single Stock (legacy)", w: 42 },
      { asset: "Global Equity", w: 20 },
      { asset: "Investment Grade Bonds", w: 18 },
      { asset: "Gold", w: 6 },
      { asset: "Cash", w: 14 }
    ],
    variants: {
      aligned: {
        id: "aligned",
        label: "Aladdin CSV · 一致版本",
        runId: "ALADDIN-2026-10-20-0840",
        asOf: "2026-10-20 08:40 HKT",
        status: "WARN",
        duration: 4.3,
        nonUsd: 20,
        bands: {
          "Single Stock (legacy)": [0, 0],
          "Global Equity": [0, 50],
          "Investment Grade Bonds": [30, 85],
          "Gold": [0, 10],
          "Cash": [8, 20],
          "Private Equity": [0, 15]
        },
        csv: `asset_class,sub_class,target_weight,min_weight,max_weight,benchmark,instrument,currency,duration,top_issuer,top_issuer_weight,non_usd_weight
Investment Grade Bonds,US Treasury Ladder,38,30,45,Bloomberg US Treasury,UST 2Y-30Y,USD,4.1,US Treasury,12,0
Investment Grade Bonds,Global Aggregate Bond,42,30,50,Bloomberg Global Aggregate,iShares Core Global Aggregate Bond UCITS ETF,USD,4.5,US Treasury,0,20
Gold,Physical Gold,8,0,10,LBMA Gold,iShares Physical Gold ETC,USD,0,-,0,0
Cash,USD Cash / 1M T-Bill,12,8,20,ICE BofA 1M T-Bill,USD Cash / 1M Time Deposit,USD,0.1,US Treasury,0,0
`,
        rows: [
          { asset: "Investment Grade Bonds", sub: "US Treasury Ladder", target: 38, min: 30, max: 45, benchmark: "Bloomberg US Treasury", instrument: "UST 2Y–30Y（6 档）", ccy: "USD", duration: 4.1, topIssuer: "US Treasury", topIssuerWeight: 12, nonUsd: 0 },
          { asset: "Investment Grade Bonds", sub: "Global Aggregate Bond", target: 42, min: 30, max: 50, benchmark: "Bloomberg Global Aggregate", instrument: "iShares Core Global Aggregate Bond UCITS ETF", ccy: "USD", duration: 4.5, topIssuer: "US Treasury", topIssuerWeight: 0, nonUsd: 20 },
          { asset: "Gold", sub: "Physical Gold", target: 8, min: 0, max: 10, benchmark: "LBMA Gold", instrument: "iShares Physical Gold ETC", ccy: "USD", duration: 0, topIssuer: "—", topIssuerWeight: 0, nonUsd: 0 },
          { asset: "Cash", sub: "USD Cash / 1M T-Bill", target: 12, min: 8, max: 20, benchmark: "ICE BofA 1M T-Bill", instrument: "USD Cash / 1M Time Deposit", ccy: "USD", duration: 0.1, topIssuer: "US Treasury", topIssuerWeight: 0, nonUsd: 0 }
        ],
        checks: [
          { id: "OBJ-01", name: "权益上限", rule: "权益 ≤ 50%", actual: "0%", result: "PASS", note: "Aladdin 输出与流动性 + 分散目标一致。", evidence: "ALADDIN-CSV-0840 · row 1–4" },
          { id: "CON-01", name: "单一发行人", rule: "≤ 15%", actual: "US Treasury 12%", result: "PASS", note: "最大单一发行人 12%，低于 15%。", evidence: "ALADDIN-CSV-0840 · top_issuer_weight" },
          { id: "LIQ-01", name: "最低现金", rule: "≥ 8%", actual: "12%", result: "PASS", note: "现金 12% 覆盖 T+7 流动性。", evidence: "ALADDIN-CSV-0840 · cash" },
          { id: "CCY-01", name: "非美元上限", rule: "≤ 25%", actual: "20%", result: "PASS", note: "非美元 20%，低于 25%。", evidence: "ALADDIN-CSV-0840 · non_usd_weight" },
          { id: "DUR-01", name: "久期区间", rule: "4.0–5.0 年", actual: "4.3 年", result: "PASS", note: "久期 4.3 年，在区间内。", evidence: "ALADDIN-CSV-0840 · duration" },
          { id: "TAX-01", name: "美国遗产税", rule: "需附条件", actual: "US Treasury 12%", result: "WARN", note: "美国 situs 资产；需美国税务顾问书面意见。", evidence: "R-US-002" }
        ],
        summary: "Aladdin 提案在权益、单一发行人、现金、非美元、久期约束内；美国国债 12% 触发遗产税 WARN，可作为附条件提案。"
      },
      conflict: {
        id: "conflict",
        label: "Aladdin CSV · 不一致版本",
        runId: "ALADDIN-2026-10-20-0905",
        asOf: "2026-10-20 09:05 HKT",
        status: "REJECT",
        duration: 5.8,
        nonUsd: 30,
        bands: {
          "Single Stock (legacy)": [0, 0],
          "Global Equity": [0, 50],
          "Investment Grade Bonds": [30, 85],
          "Gold": [0, 10],
          "Cash": [8, 20],
          "Private Equity": [0, 15]
        },
        csv: `asset_class,sub_class,target_weight,min_weight,max_weight,benchmark,instrument,currency,duration,top_issuer,top_issuer_weight,non_usd_weight
Global Equity,Global Equity UCITS,55,20,50,MSCI World,iShares Core MSCI World UCITS ETF,USD,0,-,0,30
Investment Grade Bonds,US Treasury Ladder,25,30,45,Bloomberg US Treasury,UST 2Y-30Y,USD,6.2,US Treasury,22,0
Gold,Physical Gold,8,0,10,LBMA Gold,iShares Physical Gold ETC,USD,0,-,0,0
Cash,USD Cash,2,8,20,ICE BofA 1M T-Bill,USD Cash,USD,0.1,US Treasury,0,0
Private Equity,PE Fund,10,0,15,Cambridge PE,HSBC Global Private Equity Fund,USD,0,-,0,0
`,
        rows: [
          { asset: "Global Equity", sub: "Global Equity UCITS", target: 55, min: 20, max: 50, benchmark: "MSCI World", instrument: "iShares Core MSCI World UCITS ETF", ccy: "USD", duration: 0, topIssuer: "—", topIssuerWeight: 0, nonUsd: 30 },
          { asset: "Investment Grade Bonds", sub: "US Treasury Ladder", target: 25, min: 30, max: 45, benchmark: "Bloomberg US Treasury", instrument: "UST 2Y–30Y", ccy: "USD", duration: 6.2, topIssuer: "US Treasury", topIssuerWeight: 22, nonUsd: 0 },
          { asset: "Gold", sub: "Physical Gold", target: 8, min: 0, max: 10, benchmark: "LBMA Gold", instrument: "iShares Physical Gold ETC", ccy: "USD", duration: 0, topIssuer: "—", topIssuerWeight: 0, nonUsd: 0 },
          { asset: "Cash", sub: "USD Cash", target: 2, min: 8, max: 20, benchmark: "ICE BofA 1M T-Bill", instrument: "USD Cash", ccy: "USD", duration: 0.1, topIssuer: "US Treasury", topIssuerWeight: 0, nonUsd: 0 },
          { asset: "Private Equity", sub: "PE Fund", target: 10, min: 0, max: 15, benchmark: "Cambridge PE", instrument: "HSBC Global Private Equity Fund", ccy: "USD", duration: 0, topIssuer: "—", topIssuerWeight: 0, nonUsd: 0 }
        ],
        checks: [
          { id: "OBJ-01", name: "权益上限", rule: "权益 ≤ 50%", actual: "55%", result: "REJECT", note: "超过目标上限 5pp；与流动性 + 分散目标不一致。", evidence: "ALADDIN-CSV-0905 · row 1" },
          { id: "CON-01", name: "单一发行人", rule: "≤ 15%", actual: "US Treasury 22%", result: "REJECT", note: "单一发行人 22%，超过 15%。", evidence: "ALADDIN-CSV-0905 · top_issuer_weight" },
          { id: "CON-02", name: "债券配置下限", rule: "30%–85%", actual: "25%", result: "REJECT", note: "债券 25%，低于 30% 下限。", evidence: "ALADDIN-CSV-0905 · row 2" },
          { id: "LIQ-01", name: "最低现金", rule: "≥ 8%", actual: "2%", result: "REJECT", note: "现金 2%，无法覆盖 T+7 流动性。", evidence: "ALADDIN-CSV-0905 · cash" },
          { id: "CCY-01", name: "非美元上限", rule: "≤ 25%", actual: "30%", result: "REJECT", note: "非美元 30%，超过 25%。", evidence: "ALADDIN-CSV-0905 · non_usd_weight" },
          { id: "DUR-01", name: "久期区间", rule: "4.0–5.0 年", actual: "5.8 年", result: "WARN", note: "久期 5.8 年，高于区间；利率上行敏感。", evidence: "ALADDIN-CSV-0905 · duration" },
          { id: "TAX-01", name: "美国遗产税", rule: "需附条件", actual: "US Treasury 22%", result: "WARN", note: "美国 situs 资产；需美国税务顾问书面意见。", evidence: "R-US-002" }
        ],
        summary: "Aladdin 提案与目标不一致：权益 55% > 50%，单一发行人 22% > 15%，债券 25% < 30%，现金 2% < 8%，非美元 30% > 25%。REJECT，不能进入执行。"
      }
    }
  },

  execution: [
    { no: 1, tpl: "FI-LADDER-01", inst: "US Treasury 4.000% 11/15/2028", isin: "CUSIP 91282CAB1（示例）", act: "BUY", qty: "16,000", amt: 1600000, w: 8, venue: "Tradeweb / HSBC OTC", type: "RFQ", limit: "99.85", timing: "T+0", cost: 3, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 2, tpl: "FI-LADDER-01", inst: "US Treasury 4.125% 11/15/2029", isin: "CUSIP 91282CAD7（示例）", act: "BUY", qty: "12,000", amt: 1200000, w: 6, venue: "Tradeweb / HSBC OTC", type: "RFQ", limit: "99.40", timing: "T+0", cost: 4, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 3, tpl: "FI-LADDER-01", inst: "US Treasury 4.250% 11/15/2031", isin: "CUSIP 91282CAF2（示例）", act: "BUY", qty: "14,000", amt: 1400000, w: 7, venue: "Tradeweb / HSBC OTC", type: "RFQ", limit: "99.62", timing: "T+0", cost: 4, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 4, tpl: "FI-LADDER-01", inst: "US Treasury 4.000% 11/15/2033", isin: "CUSIP 91282CAH8（示例）", act: "BUY", qty: "12,000", amt: 1200000, w: 6, venue: "Bloomberg RFQ", type: "RFQ", limit: "98.95", timing: "T+0", cost: 5, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 5, tpl: "FI-LADDER-01", inst: "US Treasury 4.000% 11/15/2036", isin: "CUSIP 91282CAK1（示例）", act: "BUY", qty: "12,000", amt: 1200000, w: 6, venue: "Tradeweb / HSBC OTC", type: "RFQ", limit: "98.90", timing: "T+0", cost: 5, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 6, tpl: "FI-LADDER-01", inst: "US Treasury 4.250% 11/15/2056", isin: "CUSIP 91282CAM7（示例）", act: "BUY", qty: "10,000", amt: 1000000, w: 5, venue: "HSBC OTC", type: "RFQ", limit: "97.80", timing: "T+0", cost: 6, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 7, tpl: "FD-UCITS-01", inst: "iShares Core Global Aggregate Bond UCITS ETF", isin: "IE00B4L5Y983", act: "SUBSCRIBE", qty: "600,000", amt: 6000000, w: 30, venue: "Primary / HSBC Fund Dealing", type: "SUBSCRIBE", limit: "—", timing: "T+1", cost: 45, taxLot: "Avg cost", funding: "HK-0092", status: "Ready" },
    { no: 8, tpl: "FD-UCITS-01", inst: "HSBC Global Short Duration Bond Fund", isin: "ISIN 示例（HSBC GIF）", act: "SUBSCRIBE", qty: "240,000", amt: 2400000, w: 12, venue: "Primary / HSBC Fund Dealing", type: "SUBSCRIBE", limit: "—", timing: "T+1", cost: 30, taxLot: "Avg cost", funding: "HK-0092", status: "Ready" },
    { no: 9, tpl: "EQ-CASH-01", inst: "iShares Physical Gold ETC", isin: "IE00B4ND3602", act: "BUY", qty: "44,800", amt: 1600000, w: 8, venue: "LSE / HSBC OTC", type: "LIMIT", limit: "35.72", timing: "T+0", cost: 29, taxLot: "FIFO", funding: "HK-0092", status: "Ready" },
    { no: 10, tpl: "CASH-01", inst: "USD Cash — 1M Time Deposit (HSBC)", isin: "—", act: "TIME DEPOSIT", qty: "2,400,000", amt: 2400000, w: 12, venue: "HSBC Treasury", type: "TIME DEPOSIT", limit: "—", timing: "T+0", cost: 0, taxLot: "—", funding: "HK-0092", status: "Ready" }
  ],

  checks: [
    { id: "KYC", name: "KYC / AML / 制裁", sev: "PASS", rule: "R-KYC-001", msg: "身份、受益所有人、制裁筛查均在有效期。", evidence: "KYC-2026-0912" },
    { id: "SUIT", name: "适当性匹配", sev: "PASS", rule: "R-SUIT-012", msg: "平衡型客户；产品复杂度 1–3；匹配。", evidence: "SUIT-2026-1020" },
    { id: "JUR", name: "法域 / 牌照", sev: "PASS", rule: "R-HK-003", msg: "香港专业投资者；产品均在香港可销售。", evidence: "JUR-HK-003" },
    { id: "CONC", name: "集中度", sev: "PASS", rule: "R-CONC-001", msg: "交易后单一发行人 12.4% < 15% 上限。", evidence: "CALC-CONC-091" },
    { id: "LIQ", name: "流动性", sev: "PASS", rule: "R-LIQ-001", msg: "T+7 可动用 18% > 10% 下限。", evidence: "CALC-LIQ-091" },
    { id: "TAX", name: "美国遗产税暴露", sev: "WARN", rule: "R-US-002", msg: "美国国债为美国 situs 资产；非居民免税额仅 6 万美元。", evidence: "TAX-US-2026" },
    { id: "REST", name: "限制名单", sev: "PASS", rule: "R-WALL-001", msg: "未命中投行限制/观察名单。", evidence: "WALL-2026-1019" },
    { id: "FUND", name: "资金 / 反洗钱", sev: "PASS", rule: "R-AML-004", msg: "资金来源为已上市股票减持；凭证齐全。", evidence: "AML-2026-0871" },
    { id: "DISC", name: "披露 / KFS", sev: "PASS", rule: "R-DISC-002", msg: "KFS、成本披露、风险揭示已生成 v3。", evidence: "DISC-2026-1020" },
    { id: "WALL", name: "跨墙 / MNPI", sev: "PASS", rule: "R-WALL-002", msg: "未使用投行项目信息；AI 检索日志已留痕。", evidence: "AI-LOG-2026-1020" }
  ],

  orders: [
    { id: "PO-2026-001", inst: "US Treasury 4.000% 11/15/2028", side: "BUY", qty: 16000, filled: 16000, avg: 99.86, bench: 99.85, slip: 1.0, status: "Filled", venue: "Tradeweb / HSBC OTC", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-002", inst: "US Treasury 4.125% 11/15/2029", side: "BUY", qty: 12000, filled: 12000, avg: 99.42, bench: 99.40, slip: 2.0, status: "Filled", venue: "Tradeweb / HSBC OTC", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-003", inst: "US Treasury 4.250% 11/15/2031", side: "BUY", qty: 14000, filled: 13000, avg: 99.60, bench: 99.62, slip: 2.0, status: "Partial", venue: "Tradeweb / HSBC OTC", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-004", inst: "US Treasury 4.000% 11/15/2033", side: "BUY", qty: 12000, filled: 12000, avg: 98.97, bench: 98.95, slip: 2.0, status: "Filled", venue: "Bloomberg RFQ", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-005", inst: "US Treasury 4.000% 11/15/2036", side: "BUY", qty: 12000, filled: 12000, avg: 98.92, bench: 98.90, slip: 2.0, status: "Filled", venue: "Tradeweb / HSBC OTC", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-006", inst: "US Treasury 4.250% 11/15/2056", side: "BUY", qty: 10000, filled: 10000, avg: 97.84, bench: 97.80, slip: 4.0, status: "Filled", venue: "HSBC OTC", strategy: "RFQ", settle: "T+1", ccy: "USD" },
    { id: "PO-2026-007", inst: "iShares Core Global Aggregate Bond UCITS ETF", side: "SUBSCRIBE", qty: 600000, filled: 600000, avg: 10.00, bench: 10.00, slip: 0.0, status: "Filled", venue: "Primary / HSBC Fund Dealing", strategy: "SUBSCRIBE", settle: "T+2", ccy: "USD" },
    { id: "PO-2026-008", inst: "HSBC Global Short Duration Bond Fund", side: "SUBSCRIBE", qty: 240000, filled: 240000, avg: 10.00, bench: 10.00, slip: 0.0, status: "Filled", venue: "Primary / HSBC Fund Dealing", strategy: "SUBSCRIBE", settle: "T+2", ccy: "USD" },
    { id: "PO-2026-009", inst: "iShares Physical Gold ETC", side: "BUY", qty: 44800, filled: 44800, avg: 35.74, bench: 35.72, slip: 5.6, status: "Filled", venue: "LSE / HSBC OTC", strategy: "LIMIT", settle: "T+2", ccy: "USD" },
    { id: "PO-2026-010", inst: "USD Cash — 1M Time Deposit (HSBC)", side: "TIME DEPOSIT", qty: 2400000, filled: 2400000, avg: 1.00, bench: 1.00, slip: 0.0, status: "Filled", venue: "HSBC Treasury", strategy: "TIME DEPOSIT", settle: "T+0", ccy: "USD" }
  ],

  childOrders: [
    { id: "CO-2026-001", parent: "PO-2026-001", venue: "Tradeweb RFQ", qty: 10000, filled: 10000, avg: 99.86, slip: 1.0, time: "09:31:12", status: "Filled" },
    { id: "CO-2026-002", parent: "PO-2026-001", venue: "HSBC OTC", qty: 6000, filled: 6000, avg: 99.87, slip: 1.2, time: "09:31:40", status: "Filled" },
    { id: "CO-2026-003", parent: "PO-2026-002", venue: "Tradeweb RFQ", qty: 8000, filled: 8000, avg: 99.41, slip: 1.8, time: "09:33:05", status: "Filled" },
    { id: "CO-2026-004", parent: "PO-2026-002", venue: "HSBC OTC", qty: 4000, filled: 4000, avg: 99.43, slip: 2.2, time: "09:33:31", status: "Filled" },
    { id: "CO-2026-005", parent: "PO-2026-003", venue: "Tradeweb RFQ", qty: 8000, filled: 8000, avg: 99.59, slip: 1.7, time: "09:35:10", status: "Filled" },
    { id: "CO-2026-006", parent: "PO-2026-003", venue: "HSBC OTC", qty: 6000, filled: 5000, avg: 99.62, slip: 2.4, time: "09:35:44", status: "Partial" },
    { id: "CO-2026-007", parent: "PO-2026-004", venue: "Bloomberg RFQ", qty: 12000, filled: 12000, avg: 98.97, slip: 2.0, time: "09:37:20", status: "Filled" },
    { id: "CO-2026-008", parent: "PO-2026-005", venue: "Tradeweb RFQ", qty: 7000, filled: 7000, avg: 98.91, slip: 1.8, time: "09:39:02", status: "Filled" },
    { id: "CO-2026-009", parent: "PO-2026-005", venue: "HSBC OTC", qty: 5000, filled: 5000, avg: 98.93, slip: 2.2, time: "09:39:28", status: "Filled" },
    { id: "CO-2026-010", parent: "PO-2026-006", venue: "HSBC OTC", qty: 10000, filled: 10000, avg: 97.84, slip: 4.0, time: "09:41:15", status: "Filled" },
    { id: "CO-2026-011", parent: "PO-2026-007", venue: "HSBC Fund Dealing", qty: 400000, filled: 400000, avg: 10.00, slip: 0.0, time: "10:02:00", status: "Filled" },
    { id: "CO-2026-012", parent: "PO-2026-007", venue: "HSBC Fund Dealing", qty: 200000, filled: 200000, avg: 10.00, slip: 0.0, time: "10:04:00", status: "Filled" },
    { id: "CO-2026-013", parent: "PO-2026-008", venue: "HSBC Fund Dealing", qty: 240000, filled: 240000, avg: 10.00, slip: 0.0, time: "10:06:00", status: "Filled" },
    { id: "CO-2026-014", parent: "PO-2026-009", venue: "LSE", qty: 30000, filled: 30000, avg: 35.73, slip: 3.2, time: "10:12:18", status: "Filled" },
    { id: "CO-2026-015", parent: "PO-2026-009", venue: "HSBC OTC", qty: 14800, filled: 14800, avg: 35.76, slip: 11.2, time: "10:13:02", status: "Filled" },
    { id: "CO-2026-016", parent: "PO-2026-010", venue: "HSBC Treasury", qty: 2400000, filled: 2400000, avg: 1.00, slip: 0.0, time: "10:20:00", status: "Filled" }
  ],

  tca: {
    is: 8.4, commission: 3.1, spread: 4.2, impact: 3.6, custody: 1.5,
    transactionCost: 12.4, fundOcf: 8.7, allIn: 21.1,
    cashUsed: 20000000, cashResidual: 0, settled: 15, pending: 1, failed: 0
  },

  allocation: {
    total: 20000000,
    expected: 6.4, vol: 9.2, dd: -18.5, sharpe: 0.35, yield: 3.1,
    buckets: [
      { name: "现金及货币基金", w: 8, min: 5, max: 15, color: "#98a2b3" },
      { name: "投资级债券", w: 35, min: 25, max: 45, color: "#175cd3" },
      { name: "全球股票", w: 30, min: 20, max: 40, color: "#0d9488" },
      { name: "另类资产", w: 15, min: 5, max: 20, color: "#7a5af8" },
      { name: "黄金", w: 5, min: 0, max: 10, color: "#d97706" },
      { name: "私募股权", w: 7, min: 0, max: 15, color: "#db0011" }
    ]
  },

  stress: [
    { id: "eq", name: "全球股 −30%", pnl: -13.8, dd: -15.2, t7: 21, margin: 0, note: "股票 beta 0.92；债券部分对冲" },
    { id: "rates", name: "利率 +200bp", pnl: -6.2, dd: -7.4, t7: 24, margin: 0, note: "久期 4.1；信用利差 +80bp" },
    { id: "usd", name: "美元 +10%", pnl: -3.1, dd: -3.8, t7: 22, margin: 0, note: "非美元资产折算拖累" },
    { id: "pe", name: "私募 −20% + gate", pnl: -4.6, dd: -5.5, t7: 9, margin: 0, note: "流动性 bucket 跌至 9%" },
    { id: "stag", name: "滞胀（股 −20 / 通胀 +4%）", pnl: -11.4, dd: -12.9, t7: 17, margin: 12, note: "黄金部分对冲；实际利率上行" },
    { id: "combo", name: "股 −30% + 利率 +200bp", pnl: -18.9, dd: -21.7, t7: 15, margin: 35, note: "相关性上升；保证金压力" }
  ],

  backtest: {
    years: 8.75, periodsPerYear: 4, rf: 0.032, costDrag: 0.009,
    period: "2018-01 – 2026-10",
    cagr: 6.8, vol: 5.6, sharpe: 0.65, dd: -14.2, oos: 0.51, deflated: 0.43, turnover: 28, hit: 56,
    cagrCost: 5.9, volCost: 5.6, sharpeCost: 0.48, ddCost: -15.0,
    points: [100, 103, 105, 104, 107, 110, 112, 115, 113, 109, 118, 124, 128, 132, 136, 140, 134, 128, 122, 120.1, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 167.5, 171.5, 175.2, 177.8]
  },

  financing: {
    purpose: "2027 年 3 月需支付约 1,000 万美元税负；不希望卖出股票。",
    need: 10000000, currency: "USD", needDate: "2027-03-15",
    cashflow: [
      { m: "M1", inflow: 2000000, outflow: 600000, net: 1400000, cum: 1400000 },
      { m: "M3", inflow: 0, outflow: 6000000, net: -6000000, cum: -4600000 },
      { m: "M6", inflow: 1200000, outflow: 1500000, net: -300000, cum: -4900000 },
      { m: "M9", inflow: 0, outflow: 1000000, net: -1000000, cum: -5900000 },
      { m: "M12", inflow: 1800000, outflow: 800000, net: 1000000, cum: -4900000 }
    ],
    options: [
      { name: "Lombard（证券质押融资）", amount: 10000000, cost: "6.1% / 年", tax: 0, time: "2–4 周", ltv: "上限 45%", risk: "追保", rec: true },
      { name: "卖出股票", amount: 10000000, cost: "—", tax: 1800000, time: "T+2", ltv: "—", risk: "卖在低点", rec: false },
      { name: "住宅按揭", amount: 8000000, cost: "4.2% / 年", tax: 0, time: "4–8 周", ltv: "60%", risk: "额度不足", rec: false }
    ],
    facility: { amount: 12000000, drawn: 10000000, rate: 6.1, tenor: "24 个月", collateral: 60000000, haircut: 55, lendable: 27000000, ltv: 37, coverage: 270, warning: 250, call: 200, forced: 175, valuationDate: "2026-10-18", valuationSource: "HSBC 抵押品估值服务", ltvBasis: "已用额度 ÷ 可贷值" }
  },

  vendors: [
    { id: "V-HKU", name: "香港大学 经济与科创研究中心", program: "经济趋势与科创展览 · 10 讲", quality: 95, compliance: 90, price: 85, priceAmt: 280000, score: 92, selected: true, status: "Awarded", notes: "课程主任 + 2 位客座；含参访与结业展" },
    { id: "V-HKUST", name: "香港科技大学 商学院", program: "AI 与家族企业治理 · 8 讲", quality: 88, compliance: 88, price: 78, priceAmt: 320000, score: 86, selected: false, status: "Shortlist", notes: "偏治理；缺少科创参访" },
    { id: "V-CAM", name: "Cambridge Executive Education", program: "Global Leadership for Family Business", quality: 90, compliance: 82, price: 60, priceAmt: 450000, score: 83, selected: false, status: "Shortlist", notes: "品牌强；差旅与语言成本高" },
    { id: "V-SG", name: "Singapore Management University", program: "Family Office & Impact · 6 讲", quality: 84, compliance: 86, price: 74, priceAmt: 260000, score: 82, selected: false, status: "Shortlist", notes: "东南亚视角；需新航程" }
  ],

  services: [
    { id: "S-01", cat: "二代与传承", title: "MIT Sloan · Future Family Leaders", who: "成年子女 / 二代", date: "2026-11-03 – 12-08", loc: "线上 · 6 周", provider: "HSBC PB × MIT Sloan", seats: 12, status: "邀请中", desc: "家族企业、所有者思维、家族团结、对话与未来路径。", tags: ["二代", "治理", "全球"] },
    { id: "S-02", cat: "家族治理", title: "家族治理与代际对话工作坊", who: "创始人 + 配偶 + 成年子女", date: "2026-12-05 – 12-06", loc: "香港", provider: "HSBC PB · Family Governance", seats: 8, status: "可预约", desc: "用两天把“谁决策、谁受益、如何沟通”写成家族宪章草案。", tags: ["治理", "对话", "宪章"] },
    { id: "S-03", cat: "跨境", title: "Global Family Leaders Forum · Athens", who: "创始人 + 接班人", date: "2027-05-18 – 05-20", loc: "雅典", provider: "HSBC PB", seats: 20, status: "邀请制", desc: "全球家族领袖闭门论坛：跨代、跨境、家族企业与慈善。", tags: ["全球", "圈层", "跨境"] },
    { id: "S-04", cat: "家族办公室", title: "家族办公室设立与治理", who: "家办负责人 / CFO", date: "2027-01-15", loc: "香港 / 新加坡", provider: "HSBC PB · Family Office Advisory", seats: 6, status: "可预约", desc: "家办架构、投资治理、受托与合规、成本模型。", tags: ["家办", "治理", "跨境"] },
    { id: "S-05", cat: "二代与传承", title: "下一代财富对话：配偶与子女专场", who: "配偶 + 成年子女", date: "2026-11-20", loc: "香港", provider: "HSBC PB · Family Advisory", seats: 10, status: "邀请中", desc: "分开谈，再一起谈：风险偏好、慈善、企业控制权与财富分配。", tags: ["二代", "配偶", "对话"] },
    { id: "S-06", cat: "教育", title: "英国 / 美国教育规划", who: "子女 / 孙辈", date: "滚动", loc: "香港 / 伦敦 / 波士顿", provider: "HSBC PB × 教育顾问", seats: "—", status: "可预约", desc: "寄宿学校、大学申请、监护与跨境生活安排。", tags: ["教育", "跨境", "下一代"] },
    { id: "S-07", cat: "健康养老", title: "家族健康与养老管家", who: "父母 / 长辈", date: "滚动", loc: "香港 / 大湾区", provider: "HSBC PB × 医疗/养老机构", seats: "—", status: "可预约", desc: "家庭医生、第二诊疗、居家护理、记忆照护。", tags: ["健康", "养老", "家庭"] },
    { id: "S-08", cat: "慈善", title: "慈善与影响力投资入门", who: "创始人 + 二代", date: "2027-02-10", loc: "香港", provider: "HSBC PB × 慈善顾问", seats: 15, status: "邀请中", desc: "从家族基金会到影响力投资：把价值观变成可执行的公益结构。", tags: ["慈善", "传承", "影响力"] },
    { id: "S-09", cat: "跨境", title: "跨境家庭安顿：香港 / 新加坡 / 英国", who: "配偶 / 子女", date: "滚动", loc: "香港 / 新加坡 / 伦敦", provider: "HSBC PB × 迁移/教育/医疗伙伴", seats: 6, status: "可预约", desc: "签证与居留、开户、住房、学校、医疗、家政与本地生活安排。", tags: ["跨境", "安顿", "家庭"] },
    { id: "S-10", cat: "二代与传承", title: "女性与财富：配偶专场", who: "配偶", date: "2027-01-20", loc: "香港", provider: "HSBC PB · Family Advisory", seats: 8, status: "邀请中", desc: "风险偏好、慈善、家族话语权、婚姻与继承安排。", tags: ["配偶", "财富", "传承"] }
  ],

  valuation: {
    lastRound: 30000000000, stake: 0.30, gross: 9000000000, dlom: 0.30, minority: 0.10,
    adjusted: 5670000000, haircut: 0.60, lendable: 2268000000, ltv: 0.22, facility: 500000000,
    coverage: 4.54, trigger: 0.40, votes: { approve: 4, dissent: 0 },
    valuationDate: "2026-10-18", valuationSource: "独立估值机构 + 估值委员会",
    methods: [
      { name: "最近一轮融资", value: 9000000000, weight: 50, note: "2026-06，投后 300 亿美元" },
      { name: "可比公司 EV/Sales", value: 7800000000, weight: 30, note: "12–18x；同业中位数" },
      { name: "DCF（保守）", value: 6200000000, weight: 20, note: "WACC 12%；永续 3%" }
    ]
  },

  trust: {
    type: "全权信托（Discretionary）", jurisdiction: "香港", trustee: "HSBC TFS",
    settlor: "林哲（示例）", protector: "家族顾问（独立）",
    beneficiaries: "配偶；两名子女；后代",
    reserved: "投资建议权（非约束）；意愿书",
    injection: 450000000, injectionTax: 90000000, annualTax: 0.20,
    budget: [
      { cat: "住房（租金/维护）", amt: 1800000, pay: "直付房东/物业" },
      { cat: "车辆（租赁/保险/司机）", amt: 400000, pay: "直付经销商" },
      { cat: "家政与管家", amt: 500000, pay: "直付/工资代发" },
      { cat: "旅行与酒店", amt: 700000, pay: "直付酒店/运营商" },
      { cat: "宴会与社交", amt: 400000, pay: "直付场地方" },
      { cat: "家庭照护（医疗/教育/养老）", amt: 900000, pay: "直付学校/医院" },
      { cat: "安全", amt: 300000, pay: "直付服务商" }
    ],
    taxRows: [
      { id: "D-001", item: "住房", amt: 1800000, layer: "C2 当年已税", payee: "房东 / 物业", person: "受益人/受托人", due: 0, credit: 360000, filing: "年度汇总", status: "已支付" },
      { id: "D-002", item: "车辆", amt: 400000, layer: "C2 当年已税", payee: "经销商", person: "受益人", due: 0, credit: 80000, filing: "年度汇总", status: "已支付" },
      { id: "D-003", item: "学费", amt: 900000, layer: "C2 当年已税", payee: "学校", person: "受益人", due: 0, credit: 180000, filing: "年度汇总", status: "已支付" },
      { id: "D-004", item: "宴会", amt: 400000, layer: "C2 当年已税", payee: "场地方", person: "受益人/宾客", due: 0, credit: 80000, filing: "待确认", status: "待意见" },
      { id: "D-005", item: "旅行", amt: 700000, layer: "C2 当年已税", payee: "酒店 / 运营商", person: "受益人", due: 0, credit: 140000, filing: "年度汇总", status: "已支付" }
    ],
    reserve: { min: 2400000, target: 3200000, actual: 4000000, policy: "max(契约 10%; 12M 税负; 3M 预算; 贷款缓冲; 压力)" }
  },

  trustHo: {
    type: "香港全权信托（Discretionary）", jurisdiction: "香港", trustee: "HSBC Trustee（示例）",
    settlor: "何启明（示例）", protector: "家族顾问（独立）",
    beneficiaries: "配偶；两名子女；后代",
    reserved: "投资建议权（非约束）；意愿书",
    injection: 420000000, injectionTax: 0, annualTax: 0,
    budget: [
      { cat: "住房（租金/维护）", amt: 1800000, pay: "直付房东/物业" },
      { cat: "家庭照护（医疗/教育/养老）", amt: 900000, pay: "直付学校/医院" },
      { cat: "旅行与酒店", amt: 700000, pay: "直付酒店/运营商" },
      { cat: "慈善 / 影响力", amt: 400000, pay: "直付基金会" },
      { cat: "安全", amt: 300000, pay: "直付服务商" }
    ],
    taxRows: [
      { id: "H-001", item: "住房", amt: 1800000, layer: "C2 当年已税", payee: "房东 / 物业", person: "受益人/受托人", due: 0, credit: 360000, filing: "年度汇总", status: "已支付" },
      { id: "H-002", item: "家庭照护", amt: 900000, layer: "C2 当年已税", payee: "医院 / 学校", person: "受益人", due: 0, credit: 180000, filing: "年度汇总", status: "已支付" },
      { id: "H-003", item: "旅行", amt: 700000, layer: "C2 当年已税", payee: "酒店 / 运营商", person: "受益人", due: 0, credit: 140000, filing: "年度汇总", status: "已支付" },
      { id: "H-004", item: "慈善", amt: 400000, layer: "C2 当年已税", payee: "基金会", person: "受托人", due: 0, credit: 80000, filing: "年度汇总", status: "已支付" }
    ],
    reserve: { min: 2400000, target: 3200000, actual: 4200000, policy: "max(契约 10%; 12M 税负; 3M 预算; 贷款缓冲; 压力)" }
  },

  tax: {
    caseId: "TX-2026-0088", trigger: "港股减持 + 家办利润 + 股息", amount: 200000000, ccy: "USD",
    jurisdictions: ["香港", "新加坡", "BVI"], complexity: "中高",
    target: "在不改变香港税务居民身份的前提下，利用香港家办税务优惠、持股结构与信托，降低家办利润税与交易印花税；不做虚假离岸/无实质结构。",
    profile: {
      residency: ["香港"], domicile: "香港", days: { "香港": 300, "内地": 20, "英国": 15, "新加坡": 10 },
      entities: [
        { name: "BVI Holdco", jurisdiction: "BVI", role: "持股平台", substance: "弱" },
        { name: "HK Family Office Ltd", jurisdiction: "香港", role: "家办/投资", substance: "强" },
        { name: "HK Family Trust", jurisdiction: "香港", role: "传承", substance: "强" }
      ],
      accounts: [
        { centre: "香港", bank: "HSBC", type: "托管", ccy: "HKD", value: 420000000 },
        { centre: "新加坡", bank: "HSBC", type: "现金", ccy: "USD", value: 80000000 },
        { centre: "BVI", bank: "HSBC", type: "基金账户", ccy: "USD", value: 30000000 }
      ],
      flows: [
        { type: "港股减持", amount: 180000000, year: 2026 },
        { type: "股息", amount: 20000000, year: 2026 },
        { type: "家办利润", amount: 15000000, year: 2026 },
        { type: "信托分配", amount: 10000000, year: 2026 }
      ],
      filings: ["香港利得税报税表", "CRS", "FATCA", "家族办公室年度合规"]
    },
    baseline: [
      { event: "港股减持", taxpayer: "个人", type: "资本性收益（HK 无 CGT）", base: 180000000, rate: 0, cash: 0, timing: "处置时" },
      { event: "印花税（买卖各 0.1%）", taxpayer: "买卖双方", type: "香港股票印花税", base: 180000000, rate: 0.2, cash: 360000, timing: "交易时" },
      { event: "股息", taxpayer: "个人", type: "股息（HK 无股息税）", base: 20000000, rate: 0, cash: 0, timing: "收到时" },
      { event: "家办投资利润", taxpayer: "HK Family Office Ltd", type: "利得税（未申请优惠）", base: 15000000, rate: 16.5, cash: 2475000, timing: "年度" },
      { event: "信托分配", taxpayer: "受益人", type: "信托分配（HK 无 CGT）", base: 10000000, rate: 0, cash: 0, timing: "分配时" }
    ],
    levers: [
      { id: "L1", cat: "身份/居民", name: "保持香港税务居民", impact: "中", risk: "高", flag: "假移居/虚假居民=红灯", fit: "家庭与经济重心真实在香港" },
      { id: "L2", cat: "簿记/账户", name: "香港/新加坡簿记中心", impact: "中", risk: "中", flag: "CRS 申报", fit: "多币种/多市场" },
      { id: "L3", cat: "家办/实体", name: "香港 FIHV 家办 0% 利得税", impact: "高", risk: "中", flag: "240m 资产/实质/合规", fit: "有真实家办团队与投资决策" },
      { id: "L4", cat: "交易形式", name: "股权 vs 资产；印花税", impact: "中", risk: "中", flag: "印花税 0.1%/边", fit: "港股减持/重组" },
      { id: "L5", cat: "工具", name: "基金/保险/ETF 载体", impact: "中", risk: "中", flag: "预提/复杂性", fit: "长期投资/传承" },
      { id: "L6", cat: "时点", name: "年度确认/分期/亏损收割", impact: "中", risk: "低中", flag: "反避税", fit: "年度税负波动" },
      { id: "L7", cat: "拆分", name: "多笔/多买家/多年度", impact: "中", risk: "高", flag: "无商业目的=红灯", fit: "大额退出" },
      { id: "L8", cat: "条约", name: "HK 协定/预提", impact: "中", risk: "高", flag: "导管/受益所有权", fit: "跨境持股/融资" },
      { id: "L9", cat: "信托/保险", name: "HK 信托/保险/慈善", impact: "高", risk: "高", flag: "控制权/受益所有权", fit: "传承优先" },
      { id: "L10", cat: "融资", name: "利息扣除/资本弱化", impact: "中", risk: "中高", flag: "转让定价/资本弱化", fit: "有经营杠杆" }
    ],
    scenarios: [
      { id: "BASE", name: "基线：个人持有 + 家办未申请优惠", levers: [], afterTax: 222065000, rate: 1.26, cost: 100000, risk: "低", defend: 100, score: 62, result: "PASS", note: "简单；家办利润按 16.5% 纳税" },
      { id: "A", name: "A：香港 FIHV 家办 + 持股结构", levers: ["L3", "L4", "L8"], afterTax: 223012500, rate: 0.35, cost: 1200000, risk: "中", defend: 80, score: 80, result: "CONDITIONAL", note: "FIHV 0% + 实质；需 240m 资产/合规" },
      { id: "B", name: "B：新加坡 13O/13X + 信托", levers: ["L2", "L9"], afterTax: 220250000, rate: 1.0, cost: 2500000, risk: "高", defend: 60, score: 64, result: "CONDITIONAL", note: "成本高、迁移家庭重心；未必更优" },
      { id: "C", name: "C：BVI 转让 + 避印花税", levers: ["L4", "L7"], afterTax: 221925000, rate: 1.1, cost: 600000, risk: "高", defend: 35, score: 42, result: "REJECT", note: "无实质/反避税；不建议" }
    ],
    checks: [
      { id: "GAAR", name: "HK 一般反避税（s.61A）", res: "PASS", note: "有商业目的与实质" },
      { id: "FSIE", name: "香港 FSIE 外地收入豁免", res: "WARN", note: "需经济实质/关联要求" },
      { id: "ES", name: "经济实质", res: "PASS", note: "香港家办有人员/办公/决策" },
      { id: "BO", name: "受益所有权", res: "PASS", note: "穿透至个人；CRS 一致" },
      { id: "TP", name: "转让定价", res: "N/A", note: "无关联交易" },
      { id: "7", name: "7 号公告（内地间接转让）", res: "N/A", note: "非中国税务居民；不适用" },
      { id: "21", name: "21 号公告（内地信托）", res: "N/A", note: "非中国税务居民；不适用" },
      { id: "CRS", name: "CRS/FATCA", res: "PASS", note: "账户可申报" },
      { id: "STAMP", name: "香港股票印花税", res: "WARN", note: "买卖双方各 0.1%" }
    ],
    advisor: { name: "HSBC Private Bank · Tax & Wealth Structuring（内部）", jurisdiction: "香港 / 新加坡", scope: "FIHV 家办、印花税、FSIE、信托、跨境架构", opinion: "A 方案可推进，但须满足 FIHV 2.4 亿港元资产、实质与合规要求；B 成本高且迁移家庭重心，未必更优；C 不建议。", fees: 0, costLabel: "内部成本", conflict: false, type: "in-house" }
  },

  audit: [
    { t: "09:02", who: "Alex Chan (RM)", what: "创建提案 P-2026-000123", ref: "P-2026-000123" },
    { t: "09:04", who: "AI Proposal Composer", what: "生成 3 套方案（model v3.2）", ref: "AI-2026-1020-01" },
    { t: "09:06", who: "Alex Chan (RM)", what: "选择方案 A / 锁定版本 v3", ref: "P-2026-000123" },
    { t: "09:08", who: "Compliance", what: "预审：1 个 WARN 待附条件", ref: "CHK-TAX-002" },
    { t: "09:12", who: "Client", what: "电子签署待完成", ref: "ESIGN-PENDING" }
  ]
};
