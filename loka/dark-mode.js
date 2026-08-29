// ============================================
// DARK MODE TOGGLE
// ============================================

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check saved preference
function checkDarkModePreference() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'enabled') {
        body.classList.add('dark-mode');
        updateIcon('moon');
    } else if (saved === 'disabled') {
        body.classList.remove('dark-mode');
        updateIcon('sun');
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            updateIcon('moon');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            updateIcon('sun');
        }
    }
}

// Update icon
function updateIcon(mode) {
    if (!darkModeToggle) return;
    const icon = darkModeToggle.querySelector('i');
    if (mode === 'moon') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        updateIcon('moon');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        updateIcon('sun');
    }
}

// Event listener
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// Check preference on load
document.addEventListener('DOMContentLoaded', checkDarkModePreference);

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            body.classList.add('dark-mode');
            updateIcon('moon');
        } else {
            body.classList.remove('dark-mode');
            updateIcon('sun');
        }
    }
});