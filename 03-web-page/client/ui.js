const UI = (() => {
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (n, d = 0) => Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  const money = (n, ccy = "USD") => {
    const sign = n < 0 ? "−" : "";
    const v = Math.abs(Number(n));
    const unit = ccy === "USD" ? "$" : ccy + " ";
    if (v >= 1e9) return sign + unit + (v / 1e9).toFixed(2) + "bn";
    if (v >= 1e6) return sign + unit + (v / 1e6).toFixed(1) + "m";
    if (v >= 1e3) return sign + unit + (v / 1e3).toFixed(0) + "k";
    return sign + unit + v.toFixed(0);
  };
  const moneyFull = (n, ccy = "USD") => (n < 0 ? "−" : "") + (ccy === "USD" ? "$" : ccy + " ") + num(Math.abs(n));
  const pct = (n, d = 1) => (n == null ? "—" : Number(n).toFixed(d) + "%");
  const bps = (n) => (n == null ? "—" : Number(n).toFixed(1) + " bps");
  const pill = (text, tone = "gray") => `<span class="pill ${tone}"><span class="dot"></span>${esc(text)}</span>`;
  const stat = (label, value, sub = "", tone = "") => `
    <div class="stat">
      <div class="stat-label">${esc(label)}</div>
      <div class="stat-value">${value}</div>
      ${sub ? `<div class="stat-sub ${tone}">${sub}</div>` : ""}
    </div>`;

  const table = (headers, rows, opts = {}) => {
    const cls = opts.compact ? "tbl compact" : "tbl";
    return `<div class="table-wrap"><table class="${cls}">
      <thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  };

  const field = (o = {}) => {
    const id = o.id || "f-" + Math.random().toString(36).slice(2, 7);
    const full = o.full ? " full" : "";
    const help = o.help ? `<span class="help">${o.help}</span>` : "";
    const suffix = o.suffix ? `<span class="suffix">${o.suffix}</span>` : "";
    let input;
    if (o.type === "select") {
      input = `<select id="${id}" ${o.disabled ? "disabled" : ""}>${(o.options || []).map(x => {
        const val = typeof x === "string" ? x : x.value;
        const lab = typeof x === "string" ? x : x.label;
        return `<option value="${esc(val)}" ${String(val) === String(o.value) ? "selected" : ""}>${esc(lab)}</option>`;
      }).join("")}</select>`;
    } else if (o.type === "textarea") {
      input = `<textarea id="${id}" rows="${o.rows || 3}" ${o.disabled ? "disabled" : ""} placeholder="${esc(o.placeholder || "")}">${esc(o.value || "")}</textarea>`;
    } else {
      input = `<input id="${id}" type="${o.type || "text"}" value="${esc(o.value == null ? "" : o.value)}" ${o.disabled ? "disabled" : ""} placeholder="${esc(o.placeholder || "")}" ${o.min != null ? `min="${o.min}"` : ""} ${o.max != null ? `max="${o.max}"` : ""} ${o.step != null ? `step="${o.step}"` : ""}>`;
    }
    return `<div class="field${full}">
      <label for="${id}">${esc(o.label || "")}${o.req ? ' <span class="req">*</span>' : ""}</label>
      ${suffix ? `<div class="input-row">${input}${suffix}</div>` : input}
      ${help}
    </div>`;
  };

  const pageHead = (o = {}) => `
    <div class="page-head">
      <div>
        ${o.crumb ? `<div class="breadcrumb">${o.crumb}</div>` : ""}
        <h1>${esc(o.title || "")}</h1>
        ${o.sub ? `<p>${o.sub}</p>` : ""}
      </div>
      <div class="page-actions">${o.actions || ""}</div>
    </div>`;

  const donut = (data, centerLabel = "Total", centerValue = "") => {
    const total = data.reduce((a, b) => a + b.w, 0);
    const r = 54, c = 2 * Math.PI * r;
    let offset = 0;
    const segs = data.map(d => {
      const len = (d.w / total) * c;
      const s = `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${d.color}" stroke-width="17"
        stroke-dasharray="${len} ${c - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 80 80)"/>`;
      offset += len;
      return s;
    }).join("");
    return `<div class="donut-wrap">
      <svg class="donut" viewBox="0 0 160 160" role="img" aria-label="allocation">
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#eef0f3" stroke-width="17"/>
        ${segs}
        <text x="80" y="76" text-anchor="middle" font-size="10" fill="#667085">${esc(centerLabel)}</text>
        <text x="80" y="92" text-anchor="middle" font-size="15" font-weight="700" fill="#1b2430">${esc(centerValue)}</text>
      </svg>
      <div class="donut-legend">${data.map(d => `
        <div class="donut-item"><i style="background:${d.color}"></i><span>${esc(d.name)}</span><span class="w">${d.w}%</span></div>`).join("")}
      </div>
    </div>`;
  };

  const bars = (rows, max = 100) => rows.map(r => `
    <div class="bar-row">
      <span>${esc(r.label)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, (r.value / max) * 100))}%;background:${r.color || "var(--blue)"}"></div></div>
      <span class="bar-value">${r.display != null ? r.display : r.value}</span>
    </div>`).join("");

  const lineChart = (series, opts = {}) => {
    const w = 660, h = opts.height || 220, pl = 44, pr = 14, pt = 16, pb = 28;
    const all = series.flatMap(s => s.points);
    const min = opts.min != null ? opts.min : Math.min(...all);
    const max = opts.max != null ? opts.max : Math.max(...all);
    const span = (max - min) || 1;
    const x = (i, n) => pl + (i / Math.max(1, n - 1)) * (w - pl - pr);
    const y = (v) => pt + (1 - (v - min) / span) * (h - pt - pb);
    const grid = [0, .25, .5, .75, 1].map(t => {
      const yy = pt + t * (h - pt - pb);
      const val = max - t * span;
      return `<line x1="${pl}" y1="${yy}" x2="${w - pr}" y2="${yy}" stroke="#eef0f3" stroke-width="1"/>
        <text x="${pl - 6}" y="${yy + 3}" text-anchor="end" font-size="9" fill="#98a2b3">${Math.round(val)}</text>`;
    }).join("");
    const lines = series.map(s => {
      const pts = s.points.map((v, i) => `${x(i, s.points.length).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
      return `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>`;
    }).join("");
    const xLabels = (opts.xLabels || []).map((l, i) => `<text x="${x(i, opts.xLabels.length)}" y="${h - 8}" text-anchor="middle" font-size="9" fill="#98a2b3">${esc(l)}</text>`).join("");
    return `<svg viewBox="0 0 ${w} ${h}" role="img">
      ${grid}${lines}${xLabels}
    </svg>`;
  };

  const toast = (msg, tone = "") => {
    const box = document.getElementById("toasts");
    if (!box) return;
    const el = document.createElement("div");
    el.className = "toast " + tone;
    el.innerHTML = `<span>${esc(msg)}</span>`;
    box.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(4px)"; setTimeout(() => el.remove(), 220); }, 3400);
  };

  const drawer = (title, body, foot = "") => {
    const d = document.getElementById("drawer");
    if (!d) return;
    d.querySelector(".drawer-head h3").textContent = title;
    d.querySelector(".drawer-body").innerHTML = body;
    d.querySelector(".drawer-foot").innerHTML = foot;
    d.classList.add("on");
    document.getElementById("scrim").classList.add("on");
  };
  const closeDrawer = () => {
    document.getElementById("drawer")?.classList.remove("on");
    document.getElementById("scrim")?.classList.remove("on");
  };
  const modal = (title, body, foot = "") => {
    const m = document.getElementById("modal");
    if (!m) return;
    m.querySelector(".modal-head h3").textContent = title;
    m.querySelector(".modal-body").innerHTML = body;
    m.querySelector(".modal-foot").innerHTML = foot;
    m.classList.add("on");
    document.getElementById("scrim").classList.add("on");
  };
  const closeModal = () => {
    document.getElementById("modal")?.classList.remove("on");
    document.getElementById("scrim")?.classList.remove("on");
  };

  const term = (label, key, text) => {
    const d = (typeof DB !== "undefined" && DB.dictionary) ? DB.dictionary.find(x => x.term === key) : null;
    const tip = text || (d ? `${d.term} — ${d.definition}` : "");
    return `<span class="term" title="${esc(tip)}">${label}<span class="term-mark">?</span></span>`;
  };
  return { esc, num, money, moneyFull, pct, bps, pill, term, stat, table, field, pageHead, donut, bars, lineChart, toast, drawer, closeDrawer, modal, closeModal };
})();
