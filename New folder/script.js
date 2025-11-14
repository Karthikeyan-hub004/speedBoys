document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const openPopup = document.getElementById('openPopup');
    const closePopup = document.getElementById('closePopup');
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const contactForm = document.getElementById('contactForm');

    function showPop() {
        if (!popup) return;
        popup.style.display = 'flex';
        popup.setAttribute('aria-hidden', 'false');
    }

    function closePop() {
        if (!popup) return;
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
    }

    openPopup?.addEventListener('click', showPop);
    closePopup?.addEventListener('click', closePop);
    // close when clicking backdrop
    popup?.addEventListener('click', (e) => { if (e.target === popup) closePop(); });

    // Theme toggle with localStorage
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    themeToggle?.addEventListener('click', () => {
        setTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
    });

    function setTheme(name) {
        if (name === 'dark') {
            document.body.classList.add('dark');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark');
            themeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', name);
    }

    // Mobile nav
    menuToggle?.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            mainNav.classList.remove('open');
        });
    });

    // Contact form simple handler
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        if (!name || !email || !message) { showToast('Please complete all fields'); return; }
        // In a real app we'd submit this to a server. Here just show success.
        showToast('Thanks! We received your message — we will contact you soon.');
        form.reset();
    });

    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        document.body.appendChild(t);
        // show
        requestAnimationFrame(() => t.classList.add('visible'));
        setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 300); }, 3000);
    }

    // reveal on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('reveal'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.card, .about, .menu-item, .service-grid, .hero-content').forEach(el => observer.observe(el));
});
