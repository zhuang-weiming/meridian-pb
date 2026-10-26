# HSBC Private Bank · Client & Advisor Journey (EN)

The **client and advisor journey** prototype: a clickable, editable, role-switchable front end covering 5 use cases across 34 routes, including the Family Cockpit / Case Workbench household layer, J2/J3/J4 journey blueprints, Private Asset Lifecycle plus client / vendor / audit portals.

> All clients, amounts, institutions and tax rates are **demonstration data** and do not constitute investment, tax or legal advice.
>
> **Scope**: this demo shows the part of the **HSBC Private Bank core system** that goes **beyond Avaloq's existing standard capability** — the five use cases below. Avaloq standard functionality is brought into the same data model, permission matrix and evidence base step by step.

---

## 1. Run

```bash
cd meridian-pb
python3 -m http.server 8791
# open http://localhost:8791/03-web-page/client-journey.html
```

You can also double-click `../client-journey.html` from this folder (fully static, no build, no dependencies).

**Validation scripts**: `node check.js` checks proposal/execution weights and amounts, cost, M3/M4 LTV and coverage, the 34 routes and the role registry, the household layer (households ↔ persons ↔ consents ↔ goals ↔ cases), the on-page reference graph (every jump resolves to a registered route) and the fictional-issuer policy on the pledge/valuation pages; `node render-check.js` renders every route plus the three client-portal tabs and checks for page errors and balanced div stacks.

**Deep links**
- RM view: `client-journey.html#/m1-dashboard`
- Client view: `client-journey.html?role=Client#/client-portal`
- Vendor view: `client-journey.html?role=Vendor#/vendor-portal`
- Compliance view: `client-journey.html?role=Compliance#/m1-compliance`
- Founder case: `client-journey.html#/m4-founder`
- Private assets: `client-journey.html#/m4-private-assets`
- Tax optimisation: `client-journey.html#/m5-scenarios`

**Reset**: “Reset demo” in the sidebar clears localStorage.

---

## 2. How to click through the five use cases

### M1 Proposal → Orders
1. `#/m1-dashboard` for events and the Client 360 (tax ID masked for the RM).
2. `#/m1-proposal` — click “Generate three options” and review the 3 option cards, TES and leg-level allocation.
3. Pick A → `#/m1-execution` for the line-by-line blueprint (template, quantity, venue, limit, tax basis, funding, status).
4. `#/m1-compliance` — 10 checks, 1 WARN (US estate tax) → “Approve with conditions” → “Client e-signature” → “Create orders”.
5. `#/m1-orders` for parent orders, fills, TCA and the cost waterfall.

**The point to make with the business:** the proposal layer and the execution layer are separated; TES has five dimensions; a WARN cannot pass silently; TCA writes back to the template.

### M2 Quant Lab
1. `#/m2-allocation` for the allocation, policy ranges, donut chart and turnover.
2. `#/m2-stress` — click through 6 scenarios for P&L, drawdown, T+7 and margin calls.
3. `#/m2-backtest` — toggle “With costs / Theoretical” for CAGR, Sharpe, Deflated Sharpe and the limitations.
4. `#/m2-decision` for the RM decision card: adopt / modify / reject, with a written rationale.

**The point to make with the business:** stress is not the “worst case”; the backtest includes costs, tax and out-of-sample; the RM decides how to deliver.

### M3 RM Copilot / Service invitations
1. `#/m3-financing` for the cash-flow gap, 3 financing options, LTV / coverage / margin-call ladder; toggle −30% / −50%.
2. `#/m3-taxlegal` — switch the tax / legal tabs for the obligation calendar, sell / pledge / trust scenarios and referrals.
3. `#/m3-hub` for “Services / Invitations”: five family members (founder / spouse / eldest son / younger daughter / mother) × 10 services (MIT Sloan next-gen course, Athens family leaders forum, governance workshop, family office, spouse & children session, education, health & eldercare, philanthropy, cross-border relocation, women & wealth). You see only the invitation, the programme, the delivery party, and accept / feedback; **no price, score or procurement steps**.

