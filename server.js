const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
    secret: process.env.SESSION_SECRET,
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