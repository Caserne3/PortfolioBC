/**
 * include.js — Charge dynamiquement le header et le footer partagés.
 * Après le chargement, initialise le burger menu et le dropdown mobile.
 */
(function () {
    const headerEl = document.getElementById('header-placeholder');
    const footerEl = document.getElementById('footer-placeholder');

    const promises = [];

    if (headerEl) {
        promises.push(
            fetch('/includes/header.html')
                .then(r => r.text())
                .then(html => { headerEl.outerHTML = html; })
        );
    }

    if (footerEl) {
        promises.push(
            fetch('/includes/footer.html')
                .then(r => r.text())
                .then(html => { footerEl.outerHTML = html; })
        );
    }

    // Une fois header et footer chargés, initialiser la navigation
    Promise.all(promises).then(() => {
        initNavigation();
    });

    function initNavigation() {
        // Burger menu
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');

        if (burger && nav) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
            });

            // Fermer le menu mobile au clic sur un lien
            document.querySelectorAll('.nav-links li').forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                    }
                });
            });
        }

        // Dropdown mobile
        const dropdownTrigger = document.querySelector('.dropdown-trigger');
        const dropdownContainer = document.querySelector('.dropdown-container');

        if (dropdownTrigger && dropdownContainer) {
            dropdownTrigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownContainer.classList.toggle('active');

                    const icon = dropdownTrigger.querySelector('i');
                    if (icon) {
                        icon.style.transform = dropdownContainer.classList.contains('active')
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)';
                    }
                }
            });
        }
    }
})();
