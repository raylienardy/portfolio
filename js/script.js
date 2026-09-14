// typing animation
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

// Mobile Navigation Toggler
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

if (navTogglerBtn && aside) {
  navTogglerBtn.addEventListener("click", () => {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
  });
}

// Close mobile nav when clicking a navigation link
const navLinks = document.querySelectorAll(".nav li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    if (aside && aside.classList.contains("open")) {
      aside.classList.remove("open");
      if (navTogglerBtn) navTogglerBtn.classList.remove("open");
    }
  });
});
