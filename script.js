/* =========================
   DOM Ready
========================= */
document.addEventListener("DOMContentLoaded",()=>{

  initReveal();
  initProgressBar();
  initDarkMode();
  initTyping();

});



/* =========================
   Reveal Animation
========================= */
function initReveal(){

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  });

  elements.forEach(el=>observer.observe(el));
}



/* =========================
   Scroll Progress Bar
========================= */
function initProgressBar(){

  const bar = document.getElementById("progressBar");

  window.addEventListener("scroll",()=>{

    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    bar.style.width = (scroll/height)*100 + "%";
  });

}



/* =========================
   Dark Mode
========================= */
function initDarkMode(){

  const toggle = document.getElementById("themeToggle");

  toggle.onclick = ()=>{
    document.body.classList.toggle("dark");
  };

}



/* =========================
   Typing Effect
========================= */
function initTyping(){

  const el = document.querySelector(".hero__tagline");

  if(!el) return;

  const text = el.innerText;

  el.innerText = "";

  let i=0;

  function type(){
    if(i<text.length){
      el.innerText += text[i++];
      setTimeout(type,18);
    }
  }

  type();
}
