import { getJournalId } from "./shared-assets.js";
console.log('log.js loaded');

const journalId = getJournalId();

function setCoordinates(pos) {
    const location = pos.coords;
    document.getElementById('lat').value = location.latitude;
    document.getElementById('lon').value = location.longitude;
    document.getElementById('log-submit').disabled = false;
}

function error() {
    console.error('Could not receive coordinates');
    return -1;
}

function getLocation() {

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    if ("geolocation" in navigator) {
        console.log('Geolocation available');
        return navigator.geolocation.getCurrentPosition(setCoordinates, error, options);
    } else {
        console.log('Geolocation not available');
        return -1;
    }

}


getLocation();