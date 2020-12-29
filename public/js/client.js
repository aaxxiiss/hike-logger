console.log('client.js loaded');

const JOURNAL_API_URL = 'http://localhost:5000/API/journals/';

function isHomePage() {
    return document.location.pathname === '/';
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

    return journalUl;
}

function printJournals(journals) {
    const journeyListDiv = document.getElementById('journal-list');
    for (let journal of journals) {
        let journalDiv = document.createElement('div');
        journalDiv.classList.add('journal-item');
        const journaMetaUl = createJournalMetaUl(journal);
        journalDiv.appendChild(journaMetaUl);

        let buttonContainerDiv = document.createElement('div');
        buttonContainerDiv.classList.add('buttons-col');

        let addLogsLink = document.createElement('a');
        addLogsLink.classList.add('btn', 'btn-green-solid');
        addLogsLink.textContent = "Add logs";
        addLogsLink.href = "/log.html?journal-id=" + journal._id;
        buttonContainerDiv.appendChild(addLogsLink);

        let viewJournalLink = document.createElement('a');
        viewJournalLink.classList.add('btn', 'btn-green-solid');
        viewJournalLink.textContent = "View journal";
        viewJournalLink.href = "/view-journal.html?journal-id=" + journal._id;
        buttonContainerDiv.appendChild(viewJournalLink);

        journalDiv.appendChild(buttonContainerDiv);

        journeyListDiv.appendChild(journalDiv);
    }
}


function getJournals() {
    fetch(JOURNAL_API_URL)
        .then(response => response.json())
        .then(journals => {
            console.log(journals);
            printJournals(journals);
        })
}

if (isHomePage()) {
    console.log('On home page');
    getJournals();
}