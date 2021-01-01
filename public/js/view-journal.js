import { JOURNAL_API_URL, MML_API_KEY, getJournalId, createJournalMetaUl, formatDate, formatCoordinate } from "./shared-assets.js";

const journalId = getJournalId();


fetch(JOURNAL_API_URL + getJournalId())
    .then(response => response.json())
    .then(journal => {
        printJournalMeta(journal);
        printJournalMap(journal);
    })
    .catch(error => console.log(error));

function printJournalMeta(journal) {

    let journalMetaDiv = document.getElementById('journal-meta');
    console.log(journal);

    let journalUl = createJournalMetaUl(journal);

    journalMetaDiv.appendChild(journalUl);
}

function printJournalMap(journal) {

    const mapOptions = {
        'attributionControl': true,
        'zoomControl': true,
        'dragging': true,
        'doubleClickZoom': false,
        'boxZoom': false,
        'scrollWheelZoom': false

    };

    const myIcon = L.icon({
        iconUrl: 'images/hiking.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        className: 'journal-map-icon',
        // shadowUrl: 'images/hiking.svg',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });


    let journalMap = L.map('journal-map', mapOptions);

    const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tilesAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = L.tileLayer(tilesURL, { tilesAttribution });
    tiles.addTo(journalMap);

    let logMarkers = [];

    for (let i in journal.logs) {
        const log = journal.logs[i].log;
        const markerOptions = {
            'icon': myIcon,
            'title': log.created
        }
        let popupTextext =
            `<div class="marker-date">${formatDate(log.created)}</span></div>
        <div class="marker-coordinates">${formatCoordinate(log.coordinates.latitude)}° / ${formatCoordinate(log.coordinates.longitude)}°</div>`;
        if (log.coordinates.accuracy) {
            popupTextext += `<div class="marker-accuracy">Accuracy: ${log.coordinates.accuracy}</div>`;
        }
        if (log.locationDescription) {
            popupTextext += `<div class="marker-location">${log.locationDescription}</div>`;
        }
        if (log.locationDescription) {
            popupTextext += `<div class="marker-text">${log.text}</div>`;
        }

        let logMarker = L.marker([log.coordinates.latitude, log.coordinates.longitude], markerOptions);
        logMarker.bindPopup(popupTextext);

        logMarkers.push(logMarker);
    }

    var group = new L.featureGroup(logMarkers).addTo(journalMap);
    journalMap.fitBounds(group.getBounds());

}