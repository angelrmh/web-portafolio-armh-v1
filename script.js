document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        toggleIcon(mobileToggle);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggleIcon(mobileToggle);
        });
    });

    function toggleIcon(btn) {
        // Simple animation for the burger menu to X could go here
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Particle System
    const particleContainer = document.getElementById('particles-container');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        const duration = Math.random() * 20 + 10;
        particle.style.transition = `top ${duration}s linear, opacity ${duration}s ease`;
        
        particleContainer.appendChild(particle);
        
        // Animate
        setTimeout(() => {
            particle.style.top = '-10px';
            particle.style.opacity = '0';
        }, 100);

        // Reset
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, duration * 1000);
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // If it's a number counter
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stats
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current);
            }
        }, 16);
    }

    // Flip Card Mobile Interaction
    const cards = document.querySelectorAll('.service-card-flip');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Check if mobile
            if (window.innerWidth <= 1024) {
               this.classList.toggle('flipped'); 
            }
        });
    });
});

// Add flip class for mobile in CSS if needed, but hover handles desktop
// For strict mobile 'click to flip', we can toggle a class that has the same rotate transform.
