const mongoose  = require('mongoose')

const alunosSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    nome: {
type: String,
required: true

    },

    atividade: {

type: String,
required: true
    },

    idade:{
type: Number,
required: true

    },
    
    endereço: {
type: String
required: true

    },

    telefone: {
type: Number
required: true
    },

    objetivo: {
        type: String
        required: true
    },

    detalhes: {
        type: String
        required: true
    },
    
    createdAt: {
        type: Date,
        default: new Date()

    }


})

module.exports = moongose.model('aluno', alunosSchema)