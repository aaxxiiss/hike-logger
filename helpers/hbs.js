const moment = require('moment');
const User = require('../models/User.js');

module.exports = {

    formatDate: function (date, format) {
        return moment(date).format(format);
    },

    formatCoordinate: function (coord, dec) {
        return coord.toFixed(dec);
    },

    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },

    count: function (i, x) {
        return i + x;
    },

    getJournalDate: function (journal) {
        if (journal.status === 'created') {
            return moment(journal.createdAt).format('D.M.YYYY') + ' (created)';
        }
        if (journal.status === 'active') {
            return moment(journal.logs[0].createdAt).format('D.M.YYYY') + ' –';
        }
        if (journal.status === 'finished') {
            return `${moment(journal.logs[0].createdAt).format('D.M.YYYY')} – 
            ${moment(journal.logs[journal.logs.length - 1].createdAt).format('D.M.YYYY')}`;
        }
    },

};