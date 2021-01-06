const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 80
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    sharedWith: {
        email: {
            type: String,
            maxLength: 320,
        },
    },
    sharedStatus: {
        type: String,
        default: 'initial',
        enum: ['initial', 'accepted', 'rejected'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'created',
        enum: ['created', 'active', 'finished']
    },
    logs: [{
        coordinates: {
            latitude: {
                type: Number,
                required: true,
                min: -90,
                max: 90
            },
            longitude: {
                type: Number,
                required: true,
                min: -180,
                max: 180,
            },
            accuracy: {
                type: Number,
                min: 0,
            }
        },
        description: {
            type: String,
            maxLength: 60
        },
        text: {
            type: String,
            maxLength: 1500
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }]
});

module.exports = mongoose.model('Journal', JournalSchema);