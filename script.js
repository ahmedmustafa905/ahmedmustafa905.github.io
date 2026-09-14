const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

// Keep navigation orientation clear as the reader moves through the homepage.
const sectionLinks = [...document.querySelectorAll('.portfolio-home .nav-links a[href^="#"]')];
if (sectionLinks.length) {
  const targets = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scheduled = false;
  const markCurrentSection = () => {
    let current = targets[0];
    for (const target of targets) if (target.getBoundingClientRect().top <= 150) current = target;
    for (const link of sectionLinks) {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(markCurrentSection); } }, { passive: true });
  addEventListener('resize', markCurrentSection);
  markCurrentSection();
}
