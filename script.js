document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.getElementById("header");
    const mainNav = document.querySelector(".main-nav");
    const navItems = Array.from(document.querySelectorAll(".main-nav .nav-item"));
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileClose = document.getElementById("mobileClose");
    const mobileItems = Array.from(document.querySelectorAll(".mobile-item"));
    const heroSlider = document.querySelector(".hero-slider");
    const heroSlides = Array.from(document.querySelectorAll("[data-slide]"));
    const heroDots = Array.from(document.querySelectorAll(".hero-dot"));
    const heroArrows = Array.from(document.querySelectorAll(".hero-arrow"));
    const heroProgress = document.querySelector(".hero-progress span");
    const scrollButtons = Array.from(document.querySelectorAll("[data-scroll-target]"));
    const revealItems = Array.from(document.querySelectorAll(".reveal"));
    const businessPanels = Array.from(document.querySelectorAll("[data-panel]"));
    const newsTrack = document.getElementById("newsTrack");
    const newsButtons = Array.from(document.querySelectorAll("[data-news-direction]"));
    const ctaStack = document.getElementById("ctaStack");
    const desktopNavQuery = window.matchMedia("(min-width: 1101px)");

    let heroIndex = 0;
    let heroTimer = null;
    const heroDelay = Number(heroSlider?.dataset.autoplay || 6500);

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    function syncHeaderState() {
        const isTop = window.scrollY < 40;
        header.classList.toggle("is-scrolled", !isTop);
        header.dataset.tone = isTop ? (heroSlides[heroIndex]?.dataset.header || "light") : "dark";
    }

    function resetHeroProgress() {
        if (!heroProgress) {
            return;
        }

        heroProgress.style.transition = "none";
        heroProgress.style.transform = "scaleX(0)";
        void heroProgress.offsetWidth;
        heroProgress.style.transition = `transform ${heroDelay}ms linear`;
        heroProgress.style.transform = "scaleX(1)";
    }

    function startHeroAutoplay() {
        if (heroSlides.length < 2) {
            return;
        }

        window.clearTimeout(heroTimer);
        resetHeroProgress();
        heroTimer = window.setTimeout(() => {
            setHeroSlide(heroIndex + 1);
        }, heroDelay);
    }

    function setHeroSlide(nextIndex) {
        heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;

        heroSlides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === heroIndex);
        });

        heroDots.forEach((dot, index) => {
            const isActive = index === heroIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-selected", String(isActive));
        });

        syncHeaderState();
        startHeroAutoplay();
    }

    function openMobileMenu() {
        setDesktopNavState(false);
        body.classList.add("menu-open");
        header.classList.add("is-menu-open");
        mobileMenu.classList.add("is-open");
        mobileMenu.setAttribute("aria-hidden", "false");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    function closeMobileMenu() {
        body.classList.remove("menu-open");
        header.classList.remove("is-menu-open");
        mobileMenu.classList.remove("is-open");
        mobileMenu.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        syncHeaderState();
    }

    function setDesktopNavState(isOpen, activeItem = null) {
        if (!desktopNavQuery.matches || body.classList.contains("menu-open")) {
            header.classList.remove("is-nav-open");
            navItems.forEach((item) => item.classList.remove("is-active"));
            return;
        }

        header.classList.toggle("is-nav-open", isOpen);
        navItems.forEach((item) => {
            item.classList.toggle("is-active", isOpen && item === activeItem);
        });
    }

    function animateCounter(counter) {
        if (counter.dataset.counted === "true") {
            return;
        }

        counter.dataset.counted = "true";
        const target = Number(counter.dataset.target || "0");
        const decimals = Number.isInteger(target) ? 0 : 1;
        const duration = 1600;
        const startTime = performance.now();

        function update(now) {
            const progress = clamp((now - startTime) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            counter.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toString();

            if (progress < 1) {
                window.requestAnimationFrame(update);
            } else {
                counter.textContent = decimals ? target.toFixed(decimals) : target.toString();
            }
        }

        window.requestAnimationFrame(update);
    }

    function updateNewsButtons() {
        if (!newsTrack || !newsButtons.length) {
            return;
        }

        const maxScroll = newsTrack.scrollWidth - newsTrack.clientWidth - 2;
        newsButtons.forEach((button) => {
            const direction = button.dataset.newsDirection;
            if (direction === "prev") {
                button.disabled = newsTrack.scrollLeft <= 4;
            } else {
                button.disabled = newsTrack.scrollLeft >= maxScroll;
            }
        });
    }

    function updateCtaProgress() {
        if (!ctaStack || window.innerWidth <= 900) {
            ctaStack?.style.setProperty("--stack-progress", "0");
            return;
        }

        const start = ctaStack.offsetTop;
        const distance = ctaStack.offsetHeight - window.innerHeight;
        const progress = distance > 0 ? clamp((window.scrollY - start) / distance, 0, 1) : 0;

        ctaStack.style.setProperty("--stack-progress", progress.toFixed(4));
    }

    heroDots.forEach((dot) => {
        dot.addEventListener("click", () => {
            setHeroSlide(Number(dot.dataset.slideIndex || 0));
        });
    });

    heroArrows.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.dataset.direction === "prev" ? -1 : 1;
            setHeroSlide(heroIndex + direction);
        });
    });

    scrollButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.scrollTarget || "");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    menuToggle?.addEventListener("click", () => {
        if (mobileMenu.classList.contains("is-open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileClose?.addEventListener("click", closeMobileMenu);

    mobileMenu?.addEventListener("click", (event) => {
        if (event.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    mobileItems.forEach((item) => {
        const toggle = item.querySelector(".mobile-item__toggle");
        toggle?.addEventListener("click", () => {
            const isOpen = item.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });
    });

    if (mainNav) {
        navItems.forEach((item) => {
            item.addEventListener("mouseenter", () => setDesktopNavState(true, item));
            item.addEventListener("focusin", () => setDesktopNavState(true, item));
        });

        header.addEventListener("mouseleave", () => setDesktopNavState(false));
        header.addEventListener("focusout", () => {
            window.setTimeout(() => {
                if (!header.contains(document.activeElement)) {
                    setDesktopNavState(false);
                }
            }, 0);
        });
    }

    businessPanels.forEach((panel, index) => {
        const activatePanel = () => {
            if (window.innerWidth <= 1100) {
                return;
            }

            businessPanels.forEach((item, itemIndex) => {
                item.classList.toggle("is-active", itemIndex === index);
            });
        };

        panel.addEventListener("mouseenter", activatePanel);
        panel.addEventListener("focusin", activatePanel);
    });

    newsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!newsTrack) {
                return;
            }

            const direction = button.dataset.newsDirection === "prev" ? -1 : 1;
            const step = Math.max(newsTrack.clientWidth * 0.82, 320);
            newsTrack.scrollBy({ left: step * direction, behavior: "smooth" });
        });
    });

    newsTrack?.addEventListener("scroll", updateNewsButtons, { passive: true });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            entry.target.querySelectorAll(".counter").forEach(animateCounter);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
    });

    revealItems.forEach((item) => revealObserver.observe(item));

    let ticking = false;
    const handleFrame = () => {
        syncHeaderState();
        updateCtaProgress();
        ticking = false;
    };

    function requestFrameUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(handleFrame);
    }

    window.addEventListener("scroll", requestFrameUpdate, { passive: true });
    window.addEventListener("resize", () => {
        if (!desktopNavQuery.matches) {
            setDesktopNavState(false);
        }
        updateNewsButtons();
        updateCtaProgress();
        syncHeaderState();
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            setDesktopNavState(false);
        }
    });

    syncHeaderState();
    updateNewsButtons();
    updateCtaProgress();
    startHeroAutoplay();
});
