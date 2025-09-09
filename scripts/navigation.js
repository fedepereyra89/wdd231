// Navigation functionality for responsive hamburger menu

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navigation = document.getElementById('navigation');

    // Toggle navigation menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navigation.classList.toggle('open');
    });

    // Close menu when clicking on a link (mobile)
    const navLinks = navigation.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navigation.classList.remove('open');
        });
    });

    // Close menu when window is resized to larger screen
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            hamburger.classList.remove('active');
            navigation.classList.remove('open');
        }
    });
});