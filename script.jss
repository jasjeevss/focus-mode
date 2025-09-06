// Theme management with localStorage
let currentTheme = 'light';

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        currentTheme = 'light';
    } else {
        body.classList.add('dark');
        currentTheme = 'dark';
    }
    // Save theme preference to localStorage
    localStorage.setItem('theme', currentTheme);
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

// Custom message box functions
function showMessage() {
    const overlay = document.getElementById('messageOverlay');
    overlay.classList.add('show');
}

function hideMessage() {
    const overlay = document.getElementById('messageOverlay');
    overlay.classList.remove('show');
}

// Close message box when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('messageOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                hideMessage();
            }
        });
    }
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Keyboard accessibility for message box
function initKeyboardAccessibility() {
    document.addEventListener('keydown', function(e) {
        const overlay = document.getElementById('messageOverlay');
        if (overlay && overlay.classList.contains('show')) {
            if (e.key === 'Escape') {
                hideMessage();
            }
        }
    });
}

// Initialize all functionality on page load
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    setCurrentYear();
    initSmoothScrolling();
    initKeyboardAccessibility();
    
    // Add loading animation completion
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Optional: Add scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and about section
    document.querySelectorAll('.feature-card, .about-content > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after page load
window.addEventListener('load', function() {
    initScrollAnimations();
});