/* ===== Mobile menu toggle ===== */
const toggleBtn = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ===== Smooth scroll & active link ===== */
const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menu?.classList.remove('open');
  });
});

/* Highlight active section */
const sections = document.querySelectorAll('main section[id]');
const linkMap = new Map([...navLinks].map(a => [a.getAttribute('href'), a]));
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const link = linkMap.get('#' + entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(x => x.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
);
sections.forEach(s => observer.observe(s));

/* ===== Reveal on scroll ===== */
const reveals = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(
  entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
  { threshold: 0.12 }
);
reveals.forEach(el => revObs.observe(el));

/* ===== Footer year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Contact form (demo) ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const msg = form.querySelector('textarea[name="message"]').value.trim();
    if (!name || !email || !msg) {
      alert('Please fill all fields.');
      return;
    }
    alert('Thanks! Your message has been recorded (demo).');
    form.reset();
  });
}

/* ===== Close menu on outside click (mobile) ===== */
document.addEventListener('click', (e) => {
  if (!menu || !toggleBtn) return;
  const clickInside = menu.contains(e.target) || toggleBtn.contains(e.target);
  if (!clickInside) menu.classList.remove('open');
});
