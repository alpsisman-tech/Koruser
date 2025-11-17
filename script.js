/* ============================================================
   FULLSCREEN MOBILE MENU
   ============================================================ */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}



/* ============================================================
   SCROLL REVEAL EFFECT
   ============================================================ */

const animated = document.querySelectorAll(".animate");

function revealOnScroll() {
  animated.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);



/* ============================================================
   PARALLAX HERO (subtle, premium)
   ============================================================ */

let lastScroll = 0;

function parallaxLoop() {
  const scrollY = window.scrollY;

  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.08}px)`;
  }

  requestAnimationFrame(parallaxLoop);
}

requestAnimationFrame(parallaxLoop);



/* ============================================================
   YOUTUBE DEMO BUTTON
   ============================================================ */

const playVideo = document.getElementById("playVideo");

if (playVideo) {
  playVideo.addEventListener("click", () => {
    window.open("https://www.youtube.com/watch?v=hv90QD-e_zw", "_blank");
  });
}



/* ============================================================
   SECRET THEME TOGGLER (TRIPLE TAP BOTTOM-LEFT)
   ============================================================ */

let tapCount = 0;
let tapTimeout;

const hotspot = document.getElementById("themeHotspot");
if (hotspot) {
  hotspot.addEventListener("click", () => {
    tapCount++;

    clearTimeout(tapTimeout);
    tapTimeout = setTimeout(() => tapCount = 0, 350);

    if (tapCount >= 3) {
      toggleTheme();
      tapCount = 0;
    }
  });
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");

  if (current === "light") {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("koruser-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("koruser-theme", "light");
  }
}



/* ============================================================
   LOAD SAVED THEME PREFERENCE
   ============================================================ */

(function loadTheme() {
  const saved = localStorage.getItem("koruser-theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();
/* ============================================================
   CONTACT FORM -> EMAIL COMPOSE (uk@koruser.com)
   ============================================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const TO = "uk@koruser.com";

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name  = document.getElementById("c-name")?.value?.trim()  || "";
    const email = document.getElementById("c-email")?.value?.trim() || "";
    const subj  = document.getElementById("c-subj")?.value?.trim()  || "Koruser website contact";
    const msg   = document.getElementById("c-msg")?.value?.trim()   || "";

    const body = `From: ${name} <${email}>\n\n${msg}`;

    // Gmail compose URL
    const gmailURL =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TO)}&su=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;

    // Fallback mailto URL
    const mailtoURL =
      `mailto:${encodeURIComponent(TO)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;

    // Try opening Gmail in a new tab; fallback to mailto if blocked
    const opened = window.open(gmailURL, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = mailtoURL;
    }
  });
}
