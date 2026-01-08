 // Initialize Lucide icons
        lucide.createIcons();

        // --- JavaScript & jQuery Logic ---

        // 1. Theme Toggle Functionality
        const htmlElement = document.documentElement;
        const toggleButtons = [
            document.getElementById('theme-toggle-desktop'),
            document.getElementById('theme-toggle-mobile')
        ];

        // Function to update the icon based on the current theme
        const updateThemeIcon = () => {
            const isDark = htmlElement.classList.contains('dark');
            const iconName = isDark ? 'sun' : 'moon';

            const sunMoonIconDesktop = document.getElementById('sun-moon-icon-desktop');
            const sunMoonIconMobile = document.getElementById('sun-moon-icon-mobile');

            // Set the appropriate icon for both desktop and mobile buttons
            if (sunMoonIconDesktop) sunMoonIconDesktop.innerHTML = `<i data-lucide="${iconName}" class="w-6 h-6"></i>`;
            if (sunMoonIconMobile) sunMoonIconMobile.innerHTML = `<i data-lucide="${iconName}" class="w-6 h-6"></i>`;
            
            // Re-create lucide icons after updating innerHTML
            lucide.createIcons();
        };

        // Function to handle the theme change
        const toggleTheme = () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon();
        };

        // Attach listeners to both desktop and mobile buttons
        toggleButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', toggleTheme);
            }
        });
        
        // Check for saved theme preference on load
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        updateThemeIcon(); // Initial icon setup


        // 2. jQuery Mobile Menu Hide/Show
        $(document).ready(function() {
            const mobileMenu = $('#mobile-menu');
            const mobileMenuBtn = $('#mobile-menu-btn');

            // Click listener for the hamburger menu
            mobileMenuBtn.on('click', function() {
                // jQuery's toggle() with a duration handles the hide/show method requested
                mobileMenu.slideToggle(300); 
            });

            // Hide menu when a link inside it is clicked (for single page navigation)
            $('.mobile-nav-link').on('click', function() {
                mobileMenu.slideUp(300);
            });

            // 3. jQuery Smooth Scrolling
            $('a[href^="#"]').on('click', function(event) {
                const target = $(this.getAttribute('href'));
                if (target.length) {
                    event.preventDefault();
                    // Determine the offset based on the fixed header height
                    const headerHeight = $('header').outerHeight() || 70; 
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - headerHeight - 20 // Added extra padding
                    }, 800); // Smooth scroll duration
                }
            });
        });