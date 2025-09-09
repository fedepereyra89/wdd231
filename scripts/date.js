// Date functionality for footer

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in copyright
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Set last modified date
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = `Last Modification: ${lastModified}`;
});