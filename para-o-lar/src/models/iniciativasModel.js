const mongoose = require("mongoose")

const iniciativaSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    city: String,
    themes: [String],
    description: [String],
    site: [String],
    national: Boolean,
    dateCreated: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('iniciativa', iniciativaSchema)