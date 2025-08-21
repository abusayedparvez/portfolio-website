/* =======================================
   SCRIPT.JS
   Professional Interactive JS for Portfolio
========================================== */

/* =========================
   Smooth Scrolling for Navbar
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

/* =========================
   Navbar Scroll Shadow & Active Link
========================= */
const navbar = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight Active Section Link
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === '#' + sectionId){
                    link.classList.add('active');
                }
            });
        }
    });
});

/* =========================
   Navbar Mobile Toggle
========================= */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });
}

/* =========================
   Hero Section Animation
========================= */
const heroText = document.querySelector('.hero h1');
const heroSub = document.querySelector('.hero p');
const heroImg = document.querySelector('.hero img');

window.addEventListener('load', () => {
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
    heroSub.style.opacity = '1';
    heroSub.style.transform = 'translateY(0)';
    heroImg.style.opacity = '1';
    heroImg.style.transform = 'scale(1)';
});

/* =========================
   Reveal on Scroll (Sections)
========================= */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if(elementTop < windowHeight - revealPoint){
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

/* =========================
   Project Card Hover Animation
========================= */
const projectCards = document.querySelectorAll('.projects .project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.03)';
        card.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

/* =========================
   Contact Form Validation
========================= */
const contactForm = document.querySelector('.contact form');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();

        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector('textarea[name="message"]');

        if(name.value === '' || email.value === '' || message.value === ''){
            alert('Please fill all fields before submitting!');
            return false;
        } else {
            alert('Thank you! Your message has been sent.');
            this.reset();
        }
    });
}

/* =========================
   Scroll to Top Button
========================= */
const scrollBtn = document.createElement('div');
scrollBtn.classList.add('scroll-top');
scrollBtn.innerHTML = '&#8679;';
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 400){
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});

/* =========================
   Fancy Typing Effect (Optional)
========================= */
const typedText = document.querySelector('.typed-text');
if(typedText){
    const words = ["Content Creator", "Pharmacy Student", "YouTuber", "Health & Science Explainer"];
    let i = 0, j = 0, currentWord = '', isDeleting = false;

    function type(){
        if(i >= words.length) i = 0;
        currentWord = words[i];
        if(isDeleting){
            typedText.textContent = currentWord.substring(0, j--);
            if(j < 0){
                isDeleting = false;
                i++;
            }
        } else {
            typedText.textContent = currentWord.substring(0, j++);
            if(j > currentWord.length){
                isDeleting = true;
            }
        }
        setTimeout(type, isDeleting ? 80 : 150);
    }

    type();
}
