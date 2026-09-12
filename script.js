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
