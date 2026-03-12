let lastScrollY = window.scrollY;
const nav = document.querySelector('.mobile-nav');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        nav.classList.add('go-down');
    } else {
        nav.classList.remove('go-down');
    }
    lastScrollY = currentScrollY;
});