const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,  // tipo de id do proprio mongoose
    author: {
        type: String, // tipo string
        required: true // é obrigadorio para conseguir criar no meu banco de dados é requerido
    },
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date() // new date do javascript que aparece no banco de dados a data e horario automatico
    }
})

module.exports = mongoose.model('note', NoteSchema)