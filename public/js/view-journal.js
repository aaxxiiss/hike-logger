import { JOURNAL_API_URL, getJournalId, createJournalMetaUl } from "./shared-assets.js";

const journalId = getJournalId();


fetch(JOURNAL_API_URL + getJournalId())
    .then(response => response.json())
    .then(journal => printJournalMeta(journal))
    .catch(error => console.log(error));

function printJournalMeta(journal) {

    let journalMetaDiv = document.getElementById('journal-meta');
    console.log(journalMetaDiv);

    let journalUl = createJournalMetaUl(journal);

    journalMetaDiv.appendChild(journalUl);
}