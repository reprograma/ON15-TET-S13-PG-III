const mongoose = require('mongoose')

const fornecedorSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome : {
        type:String,
        required :true
    },
    cnpj:{
        type:String,
        required :true
    },
    ramo:{
        type:String
    },
    produtos:[String],

    datadecadastro: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('fornecedor',fornecedorSchema);