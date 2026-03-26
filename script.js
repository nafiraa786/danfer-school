// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.navbar-nav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button press effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Fade-up animation on scroll
    const fadeItems = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeItems.forEach(item => fadeObserver.observe(item));

    // Notes filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noteCards = document.querySelectorAll('.note-card');
    const searchInput = document.getElementById('search');

    if (filterButtons.length > 0 && noteCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                filterNotes(filterValue);
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

            noteCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const level = card.getAttribute('data-level') || '';
                const subject = card.getAttribute('data-subject') || '';

                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || subject.toLowerCase().includes(searchTerm);
                const matchesFilter = activeFilter === 'all' || level === activeFilter;

                if (matchesSearch && matchesFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    function filterNotes(filter) {
        const searchTerm = searchInput?.value.toLowerCase() || '';

        noteCards.forEach(card => {
            const level = card.getAttribute('data-level') || '';
            const title = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const subject = card.getAttribute('data-subject') || '';

            const matchesFilter = filter === 'all' || level === filter;
            const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm) || subject.toLowerCase().includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Dynamic Hero Carousel
    const heroBgs = document.querySelectorAll('.hero-bg');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBgs.length > 0) {
        const carouselContent = [
            { title: "Welcome to Danfer School", subtitle: "Empowering minds, shaping futures." },
            { title: "Excellence in Learning", subtitle: "Discover your true potential with our dedicated faculty." },
            { title: "Building The Future", subtitle: "Innovative education for tomorrow's leaders." }
        ];
        
        let currentSlide = 0;
        
        setInterval(() => {
            // Fade out text
            heroContent.style.opacity = 0;
            
            setTimeout(() => {
                // Remove active from old
                heroBgs[currentSlide].classList.remove('active');
                
                // Switch index
                currentSlide = (currentSlide + 1) % heroBgs.length;
                
                // Add active to new
                heroBgs[currentSlide].classList.add('active');
                
                // Update Text
                if(heroTitle && heroSubtitle && carouselContent[currentSlide]) {
                    heroTitle.textContent = carouselContent[currentSlide].title;
                    heroSubtitle.textContent = carouselContent[currentSlide].subtitle;
                }
                
                // Fade in text
                heroContent.style.opacity = 1;
            }, 500); // Wait for half a second before swapping text
        }, 5000);
    }

    // Animated Trust Counters
    const statCounters = document.querySelectorAll('.stat-number');
    if (statCounters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'));
                    const suffix = target.getAttribute('data-suffix') || '';
                    
                    const duration = 2000;
                    const frameRate = 1000 / 60;
                    const totalFrames = Math.round(duration / frameRate);
                    let currentFrame = 0;

                    const counter = setInterval(() => {
                        currentFrame++;
                        const progress = currentFrame / totalFrames;
                        // use an ease-out timing function for smoother deceleration
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.round(endValue * easeOut);
                        
                        target.textContent = currentValue + suffix;

                        if (currentFrame === totalFrames) {
                            clearInterval(counter);
                            target.textContent = endValue + suffix; // ensure exact end value
                        }
                    }, frameRate);

                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statCounters.forEach(counter => statsObserver.observe(counter));
    }
});