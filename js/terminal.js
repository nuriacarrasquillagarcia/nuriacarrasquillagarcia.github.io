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

  document.addEventListener("DOMContentLoaded", () => {
    markActiveNavLink();
    showContentImmediately();
  });
})();
