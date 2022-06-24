// - id
// - nome
// - categoria
// - instagram


const mongoose = require('mongoose');

const feiraSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('feira', feiraSchema)