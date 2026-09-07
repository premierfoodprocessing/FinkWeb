document.getElementById('year').textContent = new Date().getFullYear();

// Keep the one-page site pleasant on keyboard and touch devices without adding
// a framework or a runtime dependency.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});
