// ✨ Scroll Reveal Animations
ScrollReveal({ 
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  reset: false // animations trigger only once
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

// 🖱 Hover subtle animation for cert icons (smooth scaling)
document.querySelectorAll('.cert-card').forEach(card => {
  const icon = card.querySelector('.icon-circle');
  card.addEventListener('mouseenter', () => {
    icon.style.transition = 'transform 0.3s ease';
    icon.style.transform = 'scale(1.12)';
    card.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease';
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  card.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1)';
    card.style.transform = 'translateY(0) scale(1)';
  });
});

const showMoreBtn = document.querySelector('.show-more-btn');
const moreCards = document.querySelectorAll('.more-card');

showMoreBtn.addEventListener('click', () => {
  moreCards.forEach(card => {
    if (card.style.display === "block") {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });

  showMoreBtn.textContent = 
    showMoreBtn.textContent === "Show More" ? "Show Less" : "Show More";
});


const viewMoreBtn = document.querySelector('.view-more-btn');
const hiddenCerts = document.querySelectorAll('.cert-item.hidden');

viewMoreBtn.addEventListener('click', () => {
  hiddenCerts.forEach(cert => {
    cert.classList.toggle('show');  // toggle show class
  });

  viewMoreBtn.textContent = 
    viewMoreBtn.textContent === "View More" ? "View Less" : "View More";
});
