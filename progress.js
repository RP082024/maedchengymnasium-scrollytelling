/* ==========================================================
   ONEPAGER JAVASCRIPT

   01 — Interaktive Anwendungen erst nach Klick laden
   02 — Optionale Fortschrittsnavigation

   Bildinformationen benötigen kein JavaScript. Sie verwenden
   das native HTML-Element <details>.
   ========================================================== */

(() => {
  "use strict";

  /* ========================================================
     01 — INTERAKTIVE ANWENDUNGEN ERST NACH KLICK LADEN

     Erforderliche HTML-Angaben:
     class="lazy-embed"
     data-embed-url="https://..."
     ======================================================== */

  document.querySelectorAll(".lazy-embed").forEach((container) => {
    const button = container.querySelector(".load-embed");
    const embedUrl = container.dataset.embedUrl;

    if (!button || !embedUrl) return;

    button.addEventListener(
      "click",
      () => {
        const iframe = document.createElement("iframe");

        iframe.src = embedUrl;
        iframe.title =
          button.dataset.iframeTitle || "Interaktive Anwendung";
        iframe.loading = "lazy";
        iframe.className = "embedded-application";
        iframe.setAttribute("allowfullscreen", "");

        container.replaceChildren(iframe);
      },
      { once: true }
    );
  });

  /* ========================================================
     02 — OPTIONALE FORTSCHRITTSNAVIGATION

     Ohne ein Element mit class="story-progress" endet das
     Skript hier. Die Seite funktioniert vollständig ohne
     Navigation.
     ======================================================== */

  const nav = document.querySelector(".story-progress");
  if (!nav) return;

  const hero = document.querySelector(".story-hero");
  const links = [...nav.querySelectorAll("a[data-section]")];
  const sections = links
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);
  const fill = nav.querySelector(".story-progress__fill");

  if (!sections.length || !fill) {
    nav.hidden = true;
    return;
  }

  function setActive(id) {
    links.forEach((link) => {
      const active = link.dataset.section === id;
      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "step");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateNavVisibility() {
    nav.hidden = hero ? hero.getBoundingClientRect().bottom > 0 : false;
  }

  function updateActiveSection() {
    const marker = window.innerHeight * 0.36;
    let current = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) {
        current = section;
      } else {
        break;
      }
    }

    if (current) setActive(current.id);
  }

  function updateProgress() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    const percentage = Math.min(1, Math.max(0, ratio)) * 100;

    fill.style.setProperty("--story-progress", `${percentage}%`);
  }

  let ticking = false;

  function requestUpdate() {
    if (ticking) return;

    window.requestAnimationFrame(() => {
      updateNavVisibility();
      updateActiveSection();
      updateProgress();
      ticking = false;
    });

    ticking = true;
  }

  requestUpdate();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();
