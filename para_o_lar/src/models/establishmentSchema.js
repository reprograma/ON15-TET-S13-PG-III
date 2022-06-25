const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    pagamento: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    }
   
});

module.exports = mongoose.model('establishment', establishmentSchema);

