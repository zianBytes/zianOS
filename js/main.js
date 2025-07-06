// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background opacity based on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Feature cards hover effect with glow
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Add glow effect
        const glow = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 213, 0.1), transparent 50%)`;
        card.style.background = glow;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--glass-background)';
    });
});

// Notification form handling
document.addEventListener('DOMContentLoaded', function() {
    const notifyForm = document.getElementById('notifyForm');
    const formMessage = document.querySelector('.form-message');

    notifyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = notifyForm.querySelector('input[type="email"]').value;
        const button = notifyForm.querySelector('button');
        
        // Disable the button and show loading state
        button.disabled = true;
        button.textContent = 'Sending...';
        formMessage.textContent = '';

        // Send email using EmailJS
        emailjs.send(
            'YOUR_SERVICE_ID', // Add your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Add your EmailJS template ID
            {
                subscriber_email: email,
                to_email: 'your-email@example.com', // Add your email here
                subscription_date: new Date().toLocaleDateString()
            }
        ).then(function() {
            formMessage.textContent = 'Thanks! You\'ll be notified when we launch.';
            formMessage.className = 'form-message success';
            notifyForm.reset();
        }).catch(function(error) {
            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            formMessage.className = 'form-message error';
            console.error('EmailJS error:', error);
        }).finally(function() {
            button.disabled = false;
            button.textContent = 'Notify Me';
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Mouse follow effect for the dock preview with enhanced 3D effect
const dockPreview = document.querySelector('.dock-preview');
document.addEventListener('mousemove', (e) => {
    if (dockPreview) {
        const rect = dockPreview.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.01;
        const deltaY = (e.clientY - centerY) * 0.01;
        
        dockPreview.style.transform = `
            perspective(1000px) 
            rotateX(${-deltaY}deg) 
            rotateY(${deltaX}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    }
});

// Reset dock preview transform on mouse leave
dockPreview.addEventListener('mouseleave', () => {
    dockPreview.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}); 