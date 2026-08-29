// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Success - Show confirmation
        showMessage('✅ Your message has been sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send to email using mailto
        // window.location.href = `mailto:malak@email.com?subject=Contact from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
    });
}

// ============================================
// EMAIL VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// SHOW MESSAGE
// ============================================

function showMessage(text, type) {
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Auto hide after 5 seconds
    clearTimeout(formMessage._timeout);
    formMessage._timeout = setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ============================================
// CLEAR MESSAGE ON INPUT
// ============================================

document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    });
});