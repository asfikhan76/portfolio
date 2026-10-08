document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
    links.querySelectorAll("a").forEach(a =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  const roles = document.getElementById("typed");
  if (roles) {
    const list = JSON.parse(roles.dataset.roles || '[]');
    let r = 0, i = 0, del = false;
    const tick = () => {
      const word = list[r];
      if (!del) {
        i++;
        if (i === word.length) { del = true; setTimeout(tick, 1400); return; }
      } else {
        i--;
        if (i === 0) { del = false; r = (r + 1) % list.length; }
      }
      roles.textContent = word.slice(0, i);
      setTimeout(tick, del ? 32 : 72);
    };
    tick();
  }
});