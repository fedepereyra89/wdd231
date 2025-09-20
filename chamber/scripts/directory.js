
document.addEventListener('DOMContentLoaded', function() {
    
    initializePage();
    
    
    setupEventListeners();
    
   
    loadMembers();
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
    
    
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    const membersContainer = document.getElementById('members-container');
    
    gridBtn.addEventListener('click', function() {
        setActiveView('grid', gridBtn, listBtn, membersContainer);
    });
    
    listBtn.addEventListener('click', function() {
        setActiveView('list', listBtn, gridBtn, membersContainer);
    });
}

function setActiveView(view, activeBtn, inactiveBtn, container) {
   
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    
    
    if (view === 'grid') {
        container.classList.remove('members-list');
        container.classList.add('members-grid');
    } else {
        container.classList.remove('members-grid');
        container.classList.add('members-list');
    }
}


async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch members data');
        }
        
        const members = await response.json();
        displayMembers(members);
        
    } catch (error) {
        console.error('Error loading members:', error);
        displayErrorMessage();
    }
}

function displayMembers(members) {
    const container = document.getElementById('members-container');
    
    
    container.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = createMemberCard(member);
        container.appendChild(memberCard);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const membershipLevelText = getMembershipLevelText(member.membershipLevel);
    const membershipLevelClass = `level-${member.membershipLevel}`;
    
    card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="member-image" loading="lazy">
        <div class="member-info">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" class="website" target="_blank" rel="noopener">${member.website}</a></p>
            <p><strong>Services:</strong> ${member.services}</p>
            <span class="membership-level ${membershipLevelClass}">${membershipLevelText} Member</span>
        </div>
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

function displayErrorMessage() {
    const container = document.getElementById('members-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <p>Sorry, we're having trouble loading the member directory. Please try again later.</p>
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