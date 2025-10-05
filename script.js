/* ========================================
   home page scripts
   ======================================== */
// Typing Animation
(function () {
  const phrases = [
    "Senior Assessment Developer",
    "AI/ML Researcher",
    "NLP Specialist",
    "Tech Innovator",
  ];
  const el = document.getElementById("role");
  const TYPING_SPEED = 70,
    DELETING_SPEED = 40,
    PAUSE_AFTER = 1800;
  let phraseIndex = 0,
    charIndex = 0,
    isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        setTimeout(() => {
          isDeleting = true;
          tick();
        }, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 200);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }
  setTimeout(tick, 800);
})();

// Sticky Header on Scroll
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in, .fade-in-right").forEach((el) => {
  observer.observe(el);
});




/* ========================================
   awards and certificates page scripts
   ======================================== */
// ✨ Scroll Reveal Animations
ScrollReveal({ 
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  reset: true, 
});
ScrollReveal().reveal('.section-header', {
  origin: 'top',
  distance: '40px',
  duration: 1000,
  delay: 100
});

ScrollReveal().reveal('.section-title', {
  origin: 'top',
  distance: '40px',
  duration: 1000,
});

ScrollReveal().reveal('.section-intro', {
  origin: 'bottom',
  distance: '40px',
  duration: 1200,
  delay: 200,
});

ScrollReveal().reveal('.sub-title', {
  origin: 'left',
  distance: '30px',
  duration: 1000,
  delay: 150,
});

ScrollReveal().reveal('.timeline-item', {
  origin: 'left',
  distance: '50px',
  interval: 200,
  duration: 1000,
});

ScrollReveal().reveal('.cert-card', {
  origin: 'bottom',
  distance: '50px',
  interval: 150,
  duration: 1000,
});

// // 🖱 Hover subtle animation for cert icons (smooth scaling)
// document.querySelectorAll('.cert-card').forEach(card => {
//   const icon = card.querySelector('.icon-circle');
//   card.addEventListener('mouseenter', () => {
//     icon.style.transition = 'transform 0.3s ease';
//     icon.style.transform = 'scale(1.12)';
//     card.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
//     card.style.transform = 'translateY(-10px) scale(1.02)';
//   });
//   card.addEventListener('mouseleave', () => {
//     icon.style.transform = 'scale(1)';
//     card.style.transform = 'translateY(0) scale(1)';
//   });
// });



const viewMoreBtn = document.querySelector('.view-more-btn');
const hiddenCerts = document.querySelectorAll('.cert-item.hidden');

viewMoreBtn.addEventListener('click', () => {
  hiddenCerts.forEach(cert => {
    cert.classList.toggle('show');  // toggle show class
  });

  viewMoreBtn.textContent = 
    viewMoreBtn.textContent === "View More" ? "View Less" : "View More";
});

// this is for research publication page
function filter(category){
      let cards=document.querySelectorAll('.card');
      document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
      event.target.classList.add('active');
      cards.forEach(c=>{
        if(category==='all' || c.classList.contains(category)){
          c.style.display='block';
        } else {
          c.style.display='none';
        }
      });
    }
    

    /* ========================================
  skills page scripts
   ======================================== */
