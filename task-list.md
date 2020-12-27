# Tasks to do

## For minimum viable product

### Front end

- [x] Create basic folder structure and files: public (html, js, css)

#### Index.html

- [x] link to Create Journal
- [] list of created Journals and their Logging and Journey views

#### Create Journal view

- [x] Basic layout of the page
- [x] Html form: journey name, description, allowed users, submit, clear
- [] Front end form validation
- [x] Submitting data to back end in JSON format (override default html request)
- [x] Loading animation while waiting response from back end
- [x] Confirmation: Journal created with link to Logging view

#### Logging view

- [] Basic layout of the page: Journey title, Add logs
- [] get GPS data through XXXX.js
- [] Display my coordinates
- [] Form: location description, log text, submit
- [] Front end validation / sanitation
- [] Send data to back end in JSON format
- [] Display response: success or not
- [] Sending animation / disable send button for 5 seconds after submit
- [] Clear form

#### Journey view

- [] Basic layout of the page
- [] Get Journey data from DB through back end
- [] Journey title and meta data (user, start time, last log entry time, amount of log entries)
- [] Map view in html
- [] Peruskartta map-leafs, if not availabe, other best possible alternative
- [] Calculate map coordinates and zoom level, so that all entries can fit
- [] Get map data through leaflet.js
- [] Display log entries as pins
- [] Display order number on pins
- [] On pin click, display entry data as pop up (user, description, log text)
- [] Under map display log entries on day journal format: - Date - Logs: - time stamp - user - coordinates - description - log entry
- [] Print page / download pdf button

### Back end

- [x] NPM install + add dependencies
- [x] Create index.js
- [x] Create database

#### index.js

- [x] setup express
- [x] on local host, listen to (5000) for api calls
- [x] 5000/API/journal/ : receive JSON
- [x] validate data
- [x] send response back
- [x] save journal to database and create unique id
- [] listen to 5000/log for logs
- [] validate data
- [] create time stamp
- [] save log data to database
- [] listen to YYYY/journey for journey data requests
- [] get data from DB
- [] send data as JSON
- [] add ports for development environment (and fallback to localhost)
- [] on local host, serve static files of public folder on port (XXXX)

#### Other

- [] add .env and hide API-keys there
- [] create account to Heroku
- [] set up Heroku as Production for git
- [] push app to Production

## For 1.0.

### Front end

#### Index.html

- [] User log in
- [] After log in: Create Journey, My Journeys, Journeys shared with me

#### Logging view

- [] Add user identifier: mac address(?), public key in url (?)
