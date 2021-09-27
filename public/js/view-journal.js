import { formatDate, formatCoordinate, truncate } from "/js/shared-assets.js";
console.log('view-journal.js loaded');

const JOURNAL_API_URL = "http://localhost:5000/api/journals/";

const journalId = document.getElementById('journal-id').value;

async function getJournal(url, id) {
    try {
        console.log('Fetching journal' + id);
        const response = await fetch(url + id);
        const data = await response.json();

        console.log(data.journal)

        if (data.journal.logs) {
            printJournalMap(data.journal)
        }

    } catch (err) {
        console.log(err)
    }
}





function printJournalMap(journal) {

    // Leaflet custom numbered icon ->

    L.NumberedDivIcon = L.Icon.extend({
        options: {
            iconUrl: '/images/map-marker.svg',
            number: '',
            shadowUrl: null,
            iconSize: new L.Point(30, 41),
            iconAnchor: new L.Point(13, 41),
            popupAnchor: new L.Point(2, -52),
            /*
            iconAnchor: (Point)
            popupAnchor: (Point)
            */
            className: 'numbered-div-icon'
        },

        createIcon: function () {
            var div = document.createElement('div');
            var img = this._createImg(this.options['iconUrl']);
            var numdiv = document.createElement('div');
            numdiv.setAttribute("class", "number");
            numdiv.innerHTML = this.options['number'] || '';
            div.appendChild(img);
            div.appendChild(numdiv);
            this._setIconStyles(div, 'icon');
            return div;
        }
    });

    // <- Leaflet custom numbered icons

    const mapOptions = {
        'attributionControl': true,
        'zoomControl': true,
        'dragging': true,
        'doubleClickZoom': false,
        'boxZoom': false,
        'scrollWheelZoom': false

    };

    let journalMap = L.map('journal-map', mapOptions);

    const tilesURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tilesAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tiles = L.tileLayer(tilesURL, { tilesAttribution });
    tiles.addTo(journalMap);

    let logMarkers = [];

    for (let i in journal.logs) {
        const index = parseInt(i, 10) + 1;
        const log = journal.logs[i];
        const markerOptions = {
            'icon': new L.NumberedDivIcon({ number: index }),
            'title': log.createdAt,
        }
        let popupTextext =
            `<div class="marker-date">${formatDate(log.createdAt)}</span></div>
        <div class="marker-coordinates">${formatCoordinate(log.coordinates.latitude)}° / ${formatCoordinate(log.coordinates.longitude)}°</div>`;
        if (log.coordinates.accuracy) {
            popupTextext += `<div class="marker-accuracy">Accuracy: ${log.coordinates.accuracy}</div>`;
        }
        if (log.description) {
            popupTextext += `<div class="marker-location">${log.description}</div>`;
        }
        if (log.text && log.text.length > 50) {
            popupTextext += `<div class="marker-text">${truncate(log.text, 70)}
                                <a href="#log-item-${parseInt(i) + 1}">Read more</a>
                            </div>`;
        } else if (log.text) {
            popupTextext += `<div class="marker-text">${log.text}</div>`;
        }

        let logMarker = L.marker([log.coordinates.latitude, log.coordinates.longitude], markerOptions);
        logMarker.bindPopup(popupTextext);

        logMarkers.push(logMarker);
    }

    var group = new L.featureGroup(logMarkers).addTo(journalMap);
    journalMap.fitBounds(group.getBounds());

}

getJournal(JOURNAL_API_URL, journalId);