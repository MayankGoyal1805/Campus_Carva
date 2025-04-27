document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    // Initial check for page position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add 'scrolled' class when page is scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Handle hiding/showing based on scroll direction
        if (scrollTop <= 0) {
            // At the top of the page
            header.classList.remove('nav-hidden');
        } else if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down and not at the very top
            header.classList.add('nav-hidden');
        } else {
            // Scrolling up
            header.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
});