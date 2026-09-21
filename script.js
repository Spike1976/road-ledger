const menuButton = document.querySelector('.menu-button');
const mainNav = document.querySelector('#main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('#year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});
