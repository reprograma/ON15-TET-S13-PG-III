const mongoose = require ("mongoose")

const noteSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    author:{
        type: String,
        required: true //required: é quando um elemento é obrigatório no banco de dados 
    },
    title: {
        type:String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("note", noteSchema)