
// Mobile menu toggle
const navBtn = document.getElementById('navBtn');
const nav = document.getElementById('nav');
if (navBtn && nav) {
  navBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Slider
const slider = document.getElementById('slider');
if (slider) {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsWrap = document.getElementById('dots');

  let idx = 0;
  let timer;

  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach(s => s.classList.remove('is-active'));
    slides[idx].classList.add('is-active');
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.dot').forEach((d, j) => {
        d.classList.toggle('active', j === idx);
        d.setAttribute('aria-current', j === idx ? 'true' : 'false');
      });
    }
  }

  function nextSlide() { go(idx + 1); }
  function prevSlide() { go(idx - 1); }

  function startAuto() { stopAuto(); timer = setInterval(nextSlide, 5000); }
  function stopAuto() { if (timer) clearInterval(timer); }

  // Dots
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'dot';
      b.type = 'button';
      b.addEventListener('click', () => { go(i); startAuto(); });
      dotsWrap.appendChild(b);
    });
  }

  if (prev && next) {
    prev.addEventListener('click', () => { prevSlide(); startAuto(); });
    next.addEventListener('click', () => { nextSlide(); startAuto(); });
  }

  // Init
  go(0); startAuto();

  // Pause on hover/focus
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);
}

// YouTube card: open video in a new tab to avoid embed restrictions
const yt = document.getElementById('ytOpen');
if (yt) {
  yt.addEventListener('click', () => {
    window.open('https://www.youtube.com/watch?v=hv90QD-e_zw', '_blank', 'noopener,noreferrer');
  });
}
