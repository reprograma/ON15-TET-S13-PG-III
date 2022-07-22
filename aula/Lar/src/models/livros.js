const mongoose = require('mongoose')

const livroModel = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome: String,
    paginas: Number,
    sinopse: String
})


module.exports = mongoose.model("livro", livroModel)