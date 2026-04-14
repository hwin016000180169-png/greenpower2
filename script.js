document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load Animations (Hero Section)
    setTimeout(() => {
        const heroSection = document.querySelector('.sec-hero');
        if(heroSection) {
            heroSection.classList.add('is-loaded');
        }
    }, 100);

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // 3. Number Counter Animation
    const animateCounters = (section) => {
        const counters = section.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (counter.classList.contains('counted')) return; // flag to prevent recount
            
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const fps = 60;
            const inc = target / (duration / (1000 / fps));
            let current = 0;

            const updateCounter = () => {
                current += inc;
                if (current < target) {
                    counter.innerText = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                    counter.classList.add('counted');
                }
            };
            
            updateCounter();
        });
    };

    // 4. Scroll Reveal with Intersection Observer
    const revElements = document.querySelectorAll('.anim-ele');
    
    const obsOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // trigger when 15% from bottom
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                
                // Trigger stats counter
                if (entry.target.classList.contains('sec-stats')) {
                    animateCounters(entry.target);
                }
                
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, obsOptions);

    revElements.forEach(el => observer.observe(el));
});
