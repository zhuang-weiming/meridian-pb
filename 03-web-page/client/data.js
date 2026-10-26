/* Demo data — all names, numbers and structures are fictional / illustrative. */
const DB = {
  asOf: "2026-10-20 09:00 HKT",
  clients: [
    {
      id: "C-1001", name: "Chen Zhiyuan", short: "Mr Chen", segment: "T2 HNW", rm: "Alex Chan", householdId: "H-1001",
      booking: ["Hong Kong", "Singapore"], totalWealth: 28000000, liquid: 6200000, liabilities: 0,
      concentration: 0.42, risk: "Balanced", riskExpiry: "2026-12-31", taxResidency: "Mainland China",
      entity: "Individual + HK company", family: "Spouse + 1 child", since: "2021",
      source: "Tech founder (listed)", aum: 28000000, taxId: "CN-****-8821",
      accounts: [
        { id: "HK-0091", centre: "Hong Kong", type: "Custody", ccy: "USD", value: 18400000 },
        { id: "HK-0092", centre: "Hong Kong", type: "Cash", ccy: "USD", value: 4200000 },
        { id: "SG-0144", centre: "Singapore", type: "Custody", ccy: "USD", value: 5400000 }
      ]
    },
    {
      id: "C-88421", name: "Lin Zhe (Example)", short: "Mr Lin", segment: "T1 UHNW", rm: "Alex Chan", householdId: "H-88421",
      booking: ["Hong Kong", "Singapore"], totalWealth: 9250000000, liquid: 52000000, liabilities: 0,
      concentration: 0.96, risk: "Aggressive", riskExpiry: "2026-12-31", taxResidency: "Mainland China",
      entity: "BVI HoldCo + HK trust", family: "Spouse + 2 children", since: "2019",
      source: "Pre-IPO founder", aum: 9250000000, taxId: "CN-****-4417",
      accounts: [
        { id: "HK-8801", centre: "Hong Kong", type: "Custody", ccy: "USD", value: 42000000 },
        { id: "SG-8802", centre: "Singapore", type: "Cash", ccy: "USD", value: 10000000 }
      ]
    },
    {
      id: "C-2002", name: "Ms Wang", short: "Ms Wang", segment: "T3 Affluent", rm: "Mia Wong", householdId: "H-2002",
      booking: ["Hong Kong"], totalWealth: 12000000, liquid: 4500000, liabilities: 1200000,
      concentration: 0.18, risk: "Steady", riskExpiry: "2027-03-31", taxResidency: "Hong Kong",
      entity: "Individual", family: "Spouse + 2 children", since: "2023",
      source: "Family business dividend", aum: 12000000, taxId: "HK-****-2019",
      accounts: [
        { id: "HK-2201", centre: "Hong Kong", type: "Custody", ccy: "HKD", value: 7500000 },
        { id: "HK-2202", centre: "Hong Kong", type: "Cash", ccy: "USD", value: 4500000 }
      ]
    },
    {
      id: "C-7701", name: "He Qiming (Example)", short: "Mr He", segment: "T1 UHNW", rm: "Alex Chan", householdId: "H-7701",
      booking: ["Hong Kong", "Singapore"], totalWealth: 1200000000, liquid: 90000000, liabilities: 0,
      concentration: 0.38, risk: "Balanced", riskExpiry: "2027-06-30", taxResidency: "Hong Kong",
      entity: "BVI HoldCo + HK family office + HK trust", family: "Spouse + 2 children + mother", since: "2016",
      source: "HK-listed industrial group", aum: 1200000000, taxId: "HK-****-7701",
      familyDetail: [
        { name: "He Qiming", role: "Founder", age: 62 },
        { name: "Chen Yayi", role: "Spouse", age: 59 },
        { name: "He Junxuan", role: "Eldest son", age: 28 },
        { name: "He Yuqing", role: "Younger daughter", age: 25 },
        { name: "Li Shuzhen", role: "Mother", age: 86 }
      ],
      accounts: [
        { id: "HK-7701", centre: "Hong Kong", type: "Custody", ccy: "HKD", value: 420000000 },
        { id: "SG-7702", centre: "Singapore", type: "Cash", ccy: "USD", value: 80000000 },
        { id: "BVI-7703", centre: "BVI", type: "Fund account", ccy: "USD", value: 30000000 }
      ]
    }
  ],

  households: [
    { id: "H-1001", name: "Chen family", primaryClientId: "C-1001", rm: "Alex Chan", booking: ["Hong Kong", "Singapore"], reportingCurrency: "USD", consentRef: "CONSENT-H-1001-01", note: "Cross-border working family; education goals for a minor child." },
    { id: "H-7701", name: "He family", primaryClientId: "C-7701", rm: "Alex Chan", booking: ["Hong Kong", "Singapore"], reportingCurrency: "HKD", consentRef: "CONSENT-H-7701-01", note: "Three generations: founder, spouse, two adult children and the mother." },
    { id: "H-88421", name: "Lin family", primaryClientId: "C-88421", rm: "Alex Chan", booking: ["Hong Kong", "Singapore"], reportingCurrency: "USD", consentRef: "CONSENT-H-88421-01", note: "Pre-IPO founder; spouse and two minor children." },
    { id: "H-2002", name: "Wang family", primaryClientId: "C-2002", rm: "Mia Wong", booking: ["Hong Kong"], reportingCurrency: "HKD", consentRef: "CONSENT-H-2002-01", note: "Hong Kong family; two children." }
  ],

  persons: [
    { id: "P-1001-01", householdId: "H-1001", name: "Chen Zhiyuan", role: "Primary client", age: 42, isClient: true, clientId: "C-1001", residency: "Mainland China", serviceMarket: "Hong Kong / Singapore", accountHolder: true, authorization: "Self" },
    { id: "P-1001-02", householdId: "H-1001", name: "Zhou Min", role: "Spouse", age: 40, isClient: false, residency: "Mainland China", serviceMarket: "Hong Kong", accountHolder: true, authorization: "Family authorisation" },
    { id: "P-1001-03", householdId: "H-1001", name: "Chen Yutong", role: "Daughter (minor)", age: 12, isClient: false, residency: "Mainland China", serviceMarket: "Hong Kong / United Kingdom", accountHolder: false, authorization: "Guardian authorisation" },
    { id: "P-7701-01", householdId: "H-7701", name: "He Qiming", role: "Founder & primary client", age: 62, isClient: true, clientId: "C-7701", residency: "Hong Kong", serviceMarket: "Hong Kong / Singapore", accountHolder: true, authorization: "Self" },
    { id: "P-7701-02", householdId: "H-7701", name: "Chen Yayi", role: "Spouse", age: 59, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong", accountHolder: true, authorization: "Family authorisation" },
    { id: "P-7701-03", householdId: "H-7701", name: "He Junxuan", role: "Elder son (adult)", age: 28, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong / Singapore", accountHolder: false, authorization: "Pending self-confirmation" },
    { id: "P-7701-04", householdId: "H-7701", name: "He Yuqing", role: "Second daughter (adult)", age: 25, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong / Singapore", accountHolder: false, authorization: "Pending self-confirmation" },
    { id: "P-7701-05", householdId: "H-7701", name: "Li Shuzhen", role: "Mother", age: 86, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong", accountHolder: false, authorization: "Family authorisation" },
    { id: "P-88421-01", householdId: "H-88421", name: "Lin Zhe", role: "Founder & primary client", age: 47, isClient: true, clientId: "C-88421", residency: "Mainland China", serviceMarket: "Hong Kong / Singapore", accountHolder: true, authorization: "Self" },
    { id: "P-88421-02", householdId: "H-88421", name: "Ye Qing", role: "Spouse", age: 45, isClient: false, residency: "Mainland China", serviceMarket: "Hong Kong", accountHolder: true, authorization: "Family authorisation" },
    { id: "P-88421-03", householdId: "H-88421", name: "Lin Yi", role: "Son (minor)", age: 14, isClient: false, residency: "Mainland China", serviceMarket: "Hong Kong / United Kingdom", accountHolder: false, authorization: "Guardian authorisation" },
    { id: "P-88421-04", householdId: "H-88421", name: "Lin Yue", role: "Daughter (minor)", age: 11, isClient: false, residency: "Mainland China", serviceMarket: "Hong Kong / United Kingdom", accountHolder: false, authorization: "Guardian authorisation" },
    { id: "P-2002-01", householdId: "H-2002", name: "Ms Wang", role: "Primary client", age: 46, isClient: true, clientId: "C-2002", residency: "Hong Kong", serviceMarket: "Hong Kong", accountHolder: true, authorization: "Self" },
    { id: "P-2002-02", householdId: "H-2002", name: "Mr Lee", role: "Spouse", age: 48, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong", accountHolder: true, authorization: "Family authorisation" },
    { id: "P-2002-03", householdId: "H-2002", name: "Lee Kai", role: "Son (minor)", age: 15, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong / United Kingdom", accountHolder: false, authorization: "Guardian authorisation" },
    { id: "P-2002-04", householdId: "H-2002", name: "Lee Man", role: "Daughter (minor)", age: 10, isClient: false, residency: "Hong Kong", serviceMarket: "Hong Kong", accountHolder: false, authorization: "Guardian authorisation" }
  ],

  relationships: [
    { id: "R-1001-01", householdId: "H-1001", from: "P-1001-01", to: "P-1001-02", type: "Spouse", effectiveFrom: "2012-05-20", effectiveTo: null, verified: "Verified", evidence: "Marriage certificate (archived)", consent: "Family authorisation" },
    { id: "R-1001-02", householdId: "H-1001", from: "P-1001-01", to: "P-1001-03", type: "Father–daughter (minor)", effectiveFrom: "2014-03-08", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" },
    { id: "R-1001-03", householdId: "H-1001", from: "P-1001-02", to: "P-1001-03", type: "Mother–daughter (minor)", effectiveFrom: "2014-03-08", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" },
    { id: "R-7701-01", householdId: "H-7701", from: "P-7701-01", to: "P-7701-02", type: "Spouse", effectiveFrom: "1993-11-06", effectiveTo: null, verified: "Verified", evidence: "Marriage certificate (archived)", consent: "Family authorisation" },
    { id: "R-7701-02", householdId: "H-7701", from: "P-7701-01", to: "P-7701-03", type: "Father–son (adult)", effectiveFrom: "1998-04-12", effectiveTo: null, verified: "Verified", evidence: "Birth certificate", consent: "Pending self-confirmation" },
    { id: "R-7701-03", householdId: "H-7701", from: "P-7701-01", to: "P-7701-04", type: "Father–daughter (adult)", effectiveFrom: "2001-09-23", effectiveTo: null, verified: "Verified", evidence: "Birth certificate", consent: "Pending self-confirmation" },
    { id: "R-7701-04", householdId: "H-7701", from: "P-7701-01", to: "P-7701-05", type: "Mother–son", effectiveFrom: "1940-02-15", effectiveTo: null, verified: "Verified", evidence: "Birth certificate (historical record)", consent: "Family authorisation" },
    { id: "R-88421-01", householdId: "H-88421", from: "P-88421-01", to: "P-88421-02", type: "Spouse", effectiveFrom: "2008-10-01", effectiveTo: null, verified: "Verified", evidence: "Marriage certificate (archived)", consent: "Family authorisation" },
    { id: "R-88421-02", householdId: "H-88421", from: "P-88421-01", to: "P-88421-03", type: "Father–son (minor)", effectiveFrom: "2012-06-18", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" },
    { id: "R-88421-03", householdId: "H-88421", from: "P-88421-01", to: "P-88421-04", type: "Father–daughter (minor)", effectiveFrom: "2015-02-11", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" },
    { id: "R-2002-01", householdId: "H-2002", from: "P-2002-01", to: "P-2002-02", type: "Spouse", effectiveFrom: "2004-12-12", effectiveTo: null, verified: "Verified", evidence: "Marriage certificate (archived)", consent: "Family authorisation" },
    { id: "R-2002-02", householdId: "H-2002", from: "P-2002-01", to: "P-2002-03", type: "Mother–son (minor)", effectiveFrom: "2011-08-30", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" },
    { id: "R-2002-03", householdId: "H-2002", from: "P-2002-01", to: "P-2002-04", type: "Mother–daughter (minor)", effectiveFrom: "2016-05-04", effectiveTo: null, verified: "Verified", evidence: "Birth certificate + guardianship", consent: "Guardian authorisation" }
  ],

  consents: [
    { id: "CONSENT-H-1001-01", householdId: "H-1001", personId: "P-1001-01", purpose: "Education planning for minor children", scope: "Education goals, spend plan, school applications; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0210" },
    { id: "CONSENT-H-1001-02", householdId: "H-1001", personId: "P-1001-02", purpose: "Family information sharing", scope: "Family goals and education spend; no investment details", status: "Granted", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0211" },
    { id: "CONSENT-H-1001-03", householdId: "H-1001", personId: "P-1001-03", purpose: "Education planning (by guardian)", scope: "Education goals, school applications; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-02-10", expiresAt: "2027-02-09", evidenceRef: "CONSENT-2026-0212" },
    { id: "CONSENT-H-7701-01", householdId: "H-7701", personId: "P-7701-01", purpose: "Family service & information sharing", scope: "Self + spouse + dependent members", status: "Granted", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0115" },
    { id: "CONSENT-H-7701-02", householdId: "H-7701", personId: "P-7701-03", purpose: "Service invitations & feedback sharing", scope: "Invitations only; feedback needs separate confirmation", status: "Pending self confirmation", grantedAt: null, expiresAt: null, evidenceRef: "—" },
    { id: "CONSENT-H-7701-03", householdId: "H-7701", personId: "P-7701-04", purpose: "Education / service invitations", scope: "Invitations only; assets and investments not shared", status: "Pending self confirmation", grantedAt: null, expiresAt: null, evidenceRef: "—" },
    { id: "CONSENT-H-7701-04", householdId: "H-7701", personId: "P-7701-05", purpose: "Health & later-life services", scope: "Health / later-life matters; no asset information", status: "Granted (family)", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0116" },
    { id: "CONSENT-H-7701-05", householdId: "H-7701", personId: "P-7701-02", purpose: "Family information sharing", scope: "Family goals and service invitations; no investment details", status: "Granted (family)", grantedAt: "2026-01-15", expiresAt: "2027-01-14", evidenceRef: "CONSENT-2026-0117" },
    { id: "CONSENT-H-88421-01", householdId: "H-88421", personId: "P-88421-01", purpose: "Family service & legacy", scope: "Self + spouse + minor children", status: "Granted", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0301" },
    { id: "CONSENT-H-88421-02", householdId: "H-88421", personId: "P-88421-03", purpose: "Education planning (by guardian)", scope: "Education goals, school applications; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0302" },
    { id: "CONSENT-H-88421-03", householdId: "H-88421", personId: "P-88421-04", purpose: "Education planning (by guardian)", scope: "Education goals, school applications; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0303" },
    { id: "CONSENT-H-88421-04", householdId: "H-88421", personId: "P-88421-02", purpose: "Family information sharing", scope: "Family goals and service invitations; no investment details", status: "Granted (family)", grantedAt: "2026-03-01", expiresAt: "2027-02-28", evidenceRef: "CONSENT-2026-0304" },
    { id: "CONSENT-H-2002-01", householdId: "H-2002", personId: "P-2002-01", purpose: "Education planning for minor children", scope: "Education goals and spend; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0412" },
    { id: "CONSENT-H-2002-02", householdId: "H-2002", personId: "P-2002-03", purpose: "Education planning (by guardian)", scope: "Education goals and spend; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0413" },
    { id: "CONSENT-H-2002-03", householdId: "H-2002", personId: "P-2002-04", purpose: "Education planning (by guardian)", scope: "Education goals and spend; no investment accounts", status: "Granted (guardian)", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0414" },
    { id: "CONSENT-H-2002-04", householdId: "H-2002", personId: "P-2002-02", purpose: "Family information sharing", scope: "Family goals and service invitations; no investment details", status: "Granted (family)", grantedAt: "2026-04-12", expiresAt: "2027-04-11", evidenceRef: "CONSENT-2026-0415" }
  ],

  familyGoals: [
    { id: "FG-1001-01", householdId: "H-1001", title: "Daughter's UK / Hong Kong education funding", category: "Education", ownerPersonId: "P-1001-01", beneficiaryPersonIds: ["P-1001-03"], fundingPartyIds: ["P-1001-01"], decisionMakerId: "P-1001-01", decisionMaker: "Chen Zhiyuan + spouse", targetAmount: 1500000, currency: "USD", targetDate: "2030-09-01", priority: "High", flexibility: "Medium", visibilityScope: "Parents + RM", fundingCommitmentStatus: "No dedicated account", status: "Pending confirmation", gap: "No education account yet; annual spend not fixed", caseId: "CASE-1001-EDU" },
    { id: "FG-7701-01", householdId: "H-7701", title: "March 2027 tax-bill liquidity", category: "Liquidity / tax", ownerPersonId: "P-7701-01", beneficiaryPersonIds: ["P-7701-01", "P-7701-02", "P-7701-03", "P-7701-04", "P-7701-05"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-01", decisionMaker: "He Qiming", targetAmount: 10000000, currency: "USD", targetDate: "2027-03-15", priority: "High", flexibility: "Low", visibilityScope: "Immediate family", fundingCommitmentStatus: "Arranged 80%", status: "In progress", gap: "≈US$2m short; relies on pledge / selective selling", caseId: "CASE-7701-LIQ" },
    { id: "FG-7701-02", householdId: "H-7701", title: "He Yuqing education funding", category: "Education", ownerPersonId: "P-7701-04", beneficiaryPersonIds: ["P-7701-04"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-04", decisionMaker: "He Yuqing herself", targetAmount: 1200000, currency: "USD", targetDate: "2028-09-01", priority: "Medium", flexibility: "Medium", visibilityScope: "Self + funder", fundingCommitmentStatus: "Intended", status: "Pending self confirmation", gap: "Self authorisation and education account not yet set", caseId: "CASE-7701-EDU" },
    { id: "FG-7701-03", householdId: "H-7701", title: "He Junxuan: independent participation in wealth management", category: "Adult children independence", ownerPersonId: "P-7701-03", beneficiaryPersonIds: ["P-7701-03"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-03", decisionMaker: "He Junxuan himself", targetAmount: 5000000, currency: "USD", targetDate: "2027-06-30", priority: "Medium", flexibility: "High", visibilityScope: "Self + funder", fundingCommitmentStatus: "Not committed", status: "Pending authorisation", gap: "Self consent and authorisation missing; parents cannot decide for him", caseId: "CASE-7701-NEXT" },
    { id: "FG-7701-04", householdId: "H-7701", title: "Family governance & legacy", category: "Legacy", ownerPersonId: "P-7701-01", beneficiaryPersonIds: ["P-7701-01", "P-7701-02", "P-7701-03", "P-7701-04", "P-7701-05"], fundingPartyIds: ["P-7701-01"], decisionMakerId: "P-7701-01", decisionMaker: "He Qiming + family council", targetAmount: null, currency: "HKD", targetDate: "2027-12-31", priority: "High", flexibility: "Low", visibilityScope: "Family members", fundingCommitmentStatus: "In progress", status: "In progress", gap: "Family charter and decision rules to be agreed", caseId: "CASE-7701-GOV" },
    { id: "FG-88421-01", householdId: "H-88421", title: "Pre-IPO liquidity & concentration", category: "Liquidity", ownerPersonId: "P-88421-01", beneficiaryPersonIds: ["P-88421-01", "P-88421-02", "P-88421-03", "P-88421-04"], fundingPartyIds: ["P-88421-01"], decisionMakerId: "P-88421-01", decisionMaker: "Lin Zhe", targetAmount: 500000000, currency: "USD", targetDate: "2028-03-31", priority: "High", flexibility: "Low", visibilityScope: "Immediate family", fundingCommitmentStatus: "Not arranged", status: "In progress", gap: "Valuation / lock-up / facility not yet set", caseId: "CASE-88421-LIQ" },
    { id: "FG-88421-02", householdId: "H-88421", title: "Children's education & trust budget", category: "Education / legacy", ownerPersonId: "P-88421-01", beneficiaryPersonIds: ["P-88421-03", "P-88421-04"], fundingPartyIds: ["P-88421-01"], decisionMakerId: "P-88421-01", decisionMaker: "Lin Zhe + spouse", targetAmount: 2000000, currency: "USD", targetDate: "2032-09-01", priority: "Medium", flexibility: "Medium", visibilityScope: "Parents + trustee", fundingCommitmentStatus: "Not arranged", status: "Pending confirmation", gap: "Trust / education account not set", caseId: "CASE-88421-EDU" },
    { id: "FG-2002-01", householdId: "H-2002", title: "Education funding for two children", category: "Education", ownerPersonId: "P-2002-01", beneficiaryPersonIds: ["P-2002-03", "P-2002-04"], fundingPartyIds: ["P-2002-01", "P-2002-02"], decisionMakerId: "P-2002-01", decisionMaker: "Ms Wang + spouse", targetAmount: 800000, currency: "USD", targetDate: "2031-09-01", priority: "Medium", flexibility: "Medium", visibilityScope: "Parents + RM", fundingCommitmentStatus: "No dedicated account", status: "Pending confirmation", gap: "Education account and annual budget not set", caseId: "CASE-2002-EDU" }
  ],

  cases: [
    { id: "CASE-1001-EDU", householdId: "H-1001", title: "Education account & annual budget for the daughter", module: "M3 / M4", type: "Education / authorisation", owner: "Alex Chan", dependencies: "Guardian authorisation / school offer / annual budget", due: "2027-06-30", deliverable: "Education account + annual budget plan", clientTodo: "Confirm school and annual spend", status: "In progress", priority: "P1", goalId: "FG-1001-01", link: "m3-family", linkLabel: "Open family goals" },
    { id: "CASE-7701-LIQ", householdId: "H-7701", title: "March 2027 tax-bill liquidity", module: "M3", type: "Financing", owner: "Alex Chan", dependencies: "Collateral valuation / credit pre-check / tax calculation", due: "2027-02-15", deliverable: "Term sheet + credit approval", clientTodo: "Confirm collateral and authorisations", status: "In progress", priority: "P0", goalId: "FG-7701-01", link: "m3-financing", linkLabel: "Open financing cockpit" },
    { id: "CASE-7701-TAX", householdId: "H-7701", title: "Family-office (FIHV) & stamp-duty review", module: "M5", type: "Tax", owner: "HSBC PB Tax", dependencies: "Tax profile / substance documents / anti-avoidance", due: "2027-01-31", deliverable: "Internal tax memorandum + data-pack checklist (for external advisers)", clientTodo: "Complete Hong Kong substance documents", status: "Awaiting client", priority: "P1", goalId: "FG-7701-01", link: "m5-intake", linkLabel: "Open tax case" },
    { id: "CASE-7701-EDU", householdId: "H-7701", title: "He Yuqing education funding & authorisation", module: "M3 / M4", type: "Education / authorisation", owner: "Alex Chan", dependencies: "Self consent / funder confirmation / dedicated account", due: "2027-03-31", deliverable: "Education funding plan + authorisation record", clientTodo: "He Yuqing to confirm in person", status: "Awaiting client", priority: "P2", goalId: "FG-7701-02", link: "m3-family", linkLabel: "Open family goals" },
    { id: "CASE-7701-NEXT", householdId: "H-7701", title: "He Junxuan independent account & next-gen programme", module: "M3", type: "Service / authorisation", owner: "Alex Chan", dependencies: "Self consent / suitability / programme seats", due: "2027-05-01", deliverable: "Invitation + independent authorisation", clientTodo: "Confirm participation and sharing scope", status: "Pending authorisation", priority: "P2", goalId: "FG-7701-03", link: "m3-hub", linkLabel: "Open service invitations" },
    { id: "CASE-7701-GOV", householdId: "H-7701", title: "Family charter & governance workshop", module: "M3 / M4", type: "Governance / legacy", owner: "HSBC PB Family Advisory", dependencies: "Family members' time / charter draft", due: "2027-12-31", deliverable: "Family charter draft + decision rules", clientTodo: "Confirm workshop participants", status: "Awaiting internal", priority: "P1", goalId: "FG-7701-04", link: "m3-family", linkLabel: "Open family goals" },
    { id: "CASE-88421-LIQ", householdId: "H-88421", title: "Pre-IPO pledge & liquidity", module: "M4", type: "Financing / valuation", owner: "Alex Chan", dependencies: "Independent valuation / committee / credit", due: "2027-12-31", deliverable: "Valuation resolution + term sheet", clientTodo: "Provide share documents", status: "In progress", priority: "P0", goalId: "FG-88421-01", link: "m4-valuation", linkLabel: "Open valuation committee" },
    { id: "CASE-88421-EDU", householdId: "H-88421", title: "Children's education & trust budget", module: "M4", type: "Trust / education", owner: "HSBC TFS", dependencies: "Trust deed / budget / tax opinion", due: "2028-06-30", deliverable: "Trust budget + education distribution rules", clientTodo: "Confirm beneficiaries and budget", status: "Awaiting internal", priority: "P2", goalId: "FG-88421-02", link: "m4-trust", linkLabel: "Open trust budget" },
    { id: "CASE-2002-EDU", householdId: "H-2002", title: "Education funding for two children", module: "M3 / M4", type: "Education", owner: "Mia Wong", dependencies: "School offer / annual budget", due: "2028-09-01", deliverable: "Education funding plan", clientTodo: "Confirm school and annual spend", status: "In progress", priority: "P2", goalId: "FG-2002-01", link: "m3-family", linkLabel: "Open family goals" }
  ],

  dictionary: [
    { term: "Lombard", definition: "Cash lending against listed equities, bonds and funds held by the client; the test is collateral, LTV and margin-call lines.", avoid: "Do not merge with SLB (securities lending & borrowing)." },
    { term: "SLB", definition: "Securities lending & borrowing: borrowing or lending securities for a fee, with collateral and recall risk; not a cash loan.", avoid: "Do not write Lombard as SLB." },
    { term: "Household", definition: "A family relationship and service view: members, relationships, goals, authorisations; not a legal entity.", avoid: "Legal entities remain Client / Person / Legal Entity / Trust." },
    { term: "Beneficial Owner", definition: "The natural person who ultimately owns or controls a client or asset; used for KYC, CRS and ownership disclosure.", avoid: "Do not confuse with trust beneficiary or payee." },
    { term: "Trust Beneficiary", definition: "A person or class entitled to distributions under the trust deed; not the same as account holder or payee.", avoid: "Do not write beneficiaries as payees." },
    { term: "Payee", definition: "The party actually receiving a payment (school, hospital, landlord, vendor).", avoid: "Payee ≠ beneficiary ≠ taxpayer." },
    { term: "LTV", definition: "Facility ÷ lendable value (this demo's basis); not facility ÷ market value.", avoid: "State the denominator; M3 and M4 scopes differ." },
    { term: "Haircut", definition: "The discount from collateral market value to lendable value: lendable = market × (1 − haircut).", avoid: "Do not mix with LTV." },
    { term: "Lendable Value", definition: "The value the bank will lend against, per collateral type, discounts and valuation date.", avoid: "Not market value, not facility amount." },
    { term: "Client / Person / BP / Account", definition: "Client relationship, natural person, legal entity / business partner and account are four objects; one client_id cannot stand for all.", avoid: "Do not use client_id in place of person_id / entity_id / account_id." },
    { term: "Taxpayer", definition: "The party with a duty to file or pay a given tax; could be a person, trustee, beneficiary or entity.", avoid: "Taxpayer ≠ payee ≠ beneficiary." }
  ],

  events: [
    { id: "E-001", clientId: "C-1001", type: "Lock-up", date: "2026-11-15", days: 26, title: "Second lock-up tranche expiry", detail: "About 4.2m shares, USD 18.6m market value", value: 18600000, priority: 94, status: "Not Contacted" },
    { id: "E-002", clientId: "C-1001", type: "Tax", date: "2026-12-31", days: 72, title: "Annual tax filing window", detail: "Overseas income and equity incentives taxed separately", value: 0, priority: 81, status: "Scheduled" },
    { id: "E-003", clientId: "C-88421", type: "IPO", date: "2027-03-01", days: 132, title: "Expected HK IPO window", detail: "Pre-IPO structuring and lock-up calendar to be built", value: 0, priority: 98, status: "In Progress" },
    { id: "E-004", clientId: "C-2002", type: "Pledge", date: "2026-10-28", days: 8, title: "Lombard facility annual review", detail: "Coverage 312%; collateral valuations need updating", value: 0, priority: 76, status: "To Do" },
    { id: "E-005", clientId: "C-7701", type: "Tax", date: "2027-01-31", days: 103, title: "Family-office profits tax and FIHV review", detail: "Annual filing window; verify HKD 240m asset test and substance requirements", value: 0, priority: 88, status: "Scheduled" }
  ],

  templates: [
    { id: "FI-LADDER-01", name: "Bond Ladder", cls: "Fixed Income", desc: "Multi-leg bonds locking in yield and cash flow", min: "500k", time: "T+1 / T+2", complexity: 2 },
    { id: "FD-UCITS-01", name: "UCITS Fund", cls: "Fund", desc: "Daily dealing, diversified holdings, KFS disclosure", min: "100k", time: "T+2–T+5", complexity: 2 },
    { id: "SP-NOTE-01", name: "Structured Note", cls: "Structured", desc: "Autocall / reverse convertible, enhanced coupon", min: "250k", time: "T+5–T+10", complexity: 4 },
    { id: "EQ-CASH-01", name: "Secondary Equity", cls: "Equity", desc: "HK / US / SG listed shares", min: "1 lot", time: "T+0 / T+2", complexity: 1 },
    { id: "EQ-BLOCK-01", name: "Block Trade / Inquiry", cls: "Equity", desc: "Large sell-down, discount, lock-up", min: "5m", time: "3–10 days", complexity: 3 },
    { id: "FX-FWD-01", name: "FX Forward", cls: "FX", desc: "Currency hedge, maturity matching", min: "100k", time: "T+0 / forward", complexity: 2 },
    { id: "LOMBARD-01", name: "Securities-backed lending", cls: "Financing", desc: "Liquidity without selling shares, LTV 10%–30%", min: "1m", time: "2–6 weeks", complexity: 3 },
    { id: "TRUST-DIST-01", name: "Trust Distribution", cls: "Trust", desc: "Beneficiary distribution / direct vendor payment", min: "—", time: "5–15 days", complexity: 3 },
    { id: "CASH-01", name: "Cash / Money Market", cls: "Cash", desc: "Reserves and liquidity buffer", min: "—", time: "T+0", complexity: 1 }
  ],

  proposals: {
    objective: "Needs USD 10m of liquidity over the next 24 months; reduce single-stock concentration; after-tax return first.",
    generated: false,
    options: [
      {
        id: "P-A", name: "Core Bond Ladder + Money Market", tag: "Recommended",
        thesis: "Six investment-grade bond tranches locking 4.3%–4.8% yield to maturity, with 12 months of cash retained.",
        legs: [
          { t: "FI-LADDER-01", i: "UST 2Y / 5Y / 10Y", a: "BUY", w: 38, amt: 7600000 },
          { t: "FD-UCITS-01", i: "IE00B4L5Y983", a: "SUBSCRIBE", w: 42, amt: 8400000 },
          { t: "EQ-CASH-01", i: "Gold ETC", a: "BUY", w: 8, amt: 1600000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 21, tax: 8, time: 2, impact: 3, ease: 88 },
        subs: { cost: 85, tax: 82, time: 92, impact: 88, ease: 88 },
        exp: "4.6%–5.2%", vol: "6.8%", dd: "−9.4%", liquidity: "T+7 18%",
        why: "Lowest cost and most stable after tax; 12% cash buffer covers 18 months of spending.",
        not: "Estate-tax exposure on US Treasuries; requires US tax adviser confirmation.",
        change: "If the client confirms long-term US residence, switch to Irish UCITS as the core holding.",
        confidence: "High"
      },
      {
        id: "P-B", name: "Global Multi-Asset UCITS", tag: "Steady",
        thesis: "One fund solves diversification, rebalancing and reporting; lower volatility than direct holdings.",
        legs: [
          { t: "FD-UCITS-01", i: "IE00B4L5Y983", a: "SUBSCRIBE", w: 62, amt: 12400000 },
          { t: "FD-UCITS-01", i: "IE00BDBRDM35", a: "SUBSCRIBE", w: 26, amt: 5200000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 46, tax: 4, time: 3, impact: 2, ease: 96 },
        subs: { cost: 72, tax: 92, time: 84, impact: 94, ease: 96 },
        exp: "5.2%–6.0%", vol: "8.4%", dd: "−12.6%", liquidity: "T+7 22%",
        why: "Most executable; a single fund handles diversification and rebalancing.",
        not: "35–45bps OCF; underlying holdings opaque, clients may question double charging.",
        change: "If the client wants more income or tax optimisation, add the bond ladder.",
        confidence: "High"
      },
      {
        id: "P-C", name: "Yield Enhancement (Bonds + Notes)", tag: "Aggressive",
        thesis: "Use 5-year autocalls to lift portfolio coupon to 6%–7%.",
        legs: [
          { t: "FI-LADDER-01", i: "5-tranche IG bonds", a: "BUY", w: 50, amt: 10000000 },
          { t: "SP-NOTE-01", i: "HSBC 5Y Autocall", a: "BUY", w: 20, amt: 4000000 },
          { t: "FD-UCITS-01", i: "EM Debt UCITS", a: "SUBSCRIBE", w: 18, amt: 3600000 },
          { t: "—", i: "USD Cash", a: "HOLD", w: 12, amt: 2400000 }
        ],
        metrics: { cost: 68, tax: 12, time: 7, impact: 6, ease: 70 },
        subs: { cost: 48, tax: 62, time: 55, impact: 60, ease: 70 },
        exp: "6.2%–7.4%", vol: "11.8%", dd: "−18.2%", liquidity: "T+7 10%",
        why: "Highest coupon; suitable as a satellite, capped at 15% of portfolio value.",
        not: "Issuer credit, complexity and weak secondary liquidity; not suitable for a concentrated position.",
        change: "If the client cannot accept principal risk or a 5-year lock-up, cut to 0–10%.",
        confidence: "Medium"
      }
    ]
  },

  execution: [
    { no: 1, tpl: "FI-LADDER-01", inst: "UST 2Y 4.00% 2028", isin: "US912828Z123", act: "BUY", qty: "30,000", amt: 3000000, w: 15, venue: "OTC", type: "LIMIT", limit: "99.85", timing: "T+0", cost: 3, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 2, tpl: "FI-LADDER-01", inst: "UST 5Y 4.25% 2031", isin: "US91282CJL45", act: "BUY", qty: "28,000", amt: 3000000, w: 15, venue: "OTC", type: "LIMIT", limit: "99.62", timing: "T+0", cost: 4, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 3, tpl: "FI-LADDER-01", inst: "UST 10Y 4.00% 2036", isin: "US912810TM12", act: "BUY", qty: "16,000", amt: 1600000, w: 8, venue: "OTC", type: "LIMIT", limit: "98.90", timing: "T+0", cost: 5, taxLot: "New", funding: "HK-0091", status: "Ready" },
    { no: 4, tpl: "FD-UCITS-01", inst: "iShares Core Global Aggregate Bond", isin: "IE00B4L5Y983", act: "SUBSCRIBE", qty: "86,000", amt: 8400000, w: 42, venue: "Primary", type: "ISSUE", limit: "—", timing: "T+1", cost: 42, taxLot: "Avg cost", funding: "HK-0092", status: "Ready" },
    { no: 5, tpl: "EQ-CASH-01", inst: "iShares Physical Gold ETC", isin: "IE00B4ND3602", act: "BUY", qty: "45,000", amt: 1600000, w: 8, venue: "LSE", type: "LIMIT", limit: "35.72", timing: "T+0", cost: 25, taxLot: "FIFO", funding: "HK-0092", status: "Ready" },
    { no: 6, tpl: "CASH-01", inst: "USD Cash", isin: "—", act: "HOLD", qty: "—", amt: 2400000, w: 12, venue: "—", type: "—", limit: "—", timing: "T+0", cost: 0, taxLot: "—", funding: "HK-0092", status: "Ready" }
  ],

  checks: [
    { id: "KYC", name: "KYC / AML / Sanctions", sev: "PASS", rule: "R-KYC-001", msg: "Identity, beneficial ownership and sanctions screening all in date.", evidence: "KYC-2026-0912" },
    { id: "SUIT", name: "Suitability Match", sev: "PASS", rule: "R-SUIT-012", msg: "Balanced client; product complexity 1–3; matched.", evidence: "SUIT-2026-1020" },
    { id: "JUR", name: "Jurisdiction / Licence", sev: "PASS", rule: "R-HK-003", msg: "HK professional investor; all products sellable in Hong Kong.", evidence: "JUR-HK-003" },
    { id: "CONC", name: "Concentration", sev: "PASS", rule: "R-CONC-001", msg: "Post-trade single issuer 12.4% < 15% cap.", evidence: "CALC-CONC-091" },
    { id: "LIQ", name: "Liquidity", sev: "PASS", rule: "R-LIQ-001", msg: "T+7 available 18% > 10% floor.", evidence: "CALC-LIQ-091" },
    { id: "TAX", name: "US estate tax exposure", sev: "WARN", rule: "R-US-002", msg: "US Treasuries are US situs assets; the non-resident exemption is only USD 60k.", evidence: "TAX-US-2026" },
    { id: "REST", name: "Restricted List", sev: "PASS", rule: "R-WALL-001", msg: "No hit on the banking restricted/watch list.", evidence: "WALL-2026-1019" },
    { id: "FUND", name: "Funding / AML", sev: "PASS", rule: "R-AML-004", msg: "Source of funds is a listed-share sell-down; documentation complete.", evidence: "AML-2026-0871" },
    { id: "DISC", name: "Disclosure / KFS", sev: "PASS", rule: "R-DISC-002", msg: "KFS, cost disclosure and risk warnings generated at v3.", evidence: "DISC-2026-1020" },
    { id: "WALL", name: "Chinese Wall / MNPI", sev: "PASS", rule: "R-WALL-002", msg: "No banking project information used; AI retrieval log retained.", evidence: "AI-LOG-2026-1020" }
  ],

  orders: [
    { id: "PO-2026-001", inst: "UST 2Y 4.00% 2028", side: "BUY", qty: 30000, filled: 30000, avg: 99.86, bench: 99.85, slip: 1.0, status: "Filled" },
    { id: "PO-2026-002", inst: "UST 5Y 4.25% 2031", side: "BUY", qty: 28000, filled: 28000, avg: 99.60, bench: 99.62, slip: 2.0, status: "Filled" },
    { id: "PO-2026-003", inst: "UST 10Y 4.00% 2036", side: "BUY", qty: 16000, filled: 9600, avg: 98.92, bench: 98.90, slip: 2.0, status: "Partial" },
    { id: "PO-2026-004", inst: "Global Aggregate Bond UCITS", side: "SUBSCRIBE", qty: 86000, filled: 86000, avg: 100.00, bench: 100.00, slip: 0.0, status: "Filled" },
    { id: "PO-2026-005", inst: "Physical Gold ETC", side: "BUY", qty: 45000, filled: 45000, avg: 35.74, bench: 35.72, slip: 5.6, status: "Filled" }
  ],

  allocation: {
    total: 20000000,
    expected: 6.4, vol: 9.2, dd: -18.5, sharpe: 0.58, yield: 3.1,
    buckets: [
      { name: "Cash & Money Market", w: 8, min: 5, max: 15, color: "#98a2b3" },
      { name: "Investment Grade Bonds", w: 35, min: 25, max: 45, color: "#175cd3" },
      { name: "Global Equity", w: 30, min: 20, max: 40, color: "#0d9488" },
      { name: "Alternatives", w: 15, min: 5, max: 20, color: "#7a5af8" },
      { name: "Gold", w: 5, min: 0, max: 10, color: "#d97706" },
      { name: "Private Equity", w: 7, min: 0, max: 15, color: "#db0011" }
    ]
  },

  stress: [
    { id: "eq", name: "Global equity −30%", pnl: -13.8, dd: -15.2, t7: 21, margin: 0, note: "Equity beta 0.92; bonds partially offset" },
    { id: "rates", name: "Rates +200bp", pnl: -6.2, dd: -7.4, t7: 24, margin: 0, note: "Duration 4.1; credit spread +80bp" },
    { id: "usd", name: "USD +10%", pnl: -3.1, dd: -3.8, t7: 22, margin: 0, note: "Translation drag on non-USD assets" },
    { id: "pe", name: "PE −20% + gate", pnl: -4.6, dd: -5.5, t7: 9, margin: 0, note: "Liquidity bucket falls to 9%" },
    { id: "stag", name: "Stagflation (equity −20 / inflation +4%)", pnl: -11.4, dd: -12.9, t7: 17, margin: 12, note: "Gold partially offsets; real rates rise" },
    { id: "combo", name: "Equity −30% + rates +200bp", pnl: -18.9, dd: -21.7, t7: 15, margin: 35, note: "Correlations rise; margin pressure" }
  ],

  backtest: {
    cagr: 6.8, vol: 8.9, sharpe: 0.65, dd: -14.2, oos: 0.51, deflated: 0.43, turnover: 28, hit: 56,
    cagrCost: 5.9, sharpeCost: 0.55,
    points: [100, 102, 101, 104, 106, 105, 109, 112, 111, 115, 118, 117, 121, 124, 123, 128, 131, 130, 135, 139, 138, 143, 147, 146, 151, 155, 154, 160, 164, 163, 169]
  },

  financing: {
    purpose: "Needs to pay roughly USD 10m of tax in March 2027; does not want to sell shares.",
    need: 10000000, currency: "USD", needDate: "2027-03-15",
    cashflow: [
      { m: "M1", inflow: 2000000, outflow: 600000, net: 1400000, cum: 1400000 },
      { m: "M3", inflow: 0, outflow: 6000000, net: -6000000, cum: -4600000 },
      { m: "M6", inflow: 1200000, outflow: 1500000, net: -300000, cum: -4900000 },
      { m: "M9", inflow: 0, outflow: 1000000, net: -1000000, cum: -5900000 },
      { m: "M12", inflow: 1800000, outflow: 800000, net: 1000000, cum: -4900000 }
    ],
    options: [
      { name: "Lombard / SLB", amount: 10000000, cost: "6.1% p.a.", tax: 0, time: "2–4 weeks", ltv: "Cap 45%", risk: "Margin call", rec: true },
      { name: "Sell shares", amount: 10000000, cost: "—", tax: 1800000, time: "T+2", ltv: "—", risk: "Sell at the low", rec: false },
      { name: "Residential mortgage", amount: 8000000, cost: "4.2% p.a.", tax: 0, time: "4–8 weeks", ltv: "60%", risk: "Facility too small", rec: false }
    ],
    facility: { amount: 12000000, drawn: 10000000, rate: 6.1, tenor: "24 months", collateral: 60000000, haircut: 55, lendable: 27000000, ltv: 37, coverage: 270, warning: 250, call: 200, forced: 175 }
  },

  vendors: [
    { id: "V-HKU", name: "HKU Economics & Innovation Research Centre", program: "Economic Trends & Innovation Exhibition · 10 lectures", quality: 95, compliance: 90, price: 85, priceAmt: 280000, score: 92, selected: true, status: "Awarded", notes: "Course director + 2 guest speakers; site visits and closing exhibition" },
    { id: "V-HKUST", name: "HKUST Business School", program: "AI & Family Business Governance · 8 lectures", quality: 88, compliance: 88, price: 78, priceAmt: 320000, score: 86, selected: false, status: "Shortlist", notes: "Governance-heavy; lacks innovation site visits" },
    { id: "V-CAM", name: "Cambridge Executive Education", program: "Global Leadership for Family Business", quality: 90, compliance: 82, price: 60, priceAmt: 450000, score: 83, selected: false, status: "Shortlist", notes: "Strong brand; high travel and language cost" },
    { id: "V-SG", name: "Singapore Management University", program: "Family Office & Impact · 6 lectures", quality: 84, compliance: 86, price: 74, priceAmt: 260000, score: 82, selected: false, status: "Shortlist", notes: "Southeast Asia lens; requires fresh flights" }
  ],

  services: [
    { id: "S-01", cat: "Next Gen & Legacy", title: "MIT Sloan · Future Family Leaders", who: "Adult children / next generation", date: "2026-11-03 – 12-08", loc: "Online · 6 weeks", provider: "HSBC PB × MIT Sloan", seats: 12, status: "Invited", desc: "Family business, owner mindset, family cohesion, dialogue and future path.", tags: ["Next Gen", "Governance", "Global"] },
    { id: "S-02", cat: "Family Governance", title: "Family Governance & Intergenerational Dialogue Workshop", who: "Founder + spouse + adult children", date: "2026-12-05 – 12-06", loc: "Hong Kong", provider: "HSBC PB · Family Governance", seats: 8, status: "Bookable", desc: "Two days to turn “who decides, who benefits, how we talk” into a draft family charter.", tags: ["Governance", "Dialogue", "Charter"] },
    { id: "S-03", cat: "Cross-border", title: "Global Family Leaders Forum · Athens", who: "Founder + successor", date: "2027-05-18 – 05-20", loc: "Athens", provider: "HSBC PB", seats: 20, status: "By invitation", desc: "Closed-door global family leaders forum: cross-generational, cross-border, family business and philanthropy.", tags: ["Global", "Circle", "Cross-border"] },
    { id: "S-04", cat: "Family Office", title: "Family Office Setup & Governance", who: "Family office lead / CFO", date: "2027-01-15", loc: "Hong Kong / Singapore", provider: "HSBC PB · Family Office Advisory", seats: 6, status: "Bookable", desc: "Family office structure, investment governance, trustee and compliance, cost model.", tags: ["Family Office", "Governance", "Cross-border"] },
    { id: "S-05", cat: "Next Gen & Legacy", title: "Next-Gen Wealth Dialogue: Spouse & Children Session", who: "Spouse + adult children", date: "2026-11-20", loc: "Hong Kong", provider: "HSBC PB · Family Advisory", seats: 10, status: "Invited", desc: "Separate conversations, then a joint one: risk appetite, philanthropy, business control and wealth distribution.", tags: ["Next Gen", "Spouse", "Dialogue"] },
    { id: "S-06", cat: "Education", title: "UK / US Education Planning", who: "Children / grandchildren", date: "Rolling", loc: "Hong Kong / London / Boston", provider: "HSBC PB × Education Adviser", seats: "—", status: "Bookable", desc: "Boarding schools, university applications, guardianship and cross-border living arrangements.", tags: ["Education", "Cross-border", "Next Gen"] },
    { id: "S-07", cat: "Health & Eldercare", title: "Family Health & Eldercare Concierge", who: "Parents / elders", date: "Rolling", loc: "Hong Kong / Greater Bay Area", provider: "HSBC PB × Medical / Eldercare Partners", seats: "—", status: "Bookable", desc: "Family doctor, second opinion, home care and memory care.", tags: ["Health", "Eldercare", "Family"] },
    { id: "S-08", cat: "Philanthropy", title: "Introduction to Philanthropy & Impact Investing", who: "Founder + next generation", date: "2027-02-10", loc: "Hong Kong", provider: "HSBC PB × Philanthropy Adviser", seats: 15, status: "Invited", desc: "From family foundation to impact investing: turn values into an executable philanthropic structure.", tags: ["Philanthropy", "Legacy", "Impact"] },
    { id: "S-09", cat: "Cross-border", title: "Cross-border Family Relocation: Hong Kong / Singapore / UK", who: "Spouse / children", date: "Rolling", loc: "Hong Kong / Singapore / London", provider: "HSBC PB × Relocation / Education / Medical Partners", seats: 6, status: "Bookable", desc: "Visas and residence, account opening, housing, schools, healthcare, domestic help and settling in.", tags: ["Cross-border", "Relocation", "Family"] },
    { id: "S-10", cat: "Next Gen & Legacy", title: "Women & Wealth: Spouse Session", who: "Spouse", date: "2027-01-20", loc: "Hong Kong", provider: "HSBC PB · Family Advisory", seats: 8, status: "Invited", desc: "Risk appetite, philanthropy, family voice, marriage and inheritance planning.", tags: ["Spouse", "Wealth", "Legacy"] }
  ],

  valuation: {
    lastRound: 30000000000, stake: 0.30, gross: 9000000000, dlom: 0.30, minority: 0.10,
    adjusted: 5670000000, haircut: 0.60, lendable: 2268000000, ltv: 0.22, facility: 500000000,
    coverage: 4.54, trigger: 0.40, votes: { approve: 4, dissent: 0 },
    methods: [
      { name: "Latest funding round", value: 9000000000, weight: 50, note: "Illustrative: USD 30bn post-money" },
      { name: "Comparable EV/Sales", value: 7800000000, weight: 30, note: "12–18x; peer median" },
      { name: "DCF (conservative)", value: 6200000000, weight: 20, note: "WACC 12%; 3% terminal growth" }
    ]
  },

  trust: {
    type: "Discretionary Trust", jurisdiction: "Hong Kong", trustee: "HSBC TFS",
    settlor: "Lin Zhe (Example)", protector: "Independent family adviser",
    beneficiaries: "Spouse; two children; descendants",
    reserved: "Non-binding investment advice; letter of wishes",
    injection: 450000000, injectionTax: 90000000, annualTax: 0.20,
    budget: [
      { cat: "Housing (rent / maintenance)", amt: 1800000, pay: "Direct to landlord / property manager" },
      { cat: "Vehicles (lease / insurance / driver)", amt: 400000, pay: "Direct to dealer" },
      { cat: "Housekeeping & staff", amt: 500000, pay: "Direct / payroll" },
      { cat: "Travel & hotels", amt: 700000, pay: "Direct to hotel / operator" },
      { cat: "Events & entertaining", amt: 400000, pay: "Direct to venue" },
      { cat: "Family care (medical / education / eldercare)", amt: 900000, pay: "Direct to school / hospital" },
      { cat: "Security", amt: 300000, pay: "Direct to service provider" }
    ],
    taxRows: [
      { id: "D-001", item: "Housing", amt: 1800000, layer: "C2 Taxed in year", person: "Beneficiary / trustee", due: 0, credit: 360000, filing: "Annual return", status: "Paid" },
      { id: "D-002", item: "Vehicles", amt: 400000, layer: "C2 Taxed in year", person: "Beneficiary", due: 0, credit: 80000, filing: "Annual return", status: "Paid" },
      { id: "D-003", item: "School fees", amt: 900000, layer: "C2 Taxed in year", person: "Beneficiary", due: 0, credit: 180000, filing: "Annual return", status: "Paid" },
      { id: "D-004", item: "Events", amt: 400000, layer: "C2 Taxed in year", person: "Beneficiary / guests", due: 0, credit: 80000, filing: "To confirm", status: "Advice pending" },
      { id: "D-005", item: "Travel", amt: 700000, layer: "C2 Taxed in year", person: "Beneficiary", due: 0, credit: 140000, filing: "Annual return", status: "Paid" }
    ],
    reserve: { min: 2400000, target: 3200000, actual: 4000000, policy: "max(contract 10%; 12M tax; 3M budget; loan buffer; stress)" }
  },

  trustHo: {
    type: "HK Discretionary Trust", jurisdiction: "Hong Kong", trustee: "HSBC Trustee (Example)",
    settlor: "He Qiming (Example)", protector: "Independent family adviser",
    beneficiaries: "Spouse; two children; descendants",
    reserved: "Non-binding investment advice; letter of wishes",
    injection: 420000000, injectionTax: 0, annualTax: 0,
    budget: [
      { cat: "Housing (rent / maintenance)", amt: 1800000, pay: "Direct to landlord / property manager" },
      { cat: "Family care (medical / education / eldercare)", amt: 900000, pay: "Direct to school / hospital" },
      { cat: "Travel & hotels", amt: 700000, pay: "Direct to hotel / operator" },
      { cat: "Philanthropy / Impact", amt: 400000, pay: "Direct to foundation" },
      { cat: "Security", amt: 300000, pay: "Direct to service provider" }
    ],
    taxRows: [
      { id: "H-001", item: "Housing", amt: 1800000, layer: "C2 Taxed in year", person: "Beneficiary / trustee", due: 0, credit: 360000, filing: "Annual return", status: "Paid" },
      { id: "H-002", item: "Family care", amt: 900000, layer: "C2 Taxed in year", person: "Beneficiary", due: 0, credit: 180000, filing: "Annual return", status: "Paid" },
      { id: "H-003", item: "Travel", amt: 700000, layer: "C2 Taxed in year", person: "Beneficiary", due: 0, credit: 140000, filing: "Annual return", status: "Paid" },
      { id: "H-004", item: "Philanthropy", amt: 400000, layer: "C2 Taxed in year", person: "Trustee", due: 0, credit: 80000, filing: "Annual return", status: "Paid" }
    ],
    reserve: { min: 2400000, target: 3200000, actual: 4200000, policy: "max(contract 10%; 12M tax; 3M budget; loan buffer; stress)" }
  },

  tax: {
    caseId: "TX-2026-0088", trigger: "HK share sale + family-office profit + dividend", amount: 200000000, ccy: "USD",
    jurisdictions: ["Hong Kong", "Singapore", "BVI"], complexity: "Med-High",
    target: "Without changing the client's Hong Kong tax residency, use the Hong Kong family-office concession, holding structure and trust to reduce family-office profits tax and transaction stamp duty; no artificial offshore or substance-free structures.",
    profile: {
      residency: ["Hong Kong"], domicile: "Hong Kong", days: { "Hong Kong": 300, "Mainland China": 20, "UK": 15, "Singapore": 10 },
      entities: [
        { name: "BVI HoldCo", jurisdiction: "BVI", role: "Holding platform", substance: "Weak" },
        { name: "HK Family Office Ltd", jurisdiction: "Hong Kong", role: "Family office / investment", substance: "Strong" },
        { name: "HK Family Trust", jurisdiction: "Hong Kong", role: "Legacy", substance: "Strong" }
      ],
      accounts: [
        { centre: "Hong Kong", bank: "HSBC", type: "Custody", ccy: "HKD", value: 420000000 },
        { centre: "Singapore", bank: "HSBC", type: "Cash", ccy: "USD", value: 80000000 },
        { centre: "BVI", bank: "HSBC", type: "Fund account", ccy: "USD", value: 30000000 }
      ],
      flows: [
        { type: "HK share sale", amount: 180000000, year: 2026 },
        { type: "Dividend", amount: 20000000, year: 2026 },
        { type: "Family-office profit", amount: 15000000, year: 2026 },
        { type: "Trust distribution", amount: 10000000, year: 2026 }
      ],
      filings: ["HK profits tax return", "CRS", "FATCA", "Family office annual compliance"]
    },
    baseline: [
      { event: "HK share sale", taxpayer: "Individual", type: "Capital gain (no CGT in HK)", base: 180000000, rate: 0, cash: 0, timing: "On disposal" },
      { event: "Stamp duty (0.1% each side)", taxpayer: "Buyer & seller", type: "HK Stamp Duty", base: 180000000, rate: 0.2, cash: 360000, timing: "On trade" },
      { event: "Dividend", taxpayer: "Individual", type: "Dividend (no dividend tax in HK)", base: 20000000, rate: 0, cash: 0, timing: "On receipt" },
      { event: "Family-office investment profit", taxpayer: "HK Family Office Ltd", type: "Profits tax (no concession applied)", base: 15000000, rate: 16.5, cash: 2475000, timing: "Annually" },
      { event: "Trust distribution", taxpayer: "Beneficiary", type: "Trust distribution (no CGT in HK)", base: 10000000, rate: 0, cash: 0, timing: "On distribution" }
    ],
    levers: [
      { id: "L1", cat: "Residency", name: "Maintain Hong Kong tax residency", impact: "Medium", risk: "High", flag: "Sham relocation / sham residency = red flag", fit: "Family and economic centre of gravity genuinely in Hong Kong" },
      { id: "L2", cat: "Bookings / accounts", name: "Hong Kong / Singapore booking centre", impact: "Medium", risk: "Medium", flag: "CRS reporting", fit: "Multi-currency / multi-market" },
      { id: "L3", cat: "Family office / entity", name: "HK FIHV family office 0% profits tax", impact: "High", risk: "Medium", flag: "HKD 240m asset test / substance / compliance", fit: "Genuine family-office team and investment decisions" },
      { id: "L4", cat: "Deal form", name: "Shares vs assets; stamp duty", impact: "Medium", risk: "Medium", flag: "Stamp duty 0.1% per side", fit: "HK share sale / restructuring" },
      { id: "L5", cat: "Instruments", name: "Fund / insurance / ETF vehicle", impact: "Medium", risk: "Medium", flag: "Withholding / complexity", fit: "Long-term investing / legacy" },
      { id: "L6", cat: "Timing", name: "Annual recognition / instalments / loss harvesting", impact: "Medium", risk: "Low-Med", flag: "Anti-avoidance", fit: "Annual tax volatility" },
      { id: "L7", cat: "Splitting", name: "Multiple trades / buyers / years", impact: "Medium", risk: "High", flag: "No commercial purpose = red flag", fit: "Large exit" },
      { id: "L8", cat: "Treaties", name: "HK treaty / withholding", impact: "Medium", risk: "High", flag: "Conduit / beneficial ownership", fit: "Cross-border holding / financing" },
      { id: "L9", cat: "Trust / insurance", name: "HK trust / insurance / philanthropy", impact: "High", risk: "High", flag: "Control / beneficial ownership", fit: "Legacy first" },
      { id: "L10", cat: "Financing", name: "Interest deductibility / capital weakness", impact: "Medium", risk: "Med-High", flag: "Transfer pricing / capital weakness", fit: "Has operating leverage" }
    ],
    scenarios: [
      { id: "BASE", name: "Baseline: personal holding, family office concession not applied", levers: [], afterTax: 222065000, rate: 1.26, cost: 100000, risk: "Low", defend: 100, score: 62, result: "PASS", note: "Simple; family-office profit taxed at 16.5%" },
      { id: "A", name: "A: HK FIHV family office + holding structure", levers: ["L3", "L4", "L8"], afterTax: 223012500, rate: 0.35, cost: 1200000, risk: "Medium", defend: 80, score: 80, result: "CONDITIONAL", note: "FIHV 0% + substance; HKD 240m asset test and compliance required" },
      { id: "B", name: "B: Singapore 13O/13X + trust", levers: ["L2", "L9"], afterTax: 220250000, rate: 1.0, cost: 2500000, risk: "High", defend: 60, score: 64, result: "CONDITIONAL", note: "Costly, moves the family's centre of gravity; may not be better" },
      { id: "C", name: "C: BVI transfer to avoid stamp duty", levers: ["L4", "L7"], afterTax: 221925000, rate: 1.1, cost: 600000, risk: "High", defend: 35, score: 42, result: "REJECT", note: "No substance / anti-avoidance; not recommended" }
    ],
    checks: [
      { id: "GAAR", name: "HK general anti-avoidance (s.61A)", res: "PASS", note: "Commercial purpose and substance present" },
      { id: "FSIE", name: "HK FSIE foreign-sourced income exemption", res: "WARN", note: "Economic substance / associated-entity requirements apply" },
      { id: "ES", name: "Economic substance", res: "PASS", note: "HK family office has staff, premises and decision-making" },
      { id: "BO", name: "Beneficial ownership", res: "PASS", note: "Looked through to the individual; consistent with CRS" },
      { id: "TP", name: "Transfer pricing", res: "N/A", note: "No related-party transactions" },
      { id: "7", name: "Announcement 7 (Mainland indirect transfers)", res: "N/A", note: "Not a Mainland China tax resident; not applicable" },
      { id: "21", name: "Announcement 21 (Mainland trusts)", res: "N/A", note: "Not a Mainland China tax resident; not applicable" },
      { id: "CRS", name: "CRS/FATCA", res: "PASS", note: "Account reportable" },
      { id: "STAMP", name: "HK share stamp duty", res: "WARN", note: "0.1% each side" }
    ],
    advisor: { name: "HSBC Private Bank · Tax & Wealth Structuring (Internal)", jurisdiction: "Hong Kong / Singapore", scope: "FIHV family office, stamp duty, FSIE, trusts, cross-border structuring", opinion: "Option A can proceed, subject to the FIHV HKD 240m asset test plus substance and compliance; Option B is costly and moves the family's centre of gravity and may not be better; Option C is not recommended.", fees: 0, costLabel: "Internal cost", conflict: false, type: "in-house" }
  },

  taxGuide: {
    canSay: [
      "You are a Hong Kong tax resident; these are your account and income facts.",
      "This income is classified as dividend, interest or capital gain; withholding is X.",
      "CRS/FATCA is account reporting, not a personal tax return.",
      "This is a data pack; please ask your accountant to confirm.",
      "This needs a tax adviser or lawyer; I can refer you.",
      "This is the tax authority/accountant deadline and owner."
    ],
    cannotSay: [
      "This structure means you pay no tax.",
      "You should set up the trust in the Cayman Islands.",
      "Once CRS is filed, you do not need to file.",
      "I guarantee there is no tax risk.",
      "All my clients do this.",
      "The bank can file and sign for you."
    ],
    questions: [
      { q: "Tax residence", hint: "Where did you live in the last 12 months? Days? Citizenship/permanent residence? Multiple homes?", state: "Known" },
      { q: "Entities", hint: "Companies/trusts/funds/insurance/family office? Who controls/benefits?", state: "Confirm" },
      { q: "Income", hint: "Salary/dividends/interest/rent/royalties/equity/private distributions/trust distributions?", state: "Partial" },
      { q: "Assets", hint: "Accounts/holdings/property/private shares/collectibles/offshore? Cost/valuation date?", state: "Confirm" },
      { q: "Cross-border", hint: "Relocation/emigration/property/sale/inheritance in the next 24 months?", state: "Unknown" },
      { q: "Filings", hint: "Who files? Which forms? Prior non-filing/penalties/CRS/FATCA queries?", state: "Adviser" }
    ],
    packs: [
      { id: "ID", name: "Identity pack", desc: "Residence/TIN/address/days/indicia", owner: "Client confirm" },
      { id: "INC", name: "Income pack", desc: "Interest/dividends/capital gains/rent/royalties/private distributions", owner: "Bank data" },
      { id: "COST", name: "Cost pack", desc: "Tax lots / cost basis / corporate actions / FX", owner: "Bank data" },
      { id: "WH", name: "Withholding pack", desc: "1042-S / 1099 / local withholding / treaty", owner: "Bank" },
      { id: "CRS", name: "CRS/FATCA pack", desc: "Classification / controlling person / reporting", owner: "Compliance" },
      { id: "OFF", name: "Off-bank pack", desc: "Client income/assets elsewhere", owner: "Client/adviser" }
    ],
    scenarios: [
      { name: "UK→HK", know: "UK statutory residence / split-year; HK territorial; CRS", flag: "Dual residence/double tax/exit tax" },
      { name: "US person", know: "FATCA / W-8/W-9 / 1042-S / 1099; US estate tax", flag: "Non-filing/renunciation/trusts" },
      { name: "CRS/FATCA", know: "Account classification/controlling person/reporting; not a personal return", flag: "Inconsistent classification/missing controller" },
      { name: "Trust", know: "A trust is not tax-free; beneficiaries/controller/distributions", flag: "Reserved powers/sham trust/Announcement 21" },
      { name: "Private/Pre-IPO", know: "Valuation/cost/pledge/exit tax", flag: "No valuation/no cost/cross-border pledge" },
      { name: "Property", know: "Stamp duty/rent/capital gains/estate tax", flag: "Multiple entities/cross-border" },
      { name: "Historic non-filing", know: "Penalties / remediation / voluntary disclosure", flag: "Do not promise 'no issue'" }
    ],
    referral: [
      "RM identifies need → client consent",
      "Select 2–3 approved panel firms",
      "Send data pack/question list (minimum fields only)",
      "Client signs directly with partner (or HSBC coordinates)",
      "Delivery → feedback/quality score"
    ]
  },

  taxPartners: [
    { id: "TP-A", name: "Panel A · International Tax", jurisdictions: "HK / SG / UK / CH", services: "Cross-border personal tax, CRS/FATCA, remediation", languages: "EN/CN", fee: "Hourly/fixed", sla: "1 business day", status: "approved", note: "No access to other clients/holdings" },
    { id: "TP-B", name: "Panel B · HK/UK Personal Tax", jurisdictions: "HK / UK", services: "Personal returns, residence/split-year, property/rent", languages: "EN/CN", fee: "Fixed/hourly", sla: "1–2 business days", status: "approved", note: "Client signs directly" },
    { id: "TP-C", name: "Panel C · Trust/Private Asset Tax", jurisdictions: "HK / SG / BVI / Cayman", services: "Trusts/beneficiaries, private/Pre-IPO, distribution tax", languages: "EN/CN", fee: "Project", sla: "2 business days", status: "conditional", note: "HSBC internal review/disclosure required" }
  ],

  journeyBlueprints: {
    j2: {
      id: "J2", name: "Founder wealth event", priority: "P0",
      who: "Founder/entrepreneur; concentrated equity; Pre-IPO/exit/capital calls",
      trigger: "Funding round, IPO, lock-up, sale, secondary, capital call",
      job: "Turn paper wealth into spendable/pledgeable/inheritable family wealth without losing control",
      outcome: "Liquidity, after-tax diversification, control, trust/family office, next generation",
      stages: [
        { name: "Wealth map", what: "Paper/pledgeable/spendable; concentration/obligations" },
        { name: "Valuation & structure", what: "Valuation governance, LTV/haircut, pledge/trust/tax" },
        { name: "Liquidity", what: "Lombard/private pledge/capital call/forward/secondary" },
        { name: "Tax & legacy", what: "Tax pack, trust/estate, cross-border" },
        { name: "FO/reinvestment", what: "Family office, IPS, next gen, philanthropy" }
      ],
      moments: ["Funding round", "Pre-IPO/lock-up", "IPO/unlock", "Sale/secondary", "Capital call", "Trust/FO"],
      objects: ["PrivateAsset", "Valuation", "Pledge", "CreditFacility", "Obligation", "TaxPack", "Trust"],
      metrics: ["3-day decision pack", "Valuation review", "Pledge registration", "Margin call accuracy", "After-tax wealth", "FO penetration"],
      boundary: ["No IPO price promise", "No insider trading", "Paper value ≠ market value", "Unregistered pledge is not enforceable", "No legal/tax/valuation advice"],
      cases: ["Liang Wenfeng", "Zhou Qunfei", "Li Xiting", "Guy Singh-Watson", "Sarah Wood", "Neame"],
      peers: ["Citi Private Capital", "HSBC Access/Innovation Banking", "UBS financing"],
      links: [
        { label: "Founder 360", page: "m4-founder" },
        { label: "Valuation Committee", page: "m4-valuation" },
        { label: "Pledge vs Sell", page: "m4-pledge" },
        { label: "Trust/budget", page: "m4-trust" },
        { label: "Financing cockpit", page: "m3-financing" }
      ]
    },
    j3: {
      id: "J3", name: "Creator/media/sports", priority: "P1",
      who: "Creators, artists, athletes, media/fashion/retail entrepreneurs",
      trigger: "Contract, tour, book, brand, retirement/transition",
      job: "Manage IP/royalties/short income windows; turn today's income into a 30-year balance sheet",
      outcome: "Smoother income, IP protection, tax/insurance/investment, transition, legacy",
      stages: [
        { name: "Career/IP inventory", what: "Income streams, copyright/trademark/image rights, contracts" },
        { name: "Income map", what: "Multi-source/currency/jurisdiction/withholding" },
        { name: "Cashflow/protection", what: "Reserve, insurance, budget, debt" },
        { name: "Diversification", what: "Portfolio, property, private assets, trust, philanthropy" },
        { name: "Transition/legacy", what: "Venture/investment/philanthropy, next gen, estate" }
      ],
      moments: ["Contract/renewal", "Peak income", "Income interruption", "IP monetisation", "Transition", "Family/legacy"],
      objects: ["IPAsset", "RoyaltyStream", "Contract", "ImageRight", "IncomeStream", "Policy", "Trust"],
      metrics: ["Income volatility", "Runway months", "IP registration/renewal", "Tax pack accuracy", "Reserve/insurance", "Transition retention"],
      boundary: ["No celebrity lifestyle marketing", "No name/image use without consent", "No income/endorsement promise", "No经纪/legal/tax replacement", "Short-term income ≠ permanent"],
      cases: ["Ali Abdaal", "Nadiya Hussain", "Jamie Vardy", "Alvin Leung", "Hawker Chan"],
      peers: ["Ida's Citi vertical", "HSBC Sports/Media/Entertainment", "SCB Celebrating Life's Work"],
      links: [
        { label: "Services/invitations", page: "m3-hub" },
        { label: "Family cockpit", page: "m3-family" },
        { label: "Proposal/execution", page: "m1-proposal" },
        { label: "Tax/legal", page: "m3-taxlegal" }
      ]
    },
    j4: {
      id: "J4", name: "Women & wealth", priority: "P1",
      who: "Spouses, widows, female founders, inheritors, family CFOs",
      trigger: "Inheritance, divorce, widowhood, venture, first wealth, education",
      job: "Move from 'someone decides for me' to independent decision-maker; confidence, control, protection",
      outcome: "Independent account/consent, confidence, education/legacy, philanthropy",
      stages: [
        { name: "Listen", what: "Family map, role, decision rights, privacy" },
        { name: "Educate", what: "Products/risk/fees/tax basics" },
        { name: "Independent", what: "Independent consent/account/adviser" },
        { name: "Plan", what: "Education/retirement/legacy/philanthropy" },
        { name: "Long term", what: "Annual review, next gen, community/mentor" }
      ],
      moments: ["Inheritance/widowhood", "Divorce", "Venture", "Children's education", "Philanthropy"],
      objects: ["Role", "Consent", "Goal", "LearningRecord", "Portfolio", "Trust", "Estate"],
      metrics: ["Independent account/consent", "Education/confidence", "Goal funding", "Retention/wallet", "Next gen/philanthropy", "Female founder financing"],
      boundary: ["No pink products", "No paternalism", "No disclosure without consent", "Family consensus ≠ authority", "No return/tax promise"],
      cases: ["Nadiya Hussain", "Mui estate trust (closed 2026-08)", "HSBC Women & Wealth"],
      peers: ["HSBC Women & Wealth", "UBS/Citi/SCB women's initiatives"],
      links: [
        { label: "Family cockpit", page: "m3-family" },
        { label: "Services/invitations", page: "m3-hub" },
        { label: "Trust/budget", page: "m4-trust" },
        { label: "Client portal", page: "client-portal" }
      ]
    }
  },

  privateAssetLab: {
    summary: { paperValue: 9000000000, pledgeableValue: 1800000000, spendableValue: 250000000, fundingGap: 42000000 },
    assets: [
      { id: "PA-001", name: "AI Terra Ltd (illustrative)", publicCase: "Fictional issuer; structure analogy: pre-IPO AI companies per public reporting 2026", jurisdiction: "Cayman Islands (illustrative)", instrument: "Ordinary shares", shares: "80,000,000", ownership: "30.0% (demo)", voting: "30.0%", lockUp: "5 years from round close (illustrative)", restrictions: "ROFR / board consent / founder lock-up", latestRound: "US$30bn post-money (illustrative)", valuationDate: "2026-10-31", paperValue: "US$9.0bn", pledgeableValue: "US$1.8bn", spendableValue: "US$250m", pledgeStatus: "Eligible subject to board consent and registration" },
      { id: "PA-002", name: "Riverford Organic Farmers", publicCase: "Riverford EOT 2025 (public case; illustrative amounts)", jurisdiction: "United Kingdom", instrument: "Employee ownership trust interest", shares: "n/a", ownership: "Majority via EOT", voting: "EOT trustee", lockUp: "Seller loan / staged consideration", restrictions: "EOT trust deed / seller loan covenants", latestRound: "Internal EOT valuation", valuationDate: "2026-09-30", paperValue: "£60m enterprise value (illustrative)", pledgeableValue: "£0 (not pledgeable)", spendableValue: "£12m seller loan", pledgeStatus: "Not pledgeable" },
      { id: "PA-003", name: "Shepherd Neame", publicCase: "Shepherd Neame shareholder family (illustrative stake)", jurisdiction: "United Kingdom", instrument: "Listed ordinary shares", shares: "6,000,000", ownership: "40.0% (illustrative)", voting: "40.0%", lockUp: "Thin market / family control", restrictions: "Board / family governance", latestRound: "Aquis: SHEP £66.9m market cap", valuationDate: "2026-10-26", paperValue: "£26.8m", pledgeableValue: "£10.7m", spendableValue: "£2.0m", pledgeStatus: "Pledgeable subject to concentration limit" }
    ],
    capitalCalls: [
      { id: "CC-2026-014", fund: "Growth Equity Fund IV", limitedPartner: "Family Office SPV", commitment: 50000000, calledToDate: 32000000, uncalled: 18000000, noticeDate: "2026-10-15", dueDate: "2026-11-15", callAmount: 6000000, currency: "USD", purpose: "Follow-on investment", fundingSource: "Cash / pledged facility", availableLiquidity: 3200000, fundingGap: 2800000, status: "Funding required", evidence: "Capital call notice v2" },
      { id: "CC-2026-019", fund: "Venture Growth Fund III", limitedPartner: "Family Trust SPV", commitment: 25000000, calledToDate: 21000000, uncalled: 4000000, noticeDate: "2026-09-20", dueDate: "2026-10-20", callAmount: 2000000, currency: "USD", purpose: "Portfolio company bridge", fundingSource: "Cash", availableLiquidity: 3200000, fundingGap: 0, status: "Paid", evidence: "SWIFT MT103 / receipt" },
      { id: "CC-2027-003", fund: "Growth Equity Fund IV", limitedPartner: "Family Office SPV", commitment: 50000000, calledToDate: 38000000, uncalled: 12000000, noticeDate: "2026-12-15", dueDate: "2027-01-15", callAmount: 3000000, currency: "USD", purpose: "Management fee / follow-on reserve", fundingSource: "Pledged facility", availableLiquidity: 1800000, fundingGap: 1200000, status: "Forecast", evidence: "LP forecast" }
    ],
    earnOuts: [
      { id: "EO-2025-003", transaction: "Unruly / News Corp (public case; illustrative)", buyer: "News Corp", seller: "Unruly founders", upfrontConsideration: 58000000, deferredConsideration: 56000000, triggerMetric: "Revenue / EBITDA", threshold: "To be defined in SPA", measurementPeriod: "2015–2020", paymentDate: "2021-03-31", discountRate: 12, fairValue: 38000000, probabilityWeighted: 22800000, currency: "GBP", disputeMechanism: "Expert determination", status: "Measurement period", evidence: "Sale and purchase agreement" },
      { id: "EO-2026-007", transaction: "Riverford EOT seller loan", buyer: "Employee ownership trust", seller: "Guy Singh-Watson", upfrontConsideration: 12000000, deferredConsideration: 12000000, triggerMetric: "Cash sweep / trading performance", threshold: "Available cash after capex", measurementPeriod: "2018–2023", paymentDate: "2023-12-31", discountRate: 8, fairValue: 11000000, probabilityWeighted: 9900000, currency: "GBP", disputeMechanism: "Trust deed / expert", status: "Performing", evidence: "Seller loan agreement" }
    ],
    obligations: [
      { id: "OB-2026-101", type: "Capital call", counterparty: "Growth Equity Fund IV", amount: 6000000, currency: "USD", dueDate: "2026-11-15", priority: "High", fundingSource: "Cash / pledged facility", responsibleParty: "Family Office CFO", status: "Funding gap", sourceDocument: "Capital call notice v2", evidence: "CC-2026-014" },
      { id: "OB-2026-102", type: "Earn-out measurement", counterparty: "News Corp", amount: 0, currency: "GBP", dueDate: "2027-03-31", priority: "Medium", fundingSource: "n/a", responsibleParty: "M&A counsel", status: "Measurement period", sourceDocument: "SPA", evidence: "EO-2025-003" },
      { id: "OB-2026-103", type: "Vendor loan repayment", counterparty: "Riverford EOT", amount: 2000000, currency: "USD", dueDate: "2027-06-30", priority: "High", fundingSource: "Operating cash flow", responsibleParty: "Family Office CFO", status: "Scheduled", sourceDocument: "Seller loan agreement", evidence: "PA-002" },
      { id: "OB-2026-104", type: "Tax payment", counterparty: "Inland Revenue / HK IRD", amount: 1200000, currency: "USD", dueDate: "2027-01-31", priority: "High", fundingSource: "Cash", responsibleParty: "Tax adviser", status: "To be funded", sourceDocument: "Tax computation", evidence: "Tax pack 2026" },
      { id: "OB-2026-105", type: "Interest payment", counterparty: "HSBC Private Bank", amount: 420000, currency: "USD", dueDate: "2026-12-31", priority: "Medium", fundingSource: "Cash", responsibleParty: "Treasury", status: "Scheduled", sourceDocument: "Facility agreement", evidence: "Credit facility" }
    ],
    valuations: [
      { id: "VAL-2026-001", asset: "AI Terra Ltd (illustrative)", currency: "USD", method: "Latest round / comparable companies / DCF", latestRound: "US$30bn post-money (illustrative)", marketabilityDiscount: 30, minorityDiscount: 10, concentrationDiscount: 10, valuationAmount: 5670000000, lendableValue: 1800000000, independentValuer: "Independent valuation panel", committee: "Private Asset Valuation Committee", approvalDate: "2026-10-20", nextReview: "2027-01-31", status: "Approved 4:0", evidence: "Valuation report v3" },
      { id: "VAL-2026-002", asset: "Riverford Organic Farmers", currency: "GBP", method: "Internal EOT valuation / DCF", latestRound: "Internal EOT valuation", marketabilityDiscount: 35, minorityDiscount: 10, concentrationDiscount: 0, valuationAmount: 60000000, lendableValue: 0, independentValuer: "EOT trustee adviser", committee: "Trustee / bank credit", approvalDate: "2026-09-30", nextReview: "2027-09-30", status: "Not pledgeable", evidence: "EOT valuation memo" },
      { id: "VAL-2026-003", asset: "Shepherd Neame", currency: "GBP", method: "Market price / comparable companies", latestRound: "Aquis: SHEP £66.9m market cap", marketabilityDiscount: 20, minorityDiscount: 5, concentrationDiscount: 20, valuationAmount: 26800000, lendableValue: 10700000, independentValuer: "Market price + panel", committee: "Private Asset Valuation Committee", approvalDate: "2026-10-25", nextReview: "2027-01-25", status: "Approved with concentration limit", evidence: "Valuation report v1" }
    ],
    intake: {
      source: "Primary shares / founder equity",
      assetClass: "Private equity / pre-IPO",
      issuer: "AI Terra Ltd (illustrative)",
      issuerJurisdiction: "Cayman Islands",
      holdingEntity: "BVI HoldCo",
      beneficialOwner: "AI founder family (demo)",
      ownershipPercentage: "30.0%",
      sharesHeld: "80,000,000",
      shareClass: "Ordinary shares",
      votingRights: "30.0%",
      economicRights: "30.0%",
      lockUp: "5 years (illustrative)",
      transferRestrictions: "ROFR / board consent / founder lock-up",
      pledgeStatus: "Eligible subject to board consent and registration",
      sourceDocuments: "Cap table v4 / shareholder agreement / board resolution",
      relatedTrust: "HK Family Trust",
      relatedFamilyOffice: "Family Office SPV",
      valuationSource: "Latest round US$30bn post-money (illustrative)",
      riskFlags: "Concentration 96%; lock-up; cross-border pledge; registration not started",
      completeness: 82
    },
    pledge: {
      ltv: 22, haircut: 78, facility: 500000000, lendable: 1800000000, coverage: 360,
      marginCall: "40% fall in valuation from drawdown date",
      eligibility: [
        { item: "Shares are transferable subject to ROFR", status: "Conditional", note: "ROFR waiver required" },
        { item: "Board consent obtained", status: "Pending", note: "Board meeting 2026-11-05" },
        { item: "Shareholder agreement permits pledge", status: "Review", note: "Clause 8.3" },
        { item: "Pledge registration available", status: "Not started", note: "Cayman / BVI counsel" },
        { item: "Cross-border enforceability opinion", status: "Pending", note: "Hong Kong / UK counsel" },
        { item: "No existing pledge or negative pledge", status: "Clear", note: "Cap table review" }
      ],
      preconditions: [
        "Approved valuation report (not older than 90 days)",
        "Board consent and ROFR waiver",
        "Signed pledge agreement and registration filing",
        "Cross-border enforceability opinion",
        "Insurance / key-person review",
        "KYC / source of wealth refresh"
      ]
    },
  },

  familyOfficeDashboard: {
    family: "He family (illustrative)",
    aua: 500000000, entities: 5, trusts: 2, jurisdictions: 4, liquidity: 52000000,
    ipsCompliance: 92, costIncome: 38,
    consolidated: [
      { entity: "HK Family Office Ltd", jurisdiction: "Hong Kong", assets: 180000000, liabilities: 12000000, net: 168000000 },
      { entity: "BVI HoldCo", jurisdiction: "BVI", assets: 150000000, liabilities: 0, net: 150000000 },
      { entity: "HK Family Trust", jurisdiction: "Hong Kong", assets: 90000000, liabilities: 0, net: 90000000 },
      { entity: "UK Property SPV", jurisdiction: "United Kingdom", assets: 50000000, liabilities: 22000000, net: 28000000 },
      { entity: "SG Investment SPV", jurisdiction: "Singapore", assets: 30000000, liabilities: 0, net: 30000000 }
    ],
    allocation: [
      { assetClass: "Equities", target: 35, actual: 38, band: "30–40" },
      { assetClass: "Fixed income", target: 25, actual: 22, band: "20–30" },
      { assetClass: "Private markets", target: 20, actual: 24, band: "15–25" },
      { assetClass: "Real estate", target: 10, actual: 9, band: "5–15" },
      { assetClass: "Cash", target: 10, actual: 7, band: "5–15" }
    ],
    services: [
      { service: "Global custody", provider: "HSBC", status: "Active", note: "Multi-entity / multi-currency" },
      { service: "Lombard facility", provider: "HSBC Private Bank", status: "Active", note: "USD 500m; 22% LTV" },
      { service: "Trust administration", provider: "HSBC TFS", status: "Active", note: "HK trust / charity" },
      { service: "HSBC Access", provider: "HSBC Innovation Banking", status: "Review", note: "Co-investment pipeline" },
      { service: "Tax data pack", provider: "HSBC / external adviser", status: "Active", note: "HK / UK / SG" }
    ],
    governance: [
      { milestone: "Family charter", status: "Signed", date: "2026-06-30" },
      { milestone: "Family council", status: "Quarterly", date: "2026-09-30" },
      { milestone: "NextGen programme", status: "Cohort 1", date: "2026-11-03" },
      { milestone: "Investment committee", status: "Monthly", date: "2026-10-31" },
      { milestone: "Philanthropy committee", status: "Semi-annual", date: "2026-12-15" }
    ]
  },

  audit: [
    { t: "09:02", who: "Alex Chan (RM)", what: "Created proposal P-2026-000123", ref: "P-2026-000123" },
    { t: "09:04", who: "AI Proposal Composer", what: "Generated 3 options (model v3.2)", ref: "AI-2026-1020-01" },
    { t: "09:06", who: "Alex Chan (RM)", what: "Selected option A / locked version v3", ref: "P-2026-000123" },
    { t: "09:08", who: "Compliance", what: "US estate tax WARN approved with conditions", ref: "CHK-TAX-002" },
    { t: "09:12", who: "Client", what: "E-signed proposal v3", ref: "ESIGN-2026-0912" }
  ]
};
