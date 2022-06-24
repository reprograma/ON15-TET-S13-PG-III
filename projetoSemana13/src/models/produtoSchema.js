const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome : {
        type:String,
        required :true
    },
    valor:{
        type:Number,
        required :true
    },
    fornecedor:{
        type: mongoose.Schema.Types.ObjectId
    },
    datadecadastro: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('produto',produtoSchema);