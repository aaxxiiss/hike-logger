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
        res.render('dashboard', {
            name: req.user.firstName,
            myJournals
        });
    } catch (err) {
        console.error(err);
        res.render('./error/500');
    }

});

module.exports = router;