# Hike Logger

Application for logging hikes in the wilderness and sharing the data for added safety.

## Basic concept

User can create a new hike journal before the hike. User can define who can have access to the data of the journal and can help in case of an emergency.

During the hike, user will be able to add new log items through Logging view. This view is simple and utilitarian, optimized for to be operated with low-bandwidth network connection in the wildnerness. Each log item contains time stamp and GPS-location as well as optional description and log entry.

People who have been granted access to the journal, can view the entries on Journey view. All log items are displayed on map and also on text form on chronological order. Page can be saved as clear, easy-to-read PDF that can be shared with authorities in case of an emergency.

## Technical layout

### Front end views:

1. Log in
2. Create new journal
3. Logging view
4. Journey view

Front end is created with plain html, css and javascript.

### Back end:

1. Static file server with node/express
2. Dynamic server with node/express to handle API calls and interaction with DB
3. Data base for storing user data and journals: some Mondo DB variant (?)

### APIs

1. In front end, Journey view map utilisez leaflet.js.
2. User authenthication is handled with Google API
