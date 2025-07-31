// Scroll to section smoothly
// Smooth scrolling for anchor links
// Enhanced smooth scrolling with offset for fixed headers
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate the position with offset (adjust 80 to your header height)
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Custom smooth scrollbar with animation
const scrollbarStyle = document.createElement('style');
scrollbarStyle.textContent = `
    /* Modern scrollbar styling */
    :root {
        --scrollbar-track: #f8f9fa;
        --scrollbar-thumb: linear-gradient(135deg, #6c63ff, #a162e8);
        --scrollbar-thumb-hover: linear-gradient(135deg, #4a42e8, #8a4de3);
    }
    
    /* Smooth scrolling behavior */
    html {
        scroll-behavior: smooth;
        overflow-y: overlay;
    }
    
    /* WebKit browsers (Chrome, Safari) */
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--scrollbar-track);
        border-radius: 10px;
        margin: 5px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb);
        border-radius: 10px;
        border: 3px solid var(--scrollbar-track);
        background-clip: content-box;
        transition: all 0.3s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover);
    }
    
    ::-webkit-scrollbar-corner {
        background: transparent;
    }
    
    /* Firefox */
    * {
        scrollbar-width: thin;
        scrollbar-color: #6c63ff #f8f9fa;
    }
    
    /* Optional: Smooth scroll for keyboard navigation */
    @media (prefers-reduced-motion: no-preference) {
        html {
            scroll-behavior: smooth;
        }
    }
`;
document.head.appendChild(scrollbarStyle);

// Add scroll progress indicator (optional)
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #6c63ff, #ff6584);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease-out;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
});
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    // Animate form labels on focus
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            label.style.top = '-10px';
            label.style.fontSize = '0.8rem';
            label.style.color = '#3498db';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.top = '15px';
                label.style.fontSize = '1rem';
                label.style.color = '#7f8c8d';
            }
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real scenario, you would use AJAX)
            setTimeout(() => {
                contactForm.reset();
                
                // Show notification
                notification.classList.add('show');
                
                // Hide notification after 3 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }, 1000);
        });
    }
    
    // Add animation to contact cards when they come into view
    const contactCards = document.querySelectorAll('.contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});