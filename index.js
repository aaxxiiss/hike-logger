const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/hikeLogger');
const journals = db.get('journals');

app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log('Listening at port 5000'));

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
        console.log('is valid');
        const journal = {
            name: req.body.name.toString().trim(),
            description: req.body.description.toString().trim(),
            sharedWith: req.body.sharedWith.toString().trim(),
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