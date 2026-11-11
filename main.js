(() => {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Язык: ?lang=ja в адресе > сохранённый выбор > основной язык ---
  const store = {
    get: () => { try { return localStorage.getItem("lang"); } catch { return null; } },
    set: (v) => { try { localStorage.setItem("lang", v); } catch {} },
  };
  const valid = (l) => l && Object.prototype.hasOwnProperty.call(S.languages, l);
  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = valid(fromUrl) ? fromUrl : valid(store.get()) ? store.get() : S.defaultLang;

  // Текст или {en, ja, ru} -> строка на текущем языке (запасной — основной язык)
  const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v[S.defaultLang] : v);
  const ui = (key) => tr(S.ui[key]) ?? key;

  // --- Постоянное (не зависит от языка) ---
  ["hero-name", "foot-name"].forEach((id) => ($(id).textContent = S.name));
  $("logo-name").textContent = S.name.toLowerCase();
  $("year").textContent = new Date().getFullYear();
  $("skills").innerHTML = S.skills.map((s) => `<li>${esc(s)}</li>`).join("");

  // --- Переключатель ---
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

  // --- Проекты + фильтр ---
  const hue = (str) => [...str].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  const cover = (p, title) =>
    p.image
      ? `<img src="${esc(p.image)}" alt="${esc(title)}" loading="lazy">`
      : `<div class="gen" style="--h:${hue(title)}"><span class="mono">${esc(title.slice(0, 2).toUpperCase())}</span></div>`;
  const tags = ["*", ...new Set(S.projects.flatMap((p) => p.tags))];
  let active = "*";

  const renderFilters = () =>
    ($("filters").innerHTML = tags
      .map((tg) => `<button class="mono ${tg === active ? "on" : ""}" data-t="${esc(tg)}">${esc(tg === "*" ? ui("filter.all") : tg)}</button>`)
      .join(""));
  const renderGrid = () =>
    ($("grid").innerHTML = S.projects
      .filter((p) => active === "*" || p.tags.includes(active))
      .map((p) => {
        const title = tr(p.title);
        const ext = /^(https?:|mailto:)/.test(p.link) || /\.(png|jpe?g|webp|gif)$/i.test(p.link);
        return `
      <a class="card" href="${esc(p.link)}" ${ext ? 'target="_blank" rel="noopener"' : ""}>
        <div class="cover">${cover(p, title)}</div>
        <div class="body">
          <div class="meta mono"><span>${esc(p.tags.join(" · "))}</span><span>${esc(p.year)}</span></div>
          <h3>${esc(title)}</h3>
          <p>${esc(tr(p.desc))}</p>
        </div>
      </a>`;
      })
      .join(""));
  $("filters").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    active = b.dataset.t;
    renderFilters();
    renderGrid();
  });

  // --- Печатающийся текст (роли меняются вместе с языком) ---
  const typed = $("typed");
  let ri = 0, ci = 0, del = false, timer;
  const roles = () => tr(S.roles);
  const tick = () => {
    const list = roles(), word = list[ri % list.length];
    ci += del ? -1 : 1;
    typed.textContent = [...word].slice(0, ci).join("");
    let d = del ? 35 : 70;
    if (!del && ci >= [...word].length) { del = true; d = 1600; }
    else if (del && ci <= 0) { del = false; ri = (ri + 1) % list.length; d = 300; }
    timer = setTimeout(tick, d);
  };
  const restartTyping = () => {
    clearTimeout(timer);
    ri = 0; ci = 0; del = false;
    if (reduce) typed.textContent = roles()[0];
    else tick();
  };

  // --- Всё, что зависит от языка ---
  function render() {
    document.documentElement.lang = lang;
    document.title = `${S.name} — ${ui("title")}`;
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
    document.querySelectorAll("#lang button").forEach((b) => b.classList.toggle("on", b.dataset.l === lang));
    $("hero-lead").textContent = tr(S.lead);
    $("about-text").innerHTML = tr(S.about).map((p) => `<p>${esc(p)}</p>`).join("");
    const rev = (s) => [...s].reverse().join("");
    $("links").innerHTML = S.links
      .map((l) => {
        const url = l.email ? "mailto:" + l.email.map(rev).join("@") : l.url;
        return `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">${esc(tr(l.label))} ↗</a>`;
      })
      .join("");
    $("term").innerHTML =
      `<span class="p">$</span> whoami\n${esc(S.name)}\n` +
      `<span class="p">$</span> cat info.txt\n` +
      Object.entries(S.terminal)
        .map(([k, v]) => `${esc(k.padEnd(8))}: ${k === "status" ? `<span class="ok">${esc(tr(v))}</span>` : esc(tr(v))}`)
        .join("\n") + "\n" +
      `<span class="p">$</span> <span class="caret">_</span>`;
    renderFilters();
    renderGrid();
    restartTyping();
  }
  render();

  // --- Фон: сетка точек, реагирующая на курсор ---
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
        const d = Math.hypot(x - mx, y - my);
        const k = Math.max(0, 1 - d / 180);
        const w = reduce ? 0 : Math.sin(x * 0.02 + y * 0.015 + time * 0.0008) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(${Math.round(80 + 120 * k)},${Math.round(255 - 40 * k)},${Math.round(200 + 55 * k)},${0.07 + 0.08 * w + 0.6 * k})`;
        const r = 1 + 1.6 * k;
        ctx.fillRect(x - r / 2, y - r / 2, r, r);
      }
    if (!reduce) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
})();
