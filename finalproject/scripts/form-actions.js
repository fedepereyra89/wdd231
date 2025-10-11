document.addEventListener('DOMContentLoaded', function() {
    const formDataContainer = document.getElementById('form-data');
    if (!formDataContainer) return;

    const urlParams = new URLSearchParams(window.location.search);

    const username = urlParams.get('uname');
    const rememberMe = urlParams.get('remember');

    if (username) {
        localStorage.setItem('username', username);

        const resultHTML = `
            <div class="form-result">
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Remember Me:</strong> ${rememberMe === 'on' ? 'Yes' : 'No'}</p>
                <p class="success-message">You have successfully logged in!</p>
            </div>
        `;

        formDataContainer.innerHTML = resultHTML;
    } else {
        formDataContainer.innerHTML = `
            <div class="form-result">
                <p class="error-message">No login data found. Please try again.</p>
            </div>
        `;
    }
});
