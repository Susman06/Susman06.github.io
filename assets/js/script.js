/**
 * USMAN NAEEM - PORTFOLIO WEBSITE JAVASCRIPT
 * EmailJS integrated for contact form
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileNav();
    initTypingEffect();
    initCounterAnimation();
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initReadMore();
    initContactForm();
    initFooterYear();
});


// ==========================================
// 1. NAVBAR SCROLL
// ==========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }, { passive: true });
}


// ==========================================
// 2. MOBILE NAV
// ==========================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.querySelector('.mobile-menu'); // ← target mobile-menu, not navLinks
    if (!navToggle || !mobileMenu) return;

    function closeMenu() {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open'); // ← use 'open', not 'active'
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open', isActive); // ← use 'open', not 'active'
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });
}

// ==========================================
// 3. TYPING EFFECT
// ==========================================
function initTypingEffect() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const phrases = [
        'n8n automation workflows',
        'Vapi AI voice agents',
        'Shopify store automations',
        'Zapier integrations',
        'multi-agent scrapers',
        'AI/ML models',
        'HubSpot CRM automations',
        'email classifiers',
        'Stripe payment flows',
        'WordPress content bots',
        'heart disease predictors',
        'gym fitness analyzers'
    ];

    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const phrase = phrases[phraseIndex];
        el.textContent = isDeleting
            ? phrase.substring(0, charIndex - 1)
            : phrase.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === phrase.length) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1000);
}


// ==========================================
// 4. COUNTER ANIMATION
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    };

    // BUG FIX: threshold 0 + check isIntersecting immediately
    // so counters already visible on load still animate
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px' });

    counters.forEach(c => observer.observe(c));
}


// ==========================================
// 5. SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    els.forEach(el => observer.observe(el));
}


// ==========================================
// 6. SKILL BARS
// ==========================================
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}


// ==========================================
// 7. PROJECT FILTERS
// ==========================================
function initProjectFilters() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (!btns.length || !cards.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let idx = 0;

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                const show = filter === 'all' || cat === filter;

                if (show) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50 + idx * 80);
                    idx++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('expanded');

                    const rb = card.querySelector('.read-more-btn');
                    if (rb) {
                        rb.classList.remove('expanded');
                        const s = rb.querySelector('span');
                        if (s) s.textContent = 'Read More';
                    }
                }
            });

            // BUG FIX: use rAF instead of fragile setTimeout for visibility check
            requestAnimationFrame(checkReadMoreVisibility);
        });
    });
}


// ==========================================
// 8. READ MORE TOGGLE
// ==========================================
function initReadMore() {
    const btns = document.querySelectorAll('.read-more-btn');
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const span = btn.querySelector('span');
            if (!card) return;

            const isExpanded = card.classList.toggle('expanded');
            btn.classList.toggle('expanded', isExpanded);
            if (span) span.textContent = isExpanded ? 'Read Less' : 'Read More';

            if (!isExpanded) {
                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            }
        });
    });

    // BUG FIX: rAF ensures DOM has painted before measuring scrollHeight
    requestAnimationFrame(checkReadMoreVisibility);
    window.addEventListener('resize', debounce(checkReadMoreVisibility, 250));
}

function checkReadMoreVisibility() {
    document.querySelectorAll('.project-card:not(.hidden)').forEach(card => {
        const desc = card.querySelector('.project-description');
        const btn  = card.querySelector('.read-more-btn');
        if (!desc || !btn) return;

        btn.style.display = (card.classList.contains('expanded') ||
            desc.scrollHeight > desc.clientHeight + 2)
            ? 'inline-flex'
            : 'none';
    });
}


// ==========================================
// 9. CONTACT FORM — EMAILJS INTEGRATION
// ==========================================
const EMAILJS_PUBLIC_KEY   = "2Z7VhVEFpb-D2BPS_";
const EMAILJS_SERVICE_ID   = "service_d7u2hvf";
const EMAILJS_TEMPLATE_ID  = "template_xcdvq4b";

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    // Live error clearing as user types
    form.querySelectorAll('.form-input').forEach(input => {
        ['input', 'change'].forEach(eventType => {
            input.addEventListener(eventType, () => {
                input.classList.remove('error');
                input.parentElement.classList.remove('show-error');
            });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput    = document.getElementById('name');
        const emailInput   = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn    = document.getElementById('submitBtn');
        const formSuccess  = document.getElementById('formSuccess');

        clearErrors();

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameInput?.value.trim())                              { showError('name');    isValid = false; }
        if (!emailInput?.value.trim() || !emailRegex.test(emailInput.value)) { showError('email');   isValid = false; }
        if (!subjectInput?.value)                                  { showError('subject'); isValid = false; }
        if (!messageInput?.value.trim())                           { showError('message'); isValid = false; }

        if (!isValid) return;

        // Show loading state
        const btnText    = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        const btnArrow   = submitBtn?.querySelector('.btn-arrow');

        if (btnText)    btnText.style.display    = 'none';
        if (btnArrow)   btnArrow.style.display   = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-flex';
        if (submitBtn)  submitBtn.disabled = true;

        const resetBtn = () => {
            if (btnText)    btnText.style.display    = 'inline';
            if (btnArrow)   btnArrow.style.display   = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn)  submitBtn.disabled = false;
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name:  nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            subject:    subjectInput.value,
            message:    messageInput.value.trim(),
            to_name:    'Usman Naeem'
        })
        .then(() => {
            resetBtn();
            if (formSuccess) {
                formSuccess.style.display = 'flex';
                setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
            }
            form.reset();
        })
        .catch((err) => {
            console.error('EmailJS error:', err);
            resetBtn();
            alert('Failed to send message. Please email me directly at osmannaeem05@gmail.com');
        });
    });

    function showError(inputId) {
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.add('error');
            input.parentElement.classList.add('show-error');
        }
    }

    function clearErrors() {
        form.querySelectorAll('.form-input').forEach(i => i.classList.remove('error'));
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('show-error'));
    }
}


// ==========================================
// 10. FOOTER YEAR
// ==========================================
function initFooterYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('#currentYear').forEach(el => {
        el.textContent = year;
    });
}


// ==========================================
// 11. UTILITY: DEBOUNCE
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
