const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/authMidd.js');
const Journal = require('../models/Journal.js');

// @desc    Get journal by id
// @route   GET / api/journals/id
router.get('/journals/:id', ensureAuth, async (req, res) => {
    console.log('Got journal request!');
    try {
        console.log(`Request for journal id ${req.params.id}`);
        const journal = await Journal.findById(req.params.id)
            .populate('createdBy')
            .lean();
        res.json({ journal });
    } catch (err) {
        console.error(err);
        res.json({ msg: `No journal with id ${req.params.id} found` });
    }
});

// @desc    Add logs to journal
// @route   POST / api/journals/log/
router.post('/journals/log/', ensureAuth, async (req, res) => {
    try {
        console.log(`Adding log for journal`);
        const log = {
            coordinates: req.body.coordinates,
            description: req.body.locationDescription.toString().trim(),
            text: req.body.text.toString().trim(),
            createdAt: new Date(),
            createdBy: req.user.id,
        }
        const journal = await Journal.findById(req.body.journalId);
        console.log(journal);
        journal.logs.push(log);
        if (journal.status === 'created') {
            journal.status = 'active';
        }
        journal.save();
        console.log(journal);
        res.json({ msg: 'success' });
    } catch (err) {
        console.error(err);
        res.json({ msg: `Sorry, log couldn't be added.` });
    }
});

module.exports = router;