// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-open');
        
        // Toggle icon between hamburger and X
        const icon = mobileMenuToggle.querySelector('i');
        if (nav.classList.contains('mobile-menu-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('mobile-menu-open');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            nav.classList.remove('mobile-menu-open');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlight
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    correspondingNavLink.style.color = 'var(--color-primary)';
                } else {
                    correspondingNavLink.style.color = '';
                }
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // Add hover effects to cards
    const cards = document.querySelectorAll('.blog-card, .video-card, .repo-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Video thumbnail click handler
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Add a subtle animation effect
            const playIcon = this.querySelector('.fa-play-circle');
            playIcon.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                playIcon.style.transform = 'scale(1)';
            }, 200);

            // In a real implementation, this would open a video player
            console.log('Video clicked - would open video player');
        });
    });

    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Reset after a short delay (in real implementation, this would be handled by the actual navigation)
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Focus items animation
    const focusItems = document.querySelectorAll('.focus-item');
    focusItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const opacity = Math.min(scrolled / 100, 1);
        
        if (scrolled > 50) {
            header.style.backgroundColor = `rgba(var(--color-surface-rgb, 255, 255, 253), ${0.95 + (opacity * 0.05)})`;
            header.style.backdropFilter = 'blur(12px)';
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Search functionality (basic implementation)
    function initializeSearch() {
        // This would be expanded in a real implementation
        const searchableContent = [
            ...document.querySelectorAll('.blog-title'),
            ...document.querySelectorAll('.video-title'),
            ...document.querySelectorAll('.repo-name')
        ];

        // Store original content for search
        window.searchableItems = searchableContent.map(item => ({
            element: item.closest('.blog-card, .video-card, .repo-card'),
            text: item.textContent.toLowerCase()
        }));
    }

    initializeSearch();

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && nav.classList.contains('mobile-menu-open')) {
            nav.classList.remove('mobile-menu-open');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounced scroll handler
    const debouncedScrollHandler = debounce(function() {
        updateActiveNav();
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Add click tracking (for analytics in real implementation)
    function trackClick(element, category, action) {
        // In a real implementation, this would send data to analytics
        console.log(`Analytics: ${category} - ${action}`, element);
    }

    // Track blog post clicks
    document.querySelectorAll('.blog-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const blogTitle = this.closest('.blog-card').querySelector('.blog-title').textContent;
            trackClick(this, 'Blog', blogTitle);
        });
    });

    // Track video clicks
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoTitle = this.closest('.video-card').querySelector('.video-title').textContent;
            trackClick(this, 'Video', videoTitle);
        });
    });

    // Track repository clicks
    document.querySelectorAll('.repo-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const repoName = this.closest('.repo-card').querySelector('.repo-name').textContent.trim();
            trackClick(this, 'Repository', repoName);
        });
    });

    // Add error handling for failed resource loads
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
            console.warn('Failed to load stylesheet:', e.target.href);
        }
    });

    console.log('hippocrit.io initialized successfully!');
});