
document.addEventListener('DOMContentLoaded', function() {
    
    initializePage();
    
    
    setupEventListeners();
    
    
    displayFormData();
});

function initializePage() {
    
    document.getElementById('year').textContent = new Date().getFullYear();
    
 
    document.getElementById('lastModified').textContent = document.lastModified;
}

function setupEventListeners() {
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

function displayFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const formDataContainer = document.getElementById('form-data');
    
   
    const firstName = urlParams.get('first-name') || 'Not provided';
    const lastName = urlParams.get('last-name') || 'Not provided';
    const email = urlParams.get('email') || 'Not provided';
    const phone = urlParams.get('phone') || 'Not provided';
    const businessName = urlParams.get('business-name') || 'Not provided';
    const timestamp = urlParams.get('timestamp') || 'Not provided';
    
    
    let formattedDate = 'Not provided';
    if (timestamp && timestamp !== 'Not provided') {
        const date = new Date(timestamp);
        formattedDate = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    }
    
    
    formDataContainer.innerHTML = `
        <div class="form-data-item">
            <strong>First Name:</strong> ${firstName}
        </div>
        <div class="form-data-item">
            <strong>Last Name:</strong> ${lastName}
        </div>
        <div class="form-data-item">
            <strong>Email:</strong> ${email}
        </div>
        <div class="form-data-item">
            <strong>Phone:</strong> ${phone}
        </div>
        <div class="form-data-item">
            <strong>Business Name:</strong> ${businessName}
        </div>
        <div class="form-data-item">
            <strong>Application Date:</strong> ${formattedDate}
        </div>
    `;
}


document.addEventListener('click', function(event) {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});