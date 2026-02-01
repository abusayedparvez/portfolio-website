import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

/* ===== Firebase Config ===== */
const firebaseConfig = {
  apiKey: "AIzaSyAjF6qnDJFFLD7h4tJ10e3z4BewCeai1e8",
  authDomain: "parvez-portfolio-64cdd.firebaseapp.com",
  projectId: "parvez-portfolio-64cdd",
  storageBucket: "parvez-portfolio-64cdd.appspot.com",
  messagingSenderId: "17218030818",
  appId: "1:17218030818:web:28da1deb8fcbb2396ce2bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsGrid = document.getElementById("postsGrid");

/* ===== YouTube Thumbnail Helper ===== */
function getThumbnail(url){
  if(!url) return "";
  let id = "";

  if(url.includes("youtu.be/")){
    id = url.split("youtu.be/")[1].split("?")[0];
  }else if(url.includes("v=")){
    id = url.split("v=")[1].split("&")[0];
  }

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/* ===== Load Posts (Realtime) ===== */
onSnapshot(
  query(collection(db,"posts"), orderBy("time","desc")),
  snapshot => {
    postsGrid.innerHTML = "";

    snapshot.forEach(doc => {
      const data = doc.data();

      postsGrid.innerHTML += `
        <div class="post-card">
          ${data.link ? `<img class="post-img" src="${getThumbnail(data.link)}" />` : ""}
          <div class="post-body">
            ${data.title ? `<h3>${data.title}</h3>` : ""}
            ${data.text ? `<p class="post-text">${data.text}</p>` : ""}
          </div>
        </div>
      `;
    });
  }
);

