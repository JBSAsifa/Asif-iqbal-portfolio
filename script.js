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
window.addEventListener("scroll", function () {
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
  rootMargin: "0px 0px -20px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      // Don't remove the visible class to prevent content from disappearing
      // entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in, .fade-in-right").forEach((el) => {
  observer.observe(el);
});

// Experience Section - Show More/Less Functionality
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.querySelector(".show-more-btn");
  const moreCards = document.querySelectorAll(".more-card");

  if (showMoreBtn && moreCards.length > 0) {
    // Initially hide the more cards
    moreCards.forEach((card) => {
      card.style.display = "none";
    });

    showMoreBtn.addEventListener("click", () => {
      moreCards.forEach((card) => {
        if (card.style.display === "none") {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      showMoreBtn.textContent =
        showMoreBtn.textContent === "Show More" ? "Show Less" : "Show More";
    });
  }
});

// Skills Section - Slideshow and Tooltip Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Skills slideshow functionality
  let slideIndex = 0;
  let slides = document.getElementsByClassName("slide");
  let dotsContainer = document.querySelector(".dots-container");
  let autoSlide;
  let hideTimeout;

  // Only initialize if skills section exists
  if (slides.length > 0 && dotsContainer) {
    // Create dots dynamically
    for (let i = 0; i < slides.length; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    }

    // Show slide function
    function showSlide(n) {
      if (n >= slides.length) n = 0;
      if (n < 0) n = slides.length - 1;
      slideIndex = n;

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (let i = 0; i < dotsContainer.children.length; i++) {
        dotsContainer.children[i].classList.remove("active");
      }

      slides[slideIndex].style.display = "block";
      dotsContainer.children[slideIndex].classList.add("active");
    }

    // Navigation arrows
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => showSlide(slideIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => showSlide(slideIndex + 1));
    }

    // Auto slideshow
    function startAutoSlide() {
      autoSlide = setInterval(() => {
        showSlide(slideIndex + 1);
      }, 4000);
    }
    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    // Start slideshow
    showSlide(slideIndex);
    startAutoSlide();

    // Pause on hover
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
      slideshowContainer.addEventListener("mouseenter", stopAutoSlide);
      slideshowContainer.addEventListener("mouseleave", startAutoSlide);
    }
  }

  // Tooltip functionality
  const tooltipBox = document.getElementById("tooltip-box");
  if (tooltipBox) {
    document.querySelectorAll(".tooltip").forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        clearTimeout(hideTimeout);
        tooltipBox.textContent = el.getAttribute("data-desc");
        tooltipBox.classList.add("show");
        tooltipBox.classList.remove("clicked"); // reset pin mode
        positionTooltip(el);
      });

      el.addEventListener("mousemove", () => {
        if (tooltipBox.classList.contains("show")) positionTooltip(el);
      });

      el.addEventListener("mouseleave", () => {
        // Hide with delay only if not pinned
        if (!tooltipBox.classList.contains("clicked")) {
          hideTimeout = setTimeout(() => {
            tooltipBox.classList.remove("show");
          }, 1500);
        }
      });
    });

    // Positioning function
    function positionTooltip(el) {
      const rect = el.getBoundingClientRect();
      let top = rect.bottom + 10;
      let left = rect.left + rect.width / 2 - tooltipBox.offsetWidth / 2;

      if (top + tooltipBox.offsetHeight > window.innerHeight) {
        top = rect.top - tooltipBox.offsetHeight - 10;
      }
      if (left < 10) left = 10;
      if (left + tooltipBox.offsetWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipBox.offsetWidth - 10;
      }

      tooltipBox.style.top = `${top}px`;
      tooltipBox.style.left = `${left}px`;
    }

    // Keep tooltip visible if clicked (PIN mode)
    tooltipBox.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent outside click
      tooltipBox.classList.add("clicked");
      tooltipBox.classList.add("show");
    });

    // Close tooltip when clicking outside
    document.addEventListener("click", (e) => {
      if (!tooltipBox.contains(e.target)) {
        tooltipBox.classList.remove("show");
        tooltipBox.classList.remove("clicked");
      }
    });
  }
});

