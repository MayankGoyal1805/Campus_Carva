document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            ctaButtons.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu after clicking a link
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    const scrollThreshold = 100;
    
    function toggleHeaderClass() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass(); // Run on initial load

    // Simple Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formElements = this.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.required && !element.value.trim()) {
                    isValid = false;
                    element.classList.add('error');
                } else {
                    element.classList.remove('error');
                }
            }
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    this.appendChild(successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Add scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .marketplace-category, .event-card, .mentor-category, .testimonial, .social-post');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('pre-animation');
        observer.observe(element);
    });

    // Add CSS class for elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .pre-animation {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .error {
                border-color: #ff6b6b !important;
            }
            
            .success-message {
                margin-top: 1rem;
                padding: 1rem;
                background-color: rgba(6, 214, 160, 0.1);
                color: #06d6a0;
                border-radius: 8px;
                text-align: center;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
            
            header.sticky {
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            }
            
            @media (max-width: 768px) {
                .nav-links.active, .cta-buttons.active {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    padding: 1rem 5%;
                }
                
                .nav-links.active {
                    gap: 1rem;
                }
                
                .cta-buttons.active {
                    padding-bottom: 1rem;
                }
            }
        </style>
    `);

    // Add counter animation to statistics
    const stats = document.querySelectorAll('.highlight-stats .stat span');
    
    if (stats.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.textContent);
                    let currentValue = 0;
                    const duration = 2000; // ms
                    const increment = Math.ceil(targetValue / (duration / 16));
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            target.textContent = targetValue + '+';
                            clearInterval(counter);
                        } else {
                            target.textContent = currentValue;
                        }
                    }, 16);
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            // Store the target value in the element
            const targetValue = stat.textContent;
            stat.textContent = '0';
            statsObserver.observe(stat);
        });
    }

    // Simple carousel for testimonials (automatically cycles)
    const testimonialCards = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonials() {
        // Only apply carousel on mobile view
        if (window.innerWidth <= 768 && testimonialCards.length > 1) {
            testimonialCards.forEach((card, index) => {
                if (index === currentTestimonial) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        } else {
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    if (testimonialCards.length > 1) {
        // Initial setup
        window.addEventListener('resize', showTestimonials);
        showTestimonials();
        
        // Start testimonial rotation on mobile
        setInterval(() => {
            if (window.innerWidth <= 768) {
                showTestimonials();
            }
        }, 5000);
    }
});