**RM tax guidance:** the third tab in `#/m3-taxlegal` (“RM guidance / partners”) gives RM a “can say / cannot say” list, six discovery questions, tax data packs, common scenario cards, an Approved Accountant Panel, and the referral/consent flow. RM gives facts, checklists, boundaries and referrals — not tax advice.

**J2/J3/J4 journey blueprints:** `#/m3-journeys` has three tabs (Founder/Creator/Women), each with client/trigger/job/outcome, five stages, key moments, objects, metrics, boundaries, cases/benchmarks and links into existing pages.

**Family Cockpit & Case Workbench:** `#/m3-family` is the household view — members, relationships and their verification, family goals (proposer ≠ beneficiary ≠ funder ≠ decision maker), consent/authorisation gaps against each person, and open actions; switch households with the Client selector. `#/m3-cases` is the case queue — financing, tax, trust and service tasks with owner / dependencies / due / deliverable / client to-do, plus module filters and case detail (by design, not a public-case list). The `Business dictionary` button explains Household / Beneficial Owner / Trust Beneficiary / Payee / LTV / Haircut and the client–person–BP–account object boundaries.

**Family Office Dashboard:** `#/m3-family-office` shows the consolidated balance sheet, IPS target/actual/policy bands, banking/CIB/trust services, family governance and next-generation milestones.

**The point to make with the business:** the client pays nothing and signs nothing; services are organised around “the different needs of each family member” rather than serving one decision-maker; the spouse / adult children / grandchildren and family-governance lens follows Ida Liu's public remarks.

### M4 Founder (example: Lin Zhe)
1. `#/m4-founder` for the holding structure, event radar, $9bn → $5.67bn → $2.268bn → $500m.
2. `#/m4-valuation` — drag LTV 10%–30% for facility and coverage; review the 40% trigger and the committee's 4:0.
3. `#/m4-pledge` — change the inputs (V/B/t/C/i/n/r) → “Recalculate” for break-even, terminal wealth, the −40% gap and the pledge / sell recommendation.
4. `#/m4-trust` — switch structure / budget / tax ledger; “Add distribution” → source layer C1–C6, filer, credit.

**The point to make with the business:** LTV is not a system parameter; the 40% trigger is written into pre-conditions; a pledge ≠ tax-free; trust spending has a source layer.

### M4 Private Asset Lifecycle

`#/m4-private-assets` has six tabs:

- **Asset Intake**: asset source, issuer, holding entity, beneficial owner, ownership, shares, voting/economic rights, lock-up, transfer restrictions, pledge status, related trust/family office, source documents, risk flags and completeness.
- **Capital Calls**: commitment, called, uncalled, notice date, due date, funding source, funding gap, status.
- **Earn-Outs**: upfront, deferred, maximum, trigger metric, measurement period, fair value, probability-weighted value.
- **Obligation Calendar**: capital call, earn-out, vendor loan, tax and interest with amount, currency, due date, priority, responsible party and status.
- **Valuation Governance**: method, latest round, marketability/minority/control/concentration discounts, valuation amount, lendable value, committee and next review.
- **Pledge & Credit**: LTV, haircut, facility, coverage, eligibility, board consent, registration, cross-border enforceability, covenants, margin call and drawdown preconditions.

The page uses native English field names; data is illustrative, and public cases are structural references only — no client relationship is implied.

### M5 Tax optimisation (UHNW, Hong Kong family)
> Demo client: **He Qiming (Example)**, Hong Kong tax resident; BVI HoldCo + HK family office + HK trust. Not M4's Lin Zhe, and not a real person.

