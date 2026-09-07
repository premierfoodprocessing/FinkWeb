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
