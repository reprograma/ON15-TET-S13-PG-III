const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    notes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "note"
        }
    ]
});

module.exports = mongoose.model('tag', tagSchema);