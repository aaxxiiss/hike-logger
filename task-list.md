# Tasks to do

## For minimum viable product

### Front end

- [x] Create basic folder structure and files: public (html, js, css)

#### Index.html

- [] link to Create Journal
- [] list of created Journals and their Logging and Journey views

#### Create Journal view

- [x] Basic layout of the page
- [] Html form: journey name, description, allowed users, submit, clear
- [] Front end form validation
- [] Submitting data to back end in JSON format (override default html request)
- [] Loading animation while waiting response from back end
- [] Confirmation: Journal created with link to Logging view and Journey view

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
- [] Create database

#### index.js

- [] setup express
- [] on local host, listen to (YYYY) for api calls
- [] YYYY/create-journal : receive JSON
- [] validate data
- [] create unique id for journal
- [] send response back
- [] save journal to database
- [] listen to YYYY/logging for logs
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
