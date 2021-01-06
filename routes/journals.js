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
// @route   POST / journals/create

router.post('/create', ensureAuth, async (req, res) => {
    try {
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


// @desc    Render: edit journal page
// @route   GET / journals/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const journal = await Journal
            .findById(req.params.id)
            .populate('createdBy')
            .populate('logs.createdBy')
            .lean();
        res.render('journals/edit', journal)

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


// @desc    Process changes from edit journal page
// @route   PUT / journals/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let journal = await Journal
            .findById(req.params.id)
            .populate('createdBy')
            .lean();
        console.log(journal.createdBy);
        console.log(req.user);
        if (journal.createdBy.googleId === req.user.googleId) {
            const updatedJournal = {
                name: req.body.name.toString().trim(),
                description: req.body.description.toString().trim(),
                sharedWith: { email: req.body.sharedWith.toString().trim() },
            };
            console.log(journal);
            console.log(updatedJournal);
            journal = await Journal.findOneAndUpdate({ _id: req.params.id }, updatedJournal, {
                new: true,
                runValidators: true,
            });
        };

        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


// @desc    Render: View journal page
// @route   GET / journals/view/:id
router.get('/view/:id', ensureAuth, async (req, res) => {
    try {
        const journal = await Journal
            .findById(req.params.id)
            .populate('createdBy')
            .populate('logs.createdBy')
            .lean();
        console.log(req.user.googleId);
        console.log(journal.createdBy.googleId);
        if (req.user.googleId === journal.createdBy.googleId ||
            req.user.email === journal.sharedWith.email) {
            res.render('journals/view', journal);
        } else {
            res.redirect('/dashboard');
        }



    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


// @desc    Render: Add new logs to journal
// @route   GET / journals/log/
router.get('/log/:id', ensureAuth, async (req, res) => {
    try {
        const journal = await Journal
            .findById(req.params.id)
            .populate('createdBy')
            .lean();
        res.render('journals/log', journal)

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


// @desc    Accept or reject shared journal
// @route   PUT / journals/follow/:id
router.put('/follow/:id', ensureAuth, async (req, res) => {
    try {
        console.log(`Received PUT request for journal ${req.params.id}`);
        console.log(req.body.submit);
        let journal = await Journal
            .findById(req.params.id)
            .lean();
        if (journal.sharedWith.email === req.user.email) {
            journal = await Journal.findOneAndUpdate({ _id: req.params.id }, { sharedStatus: req.body.submit })
        }

        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


module.exports = router;


