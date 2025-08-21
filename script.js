// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior:'smooth' });
  });
});

// Menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', ()=>{ nav.classList.toggle('active'); });

// Modal functions
function openModal(id){ document.getElementById(id).style.display='block'; }
function closeModal(id){ document.getElementById(id).style.display='none'; }

// Animate skill bars
window.addEventListener('scroll', ()=>{
  const skills = document.querySelectorAll('.progress-bar div');
  skills.forEach(bar=>{
    bar.style.width = bar.style.width || bar.getAttribute('style');
  });
});
