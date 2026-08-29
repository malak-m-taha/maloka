// ============================================
// MAIN JAVASCRIPT - INITIALIZATION
// ============================================

// ===== PRELOADER =====
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add a small delay to ensure everything is loaded
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
}

// ===== IMAGE LAZY LOADING =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.8s ease';
                    
                    // If image is already loaded, fade in
                    if (img.complete) {
                        img.style.opacity = '1';
                    } else {
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== SMOOTH SCROLL FOR MOBILE =====
function fixMobileScrolling() {
    // Fix for iOS Safari
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// ===== CHECK BROWSER SUPPORT =====
function checkBrowserSupport() {
    // Check if CSS Grid is supported
    const gridSupport = CSS.supports('display', 'grid');
    if (!gridSupport) {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h1>⚠️ Browser Not Supported</h1>
                <p>Please update your browser to view this portfolio.</p>
            </div>
        `;
    }
}

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ===== CONSOLE WELCOME =====
function consoleWelcome() {
    console.log('%c🚀 Malak Taha - Portfolio', 'font-size: 24px; font-weight: bold; color: #6C63FF;');
    console.log('%c👋 Thanks for visiting!', 'font-size: 16px; color: #4A4A6A;');
    console.log('%c📧 Connect with me: malak@email.com', 'font-size: 14px; color: #8888AA;');
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 100);

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide preloader
    hidePreloader();
    
    // Setup lazy loading
    setupLazyLoading();
    
    // Fix mobile scrolling
    fixMobileScrolling();
    
    // Check browser support
    checkBrowserSupport();
    
    // Console welcome
    consoleWelcome();
    
    // Add event listeners
    window.addEventListener('scroll', debouncedScroll);
});

// ============================================
// HANDLE PAGE VISIBILITY
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible again
        // Update any dynamic content if needed
    }
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('🔴 An error occurred:', e.message);
    // You could send this to an error tracking service
});

// ============================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================

// Uncomment if you want PWA support
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('✅ Service Worker registered:', registration);
//             })
//             .catch(error => {
//                 console.log('❌ Service Worker registration failed:', error);
//             });
//     });
// }