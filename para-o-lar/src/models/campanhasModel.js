const mongoose = require('mongoose');

const CampanhaSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    iniciativas: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "iniciativa"
        }
    ]
})

module.exports = mongoose.model('campanha', CampanhaSchema);