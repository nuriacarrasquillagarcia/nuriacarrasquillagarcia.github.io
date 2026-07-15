/* =========================================================
   PORTFOLIO :: terminal typewriter engine
   Types out .tw-line elements block by block (.tw-block),
   then reveals any .tw-reveal images inside that block.
   Click / press any key to skip the animation.
   ========================================================= */

(function () {
  let skip = false;

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, skip ? 0 : ms));
  }

  async function typeLine(el, speed) {
    const text = el.dataset.text ?? el.textContent;
    el.dataset.text = text;
    el.textContent = "";
    el.classList.add("cursor");

    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await wait(speed);
    }

    el.classList.remove("cursor");
    el.textContent = text;
  }

  async function runTypewriter() {
    const blocks = document.querySelectorAll(".tw-block");

    for (const block of blocks) {
      const lines = block.querySelectorAll(".tw-line");

      for (const line of lines) {
        const speed = Number(line.dataset.speed) || 18;
        await typeLine(line, speed);
      }

      block.querySelectorAll(".tw-reveal").forEach((el) => {
        el.classList.add("visible");
      });

      await wait(150);
    }

    const hint = document.querySelector(".skip-hint");
    if (hint) hint.style.display = "none";
  }

  function markActiveNavLink() {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".dos-nav a").forEach((a) => {
      if (a.getAttribute("href") === current) {
        a.classList.add("active");
      }
    });
  }

  function enableSkip() {
    const skipNow = () => {
      skip = true;
    };
    document.addEventListener("click", skipNow, { once: true });
    document.addEventListener("keydown", skipNow, { once: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    markActiveNavLink();
    enableSkip();
    runTypewriter();
  });
})();
