const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'general'
    },
    active: {
        type: Boolean,
        default: true // or false, depending on what you want as the default state
    }
}, { timestamps: true }); // Add timestamps option here

const notes = mongoose.model('notes', noteSchema);
module.exports = notes;
