const mongoose = require("mongoose")

const decoraçãoStoreSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        likes: {
            type: Boolean
        
        },

        nome: {
            type: [String],
            required: true
            
        },

        endereço: {
            type: String,
            required: true
        },
        
        número: {
            type: Number,
            required: true
        },
        
        bairro: {
            type: [String],
            required: true
        },
        
        cidade: {
            type: [String],
            required: true
        },
        
        telefone: {
            type: Number,
            required: true
        },

        pagamento:{
            type: [String],
            required: true
        },

        site: {
            type: String
        },
        
        createdAt: {
            type: String,
            default: new Date()
        }
    });

    module.exports = mongoose.model('loja', decoraçãoStoreSchema)