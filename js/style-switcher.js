//================= Toggle style switcher =================
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
if (styleSwitcherToggler) {
  styleSwitcherToggler.addEventListener("click", () => {
    const styleSwitcher = document.querySelector(".style-switcher");
    if (styleSwitcher) {
      styleSwitcher.classList.toggle("open");
    }
  });
}

// hide style - switcher on scroll
window.addEventListener("scroll", () => {
  const styleSwitcher = document.querySelector(".style-switcher");
  if (styleSwitcher && styleSwitcher.classList.contains("open")) {
    styleSwitcher.classList.remove("open");
  }
});

//================= theme colors =================
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

//================= theme light and dark mode =================
const dayNight = document.querySelector(".day-night");
if (dayNight) {
  dayNight.addEventListener("click", () => {
    const icon = dayNight.querySelector("i, svg");
    if (icon) {
      icon.classList.toggle("fa-sun");
      icon.classList.toggle("fa-moon");
    }
    document.body.classList.toggle("dark");
  });
}

window.addEventListener("load", () => {
  if (dayNight) {
    const icon = dayNight.querySelector("i, svg");
    if (document.body.classList.contains("dark")) {
      if (icon) {
        icon.classList.add("fa-sun");
        icon.classList.remove("fa-moon");
      }
    } else {
      if (icon) {
        icon.classList.add("fa-moon");
        icon.classList.remove("fa-sun");
      }
    }
  }
});
