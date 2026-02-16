/*=============== SCROLL REVEAL ANIMATION ===============*/

setTimeout(() => {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 300,
        reset: false
    });

    // Home section animations - staggered cascade
    sr.reveal('.home__badge', { delay: 100, origin: 'left', distance: '30px' });
    sr.reveal('.home__subtitle', { delay: 200 });
    sr.reveal('.home__title', { delay: 350, distance: '40px' });
    sr.reveal('.home__education-wrapper', { delay: 450 });
    sr.reveal('.home__description', { delay: 550 });
    sr.reveal('.home__buttons', { delay: 650, origin: 'bottom', distance: '30px' });
    sr.reveal('.home__social', { delay: 750, origin: 'bottom' });
    sr.reveal('.home__image', { delay: 500, origin: 'right', distance: '80px' });

    // About section animations
    sr.reveal('.about__data .section__subtitle', { origin: 'left' });
    sr.reveal('.about__data .section__title', { origin: 'left', delay: 100 });
    sr.reveal('.about__description', { origin: 'left', delay: 200 });
    sr.reveal('.about__info', { origin: 'left', delay: 300 });
    sr.reveal('.about__info-item', { interval: 150, origin: 'bottom', distance: '30px' });
    sr.reveal('.about__image', { origin: 'right', delay: 400 });

    // Experience section animations
    sr.reveal('.experience .section__subtitle');
    sr.reveal('.experience .section__title', { delay: 100 });
    sr.reveal('.experience__item', {
        origin: 'left',
        interval: 300,
        distance: '80px'
    });

    // Skills section animations
    sr.reveal('.skills__data', { origin: 'left' });
    sr.reveal('.skills__category', {
        origin: 'bottom',
        interval: 150,
        distance: '40px'
    });

    // Projects section animations
    sr.reveal('.projects .section__subtitle');
    sr.reveal('.projects .section__title', { delay: 100 });
    sr.reveal('.projects__card', {
        origin: 'bottom',
        interval: 300,
        distance: '60px'
    });

    // Services section animations
    sr.reveal('.services .section__subtitle');
    sr.reveal('.services .section__title', { delay: 100 });
    sr.reveal('.services__card', {
        origin: 'bottom',
        interval: 150,
        distance: '40px'
    });

    // Contact section animations
    sr.reveal('.contact .section__subtitle');
    sr.reveal('.contact .section__title', { delay: 100 });
    sr.reveal('.contact__info-card', {
        origin: 'top',
        interval: 150,
        distance: '30px'
    });
    sr.reveal('.contact__form', {
        origin: 'bottom',
        delay: 300,
        distance: '50px'
    });

    // Footer animations
    sr.reveal('.footer__title', { origin: 'left' });
    sr.reveal('.footer__education', { origin: 'left', delay: 100 });
    sr.reveal('.footer__social', { delay: 200 });
    sr.reveal('.footer__copy', { origin: 'right', delay: 300 });

}, 200);

/*=============== COUNTER ANIMATION ===============*/
const animateCounters = () => {
    const counters = document.querySelectorAll('.about__info-title');

    const animateCounter = (counter) => {
        const target = counter.textContent;
        const numericValue = parseFloat(target);

        if (isNaN(numericValue)) return;

        const duration = 2000;
        const startTime = Date.now();
        const suffix = target.replace(/[0-9.]/g, '');

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = numericValue * easeOut;

            if (target.includes('.')) {
                counter.textContent = current.toFixed(1) + suffix;
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
};

// Initialize counter animation when DOM is ready
document.addEventListener('DOMContentLoaded', animateCounters);

/*=============== SKILL TAGS STAGGERED ANIMATION ===============*/
const animateSkillTags = () => {
    const categories = document.querySelectorAll('.skills__category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skills__tag');
                tags.forEach((tag, index) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateY(10px) scale(0.95)';
                    setTimeout(() => {
                        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0) scale(1)';
                    }, index * 60);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    categories.forEach(cat => observer.observe(cat));
};

document.addEventListener('DOMContentLoaded', animateSkillTags);

/*=============== SMOOTH SCROLL FOR ANCHOR LINKS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

/*=============== MAGNETIC BUTTON EFFECT ===============*/
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn, .home__social-link, .footer__social-link, .nav__resume-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.3s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
        });
    });
};

document.addEventListener('DOMContentLoaded', initMagneticButtons);

/*=============== TILT EFFECT FOR CARDS ===============*/
const initTiltEffect = () => {
    const cards = document.querySelectorAll('.services__card, .about__info-item, .contact__info-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
};

document.addEventListener('DOMContentLoaded', initTiltEffect);

/*=============== PARALLAX GRADIENT ORBS ===============*/
const initParallax = () => {
    const orbs = document.querySelectorAll('.home__gradient-orb');
    const homeBlob = document.querySelector('.home__blob');

    if (orbs.length > 0 || homeBlob) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2);
            const moveY = (e.clientY - window.innerHeight / 2);

            // Parallax on gradient orbs with different speeds
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.008;
                orb.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });

            // Subtle parallax on profile image
            if (homeBlob) {
                homeBlob.style.transform = `translate(${moveX * 0.01}px, ${moveY * 0.01}px)`;
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', initParallax);

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const initNavHighlight = () => {
    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'color 0.3s ease, background-color 0.3s ease';
        });
    });
};

document.addEventListener('DOMContentLoaded', initNavHighlight);

/*=============== EXPERIENCE TAGS STAGGER ===============*/
const animateExperienceTags = () => {
    const items = document.querySelectorAll('.experience__item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.experience__tag');
                tags.forEach((tag, index) => {
                    tag.style.opacity = '0';
                    tag.style.transform = 'translateX(-10px)';
                    setTimeout(() => {
                        tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateX(0)';
                    }, 600 + (index * 80));
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));
};

document.addEventListener('DOMContentLoaded', animateExperienceTags);
