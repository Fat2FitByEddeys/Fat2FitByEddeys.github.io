// =========================
// EMAILJS CONFIGURATION  (unchanged from source)
// =========================

const EMAILJS_PUBLIC_KEY = 'V7ul_30yyf4Nmz0lo';
const EMAILJS_SERVICE_ID = 'service_bw3y1kc';
const EMAILJS_TEMPLATE_ADMIN = 'template_isnhhdf'; // Admin notification (to you)
const EMAILJS_TEMPLATE_USER = 'template_q8z67u8';  // User auto-response

(function () {
    if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// =========================
// CONTACT FORM HANDLER
// =========================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loader').style.display = 'inline-block';
        formMessage.style.display = 'none';

        try {
            const formData = new FormData(contactForm);
            const data = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                service: formData.get('service'),
                budget: formData.get('budget') || 'Not specified',
                message: formData.get('message')
            };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, data);
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_USER, data);

            showMessage('success', '✓ Message sent successfully! Check your email for confirmation.');
            contactForm.reset();

        } catch (error) {
            console.error('Email send error:', error);
            showMessage('error', '✗ Something went wrong. Please try again or email us directly at define.devincept@gmail.com');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline-block';
            submitBtn.querySelector('.btn-loader').style.display = 'none';
        }
    });
}

function showMessage(type, text) {
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
    setTimeout(() => { formMessage.style.display = 'none'; }, 8000);
}

// =========================
// FRAME-BY-FRAME SCROLL SCRUB (the moonwalk sequence)
// =========================

const FRAME_COUNT = 88;
const FRAME_PATH = i => `assets/frames/frame_${String(i).padStart(3, '0')}.jpg`;

const canvas = document.getElementById('scrub-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const heroScrub = document.querySelector('.hero-scrub');
const hudFill = document.querySelector('.hud-progress-fill');
const hudAlt = document.querySelector('.hud-alt');
const heroOpen = document.querySelector('.hero-open');
const scrollHint = document.querySelector('.scroll-hint');
const heroLines = document.querySelectorAll('.hero-line');

const frames = [];
let framesLoaded = 0;

function preloadFrames() {
    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => { framesLoaded++; if (i === 1) drawFrame(0); };
        frames.push(img);
    }
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth * (window.devicePixelRatio > 1 ? 1.5 : 1);
    canvas.height = window.innerHeight * (window.devicePixelRatio > 1 ? 1.5 : 1);
}

function drawFrame(index) {
    if (!ctx) return;
    const img = frames[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width, ch = canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw, dh, dx, dy;

    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
    else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
}

let ticking = false;

function onScroll() {
    if (ticking || !heroScrub) return;
    ticking = true;
    requestAnimationFrame(() => {
        const rect = heroScrub.getBoundingClientRect();
        const total = heroScrub.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / total, 0), 1);

        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)));
        drawFrame(frameIndex);

        if (hudFill) hudFill.style.width = `${progress * 100}%`;
        if (hudAlt) hudAlt.textContent = `ALT ${(progress * 384.4).toFixed(1)}m`;

        if (heroOpen) heroOpen.style.opacity = Math.max(0, 1 - progress * 14);
        if (scrollHint) scrollHint.style.opacity = Math.max(0, 1 - progress * 10);

        // narrative lines cross-fade across three windows of scroll progress
        const windows = [[0.14, 0.34], [0.42, 0.62], [0.70, 0.92]];
        heroLines.forEach((el, i) => {
            const [start, end] = windows[i];
            const fadeIn = 0.04, fadeOut = 0.04;
            let op = 0;
            if (progress >= start && progress <= end) {
                if (progress < start + fadeIn) op = (progress - start) / fadeIn;
                else if (progress > end - fadeOut) op = (end - progress) / fadeOut;
                else op = 1;
            }
            el.style.opacity = Math.max(0, Math.min(1, op));
            el.style.transform = `translateY(${(1 - op) * 16}px)`;
        });

        ticking = false;
    });
}

if (canvas) {
    resizeCanvas();
    preloadFrames();
    window.addEventListener('resize', () => { resizeCanvas(); drawFrame(0); });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// =========================
// 3D TILT ON SERVICE CARDS
// =========================

document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const cx = x / r.width, cy = y / r.height;
        const rotX = (cy - 0.5) * -10;
        const rotY = (cx - 0.5) * 10;
        card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
        card.style.setProperty('--mx', `${cx * 100}%`);
        card.style.setProperty('--my', `${cy * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// =========================
// SCROLL REVEAL
// =========================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =========================
// TELEMETRY COUNTER ANIMATION
// =========================

const telemetryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.tnum').forEach(el => {
                const target = parseInt(el.dataset.count, 10);
                animateCounter(el, 0, target, 1400);
            });
            telemetryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const telemetryEl = document.querySelector('.telemetry');
if (telemetryEl) telemetryObserver.observe(telemetryEl);

function animateCounter(el, start, end, duration) {
    const range = end - start;
    const t0 = performance.now();
    function tick(now) {
        const p = Math.min((now - t0) / duration, 1);
        el.textContent = Math.floor(start + range * p);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = end;
    }
    requestAnimationFrame(tick);
}

// =========================
// SMOOTH SCROLL FOR NAV LINKS
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// =========================
// NAVBAR SCROLL SHADOW
// =========================

const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset > 100 ? '0 4px 24px rgba(0,0,0,0.35)' : 'none';
}, { passive: true });

// =========================
// CTA BUTTON → SCROLL TO CONTACT
// =========================

document.querySelectorAll('.btn-cta, .btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Start your project') || button.textContent.includes('Get a quote')) {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('%c🌕 Define Studio — moonwalk build', 'font-size: 16px; font-weight: bold; color: #ffb454;');
console.log('%cContact: define.devincept@gmail.com', 'font-size: 12px; color: #8d8b84;');