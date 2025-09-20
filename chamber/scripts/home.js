
document.addEventListener('DOMContentLoaded', function() {

    initializePage();
    

    setupEventListeners();
    
  
    loadWeatherData();
    
 
    loadSpotlights();
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


async function loadWeatherData() {
    const apiKey = 'demo_key'; 
    const city = 'Riverside,CA,US';
    
    try {
        
        displayMockWeatherData();
        
      
    } catch (error) {
        console.error('Error loading weather data:', error);
        displayWeatherError();
    }
}

function displayMockWeatherData() {
    const weatherInfo = document.getElementById('weather-info');
    const forecast = document.getElementById('forecast');
    
  
    weatherInfo.innerHTML = `
        <div class="current-weather">
            <div class="temperature">72°F</div>
            <div class="weather-description">Partly Cloudy</div>
        </div>
    `;
    
    
    const mockForecast = [
        { day: 'Today', high: 75, low: 58 },
        { day: 'Tomorrow', high: 78, low: 62 },
        { day: 'Thursday', high: 73, low: 59 }
    ];
    
    forecast.innerHTML = '<div class="forecast">' + 
        mockForecast.map(day => `
            <div class="forecast-day">
                <h5>${day.day}</h5>
                <div class="forecast-temp">${day.high}°/${day.low}°</div>
            </div>
        `).join('') + 
    '</div>';
}

function displayWeatherData(currentData, forecastData) {
    const weatherInfo = document.getElementById('weather-info');
    const forecast = document.getElementById('forecast');
    
    
    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;
    
    weatherInfo.innerHTML = `
        <div class="current-weather">
            <div class="temperature">${temp}°F</div>
            <div class="weather-description">${description}</div>
        </div>
    `;
    
   
    const forecastDays = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 3);
    
    forecast.innerHTML = '<div class="forecast">' + 
        forecastDays.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
            const high = Math.round(day.main.temp_max);
            const low = Math.round(day.main.temp_min);
            
            return `
                <div class="forecast-day">
                    <h5>${dayName}</h5>
                    <div class="forecast-temp">${high}°/${low}°</div>
                </div>
            `;
        }).join('') + 
    '</div>';
}

function displayWeatherError() {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <p style="color: #666; text-align: center;">
            Weather data temporarily unavailable
        </p>
    `;
}


async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch members data');
        }
        
        const members = await response.json();
        displaySpotlights(members);
        
    } catch (error) {
        console.error('Error loading spotlights:', error);
        displaySpotlightsError();
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    
    
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 2 || member.membershipLevel === 3
    );
    
    
    const selectedMembers = getRandomMembers(qualifiedMembers, 3);
    
    
    container.innerHTML = '';
    
    
    selectedMembers.forEach(member => {
        const spotlightCard = createSpotlightCard(member);
        container.appendChild(spotlightCard);
    });
}

function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, members.length));
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.className = 'spotlight-card';
    
    const membershipLevelText = getMembershipLevelText(member.membershipLevel);
    const membershipLevelClass = `level-${member.membershipLevel}`;
    
    card.innerHTML = `
        <h4>${member.name}</h4>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" class="website" target="_blank" rel="noopener">${member.website}</a></p>
        <span class="membership-level ${membershipLevelClass}">${membershipLevelText} Member</span>
    `;
    
    return card;
}

function getMembershipLevelText(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
    }
}

function displaySpotlightsError() {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <p>Unable to load member spotlights at this time.</p>
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