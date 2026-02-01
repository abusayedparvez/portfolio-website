/* =====================================================
   NAVBAR TOGGLE (Mobile Hamburger Menu)
===================================================== */
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

/* Close menu when clicking a link (mobile UX) */
document.querySelectorAll(".nav__menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = (scrollTop / docHeight) * 100;
  progressBar.style.width = percent + "%";
});

/* =====================================================
   REVEAL ON SCROLL (Intersection Observer)
===================================================== */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => revealObserver.observe(el));

/* =====================================================
   FOOTER YEAR AUTO UPDATE
===================================================== */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* =====================================================
   SAFE GUARD (No crash if something missing)
===================================================== */
window.addEventListener("error", (e) => {
  console.warn("Non-critical JS warning:", e.message);
});
