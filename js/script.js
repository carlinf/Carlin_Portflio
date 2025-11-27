// 
// Mobile Menu Toggle
// 
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const backdrop = document.querySelector('.sidebar-backdrop');

function toggleSidebar() {
    const isActive = sidebar.classList.contains('active');
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    
    if (backdrop) {
        if (isActive) {
            backdrop.style.opacity = '0';
        } else {
            backdrop.style.opacity = '1';
        }
    }
}

if (hamburger && sidebar) {
    hamburger.addEventListener('click', toggleSidebar);

    // Close menu when clicking on backdrop
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                backdrop.style.opacity = '0';
            }
        });
    }

    // Close menu when clicking on a link (mobile only)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                if (backdrop) {
                    backdrop.style.opacity = '0';
                }
            }
        });
    });
}

// 
// Active Navigation Link
//
const sections = document.querySelectorAll('.section, .hero, .blog');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 
// Typing Animation
// 
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Carlin Fernandes',
    'a IT Specialist',
    'a Developer',
    
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before starting new phrase
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation
if (typingText) {
    type();
}
//
// Smooth Scrolling
//
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle anchor links (starting with #) and not external links
        if (href && href.startsWith('#') && !this.hasAttribute('target')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 
// Counter Animation
// 
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// 
// Skill Bar Animation
// 
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const width = entry.target.getAttribute('data-width');
            setTimeout(() => {
                entry.target.style.width = width + '%';
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// 
// Portfolio Filter
// 
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// 
// Portfolio Modal
// 
const portfolioModal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechList = document.getElementById('modalTechList');
const modalLink = document.getElementById('modalLink');
const modalLinkContainer = document.getElementById('modalLinkContainer');

// Open modal when portfolio item is clicked
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const technologies = item.getAttribute('data-technologies');
        const image = item.getAttribute('data-image');
        const link = item.getAttribute('data-link');
        
        if (title && description && technologies && image) {
            // Set modal content
            modalImage.src = image;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Clear and populate technologies
            modalTechList.innerHTML = '';
            const techArray = technologies.split(',').map(tech => tech.trim());
            techArray.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                modalTechList.appendChild(tag);
            });
            
            // Handle website link
            if (link) {
                modalLink.href = link;
                modalLink.target = '_blank';
                modalLink.rel = 'noopener noreferrer';
                modalLinkContainer.style.display = 'block';
            } else {
                modalLinkContainer.style.display = 'none';
            }
            
            // Show modal
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal
function closeModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (portfolioModal) {
    portfolioModal.addEventListener('click', (e) => {
        if (e.target === portfolioModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
        closeModal();
    }
});

// Sidebar is always fixed, no scroll effect needed

// 
// Contact Form Handling with EmailJS
// 
// Initialize EmailJS when the library is loaded
let emailjsInitialized = false;

// Wait for EmailJS to load
if (typeof emailjs !== 'undefined') {
    emailjs.init("kx6xQGQiUAMDGczxx");
    emailjsInitialized = true;
} else {
    // Wait for EmailJS to load
    window.addEventListener('load', () => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("kx6xQGQiUAMDGczxx");
            emailjsInitialized = true;
        }
    });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;

// Function to show message
function showMessage(text, type = 'success') {
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Function to set button loading state
function setButtonLoading(loading) {
    if (submitBtn && btnText && btnLoader) {
        if (loading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
        }
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Set loading state
        setButtonLoading(true);
        formMessage.style.display = 'none';

        // EmailJS configuration
        // Replace these with your EmailJS service ID and template ID
        // Get them from: https://dashboard.emailjs.com/admin
        const serviceID = 'service_mdu2k0d'; // Replace with your EmailJS service ID
        const templateID = 'template_qwzkv4l'; // Replace with your EmailJS template ID

        // Prepare email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            to_email: email, // Sending to the email entered in the form
            message: message,
            reply_to: email
        };

        try {
            // Check if EmailJS is loaded and initialized
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS library not loaded. Please check your internet connection.');
            }

            if (!emailjsInitialized) {
                emailjs.init("kx6xQGQiUAMDGczxx");
                emailjsInitialized = true;
            }

            // Send email using EmailJS
            const response = await emailjs.send(serviceID, templateID, templateParams);
            
            // Success
            console.log('EmailJS Success:', response);
            showMessage('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            // Error handling with more details
            console.error('EmailJS Error Details:', error);
            
            let errorMessage = 'Failed to send message. ';
            
            // Provide more specific error messages
            if (error.status === 400) {
                errorMessage += 'Invalid request. Please check your EmailJS template variables.';
            } else if (error.status === 401) {
                errorMessage += 'Unauthorized. Please check your EmailJS public key.';
            } else if (error.status === 412) {
                errorMessage += 'Gmail authentication issue. Please re-authenticate your Gmail service in EmailJS dashboard.';
            } else if (error.status === 404) {
                errorMessage += 'Service or template not found. Please check your Service ID and Template ID.';
            } else if (error.text) {
                errorMessage += error.text;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Please verify your EmailJS configuration in the dashboard.';
            }
            
            showMessage(errorMessage, 'error');
        } finally {
            // Reset loading state
            setButtonLoading(false);
        }
    });
}

// 
// Scroll Reveal Animation
// 
const revealElements = document.querySelectorAll('.service-card, .resume-item, .testimonial-card, .portfolio-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// 
// Blog Modal
// 
const blogModal = document.getElementById('blogModal');
const blogModalClose = document.querySelector('.blog-modal-close');
const blogModalTitle = document.getElementById('blogModalTitle');
const blogModalContent = document.getElementById('blogModalContent');
const blogModalLink = document.getElementById('blogModalLink');
const blogCards = document.querySelectorAll('.blog-card');

// Open blog modal when Read More button is clicked
blogCards.forEach(card => {
    const readMoreBtn = card.querySelector('.btn-read-more');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const title = card.getAttribute('data-title');
            const content = card.getAttribute('data-content');
            const link = card.getAttribute('data-link');
            
            if (title && content && link) {
                blogModalTitle.textContent = title;
                blogModalContent.textContent = content;
                blogModalLink.href = link;
                blogModalLink.target = '_blank';
                blogModalLink.rel = 'noopener noreferrer';
                
                blogModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
});

// Close blog modal
function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (blogModalClose) {
    blogModalClose.addEventListener('click', closeBlogModal);
}

// Close blog modal when clicking outside
if (blogModal) {
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });
}

// Close blog modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && blogModal.classList.contains('active')) {
        closeBlogModal();
    }
});

// 
// Initialize on page load
// 
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            targetSection.scrollIntoView();
        }
    }
});



