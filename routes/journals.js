const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMidd.js');

const Journal = require('../models/Journal.js');

// @desc    Create new journal
// @route   GET / journals/create
router.get('/create', ensureAuth, (req, res) => {
    res.render('journals/create');
});

// @desc    Process new journal data from form
// @route   POST / journals
function isValidJournal(journal) {
    return journal.name && journal.name.toString().trim() !== '' &&
        journal.description && journal.description.toString().trim() !== '' &&
        journal.sharedWith && journal.sharedWith.toString().trim() !== '';
}

router.post('/', ensureAuth, async (req, res) => {
    try {
        console.log('Received Journal');
        console.log(req.body)
        const journal = {
            name: req.body.name.toString().trim(),
            description: req.body.description.toString().trim(),
            sharedWith: { email: req.body.sharedWith.toString().trim() },
            createdAt: new Date(),
            createdBy: req.user.id
        };
        const newJournal = await Journal.create(journal);
        res.render('journals/created', newJournal);

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }


});

// @desc    View journal
// @route   GET / view-journal
router.get('/view-journal', ensureAuth, (req, res) => {
    res.render('view-journal');
});


// @desc    View journal
// @route   GET / view-journal
router.get('/view-journal', ensureAuth, (req, res) => {
    res.render('view-journal');
});

// @desc    Add new logs to journal
// @route   GET / add-log
router.get('/add-log', ensureAuth, (req, res) => {
    res.render('add-log');
});

module.exports = router;