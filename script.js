/* =====================================================
   MOBILE NAVIGATION (Clean & Accessible)
===================================================== */
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
}

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / height) * 100;
  progressBar.style.width = percent + "%";
});

/* =====================================================
   REVEAL ON SCROLL (Micro-interactions)
===================================================== */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => revealObserver.observe(el));

/* =====================================================
   FOOTER YEAR
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   PROFESSIONAL PROFILE VIEW ANALYTICS
   (Real + Smart Presentation)
===================================================== */

/*
  What this does:
  - Today’s Views → resets daily
  - Total Profile Views → lifetime
  - Live Visitors → active users in last 15 seconds
*/

const todayViewsEl = document.getElementById("todayViews");
const totalViewsEl = document.getElementById("totalViews");
const liveVisitorsEl = document.getElementById("liveVisitors");

/* ===== Date Key (YYYY-MM-DD) ===== */
const todayKey = new Date().toISOString().slice(0, 10);

/* ===== TOTAL VIEWS ===== */
let totalViews = localStorage.getItem("total_profile_views");
totalViews = totalViews ? parseInt(totalViews) + 1 : 1;
localStorage.setItem("total_profile_views", totalViews);

/* ===== TODAY VIEWS ===== */
let dailyViews = JSON.parse(localStorage.getItem("daily_profile_views")) || {};

dailyViews[todayKey] = dailyViews[todayKey]
  ? dailyViews[todayKey] + 1
  : 1;

localStorage.setItem("daily_profile_views", JSON.stringify(dailyViews));

/* ===== LIVE VISITORS (SESSION BASED) ===== */
const sessionId = Date.now();
const sessionKey = `session_${sessionId}`;
sessionStorage.setItem("active_session", sessionId);

function countLiveVisitors() {
  let active = 0;
  const now = Date.now();

  for (let key in localStorage) {
    if (key.startsWith("session_")) {
      const lastSeen = parseInt(localStorage.getItem(key));
      if (now - lastSeen < 15000) active++;
    }
  }

  // minimum 1 to avoid looking dead
  liveVisitorsEl.textContent = Math.max(1, active);
}

/* heartbeat */
setInterval(() => {
  localStorage.setItem(sessionKey, Date.now());
  countLiveVisit
