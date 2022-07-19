const mongoose = require("mongoose")

const IniciativaSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    city: String,
    themes: [String],
    description: [String],
    site: [String],
    national: Boolean,
    campains: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campanha"
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model('iniciativa', IniciativaSchema)