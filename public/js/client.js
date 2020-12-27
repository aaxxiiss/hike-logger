console.log('Client.js loaded');

const journalForm = document.getElementById("journal-form");
const loadingSpinner = document.getElementById("loading-spinner");

loadingSpinner.style.display = 'none';

journalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(journalForm);
    const name = formData.get('name');
    const description = formData.get('description');
    const sharedWith = formData.get('shared-with');
    const journal = {
        name,
        description,
        sharedWith
    }
    console.log('Submit event');
    console.log(journal);

    loadingSpinner.style.display = '';
    journalForm.style.display = 'none';
});


