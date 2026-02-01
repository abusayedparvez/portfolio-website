/* ================= FIREBASE POSTS (FINAL) ================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

/* ===== Firebase Config (UNCHANGED) ===== */
const firebaseConfig = {
  apiKey: "AIzaSyAjF6qnDJFFLD7h4tJ10e3z4BewCeai1e8",
  authDomain: "parvez-portfolio-64cdd.firebaseapp.com",
  projectId: "parvez-portfolio-64cdd",
  storageBucket: "parvez-portfolio-64cdd.appspot.com",
  messagingSenderId: "17218030818",
  appId: "1:17218030818:web:28da1deb8fcbb2396ce2bb"
};

/* ===== Init ===== */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===== DOM ===== */
const postsGrid = document.getElementById("postsGrid");

if (!postsGrid) {
  console.warn("postsGrid element not found");
}

/* ===== YouTube Thumbnail Helper ===== */
function getThumbnail(url) {
  if (!url) return "";

  let id = "";

  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    id = url.split("v=")[1].split("&")[0];
  }

  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "";
}

/* ===== Load Posts (Realtime) ===== */
const q = query(collection(db, "posts"), orderBy("time", "desc"));

onSnapshot(q, (snapshot) => {
  if (!postsGrid) return;

  postsGrid.innerHTML = "";

  if (snapshot.empty) {
    postsGrid.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    postsGrid.innerHTML += `
      <div class="post-card">

        ${
          data.link
            ? `<img class="post-img"
                   src="${getThumbnail(data.link)}"
                   alt="Post thumbnail">`
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
                   class="post-btn">
                   ${data.btnText}
                 </a>`
              : ""
          }

        </div>
      </div>
    `;
  });
});
