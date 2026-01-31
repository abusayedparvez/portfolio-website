/* ======================================
   NAV TOGGLE
====================================== */

const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

if(toggle){
  toggle.onclick = () => menu.classList.toggle("open");
}


/* ======================================
   SCROLL REVEAL ANIMATION
====================================== */

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


/* ======================================
   FOOTER YEAR AUTO
====================================== */

const year = document.getElementById("year");
if(year){
  year.textContent = new Date().getFullYear();
}


/* ======================================
   SMOOTH SCROLL
====================================== */

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});
