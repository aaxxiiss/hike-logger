console.log('client.js loaded');

function isPage(path) {
    return document.location.pathname === `/${path}`;
}

if (isPage('dashboard')) {
    console.log('On Dashboard page');

}