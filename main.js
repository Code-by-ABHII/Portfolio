// Main JavaScript for Portfolio Website

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// TYPING ANIMATION
// ===================================
const typingText = document.getElementById('typing-text');
const texts = [
    'Engineering Student',
    'Tech Enthusiast',
    'Content Creator',
    'Web Developer',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of text
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(typeText, typingDelay);
}

// Start typing animation
setTimeout(typeText, 1000);

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
            
            // Animate stats counters
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.about-content, .skill-card, .soft-skill-item, .cert-badge, ' +
    '.timeline-item, .education-card, .project-card, .info-card, .stat-item'
);

animatedElements.forEach(el => observer.observe(el));

// ===================================
// COUNTER ANIMATION
// ===================================
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            numberElement.textContent = target + '+';
            clearInterval(timer);
        } else {
            numberElement.textContent = Math.floor(current);
        }
    }, 16);
}

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show success message (in a real application, you would send this to a server)
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#39FF14' : '#00D9FF'};
        color: #0A0E27;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.5s ease;
        box-shadow: 0 10px 40px rgba(0, 217, 255, 0.4);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// DOWNLOAD RESUME
// ===================================
const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple text resume
    const resumeContent = `
ABHISHEK PATTANSHETTI
Engineering Student | Tech Enthusiast | Content Creator
Bangalore, India

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bachelor of Engineering (B.E) – Computer Science
Sir M. Visvesvaraya Institute of Technology (SMVIT), Bangalore
Sep 2024 – Oct 2028

PUC – Science (PCMB)
KLE Independent PU College, Nipani
Completed: Apr 2024 | Grade: 94% | 3rd Rank in College

SSLC
Gomatesh English Medium School, Nipani
Completed: Mar 2022 | Grade: 95.04% | 2nd Rank in School

EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Web Development Intern
SkillCraft Technology | Jan 2025 – Jan 2025

• Completed a 1-month internship focused on Web Development
• Worked on real-time tasks improving UI design and development workflow
• Earned official certification after completing training modules

TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programming: C, Python, HTML, CSS, JavaScript
Tools: VS Code, GitHub, CapCut, Canva
Web Development: Responsive UI design, Frontend development
Content Creation: Video editing, YouTube channel management

SOFT SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Problem-Solving & Analytical Thinking
• Leadership & Event Volunteering
• Team Collaboration & Communication
• Creativity & Innovation
• Time Management & Discipline

CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ C Programming Fundamentals
✓ Python Basics
✓ Web Development Essentials (HTML/CSS/JS)
✓ CapCut Editing Basics
✓ Technical Event Volunteer & Coordinator
✓ Experienced eSport Athlete (FREE FIRE)

PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Personal Portfolio Website
Modern engineering-themed portfolio with smooth animations
Technologies: HTML, CSS, JavaScript

Dark Flash FF YouTube Channel
Gaming content creation focused on Free Fire gameplay
Skills: Video Editing, Content Creation

CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: your.email@example.com
Location: Bangalore, India
LinkedIn | GitHub | YouTube | Instagram
    `;
    
    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhishek_Pattanshetti_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Resume downloaded successfully!', 'success');
});

// ===================================
// PARALLAX EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual, .floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// INITIALIZE ON LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize all skill progress bars to 0
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Log a welcome message
    console.log('%c🚀 Welcome to Abhishek Pattanshetti\'s Portfolio!', 
        'font-size: 20px; font-weight: bold; color: #00D9FF;');
    console.log('%cBuilt with passion using HTML, CSS, and JavaScript', 
        'font-size: 14px; color: #9D4EDD;');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// EASTER EGG
// ===================================
let clickCount = 0;
const logo = document.querySelector('.logo-text');

logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
        showNotification('🎮 Gaming mode activated! Keep learning, keep creating!', 'success');
        clickCount = 0;
        
        // Add temporary rainbow effect
        logo.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            logo.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);