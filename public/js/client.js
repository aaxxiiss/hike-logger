console.log('client.js loaded');
import { JOURNAL_API_URL, createJournalMetaUl } from "./shared-assets.js";



function isHomePage() {
    return document.location.pathname === '/';
}


function printJournals(journals) {
    const journeyListDiv = document.getElementById('journal-list');
    for (let journal of journals) {
        let journalDiv = document.createElement('div');
        journalDiv.classList.add('journal-item');
        const journaMetaUl = createJournalMetaUl(journal);
        journalDiv.appendChild(journaMetaUl);

        let buttonContainerDiv = document.createElement('div');
        buttonContainerDiv.classList.add('items-on-col');

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