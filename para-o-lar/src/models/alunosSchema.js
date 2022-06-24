const mongoose = require('mongoose')

const alunosSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    nome: {
        type: String,
        required: true

    },

    atividade: String,
    idade: Number,
    endereço: String,

    telefone: Number,

    objetivo: String,

    detalhes: String,

    createdAt: {
        type: Date,
        default: new Date()

    }


})

module.exports = mongoose.model('aluno', alunosSchema)