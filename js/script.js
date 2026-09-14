try {
  if (typeof Typed !== "undefined" && document.querySelector(".typing")) {
    var typed = new Typed(".typing", {
      strings: [
        "Full-Stack Web Developer",
        "Full-Stack Mobile Developer",
        "AI/ML Integrator",
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
    });
  }
} catch (e) {}

const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navTogglerBtn && aside) {
  navTogglerBtn.addEventListener("click", () => {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav li a"));
const sections = Array.from(document.querySelectorAll("section[id]"));
let scrollAnimationFrame = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function cancelScrollAnimation() {
  if (scrollAnimationFrame !== null) {
    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration) {
  if (duration === undefined) duration = 550;
  const clamped = Math.max(
    0,
    Math.min(
      targetY,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  );
  // if (prefersReducedMotion()) {
  //   window.scrollTo(0, clamped);
  //   return;
  // }
  cancelScrollAnimation();
  const startY = window.scrollY || window.pageYOffset;
  const diff = clamped - startY;
  if (Math.abs(diff) < 1) return;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const p = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(p);
    window.scrollTo(0, startY + diff * eased);
    if (p < 1) {
      scrollAnimationFrame = requestAnimationFrame(step);
    } else {
      scrollAnimationFrame = null;
    }
  }
  scrollAnimationFrame = requestAnimationFrame(step);
}

["wheel", "keydown"].forEach(function (evt) {
  window.addEventListener(
    evt,
    function (e) {
      if (e.type === "keydown") {
        const keys = [
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
          " ",
        ];
        if (keys.indexOf(e.key) === -1) return;
      }
      cancelScrollAnimation();
    },
    { passive: true },
  );
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const targetY =
      target.getBoundingClientRect().top +
      (window.scrollY || window.pageYOffset);
    smoothScrollTo(targetY, 550);
    try {
      history.pushState(null, "", href);
    } catch (err) {}
    if (aside && aside.classList.contains("open")) {
      aside.classList.remove("open");
      if (navTogglerBtn) navTogglerBtn.classList.remove("open");
    }
  });
});

if (sections.length > 0 && navLinks.length > 0) {
  let ticking = false;
  let currentActive = null;

  function updateActive() {
    let activeId = sections[0].id;
    const offset = window.innerHeight * 0.35;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top - offset <= 0) {
        activeId = sections[i].id;
      } else {
        break;
      }
    }
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2
    ) {
      activeId = sections[sections.length - 1].id;
    }
    if (activeId !== currentActive) {
      currentActive = activeId;
      navLinks.forEach(function (link) {
        const isActive = link.getAttribute("href") === "#" + activeId;
        link.classList.toggle("active", isActive);
      });
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateActive);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateActive();
}

// Ambil semua link internal (sidebar, tombol, logo, dll)
const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

internalLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // href="#" → scroll ke paling atas
    if (href === "#") {
      e.preventDefault();
      smoothScrollTo(0, 550);
      try {
        history.pushState(null, "", href);
      } catch (err) {}
      if (aside && aside.classList.contains("open")) {
        aside.classList.remove("open");
        if (navTogglerBtn) navTogglerBtn.classList.remove("open");
      }
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const targetY =
      target.getBoundingClientRect().top +
      (window.scrollY || window.pageYOffset);
    smoothScrollTo(targetY, 550);

    try {
      history.pushState(null, "", href);
    } catch (err) {}

    // Tutup sidebar hanya kalau yang diklik adalah link di menu nav
    if (this.closest(".nav") && aside && aside.classList.contains("open")) {
      aside.classList.remove("open");
      if (navTogglerBtn) navTogglerBtn.classList.remove("open");
    }
  });
});