// Projects Section - Filter Functionality
document.addEventListener("DOMContentLoaded", function () {
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card");

  if (filters.length > 0 && cards.length > 0) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;

        cards.forEach((card, index) => {
          if (category === "all" || card.classList.contains(category)) {
            setTimeout(() => {
              card.style.display = "block";
              setTimeout(() => card.classList.add("show"), 10);
            }, index * 50);
          } else {
            card.classList.remove("show");
            setTimeout(() => (card.style.display = "none"), 300);
          }
        });
      });
    });

    // Initialize all cards as shown
    setTimeout(() => {
      cards.forEach((card) => card.classList.add("show"));
    }, 100);
  }
});

// Research Section - Filter Functionality
function filter(category) {
  let cards = document.querySelectorAll(".card");
  document
    .querySelectorAll(".filters button")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  cards.forEach((c) => {
    if (category === "all" || c.classList.contains(category)) {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  });
}

/* ========================================
     awards and certificates page scripts
     ======================================== */
// ✨ Scroll Reveal Animations
ScrollReveal({
  distance: "50px",
  duration: 1000,
  easing: "ease-in-out",
  reset: false,
});
ScrollReveal().reveal(".section-header", {
  origin: "top",
  distance: "40px",
  duration: 1000,
  delay: 100,
});

ScrollReveal().reveal(".section-title", {
  origin: "top",
  distance: "40px",
  duration: 1000,
});

ScrollReveal().reveal(".section-intro", {
  origin: "bottom",
  distance: "40px",
  duration: 1200,
  delay: 200,
});

ScrollReveal().reveal(".sub-title", {
  origin: "left",
  distance: "30px",
  duration: 1000,
  delay: 150,
});

ScrollReveal().reveal(".timeline-item", {
  origin: "left",
  distance: "50px",
  interval: 200,
  duration: 1000,
});

ScrollReveal().reveal(".cert-card", {
  origin: "bottom",
  distance: "50px",
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

const viewMoreBtn = document.querySelector(".view-more-btn");
const hiddenCerts = document.querySelectorAll(".cert-item.hidden");

if (viewMoreBtn && hiddenCerts.length > 0) {
  viewMoreBtn.addEventListener("click", () => {
    console.log("View More button clicked");
    hiddenCerts.forEach((cert, index) => {
      console.log(`Toggling cert ${index}:`, cert);
      cert.classList.toggle("show"); // toggle show class
      cert.classList.toggle("hidden"); // also toggle hidden class
    });

    viewMoreBtn.textContent =
      viewMoreBtn.textContent === "View More" ? "View Less" : "View More";
  });
}

// this is for research publication page
function filter(category) {
  let cards = document.querySelectorAll(".card");
  document
    .querySelectorAll(".filters button")
    .forEach((b) => b.classList.remove("active"));
  event.target.classList.add("active");
  cards.forEach((c) => {
    if (category === "all" || c.classList.contains(category)) {
      c.style.display = "block";
    } else {
      c.style.display = "none";
    }
  });
}

/* ========================================
  skills page scripts
   ======================================== */

/* ========================================
  Smooth scrolling navigation
   ======================================== */
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header
        const headerHeight =
          document.querySelector(".sticky-header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update active nav link
        navLinks.forEach((navLink) => navLink.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id], div[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active");
          if (navLink.getAttribute("href") === `#${sectionId}`) {
            navLink.classList.add("active");
          }
        });
      }
    });
  });
});

/* ========================================
  Contact form functionality
   ======================================== */
document.addEventListener("DOMContentLoaded", function () {
  // Contact form functionality
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Simulate form submission
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Update year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
