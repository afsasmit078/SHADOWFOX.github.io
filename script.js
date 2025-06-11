

// Page Navigation - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target page ID
            const pageId = this.getAttribute('data-page');
            const targetPage = document.getElementById(pageId);
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            targetPage.classList.add('active');
            
            // Update active link (optional)
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to the top of the target section with offset for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetPage.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksContainer.style.display = 'none';
            }
        });
    });
    
    // Responsive adjustments
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinksContainer.style.display = 'flex';
        } else {
            navLinksContainer.style.display = 'none';
        }
    });
    
    // Handle direct anchor links (if someone manually types #about in URL)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetPage = document.getElementById(hash);
            if (targetPage && targetPage.classList.contains('page')) {
                // Hide all pages
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                
                // Show selected page
                targetPage.classList.add('active');
                
                // Update active link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-page') === hash) {
                        navLink.classList.add('active');
                    }
                });
                
                // Scroll to section
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetPage.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
