console.log('client.js loaded');

const journalForm = document.getElementById("journal-form");
const JOURNAL_API_URL = 'http://localhost:5000/API/journal/';
const loadingSpinner = document.getElementById("loading-spinner");
const responseDiv = document.getElementById("journal-response");
const responseNameLi = document.getElementById('response-name');
const responseDescriptionLi = document.getElementById('response-description');
const responseSharedWithLi = document.getElementById('response-shared-with');
const journalId = document.getElementById('created-journal-id');

loadingSpinner.style.display = 'none';
responseDiv.style.display = 'none';

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
    console.log('Submitting following data:');
    console.log(journal);

    loadingSpinner.style.display = '';
    journalForm.style.display = 'none';

    fetch(JOURNAL_API_URL, {
        method: 'POST',
        body: JSON.stringify(journal),
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(response => {
            loadingSpinner.style.display = 'none';
            responseDiv.style.display = '';

            if (response.status === 422) {
                throw new Error("Couldn't create new journey as input data wasn't valid. Please try again.");
            } else {
                return response.json();
            }
        })
        .then(createdJournal => {


            let nameSpan = document.createElement('span');
            nameSpan.classList.add("list-data");
            nameSpan.textContent = createdJournal.name;
            responseNameLi.appendChild(nameSpan);

            let descriptionSpan = document.createElement('span');
            descriptionSpan.classList.add("list-data");
            descriptionSpan.textContent = createdJournal.description;
            responseNameLi.appendChild(descriptionSpan);

            let sharedWithSpan = document.createElement('span');
            sharedWithSpan.classList.add("list-data");
            sharedWithSpan.textContent = createdJournal.sharedWith;
            responseNameLi.appendChild(sharedWithSpan);

            journalId.value = createdJournal._id;

        })
        .catch(error => {
            responseDiv.innerHTML = '';
            let errorMessage = document.createElement('p');
            errorMessage.classList.add("error-message");
            errorMessage.textContent = error;
            responseDiv.appendChild(errorMessage);
        });
});


