// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

function toggleMenu() {
    nav.classList.toggle('active');
    const isOpen = nav.classList.contains('active');
    menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

// Create mobile menu button if it doesn't exist
function createMobileMenu() {
    const header = document.querySelector('header');
    const existingBtn = document.querySelector('.menu-btn');
    
    if (!existingBtn && window.innerWidth <= 995) {
        const menuBtn = document.createElement('button');
        menuBtn.classList.add('menu-btn');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.style.cssText = `
            background: transparent;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            display: none;
        `;
        
        header.insertBefore(menuBtn, header.querySelector('nav'));
        menuBtn.addEventListener('click', toggleMenu);
        
        // Show button on mobile
        if (window.innerWidth <= 995) {
            menuBtn.style.display = 'block';
        }
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                nav.classList.remove('active');
            }
        }
    });
});

// Active Navigation Link on Scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === '' && link.getAttribute('href') === '#')) {
            link.classList.add('active');
        }
    });
}

// Scroll-based Header Styling
function handleScroll() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(22, 22, 22, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
    }
    
    setActiveNavLink();
}

// Typing Effect
const textElement = document.querySelector('.typing-text span');
const phrases = [
    'Web Developer',
    'Web Designer',
    'Software Engineer',
    'Frontend Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
function observeElements() {
    const animatedElements = document.querySelectorAll('.home-img, .home-content, .social-icons, .btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Social Icons Hover Effect Enhancement
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) translateY(-5px)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Button Click Handler
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Image Hover Effect Enhancement
document.querySelector('.home-img img')?.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 30px #b74b4b';
    this.style.transform = 'scale(1.05)';
});

document.querySelector('.home-img img')?.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 0 25px solid#b74b74';
    this.style.transform = 'scale(1)';
});

// Cursor Effect (Optional - creates a trailing cursor effect)
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #b74b4b;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
    if (!cursorVisible && window.innerWidth > 768) {
        cursor.style.display = 'block';
        cursorVisible = true;
    }
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => cursor.style.display = 'block');
document.addEventListener('mouseleave', () => cursor.style.display = 'none');

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    createMobileMenu();
    observeElements();
    
    // Start typing effect after a delay
    setTimeout(() => {
        if (textElement) {
            type();
        }
    }, 1000);
});

// Handle window resize
window.addEventListener('resize', () => {
    createMobileMenu();
    
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        if (window.innerWidth > 995) {
            menuBtn.style.display = 'none';
            nav.classList.remove('active');
        } else {
            menuBtn.style.display = 'block';
        }
    }
});

// Scroll event listener
window.addEventListener('scroll', handleScroll);

// Console welcome message
console.log('%c Welcome to my Portfolio! ', 'background: #b74b4b; color: white; font-size: 20px; padding: 10px;');
console.log('%c Feel free to explore! ', 'background: #333; color: #b74b4b; font-size: 14px; padding: 5px;');

