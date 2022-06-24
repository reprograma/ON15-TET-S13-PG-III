const mongoose = require('mongoose')

const livrosSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    edition: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    ilustration: {
        type: String,
        required: true
    },
    frontcover: {
        type: String,
        required: true
    },
    publishingcompany: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }

})

module.exports = mongoose.model('livros', livrosSchema)