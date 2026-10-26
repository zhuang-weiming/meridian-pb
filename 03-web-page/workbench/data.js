/* HSBC Private Bank — Operating Workbench data.
   Public cases are structural references sourced from public materials (as of 2026-10-26);
   account-level rows (orders, onboarding, client P&L) use fictional demo families.
   Bank data is demo data. No client relationship is implied. */
const WB = {
  ipo: {
    pipeline: [
      { id: "IPO-001", company: "DeepSeek", exchange: "PRC private (listing venue unconfirmed)", sector: "AI / software", stage: "Private / financing round", expected: "IPO timing media-reported, unconfirmed", cib: "MSS / Innovation Banking", founder: "Liang Wenfeng", holders: "Founder + partnership-investor LPs", wealth: "US$36bn (Bloomberg estimate, Jul 2026)", pb: "Not onboarded", owner: "Alex Chan", next: "Consent-based introduction", source: "Public records 2026-04/07; structural case" },
      { id: "IPO-002", company: "Mindray Bio-Medical", exchange: "HKEX", sector: "MedTech", stage: "H-share application", expected: "2026", cib: "CIB / ECM", founder: "Li Xiting", holders: "Founder + management", wealth: "Public filings", pb: "Existing PB relationship", owner: "Priya Nair", next: "Wealth event review", source: "Public case; illustrative" },
      { id: "IPO-003", company: "Lens Technology", exchange: "SZSE / HKEX", sector: "Consumer electronics", stage: "A+H listed", expected: "Post-IPO", cib: "MSS", founder: "Zhou Qunfei", holders: "Founder + management", wealth: "Public filings", pb: "Existing PB relationship", owner: "Alex Chan", next: "A/H rights review", source: "Public case; illustrative" },
      { id: "M&A-001", company: "Riverford Organic Farmers", exchange: "Private / EOT", sector: "Consumer / food", stage: "Employee ownership trust", expected: "Completed", cib: "M&A / private capital", founder: "Guy Singh-Watson", holders: "Founder + EOT", wealth: "£60m enterprise value (illustrative)", pb: "Not onboarded", owner: "James Wong", next: "Seller loan / liquidity review", source: "Public case; illustrative" },
      { id: "M&A-002", company: "Unruly", exchange: "Private / acquired", sector: "AdTech", stage: "Acquired by News Corp", expected: "Completed", cib: "M&A", founder: "Sarah Wood", holders: "Founders + management", wealth: "£58m upfront + up to £56m earn-out", pb: "Not onboarded", owner: "Priya Nair", next: "Earn-out / retention review", source: "Public case; illustrative" }
    ],
    company: {
      name: "DeepSeek", jurisdiction: "Hangzhou, PRC (main entity)", sector: "AI / software", stage: "Private / financing round",
      founder: "Liang Wenfeng", ownership: "Direct 31.01%; beneficial ≈84.29% incl. Ningbo Chengen vehicle (public records)", employees: "Research / engineering heavy",
      capTable: [
        { holder: "Ningbo Chengen partnership", shares: "60.19%", votes: "≈99.7% (media)", notes: "Vehicle holds control; round money enters as LP capital" },
        { holder: "Liang Wenfeng (direct)", shares: "31.01%", votes: "—", notes: "Direct stake; beneficial owner (public records)" },
        { holder: "Cheng Li", shares: "8.52%", votes: "—", notes: "Public filings" },
        { holder: "Government AI fund", shares: "0.28%", votes: "—", notes: "Public filings" }
      ],
      restrictions: ["External investors: economic rights via LP structure; reported 5-year lock-up (media; to verify in deal docs)", "No public option-pool disclosure; partner equity sits in the vehicle", "PRC-domiciled entity: pledge / lending structuring differs from Cayman/BVI topco cases", "ROFR / board consent (structural reference)"],
      wealthEvent: "IPO / secondary / financing", estimatedWealth: "US$36bn (Bloomberg estimate, Jul 2026)", pbOpportunity: "Founder, spouse, next gen, family office, trust, credit, HSBC Access",
      crossBorder: "PRC domestic holding; no public offshore topco (unlike Cayman/BVI cases); PB must plan PRC pledge/registration, tax residency and consent chain",
      riskFlags: ["Concentration", "MNPI / wall", "PRC structuring for pledge", "Tax residency"],
      tasks: [
        { task: "Confirm CIB relationship and IPO mandate", owner: "CIB coverage", status: "In progress" },
        { task: "Consent-based PB introduction", owner: "Alex Chan", status: "Pending consent" },
        { task: "Independent pre-IPO valuation", owner: "Valuation committee", status: "Not started" },
        { task: "KYC / source of wealth refresh", owner: "PB onboarding", status: "Not started" },
        { task: "Family / next-gen discovery", owner: "Family advisory", status: "Not started" }
      ]
    },
    valuation: {
      company: "DeepSeek", date: "2026-10-31", latestRound: "≈¥51bn (~US$7.1bn) round, 2026-07; post-money ≈US$49–56bn (media)",
      methods: [
        { method: "Latest round", weight: 50, input: "Post-money publication median ≈US$52bn", value: "US$52bn", note: "Primary evidence; verify preference/ratchet in deal docs" },
        { method: "Comparable companies", weight: 30, input: "EV/Sales peer set (illustrative)", value: "US$45–52bn", note: "AI infra peers; growth/margin adjustment" },
        { method: "DCF", weight: 20, input: "WACC 12%; terminal growth 4% (illustrative)", value: "US$38–48bn", note: "Scenario range; not a price target" }
      ],
      discounts: [
        { item: "Lack of marketability", value: "30%", rationale: "Pre-IPO / LP-locked economics" },
        { item: "Minority interest", value: "10%", rationale: "No control at asset level" },
        { item: "Concentration", value: "10%", rationale: "Single-asset exposure" }
      ],
      range: "US$23.9bn – US$32.8bn", rangeBasis: "Same 30% / 10% / 10% stack applied to the low and high end of the method range",
      lendableHint: "US$2.4bn – US$9.8bn (10–30% LTV guide; rule set in demo m4-valuation)",
      committee: "Private Asset Valuation Committee", status: "Pending approval",
      evidence: ["Cap table per public records (2026-04/07)", "Round documents / LP terms", "Comparable set", "DCF model", "Liquidity/marketability study"]
    },
    handoff: [
      { step: "CIB identifies wealth event", owner: "CIB coverage", status: "Done", evidence: "IPO mandate / pipeline note" },
      { step: "Client consent for PB introduction", owner: "CIB / client", status: "Pending", evidence: "Consent record" },
      { step: "MNPI / wall clearance", owner: "Compliance", status: "Pending", evidence: "Wall check" },
      { step: "PB KYC / suitability", owner: "PB onboarding", status: "Not started", evidence: "KYC file" },
      { step: "Family / next-gen discovery", owner: "Family advisory", status: "Not started", evidence: "Family map" },
      { step: "Pre-IPO valuation / credit readiness", owner: "Valuation / Credit", status: "Not started", evidence: "Valuation pack" }
    ],
    consentRecord: [
      { item: "Consent reference", value: "CON-HSBC-DP-001 (demo)", note: "Unique ID; stored with timestamp and channel" },
      { item: "Captured", value: "2026-10-26 · consent form (e-sign)", note: "No verbal-only consent for handoff" },
      { item: "Scope", value: "PB introduction + KYC reuse only", note: "Deal information stays inside the wall" },
      { item: "Wall check reference", value: "WCR-2026-10-001 (demo)", note: "Issued by Compliance; clears named individuals" },
      { item: "Expiry", value: "12 months or on new MNPI", note: "Re-consent if event changes materially" }
    ]
  },

  estate: {
    cases: [
      { id: "EST-001", deceased: "Anita Mui (estate, d. 2003-12-30; testamentary trust)", deathDate: "2003-12-30", daysSinceDeath: 8279, probReleaseDays: "—", estateValue: "Public reports: trust pool (legacy, property, royalties)", distributed: "Monthly allowance to mother, 2004–2026; residue per will", legalCost: "Multi-year litigation (public reporting)", status: "Closed — trust terminated 2026-08-30; residue to charity", beneficiaries: "Mother (allowance) / relatives / charity residue", source: "Public reporting (will and trust); trustee as publicly reported" },
      { id: "EST-002", deceased: "Mrs P (FOS DRN-4737924)", deathDate: "2023 (probate granted 2023-08-16)", daysSinceDeath: "—", probReleaseDays: 15, estateValue: "Undisclosed", distributed: "Funds released 2023-08-31 (15 days after grant)", legalCost: "Probate cost", status: "Closed", beneficiaries: "Estate beneficiaries", source: "FOS public decision" },
      { id: "EST-003", deceased: "Lo Ying Shek (d. 2006) — Lo Family Trust dispute", deathDate: "2006", daysSinceDeath: 7603, probReleaseDays: "—", estateValue: "Trust incl. Great Eagle stake (public)", distributed: "Trust distributions per deed; letters of wishes disputed", legalCost: "Court / trustee costs", status: "Trust administration dispute (CFI 2018)", beneficiaries: "Widow (executrix Tao Soh Ngun) / children", source: "Tao Soh Ngun v HSBC International Trustee Ltd [2018] HKCFI 380" },
      { id: "EST-004", deceased: "He family (illustrative)", deathDate: "2026-01-15", daysSinceDeath: 284, probReleaseDays: "—", estateValue: "US$30m (illustrative)", distributed: "US$8m / 27%", legalCost: "US$320k", status: "Probate / estate account", beneficiaries: "Spouse / children / mother", source: "Illustrative" }
    ],
    timeline: [
      { day: "T+0", event: "Death notification", authority: "None; POA ends", action: "Record death; protect assets; stop marketing", evidence: "Death certificate" },
      { day: "T+1", event: "Family contact", authority: "Executor named in will (not yet granted)", action: "Explain probate; collect will / ID", evidence: "Will / ID" },
      { day: "T+7", event: "Funeral / urgent expenses", authority: "Estate / executor (limited)", action: "Pay permitted funeral / urgent expenses", evidence: "Invoice / approval" },
      { day: "T+30", event: "Probate application", authority: "Court", action: "Track grant; cross-border reseal", evidence: "Probate filing" },
      { day: "T+60", event: "Grant of probate", authority: "Executor", action: "Open estate account; asset map", evidence: "Grant" },
      { day: "T+90", event: "Estate account / distributions", authority: "Executor", action: "Pay debts / tax / distributions", evidence: "Estate ledger" },
      { day: "T+365", event: "12-month outcome", authority: "Executor / trustee", action: "Measure distribution, costs, family retention", evidence: "Outcome report" }
    ],
    authority: [
      { role: "Executor", instrument: "Will / grant of probate", scope: "Estate assets", status: "Granted 2026-03-16 (T+60)", canPay: "Estate debts / distributions", cannot: "Trust assets" },
      { role: "Trustee", instrument: "Trust deed", scope: "Trust assets", status: "Active", canPay: "Trust distributions", cannot: "Estate assets" },
      { role: "Attorney", instrument: "POA", scope: "Lifetime accounts", status: "Terminated on death", canPay: "None", cannot: "Post-death" },
      { role: "Beneficiary", instrument: "Trust deed / will", scope: "Beneficial interest", status: "Active", canPay: "No authority", cannot: "Instruct bank" }
    ],
    outcomes: [
      { cohort: "2025 deaths", cases: 34, firstPaymentDays: 18, distribution12m: 68, legalCostPct: 2.4, retention: 81, nps: 34 },
      { cohort: "2026 deaths (to Oct)", cases: 28, firstPaymentDays: 15, distribution12m: 72, legalCostPct: 2.1, retention: 84, nps: 41 },
      { cohort: "Cross-border", cases: 12, firstPaymentDays: 38, distribution12m: 54, legalCostPct: 4.8, retention: 69, nps: 12 }
    ]
  },

  onboarding: {
    families: [
      { id: "ONB-001", name: "UK creator family (demo)", type: "Creator / family", members: "Principal + spouse + 3 children", goal: "Education / income protection", consent: "Self + spouse", risk: "Balanced", template: "Family income & education", status: "Suitability" },
      { id: "ONB-002", name: "Cross-border creator family (demo)", type: "Creator / cross-border", members: "Principal + spouse", goal: "UK→HK / global income", consent: "Self + spouse", risk: "Growth", template: "Global growth", status: "First investment" },
      { id: "ONB-003", name: "NextGen / He family (demo)", type: "Next generation", members: "He Junxuan", goal: "First investment / venture", consent: "Self", risk: "Growth", template: "NextGen starter", status: "Education" },
      { id: "ONB-004", name: "Spouse / Chen family (demo)", type: "Spouse / family CFO", members: "Chen Yayi", goal: "Liquidity / education / philanthropy", consent: "Self", risk: "Balanced", template: "Liquidity & income", status: "Onboarding" }
    ],
    suitability: {
      client: "UK creator family (demo)", date: "2026-10-26",
      fields: [
        { field: "Investment objective", value: "Income + education funding", status: "Verified" },
        { field: "Risk tolerance", value: "Balanced / medium", status: "Verified" },
        { field: "Risk capacity", value: "Medium; 3-year horizon", status: "Verified" },
        { field: "Knowledge & experience", value: "Limited / media income", status: "Education required" },
        { field: "Liquidity needs", value: "GBP 120k / year", status: "Verified" },
        { field: "Concentration", value: "Media / royalty income", status: "Monitor" },
        { field: "Restrictions", value: "No tobacco / no leverage", status: "Verified" },
        { field: "Tax residency", value: "UK", status: "CRS / adviser" }
      ],
      outcome: "Suitable for balanced template; first investment capped at GBP 250k; education module required."
    },
    templates: [
      { id: "TPL-01", name: "Capital preservation", risk: "Low", horizon: "1–3 years", target: "Cash + short duration", min: "GBP 25k", fee: "0.35%", liquidity: "Daily / weekly" },
      { id: "TPL-02", name: "Income", risk: "Low–medium", horizon: "3–5 years", target: "Bonds / dividends / REITs", min: "GBP 50k", fee: "0.55%", liquidity: "Daily" },
      { id: "TPL-03", name: "Balanced", risk: "Medium", horizon: "5–7 years", target: "Global equities / bonds", min: "GBP 50k", fee: "0.65%", liquidity: "Daily" },
      { id: "TPL-04", name: "Growth", risk: "Medium–high", horizon: "7–10 years", target: "Global equities / private markets", min: "GBP 100k", fee: "0.80%", liquidity: "Daily / lock-up" },
      { id: "TPL-05", name: "Liquidity", risk: "Low", horizon: "0–1 year", target: "Cash / money market", min: "GBP 25k", fee: "0.20%", liquidity: "Daily" },
      { id: "TPL-06", name: "ESG / impact", risk: "Medium", horizon: "5–10 years", target: "ESG equities / green bonds", min: "GBP 50k", fee: "0.70%", liquidity: "Daily" }
    ],
    first: {
      client: "UK creator family (demo)", template: "Family income & education", amount: "GBP 250,000", date: "2026-11-02",
      steps: [
        { step: "Suitability passed", status: "Done", evidence: "Suitability report v2" },
        { step: "Education module completed", status: "Done", evidence: "Learning record" },
        { step: "Template selected", status: "Done", evidence: "TPL-02 Income" },
        { step: "Client confirmation", status: "Pending", evidence: "E-sign" },
        { step: "Order / execution", status: "Not started", evidence: "Order ticket" },
        { step: "Post-trade review", status: "Not started", evidence: "Confirmation" }
      ]
    }
  },

  revenue: {
    summary: { revenue: 480000000, directCost: 168000000, grossMargin: 312000000, fundingRisk: 8000000, costToServe: 148000000, netMargin: 156000000, costIncome: 67.5, clients: 1840, rms: 64 },
    monthly: [
      { month: "2026-05", revenue: 36, grossMargin: 23.4, netMargin: 11.7 },
      { month: "2026-06", revenue: 38, grossMargin: 24.7, netMargin: 12.3 },
      { month: "2026-07", revenue: 39, grossMargin: 25.3, netMargin: 12.7 },
      { month: "2026-08", revenue: 41, grossMargin: 26.7, netMargin: 13.3 },
      { month: "2026-09", revenue: 43, grossMargin: 28, netMargin: 14 },
      { month: "2026-10", revenue: 45, grossMargin: 29.3, netMargin: 14.6 }
    ],
    clients: [
      { client: "He family (demo)", segment: "UHNW", revenue: 3600000, cost: 1420000, grossMargin: 2180000, netMargin: 1130000, aum: 268000000, wallet: 34 },
      { client: "AI founder family (demo)", segment: "UHNW", revenue: 2300000, cost: 820000, grossMargin: 1480000, netMargin: 760000, aum: 240000000, wallet: 18 },
      { client: "Ashworth family (demo)", segment: "UHNW", revenue: 640000, cost: 290000, grossMargin: 350000, netMargin: 180000, aum: 118000000, wallet: 31 },
      { client: "UK creator family (demo)", segment: "HNW", revenue: 310000, cost: 140000, grossMargin: 170000, netMargin: 90000, aum: 28000000, wallet: 22 },
      { client: "Cross-border creator family (demo)", segment: "HNW", revenue: 420000, cost: 180000, grossMargin: 240000, netMargin: 120000, aum: 35000000, wallet: 26 }
    ],
    products: [
      { product: "Advisory / managed portfolio", revenue: 224000000, cost: 64000000, margin: 160000000, marginPct: 71 },
      { product: "Custody", revenue: 62000000, cost: 28000000, margin: 34000000, marginPct: 55 },
      { product: "Brokerage / execution", revenue: 52000000, cost: 22000000, margin: 30000000, marginPct: 58 },
      { product: "Lending / Lombard", revenue: 76000000, cost: 24000000, margin: 52000000, marginPct: 68 },
      { product: "FX / treasury", revenue: 36000000, cost: 12000000, margin: 24000000, marginPct: 67 },
      { product: "Trust / estate / family office", revenue: 30000000, cost: 18000000, margin: 12000000, marginPct: 40 }
    ],
    rms: [
      { rm: "Alex Chan", relationships: 42, households: 18, aum: 620000000, support_ratio: 1.2, segment_mix: { uhnw: 45, hnw: 45, familyOffice: 10 }, service_intensity: { meetingsPerYear: 8, tradesPerYear: 18, trustCases: 6, creditFacilities: 12 }, revenue: 9600000, grossMargin: 6240000, netMargin: 3120000, failedTrades: 1.2, nps: 62 },
      { rm: "Priya Nair", relationships: 38, households: 16, aum: 540000000, support_ratio: 1.0, segment_mix: { uhnw: 35, hnw: 55, familyOffice: 10 }, service_intensity: { meetingsPerYear: 7, tradesPerYear: 16, trustCases: 5, creditFacilities: 10 }, revenue: 7300000, grossMargin: 4745000, netMargin: 2370000, failedTrades: 0.8, nps: 58 },
      { rm: "James Wong", relationships: 51, households: 24, aum: 480000000, support_ratio: 0.7, segment_mix: { uhnw: 20, hnw: 70, familyOffice: 10 }, service_intensity: { meetingsPerYear: 6.4, tradesPerYear: 15, trustCases: 5, creditFacilities: 10 }, revenue: 6400000, grossMargin: 4160000, netMargin: 2080000, failedTrades: 2.1, nps: 44 },
      { rm: "Sofia Rossi", relationships: 35, households: 14, aum: 420000000, support_ratio: 1.1, segment_mix: { uhnw: 25, hnw: 65, familyOffice: 10 }, service_intensity: { meetingsPerYear: 7, tradesPerYear: 14, trustCases: 4, creditFacilities: 9 }, revenue: 5200000, grossMargin: 3380000, netMargin: 1690000, failedTrades: 1.5, nps: 51 }
    ]
  },

  orders: {
    summary: { ordersToday: 128, failed: 7, failedPct: 5.5, firstTimeFill: 91.2, avgRecoveryMinutes: 42, clientImpact: 4, rmKpiImpact: 6 },
    reasonPeriod: "Trailing 30 days",
    orders: [
      { id: "ORD-1001", client: "He family (demo)", rm: "Alex Chan", market: "HKEX", symbol: "0700.HK", side: "Buy", qty: 20000, amount: 7200000, ccy: "HKD", status: "Filled", reason: "—", time: "09:32" },
      { id: "ORD-1002", client: "UK creator family (demo)", rm: "Priya Nair", market: "LSE", symbol: "VOD.L", side: "Buy", qty: 50000, amount: 45000, ccy: "GBP", status: "Failed", reason: "Market closed (submitted 16:44, after close)", time: "16:44" },
      { id: "ORD-1003", client: "Cross-border creator family (demo)", rm: "Priya Nair", market: "HKEX", symbol: "2800.HK", side: "Buy", qty: 10000, amount: 260000, ccy: "HKD", status: "Filled", reason: "—", time: "10:15" },
      { id: "ORD-1004", client: "AI founder family (demo)", rm: "Alex Chan", market: "SGX", symbol: "D05.SI", side: "Sell", qty: 20000, amount: 640000, ccy: "SGD", status: "Rejected", reason: "Insufficient holdings", time: "11:02" },
      { id: "ORD-1005", client: "Ashworth family (demo)", rm: "James Wong", market: "LSE", symbol: "SHEP.L", side: "Buy", qty: 15000, amount: 120000, ccy: "GBP", status: "Failed", reason: "Limit price / liquidity", time: "11:20" },
      { id: "ORD-1006", client: "He family (demo)", rm: "Alex Chan", market: "OTC", symbol: "BOND-2030", side: "Buy", qty: 1000000, amount: 980000, ccy: "USD", status: "Pending", reason: "Counterparty confirmation", time: "11:45" },
      { id: "ORD-1007", client: "Cross-border creator family (demo)", rm: "Priya Nair", market: "HKEX", symbol: "9988.HK", side: "Buy", qty: 5000, amount: 450000, ccy: "HKD", status: "Filled", reason: "—", time: "13:05" },
      { id: "ORD-1008", client: "UK creator family (demo)", rm: "Priya Nair", market: "LSE", symbol: "ULVR.L", side: "Buy", qty: 8000, amount: 320000, ccy: "GBP", status: "Failed", reason: "System timeout", time: "14:10" },
      { id: "ORD-1009", client: "He family (demo)", rm: "Alex Chan", market: "HKEX", symbol: "1299.HK", side: "Buy", qty: 30000, amount: 1800000, ccy: "HKD", status: "Filled", reason: "—", time: "14:22" },
      { id: "ORD-1010", client: "Ashworth family (demo)", rm: "James Wong", market: "LSE", symbol: "SHEP.L", side: "Sell", qty: 5000, amount: 40000, ccy: "GBP", status: "Failed", reason: "Market closed (submitted 16:58, after close)", time: "16:58" }
    ],
    reasons: [
      { reason: "Market closed / after-hours", count: 18, pct: 31, controllable: "Preventable", owner: "Operations / RM" },
      { reason: "Limit price / liquidity", count: 14, pct: 24, controllable: "Client / market", owner: "RM" },
      { reason: "Insufficient holdings / funds", count: 9, pct: 16, controllable: "Preventable", owner: "RM / Credit" },
      { reason: "System timeout", count: 7, pct: 12, controllable: "IT", owner: "Technology" },
      { reason: "Counterparty confirmation", count: 6, pct: 10, controllable: "External", owner: "Operations" },
      { reason: "Compliance / suitability", count: 4, pct: 7, controllable: "Preventable", owner: "Compliance" }
    ],
    recovery: [
      { order: "ORD-1002", client: "UK creator family (demo)", issue: "Market closed (after hours)", action: "Rebook next trading session; notify client", owner: "Priya Nair", status: "Client informed", sla: "Same day" },
      { order: "ORD-1004", client: "AI founder family (demo)", issue: "Insufficient holdings", action: "Confirm settlement / holdings; revalidate", owner: "Alex Chan", status: "Root cause", sla: "4 hours" },
      { order: "ORD-1008", client: "UK creator family (demo)", issue: "System timeout", action: "Retry / alternate venue; incident ticket", owner: "Technology", status: "Recovered", sla: "1 hour" },
      { order: "ORD-1010", client: "Ashworth family (demo)", issue: "Market closed (after hours)", action: "Rebook next session; explain calendar", owner: "James Wong", status: "Pending", sla: "Same day" }
    ],
    kpis: [
      { metric: "Failed trade %", value: "5.5%", target: "<3%", trend: "↓", owner: "COO" },
      { metric: "First-time fill rate", value: "91.2%", target: ">95%", trend: "↑", owner: "Execution" },
      { metric: "Average recovery time", value: "42 min", target: "<30 min", trend: "↓", owner: "Operations" },
      { metric: "Client-impacted failures", value: "4", target: "0", trend: "↓", owner: "RM" },
      { metric: "RM KPI adjustment", value: "6", target: "0", trend: "↓", owner: "HR / COO" },
      { metric: "Trust score", value: "78", target: ">85", trend: "↑", owner: "Client experience" }
    ]
  }
};
