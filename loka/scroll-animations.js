// ============================================
// SCROLL ANIMATIONS
// ============================================

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== BACK TO TOP BUTTON =====
function handleBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    if (window.scrollY > 300) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupIntersectionObserver() {
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .certificate-card, .about-text, .contact-info, .contact-form, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars inside skills
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }
            }
        });
    });
}

// ===== MOBILE MENU TOGGLE =====
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// ===== PARALLAX EFFECT ON HERO =====
function setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });
}

// ============================================
// INITIALIZE ALL SCROLL FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupMobileMenu();
    setupIntersectionObserver();
    setupParallax();
    
    // Initial calls
    handleNavbarScroll();
    handleBackToTop();
    updateActiveNavLink();
});

// Event listeners
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    handleBackToTop();
    updateActiveNavLink();
});

window.addEventListener('resize', () => {
    // Handle mobile menu close on resize
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (menuBtn) {
            const icon = menuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
});