1. `#/m5-intake` for the case, five-layer structure and boundaries.
2. `#/m5-profile` for the Nexus map showing residence / entity / account / asset as four separate things.
3. `#/m5-baseline` for the event-level tax map and the effective tax rate.
4. `#/m5-levers` — tick the 10 levers (splitting / treaties / trusts carry the red flags).
5. `#/m5-booking` — compare Hong Kong / Singapore / Cayman / Luxembourg; the Cayman is not “tax-free”.
6. `#/m5-scenarios` — 4 scenarios (baseline / A / B / C), with C as REJECT; the baseline effective rate is about 1.26% (no CGT or dividend tax in HK, so it is mostly stamp duty plus family-office profits tax), and A is about 0.35%.
7. `#/m5-substance` for HK s.61A / FSIE / substance / beneficial ownership / stamp duty / CRS; a WARN needs remediation, and a REJECT never reaches internal review.
8. `#/m5-advisor` for the HSBC PB internal tax opinion and the RM decision; `#/m5-delivery` for the client pack and implementation; `#/m5-review` for the annual review.

**The point to make with the business:** this is not a “tax avoidance trick library”; every lever carries a commercial purpose, substance and reporting; delivery happens only after review by the HSBC PB internal tax team; external counsel support is used only where a formal legal opinion is required.

---

## 3. Role switching (permission demo)

Top-bar `Role` selector (use ☰ in the left nav to collapse / expand):
- **RM**: own clients; tax ID masked; can start proposals / financing / tax optimisation.
- **IC**: allocation / stress / decision card; cannot release orders.
- **Compliance**: full read + approval / unmasking; cannot change orders.
- **Credit**: financing / valuation; cannot see trust distributions.
- **Trustee**: trust structure / budget / tax ledger.
- **Vendor**: sees only the RFP and its own bid; never client names, holdings or other quotes.
- **Client**: client portal; proposals / invitations; the Lin Zhe / He Qiming cases include a trust report; never internal notes, scores or prices.

---

## 4. What is really computed

| Feature | Description |
|---|---|
| TES | `0.25 cost + 0.20 tax + 0.20 time + 0.20 impact + 0.15 ease`, computed live |
| Pledge vs sell | `S = C/[1−t(1−B/V)]`, terminal wealth, break-even `r*`, the −40% scenario, computed live |
| LTV / coverage | `facility = lendable value × LTV`, `coverage = lendable value / facility`, updated live by the slider |
| Trust budget | totals, reserve coverage |
| Everything else | scenarios / stress / backtest / orders / tax are **demonstration data**, not live prices or real models |

---

## 5. Files

| File | Contents |
|---|---|
| `../client-journey.html` | Entry point (role-named) |
| `../assets/hongkong-hsbc-logo-en.svg` | Shared HSBC logo (SVG), used by both entries |
| `styles.css` | Design system (HSBC red / navy / data density) |
| `data.js` | Demo data (clients, proposals, stress, backtest, financing, vendors, valuation, trust, tax) |
| `ui.js` | Components and charts (table/field/donut/bars/lineChart/toast/drawer/modal) |
| `pages.js` | M1 + M2 |
| `pages2.js` | M3 + M4 |
| `pages3.js` | M5 + Client/Vendor/Audit |
| `app.js` | State, routing, shell, events, calculations |
| `check.js` | Business-invariant checks |
| `render-check.js` | Page render smoke test |

---

## 6. Known limitations

- No backend; state persists in localStorage after a refresh (resettable).
- Amounts, tax rates and institutions are illustrative; no live market data, core systems or OMS.
- Client / vendor names and courses are fictional; Lin Zhe / DeepThink are a hypothetical scenario; He Qiming is a fictional individual.
- Charts are a lightweight SVG implementation, not a production charting library.
- Mobile is supported down to 390px; complex tables scroll horizontally.

---

## 7. Relationship to the other entry point

This entry is the **client/advisor journey** (front office): it tells the experience story. The operations layer is [`../rm-workbench.html`](../rm-workbench.html) — 21 pages of business steps, fields, controls and evidence. They share the same objects and numbers, but are not the same product view.

The former Chinese mirror is archived at [`../../archive/2026-10_v1/demo-cn/`](../../archive/2026-10_v1/demo-cn/README.md). The English entry is now the single maintained prototype; route parity with the archived Chinese version is no longer a release requirement.
