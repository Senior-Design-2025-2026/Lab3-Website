document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('passwordEntered') == null || localStorage.getItem('passwordEntered') == 'false') {
        window.location.replace('enter-password.html');
    }
});