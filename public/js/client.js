console.log('client.js loaded');

function isPage(path) {
    return document.location.pathname === `/${path}`;
}

if (isPage('dashboard')) {
    console.log('On Dashboard page');

    const delForms = document.getElementsByClassName('delete-journal-form');
    if (delForms) {
        for (const form of delForms) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log('Delete!')
            });
        }
    }

}