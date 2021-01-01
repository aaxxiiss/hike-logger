const JOURNAL_API_URL = 'http://localhost:5000/API/journals/';
const LOG_API_URL = 'http://localhost:5000/API/log/';
const MML_API_KEY = '2013af0c-f7fa-4dae-980e-3900ae04a539';


function getJournalId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('journal-id');
}

function createJournalMetaUl(journal) {
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

    let descriptionLi = document.createElement('li');
    let descriptionHeaderSpan = document.createElement('span');
    descriptionHeaderSpan.classList.add('list-header');
    descriptionHeaderSpan.textContent = 'Description';
    descriptionLi.appendChild(descriptionHeaderSpan);
    let descriptionDataSpan = document.createElement('span');
    descriptionDataSpan.classList.add('list-data');
    descriptionDataSpan.textContent = journal.description;
    descriptionLi.appendChild(descriptionDataSpan);
    journalUl.appendChild(descriptionLi);

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

    if (journal.logs) {
        let logsLi = document.createElement('li');
        let logsHeaderSpan = document.createElement('span');
        logsHeaderSpan.classList.add('list-header');
        logsHeaderSpan.textContent = 'Logs';
        logsLi.appendChild(logsHeaderSpan);
        let logsDataSpan = document.createElement('span');
        logsDataSpan.classList.add('list-data');
        logsDataSpan.textContent = journal.logs.length;
        logsLi.appendChild(logsDataSpan);
        journalUl.appendChild(logsLi);
    }
    return journalUl;
}

function formatDate(date) {
    return moment(date).format('DD.MM.YYYY,H:mm');
}

function formatCoordinate(coord) {
    return coord.toFixed(5);

}

export { JOURNAL_API_URL, LOG_API_URL, MML_API_KEY, getJournalId, createJournalMetaUl, formatDate, formatCoordinate };