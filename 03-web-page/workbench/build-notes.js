/* Generate SPEAKER_NOTES.md from scripts.js. Run: node build-notes.js */
const fs = require("fs");
const SCRIPTS = require("./scripts.js");

const order = [
  "overview",
  "ipo-pipeline", "ipo-company", "ipo-valuation", "ipo-handoff",
  "estate-portfolio", "estate-case", "estate-authority", "estate-outcomes",
  "onboarding-family", "onboarding-suitability", "onboarding-templates", "onboarding-first",
  "revenue-cockpit", "revenue-client", "revenue-product", "revenue-rm",
  "order-monitor", "order-failure", "order-recovery", "order-kpi"
];

let md = `# Operating Workbench — Bilingual Speaker Notes\n\n`;
md += `> Generated from \`scripts.js\`. Public cases are illustrative; bank figures are demo data.\n\n`;
md += `> How to use: open \`03-web-page/rm-workbench.html\`, go to a page, click **Speaker notes**. This document is the offline copy.\n\n---\n\n`;

for (const id of order) {
  const s = SCRIPTS[id];
  if (!s) continue;
  md += `## ${s.title}\n\n`;
  md += `**Route:** \`#/${id}\`\n\n`;
  md += `### 中文台词\n\n${s.cn}\n\n`;
  md += `### English script\n\n${s.en}\n\n`;
  md += `### On screen / 屏幕动作\n\n${s.screen}\n\n`;
  md += `### Transition / 转场\n\n${s.transition}\n\n---\n\n`;
}

fs.writeFileSync("SPEAKER_NOTES.md", md);
console.log(`Wrote SPEAKER_NOTES.md with ${order.length} pages.`);
