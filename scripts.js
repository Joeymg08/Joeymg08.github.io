document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768; // Adjust the width as per your mobile breakpoint
    const offsetAdjustment = isMobile ? 25 : 0; // Adjust by 25px less if on mobile

    // Function to update active link
    function updateActiveLink(hash) {
        document.querySelectorAll('.sidebar nav a.active, .mobile-header nav a.active').forEach(function (activeLink) {
            activeLink.classList.remove('active');
        });

        const newActiveSidebar = document.querySelector('.sidebar nav a[href="' + hash + '"]');
        if (newActiveSidebar) newActiveSidebar.classList.add('active');

        const newActiveMobileHeader = document.querySelector('.mobile-header nav a[href="' + hash + '"]');
        if (newActiveMobileHeader) newActiveMobileHeader.classList.add('active');
    }

    // Smooth scrolling for sidebar and mobile-header links
    document.querySelectorAll('.sidebar nav a, .sidebar div a, .mobile-header nav a').forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                const target = document.querySelector(hash);

                window.scrollTo({
                    top: target.offsetTop - offsetAdjustment,
                    behavior: 'smooth'
                });

                // Update active link immediately
                updateActiveLink(hash);
            }
        });
    });

    // Scroll event listener to update active link based on scroll position
    window.addEventListener('scroll', function () {
        const scrollDistance = window.scrollY;
        const documentHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const centerOffset = windowHeight / 2; // Center of the viewport

        // Check if user is at the bottom of the page
        if (scrollDistance + windowHeight >= documentHeight - 10) {
            updateActiveLink('#contact');
            return; // Exit the function to prevent other sections from being highlighted
        }

        let currentSection = '#about'; // Default to the first section

        document.querySelectorAll('.section').forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const id = section.getAttribute('id');

            if (id) { // Only consider sections with IDs
                // Check if the center of the viewport is within this section
                if (scrollDistance + centerOffset - offsetAdjustment >= sectionTop && scrollDistance + centerOffset - offsetAdjustment < sectionBottom) {
                    currentSection = '#' + id;
                    return false; // Exit each loop once the current section is found
                }
            }
        });

        updateActiveLink(currentSection);
    });

    // Trigger scroll event on page load to set the correct active link
    window.dispatchEvent(new Event('scroll'));
});


// Mobile Scripts

$('.carousel').on('touchstart', function (event) {
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).carousel('pause'); // Pause the carousel on touch start

    $(this).one('touchmove', function (event) {
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;

        if (Math.floor(xClick - xMove) > sensitivityInPx) {
            $(this).carousel('next');
        }
        else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
            $(this).carousel('prev');
        }
    });

    $(this).on('touchend', function () {
        $(this).off('touchmove'); // Unbind touchmove event
        setTimeout(() => {
            $(this).carousel('cycle'); // Restart the carousel after a short delay
        }, 500); // Adjust the delay as needed
    });
});

// Carousel Modal
$(document).ready(function() {
    $('#inventoryCarousel').on('slid.bs.carousel', function () {
        $('#videoItem').removeClass('hidden-item');
    });

    $('[data-gallery="inventory"]').on('click', function() {
        $('#videoItem').removeClass('hidden-item');
    });
});