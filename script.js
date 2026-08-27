const header = document.querySelector('#site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const navLinks = navigation.querySelectorAll('a');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  header.classList.toggle('menu-active', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelector('#year').textContent = new Date().getFullYear();