const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const monk = require('monk');
const connectDB = require('./config/db.js');
const moment = require('moment');

// Load config
dotenv.config({ path: './config/config.env' })

connectDB();

const app = express();

const PORT = process.env.PORT || 5500;

app.use(morgan('dev'));

const db = monk('localhost/hikeLogger');
const journals = db.get('journals');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.use(express.static('public'));

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