document.getElementById('year').textContent = new Date().getFullYear();

// Keep the one-page site pleasant on keyboard and touch devices without adding
// a framework or a runtime dependency.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});

const sponsorRotation = document.querySelector('[data-sponsor-rotation]');

if (sponsorRotation) {
  const sponsors = [...sponsorRotation.querySelectorAll('.ad-space-product')];
  let activeSponsor = 0;

  window.setInterval(() => {
    sponsors[activeSponsor].classList.remove('is-active');
    sponsors[activeSponsor].setAttribute('aria-hidden', 'true');
    sponsors[activeSponsor].inert = true;

    activeSponsor = (activeSponsor + 1) % sponsors.length;
    sponsors[activeSponsor].classList.add('is-active');
    sponsors[activeSponsor].setAttribute('aria-hidden', 'false');
    sponsors[activeSponsor].inert = false;
  }, 8000);
}

const partyFrame = document.querySelector('.party-spotlight-art');
const partyVideo = partyFrame && partyFrame.querySelector('video');
const partyHoverable = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
const partyStillMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (partyVideo) {
  let hovering = false;
  const reveal = () => partyFrame.classList.add('is-ready');
  const start = () => {
    reveal();
    partyFrame.classList.add('is-live');
    partyVideo.currentTime = 0;
    partyVideo.play().catch(() => {});
  };
  const stop = () => {
    partyFrame.classList.remove('is-live');
    partyVideo.pause();
    partyVideo.currentTime = 0;
  };

  ['loadeddata', 'canplay'].forEach((event) => partyVideo.addEventListener(event, reveal, { once: true }));

  if (partyStillMotion.matches) {
    reveal();
  } else if (partyHoverable.matches) {
    partyFrame.addEventListener('mouseenter', () => { hovering = true; start(); });
    partyFrame.addEventListener('mouseleave', () => { hovering = false; stop(); });
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (hovering) start();
      } else {
        stop();
      }
    }, { threshold: 0.15 }).observe(partyFrame);
  } else {
    reveal();
    partyVideo.play().catch(() => {});
  }
}
