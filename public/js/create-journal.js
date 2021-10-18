const CREATE_JOURNAL_URL = '/journals/create';
console.log('create-journal.js loaded');
console.log(CREATE_JOURNAL_URL);

const journalForm = document.getElementById('journal-form');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

journalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(journalForm);
  const name = formData.get('name');
  const description = formData.get('description');
  const sharedWith = formData.get('shared-with');
  const journal = {
    name,
    description,
    sharedWith,
  };

  loadingSpinner.classList.remove('hidden');
  journalForm.classList.add('hidden');

  try {
    console.log('posting');
    fetch(CREATE_JOURNAL_URL, {
      method: 'POST',
      body: JSON.stringify(journal),
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (err) {
    loadingSpinner.classList.add('hidden');
    responseDiv.classList.remove('hidden');
    console.error(err);
    errorMessage.textContent = err;
  }

  console.log('finished without errors');
});
