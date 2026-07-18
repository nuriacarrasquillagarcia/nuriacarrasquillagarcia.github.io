/* =========================================================
   PORTFOLIO :: terminal typewriter engine
   Types out .tw-line elements block by block (.tw-block),
   then reveals any .tw-reveal images inside that block.
   Click / press any key to skip the animation.
   ========================================================= */

(function () {
  function markActiveNavLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".dos-nav a").forEach((a) => {
      if (a.getAttribute("href") === current) {
        a.classList.add("active");
      }
    });
  }

  function showContentImmediately() {
    document.querySelectorAll(".tw-line").forEach((el) => {
      const text = el.dataset.text ?? el.innerHTML;
      el.dataset.text = text;
      el.innerHTML = text;
      el.classList.remove("cursor");
    });

    document.querySelectorAll(".tw-reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }

  function restoreClickedLinks() {
    document.querySelectorAll("a").forEach((link) => {
      if (link.closest(".dos-nav") || link.closest("h1")) {
        return;
      }
      if (link.closest(".menu-list")) {
        const isGalleryLink = link.getAttribute("href") === "projects.html" || link.getAttribute("data-i18n") === "home.viewAll";
        if (isGalleryLink) {
          return;
        }
      }
      const href = link.getAttribute("href");
      const text = link.innerText.trim();
      if (!href) return;
      const key = `clicked_link_${href}_${text}`;
      if (localStorage.getItem(key) === "true") {
        link.classList.add("clicked");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    markActiveNavLink();
    showContentImmediately();
    restoreClickedLinks();
    if (window.applyAllAccents) {
      window.applyAllAccents();
    }
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) {
      if (link.closest(".dos-nav") || link.closest("h1")) {
        return;
      }
      if (link.closest(".menu-list")) {
        const isGalleryLink = link.getAttribute("href") === "projects.html" || link.getAttribute("data-i18n") === "home.viewAll";
        if (isGalleryLink) {
          return;
        }
      }
      link.classList.add("clicked");
      const href = link.getAttribute("href");
      const text = link.innerText.trim();
      if (href) {
        const key = `clicked_link_${href}_${text}`;
        try {
          localStorage.setItem(key, "true");
        } catch (err) {}
      }
    }
  });
})();
