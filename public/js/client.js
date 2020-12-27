console.log('client.js loaded');

function isHomePage() {
    return document.location.pathname === '/';
}

if (isHomePage()) {
    console.log('On home page');
}