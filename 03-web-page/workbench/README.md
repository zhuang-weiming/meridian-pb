# HSBC Private Bank · RM Operations Workbench

> 21 pages across five real business problems. Public cases are illustrative; bank figures are demo data. No client relationship is implied.

## Run

```bash
cd meridian-pb
python3 -m http.server 8791
# http://localhost:8791/03-web-page/rm-workbench.html
```

## What is inside

| Module | Pages | What it proves |
|---|---|---|
| **1 · IPO & PB** | IPO & Wealth Event Pipeline · Company & Management · Pre-IPO Valuation · CIB → PB Handoff | CIB/MSS can identify wealth events; PB can follow with consent, wall clearance, KYC and a governed valuation |
| **2 · Estate & Continuity** | Estate Case Portfolio · Estate Case Timeline · Authority & Probate · 12-Month Outcomes | Death is a multi-year process; authority and outcomes can be measured |
| **3 · Family Onboarding** | Family Onboarding · Suitability & Risk · Portfolio Templates · First Investment | Next-gen/spouse onboarding can be low-friction without bypassing suitability |
| **4 · Revenue & Margin** | Revenue & Margin Cockpit · Client P&L · Product P&L · RM Scorecard | Client commission is not margin; revenue, cost and cost-to-serve can be shown together |
| **5 · Order Trust** | Order Monitor · Failure Detail · Recovery Workflow · Order KPI & Trust | Failed trade % can be measured by cause, client impact and RM KPI |

## Data

- Public cases (structural references only, as of 2026-10-26): DeepSeek 2026 round, Mindray / Li Xiting, Lens Technology / Zhou Qunfei, Riverford EOT, Unruly, Mui estate (closed 2026-08-30), FOS DRN-4737924, Lo Family Trust / Tao Soh Ngun [2018] HKCFI 380.
- **Naming policy:** public persons appear only in public-case narratives; account-level rows (orders, onboarding files, client P&L) use fictional demo families — He family, UK creator family, AI founder family, Ashworth family.
- Bank figures are demo data, not HSBC actuals.
- Every page has a `Data note` describing what must be sourced internally and what needs consent (21/21 pages; see `check.js`).
- Public facts carry an as-of date and are reviewed quarterly (the Mui case closed in 2026-08 — public cases go stale).

## User journey mapping

The Workbench is the **operating layer** of the existing journey portfolio, not a replacement for `01-user-journey/`.

| Workbench module | Journey(s) | Operating moment |
|---|---|---|
| IPO & PB | J2 Founder + J6 Family Office | IPO / H-share / secondary / M&A → consent / wall / KYC → valuation / credit / trust |
| Estate & Continuity | J8 Trust | death / probate / estate account / distribution / 12-month outcome |
| Family Onboarding | J1 Family + J4 Women + J7 Core HNW | family / consent / suitability / template / first investment |
| Revenue & Margin | J9 RM + J6 Family Office | client P&L / product P&L / RM scorecard |
| Order Trust | J9 RM + J8 Trust | order lifecycle / failure reason / recovery / RM KPI |

Full mapping and before/after steps:

[`01-user-journey/07-operations-map/11-workbench-journeys.md`](../../01-user-journey/07-operations-map/11-workbench-journeys.md)

## Speaker notes

Every page has a **Speaker notes** button with:

- 中文台词
- English script using Avaloq-style native English terms
- On-screen actions
- Transition to the next page

Offline copy: [`SPEAKER_NOTES.md`](SPEAKER_NOTES.md) (generated from `scripts.js`).

Complete film script (12-min master + 5-min elevator, camera moves, full narration and inner monologue): [`04-video-and-movie/`](../../04-video-and-movie/README.md). Recording helper: add `?record=1` to any workbench URL (hides speaker-notes buttons, sidebar doc links and demo toasts; raises type sizes for video).

## RM capacity benchmark

The RM Scorecard now separates **relationships** from **households** and shows AUM, plus three capacity fields:

- `support_ratio`: support FTE per RM (assistants / product specialists);
- `segment_mix`: UHNW / HNW / family-office share;
- `service_intensity`: annual meetings, trades, trust/estate cases and credit facilities per relationship.

It also shows an illustrative **workload index**:

> `relationships × (0.30 + meetings/20 + trades/50 + trust cases/30 + credit facilities/40) ÷ support_ratio`

Thresholds: under 45 underloaded, 45–65 balanced, 65–85 watch, above 85 overloaded. The formula is a calibration model, not an HR policy. The demo book is 35–51 relationships, 14–24 households and US$420–620m AUM per RM.

Public references:

- Accenture, *The Future of Asia Wealth Management 2025*: affluent-segment RMs often manage 200+ clients, while private-banking RMs typically serve 50–70 clients.  
  https://www.accenture.com/content/dam/accenture/final/accenture-com/document-4/Accenture-Future-of-Asia-Front-Office-Reimagined-2025.pdf
- Goldman Sachs Private Wealth Management: 1:25 advisor-to-client ratio.  
  https://pwm.gs.com/nam/en-us
- Asian Private Banker, *Average private banking book size grew by US$62m in 2025*: average AUM per RM about US$473m.  
  https://asianprivatebanker.com/private-banking-wealth-management/average-private-banking-book-size-grew-by-us62m-in-2025/

Conclusion: 35–51 relationships is **plausible**, not a universal truth; actual capacity depends on HNW vs UHNW, team coverage, product complexity and service model. 51 is at the upper end of a private-banking book; 35–42 is more typical for a UHNW-heavy book.

## Validation

```bash
node check.js
# OK — 21 pages rendered, balanced div stacks, 21 bilingual speaker scripts, RM capacity fields valid, 5 client P&Ls reconciled, order/estate facts coherent.
```

## Relation to the client journey entry

- [`../client-journey.html`](../client-journey.html) is the client/advisor journey: proposal, stress, family, private assets, tax.
- [`../rm-workbench.html`](../rm-workbench.html) is the operations-and-data workbench for the five new initiatives.
- The two share the same design inputs and data conventions but have different purposes: the journey entry tells a story; the workbench shows business steps, fields, controls and metrics. Both live in `03-web-page/`.
