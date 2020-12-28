console.log('log.js loaded');

const JOURNAL_API_URL = 'http://localhost:5000/API/journals/';
const journalId = getJournalId();


function getJournalId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('journal-id');
}

fetch(JOURNAL_API_URL + getJournalId())
    .then(response => response.json())
    .then(journal => printJournalMeta(journal))
    .catch(error => console.log(error));

function printJournalMeta(journal) {

    let journalMetaDiv = document.getElementById('journal-meta');
    console.log(journalMetaDiv);

    let journalUl = document.createElement('ul');

    let nameLi = document.createElement('li');
    let nameHeaderSpan = document.createElement('span');
    nameHeaderSpan.classList.add('list-header');
    nameHeaderSpan.textContent = 'Name';
    nameLi.appendChild(nameHeaderSpan);
    let nameDataSpan = document.createElement('span');
    nameDataSpan.classList.add('list-data');
    nameDataSpan.textContent = journal.name;
    nameLi.appendChild(nameDataSpan);
    journalUl.appendChild(nameLi);

    let dateLi = document.createElement('li');
    let dateHeaderSpan = document.createElement('span');
    dateHeaderSpan.classList.add('list-header');
    dateHeaderSpan.textContent = 'Date';
    dateLi.appendChild(dateHeaderSpan);
    let dateDataSpan = document.createElement('span');
    dateDataSpan.classList.add('list-data');
    dateDataSpan.textContent = journal.created;
    dateLi.appendChild(dateDataSpan);
    journalUl.appendChild(dateLi);

    journalMetaDiv.appendChild(journalUl);
}

