// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Toggle hamburger menu
document.querySelector('.hamburger')?.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    this.classList.toggle('active');
    const navItems = document.querySelector('.nav-items');
    if (navItems) {
        navItems.classList.toggle('active');
        navItems.style.display = navItems.classList.contains('active') ? 'flex' : 'none';
    }
});

// Scroll-triggered animations with Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Batch DOM operations for better performance
        requestAnimationFrame(() => {
          const elementsToFade = entry.target.querySelectorAll('.fade-in-text, .skill-card, .project-card, .timeline-item');
          elementsToFade.forEach(element => element.classList.add('fade-in'));
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Click outside to close menu
document.addEventListener('click', function (event) {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger && !navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Lazy loading for images and videos
document.querySelectorAll('img, video').forEach(media => {
    media.setAttribute('loading', 'lazy');
});

// Add loading state and hide loader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    document.querySelector('.loader')?.classList.add('hidden');
});

// Basic contact form submission (placeholder for backend)
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email.');
        return;
    }

    alert('Thank you for your message! This form is currently not connected to a backend service.');

    // Reset form
    this.reset();
});

// Optional: Add particle animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(0, 255, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animation = `particleMove ${Math.random() * 5 + 5}s infinite linear, fadeIn 0.5s ease-in`;
            particlesContainer.appendChild(particle);
        }
    }
}

window.addEventListener('load', createParticles);
