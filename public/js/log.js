console.log('log.js loaded');
import { formatDate, formatCoordinate, truncate } from '/js/shared-assets.js';

const LOG_API_URL = '/api/journals/log/';
const journalId = document.getElementById('journal-id').value;

let coordinates;

const getCoordinatesBtn = document.getElementById('get-coordinates');
getCoordinatesBtn.addEventListener('click', getLocation);
const logForm = document.getElementById('log-form');
const loadingSpinner = document.getElementById('loading-spinner');
const responseDiv = document.getElementById('log-response');

loadingSpinner.style.display = 'none';
responseDiv.style.display = 'none';

function setCoordinates(pos) {
  coordinates = {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
  };
  document.getElementById('lat').value =
    formatCoordinate(coordinates.latitude) + '°';
  document.getElementById('lon').value =
    formatCoordinate(coordinates.longitude) + '°';
  document.getElementById('accuracy').value = coordinates.accuracy + ' m';
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
    maximumAge: 0,
  };

  if ('geolocation' in navigator) {
    console.log('Geolocation available');
    return navigator.geolocation.getCurrentPosition(
      setCoordinates,
      error,
      options
    );
  } else {
    console.log('Geolocation not available');
    return -1;
  }
}

logForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(logForm);

  const locationDescription = formData.get('location-description');
  const text = formData.get('log-text');
  const log = {
    coordinates,
    locationDescription,
    text,
    journalId,
  };
  console.log('Submitting following data:');
  console.log(log);

  loadingSpinner.style.display = '';
  logForm.style.display = 'none';

  fetch(LOG_API_URL, {
    method: 'POST',
    body: JSON.stringify(log),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => {
      loadingSpinner.style.display = 'none';
      responseDiv.style.display = '';

      if (response.status === 422) {
        throw new Error(
          "Couldn't create new journey as input data wasn't valid. Please try again."
        );
      } else {
        return response.json();
      }
    })
    .then((createdLog) => {
      console.log(createdLog);
    })
    .catch((error) => {
      responseDiv.innerHTML = '';
      let errorMessage = document.createElement('p');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = error;
      responseDiv.appendChild(errorMessage);
    });
});
