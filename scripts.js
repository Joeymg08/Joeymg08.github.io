$(document).ready(function () {
    // Smooth scrolling for sidebar links
    $('.sidebar nav a, .sidebar div a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').stop().animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;

                // Directly update active link after scrolling
                updateActiveLink(hash);
            });
        }
    });

    $('.mobile-header nav a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').stop().animate({
                scrollTop: $(hash).offset().top - 150
            }, 800, function () {
                window.location.hash = hash;

                // Directly update active link after scrolling
                updateActiveLink(hash);
            });
        }
    });

    // Function to update active link
    function updateActiveLink(hash) {
        $('.sidebar nav a.active').removeClass('active');
        $('.sidebar nav a[href="' + hash + '"]').addClass('active');

        $('.mobile-header nav a.active').removeClass('active');
        $('.mobile-header nav a[href="' + hash + '"]').addClass('active');
    }

    // Highlight active link on scroll
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var threshold = 50;
        var centerOffset = windowHeight / 2; // Center of the viewport

        // Check if user is at the bottom of the page
        if (scrollDistance + windowHeight >= documentHeight - 10) {
            updateActiveLink('#contact');
            return; // Exit the function to prevent other sections from being highlighted
        }

        var currentSection = '#about'; // Default to the first section

        $('.section').each(function (i) {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();

            var id = $(this).attr('id');
            if (id) { // Only consider sections with IDs

                // Check if the center of the viewport is within this section
                if (scrollDistance + centerOffset >= sectionTop && scrollDistance + centerOffset < sectionBottom) {
                    currentSection = '#' + id;
                    return false; // Exit each loop once the current section is found
                }
            }
        });

        updateActiveLink(currentSection);
    }).scroll();
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