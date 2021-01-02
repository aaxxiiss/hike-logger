const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sharedWith: {
        email: {
            type: String
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    logs: {
        type: Array
    }
});

module.exports = mongoose.model('Journal', JournalSchema);