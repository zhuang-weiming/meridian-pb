/* Demo data — all names, numbers and structures are fictional / illustrative. */
const DB = {
  asOf: "2026-10-20 09:00 HKT",
  clients: [
    {
      id: "C-1001", name: "Chen Zhiyuan", short: "Mr Chen", segment: "T2 HNW", rm: "Alex Chan",
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
      id: "C-88421", name: "Lin Zhe (Example)", short: "Mr Lin", segment: "T1 UHNW", rm: "Alex Chan",
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
      id: "C-2002", name: "Ms Wang", short: "Ms Wang", segment: "T3 Affluent", rm: "Mia Wong",
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
      id: "C-7701", name: "He Qiming (Example)", short: "Mr He", segment: "T1 UHNW", rm: "Alex Chan",
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
      { name: "Latest funding round", value: 9000000000, weight: 50, note: "2026-06, USD 30bn post-money" },
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

  audit: [
    { t: "09:02", who: "Alex Chan (RM)", what: "Created proposal P-2026-000123", ref: "P-2026-000123" },
    { t: "09:04", who: "AI Proposal Composer", what: "Generated 3 options (model v3.2)", ref: "AI-2026-1020-01" },
    { t: "09:06", who: "Alex Chan (RM)", what: "Selected option A / locked version v3", ref: "P-2026-000123" },
    { t: "09:08", who: "Compliance", what: "US estate tax WARN approved with conditions", ref: "CHK-TAX-002" },
    { t: "09:12", who: "Client", what: "E-signed proposal v3", ref: "ESIGN-2026-0912" }
  ]
};
