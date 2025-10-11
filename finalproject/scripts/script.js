import { loadProductData, filterByPage } from './data.js';

let allItems = [];

async function initializePage() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

    try {
        allItems = await loadProductData();

        if (currentPage.includes('index') || currentPage === '' || currentPage === 'project') {
            setupHomePage();
        } else if (currentPage.includes('products')) {
            setupProductsPage();
        } else if (currentPage.includes('recommendations')) {
            setupRecommendationsPage();
        }
    } catch (error) {
        console.error('Error initializing page:', error);
    }

    initializeBackToTop();
    initializeLoginForm();
}

function setupHomePage() {
    const homeGrid = document.querySelector('.home-grid');
    if (!homeGrid) return;

    const productsToShow = filterByPage(allItems, 'products').slice(0, 3);

    const productHTML = productsToShow.map(product => `
        <section class="home-card">
            <img class="card-img" src="${product.image}" alt="${product.name}" loading="lazy">
            <h2>${product.name}</h2>
        </section>
    `).join('');

    homeGrid.innerHTML = productHTML;

    updateWelcomeMessage();
}

function setupProductsPage() {
    const productGrid = document.querySelector('.products-grid');
    if (!productGrid) return;

    const productsToShow = filterByPage(allItems, 'products');

    const productHTML = productsToShow.map(product => `
        <section class="product-card">
            <img class="card-img" src="${product.image}" alt="${product.name}" loading="lazy">
            <h2>${product.name}</h2>
            <p class="price">Price: $${product.price}</p>
        </section>
    `).join('');

    productGrid.innerHTML = productHTML;
}

function setupRecommendationsPage() {
    const recommendationsGrid = document.querySelector('.recommendations-grid');
    if (!recommendationsGrid) return;

    const recsToShow = filterByPage(allItems, 'recommendations');

    const recsHTML = recsToShow.map(rec => `
        <section class="recommendation-card">
            <img class="card-imgr" src="${rec.image}" alt="${rec.name}" loading="lazy">
            <h2>${rec.name}</h2>
            <p>${rec.description}</p>
        </section>
    `).join('');

    recommendationsGrid.innerHTML = recsHTML;
}

function updateWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    if (!welcomeMessage) return;

    const storedUser = localStorage.getItem('username');
    if (storedUser) {
        welcomeMessage.textContent = `Welcome back, ${storedUser}!`;
    } else {
        welcomeMessage.textContent = 'Welcome to Arkadia Deco!';
    }
}

function initializeBackToTop() {
    const myBtn = document.getElementById("myBtn");
    if (!myBtn) return;

    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            myBtn.style.display = "block";
        } else {
            myBtn.style.display = "none";
        }
    };
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function initializeLoginForm() {
    const modal = document.getElementById('id01');
    const loginForm = document.querySelector('.modal-content.animate');

    if (!modal) return;

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.querySelector('input[name="uname"]').value;
            localStorage.setItem('username', username);
        });
    }
}

function toggleLoginModal(show) {
    const modal = document.getElementById('id01');
    if (modal) {
        modal.style.display = show ? "block" : "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializePage();

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

window.addEventListener('resize', function() {
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page is now hidden');
    } else {
        console.log('Page is now visible');
    }
});

window.topFunction = topFunction;
window.toggleLoginModal = toggleLoginModal;
