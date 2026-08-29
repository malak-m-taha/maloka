// ============================================
// TYPING EFFECT
// ============================================

const typingTexts = [
    'Building intelligent solutions at the intersection of AI, Software, and Biomedical Engineering.',
    'Passionate about creating technology that impacts lives.',
    'AI & Biomedical Engineering Student at Cairo University.',
    'Flutter Developer | Web Developer | AI Enthusiast.'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 500;
    }
    
    setTimeout(typeEffect, speed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', typeEffect);