document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling pour les ancres avec offset pour la navbar fixe
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Hauteur de la navbar approx
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animation simple à l'apparition (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    /* --- Ambient Light Scroll Reaction (The Fish) --- */
    const ambientLight = document.querySelector('.ambient-light');

    if (ambientLight) {
        let currentScroll = 0;
        let targetScroll = 0;

        // Initial setup
        currentScroll = window.scrollY;

        // Update target on scroll
        window.addEventListener('scroll', () => {
            targetScroll = window.scrollY;
        });

        function animateLight() {
            // "Heavy Lag" Logic for "Light arriving little by little"
            // We use a very low lerp factor (0.04) so the 'ghost' position lags significantly behind the real scroll.

            // 1. Calculate the lag
            const diff = targetScroll - currentScroll;

            // 2. Update current position slowly (This is the fish swimming to catch up)
            currentScroll += diff * 0.04;

            // 3. Calculate Visual Offset
            // When scrolling DOWN (diff > 0), the 'ghost' is ABOVE the viewport center.
            // So we want a NEGATIVE translateY to show it lagging behind (stuck at the top).
            // Example: Scroll 1000px fast. Diff = 1000. Offset ~ -800px.
            // Light goes UP (relative to fixed center), leaving bottom black.

            let offset = -diff * 0.8;

            // 4. Clamp the offset so it doesn't disappear FOREVER, but enough to go off-screen temporarily
            // 80vh is roughly enough to clear the screen
            const maxDrag = window.innerHeight * 0.8;
            const clampedOffset = Math.max(Math.min(offset, maxDrag), -maxDrag);

            // Apply Transform
            ambientLight.style.setProperty('--scroll-offset', `${clampedOffset}px`);

            // 5. Skew Effect (Organic Distortion)
            // Based on the speed of the catch-up
            const skewAmount = Math.max(Math.min(diff * 0.03, 15), -15);
            ambientLight.style.setProperty('--skew-y', `${skewAmount}deg`);

            requestAnimationFrame(animateLight);
        }
        animateLight();
    }
});
