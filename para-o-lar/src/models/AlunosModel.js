const mongoose = require('mongoose');

const AlunosSchema = new mongoose.Schema({
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

module.exports = mongoose.model('aluno', AlunosSchema); 