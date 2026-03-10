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
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}


// ==========================================
// 2. MOBILE NAV
// ==========================================
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


// ==========================================
// 3. TYPING EFFECT
// ==========================================
function initTypingEffect() {
    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;

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

    let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 80;

    function type() {
        const phrase = phrases[phraseIndex];
        if (isDeleting) {
            typedTextElement.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 40;
        } else {
            typedTextElement.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 80;
        }
        if (!isDeleting && charIndex === phrase.length) {
            isDeleting = true;
            speed = 2000;
        }
        if (isDeleting && charIndex === 0) {
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
    if (counters.length === 0) return;

    const animate = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}


// ==========================================
// 5. SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-fade-up');
    if (els.length === 0) return;
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
    if (bars.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') + '%';
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
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    if (btns.length === 0 || cards.length === 0) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            let idx = 0;

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    const delay = idx * 80;
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50 + delay);
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
            setTimeout(checkReadMoreVisibility, 200);
        });
    });
}


// ==========================================
// 8. READ MORE TOGGLE
// ==========================================
function initReadMore() {
    const btns = document.querySelectorAll('.read-more-btn');
    if (btns.length === 0) return;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const span = btn.querySelector('span');
            if (!card) return;

            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                btn.classList.remove('expanded');
                if (span) span.textContent = 'Read More';
                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            } else {
                card.classList.add('expanded');
                btn.classList.add('expanded');
                if (span) span.textContent = 'Read Less';
            }
        });
    });

    setTimeout(checkReadMoreVisibility, 300);
    window.addEventListener('resize', debounce(checkReadMoreVisibility, 250));
}

function checkReadMoreVisibility() {
    document.querySelectorAll('.project-card:not(.hidden)').forEach(card => {
        const desc = card.querySelector('.project-description');
        const btn = card.querySelector('.read-more-btn');
        if (!desc || !btn) return;

        if (!card.classList.contains('expanded')) {
            btn.style.display = (desc.scrollHeight > desc.clientHeight + 2) ? 'inline-flex' : 'none';
        } else {
            btn.style.display = 'inline-flex';
        }
    });
}


// ==========================================
// 9. CONTACT FORM — EMAILJS INTEGRATION
// ==========================================
/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  REPLACE THESE 3 VALUES WITH YOUR EMAILJS KEYS     ║
 * ║                                                      ║
 * ║  1. Go to emailjs.com → Account → Public Key        ║
 * ║  2. Go to Email Services → Your Service ID          ║
 * ║  3. Go to Email Templates → Your Template ID        ║
 * ╚══════════════════════════════════════════════════════╝
 */
const EMAILJS_PUBLIC_KEY = "2Z7VhVEFpb-D2BPS_";       // ← Replace this
const EMAILJS_SERVICE_ID = "service_d7u2hvf";       // ← Replace this
const EMAILJS_TEMPLATE_ID = "template_xcdvq4b";     // ← Replace this


function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Initialize EmailJS with your public key
    // Only initialize if emailjs is loaded (contact page only)
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get all form field elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const formSuccess = document.getElementById('formSuccess');

        // Clear any previous error states
        clearErrors();

        // ---- VALIDATION ----
        let isValid = true;

        // Check name is not empty
        if (!nameInput.value.trim()) {
            showError('name');
            isValid = false;
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError('email');
            isValid = false;
        }

        // Check subject is selected
        if (!subjectInput.value) {
            showError('subject');
            isValid = false;
        }

        // Check message is not empty
        if (!messageInput.value.trim()) {
            showError('message');
            isValid = false;
        }

        // ---- IF VALID, SEND EMAIL ----
        if (isValid) {
            // Show loading state on button
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const btnArrow = submitBtn.querySelector('.btn-arrow');

            if (btnText) btnText.style.display = 'none';
            if (btnArrow) btnArrow.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Prepare the data to send
            // These variable names MUST match your EmailJS template
            const templateParams = {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                subject: subjectInput.value,
                message: messageInput.value.trim(),
                to_name: "Usman Naeem"
            };

            // ====== SEND EMAIL VIA EMAILJS ======
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    // ---- SUCCESS ----
                    console.log('Email sent successfully!', response.status);

                    // Reset button to normal
                    if (btnText) btnText.style.display = 'inline';
                    if (btnArrow) btnArrow.style.display = 'inline';
                    if (btnLoading) btnLoading.style.display = 'none';
                    submitBtn.disabled = false;

                    // Show success message
                    if (formSuccess) formSuccess.style.display = 'flex';

                    // Clear the form
                    form.reset();

                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        if (formSuccess) formSuccess.style.display = 'none';
                    }, 5000);

                })
                .catch(function(error) {
                    // ---- ERROR ----
                    console.error('Email failed to send:', error);

                    // Reset button
                    if (btnText) btnText.style.display = 'inline';
                    if (btnArrow) btnArrow.style.display = 'inline';
                    if (btnLoading) btnLoading.style.display = 'none';
                    submitBtn.disabled = false;

                    // Show error to user
                    alert('Failed to send message. Please try again or email me directly at osmannaeem05@gmail.com');
                });
        }
    });

    /**
     * Shows error styling on a specific form field
     */
    function showError(inputId) {
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.add('error');
            input.parentElement.classList.add('show-error');
        }
    }

    /**
     * Clears all error states from the form
     */
    function clearErrors() {
        form.querySelectorAll('.form-input').forEach(input => {
            input.classList.remove('error');
        });
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('show-error');
        });
    }

    // Live error clearing — remove error as user types
    form.querySelectorAll('.form-input').forEach(input => {
        ['input', 'change'].forEach(eventType => {
            input.addEventListener(eventType, () => {
                input.classList.remove('error');
                input.parentElement.classList.remove('show-error');
            });
        });
    });
}


// ==========================================
// 10. FOOTER YEAR
// ==========================================
function initFooterYear() {
    document.querySelectorAll('#currentYear').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}


// ==========================================
// 11. UTILITY: DEBOUNCE
// ==========================================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}