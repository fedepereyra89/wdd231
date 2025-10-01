
document.addEventListener('DOMContentLoaded', function() {
    
    initializePage();
    
    
    setupEventListeners();
    
    
    setTimestamp();
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
    
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

function setTimestamp() {
    const timestampField = document.getElementById('timestamp');
    const now = new Date();
    timestampField.value = now.toISOString();
}


function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


document.addEventListener('click', function(event) {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});