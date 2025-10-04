// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load attractions data
    loadAttractions();
    
    // Handle visit tracking
    handleVisitTracking();
});

function initializePage() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
}

function setupEventListeners() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Load attractions from JSON
async function loadAttractions() {
    try {
        const response = await fetch('data/attractions.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch attractions data');
        }
        
        const attractions = await response.json();
        displayAttractions(attractions);
        
    } catch (error) {
        console.error('Error loading attractions:', error);
        displayAttractionsError();
    }
}

function displayAttractions(attractions) {
    const container = document.getElementById('discover-cards');
    
    // Clear any existing content
    container.innerHTML = '';
    
    attractions.forEach((attraction, index) => {
        const card = createAttractionCard(attraction, index);
        container.appendChild(card);
    });
}

function createAttractionCard(attraction, index) {
    const card = document.createElement('div');
    card.className = 'discover-card';
    card.style.gridArea = `card${index + 1}`;
    
    card.innerHTML = `
        <h2>${attraction.name}</h2>
        <figure>
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
        </figure>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <button class="learn-more-btn">Learn More</button>
    `;
    
    return card;
}

function displayAttractionsError() {
    const container = document.getElementById('discover-cards');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666; grid-column: 1 / -1;">
            <p>Sorry, we're having trouble loading the attractions. Please try again later.</p>
        </div>
    `;
}

// Visit tracking with localStorage
function handleVisitTracking() {
    const visitMessageElement = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    
    let message = '';
    
    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else if (daysDifference === 1) {
            // Exactly 1 day
            message = 'You last visited 1 day ago.';
        } else {
            // More than 1 day
            message = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Display the message
    visitMessageElement.innerHTML = `
        <div class="visit-info">
            <h3>Visit Information</h3>
            <p>${message}</p>
        </div>
    `;
    
    // Store current visit date
    localStorage.setItem('lastVisit', currentDate.toString());
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});