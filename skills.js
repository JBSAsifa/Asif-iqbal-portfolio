let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let dotsContainer = document.querySelector(".dots-container");
let autoSlide;
let hideTimeout;

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

// ---------------- TOOLTIP FIX ----------------

// Shared tooltip-box (put <div id="tooltip-box"></div> in HTML)
const tooltipBox = document.getElementById("tooltip-box");

document.querySelectorAll(".tooltip").forEach(el => {
  el.addEventListener("mouseenter", e => {
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

// ---------------- SLIDESHOW CONTROLS ----------------
document.querySelector(".prev").addEventListener("click", () => {
  showSlide(slideIndex - 1);
});
document.querySelector(".next").addEventListener("click", () => {
  showSlide(slideIndex + 1);
});

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
document.querySelector(".slideshow-container").addEventListener("mouseenter", stopAutoSlide);
document.querySelector(".slideshow-container").addEventListener("mouseleave", startAutoSlide);
