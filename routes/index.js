const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/authMidd.js');
const Journal = require('../models/Journal.js');

// @desc    Login / landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login-layout'
    });
});

// @desc    Dashboard
// @route   GET / dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const myJournals = await Journal.find({ createdBy: req.user.id }).lean();
        const newSharedJournals = await Journal.find({ sharedWith: { email: req.user.email }, sharedStatus: 'initial' })
            .populate('createdBy')
            .lean();
        const sharedJournals = await Journal.find({ sharedWith: { email: req.user.email }, sharedStatus: 'accepted' })
            .populate('createdBy')
            .lean();
        res.render('dashboard', {
            name: req.user.firstName,
            myJournals,
            newSharedJournals,
            sharedJournals
        });
    } catch (err) {
        console.error(err);
        res.render('./error/500');
    }

});

module.exports = router;