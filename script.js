/* =====================================================
   MOBILE NAVIGATION (Accessible & Clean)
===================================================== */
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

/*
 🔴 যদি ভবিষ্যতে menu item বেশি হয়,
 mobile menu automatically scrollable করতে CSS ব্যবহার করবেন
*/

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / height) * 100;
  progressBar.style.width = percent + "%";
});

/* =====================================================
   REVEAL ON SCROLL (Micro-Interaction)
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
   LIVE VISITOR COUNTER (LocalStorage)
===================================================== */
/*
  🔬 Logic explanation:
  - First visit → count = 1
  - Every refresh → increment
  - Lightweight & fast
  - Firebase daily/monthly analytics পরে সহজে যোগ করা যাবে
*/

const visitorEl = document.getElementById("visitorCount");

if (visitorEl) {
  let visits = localStorage.getItem("portfolio_visits");
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem("portfolio_visits", visits);
  visitorEl.textContent = visits;
}

/*
 🔴 চাইলে এখানে Firebase Firestore দিয়ে:
 - daily visits
 - monthly visits
 - unique users
 যোগ করা যাবে
*/

/* =====================================================
   FIREBASE POSTS (UNCHANGED CORE LOGIC)
===================================================== */
/*
 ⚠️ সতর্কতা:
 Firebase config / logic intentionally untouched
 শুধুমাত্র container id (#postsGrid) এর সাথে match করা হয়েছে
*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjF6qnDJFFLD7h4tJ10e3z4BewCeai1e8",
  authDomain: "parvez-portfolio-64cdd.firebaseapp.com",
  projectId: "parvez-portfolio-64cdd",
  storageBucket: "parvez-portfolio-64cdd.firebasestorage.app",
  messagingSenderId: "17218030818",
  appId: "1:17218030818:web:28da1deb8fcbb2396ce2bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsGrid = document.getElementById("postsGrid");

/* ===== YouTube Thumbnail Helper ===== */
function getThumbnail(url) {
  if (!url) return "";

  let id = "";

  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    id = url.split("v=")[1].split("&")[0];
  }

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/* ===== Load Posts (Realtime) ===== */
const postsQuery = query(
  collection(db, "posts"),
  orderBy("time", "desc")
);

onSnapshot(postsQuery, (snapshot) => {
  postsGrid.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    postsGrid.innerHTML += `
      <article class="post-card">
        ${
          data.link
            ? `<img src="${getThumbnail(data.link)}"
                   alt="Post thumbnail"
                   class="post-img" />`
            : ""
        }

        <div class="post-body">
          ${data.title ? `<h3>${data.title}</h3>` : ""}
          ${data.text ? `<p class="post-text">${data.text}</p>` : ""}
          ${
            data.link && data.btnText
              ? `<a href="${data.link}"
                   target="_blank"
                   rel="noopener"
                   class="btn btn--sm">${data.btnText}</a>`
              : ""
          }
        </div>
      </article>
    `;
  });
});

/*
 =====================================================
  🔴 IMAGE / CONTENT CHANGE GUIDE (Bangla)
 =====================================================
  1) Profile ছবি পরিবর্তন:
     → index.html এ profile.jpg replace করুন

  2) Hero background / Bio-tech look:
     → style.css এর .hero section এ gradient / image বদলান

  3) Project thumbnail:
     → project1.jpg replace করুন (16:9 রাখবেন)

  4) Posts image:
     → Firebase post এ YouTube link থাকলেই auto thumbnail আসবে
*/
