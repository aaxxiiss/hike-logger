// const mongoose = require('mongoose');

// const LogSchema = new mongoose.Schema({
//     coordinates: {
//         latitude: {
//             type: Number,
//             required: true,
//             min: -90,
//             max: 90
//         },
//         longitude: {
//             type: Number,
//             required: true,
//             min: -180,
//             max: 180,
//         },
//         accuracy: {
//             type: Number,
//             min: 0,
//         }
//     },
//     description: {
//         type: String,
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
// });

// module.exports = mongoose.model('Log', LogSchema);