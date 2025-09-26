// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = document.querySelector('.fa-moon');
const sunIcon = document.querySelector('.fa-sun');
const contactForm = document.getElementById('contact-form');

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent body scrolling when menu is open
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        // Save theme preference to localStorage
        const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// Load saved theme preference - default to dark mode
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    // Default to dark mode if no preference saved
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
    }

    // Add animations with delay for elements
    const animateElements = () => {
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-animate');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(section);
        });
    };

    animateElements();
});

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Here you would normally send the form data to a server
        // For this demo, we'll just show a success message

        const formData = {
            name,
            email,
            subject,
            message
        };

        console.log('Form submitted:', formData);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message, ${name}! I'll get back to you soon.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip if href is just "#"

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Copy to clipboard function
function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        // Create notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-color);
            color: var(--primary-bg);
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
            font-weight: 500;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    });
}

// Terminal typing effect
const terminalLines = [
    'msf6 > use exploit/multi/handler',
    'msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp',
    'msf6 exploit(multi/handler) > set LHOST 192.168.1.100',
    'msf6 exploit(multi/handler) > exploit',
    '[*] Started reverse TCP handler on 192.168.1.100:4444'
];

function typeTerminal() {
    const terminalBody = document.querySelector('.terminal-body');
    const cursor = document.querySelector('.cursor');
    
    if (!terminalBody || !cursor) return;
    
    terminalBody.innerHTML = '';
    let lineIndex = 0;
    
    function typeLine() {
        if (lineIndex >= terminalLines.length) {
            terminalBody.appendChild(cursor);
            return;
        }
        
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';
        terminalBody.appendChild(lineDiv);
        terminalBody.appendChild(cursor);
        
        const text = terminalLines[lineIndex];
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                lineDiv.textContent += text[charIndex];
                charIndex++;
                setTimeout(typeChar, 50);
            } else {
                lineIndex++;
                setTimeout(typeLine, 800);
            }
        }
        
        typeChar();
    }
    
    setTimeout(typeLine, 1000);
}

// Start terminal animation
setTimeout(typeTerminal, 1500);
