const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const monk = require('monk');
const connectDB = require('./config/db.js');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Handlebar's helpers
const { formatDate, formatCoordinate, truncate, count, getJournalDate } = require('./helpers/hbs.js');

// Handlebars
app.engine(
    '.hbs',
    exphbs({
        helpers: {
            formatDate,
            formatCoordinate,
            truncate,
            count,
            getJournalDate,
        },
        defaultLayout: 'main-layout',
        extname: '.hbs',
    }));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/journals', require('./routes/journals.js'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


/*
const db = monk('localhost/hikeLogger');
const journals = db.get('journals');

app.use(cors());
app.use(express.json());

app.get('/API/', (req, res) => {
    res.json({
        message: 'request passed to the server',
    });
});


function isValidJournal(journal) {
    return journal.name && journal.name.toString().trim() !== '' &&
        journal.description && journal.description.toString().trim() !== '' &&
        journal.sharedWith && journal.sharedWith.toString().trim() !== '';
}

app.post('/API/journals/', (req, res) => {
    if (isValidJournal(req.body)) {
        console.log('Journal is valid');
        const journal = {
            name: req.body.name.toString().trim(),
            description: req.body.description.toString().trim(),
            sharedWith: req.body.sharedWith.toString().trim(),
            logs: [],
            created: new Date()
        };
        journals
            .insert(journal)
            .then(createdJournal => {
                res.json(createdJournal);
            });
    } else {
        res.status(422);
        res.json({
            message: "Journal data wasn't valid. Please refill the form and trya again."
        });
    }
});

app.get('/API/journals/', (req, res) => {

    journals
        .find()
        .then(journals => {
            res.json(journals);
        });

});

app.get('/API/journals/:journalId', (req, res) => {
    const requestedJournal = {
        '_id': req.params.journalId
    };

    journals
        .findOne(requestedJournal)
        .then(journal => {
            res.json(journal);
        });
});


function isValidLog(log) {
    if ((log.coordinates.latitude >= -90) &&
        (log.coordinates.latitude <= 90) &&
        (log.coordinates.longitude >= -180) &&
        (log.coordinates.longitude <= 180)) {
        console.log('Log is valid');
        return true;
    }
    else {
        console.log('Log is not valid');
        return false;
    }
}

app.post('/API/log/', (req, res) => {
    if (isValidLog(req.body)) {

        const log = {
            coordinates: req.body.coordinates,
            locationDescription: req.body.locationDescription.toString().trim(),
            text: req.body.text.toString().trim(),
            created: new Date()
        };

        const journalId = req.body.journalId;

        journals
            .findOneAndUpdate(journalId, {
                $push: {
                    logs: {
                        log
                    }
                }
            })
            .then(journal => res.json(journal));

    } else {
        res.status(422);
        res.json({
            message: "Log data wasn't valid. Please refill the form and try again."
        });
    }
});

*/