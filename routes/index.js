const express = require('express');
const router = express.Router();

// @desc    Login / landing page
// @route   GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login-layout'
    });
})

// @desc    Dashboard
// @route   GET / dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

// @desc    Create new journal
// @route   GET / create-journal
router.get('/create-journal', (req, res) => {
    res.render('create-journal');
})

// @desc    View journal
// @route   GET / view-journal
router.get('/view-journal', (req, res) => {
    res.render('view-journal');
})

// @desc    Add new logs to journaö
// @route   GET / add-log
router.get('/add-log', (req, res) => {
    res.render('add-log');
})


module.exports = router;