/* =================================
   NAV TOGGLE
================================= */
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

if(toggle){
  toggle.onclick = () => menu.classList.toggle("open");
}


/* =================================
   SCROLL PROGRESS BAR
================================= */
const bar = document.getElementById("progressBar");

window.addEventListener("scroll",()=>{
  const scrollTop = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const percent = (scrollTop / height) * 100;
  bar.style.width = percent + "%";
});


/* =================================
   NAVBAR SHRINK
================================= */
const header = document.querySelector(".site-header");

window.addEventListener("scroll",()=>{
  if(window.scrollY > 50){
    header.classList.add("shrink");
  }else{
    header.classList.remove("shrink");
  }
});


/* =================================
   REVEAL ANIMATION
================================= */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
    }
  });
},{
  threshold:0.15
});

reveals.forEach(el=>observer.observe(el));


/* =================================
   DARK / LIGHT TOGGLE
================================= */
const themeBtn = document.getElementById("themeToggle");

themeBtn.onclick = ()=>{
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};


/* =================================
   FOOTER YEAR
================================= */
document.getElementById("year").textContent = new Date().getFullYear();


/* =================================
   TYPING EFFECT (Hero Title)
================================= */
const title = document.querySelector(".hero__content h1");

const text = title.innerText;
title.innerText = "";
title.classList.add("typing");

let i = 0;

function type(){
  if(i < text.length){
    title.innerText += text.charAt(i);
    i++;
    setTimeout(type, 40);
  }
}

type();
