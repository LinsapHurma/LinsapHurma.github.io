(() => {
  const S = window.SITE, F = window.FEATURES;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Язык: общий с главной страницей ---
  const store = {
    get: () => { try { return localStorage.getItem("lang"); } catch { return null; } },
    set: (v) => { try { localStorage.setItem("lang", v); } catch {} },
  };
  const valid = (l) => l && Object.prototype.hasOwnProperty.call(S.languages, l);
  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = valid(fromUrl) ? fromUrl : valid(store.get()) ? store.get() : S.defaultLang;
  const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v[S.defaultLang] : v);
  const ui = (key) => tr(F.ui[key] ?? S.ui[key]) ?? key;

  $("logo-name").textContent = S.name.toLowerCase();
  $("foot-name").textContent = S.name;
  $("year").textContent = new Date().getFullYear();

  $("lang").innerHTML = Object.entries(S.languages)
    .map(([code, label]) => `<button data-l="${code}" lang="${code}">${esc(label)}</button>`)
    .join("");
  $("lang").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.dataset.l === lang) return;
    lang = b.dataset.l;
    store.set(lang);
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    render();
  });

  const fileUrl = (path) => `${F.repo.url}/blob/${F.repo.branch}/${path.split("/").map(encodeURIComponent).join("/")}`;
  const ext = (path) => (path.match(/\.([A-Za-z]+)$/) || [, ""])[1].toLowerCase();

  function render() {
    document.documentElement.lang = lang;
    document.title = ui("f.title");
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
    document.querySelectorAll("#lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));

    $("toc").innerHTML =
      `<span class="mono toc-h">${esc(ui("f.toc"))}</span>` +
      F.items.map((it, i) => `<a href="#${esc(it.id)}"><span class="mono">${String(i + 1).padStart(2, "0")}</span> ${esc(tr(it.title))}</a>`).join("");

    $("features").innerHTML = F.items
      .map((it, i) => `
      <article class="feature section" id="${esc(it.id)}">
        <h2><a class="anchor" href="#${esc(it.id)}"><span class="mono num">${String(i + 1).padStart(2, "0")}.</span></a> ${esc(tr(it.title))}</h2>
        <div class="feature-body ${it.gif ? "" : "no-media"}">
          ${it.gif ? `<a class="media" href="${esc(it.gif)}" target="_blank" rel="noopener"><img src="${esc(it.gif)}" alt="${esc(tr(it.title))}" loading="lazy" width="640" height="360"></a>` : ""}
          <div class="feature-text">
            <p>${esc(tr(it.text))}</p>
            <h3 class="mono code-h">${esc(ui("f.code"))}</h3>
            <ul class="files mono">
              ${it.files
                .map((p) => {
                  const slash = p.lastIndexOf("/");
                  return `<li><a href="${esc(fileUrl(p))}" target="_blank" rel="noopener" class="ext-${esc(ext(p))}"><span class="dir">${esc(p.slice(0, slash + 1))}</span><span class="file">${esc(p.slice(slash + 1))}</span></a></li>`;
                })
                .join("")}
            </ul>
          </div>
        </div>
      </article>`)
      .join("");

    const rev = (s) => [...s].reverse().join("");
    $("links").innerHTML = S.links
      .map((l) => {
        const url = l.email ? "mailto:" + l.email.map(rev).join("@") : l.url;
        return `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${esc(tr(l.label))} ↗</a>`;
      })
      .join("");

    // Keep the #hash target in view after re-render
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }
  render();
  // Images change the layout while loading: land on the #section again once they are in
  // (behavior "instant": a smooth scroll started during load gets cancelled by the layout shifts)
  const toHash = () => { if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" }); };
  addEventListener("load", () => { toHash(); setTimeout(toHash, 300); });

  // --- Фон, как на главной ---
  const cv = $("bg"), ctx = cv.getContext("2d");
  let W, H, mx = -999, my = -999;
  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; });
  resize();
  const gap = 28;
  const draw = (time) => {
    ctx.clearRect(0, 0, W, H);
    for (let x = gap / 2; x < W; x += gap)
      for (let y = gap / 2; y < H; y += gap) {
        const k = Math.max(0, 1 - Math.hypot(x - mx, y - my) / 180);
        const w = reduce ? 0 : Math.sin(x * 0.02 + y * 0.015 + time * 0.0008) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(${Math.round(80 + 120 * k)},${Math.round(255 - 40 * k)},${Math.round(200 + 55 * k)},${0.07 + 0.08 * w + 0.6 * k})`;
        const r = 1 + 1.6 * k;
        ctx.fillRect(x - r / 2, y - r / 2, r, r);
      }
    if (!reduce) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
})();
