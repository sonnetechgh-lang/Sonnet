document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out",
      once: false,
      offset: 100,
    });
  }
});
// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm.querySelector('.btn-primary');
    const originalButtonText = submitButton.textContent;

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.name.trim()) {
            errors.push('Name is required');
        }
        
        if (!formData.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.message.trim()) {
            errors.push('Message is required');
        }
        
        return errors;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show notification
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78, #38a169)' : 'linear-gradient(135deg, #f56565, #e53e3e)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Set loading state
    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            submitButton.style.opacity = '1';
        }
    }

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        // If form has an action (e.g., Formspree), allow native submission
        if (contactForm.getAttribute('action')) {
            return;
        }
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            message: contactForm.querySelector('textarea[name="message"]').value
        };

        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showNotification(errors.join('<br>'), 'error');
            return;
        }

        // Set loading state
        setLoadingState(true);

        try {
            // Simulate form submission (replace with actual endpoint)
            await simulateFormSubmission(formData);
            
            // Success
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Error
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset loading state
            setLoadingState(false);
        }
    });

    // Simulate form submission (replace with actual API call)
    function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true, message: 'Message sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    // Add input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const mobileNavLinks = document.querySelectorAll('.nav-link');

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Service card hover functionality (flip deactivated)
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effect for better UX
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add CSS for header transition and flip cards
    const style = document.createElement('style');
    style.textContent = `
        .header {
            transition: transform 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
        
        .service-card {
            transition: transform 0.3s ease;
        }
        
    `;
    document.head.appendChild(style);
});



